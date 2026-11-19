import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from '@/database';

// pipe
import { APP_PIPE } from '@nestjs/core';

// config
import config from '@/config/configuration';

import { JwtModule } from '@nestjs/jwt';
import { ValidationPipe } from './common/pipes/validation.pipe';

import { AuthModule } from '@/modules/auth/auth.module';
import { AuditModule } from '@/modules/audit/audit.module';

const uploadRoot = join(process.cwd(), 'public', 'uploads');

@Module({
  imports: [
    // Static assets
    ServeStaticModule.forRoot({
      rootPath: uploadRoot,
      serveRoot: '/uploads',
    }),

    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),

    // Database connection
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
      }),
      inject: [ConfigService],
    }),

    // Database utilities (Transaction, etc.)
    DatabaseModule,

    // JWT Auth global
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expires_in', '1d'),
        },
      }),
    }),
    AuthModule,
    AuditModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
