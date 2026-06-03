import { Controller, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AdminPostService } from './admin-post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('后台-帖子管理')
@Controller('admin/posts')
export class AdminPostController {
  constructor(private readonly service: AdminPostService) {}

  @Post()
  @ApiOperation({
    summary: '创建帖子',
    description: '后台新增一条图文帖子。需提供图片数组、文字内容和所属商家ID。系统会校验 merchantId 是否存在。帖子创建后即可在首页「社区」模块展示。',
  })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: '创建成功，返回帖子详情（含自动生成的ID和发布时间）' })
  @ApiResponse({ status: 400, description: '参数校验失败，如图片数组为空或内容为空' })
  @ApiResponse({ status: 404, description: '商家不存在，merchantId 在商家表中未找到' })
  create(@Body() dto: CreatePostDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新帖子',
    description: '修改指定帖子的信息，所有字段均为可选。可更新图片数组、文字内容和所属商家。修改后首页实时生效。',
  })
  @ApiParam({ name: 'id', description: '帖子ID', example: 'post-1' })
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({ status: 200, description: '更新成功，返回更新后的帖子详情' })
  @ApiResponse({ status: 400, description: '参数校验失败' })
  @ApiResponse({ status: 404, description: '帖子不存在' })
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除帖子',
    description: '永久删除指定帖子及其图片。删除后首页将不再展示该帖子。此操作不可恢复。',
  })
  @ApiParam({ name: 'id', description: '帖子ID', example: 'post-1' })
  @ApiResponse({ status: 200, description: '删除成功，返回被删除的帖子信息' })
  @ApiResponse({ status: 404, description: '帖子不存在' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
