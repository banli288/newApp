import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HomeModule } from './home/home.module';
import { SearchModule } from './search/search.module';
import { MessageModule } from './message/message.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    HomeModule,
    SearchModule,
    MessageModule,
    CartModule,
    UserModule,
    AdminModule,
  ],
})
export class AppModule {}
