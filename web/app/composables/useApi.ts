// composables/useApi.ts
interface ApiResponse<T> {
  data: T;
  status: any;
  statusCode: number;
  path: string;
}

interface FetchOptions {
  params?: Record<string, any>;
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = (config.apiBase as string) || config.public.apiBase;
  console.log("API Base URL:", baseURL);
  // GET request
  const get = async <T>(path: string, options: FetchOptions = {}) => {
    try {
      const response = await $fetch<ApiResponse<T>>(path, {
        method: "GET",
        baseURL,
        params: options.params,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  // POST request
  const post = async <T>(path: string, options: FetchOptions = {}) => {
    try {
      const response = await $fetch<ApiResponse<T>>(path, {
        method: "POST",
        baseURL,
        body: options.body,
        params: options.params,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  // PUT request
  const put = async <T>(path: string, options: FetchOptions = {}) => {
    try {
      const response = await $fetch<ApiResponse<T>>(path, {
        method: "PUT",
        baseURL,
        body: options.body,
        params: options.params,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  // DELETE request
  const del = async <T>(path: string, options: FetchOptions = {}) => {
    try {
      const response = await $fetch<ApiResponse<T>>(path, {
        method: "DELETE",
        baseURL,
        params: options.params,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    del,
  };
};
