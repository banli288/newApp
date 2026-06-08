import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HomeRankingService } from './home-ranking.service';

@ApiTags('首页-排行榜')
@Controller('home/rankings')
export class HomeRankingController {
  constructor(private readonly service: HomeRankingService) {}

  @Get('best-sellers')
  @ApiOperation({
    summary: '热销榜',
    description: '按销量降序返回商品排行榜。每项含商品详情、商家、分类、收藏数。',
  })
  @ApiQuery({ name: 'limit', required: false, description: '返回数量，默认10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回热销商品列表' })
  getBestSellers(@Query('limit') limit: string) {
    return this.service.getBestSellers(Number(limit) || 10);
  }

  @Get('top-rated')
  @ApiOperation({
    summary: '好评榜',
    description: '按平均评分降序返回商品排行榜。每项含商品详情、商家、分类、评价数。',
  })
  @ApiQuery({ name: 'limit', required: false, description: '返回数量，默认10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回好评商品列表' })
  getTopRated(@Query('limit') limit: string) {
    return this.service.getTopRated(Number(limit) || 10);
  }

  @Get('new-arrivals')
  @ApiOperation({
    summary: '新品榜',
    description: '按上架时间降序返回最新商品。',
  })
  @ApiQuery({ name: 'limit', required: false, description: '返回数量，默认10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回新品列表' })
  getNewArrivals(@Query('limit') limit: string) {
    return this.service.getNewArrivals(Number(limit) || 10);
  }
}
