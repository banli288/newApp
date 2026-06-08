import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomeRankingService {
  constructor(private prisma: PrismaService) {}

  async getBestSellers(limit: number) {
    return this.prisma.product.findMany({
      take: limit,
      orderBy: { sales: 'desc' },
      include: {
        merchant: true,
        category: true,
        _count: { select: { favorites: true } },
      },
    });
  }

  async getTopRated(limit: number) {
    return this.prisma.product.findMany({
      take: limit,
      orderBy: { avgRating: 'desc' },
      include: {
        merchant: true,
        category: true,
        _count: { select: { favorites: true, reviews: true } },
      },
    });
  }

  async getNewArrivals(limit: number) {
    return this.prisma.product.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        merchant: true,
        category: true,
        _count: { select: { favorites: true } },
      },
    });
  }
}
