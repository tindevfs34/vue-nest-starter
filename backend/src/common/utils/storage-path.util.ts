import { extname } from 'path';

export class StoragePathUtil {
  static sanitizeFilename(originalName: string): string {
    if (!originalName) {
      return `${Date.now()}_file`;
    }
    const fileExt = extname(originalName);
    const cleanBaseName = originalName
      .slice(0, originalName.length - fileExt.length)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_');

    const hasTimestampPrefix = /^\d{13}_/.test(cleanBaseName);
    const finalName = hasTimestampPrefix
      ? cleanBaseName
      : `${Date.now()}_${cleanBaseName}`;

    return `${finalName}${fileExt.toLowerCase()}`;
  }


  static getPlatformSystemPath(filename: string): string {
    const cleanFile = this.sanitizeFilename(filename);
    return `platform/system/${cleanFile}`;
  }

  static getPlatformUserPath(superAdminId: string, filename: string): string {
    const cleanUser = (superAdminId || 'admin').replace(/[^a-zA-Z0-9_-]/g, '');
    const cleanFile = this.sanitizeFilename(filename);
    return `platform/users/${cleanUser}/${cleanFile}`;
  }

  static getPlatformAffiliatePath(filenameOrId: string, filename?: string): string {
    const targetFile = filename || filenameOrId;
    const cleanFile = this.sanitizeFilename(targetFile);
    return `platform/affiliate/${cleanFile}`;
  }

  static getGlobalAffiliatePlatformPath(filename: string): string {
    return this.getPlatformAffiliatePath(filename);
  }

  static getUserAvatarPath(
    userId: string | null | undefined,
    filename: string,
  ): string {
    return this.getPlatformUserPath(userId || 'admin', filename);
  }
}
