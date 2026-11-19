// -- Types, Constants & Enums --
import type { ColorOption, HeadingOption } from "@/types/editor.type";

export const EDITOR_DEFAULT_COLORS: readonly ColorOption[] = [
  { label: "Mặc định", value: "inherit" },
  { label: "Đen", value: "#1e293b" },
  { label: "Xám đậm", value: "#475569" },
  { label: "Xám nhạt", value: "#94a3b8" },
  { label: "Xanh dương", value: "#2563eb" },
  { label: "Xanh lá", value: "#16a34a" },
  { label: "Đỏ", value: "#dc2626" },
  { label: "Cam", value: "#ea580c" },
  { label: "Vàng", value: "#ca8a04" },
  { label: "Tím", value: "#9333ea" },
  { label: "Hồng", value: "#db2777" },
  { label: "Xanh mòng két", value: "#0d9488" },
] as const;

export const EDITOR_HIGHLIGHT_COLORS: readonly ColorOption[] = [
  { label: "Không tô sáng", value: "" },
  { label: "Vàng nhạt", value: "#fef08a" },
  { label: "Xanh lá nhạt", value: "#bbf7d0" },
  { label: "Xanh dương nhạt", value: "#bfdbfe" },
  { label: "Cam nhạt", value: "#fed7aa" },
  { label: "Hồng nhạt", value: "#fbcfe8" },
  { label: "Tím nhạt", value: "#e9d5ff" },
] as const;

export const EDITOR_HEADING_OPTIONS: readonly HeadingOption[] = [
  { title: "Đoạn văn (Paragraph)", level: 0, tag: "p" },
  { title: "Tiêu đề 1 (Heading 1)", level: 1, tag: "h1" },
  { title: "Tiêu đề 2 (Heading 2)", level: 2, tag: "h2" },
  { title: "Tiêu đề 3 (Heading 3)", level: 3, tag: "h3" },
  { title: "Tiêu đề 4 (Heading 4)", level: 4, tag: "h4" },
  { title: "Tiêu đề 5 (Heading 5)", level: 5, tag: "h5" },
  { title: "Tiêu đề 6 (Heading 6)", level: 6, tag: "h6" },
] as const;
