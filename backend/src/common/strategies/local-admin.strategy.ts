import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { RoleEnum } from '../enums/role.enum';
import { COMMON_MESSAGES } from '@/common/constants/message.constant';

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
  Strategy,
  'local-admin',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({
      email,
      password,
    });
    if (!user) {
      throw new UnauthorizedException(
        COMMON_MESSAGES.AUTH.INVALID_CREDENTIALS,
      );
    }
    if (!user.isActive) {
      throw new UnauthorizedException(COMMON_MESSAGES.AUTH.ACCOUNT_LOCKED);
    }
    const allowedRoles = [
      RoleEnum.Admin,
      RoleEnum.SuperAdmin,
      RoleEnum.Editor,
    ];

    const hasPermission =
      user.role && allowedRoles.includes(user.role.name as RoleEnum);

    if (!hasPermission) {
      throw new UnauthorizedException(COMMON_MESSAGES.AUTH.ACCESS_DENIED);
    }

    return user;
  }
}
