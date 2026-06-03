import { Controller, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AdminCategoryService } from './admin-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('后台-分类管理')
@Controller('admin/categories')
export class AdminCategoryController {
  constructor(private readonly service: AdminCategoryService) {}

  @Post()
  @ApiOperation({
    summary: '创建分类',
    description: '后台新增一个商品分类。可创建一级分类（不传 parentId）或二级分类（传入父分类ID）。系统会校验 parentId 是否存在。分类创建后可用于商品关联。',
  })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: '创建成功，返回分类详情（含自动生成的ID）' })
  @ApiResponse({ status: 400, description: '参数校验失败，如分类名称为空' })
  @ApiResponse({ status: 404, description: '父分类不存在，parentId 在分类表中未找到' })
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新分类',
    description: '修改指定分类的信息，所有字段均为可选。可修改分类名称、图标和父分类。注意：不可将分类设为自身的子分类（循环引用校验）。',
  })
  @ApiParam({ name: 'id', description: '分类ID', example: 'cat-1' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: '更新成功，返回更新后的分类详情' })
  @ApiResponse({ status: 400, description: '参数校验失败或循环引用' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除分类',
    description: '永久删除指定分类。若该分类下存在子分类或关联商品，删除可能导致数据关联异常，请谨慎操作。建议先清空分类下的商品再删除。',
  })
  @ApiParam({ name: 'id', description: '分类ID', example: 'cat-1' })
  @ApiResponse({ status: 200, description: '删除成功，返回被删除的分类信息' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
