import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // < NOVO IMPORT

@Module({
  imports: [PrismaModule], // < NOVO IMPORT
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
