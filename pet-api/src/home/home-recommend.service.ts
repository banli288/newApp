import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomeRecommendService {
  constructor(private prisma: PrismaService) {}

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
        include: { merchant: true, category: true, _count: { select: { favorites: true } } },
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
      include: { merchant: true, category: true, _count: { select: { favorites: true } } },
    });
  }
}
