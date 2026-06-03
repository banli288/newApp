import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams } from '../common/pagination';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService) {}

  async getCarousels() {
    return this.prisma.carousel.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getProducts(query: PaginationQuery) {
    const { skip, take } = paginationParams(query);
    return this.prisma.product.findMany({
      skip,
      take,
      include: { merchant: true, category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany({
      where: { parentId: null },
      include: { children: true },
    });
  }

  async getLiveRooms() {
    return this.prisma.liveRoom.findMany({
      include: { merchant: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPosts(query: PaginationQuery) {
    const { skip, take } = paginationParams(query);
    return this.prisma.post.findMany({
      skip,
      take,
      include: { merchant: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
