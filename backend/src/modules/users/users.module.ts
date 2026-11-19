// -- NestJS Core --
import { forwardRef, Module } from '@nestjs/common';

// -- Third-party Libraries --
import { TypeOrmModule } from '@nestjs/typeorm';

// -- Internal Modules, Services & Providers --
import { S3Provider } from '@/common/providers/s3.provider';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersService } from '@/modules/users/users.service';

// -- Controllers --
import { UsersController } from '@/modules/users/users.controller';

// -- Entities --
import { Role } from '@/modules/rbac/entities/role.entity';
import { User } from '@/modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, S3Provider],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
