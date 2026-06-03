import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCartDto {
  @ApiProperty({ description: '商品ID，可通过 GET /home/products 接口获取', example: 'prod-1' })
  @IsString()
  productId: string;

  @ApiProperty({ description: '加入购物车的商品数量，最小为1', example: 2, default: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: '商家ID，标识商品所属店铺，可通过商品详情中的 merchantId 获取', example: 'merchant-1' })
  @IsString()
  merchantId: string;
}
