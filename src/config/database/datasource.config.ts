import { ConfigService } from '@nestjs/config';
import { Category } from 'src/modules/categories/entities/categories.entity';
import { Product } from 'src/modules/products/entities/products.entity';
import { Supplier } from 'src/modules/suppliers/entities/suppliers.entity';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const useDataSource = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
  host: configService.getOrThrow('DB_HOST'),
  password: configService.getOrThrow('DB_PASSWORD'),
  username: configService.getOrThrow('DB_USER'),
  database: configService.getOrThrow('DB_NAME'),
  port: configService.get('DB_PORT'),
  entities: [Category, Supplier, Product],
  synchronize: true,
});
