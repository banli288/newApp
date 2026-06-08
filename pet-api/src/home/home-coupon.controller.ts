import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HomeCouponService } from './home-coupon.service';

@ApiTags('首页-优惠券')
@Controller('home/coupons')
export class HomeCouponController {
  constructor(private readonly service: HomeCouponService) {}

  @Get()
  @ApiOperation({
    summary: '获取可领取的优惠券列表',
    description: '返回当前有效的优惠券列表（未过期）。每张优惠券包含名称、类型（满减/折扣）、面值、最低消费门槛、有效期和剩余数量。',
  })
  @ApiResponse({ status: 200, description: '成功返回优惠券列表' })
  getAvailableCoupons() {
    return this.service.getAvailableCoupons();
  }
}
