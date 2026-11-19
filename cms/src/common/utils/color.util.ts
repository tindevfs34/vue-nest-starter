/**
 * Convert Hex color string to rgb format (r,g,b)
 */
export const hexToRgb = (hex: string): string | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(
    shorthandRegex,
    (_m: string, r: string, g: string, b: string) => {
      return r + r + g + g + b + b;
    },
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  const [, r, g, b] = result;
  return `${parseInt(r!, 16)},${parseInt(g!, 16)},${parseInt(b!, 16)}`;
};

// Backward compatibility alias
export const HexToRgb = hexToRgb;
