// ─── Common Status Enums & Types ─────────────────────────────────────


export type ContentStatusType =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export type VersionStatusType =
  | "DRAFT"
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

// Backward-compatible type aliases
export type ProductStatusType = VersionStatusType;
export type PostStatusType = VersionStatusType;
export type ProductMasterStatusType = ContentStatusType;
export type PostMasterStatusType = ContentStatusType;


export interface VersionSummaryType {
  id: string;
  versionNumber: number;
  name: string;
  slug: string;
  barcode?: string | null;
  status: VersionStatusType;
  isLive: boolean;
  createdAt?: string;
  createdById?: string;
  createdBy?: {
    id: string;
    fullName?: string;
    email?: string;
    avatarUrl?: string | null;
  };
  approvedById?: string | null;
  approvedBy?: {
    id: string;
    fullName?: string;
    email?: string;
  } | null;
  approvedAt?: string | null;
  rejectionReason?: string | null;
  submittedAt?: string | null;
}

// ─── General Common Types ─────────────────────────────────────────────

export type CommonObjectType = {
  id: number;
  name: string;
};

export type OptionType = CommonObjectType;

export type ErrorType = {
  key: string;
  message: string;
};

// ─── Standard API Response Types ──────────────────────────────────────

export type ApiResponseType<T = void, D = void> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
};

export type ApiErrorResponseType = {
  success: false;
  statusCode: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
};

export type StandardApiError = {
  success: false;
  statusCode: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
};

export type ApiPaginationType = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
};

export type ApiPaginatedData<T> = {
  items: T[];
  pagination: ApiPaginationType;
};

// ─── Legacy Aliases (backward compatibility) ──────────────────────────

export type ApiGetItemsResponseType<T> = {
  page: number;
  total: number;
  limit: number;
  items: T[];
};

export type ApiGetItemsResponse<T> = ApiGetItemsResponseType<T>;

export type ApiGetItemsResponseWithDatesType<T> = {
  date: string[];
} & ApiGetItemsResponseType<T>;

export type ApiGetItemsResponseWithDates<T> = ApiGetItemsResponseWithDatesType<T>;

export type CreateSuccessResponseType = {
  id: number;
};

export type CreateFileSuccessResponseType = {
  id: number;
  url: string;
  name: string;
  size: number;
  ext: string;
};

export type UploadImageSuccessResponseType = {
  url: string;
  url_300x235: string;
  url_thumbnail: string;
  name: string;
  size: number;
  ext: string;
};

export type FileDownloadResultType = {
  status: number;
  message: string;
};

export type FilterType = {
  status?: number | string;
  keyword?: string;
  page: number;
  category_id?: number;
};

export type FancyType = {
  src: string;
  caption: string;
  thumb: string;
};

export type TimerType = {
  hours: number;
  minutes: number;
  seconds: number;
};
