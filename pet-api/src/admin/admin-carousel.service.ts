import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';

@Injectable()
export class AdminCarouselService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCarouselDto) {
    return this.prisma.carousel.create({ data: dto });
  }

  async update(id: string, dto: UpdateCarouselDto) {
    const carousel = await this.prisma.carousel.findUnique({ where: { id } });
    if (!carousel) throw new NotFoundException('轮播图不存在');
    return this.prisma.carousel.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const carousel = await this.prisma.carousel.findUnique({ where: { id } });
    if (!carousel) throw new NotFoundException('轮播图不存在');
    return this.prisma.carousel.delete({ where: { id } });
  }
}
