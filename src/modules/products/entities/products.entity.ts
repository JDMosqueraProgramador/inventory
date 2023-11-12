import { Category } from '../../categories/entities/categories.entity';
import { Supplier } from '../../suppliers/entities/suppliers.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
  BeforeInsert,
} from 'typeorm';
import { generateQR } from '../utils/qr.util';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  productName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @RelationId((product: Product) => product.category)
  @Column()
  categoryId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  quantityInStock: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  supplier: Supplier;

  @RelationId((product: Product) => product.supplier)
  @Column()
  supplierId: number;

  @Column({ type: 'varchar' })
  QR: string;

  @BeforeInsert()
  async generateQR() {
    this.QR = await generateQR(this.productName);
  }
}
