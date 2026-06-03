import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: '商品名称，建议包含品牌+规格+适用对象等关键信息', example: '皇家K92幼犬粮2kg' })
  @IsString()
  name: string;

  @ApiProperty({ description: '商品单价，单位为元，必须大于0', example: 128.00 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: '商品图片URL数组，建议第一张为主图，最多支持9张', type: [String], example: ['https://picsum.photos/id/237/200/300'] })
  @IsArray()
  images: string[];

  @ApiPropertyOptional({ description: '商品详细描述，支持多行文本，建议包含成分、适用对象、喂养建议等', example: '适合2-12个月幼犬，含DHA促进大脑发育，小颗粒易咀嚼' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '商家ID，标识商品所属店铺。可通过种子数据中的 merchant-1、merchant-2、merchant-3 查看', example: 'merchant-1' })
  @IsString()
  merchantId: string;

  @ApiProperty({ description: '叶子分类ID（即最底层分类）。通过「分类管理」获取，一级分类下可包含子分类', example: 'cat-1-1' })
  @IsString()
  categoryId: string;
}
