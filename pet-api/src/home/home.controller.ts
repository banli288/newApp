import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { HomeService } from './home.service';
import { PaginationQuery } from '../common/pagination';
import { CreatePostCommentDto } from './dto/post-comment.dto';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('首页')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('carousels')
  @ApiOperation({
    summary: '获取轮播图列表',
    description: '返回首页轮播图列表，按 sortOrder 升序排列。每张轮播图包含图片URL、跳转链接和排序权重。',
  })
  @ApiResponse({ status: 200, description: '成功返回轮播图列表' })
  getCarousels() {
    return this.homeService.getCarousels();
  }

  // ==================== 商品列表（增强版） ====================

  @Get('products')
  @ApiOperation({
    summary: '获取推荐商品列表',
    description: '返回商品列表，支持排序、分类筛选、价格区间筛选。返回 { items, total, page, limit }。排序可选：price_asc/price_desc/sales_desc/rating_desc/created_desc（默认）。',
  })
  @ApiQuery({ name: 'sort', required: false, description: '排序方式', example: 'sales_desc', enum: ['price_asc', 'price_desc', 'sales_desc', 'rating_desc', 'created_desc', 'created_asc'] })
  @ApiQuery({ name: 'categoryId', required: false, description: '分类ID筛选', example: 'cat-dog-food' })
  @ApiQuery({ name: 'brand', required: false, description: '品牌筛选', example: '皇家' })
  @ApiQuery({ name: 'minRating', required: false, description: '最低评分筛选', example: 4 })
  @ApiQuery({ name: 'minPrice', required: false, description: '最低价格', example: 50 })
  @ApiQuery({ name: 'maxPrice', required: false, description: '最高价格', example: 300 })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认为1', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数，默认为10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回商品列表，格式 { items, total, page, limit }' })
  getProducts(
    @Query('sort') sort: string,
    @Query('categoryId') categoryId: string,
    @Query('brand') brand: string,
    @Query('minRating') minRating: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query() query: PaginationQuery,
  ) {
    return this.homeService.getProducts(query, {
      sort,
      categoryId,
      brand,
      minRating: minRating ? Number(minRating) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  // ==================== 分类商品列表 ====================

  @Get('categories/:id/products')
  @ApiOperation({
    summary: '获取分类下的商品列表',
    description: '返回指定分类下的商品列表，支持排序和分页。返回 { items, total, page, limit }。',
  })
  @ApiParam({ name: 'id', description: '分类ID', example: 'cat-dog-food' })
  @ApiQuery({ name: 'sort', required: false, description: '排序方式', example: 'sales_desc' })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回商品列表' })
  getProductsByCategory(
    @Param('id') id: string,
    @Query('sort') sort: string,
    @Query() query: PaginationQuery,
  ) {
    return this.homeService.getProductsByCategory(id, query, sort);
  }

  // ==================== 店铺商品列表 ====================

  @Get('merchants/:id/products')
  @ApiOperation({
    summary: '获取店铺下的商品列表',
    description: '返回指定店铺的商品列表，支持排序和分页。返回 { items, total, page, limit }。',
  })
  @ApiParam({ name: 'id', description: '店铺商家ID', example: 'merchant-1' })
  @ApiQuery({ name: 'sort', required: false, description: '排序方式', example: 'price_asc' })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回商品列表' })
  getProductsByMerchant(
    @Param('id') id: string,
    @Query('sort') sort: string,
    @Query() query: PaginationQuery,
  ) {
    return this.homeService.getProductsByMerchant(id, query, sort);
  }

  // ==================== 分类 ====================

  @Get('categories')
  @ApiOperation({
    summary: '获取分类树（一级含二级子分类）',
    description: '返回完整的商品分类树结构。一级分类包含 children 数组存放二级分类。',
  })
  @ApiResponse({ status: 200, description: '成功返回分类树' })
  getCategories() {
    return this.homeService.getCategories();
  }

  // ==================== 直播间 ====================

  @Get('live-rooms')
  @ApiOperation({
    summary: '获取直播间列表',
    description: '返回所有直播间列表，包含封面图、标题、商家信息等。',
  })
  @ApiResponse({ status: 200, description: '成功返回直播间列表' })
  getLiveRooms() {
    return this.homeService.getLiveRooms();
  }

  // ==================== 帖子 ====================

  @Get('posts')
  @ApiOperation({
    summary: '获取图文贴列表',
    description: '返回商家发布的图文帖子列表，支持分页。每个帖子包含点赞数和评论数。返回 { items, total, page, limit }。',
  })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回帖子列表' })
  getPosts(@Query() query: PaginationQuery) {
    return this.homeService.getPosts(query);
  }

  @Post('posts/:id/like')
  @ApiOperation({
    summary: '点赞/取消点赞帖子',
    description: '切换帖子的点赞状态。若已点赞则取消，若未点赞则点赞（幂等切换）。返回 { liked: true/false } 表示当前状态。',
  })
  @ApiParam({ name: 'id', description: '帖子ID', example: 'post-1' })
  @ApiResponse({ status: 201, description: '返回 { liked: true } 或 { liked: false }' })
  @ApiResponse({ status: 404, description: '帖子不存在' })
  togglePostLike(@Param('id') id: string) {
    return this.homeService.togglePostLike(id, DEFAULT_USER_ID);
  }

  @Get('posts/:id/comments')
  @ApiOperation({
    summary: '获取帖子评论列表',
    description: '返回指定帖子的评论列表，按时间倒序。每条评论包含用户头像和昵称。返回 { items, total, page, limit }。',
  })
  @ApiParam({ name: 'id', description: '帖子ID', example: 'post-1' })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回评论列表' })
  getPostComments(@Param('id') id: string, @Query() query: PaginationQuery) {
    return this.homeService.getPostComments(id, query);
  }

  @Post('posts/:id/comments')
  @ApiOperation({
    summary: '发表帖子评论',
    description: '对指定帖子发表文字评论。',
  })
  @ApiParam({ name: 'id', description: '帖子ID', example: 'post-1' })
  @ApiBody({ type: CreatePostCommentDto })
  @ApiResponse({ status: 201, description: '评论成功，返回评论详情（含用户信息）' })
  @ApiResponse({ status: 404, description: '帖子不存在' })
  createPostComment(@Param('id') id: string, @Body() dto: CreatePostCommentDto) {
    return this.homeService.createPostComment(id, DEFAULT_USER_ID, dto.content);
  }

  // ==================== 商品详情 ====================

  @Get('products/:id')
  @ApiOperation({
    summary: '获取商品详情',
    description: '返回商品完整详情，包含规格列表、收藏数量、评价数量、销量、浏览量（自动+1）、平均评分。',
  })
  @ApiParam({ name: 'id', description: '商品ID', example: 'prod-1' })
  @ApiResponse({ status: 200, description: '成功返回商品详情' })
  @ApiResponse({ status: 404, description: '商品不存在' })
  getProductById(@Param('id') id: string) {
    return this.homeService.getProductById(id);
  }

  // ==================== 商品评价 ====================

  @Get('products/:id/reviews')
  @ApiOperation({
    summary: '获取商品评价列表',
    description: '返回指定商品的评价列表，按时间倒序。每条评价包含评分、文字、图片和用户信息。返回 { items, total, page, limit }。',
  })
  @ApiParam({ name: 'id', description: '商品ID', example: 'prod-1' })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回评价列表' })
  getProductReviews(@Param('id') id: string, @Query() query: PaginationQuery) {
    return this.homeService.getProductReviews(id, query);
  }

  @Get('products/:id/rating')
  @ApiOperation({
    summary: '获取商品评分统计',
    description: '返回商品的平均评分、评价总数和各星级分布。用于展示评分雷达图或星级条。',
  })
  @ApiParam({ name: 'id', description: '商品ID', example: 'prod-1' })
  @ApiResponse({ status: 200, description: '返回 { avgRating, totalCount, distribution: { 1:n, 2:n, 3:n, 4:n, 5:n } }' })
  getProductRating(@Param('id') id: string) {
    return this.homeService.getProductRating(id);
  }

  // ==================== 店铺详情 ====================

  @Get('merchants/:id')
  @ApiOperation({
    summary: '获取店铺详情',
    description: '返回店铺完整详情，包含商品列表和粉丝数量。',
  })
  @ApiParam({ name: 'id', description: '店铺商家ID', example: 'merchant-1' })
  @ApiResponse({ status: 200, description: '成功返回店铺详情' })
  @ApiResponse({ status: 404, description: '店铺不存在' })
  getMerchantById(@Param('id') id: string) {
    return this.homeService.getMerchantById(id);
  }
}
