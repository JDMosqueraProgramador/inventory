import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/categories.controller';
import { CategoryService } from './services/categories.service';
import { Category } from './entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  exports: [TypeOrmModule, CategoryService],
})
export class CategoriesModule {}
