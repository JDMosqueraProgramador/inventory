import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/products.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() productData: Partial<Product>) {
    return this.productService.create(productData);
  }

  @Patch('stock/:id')
  async addStock(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ): Promise<Product> {
    return this.productService.addStock(id, quantity);
  }
}
