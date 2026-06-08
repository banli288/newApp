import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomeCouponService {
  constructor(private prisma: PrismaService) {}

  async getAvailableCoupons() {
    const now = new Date();
    return this.prisma.coupon.findMany({
      where: {
        startTime: { lte: now },
        endTime: { gte: now },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
