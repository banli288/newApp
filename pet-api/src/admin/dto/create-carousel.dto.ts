import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarouselDto {
  @ApiProperty({ description: '轮播图图片URL，建议尺寸750x340，支持jpg/png格式', example: 'https://picsum.photos/id/237/200/300' })
  @IsString()
  image: string;

  @ApiPropertyOptional({ description: '点击轮播图后的跳转链接，可为站内路由或外部URL。不传则不跳转', example: '/product/prod-1' })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiPropertyOptional({ description: '排序权重，数值越大越靠前。默认为0', example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
