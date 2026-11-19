// -- Types, Constants & Enums --
import type { UserType } from "@/types/user.type";

export interface LoginAuthType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  info?: UserType;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  error?: string;
}

export interface RefreshTokenPayloadType {
  refreshToken: string;
}

export interface RefreshResponseType {
  accessToken: string;
  refreshToken?: string;
}

export interface JwtPayloadType {
  userId: string;
  email: string;
  roleName?: string;
}

export interface LogoutResponseType {
  message: string;
}

export type UserProfileType = UserType;
