import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { UserSignService } from './user-sign.service';
import { PaginationQuery } from '../common/pagination';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('签到积分')
@Controller('user')
export class UserSignController {
  constructor(private readonly service: UserSignService) {}

  @Post('sign')
  @ApiOperation({
    summary: '每日签到',
    description: '签到得积分，连续签到积分递增（第1天+5，第2天+6，...第7天+11，之后+10）。每天只能签一次。',
  })
  @ApiResponse({ status: 201, description: '签到成功，返回 { points, streak, message }' })
  @ApiResponse({ status: 400, description: '今天已签到' })
  sign() {
    return this.service.sign(DEFAULT_USER_ID);
  }

  @Get('sign/calendar')
  @ApiOperation({
    summary: '签到日历',
    description: '返回指定月份的签到记录，包含已签到日期列表和签到总天数。用于日历组件标记。',
  })
  @ApiQuery({ name: 'year', required: false, description: '年份，默认当前年', example: 2026 })
  @ApiQuery({ name: 'month', required: false, description: '月份，默认当前月', example: 6 })
  @ApiResponse({ status: 200, description: '返回 { year, month, signedDays: [1,3,5...], totalSigned }' })
  getCalendar(
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    return this.service.getCalendar(DEFAULT_USER_ID, year ? Number(year) : undefined, month ? Number(month) : undefined);
  }

  @Get('points')
  @ApiOperation({
    summary: '积分概览',
    description: '返回积分余额、连续签到天数、上次签到时间和最近5条积分记录。',
  })
  @ApiResponse({ status: 200, description: '返回 { points, signDays, lastSignAt, recentLogs }' })
  getPoints() {
    return this.service.getPoints(DEFAULT_USER_ID);
  }

  @Get('points/logs')
  @ApiOperation({
    summary: '积分变动明细',
    description: '返回积分变动记录列表，支持按类型筛选。返回 { items, total, page, limit }。',
  })
  @ApiQuery({ name: 'type', required: false, description: '类型筛选：earn_sign/earn_order/redeem_coupon', example: 'earn_sign' })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回积分记录列表' })
  getPointLogs(
    @Query('type') type: string,
    @Query() query: PaginationQuery,
  ) {
    return this.service.getPointLogs(DEFAULT_USER_ID, type, query);
  }

  @Post('points/redeem/:couponId')
  @ApiOperation({
    summary: '积分兑换优惠券',
    description: '使用积分兑换指定优惠券。兑换所需积分 = 优惠券面值 × 10。',
  })
  @ApiParam({ name: 'couponId', description: '优惠券ID', example: 'coupon-1' })
  @ApiResponse({ status: 201, description: '兑换成功，返回 { success, costPoints, message }' })
  @ApiResponse({ status: 400, description: '积分不足或已拥有该优惠券' })
  @ApiResponse({ status: 404, description: '优惠券不存在' })
  redeemCoupon(@Param('couponId') couponId: string) {
    return this.service.redeemCoupon(DEFAULT_USER_ID, couponId);
  }
}
