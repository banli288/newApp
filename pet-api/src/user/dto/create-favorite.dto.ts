import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({ description: '要收藏的商品ID。同一商品不可重复收藏，重复调用会直接返回已有记录', example: 'prod-8' })
  @IsString()
  productId: string;
}
