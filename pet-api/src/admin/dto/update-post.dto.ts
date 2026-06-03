import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({ description: '帖子图片URL数组，传入后将完全替换原有图片列表', type: [String], example: ['https://picsum.photos/id/237/200/300'] })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiPropertyOptional({ description: '帖子文字内容', example: '更新：毛孩子今天学会了新技能！' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: '商家ID，变更帖子所属商家', example: 'merchant-2' })
  @IsOptional()
  @IsString()
  merchantId?: string;
}
