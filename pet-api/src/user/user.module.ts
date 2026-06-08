import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserCouponController } from './user-coupon.controller';
import { UserCouponService } from './user-coupon.service';
import { UserDashboardController } from './user-dashboard.controller';
import { UserDashboardService } from './user-dashboard.service';
import { UserLogisticsController } from './user-logistics.controller';
import { UserLogisticsService } from './user-logistics.service';
import { UserSignController } from './user-sign.controller';
import { UserSignService } from './user-sign.service';
import { UserAfterSaleController } from './user-after-sale.controller';
import { UserAfterSaleService } from './user-after-sale.service';
import { UserViewHistoryController } from './user-view-history.controller';
import { UserViewHistoryService } from './user-view-history.service';

@Module({
  controllers: [
    UserController,
    UserCouponController,
    UserDashboardController,
    UserLogisticsController,
    UserSignController,
    UserAfterSaleController,
    UserViewHistoryController,
  ],
  providers: [
    UserService,
    UserCouponService,
    UserDashboardService,
    UserLogisticsService,
    UserSignService,
    UserAfterSaleService,
    UserViewHistoryService,
  ],
})
export class UserModule {}
