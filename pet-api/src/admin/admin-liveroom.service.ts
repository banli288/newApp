import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLiveRoomDto } from './dto/create-liveroom.dto';
import { UpdateLiveRoomDto } from './dto/update-liveroom.dto';

@Injectable()
export class AdminLiveRoomService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLiveRoomDto) {
    return this.prisma.liveRoom.create({ data: dto });
  }

  async update(id: string, dto: UpdateLiveRoomDto) {
    const liveRoom = await this.prisma.liveRoom.findUnique({ where: { id } });
    if (!liveRoom) throw new NotFoundException('直播间不存在');
    return this.prisma.liveRoom.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const liveRoom = await this.prisma.liveRoom.findUnique({ where: { id } });
    if (!liveRoom) throw new NotFoundException('直播间不存在');
    return this.prisma.liveRoom.delete({ where: { id } });
  }
}
