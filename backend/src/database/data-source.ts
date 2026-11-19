import { DataSource, DataSourceOptions } from 'typeorm';
import config from '@/config/configuration';
import { join } from 'path';
import { SeederOptions } from 'typeorm-extension';
import seeds from './seeds/index';

const options: DataSourceOptions & SeederOptions = {
  ...config.database,
  synchronize: false,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}').replace(/\\/g, '/')],
  migrations: [
    join(__dirname, './migrations/**/*{.ts,.js}').replace(/\\/g, '/'),
  ],
  seeds: seeds,
  factories: [
    join(__dirname, './factories/**/*{.ts,.js}').replace(/\\/g, '/'),
  ],
};

const dataSource = new DataSource(options);

export default dataSource;
