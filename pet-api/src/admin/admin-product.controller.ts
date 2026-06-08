import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AdminProductService } from './admin-product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductSpecDto } from './dto/create-product-spec.dto';
import { UpdateProductSpecDto } from './dto/update-product-spec.dto';

@ApiTags('后台-商品管理')
@Controller('admin/products')
export class AdminProductController {
  constructor(private readonly service: AdminProductService) {}

  @Post()
  @ApiOperation({
    summary: '创建商品',
    description: '后台新增一条商品记录。需要提供商品名称、价格、图片数组、商家ID和叶子分类ID。商品创建后即可在前台首页和搜索结果中展示。系统会校验 merchantId 和 categoryId 是否存在。',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: '创建成功，返回完整的商品记录（含自动生成的ID和时间戳）' })
  @ApiResponse({ status: 400, description: '参数校验失败，如缺少必填字段、价格不合法或图片数组为空' })
  @ApiResponse({ status: 404, description: '关联数据不存在，merchantId 或 categoryId 在数据库中未找到' })
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新商品',
    description: '修改指定商品的信息，所有字段均为可选，只传需要修改的字段。可修改名称、价格、图片、描述、商家和分类。修改后前台实时生效。',
  })
  @ApiParam({ name: 'id', description: '商品ID，即 Product 记录的唯一标识', example: 'prod-1' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: '更新成功，返回更新后的完整商品记录' })
  @ApiResponse({ status: 400, description: '参数校验失败' })
  @ApiResponse({ status: 404, description: '商品不存在，传入的 id 未在商品表中找到' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除商品',
    description: '永久删除指定商品。删除后前台将不再展示该商品，已有的订单记录不受影响（订单快照独立存储）。此操作不可恢复。',
  })
  @ApiParam({ name: 'id', description: '商品ID', example: 'prod-1' })
  @ApiResponse({ status: 200, description: '删除成功，返回被删除的商品信息' })
  @ApiResponse({ status: 404, description: '商品不存在' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  // ==================== 商品规格管理 ====================

  @Get(':id/specs')
  @ApiOperation({
    summary: '查询商品规格列表',
    description: '返回指定商品下的所有规格，按创建时间倒序排列。每个规格包含名称、值、价格和库存信息。',
  })
  @ApiParam({ name: 'id', description: '商品ID', example: 'prod-1' })
  @ApiResponse({ status: 200, description: '成功返回规格列表，每项含 id、name、value、price、stock 字段' })
  getSpecsByProduct(@Param('id') id: string) {
    return this.service.getSpecsByProduct(id);
  }

  @Post('specs')
  @ApiOperation({
    summary: '创建商品规格',
    description: '为指定商品新增一种规格（如重量、颜色、口味等）。每种规格可独立设置价格和库存。',
  })
  @ApiBody({ type: CreateProductSpecDto })
  @ApiResponse({ status: 201, description: '创建成功，返回完整的规格记录' })
  @ApiResponse({ status: 400, description: '参数校验失败' })
  createSpec(@Body() dto: CreateProductSpecDto) {
    return this.service.createSpec(dto);
  }

  @Patch('specs/:id')
  @ApiOperation({
    summary: '更新商品规格',
    description: '修改指定规格的信息，所有字段均为可选，只传需要修改的字段。可修改规格名称、值、价格和库存。',
  })
  @ApiParam({ name: 'id', description: '规格ID', example: 'spec-1' })
  @ApiBody({ type: UpdateProductSpecDto })
  @ApiResponse({ status: 200, description: '更新成功，返回更新后的规格记录' })
  @ApiResponse({ status: 404, description: '规格不存在' })
  updateSpec(@Param('id') id: string, @Body() dto: UpdateProductSpecDto) {
    return this.service.updateSpec(id, dto);
  }

  @Delete('specs/:id')
  @ApiOperation({
    summary: '删除商品规格',
    description: '永久删除指定规格。删除后不可恢复。',
  })
  @ApiParam({ name: 'id', description: '规格ID', example: 'spec-1' })
  @ApiResponse({ status: 200, description: '删除成功，返回被删除的规格信息' })
  @ApiResponse({ status: 404, description: '规格不存在' })
  removeSpec(@Param('id') id: string) {
    return this.service.removeSpec(id);
  }
}
