// src/entities/Category.ts

import { Product } from '../../products/entities/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
