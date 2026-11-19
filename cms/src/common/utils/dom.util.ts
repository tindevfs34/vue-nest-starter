/**
 * Set HTML document direction attribute (LTR/RTL)
 */
export const setDirAttr = (dir: "ltr" | "rtl"): void => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("dir", dir);
  }
};

// Backward compatibility alias
export const DirAttrSet = setDirAttr;
