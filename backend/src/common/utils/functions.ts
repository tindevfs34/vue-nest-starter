import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import config from '@config/configuration';
import { RoleEnum } from '../enums/role.enum';

import {
  FILE_SIZE_LIMITS,
  FILE_SIGNATURES,
  MIME_TYPE_STANDARDS,
  BLOCKED_EXTENSIONS,
  ALL_ALLOWED_MIME_TYPES,
} from '@/common/constants';

// ============================================
// File Validation Utilities
// ============================================

/**
 * Get the human-readable standard/format for a MIME type
 */
export function getMimeTypeStandard(mimeType: string): string {
  return MIME_TYPE_STANDARDS[mimeType] || mimeType;
}

/**
 * Detect MIME type from buffer magic bytes
 */
export function detectMimeType(buffer: Buffer): string | null {
  for (const { mime, signature } of FILE_SIGNATURES) {
    if (buffer.length >= signature.length) {
      if (buffer.subarray(0, signature.length).equals(signature)) {
        return mime;
      }
    }
  }
  return null;
}

/**
 * Validate file signature (magic bytes) to prevent MIME type spoofing
 */
export function validateFileSignature(
  buffer: Buffer,
  declaredMimeType: string,
): boolean {
  const actualMime = detectMimeType(buffer);
  if (!actualMime) {
    // If we don't have a signature for this type, we allow it (simplified)
    // but in a strict system we might return false if it's a known detectable type
    return true;
  }
  return actualMime === declaredMimeType;
}

/**
 * Validate file signature for files on disk
 */
export function validateFileSignatureFromDisk(
  filePath: string,
  declaredMimeType: string,
): boolean {
  // Find the longest signature we need to check
  const maxSigLength = Math.max(
    ...FILE_SIGNATURES.map((s) => s.signature.length),
  );
  const buffer = Buffer.alloc(maxSigLength);

  try {
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, maxSigLength, 0);
    fs.closeSync(fd);

    return validateFileSignature(buffer, declaredMimeType);
  } catch (error) {
    return false;
  }
}

/**
 * Get file size limit based on MIME type
 */
export function getFileSizeLimit(mimeType: string): number {
  if (mimeType.startsWith('image/')) return FILE_SIZE_LIMITS.IMAGE;
  if (mimeType.startsWith('video/')) return FILE_SIZE_LIMITS.VIDEO;
  if (mimeType.startsWith('audio/')) return FILE_SIZE_LIMITS.AUDIO;
  if (
    mimeType.includes('pdf') ||
    mimeType.includes('document') ||
    mimeType.includes('sheet') ||
    mimeType.includes('presentation')
  ) {
    return FILE_SIZE_LIMITS.DOCUMENT;
  }
  return FILE_SIZE_LIMITS.DEFAULT;
}

/**
 * Check if extension is blocked
 */
export function isBlockedExtension(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return BLOCKED_EXTENSIONS.includes(ext);
}

/**
 * Check if MIME type is allowed
 */
export function isAllowedMimeType(mimeType: string): boolean {
  return ALL_ALLOWED_MIME_TYPES.includes(mimeType);
}

/**
 * Generate unique filename to prevent overwrites
 */
export function generateUniqueFilename(originalName: string): string {
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext);
  const safeBaseName = baseName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniqueId = crypto.randomBytes(8).toString('hex');
  return `${Date.now()}_${uniqueId}_${safeBaseName}${ext}`;
}

/**
 * Get temp upload directory
 */
export function getTempUploadDir(): string {
  const tempDir = path.join(process.cwd(), 'temp', 'uploads');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  return tempDir;
}

/**
 * Check available disk space (returns free space in bytes)
 * This is a simplified check - for production, use a proper disk space library
 */
export async function checkDiskSpace(
  minSpaceRequired: number,
): Promise<boolean> {
  try {
    const tempDir = getTempUploadDir();
    const stats = fs.statfsSync(tempDir);
    const freeSpace = stats.bfree * stats.bsize;
    return freeSpace > minSpaceRequired;
  } catch {
    // If we can't check, assume there's space
    return true;
  }
}

// ============================================
// Temp File Cleanup Utilities
// ============================================

/**
 * Clean up a single temporary file
 */
export async function cleanupTempFile(filePath?: string): Promise<void> {
  if (!filePath || !fs.existsSync(filePath)) return;

  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.error(`Failed to cleanup temp file: ${filePath}`, err);
  }
}

/**
 * Clean up multiple temporary files
 */
export async function cleanupTempFiles(
  files: Array<{ path?: string }>,
): Promise<void> {
  if (!files?.length) return;

  await Promise.all(
    files
      .filter((file) => file?.path)
      .map((file) => cleanupTempFile(file.path)),
  );
}

/**
 * Clean up old temp files (files older than 1 hour)
 */
