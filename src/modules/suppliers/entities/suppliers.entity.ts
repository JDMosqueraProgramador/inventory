import { Product } from 'src/modules/products/entities/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  supplierName: string;

  @Column({ nullable: true })
  contactName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];
}
