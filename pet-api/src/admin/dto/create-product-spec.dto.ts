import { IsString, IsNumber, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductSpecDto {
  @ApiProperty({ description: '规格名称，如"重量"、"颜色"、"口味"', example: '重量' })
  @IsString()
  name: string;

  @ApiProperty({ description: '规格值，如"2kg"、"红色"、"鸡肉味"', example: '2kg' })
  @IsString()
  value: string;

  @ApiProperty({ description: '该规格的价格，单位为元', example: 128.00 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: '库存数量，最小为0', example: 100 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ description: '所属商品ID', example: 'prod-1' })
  @IsString()
  productId: string;
}
