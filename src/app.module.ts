import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [PrismaModule, ProductModule, UserModule, OrderModule, AuthModule, GenreModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
