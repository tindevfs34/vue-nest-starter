/**
 * Role Enum representing user roles in the system
 * Sync 1:1 with backend role definitions
 */
export enum RoleEnum {
  SuperAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  Editor = "EDITOR",
  PRClient = "PR_CLIENT",
  User = "USER",
}
