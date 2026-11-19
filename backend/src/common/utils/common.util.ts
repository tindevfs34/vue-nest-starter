export function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
