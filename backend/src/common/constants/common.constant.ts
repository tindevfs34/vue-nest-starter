
export const LIMIT_PER_PAGE = 10;

// ============================================
// User Status 
// ============================================
export const USER_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export const MEDIA_S3_IMAGE_FOLDER = 'images';

// ============================================
// Media Upload
// ============================================

export const FILE_SIZE_LIMITS = {
  IMAGE: 10 * 1024 * 1024, // 10MB for images
  VIDEO: 500 * 1024 * 1024, // 500MB for videos
  AUDIO: 50 * 1024 * 1024, // 50MB for audio
  DOCUMENT: 20 * 1024 * 1024, // 20MB for documents
  DEFAULT: 50 * 1024 * 1024, // 50MB default
} as const;

export const MAX_TOTAL_UPLOAD_SIZE = 500 * 1024 * 1024; // 500MB

export const MAX_FILES_COUNT = 100;

export const ALLOWED_MIME_TYPES: Record<string, readonly string[]> = {
  image: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
    'image/tiff',
  ],
  video: [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/x-flv',
  ],
  audio: [
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/mp4',
    'audio/webm',
    'audio/flac',
    'audio/aac',
  ],
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
  ],
  archive: [
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/gzip',
    'application/x-tar',
  ],
} as const;

export const ALL_ALLOWED_MIME_TYPES = Object.values(ALLOWED_MIME_TYPES).flat();

export const BLOCKED_EXTENSIONS: readonly string[] = [
  '.exe',
  '.bat',
  '.cmd',
  '.sh',
  '.ps1',
  '.dll',
  '.scr',
  '.msi',
  '.vbs',
  '.js',
  '.jar',
  '.php',
  '.asp',
  '.aspx',
  '.jsp',
  '.cgi',
  '.pl',
  '.py',
  '.rb',
  '.htaccess',
  '.htpasswd',
] as const;

export const FILE_SIGNATURES = [
  { mime: 'image/jpeg', signature: Buffer.from([0xff, 0xd8, 0xff]) },
  { mime: 'image/png', signature: Buffer.from([0x89, 0x50, 0x4e, 0x47]) },
  { mime: 'image/gif', signature: Buffer.from([0x47, 0x49, 0x46, 0x38]) },
  { mime: 'image/webp', signature: Buffer.from([0x52, 0x49, 0x46, 0x46]) },
  {
    mime: 'application/pdf',
    signature: Buffer.from([0x25, 0x50, 0x44, 0x46]),
  },
  {
    mime: 'application/zip',
    signature: Buffer.from([0x50, 0x4b, 0x03, 0x04]),
  },
  {
    mime: 'video/mp4',
    signature: Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]),
  },
  {
    mime: 'video/mp4',
    signature: Buffer.from([0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70]),
  },
  {
    mime: 'video/mp4',
    signature: Buffer.from([0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70]),
  },
] as const;

export const MIME_TYPE_STANDARDS: Record<string, string> = {
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/gif': 'GIF',
  'image/webp': 'WebP',
  'image/svg+xml': 'SVG',
  'image/bmp': 'BMP',
  'image/tiff': 'TIFF',
  'video/mp4': 'MP4',
  'video/webm': 'WebM',
  'video/ogg': 'Ogg Video',
  'audio/mpeg': 'MP3',
  'audio/wav': 'WAV',
  'application/pdf': 'PDF',
  'application/zip': 'ZIP',
  'application/x-rar-compressed': 'RAR',
  'application/x-7z-compressed': '7Z',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'Word (DOCX)',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    'Excel (XLSX)',
};


// ============================================
// Logo Upload 
// ============================================
export const LOGO_MAX_SIZE = 2 * 1024 * 1024; // 2MB limit

export const LOGO_ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/svg+xml',
] as const;

export const DEFAULT_LOGO_FILENAME = 'logo.png' as const;

// ============================================
// Avatar Upload 
// ============================================
export const AVATAR_MAX_SIZE = 5 * 1024 * 1024; // 5MB limit

export const AVATAR_ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
] as const;

// ============================================
// Storage & Bucket 
// ============================================
export const STORAGE_CONSTANTS = {
  DEFAULT_BUCKET: 'test-bucket',
  ENV_S3_BUCKET: 'S3_BUCKET_NAME',
  ENV_MINIO_BUCKET: 'MINIO_BUCKET_NAME',
} as const;

