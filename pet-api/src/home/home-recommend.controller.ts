import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HomeRecommendService } from './home-recommend.service';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('首页-推荐')
@Controller('home/recommend')
export class HomeRecommendController {
  constructor(private readonly service: HomeRecommendService) {}

  @Get()
  @ApiOperation({
    summary: '猜你喜欢',
    description: '基于用户浏览历史的分类偏好，推荐相关商品。无浏览记录时返回热销商品。适合瀑布流展示。',
  })
  @ApiQuery({ name: 'limit', required: false, description: '返回数量，默认10', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回推荐商品列表' })
  getRecommendations(@Query('limit') limit: string) {
    return this.service.getRecommendations(DEFAULT_USER_ID, Number(limit) || 10);
  }
}
