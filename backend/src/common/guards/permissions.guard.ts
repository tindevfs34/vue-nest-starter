import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { RoleEnum } from '../enums/role.enum';
import { COMMON_MESSAGES } from '@/common/constants/message.constant';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no permissions are required, allow access
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // If user doesn't exist, deny access
    if (!user) {
      throw new ForbiddenException(
        COMMON_MESSAGES.AUTH.USER_NOT_AUTHENTICATED,
      );
    }

    // SuperAdmin bypass - SuperAdmin has all permissions
    if (this.isSuperAdmin(user)) {
      return true;
    }

    // Get all permissions from user's roles
    const userPermissions = this.getUserPermissions(user);

    // Check if user has at least one of the required permissions
    const hasPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        COMMON_MESSAGES.AUTH.PERMISSION_REQUIRED(requiredPermissions),
      );
    }

    return true;
  }

  private isSuperAdmin(user: any): boolean {
    if (user.role?.name === RoleEnum.SuperAdmin) return true;
    if (Array.isArray(user.roles)) {
      return user.roles.some((role: any) => role.name === RoleEnum.SuperAdmin);
    }
    return false;
  }

  private getUserPermissions(user: any): string[] {
    const permissions: string[] = [];
    const rolesToScan: any[] = [];
    if (user.role) rolesToScan.push(user.role);
    if (Array.isArray(user.roles)) rolesToScan.push(...user.roles);

    rolesToScan.forEach((role: any) => {
      if (role.permissions && Array.isArray(role.permissions)) {
        role.permissions.forEach((permission: any) => {
          const name =
            typeof permission === 'string' ? permission : permission?.name;
          if (name && !permissions.includes(name)) {
            permissions.push(name);
          }
        });
      }
    });

    return permissions;
  }
}
