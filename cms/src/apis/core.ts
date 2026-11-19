// Core & plugins
import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosProgressEvent,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
// Dev
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth.store";
import { HTTP_STATUS } from "@/common/constants";
// Type
import type {
  ApiResponseType,
  ApiErrorResponseType,
  StandardApiError,
  FileDownloadResultType,
} from "@/types/common.type";

import { useToast } from "vue-toast-notification";
const toast = useToast();

/**
 * Transform raw AxiosError into a StandardApiError object.
 * If the backend already returns the standard error envelope, use it directly.
 * Otherwise, construct one from the AxiosError fields.
 */
function toStandardApiError(error: AxiosError): StandardApiError {
  const responseData = error.response?.data as
    | Partial<ApiErrorResponseType>
    | undefined;

  const rawMessage = (responseData as any)?.message;
  let parsedMessage: string | undefined;
  if (Array.isArray(rawMessage)) {
    parsedMessage = rawMessage.join('; ');
  } else if (typeof rawMessage === 'string') {
    parsedMessage = rawMessage;
  } else if (rawMessage) {
    parsedMessage = String(rawMessage);
  }

  // Backend already returns the standard error format
  if (
    responseData &&
    typeof responseData === "object" &&
    responseData.success === false &&
    typeof responseData.statusCode === "number"
  ) {
    return {
      success: false,
      statusCode: responseData.statusCode,
      error: responseData.error || `ERROR_${responseData.statusCode}`,
      message: parsedMessage || "Đã xảy ra lỗi, vui lòng thử lại.",
      path: responseData.path || error.config?.url || "",
      timestamp:
        responseData.timestamp ||
        new Date().toISOString().replace("T", " ").substring(0, 19),
    };
  }

  // Fallback: construct from AxiosError
  const statusCode = error.response?.status || 0;
  const message =
    parsedMessage ||
    error.message ||
    "An unexpected error occurred";

  return {
    success: false,
    statusCode,
    error: `ERROR_${statusCode}`,
    message,
    path: error.config?.url || "",
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
  };
}

class RequestMethods {
  private readonly apiInstance: AxiosInstance;

  constructor(
    baseURL: string,
    headers: Record<string, string> = { "Content-Type": "application/json" },
  ) {
    this.apiInstance = axios.create({
      baseURL,
      headers,
      timeout: 300000,
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.apiInstance.interceptors.request.use(
      this.handleRequestConfig,
      this.handleRequestError,
    );
    this.apiInstance.interceptors.response.use(
      this.handleResponseSuccess,
      this.handleResponseError,
    );
  }

  private handleRequestConfig(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    const authStore = useAuthStore();
    // Setup headers
    const headers = new AxiosHeaders(config.headers);

    const token = authStore.accessToken;
    if (
      token &&
      token.trim() !== ""
    ) {
      headers.set("Authorization", `Bearer ${token.trim()}`);
    }
    config.headers = headers;
    return config;
  }

  private handleRequestError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  private handleResponseSuccess(response: AxiosResponse): any {
    const method = response.config.method?.toUpperCase() || "";
    const message = response.data?.message;

    const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    const hasCustomMessage = Boolean(message && message !== "Success");

    if (isMutation && hasCustomMessage) {
      if (response.data?.data?.noChanges) {
        toast.info(message);
      } else {
        toast.success(message);
      }
    }

    if (response.config.responseType === "blob") {
      return response;
    }

    return response.data?.data;
  }

  private handleResponseError(error: AxiosError): Promise<never> {
    if (!error.response) {
      // Network error / timeout — no response from server
      const networkError: StandardApiError = {
        success: false,
        statusCode: 0,
        error: "NETWORK_ERROR",
        message: error.message || "Lỗi kết nối mạng",
        path: error.config?.url || "",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      };
      toast.error(networkError.message);
      return Promise.reject(networkError);
    }

    const { status } = error.response;
    const requestUrl = error.config?.url || "";

    // Ignore 401 on auth endpoints (login, logout, refresh) to prevent infinite recursive calls
    const isAuthEndpoint =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/admin/login") ||
      requestUrl.includes("/auth/logout") ||
      requestUrl.includes("/auth/refresh");

    if (status === HTTP_STATUS.UnAuthorized) {
      if (!isAuthEndpoint) {
        const authStore = useAuthStore();
        authStore.logout();
      }
      const standardError = toStandardApiError(error);
      const isLogout = requestUrl.includes("/auth/logout");
      if (standardError.message && !isLogout) {
        toast.error(standardError.message);
      }
      return Promise.reject(standardError);
    }

    if (status === HTTP_STATUS.Maintenance) {
      router.push("/error503");
      const standardError = toStandardApiError(error);
      return Promise.reject(standardError);
    }

    // All other errors → transform into StandardApiError and show toast
    const standardError = toStandardApiError(error);
    if (standardError.message) {
      toast.error(standardError.message);
    }
    return Promise.reject(standardError);
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.apiInstance.get(url, config);
  }

  public async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
    progressCallback?: (progressEvent: AxiosProgressEvent) => void,
  ): Promise<T> {
    return this.apiInstance.post(url, data, {
      ...config,
      onUploadProgress: progressCallback,
    });
  }

  public async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.apiInstance.put(url, data, config);
  }

  public async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.apiInstance.patch(url, data, config);
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.apiInstance.delete(url, config);
  }

  public async download(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<FileDownloadResultType | undefined> {
    try {
      const response = await this.apiInstance.get(url, {
        ...config,
        responseType: "blob",
        maxRedirects: 0,
      });

      if (response.status !== HTTP_STATUS.Success) {
        const dataResponse = await response.data.text();
        const jsonData = JSON.parse(dataResponse);
        return {
          status: jsonData.code,
          message: jsonData.message,
        };
      }

      const filename =
        this.getFilenameFromResponse(response) || "file-download";
      await this.downloadFile(response, filename);

      return {
        status: response.status,
        message: response.data?.message || "Thành công",
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.response.data?.message || "Thất bại",
      };
    }
  }

  private getFilenameFromResponse(response: AxiosResponse): string | null {
    const contentDisposition = response.headers["content-disposition"];
    if (!contentDisposition) return null;
    const match = contentDisposition.match(/filename=(.+)/);
    return match ? match[1] : null;
  }

  private async downloadFile(
    response: AxiosResponse,
    filename: string,
  ): Promise<void> {
    const contentType = String(
      response.headers["content-type"] ?? "application/octet-stream",
    );
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    try {
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } finally {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }
}

export const requestMethods = new RequestMethods(import.meta.env.VITE_BASE_API);
export const requestMethodsUpload = new RequestMethods(
  import.meta.env.VITE_BASE_API,
  {
    "Content-Type": "multipart/form-data",
  },
);
export const requestMethodsCloud = new RequestMethods(
  import.meta.env.VITE_BASE_API_CLOUD,
  {
    "Content-Type": "multipart/form-data",
  },
);
