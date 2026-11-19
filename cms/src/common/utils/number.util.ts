import type { OptionType } from "@/types/common.type";

/**
 * Format number with dot separators (e.g. 1.000.000)
 */
export const toCommas = (value: number): string | number => {
  if (isNaN(value)) return value;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Find name in an options list by id (Strict comparison ===)
 */
export const optionsReturnTitle = (
  options?: OptionType[] | null,
  id?: number | string | null,
): string => {
  if (!options || id === undefined || id === null) return "";
  const findData = options.find((ele: OptionType) => ele.id === Number(id));
  return findData ? findData.name : "";
};

/**
 * Format number with localized decimal and thousand separators
 */
export const formatNumber = (value: number | string, decimals = 2): string => {
  const num = Number(value);
  if (isNaN(num)) return "";

  const fixed = num.toFixed(decimals).replace(/\.?0+$/, "");
  const [integerPart = "0", decimalPart] = fixed.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
};
