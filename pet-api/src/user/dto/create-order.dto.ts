import { IsString, IsArray, ValidateNested, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ description: '商品ID，系统将自动从数据库查询真实价格，无需前端传入价格', example: 'prod-1' })
  @IsString()
  productId: string;

  @ApiPropertyOptional({ description: '规格ID，选填。传入后将使用规格对应的价格和库存；不传则使用商品基础价格', example: 'spec-1' })
  @IsOptional()
  @IsString()
  specId?: string;

  @ApiProperty({ description: '购买数量，最小为1', example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: '商家ID，标识订单所属店铺', example: 'merchant-1' })
  @IsString()
  merchantId: string;

  @ApiPropertyOptional({ description: '买家备注', example: '请尽快发货' })
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiPropertyOptional({ description: '优惠券ID，选填。传入后系统会自动校验优惠券有效性并计算折扣', example: 'uc-1' })
  @IsOptional()
  @IsString()
  couponId?: string;

  @ApiProperty({
    description: '订单商品列表，只需提供商品ID和数量。系统会自动查询商品真实价格并计算总金额，同时校验用户余额是否充足',
    type: [OrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
