import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams } from '../common/pagination';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateOrderDto } from './dto/create-order.dto';

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

  async getOrders(userId: string, status: string | undefined, query: PaginationQuery) {
    const { skip, take } = paginationParams(query);
    return this.prisma.order.findMany({
      where: { userId, ...(status ? { status } : {}) },
      skip,
      take,
      include: { items: { include: { product: true } }, merchant: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createOrder(userId: string, dto: CreateOrderDto) {
    // 1. 查询商品真实价格
    const productIds = dto.items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('部分商品不存在');
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    // 2. 计算总金额
    const totalAmount = dto.items.reduce((sum, item) => {
      const price = productMap.get(item.productId)!.price;
      return sum + price * item.quantity;
    }, 0);

    // 3. 校验余额
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');
    if (user.balance < totalAmount) {
      throw new BadRequestException('余额不足');
    }

    // 4. 事务：扣余额 + 创建订单 + 创建订单商品
    const order = await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalAmount } },
      });

      const newOrder = await tx.order.create({
        data: {
          totalAmount,
          status: 'paid',
          userId,
          merchantId: dto.merchantId,
        },
      });

      await tx.orderItem.createMany({
        data: dto.items.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: productMap.get(item.productId)!.price,
        })),
      });

      return newOrder;
    });

    return order;
  }

  // ==================== 收藏 ====================

  async getFavorites(userId: string, query: PaginationQuery) {
    const { skip, take } = paginationParams(query);
    return this.prisma.favorite.findMany({
      where: { userId },
      skip,
      take,
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
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
}
