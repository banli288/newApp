import { IsString, IsInt, Min, Max, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ description: '订单ID，只能对已完成的订单进行评价', example: 'order-1' })
  @IsString()
  orderId: string;

  @ApiProperty({ description: '商品ID', example: 'prod-1' })
  @IsString()
  productId: string;

  @ApiProperty({ description: '评分，1-5 星', example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ description: '评价文字内容', example: '质量很好，狗狗很喜欢！' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: '评价图片URL数组', type: [String], example: ['https://picsum.photos/id/237/200/300'] })
  @IsOptional()
  @IsArray()
  images?: string[];
}
