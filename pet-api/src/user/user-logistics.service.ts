import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserLogisticsService {
  constructor(private prisma: PrismaService) {}

  async getLogistics(orderId: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      select: { id: true, trackingNo: true, carrier: true, status: true },
    });
    if (!order) throw new NotFoundException('订单不存在');

    const events = await this.prisma.logisticsEvent.findMany({
      where: { orderId },
      orderBy: { createdAt: 'asc' },
    });

    return {
      trackingNo: order.trackingNo,
      carrier: order.carrier,
      status: order.status,
      events,
    };
  }
}
