
export const AUTH_CONFIG = {
  ACCESS_TOKEN_EXPIRES_IN: '1d',
  REFRESH_TOKEN_EXPIRES_IN: '7d',
  REFRESH_TOKEN_DAYS: 7,
  BCRYPT_SALT_ROUNDS: 10,
} as const;

export const AUTH_MESSAGES = {
  INVALID_OR_EXPIRED_REFRESH_TOKEN:
    'Refresh token không hợp lệ hoặc đã hết hạn',
  SESSION_EXPIRED: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại',
  INVALID_REFRESH_TOKEN: 'Refresh token không hợp lệ',
  ACCOUNT_LOCKED_OR_NOT_FOUND: 'Tài khoản không tồn tại hoặc đã bị khóa',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
} as const;
