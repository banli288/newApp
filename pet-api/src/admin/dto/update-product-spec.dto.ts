import { IsString, IsNumber, IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductSpecDto {
  @ApiPropertyOptional({ description: '规格名称，如"重量"、"颜色"、"口味"', example: '重量' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '规格值，如"2kg"、"红色"、"鸡肉味"', example: '5kg' })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional({ description: '该规格的价格，单位为元', example: 268.00 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ description: '库存数量，最小为0', example: 50 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}
