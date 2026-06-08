import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams, paginatedResponse } from '../common/pagination';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(
    keyword: string,
    query: PaginationQuery,
    filters?: { sort?: string; categoryId?: string; minPrice?: number; maxPrice?: number; brand?: string; minRating?: number },
  ) {
    const { skip, take, page, limit } = paginationParams(query);

    const where: any = {};
    if (keyword) where.name = { contains: keyword };
    if (filters?.categoryId) where.categoryId = filters.categoryId;
    if (filters?.brand) where.brand = filters.brand;
    if (filters?.minRating !== undefined) where.avgRating = { gte: filters.minRating };
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }

    const orderBy = this.buildOrderBy(filters?.sort);

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        include: { merchant: true, category: true },
        orderBy,
      }),
      this.prisma.product.count({ where }),
    ]);

    return paginatedResponse(items, total, page, limit);
  }

  async searchShops(keyword: string, query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);
    const where = keyword
      ? { OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }] }
      : {};

    const [items, total] = await Promise.all([
      this.prisma.merchant.findMany({
        where,
        skip,
        take,
        include: { _count: { select: { follows: true, products: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.merchant.count({ where }),
    ]);

    return paginatedResponse(items, total, page, limit);
  }

  async getBrands() {
    const products = await this.prisma.product.findMany({
      where: { brand: { not: null } },
      select: { brand: true },
      distinct: ['brand'],
      orderBy: { brand: 'asc' },
    });
    return products.map((p) => p.brand).filter(Boolean);
  }

  async getHotSearches() {
    return this.prisma.hotSearch.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  private buildOrderBy(sort?: string): Record<string, string> {
    switch (sort) {
      case 'price_asc': return { price: 'asc' };
      case 'price_desc': return { price: 'desc' };
      case 'sales_desc': return { sales: 'desc' };
      case 'rating_desc': return { avgRating: 'desc' };
      case 'created_asc': return { createdAt: 'asc' };
      default: return { createdAt: 'desc' };
    }
  }
}
