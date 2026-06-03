import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQuery, paginationParams } from '../common/pagination';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(keyword: string, query: PaginationQuery) {
    const { skip, take } = paginationParams(query);
    return this.prisma.product.findMany({
      where: {
        name: { contains: keyword },
      },
      skip,
      take,
      include: { merchant: true, category: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
