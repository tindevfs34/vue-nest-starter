// -- NestJS Core --
import { ConfigService } from '@nestjs/config';

// -- Configuration --
import config from '@config/configuration';

// -- Constants & Enums --
import { STORAGE_CONSTANTS } from '@/common/constants/common.constant';
import { NodeEnvironment } from '@/common/enums/node-environment.enum';

export class StorageUtil {

  static isProduction(configService?: ConfigService): boolean {
    const currentEnv = (
      process.env.NODE_ENV ||
      (configService ? configService.get<string>('NODE_ENV') : undefined) ||
      'development'
    ).toLowerCase();
    return currentEnv === NodeEnvironment.Production.toLowerCase();
  }


  static getBucketName(configService?: ConfigService): string {
    return (
      config.aws?.bucket_name ||
      (configService ? configService.get<string>('aws.bucket_name') : undefined) ||
      STORAGE_CONSTANTS.DEFAULT_BUCKET
    );
  }

  static extractKeyFromUrl(url: string, bucketName?: string): string | null {
    if (!url) return null;
    const bucket = bucketName || this.getBucketName();
    try {
      const parsed = new URL(url);
      let pathname = parsed.pathname.replace(/^\//, '');
      if (pathname.startsWith(`${bucket}/`)) {
        pathname = pathname.substring(bucket.length + 1);
      }
      return pathname || null;
    } catch {
      return url.replace(/^\//, '');
    }
  }
}
