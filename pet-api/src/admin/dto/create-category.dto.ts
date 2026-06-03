import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: '分类名称，同一层级下建议不重名', example: '犬粮' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: '分类图标URL，建议使用正方形图片，用于前端展示分类入口', example: 'https://picsum.photos/id/237/200/300' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ description: '父分类ID。不传或为空则创建为一级分类；传入已有分类ID则创建为该分类的子分类', example: 'cat-1' })
  @IsOptional()
  @IsString()
  parentId?: string;
}
