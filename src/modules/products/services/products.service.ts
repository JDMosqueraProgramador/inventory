import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/products.entity';
import { generateQR } from '../utils/qr.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(productData: Partial<Product>) {
    const product = this.productRepository.create({
      ...productData,
    });
    const savedProduct = await this.productRepository.save(product);
    const qr = await generateQR(savedProduct.id.toString());
    return { ...savedProduct, qr };
  }

  async addStock(id: number, quantity: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    product.quantityInStock += quantity;
    return this.productRepository.save(product);
  }
}
