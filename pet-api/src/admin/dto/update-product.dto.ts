import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ description: '商品名称，建议包含品牌+规格+适用对象等关键信息', example: '皇家K92幼犬粮2kg（升级版）' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '商品单价，单位为元，必须大于0', example: 138.00 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ description: '商品图片URL数组，传入后将完全替换原有图片列表', type: [String], example: ['https://picsum.photos/id/237/200/300'] })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiPropertyOptional({ description: '商品详细描述', example: '适合2-12个月幼犬，全新升级配方，添加益生菌' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: '商家ID，变更商品所属店铺', example: 'merchant-1' })
  @IsOptional()
  @IsString()
  merchantId?: string;

  @ApiPropertyOptional({ description: '叶子分类ID，变更商品所属分类', example: 'cat-1-1' })
  @IsOptional()
  @IsString()
  categoryId?: string;
}
