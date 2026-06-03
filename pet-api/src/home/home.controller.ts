import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HomeService } from './home.service';
import { PaginationQuery } from '../common/pagination';

@ApiTags('首页')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('carousels')
  @ApiOperation({
    summary: '获取轮播图列表',
    description: '返回首页轮播图列表，按 sortOrder 降序排列（数值越大越靠前）。每张轮播图包含图片URL、跳转链接和排序权重。用于首页顶部轮播区域。',
  })
  @ApiResponse({ status: 200, description: '成功返回轮播图列表，每项含 id、image、link、sortOrder 字段。无数据时返回空数组' })
  getCarousels() {
    return this.homeService.getCarousels();
  }

  @Get('products')
  @ApiOperation({
    summary: '获取推荐商品列表',
    description: '返回首页推荐商品列表，支持分页。每个商品包含名称、价格、图片、商家名称、分类名称等信息。商品图片为数组格式（images），通常第一张为主图。用于首页商品推荐卡片。',
  })
  @ApiQuery({ name: 'page', required: false, description: '页码，从1开始，默认为1', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数，默认为10，最大50', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回商品列表，每项含 id、name、price、images、merchant、category 等字段' })
  @ApiResponse({ status: 400, description: '分页参数格式错误，如 page 或 limit 为负数' })
  getProducts(@Query() query: PaginationQuery) {
    return this.homeService.getProducts(query);
  }

  @Get('categories')
  @ApiOperation({
    summary: '获取分类树（一级含二级子分类）',
    description: '返回完整的商品分类树结构。一级分类包含 children 数组存放二级分类，形成树形结构。每个分类节点含 id、name、icon 字段。用于首页分类导航和商品筛选。',
  })
  @ApiResponse({ status: 200, description: '成功返回分类树，根节点为一级分类数组，每个一级分类含 children 二级分类数组' })
  getCategories() {
    return this.homeService.getCategories();
  }

  @Get('live-rooms')
  @ApiOperation({
    summary: '获取直播间列表',
    description: '返回所有直播间列表，包含封面图、标题、商家信息等。用于首页直播推荐入口。每个直播间关联一个商家。',
  })
  @ApiResponse({ status: 200, description: '成功返回直播间列表，每项含 id、coverImage、title、merchant（商家信息）字段' })
  getLiveRooms() {
    return this.homeService.getLiveRooms();
  }

  @Get('posts')
  @ApiOperation({
    summary: '获取图文贴列表',
    description: '返回商家发布的图文帖子列表，支持分页，按发布时间倒序。每个帖子包含图片数组、文字内容、商家信息和发布时间。用于首页「社区」或「动态」模块。',
  })
  @ApiQuery({ name: 'page', required: false, description: '页码，从1开始，默认为1', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数，默认为10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回帖子列表，每项含 id、images、content、merchant、createdAt 等字段' })
  @ApiResponse({ status: 400, description: '分页参数格式错误' })
  getPosts(@Query() query: PaginationQuery) {
    return this.homeService.getPosts(query);
  }
}
