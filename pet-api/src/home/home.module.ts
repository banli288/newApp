import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { HomeCouponController } from './home-coupon.controller';
import { HomeCouponService } from './home-coupon.service';
import { HomeRankingController } from './home-ranking.controller';
import { HomeRankingService } from './home-ranking.service';
import { HomeRecommendController } from './home-recommend.controller';
import { HomeRecommendService } from './home-recommend.service';

@Module({
  controllers: [HomeController, HomeCouponController, HomeRankingController, HomeRecommendController],
  providers: [HomeService, HomeCouponService, HomeRankingService, HomeRecommendService],
})
export class HomeModule {}
