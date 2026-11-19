/**
 * Trích xuất thông báo lỗi chính xác từ Backend API Response
 * Hỗ trợ NestJS AllExceptionsFilter, class-validator, chuỗi lỗi và Error object
 */
export const extractApiErrorMessage = (
  error: unknown,
  fallback: string = "Đã có lỗi xảy ra. Vui lòng thử lại.",
): string => {
  if (!error) return fallback;

  if (typeof error === "string") return error;

  const axiosError = error as {
    response?: {
      data?: {
        message?: string | string[];
        error?: string;
        errors?:
          | string
          | string[]
          | {
              message?: string | string[];
              error?: string;
              statusCode?: number;
            };
      };
    };
  };

  const data = axiosError?.response?.data;

  if (data) {
    // 1. Cấu trúc AllExceptionsFilter: data.errors (object hoặc array hoặc string)
    if (data.errors) {
      if (typeof data.errors === "string") {
        return data.errors;
      }
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        const first = data.errors[0];
        return typeof first === "string" ? first : JSON.stringify(first);
      }
      if (typeof data.errors === "object" && data.errors !== null) {
        const errObj = data.errors as {
          message?: string | string[];
          error?: string;
          statusCode?: number;
        };
        if (errObj.message) {
          if (
            Array.isArray(errObj.message) &&
            errObj.message.length > 0
          ) {
            return String(errObj.message[0]);
          }
          if (typeof errObj.message === "string") {
            return errObj.message;
          }
        }
        if (errObj.error && typeof errObj.error === "string") {
          return errObj.error;
        }
      }
    }

    // 2. Cấu trúc thông thường: data.message
    if (data.message) {
      if (Array.isArray(data.message) && data.message.length > 0) {
        return String(data.message[0]);
      }
      if (typeof data.message === "string") {
        return data.message;
      }
    }

    // 3. data.error
    if (data.error && typeof data.error === "string") {
      return data.error;
    }
  }

  // 4. Lấy message từ Error object nếu không phải mã lỗi axios chung chung
  if (
    error instanceof Error &&
    error.message &&
    !error.message.startsWith("Request failed with status code")
  ) {
    return error.message;
  }

  return fallback;
};
