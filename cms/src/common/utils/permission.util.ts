// -- Types, Constants & Enums --
import { RoleEnum } from "@/common/enums/role.enum";
import type { UserType } from "@/types/user.type";

export { RoleEnum };

export const ROLE_KEYWORD = {
  SUPER_ADMIN: RoleEnum.SuperAdmin.toLowerCase(),
  ADMIN: "admin",
} as const;

/**
 * Check if the user is a SuperAdmin
 */
export const checkIsSuperAdmin = (user?: UserType | null): boolean => {
  if (!user) return false;
  if (user.isSuperAdmin === true) return true;
  if (user.role?.name?.toLowerCase().includes(ROLE_KEYWORD.SUPER_ADMIN))
    return true;
  return false;
};


export const checkIsAdmin = (user?: UserType | null): boolean => {
  if (!user) return false;
  const role = normalizeRoleEnum(user.role?.name);
  return role === RoleEnum.Admin;
};

/**
 * Check if the user is an Admin (SuperAdmin,Admin, or Admin)
 */
export const checkIsSystemAdmin = (user?: UserType | null): boolean => {
  if (!user) return false;
  if (checkIsSuperAdmin(user)) return true;
  if (checkIsAdmin(user)) return true;
  return false;
};

/**
 * Check if the user is an Editor
 */
export const checkIsEditor = (user?: UserType | null): boolean => {
  if (!user) return false;
  const role = normalizeRoleEnum(user.role?.name);
  return role === RoleEnum.Editor;
};

/**
 * Helper to normalize string input to RoleEnum key
 */
export const normalizeRoleEnum = (
  roleName?: string | null,
): RoleEnum | null => {
  if (!roleName) return null;
  const clean = roleName.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (clean.includes("superadmin")) return RoleEnum.SuperAdmin;
  if (clean.includes("admin") || clean === "admin")
    return RoleEnum.Admin;
  if (clean.includes("editor")) return RoleEnum.Editor;
  if (clean.includes("prclient")) return RoleEnum.PRClient;
  if (clean.includes("user")) return RoleEnum.User;
  return null;
};

/**
 * Get Vietnamese display name for role
 */
export const getRoleDisplayName = (roleName?: string | null): string => {
  if (!roleName) return "Chưa phân quyền";
  const roleEnum = normalizeRoleEnum(roleName);
  if (!roleEnum) return roleName;
  switch (roleEnum) {
    case RoleEnum.SuperAdmin:
      return "Super Admin";
    case RoleEnum.Admin:
      return "Admin";
    case RoleEnum.Editor:
      return "Biên tập viên";
    case RoleEnum.PRClient:
      return "Doanh nghiệp (PR)";
    case RoleEnum.User:
      return "Người dùng";
    default:
      return roleName;
  }
};
