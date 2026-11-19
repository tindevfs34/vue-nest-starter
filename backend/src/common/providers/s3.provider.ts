import { S3Client } from '@aws-sdk/client-s3';
import { Provider, Logger } from '@nestjs/common';
import config from '@config/configuration';
import { COMMON_MESSAGES } from '@/common/constants/message.constant';

export const S3_CLIENT = 'S3_CLIENT';

export const S3Provider: Provider = {
  provide: S3_CLIENT,
  useFactory: () => {
    const logger = new Logger('S3Provider');
    const isProduction = process.env.NODE_ENV === 'production';
    const awsConfig = config.aws;

    const accessKeyId = awsConfig.access_key_id;
    const secretAccessKey = awsConfig.secret_access_key;
    const endpoint = awsConfig.endpoint;
    const region = awsConfig.region;
    const forcePathStyle = awsConfig.force_path_style;

    if (!accessKeyId || !secretAccessKey) {
      const prefix = isProduction ? 'S3' : 'MINIO';
      throw new Error(COMMON_MESSAGES.STORAGE.CREDENTIALS_MISSING(prefix));
    }

    logger.log({
      message: 'S3 client initialized',
      environment: isProduction ? 'PRODUCTION' : 'DEVELOPMENT',
      provider: isProduction ? 'External Object Storage' : 'MinIO (local)',
      region,
      forcePathStyle,
    });

    return new S3Client({
      region,
      ...(endpoint ? { endpoint } : {}),
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle,
    });
  },
};
