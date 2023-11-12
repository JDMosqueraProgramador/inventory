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

  async findOne(criteria: string) {
    return this.productRepository.findOne({
      where: [
        { id: !Number.isNaN(+criteria) ? +criteria : 0 },
        { productName: criteria },
      ],
      relations: ['category', 'supplier'],
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category', 'supplier'] });
  }

  async create(productData: Partial<Product>) {
    const product = this.productRepository.create({
      ...productData,
    });
    const savedProduct = await this.productRepository.save(product);
    const qr = await generateQR(savedProduct.id.toString());
    return { ...savedProduct, qr };
  }

  async addStock(id: string, quantity: number): Promise<Product> {
    const product = await this.productRepository.findOneBy([
      { id: !Number.isNaN(+id) ? +id : 0 },
      { productName: id },
    ]);
    product.quantityInStock += quantity;
    return this.productRepository.save(product);
  }
}
