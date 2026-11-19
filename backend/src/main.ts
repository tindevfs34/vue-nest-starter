import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomResponseInterceptor } from '@/common/custom-response.interceptor';
// Trigger NestJS reload
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

declare const module: any;

import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          filename: path.join('logs', '%DATE%-error.log'),
          auditFile: 'logs/application-audit.json',
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '7d',
        }),

        new transports.DailyRotateFile({
          filename: path.join('logs', '%DATE%-combined.log'),
          auditFile: 'logs/application-audit.json',
          level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '7d',
        }),

        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
  });

  const configService = app.get(ConfigService);
  const appConfig = configService.get('app');

  // Security
  app.use(helmet());

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new CustomResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // CORS
  const origins = appConfig.cors_origin.split(',').map((o: string) => o.trim());
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? origins : true,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
    credentials: true,
  });

  // Swagger - Chỉ bật trong development hoặc nếu có config
  if (
    process.env.NODE_ENV !== 'production' ||
    process.env.SHOW_SWAGGER === 'true'
  ) {
    const config = new DocumentBuilder()
      .setTitle('CMS API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  const port = appConfig.port || 3002;
  const server = await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
  if (process.env.NODE_ENV !== 'production') {
    Logger.log(`📖 Swagger documentation: http://localhost:${port}/api`);
  }

  // @ts-ignore
  server.timeout = 180000; // 3 minutes
  // @ts-ignore
  server.keepAliveTimeout = 61000;
  // @ts-ignore
  server.headersTimeout = 62000;

  // Hot Module Replacement — chỉ dùng trong development
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
