import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Product, ProductSpec } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams, paginatedResponse } from '../common/pagination';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }

  // ==================== 收货地址 ====================

  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });
  }

  async createAddress(userId: string, dto: CreateAddressDto) {
    if (dto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }
    return this.prisma.address.create({
      data: { ...dto, userId },
    });
  }

  async updateAddress(id: string, userId: string, dto: UpdateAddressDto) {
    const address = await this.prisma.address.findFirst({ where: { id, userId } });
    if (!address) throw new NotFoundException('地址不存在');

    if (dto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, isDefault: true, id: { not: id } },
        data: { isDefault: false },
      });
    }
    return this.prisma.address.update({ where: { id }, data: dto });
  }

  async deleteAddress(id: string, userId: string) {
    const address = await this.prisma.address.findFirst({ where: { id, userId } });
    if (!address) throw new NotFoundException('地址不存在');
    return this.prisma.address.delete({ where: { id } });
  }

  // ==================== 订单 ====================

  async getOrders(
    userId: string,
    status: string | undefined,
    query: PaginationQuery,
    filters?: { startDate?: string; endDate?: string; minAmount?: number; maxAmount?: number },
  ) {
    const { skip, take, page, limit } = paginationParams(query);

    const where: any = { userId, ...(status ? { status } : {}) };

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
      if (filters.endDate) where.createdAt.lte = new Date(filters.endDate);
    }

    if (filters?.minAmount !== undefined || filters?.maxAmount !== undefined) {
      where.totalAmount = {};
      if (filters.minAmount !== undefined) where.totalAmount.gte = filters.minAmount;
      if (filters.maxAmount !== undefined) where.totalAmount.lte = filters.maxAmount;
    }

    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take,
        include: { items: { include: { product: true, spec: true } }, merchant: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    return paginatedResponse(items, total, page, limit);
  }

  async getOrderById(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: { include: { product: true, spec: true } },
        merchant: true,
      },
    });
    if (!order) throw new NotFoundException('订单不存在');
    return order;
  }

  async cancelOrder(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({ where: { id, userId } });
    if (!order) throw new NotFoundException('订单不存在');
    if (order.status !== 'pending') throw new BadRequestException('只有待付款订单可以取消');

    const items = await this.prisma.orderItem.findMany({ where: { orderId: id } });

    return this.prisma.$transaction(async (tx) => {
      // 退还余额
      await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: order.totalAmount } },
      });

      // 恢复库存 + 回减销量
      for (const item of items) {
        if (item.specId) {
          await tx.productSpec.update({
            where: { id: item.specId },
            data: { stock: { increment: item.quantity } },
          });
        }
        await tx.product.update({
          where: { id: item.productId },
          data: { sales: { decrement: item.quantity } },
        });
      }

      // 更新状态
      return tx.order.update({
        where: { id },
        data: { status: 'cancelled' },
      });
    });
  }

  async confirmOrder(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({ where: { id, userId } });
    if (!order) throw new NotFoundException('订单不存在');
    if (order.status !== 'shipped') throw new BadRequestException('只有已发货订单可以确认收货');

    return this.prisma.order.update({
      where: { id },
      data: { status: 'completed' },
    });
  }

  async createOrder(userId: string, dto: CreateOrderDto) {
    // 1. 查询商品真实价格 + 规格
    const productIds = dto.items.map((i) => i.productId);
    const specIds = dto.items.filter((i) => i.specId).map((i) => i.specId!);

    const [products, specs] = await Promise.all([
      this.prisma.product.findMany({ where: { id: { in: productIds } } }),
      specIds.length > 0 ? this.prisma.productSpec.findMany({ where: { id: { in: specIds } } }) : Promise.resolve([] as ProductSpec[]),
    ]);

    if (products.length !== productIds.length) {
      throw new BadRequestException('部分商品不存在');
    }

    const productMap = new Map<string, Product>(products.map((p) => [p.id, p]));
    const specMap = new Map<string, ProductSpec>(specs.map((s) => [s.id, s]));

    // 2. 校验规格 + 计算总金额
    let totalAmount = 0;
    for (const item of dto.items) {
      if (item.specId) {
        const spec = specMap.get(item.specId);
        if (!spec) throw new BadRequestException(`规格 ${item.specId} 不存在`);
        if (spec.productId !== item.productId) throw new BadRequestException('规格与商品不匹配');
        if (spec.stock < item.quantity) throw new BadRequestException(`规格 "${spec.name}:${spec.value}" 库存不足`);
        totalAmount += spec.price * item.quantity;
      } else {
        totalAmount += productMap.get(item.productId)!.price * item.quantity;
      }
    }

    // 3. 校验优惠券 + 计算折扣
    let discountAmount = 0;
    let userCouponRecord: any = null;
    if (dto.couponId) {
      const userCoupon = await this.prisma.userCoupon.findFirst({
        where: { id: dto.couponId, userId, status: 'unused' },
        include: { coupon: true },
      });
      if (!userCoupon) throw new BadRequestException('优惠券不存在或已使用');

      const coupon = userCoupon.coupon;
      const now = new Date();
      if (now < coupon.startTime || now > coupon.endTime) throw new BadRequestException('优惠券不在有效期内');
      if (totalAmount < coupon.minAmount) throw new BadRequestException(`订单金额不满足优惠券最低消费 ${coupon.minAmount} 元`);

      if (coupon.type === 'fixed') {
        discountAmount = coupon.value;
      } else if (coupon.type === 'percent') {
        discountAmount = Math.round(totalAmount * (1 - coupon.value) * 100) / 100;
      }

      userCouponRecord = userCoupon;
    }

    const payAmount = Math.max(0, totalAmount - discountAmount);

    // 4. 校验余额
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');
    if (user.balance < payAmount) {
      throw new BadRequestException('余额不足');
    }

    // 5. 事务：扣余额 + 创建订单 + 创建订单商品 + 扣库存 + 增销量 + 标记优惠券
    const order = await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: payAmount } },
      });

      const newOrder = await tx.order.create({
        data: {
          totalAmount: payAmount,
          discountAmount,
          status: 'paid',
          remark: dto.remark,
          couponId: userCouponRecord?.couponId || null,
          userId,
          merchantId: dto.merchantId,
        },
      });

      await tx.orderItem.createMany({
        data: dto.items.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          specId: item.specId || null,
          quantity: item.quantity,
          price: item.specId
            ? specMap.get(item.specId!)!.price
            : productMap.get(item.productId)!.price,
        })),
      });

      // 扣库存 + 增销量
      for (const item of dto.items) {
        if (item.specId) {
          await tx.productSpec.update({
            where: { id: item.specId },
            data: { stock: { decrement: item.quantity } },
          });
        }
        await tx.product.update({
          where: { id: item.productId },
          data: { sales: { increment: item.quantity } },
        });
      }

      // 标记优惠券已使用
      if (userCouponRecord) {
        await tx.userCoupon.update({
          where: { id: userCouponRecord.id },
          data: { status: 'used', usedAt: new Date() },
        });
      }

      return newOrder;
    });

    return order;
  }

  // ==================== 收藏 ====================

  async getFavorites(userId: string, query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);
    const [items, total] = await Promise.all([
      this.prisma.favorite.findMany({
        where: { userId },
        skip,
        take,
        include: { product: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.favorite.count({ where: { userId } }),
    ]);
    return paginatedResponse(items, total, page, limit);
  }

  async addFavorite(userId: string, productId: string) {
    const existing = await this.prisma.favorite.findFirst({
      where: { userId, productId },
    });
    if (existing) return existing;

    return this.prisma.favorite.create({
      data: { userId, productId },
    });
  }

  async removeFavorite(id: string, userId: string) {
    const fav = await this.prisma.favorite.findFirst({ where: { id, userId } });
    if (!fav) throw new NotFoundException('收藏记录不存在');
    return this.prisma.favorite.delete({ where: { id } });
  }

  // ==================== 关注店铺 ====================

  async getFollows(userId: string, query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);
    const [items, total] = await Promise.all([
      this.prisma.follow.findMany({
        where: { userId },
        skip,
        take,
        include: { merchant: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.follow.count({ where: { userId } }),
    ]);
    return paginatedResponse(items, total, page, limit);
  }

  async addFollow(userId: string, merchantId: string) {
    const existing = await this.prisma.follow.findFirst({
      where: { userId, merchantId },
    });
    if (existing) return existing;

    return this.prisma.follow.create({
      data: { userId, merchantId },
    });
  }

  async removeFollow(id: string, userId: string) {
    const follow = await this.prisma.follow.findFirst({ where: { id, userId } });
    if (!follow) throw new NotFoundException('关注记录不存在');
    return this.prisma.follow.delete({ where: { id } });
  }

  // ==================== 评价 ====================

  async createReview(userId: string, dto: CreateReviewDto) {
    // 校验订单
    const order = await this.prisma.order.findFirst({ where: { id: dto.orderId, userId } });
    if (!order) throw new NotFoundException('订单不存在');
    if (order.status !== 'completed') throw new BadRequestException('只能评价已完成的订单');

    // 校验是否已评价
    const existing = await this.prisma.review.findFirst({
      where: { userId, productId: dto.productId, orderId: dto.orderId },
    });
    if (existing) throw new BadRequestException('该商品已评价');

    const review = await this.prisma.review.create({
      data: {
        rating: dto.rating,
        content: dto.content,
        images: dto.images || undefined,
        userId,
        productId: dto.productId,
        orderId: dto.orderId,
      },
    });

    // 更新商品平均评分
    const agg = await this.prisma.review.aggregate({
      where: { productId: dto.productId },
      _avg: { rating: true },
    });
    await this.prisma.product.update({
      where: { id: dto.productId },
      data: { avgRating: agg._avg.rating || 5.0 },
    });

    return review;
  }

  // ==================== 余额充值 ====================

  async rechargeBalance(userId: string, amount: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');

    return this.prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: amount } },
    });
  }
}
