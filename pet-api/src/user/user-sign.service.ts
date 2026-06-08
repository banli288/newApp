import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams, paginatedResponse } from '../common/pagination';

@Injectable()
export class UserSignService {
  constructor(private prisma: PrismaService) {}

  async sign(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');

    const today = this.getDateStr(new Date());
    const yesterday = this.getDateStr(new Date(Date.now() - 86400000));

    // 校验今天是否已签
    const existing = await this.prisma.signRecord.findFirst({
      where: { userId, signDate: today },
    });
    if (existing) throw new BadRequestException('今天已签到');

    // 计算连续天数
    const yesterdayRecord = await this.prisma.signRecord.findFirst({
      where: { userId, signDate: yesterday },
    });
    const streak = yesterdayRecord ? yesterdayRecord.streak + 1 : 1;

    // 计算积分：第1天+5，第2天+6，...第7天+11，之后每天+10
    const points = streak <= 7 ? 4 + streak : 10;

    // 事务：创建签到记录 + 加积分 + 记录积分日志 + 更新用户
    await this.prisma.$transaction(async (tx) => {
      await tx.signRecord.create({
        data: { userId, points, streak, signDate: today },
      });
      await tx.user.update({
        where: { id: userId },
        data: {
          points: { increment: points },
          signDays: { increment: 1 },
          lastSignAt: new Date(),
        },
      });
      await tx.pointLog.create({
        data: {
          userId,
          type: 'earn_sign',
          amount: points,
          description: `第${streak}天连续签到，获得${points}积分`,
        },
      });
    });

    return { points, streak, message: `签到成功！连续签到第${streak}天，获得${points}积分` };
  }

  async getCalendar(userId: string, year?: number, month?: number) {
    const now = new Date();
    const y = year || now.getFullYear();
    const m = month || now.getMonth() + 1;
    const prefix = `${y}-${String(m).padStart(2, '0')}`;

    const records = await this.prisma.signRecord.findMany({
      where: {
        userId,
        signDate: { startsWith: prefix },
      },
      orderBy: { signDate: 'asc' },
    });

    return {
      year: y,
      month: m,
      signedDays: records.map((r) => parseInt(r.signDate.split('-')[2])),
      totalSigned: records.length,
    };
  }

  async getPoints(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');

    const recentLogs = await this.prisma.pointLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return {
      points: user.points,
      signDays: user.signDays,
      lastSignAt: user.lastSignAt,
      recentLogs,
    };
  }

  async getPointLogs(userId: string, type: string | undefined, query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);
    const where: any = { userId };
    if (type) where.type = type;

    const [items, total] = await Promise.all([
      this.prisma.pointLog.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      this.prisma.pointLog.count({ where }),
    ]);
    return paginatedResponse(items, total, page, limit);
  }

  async redeemCoupon(userId: string, couponId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');

    const coupon = await this.prisma.coupon.findUnique({ where: { id: couponId } });
    if (!coupon) throw new NotFoundException('优惠券不存在');

    // 兑换所需积分 = 优惠券面值 * 10（简单规则）
    const costPoints = Math.ceil(coupon.value * 10);
    if (user.points < costPoints) throw new BadRequestException(`积分不足，需要${costPoints}积分`);

    // 校验是否已领取
    const existing = await this.prisma.userCoupon.findFirst({
      where: { userId, couponId },
    });
    if (existing) throw new BadRequestException('已拥有该优惠券');

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { points: { decrement: costPoints } },
      });
      await tx.userCoupon.create({
        data: { userId, couponId },
      });
      await tx.coupon.update({
        where: { id: couponId },
        data: { claimed: { increment: 1 } },
      });
      await tx.pointLog.create({
        data: {
          userId,
          type: 'redeem_coupon',
          amount: -costPoints,
          description: `兑换优惠券「${coupon.name}」，消耗${costPoints}积分`,
        },
      });
    });

    return { success: true, costPoints, message: `兑换成功，消耗${costPoints}积分` };
  }

  private getDateStr(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
}
