import { Request } from 'express';
import { User } from '@/modules/users/entities/user.entity';
import { Role } from '@/modules/rbac/entities/role.entity';

export interface ValidatedUser {
  id: string;
  email: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  role: Role | null;
  roleId?: string | null;
  isActive: boolean;
  isSuperAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface JwtPayload {
  userId: string;
  email: string;
  roleName?: string;
}

export interface LoginResponse {
  info: ValidatedUser;
  accessToken: string;
  refreshToken?: string;
}

export interface JwtRefreshPayload {
  userId: string;
  sessionId: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthenticatedRequest extends Request {
  user: ValidatedUser;
}

export interface UserProfile extends Omit<User, 'passwordHash'> {
  role: Role | null;
  isSuperAdmin: boolean;
}
