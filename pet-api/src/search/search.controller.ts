import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { PaginationQuery } from '../common/pagination';

@ApiTags('搜索')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({
    summary: '商品搜索',
    description: '根据关键词搜索商品，支持排序、分类筛选、价格区间。返回 { items, total, page, limit }。排序可选：price_asc/price_desc/sales_desc/rating_desc/created_desc（默认）。',
  })
  @ApiQuery({ name: 'keyword', description: '搜索关键词，对商品名称进行模糊匹配', required: false, example: '狗粮' })
  @ApiQuery({ name: 'sort', required: false, description: '排序方式', example: 'sales_desc', enum: ['price_asc', 'price_desc', 'sales_desc', 'rating_desc', 'created_desc', 'created_asc'] })
  @ApiQuery({ name: 'categoryId', required: false, description: '分类ID筛选', example: 'cat-dog-food' })
  @ApiQuery({ name: 'brand', required: false, description: '品牌筛选', example: '皇家' })
  @ApiQuery({ name: 'minRating', required: false, description: '最低评分筛选', example: 4 })
  @ApiQuery({ name: 'minPrice', required: false, description: '最低价格', example: 50 })
  @ApiQuery({ name: 'maxPrice', required: false, description: '最高价格', example: 300 })
  @ApiQuery({ name: 'page', required: false, description: '页码，从1开始，默认为1', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数，默认为10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回搜索结果，格式 { items, total, page, limit }' })
  search(
    @Query('keyword') keyword: string,
    @Query('sort') sort: string,
    @Query('categoryId') categoryId: string,
    @Query('brand') brand: string,
    @Query('minRating') minRating: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query() query: PaginationQuery,
  ) {
    return this.searchService.search(keyword, query, {
      sort,
      categoryId,
      brand,
      minRating: minRating ? Number(minRating) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  @Get('shops')
  @ApiOperation({
    summary: '搜索店铺',
    description: '根据关键词搜索店铺，支持分页。返回 { items, total, page, limit }。',
  })
  @ApiQuery({ name: 'keyword', description: '搜索关键词', required: false, example: '萌宠' })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回店铺列表' })
  searchShops(
    @Query('keyword') keyword: string,
    @Query() query: PaginationQuery,
  ) {
    return this.searchService.searchShops(keyword, query);
  }

  @Get('brands')
  @ApiOperation({
    summary: '获取品牌列表',
    description: '返回所有商品中出现过的品牌名称列表（去重）。用于搜索筛选面板的品牌选择。',
  })
  @ApiResponse({ status: 200, description: '返回品牌名称数组 ["皇家", "渴望", ...]' })
  getBrands() {
    return this.searchService.getBrands();
  }

  @Get('hot')
  @ApiOperation({
    summary: '获取热门搜索词',
    description: '返回热门搜索关键词列表，按 sortOrder 升序排列。用于搜索页的"热门搜索"展示区域。',
  })
  @ApiResponse({ status: 200, description: '成功返回热门搜索词列表，每项含 id、keyword、sortOrder' })
  getHotSearches() {
    return this.searchService.getHotSearches();
  }
}
