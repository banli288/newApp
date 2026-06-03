import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCarouselDto {
  @ApiPropertyOptional({ description: '轮播图图片URL，建议尺寸750x340', example: 'https://picsum.photos/id/237/200/300' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: '点击轮播图后的跳转链接。传空字符串可清除原有链接', example: '/product/prod-2' })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiPropertyOptional({ description: '排序权重，数值越大越靠前', example: 2 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
