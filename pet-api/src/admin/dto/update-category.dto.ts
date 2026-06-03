import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ description: '分类名称，同一层级下建议不重名', example: '犬粮（精品）' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '分类图标URL', example: 'https://picsum.photos/id/237/200/300' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ description: '父分类ID，变更分类层级关系。注意不可将分类设为自身的子分类', example: 'cat-1' })
  @IsOptional()
  @IsString()
  parentId?: string;
}
