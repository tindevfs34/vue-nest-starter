// -- Types, Constants & Enums --

export interface RoleType {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface UserMetadataType {
  department?: string;
  position?: string;
  lastLoginIp?: string;
  notes?: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface UserType {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string | null;
  phoneNumber?: string;
  companyName?: string;
  roleId?: string;
  role?: RoleType;
  isActive: boolean;
  isSuperAdmin?: boolean;
  provider?: string;
  providerId?: string;
  metadata?: UserMetadataType;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export type AdminUserItemType = UserType;

export interface AdminCreateUserPayloadType {
  fullName: string;
  email: string;
  password?: string;
  roleId?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
}

export interface AdminUpdateUserPayloadType {
  fullName?: string;
  email?: string;
  password?: string;
  roleId?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
}

export interface UpdateProfileType {
  fullName?: string;
  phoneNumber?: string;
  companyName?: string;
  avatarUrl?: string;
  password?: string;
}

export interface AdminQueryUserParamsType {
  page?: number;
  limit?: number;
  search?: string;
  roleId?: string;
  isActive?: boolean;
}

export interface AdminUserPaginatedResponseType {
  items: UserType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AvatarUploadResponseType {
  avatarUrl: string;
}

export interface RolesAllResponseType {
  roles: RoleType[];
  total: number;
}

