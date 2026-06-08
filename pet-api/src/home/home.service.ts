import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams, paginatedResponse } from '../common/pagination';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService) {}

  // ==================== 轮播图 ====================

  async getCarousels() {
    return this.prisma.carousel.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  // ==================== 商品列表（增强版） ====================

  async getProducts(
    query: PaginationQuery,
    filters?: { sort?: string; categoryId?: string; minPrice?: number; maxPrice?: number; brand?: string; minRating?: number },
  ) {
    const { skip, take, page, limit } = paginationParams(query);

    const where: any = {};
    if (filters?.categoryId) where.categoryId = filters.categoryId;
    if (filters?.brand) where.brand = filters.brand;
    if (filters?.minRating !== undefined) where.avgRating = { gte: filters.minRating };
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }

    const orderBy = this.buildProductOrderBy(filters?.sort);

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

  // ==================== 分类商品列表 ====================

  async getProductsByCategory(
    categoryId: string,
    query: PaginationQuery,
    sort?: string,
  ) {
    const { skip, take, page, limit } = paginationParams(query);
    const orderBy = this.buildProductOrderBy(sort);

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { categoryId },
        skip,
        take,
        include: { merchant: true, category: true },
        orderBy,
      }),
      this.prisma.product.count({ where: { categoryId } }),
    ]);

    return paginatedResponse(items, total, page, limit);
  }

  // ==================== 店铺商品列表 ====================

  async getProductsByMerchant(
    merchantId: string,
    query: PaginationQuery,
    sort?: string,
  ) {
    const { skip, take, page, limit } = paginationParams(query);
    const orderBy = this.buildProductOrderBy(sort);

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { merchantId },
        skip,
        take,
        include: { merchant: true, category: true },
        orderBy,
      }),
      this.prisma.product.count({ where: { merchantId } }),
    ]);

    return paginatedResponse(items, total, page, limit);
  }

  // ==================== 分类 ====================

  async getCategories() {
    return this.prisma.category.findMany({
      where: { parentId: null },
      include: { children: true },
    });
  }

  // ==================== 直播间 ====================

  async getLiveRooms() {
    return this.prisma.liveRoom.findMany({
      include: { merchant: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ==================== 帖子 ====================

  async getPosts(query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);
    const [items, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take,
        include: {
          merchant: true,
          _count: { select: { likes: true, comments: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.post.count(),
    ]);
    return paginatedResponse(items, total, page, limit);
  }

  async togglePostLike(postId: string, userId: string) {
    const existing = await this.prisma.postLike.findFirst({
      where: { userId, postId },
    });

    if (existing) {
      await this.prisma.postLike.delete({ where: { id: existing.id } });
      return { liked: false };
    }

    await this.prisma.postLike.create({ data: { userId, postId } });
    return { liked: true };
  }

  async getPostComments(postId: string, query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);
    const [items, total] = await Promise.all([
      this.prisma.postComment.findMany({
        where: { postId },
        skip,
        take,
        include: { user: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.postComment.count({ where: { postId } }),
    ]);
    return paginatedResponse(items, total, page, limit);
  }

  async createPostComment(postId: string, userId: string, content: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('帖子不存在');

    return this.prisma.postComment.create({
      data: { content, userId, postId },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }

  // ==================== 商品详情（含浏览量） ====================

  async getProductById(id: string) {
    const product = await this.prisma.product.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      include: {
        merchant: true,
        category: true,
        specs: true,
        _count: { select: { favorites: true, reviews: true } },
      },
    }).catch(() => null);

    if (!product) throw new NotFoundException('商品不存在');
    return product;
  }

  // ==================== 商品评价 ====================

  async getProductReviews(productId: string, query: PaginationQuery) {
    const { skip, take, page, limit } = paginationParams(query);
    const [items, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { productId },
        skip,
        take,
        include: { user: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.review.count({ where: { productId } }),
    ]);
    return paginatedResponse(items, total, page, limit);
  }

  async getProductRating(productId: string) {
    const [agg, distribution] = await Promise.all([
      this.prisma.review.aggregate({
        where: { productId },
        _avg: { rating: true },
        _count: true,
      }),
      this.prisma.review.groupBy({
        by: ['rating'],
        where: { productId },
        _count: true,
      }),
    ]);

    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const d of distribution) {
      dist[d.rating] = d._count;
    }

    return {
      avgRating: agg._avg.rating || 5.0,
      totalCount: agg._count,
      distribution: dist,
    };
  }

  // ==================== 店铺详情 ====================

  async getMerchantById(id: string) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id },
      include: {
        products: true,
        _count: { select: { follows: true } },
      },
    });
    if (!merchant) throw new NotFoundException('店铺不存在');
    return merchant;
  }

  // ==================== 排序映射 ====================

  private buildProductOrderBy(sort?: string): Record<string, string> {
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
