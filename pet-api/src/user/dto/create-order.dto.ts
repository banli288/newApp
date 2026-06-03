import { IsString, IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ description: '商品ID，系统将自动从数据库查询真实价格，无需前端传入价格', example: 'prod-1' })
  @IsString()
  productId: string;

  @ApiProperty({ description: '购买数量，最小为1', example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: '商家ID，标识订单所属店铺', example: 'merchant-1' })
  @IsString()
  merchantId: string;

  @ApiProperty({
    description: '订单商品列表，只需提供商品ID和数量。系统会自动查询商品真实价格并计算总金额，同时校验用户余额是否充足',
    type: [OrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
