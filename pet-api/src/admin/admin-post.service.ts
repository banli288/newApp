import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class AdminPostService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePostDto) {
    return this.prisma.post.create({ data: dto });
  }

  async update(id: string, dto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('帖子不存在');
    return this.prisma.post.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('帖子不存在');
    return this.prisma.post.delete({ where: { id } });
  }
}
