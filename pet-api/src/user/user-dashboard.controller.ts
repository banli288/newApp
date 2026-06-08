import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDashboardService } from './user-dashboard.service';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('我的-消费看板')
@Controller('user/dashboard')
export class UserDashboardController {
  constructor(private readonly service: UserDashboardService) {}

  @Get('summary')
  @ApiOperation({
    summary: '消费概览',
    description: '返回当前用户的消费统计数据：累计消费、完成订单数、平均客单价、收藏商品数。',
  })
  @ApiResponse({ status: 200, description: '返回 { totalSpent, totalOrders, avgOrderAmount, favoriteCount }' })
  getSummary() {
    return this.service.getSummary(DEFAULT_USER_ID);
  }

  @Get('monthly')
  @ApiOperation({
    summary: '月度消费趋势',
    description: '返回近12个月的消费趋势数据，每月含消费金额和订单数。用于折线图展示。',
  })
  @ApiResponse({ status: 200, description: '返回数组 [{ month: "2026-01", amount: 580, count: 3 }, ...]' })
  getMonthlyTrend() {
    return this.service.getMonthlyTrend(DEFAULT_USER_ID);
  }

  @Get('categories')
  @ApiOperation({
    summary: '分类消费占比',
    description: '返回各商品分类的消费金额和占比。用于饼图展示。',
  })
  @ApiResponse({ status: 200, description: '返回数组 [{ name: "猫咪专区", amount: 860, count: 5, percent: 42 }, ...]' })
  getCategoryBreakdown() {
    return this.service.getCategoryBreakdown(DEFAULT_USER_ID);
  }
}
