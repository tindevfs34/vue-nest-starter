// -- Types, Constants & Enums --
import type { Editor } from "@tiptap/vue-3";

export interface EditorProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  maxHeight?: string;
}

export interface LinkDialogPayload {
  url: string;
  openInNewTab: boolean;
  isNoFollow: boolean;
}

export interface YoutubeDialogPayload {
  url: string;
  width?: number;
  height?: number;
}

export interface TableDialogPayload {
  rows: number;
  cols: number;
  withHeaderRow: boolean;
}

export interface ColorOption {
  label: string;
  value: string;
}

export interface HeadingOption {
  title: string;
  level: number;
  tag: string;
}

export type EditorInstance = Editor;
