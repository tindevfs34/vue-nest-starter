import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

export const config = {
  app: {
    port: parseInt(process.env.PORT || '3002', 10),
    cors_origin: process.env.CORS_ORIGIN || '', // Must be explicitly configured in prod
    storage_base_url: process.env.STORAGE_BASE_URL || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN || '1h',
  },
  database: {
    type: 'mysql',

    // Connection settings - All loaded from environment variables
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    migrationsRun: false,
    autoLoadEntities: true,
    entities: [
      join(__dirname, '../../modules/**/entities/*.entity{.ts,.js}').replace(
        /\\/g,
        '/',
      ),
    ],
    migrations: [
      join(__dirname, '../../database/migrations/**/*{.ts,.js}').replace(/\\/g, '/'),
    ],
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
      connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
      connectTimeout: 30000,
      acquireTimeout: 60000,
      timeout: 30000,
      keepAlive: true,
      keepAliveInitialDelay: 10000,
    },

    // SSL/TLS Configuration - Required for production
    ssl:
      process.env.DB_SSL_ENABLED === 'true'
        ? {
            // For self-signed certificates or internal CA
            rejectUnauthorized:
              process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
            // Path to CA certificate (if needed)
            ca: process.env.DB_SSL_CA ? process.env.DB_SSL_CA : undefined,
            // Path to client certificate (if mutual TLS is required)
            cert: process.env.DB_SSL_CERT ? process.env.DB_SSL_CERT : undefined,
            key: process.env.DB_SSL_KEY ? process.env.DB_SSL_KEY : undefined,
          }
        : false,

    logging:
      process.env.DB_LOGGING === 'true'
        ? ['error', 'warn', 'migration']
        : false,
    logger: 'advanced-console',

    timezone: process.env.DB_TIMEZONE || '+07:00', // Vietnam timezone
    charset: 'utf8mb4',
    retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS || '3', 10),
    retryDelay: parseInt(process.env.DB_RETRY_DELAY || '3000', 10),
  },
  aws: {
    region: process.env.AWS_REGION || process.env.S3_REGION || 'us-east-1',
    access_key_id:
      process.env.AWS_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY || '',
    secret_access_key:
      process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY || '',
    bucket_name: process.env.AWS_BUCKET || process.env.S3_BUCKET_NAME || '',
    endpoint: process.env.AWS_ENDPOINT || process.env.S3_ENDPOINT || undefined,
    force_path_style:
      process.env.AWS_FORCE_PATH_STYLE === 'true' ||
      process.env.S3_FORCE_PATH_STYLE === 'true',
  },
};
