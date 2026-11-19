import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { RoleEnum } from '../enums/role.enum';
import { AuthService } from '@/modules/auth/auth.service';
import { COMMON_MESSAGES } from '@/common/constants/message.constant';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(
  Strategy,
  'local-user',
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
    if (!user.role || user.role.name !== RoleEnum.User) {
      throw new UnauthorizedException(COMMON_MESSAGES.AUTH.ACCESS_DENIED);
    }
    return user;
  }
}
