import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams, paginatedResponse } from '../common/pagination';

@Injectable()
export class UserViewHistoryService {
  constructor(private prisma: PrismaService) {}

  async recordView(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('商品不存在');

    // upsert：同一用户同一商品只保留最新一条
    const existing = await this.prisma.viewHistory.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      return this.prisma.viewHistory.update({
        where: { id: existing.id },
        data: { createdAt: new Date() },
      });
    }

    return this.prisma.viewHistory.create({
      data: { userId, productId },
    });
  }

  async getViewHistory(userId: string, query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);

    const [items, total] = await Promise.all([
      this.prisma.viewHistory.findMany({
        where: { userId },
        skip,
        take,
        include: { product: { include: { merchant: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.viewHistory.count({ where: { userId } }),
    ]);
    return paginatedResponse(items, total, page, limit);
  }

  async removeViewHistory(id: string, userId: string) {
    const record = await this.prisma.viewHistory.findFirst({ where: { id, userId } });
    if (!record) throw new NotFoundException('浏览记录不存在');
    return this.prisma.viewHistory.delete({ where: { id } });
  }

  async getRecommendations(userId: string, limit: number) {
    // 统计用户浏览最多的分类 Top3
    const histories = await this.prisma.viewHistory.findMany({
      where: { userId },
      include: { product: { select: { categoryId: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    if (histories.length === 0) {
      // 无浏览记录，返回热销商品
      return this.prisma.product.findMany({
        take: limit,
        orderBy: { sales: 'desc' },
        include: { merchant: true, category: true },
      });
    }

    // 统计分类频率
    const categoryCount = new Map<string, number>();
    for (const h of histories) {
      const catId = h.product.categoryId;
      categoryCount.set(catId, (categoryCount.get(catId) || 0) + 1);
    }

    const topCategories = Array.from(categoryCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([catId]) => catId);

    // 从这些分类中推荐（排除已浏览的商品）
    const viewedProductIds = histories.map((h) => h.productId);

    return this.prisma.product.findMany({
      where: {
        categoryId: { in: topCategories },
        id: { notIn: viewedProductIds },
      },
      take: limit,
      orderBy: { avgRating: 'desc' },
      include: { merchant: true, category: true },
    });
  }
}
