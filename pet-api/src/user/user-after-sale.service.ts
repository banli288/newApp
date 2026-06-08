import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams, paginatedResponse } from '../common/pagination';

@Injectable()
export class UserAfterSaleService {
  constructor(private prisma: PrismaService) {}

  async createAfterSale(userId: string, dto: {
    orderId: string;
    type: string;
    reason: string;
    images?: string[];
    refundAmount: number;
  }) {
    const order = await this.prisma.order.findFirst({
      where: { id: dto.orderId, userId },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('订单不存在');

    // 校验售后类型与订单状态
    if (dto.type === 'refund' && order.status !== 'paid') {
      throw new BadRequestException('仅退款仅支持未发货的订单');
    }
    if (dto.type === 'return_refund' && order.status !== 'completed') {
      throw new BadRequestException('退货退款仅支持已收货的订单');
    }

    // 校验退款金额
    if (dto.refundAmount <= 0 || dto.refundAmount > order.totalAmount) {
      throw new BadRequestException('退款金额不合法');
    }

    const afterSale = await this.prisma.$transaction(async (tx) => {
      const record = await tx.afterSale.create({
        data: {
          orderId: dto.orderId,
          type: dto.type,
          reason: dto.reason,
          images: dto.images || undefined,
          refundAmount: dto.refundAmount,
          status: 'pending',
        },
      });

      await tx.afterSaleLog.create({
        data: {
          afterSaleId: record.id,
          status: 'pending',
          detail: '售后申请已提交，等待审核',
        },
      });

      return record;
    });

    return afterSale;
  }

  async getAfterSales(userId: string, status: string | undefined, query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);
    const where: any = { order: { userId } };
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      this.prisma.afterSale.findMany({
        where,
        skip,
        take,
        include: { order: true, logs: { orderBy: { createdAt: 'asc' } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.afterSale.count({ where }),
    ]);
    return paginatedResponse(items, total, page, limit);
  }

  async getAfterSaleDetail(id: string, userId: string) {
    const afterSale = await this.prisma.afterSale.findFirst({
      where: { id, order: { userId } },
      include: {
        order: { include: { items: { include: { product: true } } } },
        logs: { orderBy: { createdAt: 'asc' } },
      },
    });
    if (!afterSale) throw new NotFoundException('售后记录不存在');
    return afterSale;
  }

  async submitReturnShipping(id: string, userId: string, dto: { trackingNo: string; carrier: string }) {
    const afterSale = await this.prisma.afterSale.findFirst({
      where: { id, order: { userId } },
    });
    if (!afterSale) throw new NotFoundException('售后记录不存在');
    if (afterSale.status !== 'approved') throw new BadRequestException('当前状态不允许提交退货物流');

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.afterSale.update({
        where: { id },
        data: { status: 'returning' },
      });

      await tx.afterSaleLog.create({
        data: {
          afterSaleId: id,
          status: 'returning',
          detail: `已提交退货物流：${dto.carrier} ${dto.trackingNo}`,
        },
      });

      return updated;
    });
  }
}
