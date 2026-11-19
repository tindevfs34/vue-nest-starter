/**
 * Prefix single-digit number with leading zero
 */
export const convertTimePrefix = (timer: number): string | number => {
  return timer > 9 ? timer : `0${timer}`;
};

/**
 * Format date string to DD/MM/YYYY
 */
export const convertDisplayDate = (date?: string | Date | null): string => {
  if (!date) return "";
  try {
    const newdate = typeof date === "string" ? new Date(date) : date;
    const year = newdate.getFullYear();
    let month = (1 + newdate.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = newdate.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return `${day}/${month}/${year}`;
  } catch {
    return String(date);
  }
};

/**
 * Format date string to HH:mm
 */
export const convertDisplayTime = (date?: string | Date | null): string => {
  if (!date) return "";
  try {
    const newdate = typeof date === "string" ? new Date(date) : date;
    const hours = newdate.getHours();
    const minutes = newdate.getMinutes();
    return `${convertTimePrefix(hours)}:${convertTimePrefix(minutes)}`;
  } catch {
    return "";
  }
};

/**
 * Format media date string with full Vietnamese date & time
 */
export const formatMediaDate = (dateStr?: string | Date | null): string => {
  if (!dateStr) return "";
  try {
    const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    return d.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
    });
  } catch {
    return String(dateStr);
  }
};

/**
 * Format date string with explicit Vietnam timezone (UTC+7, Asia/Ho_Chi_Minh)
 * Output: "HH:mm DD/MM/YYYY" (e.g. "15:35 03/09/2026")
 */
export const formatVietnamDateTime = (dateStr?: string | Date | null): string => {
  if (!dateStr) return "—";
  try {
    let d: Date;
    if (dateStr instanceof Date) {
      d = dateStr;
    } else {
      let str = String(dateStr).trim();
      if (!str.endsWith("Z") && !str.includes("+")) {
        str = str.replace(" ", "T") + "Z";
      }
      d = new Date(str);
    }
    if (Number.isNaN(d.getTime())) return String(dateStr);

    const formatter = new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const parts = formatter.formatToParts(d);
    const getPart = (type: string) =>
      parts.find((p) => p.type === type)?.value || "";
    const hour = getPart("hour");
    const minute = getPart("minute");
    const day = getPart("day");
    const month = getPart("month");
    const year = getPart("year");

    return `${hour}:${minute} ${day}/${month}/${year}`;
  } catch {
    return String(dateStr);
  }
};

/**
 * Format date to DD/MM/YYYY with explicit Vietnam timezone
 */
export const formatVietnamDate = (dateStr?: string | Date | null): string => {
  if (!dateStr) return "—";
  try {
    let d: Date;
    if (dateStr instanceof Date) {
      d = dateStr;
    } else {
      let str = String(dateStr).trim();
      if (!str.endsWith("Z") && !str.includes("+")) {
        str = str.replace(" ", "T") + "Z";
      }
      d = new Date(str);
    }
    if (Number.isNaN(d.getTime())) return String(dateStr);

    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
  } catch {
    return String(dateStr);
  }
};
