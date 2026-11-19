
export const USER_MESSAGES = {
  // Users CRUD & Actions
  USER_NOT_FOUND: (id: string) => `Không tìm thấy người dùng #${id}`,
  USER_NOT_FOUND_BY_ID: (id: string) => `Không tìm thấy người dùng với ID ${id}`,
  USER_DELETED: 'Đã xóa người dùng thành công',
  USER_PERMANENTLY_DELETED: 'Đã xóa vĩnh viễn người dùng thành công',
  USER_RESTORED: 'Đã khôi phục người dùng thành công',
  USERS_BULK_DELETED: (count: number) =>
    `Đã xóa ${count} người dùng thành công`,
  USERS_BULK_HARD_DELETED: (count: number) =>
    `Đã xóa vĩnh viễn ${count} người dùng thành công`,
  USERS_BULK_RESTORED: (count: number) =>
    `Đã khôi phục ${count} người dùng thành công`,
  NO_USERS_FOUND: 'Không tìm thấy người dùng nào với các ID đã cung cấp',
  NO_USERS_TO_UPDATE_STATUS: 'Không tìm thấy người dùng nào để cập nhật trạng thái',
  EMAIL_ALREADY_EXISTS: 'Địa chỉ email đã tồn tại trong hệ thống',
  PROVIDE_AT_LEAST_ONE_ID: 'Vui lòng cung cấp ít nhất một ID',
  CANNOT_DELETE_OWN_ACCOUNT: 'Bạn không thể tự xóa tài khoản của chính mình',

  // SuperAdmin & Admin Policies
  CANNOT_VIEW_OR_MODIFY_SUPERADMIN: 'Không thể xem hoặc chỉnh sửa người dùng Super Admin',
  CANNOT_ACCESS_SUPERADMIN_USERS: 'Không có quyền truy cập người dùng Super Admin',
  CANNOT_UPDATE_SUPERADMIN_USER: 'Không thể cập nhật người dùng Super Admin',
  CANNOT_UPDATE_SUPERADMIN_USER_ADMIN:
    'Không thể cập nhật người dùng Super Admin qua trang Quản lý người dùng',
  CANNOT_DELETE_SUPERADMIN_USER: 'Không thể xóa người dùng Super Admin',
  CANNOT_DELETE_SUPERADMIN_USER_ADMIN:
    'Không thể xóa người dùng Super Admin qua trang Quản lý người dùng',
  CANNOT_PERMANENTLY_DELETE_SUPERADMIN:
    'Không thể xóa vĩnh viễn người dùng Super Admin',
  CANNOT_DELETE_SUPERADMIN_BULK: (emails: string) =>
    `Không thể xóa các người dùng Super Admin: ${emails}`,
  CANNOT_PERMANENTLY_DELETE_SUPERADMIN_BULK: (emails: string) =>
    `Không thể xóa vĩnh viễn các người dùng Super Admin: ${emails}`,
  CANNOT_ASSIGN_SUPERADMIN_ROLE_ADMIN:
    'Không thể gán vai trò Super Admin qua trang Quản lý người dùng',
  CANNOT_ASSIGN_SUPERADMIN_ROLE_NEW_USER:
    'Không thể gán vai trò Super Admin cho người dùng mới',
  CANNOT_ASSIGN_SUPERADMIN_ROLE_TO_USERS:
    'Không thể gán vai trò Super Admin cho người dùng',
  CANNOT_ASSIGN_ADMIN_ROLES_BULK:
    'Không thể gán hàng loạt vai trò Super Admin hoặc  Admin cho người dùng',
  SUPER_ADMIN_ONLY_CREATE_ADMIN:
    'Chỉ Super Admin mới có quyền tạo người dùng có vai trò Admin hoặc Super Admin',
  SUPER_ADMIN_ONLY_UPDATE_ADMIN:
    'Chỉ Super Admin mới có quyền cập nhật người dùng có vai trò Admin',
  SUPER_ADMIN_ONLY_ASSIGN_ADMIN:
    'Chỉ Super Admin mới có quyền gán vai trò Admin hoặc Super Admin',
  SUPER_ADMIN_ONLY_DELETE_ADMIN:
    'Chỉ Super Admin mới có quyền xóa người dùng có vai trò Admin',

  // Avatar & File Uploads
  AVATAR_FILE_REQUIRED: 'Vui lòng cung cấp tệp ảnh đại diện',
  AVATAR_INVALID_MIME:
    'Chỉ chấp nhận các tệp định dạng hình ảnh (JPEG, PNG, WEBP, GIF, AVIF)',
  AVATAR_SIZE_EXCEEDED: 'Dung lượng tệp ảnh đại diện không được vượt quá 5MB',
  AVATAR_BUFFER_READ_FAILED: 'Không thể đọc nội dung dữ liệu của ảnh đại diện',
  AVATAR_UPLOAD_FAILED: (msg: string) => `Tải lên ảnh đại diện thất bại: ${msg}`,
} as const;

export const USER_CONSTANTS = {
  DEFAULT_AVATAR_FILENAME: 'avatar.jpg',
  DEFAULT_ADMIN_PASSWORD: 'Password123@',
} as const;
