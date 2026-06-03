import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCartDto } from './dto/add-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCartGroupedByMerchant(userId: string) {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true, merchant: true },
      orderBy: { createdAt: 'desc' },
    });

    const grouped = new Map<string, { merchantId: string; merchantName: string; items: typeof items }>();

    for (const item of items) {
      const key = item.merchantId;
      if (!grouped.has(key)) {
        grouped.set(key, { merchantId: item.merchantId, merchantName: item.merchant.name, items: [] });
      }
      grouped.get(key)!.items.push(item);
    }

    return Array.from(grouped.values());
  }

  async addToCart(userId: string, dto: AddCartDto) {
    const existing = await this.prisma.cartItem.findFirst({
      where: { userId, productId: dto.productId },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: { increment: dto.quantity } },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        userId,
        productId: dto.productId,
        merchantId: dto.merchantId,
        quantity: dto.quantity,
      },
    });
  }

  async updateQuantity(id: string, quantity: number) {
    const item = await this.prisma.cartItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('购物车项不存在');
    return this.prisma.cartItem.update({ where: { id }, data: { quantity } });
  }

  async removeFromCart(id: string) {
    const item = await this.prisma.cartItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('购物车项不存在');
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
