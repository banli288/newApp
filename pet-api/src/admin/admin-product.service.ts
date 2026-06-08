import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductSpecDto } from './dto/create-product-spec.dto';
import { UpdateProductSpecDto } from './dto/update-product-spec.dto';

@Injectable()
export class AdminProductService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: dto });
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('商品不存在');
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('商品不存在');
    return this.prisma.product.delete({ where: { id } });
  }

  // ==================== 商品规格 ====================

  async getSpecsByProduct(productId: string) {
    return this.prisma.productSpec.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSpec(dto: CreateProductSpecDto) {
    return this.prisma.productSpec.create({ data: dto });
  }

  async updateSpec(id: string, dto: UpdateProductSpecDto) {
    const spec = await this.prisma.productSpec.findUnique({ where: { id } });
    if (!spec) throw new NotFoundException('商品规格不存在');
    return this.prisma.productSpec.update({ where: { id }, data: dto });
  }

  async removeSpec(id: string) {
    const spec = await this.prisma.productSpec.findUnique({ where: { id } });
    if (!spec) throw new NotFoundException('商品规格不存在');
    return this.prisma.productSpec.delete({ where: { id } });
  }
}
