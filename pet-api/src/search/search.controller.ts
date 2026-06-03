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
    summary: '商品名称模糊搜索',
    description: '根据关键词对商品名称进行模糊匹配搜索，返回匹配的商品列表。支持分页。搜索结果包含商品详情（名称、价格、图片、商家、分类）。关键词为空时返回空数组。',
  })
  @ApiQuery({ name: 'keyword', description: '搜索关键词，对商品名称进行模糊匹配', required: true, example: '狗粮' })
  @ApiQuery({ name: 'page', required: false, description: '页码，从1开始，默认为1', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数，默认为10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回匹配的商品列表，每项含 id、name、price、images、merchant、category 等字段。无匹配结果时返回空数组' })
  @ApiResponse({ status: 400, description: '参数错误，如 keyword 缺失或分页参数格式错误' })
  search(
    @Query('keyword') keyword: string,
    @Query() query: PaginationQuery,
  ) {
    return this.searchService.search(keyword, query);
  }
}
