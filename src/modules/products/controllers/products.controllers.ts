import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/products.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.create(productData);
  }

  @Post('stock/:id')
  async addStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantity') quantity: number,
  ): Promise<Product> {
    return this.productService.addStock(id, quantity);
  }
}
