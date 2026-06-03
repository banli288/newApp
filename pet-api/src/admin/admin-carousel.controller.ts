import { Controller, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AdminCarouselService } from './admin-carousel.service';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';

@ApiTags('后台-轮播图管理')
@Controller('admin/carousels')
export class AdminCarouselController {
  constructor(private readonly service: AdminCarouselService) {}

  @Post()
  @ApiOperation({
    summary: '创建轮播图',
    description: '后台新增一张轮播图。需提供图片URL，可选设置跳转链接和排序权重。排序权重数值越大越靠前，默认为0。轮播图创建后立即在首页展示。',
  })
  @ApiBody({ type: CreateCarouselDto })
  @ApiResponse({ status: 201, description: '创建成功，返回轮播图详情（含自动生成的ID）' })
  @ApiResponse({ status: 400, description: '参数校验失败，如图片URL为空或 sortOrder 格式错误' })
  create(@Body() dto: CreateCarouselDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新轮播图',
    description: '修改指定轮播图的信息，所有字段均为可选。可更新图片、跳转链接和排序权重。修改后首页实时生效。',
  })
  @ApiParam({ name: 'id', description: '轮播图ID', example: 'carousel-1' })
  @ApiBody({ type: UpdateCarouselDto })
  @ApiResponse({ status: 200, description: '更新成功，返回更新后的轮播图详情' })
  @ApiResponse({ status: 400, description: '参数校验失败' })
  @ApiResponse({ status: 404, description: '轮播图不存在' })
  update(@Param('id') id: string, @Body() dto: UpdateCarouselDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除轮播图',
    description: '永久删除指定轮播图。删除后首页将不再展示该轮播图。此操作不可恢复。',
  })
  @ApiParam({ name: 'id', description: '轮播图ID', example: 'carousel-1' })
  @ApiResponse({ status: 200, description: '删除成功，返回被删除的轮播图信息' })
  @ApiResponse({ status: 404, description: '轮播图不存在' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
