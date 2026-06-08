import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserCouponService } from './user-coupon.service';
import { PaginationQuery } from '../common/pagination';

const DEFAULT_USER_ID = 'default-user';

@ApiTags('我的-优惠券')
@Controller('user/coupons')
export class UserCouponController {
  constructor(private readonly service: UserCouponService) {}

  @Post(':id/claim')
  @ApiOperation({
    summary: '领取优惠券',
    description: '领取指定优惠券。幂等操作，重复领取返回已有记录。校验有效期和库存。',
  })
  @ApiParam({ name: 'id', description: '优惠券ID', example: 'coupon-1' })
  @ApiResponse({ status: 201, description: '领取成功' })
  @ApiResponse({ status: 400, description: '优惠券已过期、已领完' })
  @ApiResponse({ status: 404, description: '优惠券不存在' })
  claimCoupon(@Param('id') id: string) {
    return this.service.claimCoupon(DEFAULT_USER_ID, id);
  }

  @Get()
  @ApiOperation({
    summary: '获取我的优惠券列表',
    description: '返回当前用户领取的优惠券，支持按状态筛选。返回 { items, total, page, limit }。',
  })
  @ApiQuery({ name: 'status', required: false, description: '筛选状态：unused/used/expired', example: 'unused' })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: '每页条数', example: 10 })
  @ApiResponse({ status: 200, description: '成功返回优惠券列表' })
  getMyCoupons(
    @Query('status') status: string,
    @Query() query: PaginationQuery,
  ) {
    return this.service.getMyCoupons(DEFAULT_USER_ID, status, query);
  }

  @Get('available')
  @ApiOperation({
    summary: '获取结算可用优惠券',
    description: '返回当前订单金额下可用的未过期优惠券。需传入订单金额以筛选满足最低消费门槛的券。',
  })
  @ApiQuery({ name: 'orderAmount', required: true, description: '订单金额', example: 200 })
  @ApiResponse({ status: 200, description: '成功返回可用优惠券列表' })
  getAvailableForCheckout(@Query('orderAmount') orderAmount: string) {
    return this.service.getAvailableForCheckout(DEFAULT_USER_ID, Number(orderAmount));
  }
}
