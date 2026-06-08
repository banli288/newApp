import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserDashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: string) {
    const [orderAgg, totalOrders, favorites] = await Promise.all([
      this.prisma.order.aggregate({
        where: { userId, status: 'completed' },
        _sum: { totalAmount: true },
        _avg: { totalAmount: true },
      }),
      this.prisma.order.count({ where: { userId, status: 'completed' } }),
      this.prisma.favorite.count({ where: { userId } }),
    ]);

    return {
      totalSpent: orderAgg._sum.totalAmount || 0,
      totalOrders,
      avgOrderAmount: Math.round((orderAgg._avg.totalAmount || 0) * 100) / 100,
      favoriteCount: favorites,
    };
  }

  async getMonthlyTrend(userId: string) {
    // 近12个月的 completed 订单按月聚合
    const now = new Date();
    const months: { month: string; start: Date; end: Date }[] = [];

    for (let i = 11; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const label = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`;
      months.push({ month: label, start, end });
    }

    const results = await Promise.all(
      months.map(async (m) => {
        const agg = await this.prisma.order.aggregate({
          where: {
            userId,
            status: 'completed',
            createdAt: { gte: m.start, lte: m.end },
          },
          _sum: { totalAmount: true },
          _count: true,
        });
        return {
          month: m.month,
          amount: agg._sum.totalAmount || 0,
          count: agg._count,
        };
      }),
    );

    return results;
  }

  async getCategoryBreakdown(userId: string) {
    // 聚合 completed 订单中各分类的消费金额
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        order: { userId, status: 'completed' },
      },
      include: {
        product: { include: { category: true } },
      },
    });

    const categoryMap = new Map<string, { name: string; amount: number; count: number }>();

    for (const item of orderItems) {
      const catName = item.product.category.name;
      const existing = categoryMap.get(catName) || { name: catName, amount: 0, count: 0 };
      existing.amount += item.price * item.quantity;
      existing.count += item.quantity;
      categoryMap.set(catName, existing);
    }

    const total = Array.from(categoryMap.values()).reduce((s, c) => s + c.amount, 0);

    return Array.from(categoryMap.values())
      .map((c) => ({
        ...c,
        amount: Math.round(c.amount * 100) / 100,
        percent: total > 0 ? Math.round((c.amount / total) * 10000) / 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }
}
