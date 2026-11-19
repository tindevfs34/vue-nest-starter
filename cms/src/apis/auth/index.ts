// -- Third-party Libraries --
import type { AxiosRequestConfig } from "axios";

// -- Internal Core API --
import { requestMethods } from "@/apis/core";

// -- Types, Constants & Enums --
import type {
  LoginAuthType,
  LoginResponseType,
  LogoutResponseType,
  RefreshTokenPayloadType,
  RefreshResponseType,
} from "@/types/auth.type";
import type { UserType } from "@/types/user.type";

export const authApi = {
  loginAdmin: (payload: LoginAuthType): Promise<LoginResponseType> =>
    requestMethods.post<LoginResponseType, LoginAuthType>(
      "/auth/admin/login",
      payload,
    ),

  login: (payload: LoginAuthType): Promise<LoginResponseType> =>
    requestMethods.post<LoginResponseType, LoginAuthType>(
      "/auth/admin/login",
      payload,
    ),

  refreshToken: (payload: RefreshTokenPayloadType): Promise<RefreshResponseType> =>
    requestMethods.post<RefreshResponseType, RefreshTokenPayloadType>(
      "/auth/refresh",
      payload,
    ),

  getProfile: (config?: AxiosRequestConfig): Promise<UserType> =>
    requestMethods.get<UserType>("/auth/profile", config),

  logout: (refreshToken?: string): Promise<LogoutResponseType> =>
    requestMethods.post<LogoutResponseType, RefreshTokenPayloadType>(
      "/auth/logout",
      refreshToken ? { refreshToken } : undefined,
    ),
};
