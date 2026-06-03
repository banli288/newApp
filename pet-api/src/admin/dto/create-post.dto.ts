import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: '帖子图片URL数组，最多支持9张。第一张将作为封面展示', type: [String], example: ['https://picsum.photos/id/237/200/300'] })
  @IsArray()
  images: string[];

  @ApiProperty({ description: '帖子文字内容，支持换行，建议100-500字', example: '今天带毛孩子去公园散步，遇到了好多小伙伴！分享一下遛狗装备清单 🐶' })
  @IsString()
  content: string;

  @ApiProperty({ description: '商家ID，标识帖子发布者所属商家', example: 'merchant-1' })
  @IsString()
  merchantId: string;
}
