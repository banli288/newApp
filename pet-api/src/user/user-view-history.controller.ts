import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserViewHistoryService } from './user-view-history.service';
import { PaginationQuery } from '../common/pagination';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('浏览记录')
@Controller('user/view-history')
export class UserViewHistoryController {
  constructor(private readonly service: UserViewHistoryService) {}

  @Post(':productId')
  @ApiOperation({
    summary: '记录商品浏览',
    description: '进入商品详情时调用。同一用户同一商品只保留最新一条记录（upsert）。',
  })
  @ApiParam({ name: 'productId', description: '商品ID', example: 'prod-1' })
  @ApiResponse({ status: 201, description: '记录成功' })
  @ApiResponse({ status: 404, description: '商品不存在' })
  recordView(@Param('productId') productId: string) {
    return this.service.recordView(DEFAULT_USER_ID, productId);
  }

  @Get()
  @ApiOperation({
    summary: '浏览历史列表',
    description: '返回当前用户的浏览历史，按时间倒序。支持左滑删除。返回 { items, total, page, limit }。',
  })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回浏览历史列表' })
  getViewHistory(@Query() query: PaginationQuery) {
    return this.service.getViewHistory(DEFAULT_USER_ID, query);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除浏览记录',
    description: '删除指定浏览记录。用于左滑删除交互。',
  })
  @ApiParam({ name: 'id', description: '浏览记录ID', example: 'vh-1' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 404, description: '记录不存在' })
  removeViewHistory(@Param('id') id: string) {
    return this.service.removeViewHistory(id, DEFAULT_USER_ID);
  }
}