export function cleanupOldTempFiles(): void {
  try {
    const tempDir = getTempUploadDir();
    if (!fs.existsSync(tempDir)) return;

    const files = fs.readdirSync(tempDir);
    const oneHourAgo = Date.now() - 60 * 60 * 1000;

    for (const file of files) {
      const filePath = path.join(tempDir, file);
      const stats = fs.statSync(filePath);
      if (stats.mtimeMs < oneHourAgo) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (error) {
    console.error('Failed to cleanup old temp files', error);
  }
}
/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Normalize to Unicode decomposed form
    .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
    .replace(/[đĐ]/g, (match) => (match === 'đ' ? 'd' : 'D')) // Handle đ specifically
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

// ============================================
// Role Check Utilities
// ============================================

/**
 * Check if user has SuperAdmin role
 */
export function isSuperAdmin(user: any): boolean {
  if (!user) return false;
  if (user.isSuperAdmin === true) return true;
  const roleName = user.role?.name || (Array.isArray(user.roles) ? user.roles[0]?.name : null);
  if (roleName) {
    const normalized = String(roleName).toUpperCase().replace(/[\s_-]+/g, '');
    return normalized === 'SUPERADMIN' || roleName === RoleEnum.SuperAdmin;
  }
  if (Array.isArray(user.roles)) {
    return user.roles.some((r: any) => {
      const n = String(r?.name || '').toUpperCase().replace(/[\s_-]+/g, '');
      return n === 'SUPERADMIN' || r?.name === RoleEnum.SuperAdmin;
    });
  }
  return false;
}

/**
 * Check if user has Admin role
 */
export function isAdmin(user: any): boolean {
  if (!user) return false;
  const roleName = user.role?.name || (Array.isArray(user.roles) ? user.roles[0]?.name : null);
  if (roleName) {
    const normalized = String(roleName).toUpperCase().replace(/[\s_-]+/g, '');
    return normalized === 'ADMIN' || roleName === RoleEnum.Admin;
  }
  if (Array.isArray(user.roles)) {
    return user.roles.some((r: any) => {
      const n = String(r?.name || '').toUpperCase().replace(/[\s_-]+/g, '');
      return n === 'ADMIN' || r?.name === RoleEnum.Admin;
    });
  }
  return false;
}

/**
 * Check if user is Admin or SuperAdmin
 */
export function isAdminOrSuper(user: any): boolean {
  if (!user) return false;
  const roleName = user.role?.name || (Array.isArray(user.roles) ? user.roles[0]?.name : undefined);
  return [RoleEnum.Admin, RoleEnum.SuperAdmin].includes(roleName as RoleEnum);
}

// ============================================
// SKU Generation Utilities
// ============================================

/**
 * Generate a unique SKU for an entity
 */
export async function generateUniqueSKU(
  repository: any,
  prefix: string = 'TW',
  options?: {
    format?: 'numeric' | 'alphanumeric';
    length?: number;
  },
): Promise<string> {
  const { format = 'numeric', length = 6 } = options || {};
  let sku: string = '';
  let exists = true;

  while (exists) {
    if (format === 'numeric') {
      const min = Math.pow(10, length - 1);
      const max = Math.pow(10, length) - 1;
      sku = `${prefix}-${Math.floor(min + Math.random() * (max - min + 1))}`;
    } else {
      sku = `${prefix}-${Math.random()
        .toString(36)
        .substring(2, 2 + length)
        .toUpperCase()}`;
    }

    const found = await repository.findOne({ where: { sku } });
    if (!found) exists = false;
  }
  return sku;
}

// ============================================
// Content Verification Utilities
// ============================================

/**
 * Compute a SHA256 hash of a JSON-stable representation of an object
 */
export function computeContentHash(data: any): string {
  const stable = JSON.stringify(data);
  return crypto.createHash('sha256').update(stable).digest('hex');
}

/**
 * Normalize an array of relations (entities or IDs) to a sorted list of IDs
 * Useful for stable content hashing when order doesn't matter
 */
export function normalizeRelationIds(
  items: any[] | null | undefined,
): (number | string)[] {
  if (!items || !Array.isArray(items)) return [];
  return items
    .map((item) => (typeof item === 'object' && item !== null ? item.id : item))
    .filter((id) => id !== undefined && id !== null)
    .sort((a, b) => String(a).localeCompare(String(b)));
}

// ============================================
// Query Parsing Utilities
// ============================================

/**
 * Parse a comma-separated string of IDs into a numeric array
 */
export function parseIds(ids: string | null | undefined): number[] {
  if (!ids) return [];
  return ids
    .split(',')
    .map((id) => parseInt(id.trim(), 10))
    .filter((id) => !isNaN(id));
}

/**
 * Parse a price range string (min,max) into a tuple
 */
export function parsePriceRange(
  range: string | null | undefined,
): [number | null, number | null] {
  if (!range) return [null, null];
  const parts = range.split(',');
  const min = parts[0] ? parseInt(parts[0].trim(), 10) : NaN;
  const max = parts[1] ? parseInt(parts[1].trim(), 10) : NaN;
  return [!isNaN(min) ? min : null, !isNaN(max) ? max : null];
}

// ============================================
// Storage URL Utilities
// ============================================

/**
 * Build a full public URL for a stored file path.
 * Reads STORAGE_BASE_URL from environment (falls back to Minio default).
 *
 * @param filePath - Relative path returned by the media entity (e.g. "uploads/img/abc.jpg")
 * @returns Full URL string, or null when filePath is falsy
 */
export function getStorageUrl(
  filePath: string | null | undefined,
): string | null {
  if (!filePath) return null;
  const base = (
    config.app?.storage_base_url ||
    process.env.STORAGE_BASE_URL ||
    'http://localhost:9000/test-bucket/'
  ).replace(/\/$/, '');
  const relative = filePath.replace(/^\//, '');
  return `${base}/${relative}`;
}
