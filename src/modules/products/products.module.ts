import { Module } from '@nestjs/common';
import { ProductController } from './controllers/products.controllers';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
  exports: [TypeOrmModule, ProductsService],
})
export class ProductsModule {}
