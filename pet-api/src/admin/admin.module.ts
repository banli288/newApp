import { Module } from '@nestjs/common';
import { AdminProductController } from './admin-product.controller';
import { AdminProductService } from './admin-product.service';
import { AdminCategoryController } from './admin-category.controller';
import { AdminCategoryService } from './admin-category.service';
import { AdminCarouselController } from './admin-carousel.controller';
import { AdminCarouselService } from './admin-carousel.service';
import { AdminLiveRoomController } from './admin-liveroom.controller';
import { AdminLiveRoomService } from './admin-liveroom.service';
import { AdminPostController } from './admin-post.controller';
import { AdminPostService } from './admin-post.service';

@Module({
  controllers: [
    AdminProductController,
    AdminCategoryController,
    AdminCarouselController,
    AdminLiveRoomController,
    AdminPostController,
  ],
  providers: [
    AdminProductService,
    AdminCategoryService,
    AdminCarouselService,
    AdminLiveRoomService,
    AdminPostService,
  ],
})
export class AdminModule {}
