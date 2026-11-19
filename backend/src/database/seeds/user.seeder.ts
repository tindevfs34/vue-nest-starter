import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RoleEnum } from '@/common/enums/role.enum';

import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '@/modules/users/entities/user.entity';
import { Role } from '@/modules/rbac/entities/role.entity';
import { Permission } from '@/modules/rbac/entities/permission.entity';


export class UserRoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const permissionRepository = dataSource.getRepository(Permission);
    const roleRepository = dataSource.getRepository(Role);
    const userRepository = dataSource.getRepository(User);

    // ==================== CREATE PERMISSIONS ====================
    const permissionsData = [
      { name: 'posts:create', description: 'Can create posts' },
      { name: 'posts:update', description: 'Can update posts' },
      { name: 'posts:delete', description: 'Can delete posts' },
      { name: 'posts:publish', description: 'Can publish posts' },

      { name: 'products:create', description: 'Can create products' },
      { name: 'products:update', description: 'Can update products' },
      { name: 'products:delete', description: 'Can delete products' },

      { name: 'brands:create', description: 'Can create brands' },
      { name: 'brands:update', description: 'Can update brands' },

      { name: 'categories:create', description: 'Can create categories' },
      { name: 'categories:update', description: 'Can update categories' },

      { name: 'users:manage', description: 'Can manage users' },
    ];

    for (const permData of permissionsData) {
      let permission = await permissionRepository.findOneBy({
        name: permData.name,
      });
      if (!permission) {
        permission = permissionRepository.create(permData);
        await permissionRepository.save(permission);
      }
    }

    // ==================== CREATE ROLES ====================
    let superAdminRole = await roleRepository.findOne({
      where: { name: RoleEnum.SuperAdmin },
    });
    if (!superAdminRole) {
      superAdminRole = roleRepository.create({
        name: RoleEnum.SuperAdmin,
        description: 'Super Administrator - Full access',
      });
      await roleRepository.save(superAdminRole);
    }

    let adminRole = await roleRepository.findOne({
      where: { name: RoleEnum.Admin },
    });
    if (!adminRole) {
      adminRole = roleRepository.create({
        name: RoleEnum.Admin,
        description:
          'Admin - Full permissions',
      });
      await roleRepository.save(adminRole);
    }

    let editorRole = await roleRepository.findOne({
      where: { name: RoleEnum.Editor },
    });
    if (!editorRole) {
      editorRole = roleRepository.create({
        name: RoleEnum.Editor,
        description: 'Editor - Can manage content',
      });
      await roleRepository.save(editorRole);
    }

    let prClientRole = await roleRepository.findOne({
      where: { name: RoleEnum.PRClient },
    });
    if (!prClientRole) {
      prClientRole = roleRepository.create({
        name: RoleEnum.PRClient,
        description: 'PR Client - Business client purchasing PR Booking',
      });
      await roleRepository.save(prClientRole);
    }

    let userRole = await roleRepository.findOne({
      where: { name: RoleEnum.User },
    });
    if (!userRole) {
      userRole = roleRepository.create({
        name: RoleEnum.User,
        description: 'Regular User / Reviewer',
      });
      await roleRepository.save(userRole);
    }

    // ==================== CREATE USERS ====================
    const isProduction = process.env.NODE_ENV === 'production';
    const envPassword = process.env.SEED_ADMIN_PASSWORD?.trim() || '123456';

    if (isProduction && (!envPassword || envPassword.length < 8)) {
      throw new Error(
        'SEED_ADMIN_PASSWORD (min 8 chars) is required when running UserRoleSeeder in production.',
      );
    }

    const commonPassword = await bcrypt.hash(envPassword, 10);

    const usersToCreate = [
      {
        fullName: 'Super Admin (Global)',
        email: 'superadmin@topreview.vn',
        passwordHash: commonPassword,
        isActive: true,
        role: superAdminRole,
        roleId: superAdminRole.id,
      },
      {
        fullName: 'Quản Trị Viên Hệ Thống',
        email: 'admin@topreview.vn',
        passwordHash: commonPassword,
        isActive: true,
        role: adminRole,
        roleId: adminRole.id,
      },
      {
        fullName: 'Quản Trị Viên Beauty',
        email: 'htran.admin@topreview.vn',
        passwordHash: commonPassword,
        isActive: true,
        role: adminRole,
        roleId: adminRole.id,
      },
      {
        fullName: 'Nguyễn Thu Trang (Beauty Editor)',
        email: 'trang.nguyen@topreview.vn',
        passwordHash: commonPassword,
        isActive: true,
        role: editorRole,
        roleId: editorRole.id,
      }
    ];

    for (const userData of usersToCreate) {
      const existing = await userRepository.findOne({
        where: { email: userData.email },
      });
      if (!existing) {
        const newUser = userRepository.create(userData);
        await userRepository.save(newUser);
      } else {
        await userRepository.update(existing.id, {
          fullName: userData.fullName,
          roleId: userData.roleId,
        });
      }
    }
  }
}
