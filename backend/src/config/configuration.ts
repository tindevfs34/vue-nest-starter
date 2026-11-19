import { config as development } from './envs/development';
import { config as production } from './envs/production';

const env = process.env.NODE_ENV || 'local';

let config: any;
switch (env) {
  case 'production':
    config = production;
    break;
  case 'development':
    config = development;
    break;
  default:
    config = development;
}
// Validate required configuration in production
if (env === 'production') {
  const missingVars: string[] = [];

  if (!config.jwt?.secret) missingVars.push('JWT_SECRET');
  if (!config.database?.host) missingVars.push('DB_HOST');
  if (!config.database?.username) missingVars.push('DB_USERNAME');
  if (!config.database?.password) missingVars.push('DB_PASSWORD');
  if (!config.database?.database) missingVars.push('DB_DATABASE');
  if (!config.aws?.access_key_id) missingVars.push('AWS_ACCESS_KEY_ID / S3_ACCESS_KEY');
  if (!config.aws?.secret_access_key) missingVars.push('AWS_SECRET_ACCESS_KEY / S3_SECRET_KEY');
  if (!config.aws?.bucket_name) missingVars.push('AWS_BUCKET / S3_BUCKET_NAME');

  if (missingVars.length > 0) {
    throw new Error(
      `❌ Missing required environment variable for production: ${missingVars.join(', ')}`,
    );
  }
}

export default config;
