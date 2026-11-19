export const COMMON_MESSAGES = {
  // ─── HTTP & System ───────────────────────────────────────────────────
  SYSTEM: {
    INTERNAL_SERVER_ERROR: 'Lỗi máy chủ nội bộ',
  },

  // ─── Auth & Strategies ───────────────────────────────────────────────
  AUTH: {
    LOGIN_REQUIRED: 'Vui lòng đăng nhập',
    ACCOUNT_NOT_FOUND: 'Tài khoản không tồn tại',
    ACCOUNT_LOCKED: 'Tài khoản của bạn đã bị khóa',
    INVALID_CREDENTIALS: 'Tài khoản hoặc mật khẩu không đúng',
    ACCESS_DENIED: 'Tài khoản không có quyền truy cập',
    SESSION_EXPIRED: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn',
    USER_NOT_AUTHENTICATED: 'Người dùng chưa được xác thực',
    PERMISSION_REQUIRED: (permissions: string[]) =>
      `Bạn cần một trong các quyền sau: ${permissions.join(', ')}`,
  },

  // ─── Validation ──────────────────────────────────────────────────────
  VALIDATION: {
    ENTITY_NOT_FOUND: (entityName = 'Dữ liệu') => `Không tìm thấy ${entityName}`,
    NAME_ALREADY_EXISTS: 'Tên đã tồn tại',
    SLUG_ALREADY_EXISTS: (slug: string, isAnotherItem = false) => {
      const suffix = isAnotherItem
        ? ' ở một mục khác. Vui lòng chọn đường dẫn khác.'
        : '. Vui lòng chọn đường dẫn khác.';
      return `Đường dẫn (slug) "${slug}" đã tồn tại${suffix}`;
    },
  },

  // ─── Storage & S3 ────────────────────────────────────────────────────
  STORAGE: {
    CREDENTIALS_MISSING: (prefix: string) =>
      `Thiếu ${prefix}_ACCESS_KEY hoặc ${prefix}_SECRET_KEY trong biến môi trường`,
  },
} as const;
