import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtPayload } from '@/modules/auth/types/auth.types';
import { COMMON_MESSAGES } from '@/common/constants/message.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(COMMON_MESSAGES.AUTH.LOGIN_REQUIRED);
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      const user = await this.authService.getProfile(payload?.userId);
      if (!user) {
        throw new UnauthorizedException(COMMON_MESSAGES.AUTH.ACCOUNT_NOT_FOUND);
      }
      if (!user.isActive) {
        throw new UnauthorizedException(COMMON_MESSAGES.AUTH.ACCOUNT_LOCKED);
      }
      request['user'] = user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException(
        COMMON_MESSAGES.AUTH.SESSION_EXPIRED,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
