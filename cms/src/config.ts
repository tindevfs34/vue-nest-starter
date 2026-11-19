import { ThemeMode } from "@/common/enums/theme-mode.enum";

export type ConfigProps = {
  Sidebar_drawer: boolean;
  Customizer_drawer: boolean;
  mini_sidebar: boolean;
  setHorizontalLayout: boolean;
  actTheme: ThemeMode;
  fontTheme: string;
  inputBg: boolean;
  themeContrast: boolean;
  boxed: boolean;
  isRtl: boolean;
  presetColor: string;
};

const config: ConfigProps = {
  Sidebar_drawer: true,
  Customizer_drawer: false,
  mini_sidebar: false,
  setHorizontalLayout: false, // Horizontal layout
  actTheme: ThemeMode.Light,
  fontTheme: "Inter-var",
  inputBg: false,
  themeContrast: false,
  boxed: false,
  isRtl: false,
  presetColor: "default",
};

export default config;
