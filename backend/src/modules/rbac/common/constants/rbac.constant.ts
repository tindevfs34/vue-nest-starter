/**
 * RBAC Module Error & Notification Messages (Tiếng Việt)
 * Complies with Backend Coding Guidelines Section 3: Constants & Enum
 */
export const RBAC_MESSAGES = {
  // Permissions
  PERMISSION_NOT_FOUND: (id: string) => `Không tìm thấy quyền hạn với ID ${id}`,
  PERMISSION_NAME_EXISTS: 'Tên quyền hạn đã tồn tại trong hệ thống',
  NO_PERMISSIONS_FOUND: 'Không tìm thấy quyền hạn nào với các ID đã cung cấp',
  CANNOT_DELETE_SYSTEM_PERMISSIONS: 'Không thể xóa các quyền hạn hệ thống',
  PERMISSION_DELETED: 'Đã xóa quyền hạn thành công',
  PERMISSIONS_BULK_DELETED: (count: number) =>
    `Đã xóa ${count} quyền hạn thành công`,

  // Roles
  ROLE_NOT_FOUND: (id: string) => `Không tìm thấy vai trò với ID ${id}`,
  ROLE_NAME_EXISTS: 'Tên vai trò đã tồn tại trong hệ thống',
  ROLE_DELETED: 'Đã xóa vai trò thành công',
  ROLE_PERMANENTLY_DELETED: 'Đã xóa vĩnh viễn vai trò thành công',
  ROLES_BULK_DELETED: (count: number) =>
    `Đã xóa ${count} vai trò thành công`,
  NO_ROLES_FOUND: 'Không tìm thấy vai trò nào với các ID đã cung cấp',
  CANNOT_ACCESS_SUPERADMIN_ROLE: 'Không có quyền truy cập vai trò Super Admin',
  CANNOT_UPDATE_SUPERADMIN_ROLE: 'Không thể cập nhật vai trò Super Admin',
  CANNOT_DELETE_SYSTEM_ROLES:
    'Không thể xóa các vai trò hệ thống (SuperAdmin, Admin)',
  CANNOT_PERMANENTLY_DELETE_SYSTEM_ROLES:
    'Không thể xóa vĩnh viễn các vai trò hệ thống (SuperAdmin, Admin)',
  CANNOT_DELETE_SYSTEM_ROLES_BULK: (roles: string) =>
    `Không thể xóa các vai trò hệ thống: ${roles}`,

  // Role-Permission Assignment
  ROLE_PERMISSION_ASSIGNED: 'Đã gán quyền hạn cho vai trò thành công',
  ROLE_PERMISSION_REVOKED: 'Đã thu hồi quyền hạn của vai trò thành công',
  ROLE_PERMISSION_ALREADY_EXISTS: 'Vai trò này đã được gán quyền hạn trên',

  // Common
  PROVIDE_AT_LEAST_ONE_ID: 'Vui lòng cung cấp ít nhất một ID',
} as const;

export const RBAC_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
} as const;
