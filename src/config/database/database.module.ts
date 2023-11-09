import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { useDataSource } from './datasource.config';
import { DataSource } from 'typeorm';

export const DataBaseModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory(config: ConfigService) {
    return useDataSource(config);
  },
  dataSourceFactory: async (dataSourceOptions) => {
    return new DataSource(dataSourceOptions);
  },
});
