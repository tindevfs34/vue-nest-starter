// -- Node Core --
import { createHash, randomUUID, timingSafeEqual } from 'crypto';

// -- NestJS Core --
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

// -- Third-party Libraries --
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

// -- DTOs & Entities --
import { Role } from '@/modules/rbac/entities/role.entity';
import { User } from '@/modules/users/entities/user.entity';
import { UserSession } from '@/modules/auth/entities/user-session.entity';
import { LoginAuthDto } from '@/modules/auth/dto/login-auth.dto';
import { RefreshTokenDto } from '@/modules/auth/dto/refresh-token.dto';

// -- Types, Constants & Enums --
import { RoleEnum } from '@/common/enums/role.enum';
import {
  AUTH_CONFIG,
  AUTH_MESSAGES,
} from '@/modules/auth/common/constants';
import {
  JwtPayload,
  JwtRefreshPayload,
  LoginResponse,
  RefreshResponse,
  UserProfile,
  ValidatedUser,
} from '@/modules/auth/types/auth.types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(UserSession)
    private readonly userSessionsRepository: Repository<UserSession>,
    private readonly jwtService: JwtService,
  ) {}

  private hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async validateUser(
    loginAuthDto: LoginAuthDto,
  ): Promise<ValidatedUser | null> {
    try {
      const loginIdentifier = loginAuthDto.email || loginAuthDto.userName;
      if (!loginIdentifier) return null;

      const user = await this.usersRepository
        .createQueryBuilder('user')
        .addSelect('user.passwordHash')
        .leftJoinAndSelect('user.role', 'role')
        .where('user.email = :identifier', { identifier: loginIdentifier })
        .getOne();

      if (!user || !user.passwordHash) return null;

      const isMatch = await bcrypt.compare(
        loginAuthDto.password,
        user.passwordHash,
      );
      if (!isMatch) return null;

      const { passwordHash, ...safeUser } = user;

      const isSuperAdmin = user.role?.name === RoleEnum.SuperAdmin;

      return {
        ...safeUser,
        role: user.role,
        isSuperAdmin,
      };
    } catch (error) {
      this.logger.error('Validate User Error:', error);
      return null;
    }
  }

  async login(
    user: ValidatedUser,
    clientInfo?: { userAgent?: string; ipAddress?: string },
  ): Promise<LoginResponse> {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      roleName: user.role?.name,
    };

    const accessToken = this.jwtService.sign(payload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + AUTH_CONFIG.REFRESH_TOKEN_DAYS);

    const sessionId = randomUUID();

    const refreshPayload: JwtRefreshPayload = {
      userId: user.id,
      sessionId,
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: AUTH_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
    });

    const session = this.userSessionsRepository.create({
      id: sessionId,
      userId: user.id,
      refreshTokenHash: this.hashRefreshToken(refreshToken),
      userAgent: clientInfo?.userAgent || 'Unknown',
      ipAddress: clientInfo?.ipAddress || '127.0.0.1',
      expiresAt,
    });

    await this.userSessionsRepository.save(session);

    return {
      info: user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshResponse> {
    try {
      const payload = this.jwtService.verify<JwtRefreshPayload>(
        refreshTokenDto.refreshToken,
      );

      if (!payload || !payload.sessionId) {
        throw new UnauthorizedException(
          AUTH_MESSAGES.INVALID_OR_EXPIRED_REFRESH_TOKEN,
        );
      }

      const session = await this.userSessionsRepository.findOne({
        where: { id: payload.sessionId },
      });

      if (
        !session ||
        session.revokedAt ||
        new Date() > new Date(session.expiresAt)
      ) {
        throw new UnauthorizedException(
          AUTH_MESSAGES.SESSION_EXPIRED,
        );
      }

      const incomingHash = this.hashRefreshToken(refreshTokenDto.refreshToken);
      const storedHashBuf = Buffer.from(session.refreshTokenHash, 'utf8');
      const incomingHashBuf = Buffer.from(incomingHash, 'utf8');
      const isMatch =
        storedHashBuf.length === incomingHashBuf.length &&
        timingSafeEqual(storedHashBuf, incomingHashBuf);

      if (!isMatch) {
        throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
      }

      await this.userSessionsRepository.update(session.id, {
        lastUsedAt: new Date(),
      });

      const user = await this.usersRepository.findOne({
        where: { id: payload.userId },
        relations: { role: true },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException(
          AUTH_MESSAGES.ACCOUNT_LOCKED_OR_NOT_FOUND,
        );
      }

      const newAccessTokenPayload: JwtPayload = {
        userId: user.id,
        email: user.email,
        roleName: user.role?.name,
      };

      const accessToken = this.jwtService.sign(newAccessTokenPayload);

      return {
        accessToken,
        refreshToken: refreshTokenDto.refreshToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException(
        AUTH_MESSAGES.INVALID_OR_EXPIRED_REFRESH_TOKEN,
      );
    }
  }

  async logout(
    userId: string,
    refreshToken?: string,
  ): Promise<{ message: string }> {
    try {
      if (refreshToken) {
        const payload = this.jwtService.decode(refreshToken) as JwtRefreshPayload;
        if (payload?.sessionId) {
          await this.userSessionsRepository.delete({ id: payload.sessionId });
          return { message: AUTH_MESSAGES.LOGOUT_SUCCESS };
        }
      }
      await this.userSessionsRepository.delete({ userId });
      return { message: AUTH_MESSAGES.LOGOUT_SUCCESS };
    } catch (error) {
      this.logger.error('Logout error:', error);
      return { message: AUTH_MESSAGES.LOGOUT_SUCCESS };
    }
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        role: true,
      },
    });

    if (!user) return null;

    return {
      ...user,
      isSuperAdmin: user.role?.name === RoleEnum.SuperAdmin,
    };
  }
}
