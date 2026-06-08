import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams, paginatedResponse } from '../common/pagination';

@Injectable()
export class UserCouponService {
  constructor(private prisma: PrismaService) {}

  async claimCoupon(userId: string, couponId: string) {
    // 校验优惠券存在
    const coupon = await this.prisma.coupon.findUnique({ where: { id: couponId } });
    if (!coupon) throw new NotFoundException('优惠券不存在');

    // 校验有效期
    const now = new Date();
    if (now < coupon.startTime) throw new BadRequestException('优惠券尚未开始');
    if (now > coupon.endTime) throw new BadRequestException('优惠券已过期');

    // 校验库存
    if (coupon.claimed >= coupon.total) throw new BadRequestException('优惠券已领完');

    // 幂等：已领取则返回
    const existing = await this.prisma.userCoupon.findFirst({
      where: { userId, couponId },
    });
    if (existing) return existing;

    // 事务：领取 + 已领数+1
    return this.prisma.$transaction(async (tx) => {
      const userCoupon = await tx.userCoupon.create({
        data: { userId, couponId },
      });
      await tx.coupon.update({
        where: { id: couponId },
        data: { claimed: { increment: 1 } },
      });
      return userCoupon;
    });
  }

  async getMyCoupons(userId: string, status: string | undefined, query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);
    const where: any = { userId };
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      this.prisma.userCoupon.findMany({
        where,
        skip,
        take,
        include: { coupon: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.userCoupon.count({ where }),
    ]);

    return paginatedResponse(items, total, page, limit);
  }

  async getAvailableForCheckout(userId: string, orderAmount: number) {
    const now = new Date();
    return this.prisma.userCoupon.findMany({
      where: {
        userId,
        status: 'unused',
        coupon: {
          startTime: { lte: now },
          endTime: { gte: now },
          minAmount: { lte: orderAmount },
        },
      },
      include: { coupon: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
