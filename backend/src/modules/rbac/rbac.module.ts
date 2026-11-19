// -- NestJS Core --
import { forwardRef, Module } from '@nestjs/common';

// -- Third-party Libraries --
import { TypeOrmModule } from '@nestjs/typeorm';

// -- Internal Modules, Services & Controllers --
import { AuthModule } from '@/modules/auth/auth.module';
import { RbacController } from '@/modules/rbac/rbac.controller';
import { RbacService } from '@/modules/rbac/rbac.service';

// -- Entities --
import { Permission } from '@/modules/rbac/entities/permission.entity';
import { RolePermission } from '@/modules/rbac/entities/role-permission.entity';
import { Role } from '@/modules/rbac/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, RolePermission]),
    forwardRef(() => AuthModule),
  ],
  controllers: [RbacController],
  providers: [RbacService],
  exports: [RbacService, TypeOrmModule],
})
export class RbacModule {}
