
export type Response<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
};

export type ErrorResponse = {
  success: boolean;
  statusCode: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
};
