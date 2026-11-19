/**
 * Storage Utility for type-safe browser localStorage access
 * Handles JSON parsing/serialization safely and avoids runtime exceptions
 */

/**
 * Get an item from localStorage and automatically parse JSON
 * @template T Type of the expected returned value
 * @param key Storage key
 * @param fallback Fallback value if key is not found or parsing fails
 */
export function getStorageItem<T>(key: string, fallback: T | null = null): T | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) {
      return fallback;
    }

    try {
      return JSON.parse(raw) as T;
    } catch {
      // Return raw string if it's not valid JSON
      return raw as unknown as T;
    }
  } catch (error) {
    console.error(`[Storage] Failed to get item "${key}":`, error);
    return fallback;
  }
}

/**
 * Save an item to localStorage with automatic JSON serialization
 * @template T Type of the value
 * @param key Storage key
 * @param value Value to store
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
      return;
    }

    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`[Storage] Failed to set item "${key}":`, error);
  }
}

/**
 * Remove an item from localStorage
 * @param key Storage key
 */
export function removeStorageItem(key: string): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Failed to remove item "${key}":`, error);
  }
}

/**
 * Clear all localStorage items
 */
export function clearStorage(): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.clear();
  } catch (error) {
    console.error("[Storage] Failed to clear storage:", error);
  }
}
