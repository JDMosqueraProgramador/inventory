import { Controller, Get } from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { CategoryService } from '../services/categories.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
