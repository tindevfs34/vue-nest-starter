// -- NestJS Core --
import { Module } from '@nestjs/common';

// -- Third-party Libraries --
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

// -- Internal Modules & Services --
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { UsersModule } from '@/modules/users/users.module';

// -- DTOs & Entities --
import { Role } from '@/modules/rbac/entities/role.entity';
import { User } from '@/modules/users/entities/user.entity';
import { UserSession } from '@/modules/auth/entities/user-session.entity';

// -- Guards & Strategies --
import { LocalAdminStrategy } from '@/common/strategies/local-admin.strategy';
import { LocalUserStrategy } from '@/common/strategies/local-user.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalUserStrategy, LocalAdminStrategy],
  imports: [
    TypeOrmModule.forFeature([User, Role, UserSession]),
    PassportModule,
    UsersModule,
  ],
  exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}
