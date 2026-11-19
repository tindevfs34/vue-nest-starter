// -- Internal API Core --
import { requestMethods, requestMethodsUpload } from "@/apis/core";

// -- Types, Constants & Enums --
import type {
  AdminCreateUserPayloadType,
  AdminQueryUserParamsType,
  AdminUpdateUserPayloadType,
  AdminUserPaginatedResponseType,
  AvatarUploadResponseType,
  RoleType,
  RolesAllResponseType,
  UpdateProfileType,
  UserType,
} from "@/types/user.type";

export type { AvatarUploadResponseType };

export const userApi = {
  /**
   * GET /users/profile — Get current user profile
   */
  getProfile: (): Promise<UserType> =>
    requestMethods.get<UserType>("/users/profile"),

  /**
   * PUT /users/profile — Update user profile details & password
   */
  updateProfile: (payload: UpdateProfileType): Promise<UserType> =>
    requestMethods.put<UserType, UpdateProfileType>(
      "/users/profile",
      payload,
    ),

  /**
   * GET /admin/users — Lấy danh sách users toàn hệ thống (SuperAdmin)
   */
  getAdminUsers: (
    params?: AdminQueryUserParamsType,
  ): Promise<AdminUserPaginatedResponseType> =>
    requestMethods.get<AdminUserPaginatedResponseType>("/admin/users", {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        search: params?.search,
        roleId: params?.roleId || undefined,
        isActive: params?.isActive,
      },
    }),

  /**
   * GET /admin/users/:id — Lấy chi tiết 1 user
   */
  getAdminUserById: (id: string): Promise<UserType> =>
    requestMethods.get<UserType>(`/admin/users/${id}`),


  createAdminUser: (payload: AdminCreateUserPayloadType): Promise<UserType> =>
    requestMethods.post<UserType, AdminCreateUserPayloadType>(
      "/admin/users",
      payload,
    ),

  updateAdminUser: (
    id: string,
    payload: AdminUpdateUserPayloadType,
  ): Promise<UserType> =>
    requestMethods.patch<UserType, AdminUpdateUserPayloadType>(
      `/admin/users/${id}`,
      payload,
    ),

  /**
   * DELETE /admin/users/:id — Xóa / vô hiệu hóa user
   */
  deleteAdminUser: (id: string): Promise<void> =>
    requestMethods.delete<void>(`/admin/users/${id}`),

  /**
   * POST /users/avatar — Upload Avatar cho cá nhân (Profile)
   */
  uploadAvatar: (
    file: File,
    userId?: string | null,
  ): Promise<AvatarUploadResponseType> => {
    const formData = new FormData();
    formData.append("file", file);
    const endpoint = userId
      ? `/admin/users/${userId}/avatar`
      : "/users/avatar";

    return requestMethodsUpload.post<AvatarUploadResponseType, FormData>(
      endpoint,
      formData,
    );
  },

  /**
   * POST /admin/users/:id/avatar hoặc /admin/users/upload-avatar — Upload Avatar cho Quản trị User (Admin)
   */
  uploadAdminAvatar: (
    file: File,
    userId?: string | null,
  ): Promise<AvatarUploadResponseType> => {
    const formData = new FormData();
    formData.append("file", file);
    const endpoint = userId
      ? `/admin/users/${userId}/avatar`
      : "/admin/users/upload-avatar";

    return requestMethodsUpload.post<AvatarUploadResponseType, FormData>(
      endpoint,
      formData,
    );
  },

  /**
   * GET /rbac/roles?all=true — Lấy danh sách Roles
   */
  getRoles: (): Promise<RolesAllResponseType> =>
    requestMethods.get<RolesAllResponseType>("/rbac/roles?all=true"),
};
