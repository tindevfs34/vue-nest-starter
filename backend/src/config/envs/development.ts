import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

export const config = {
  app: {
    port: parseInt(process.env.PORT || '3002', 10),
    cors_origin: process.env.CORS_ORIGIN || '*',
    storage_base_url:
      process.env.STORAGE_BASE_URL || 'http://localhost:9000/test-bucket/',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_key',
    expires_in: process.env.JWT_EXPIRES_IN || '1d',
  },
  database: {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_DATABASE || 'review_master',
    timezone: '+07:00',
    synchronize: false,
    entities: [
      join(__dirname, '../../modules/**/entities/*.entity{.ts,.js}').replace(
        /\\/g,
        '/',
      ),
    ],
    migrations: [
      join(__dirname, '../../database/migrations/**/*{.ts,.js}').replace(/\\/g, '/'),
    ],
    migrationsRun: false,
    autoLoadEntities: true,
    namingStrategy: new SnakeNamingStrategy(),
    seeds: [
      join(__dirname, '../../database/seeds/*.seeder{.ts,.js}').replace(/\\/g, '/'),
    ],
    factories: [
      join(__dirname, '../../database/factories/*.factory{.ts,.js}').replace(
        /\\/g,
        '/',
      ),
    ],
  },
  aws: {
    region:
      process.env.AWS_REGION ||
      process.env.MINIO_REGION ||
      process.env.S3_REGION ||
      'us-east-1',
    access_key_id:
      process.env.AWS_ACCESS_KEY_ID ||
      process.env.MINIO_ACCESS_KEY ||
      process.env.S3_ACCESS_KEY ||
      'minioadmin',
    secret_access_key:
      process.env.AWS_SECRET_ACCESS_KEY ||
      process.env.MINIO_SECRET_KEY ||
      process.env.S3_SECRET_KEY ||
      'minioadmin',
    bucket_name:
      process.env.AWS_BUCKET ||
      process.env.MINIO_BUCKET_NAME ||
      process.env.S3_BUCKET_NAME ||
      'test-bucket',
    endpoint:
      process.env.AWS_ENDPOINT ||
      process.env.MINIO_ENDPOINT ||
      process.env.S3_ENDPOINT ||
      'http://localhost:9000',
    force_path_style: process.env.AWS_FORCE_PATH_STYLE
      ? process.env.AWS_FORCE_PATH_STYLE === 'true'
      : process.env.S3_FORCE_PATH_STYLE
        ? process.env.S3_FORCE_PATH_STYLE === 'true'
        : true,
  },
};
