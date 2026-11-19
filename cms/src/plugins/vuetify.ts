import { type ThemeDefinition, createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { icons } from "./mdi-icon";

/**
 * PrimeVue 4 & Diamond Theme Palette (Noir / Dark-First Minimalist Modern)
 * Ref: https://primevue.dev/ | https://diamond.primevue.org/
 */
export const PrimaryColor = "#18181B"; // Zinc 900 / Noir Black
export const PrimaryDarkColor = "#09090B"; // Zinc 950
export const PrimaryLightColor = "#F4F4F5"; // Zinc 100
export const PrimaryLightColorForDark = "#27272A"; // Zinc 800

const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: PrimaryColor,
    "on-primary": "#FFFFFF",
    secondary: "#71717A", // Zinc 500
    "on-secondary": "#FFFFFF",
    info: "#0284C7", // Sky 600
    success: "#16A34A", // Green 600
    warning: "#D97706", // Amber 600
    error: "#DC2626", // Red 600
    lightprimary: PrimaryLightColor,
    lightsecondary: "#FAFAFA",
    lightsuccess: "#F0FDF4",
    lightinfo: "#F0F9FF",
    lighterror: "#FEF2F2",
    lightwarning: "#FFFBEB",
    darkText: "#09090B", // Zinc 950
    lightText: "#71717A", // Zinc 500
    lightIcon: "#18181B",
    darkprimary: PrimaryDarkColor,
    darksecondary: "#3F3F46",
    darkinfo: "#0369A1",
    darksuccess: "#15803D",
    darkwarning: "#B45309",
    darkerror: "#B91C1C",
    borderLight: "#E4E4E7", // Zinc 200
    inputBorder: "#E4E4E7", // Zinc 200
    containerBg: "#FAFAFA", // Zinc 50
    containerMainBg: "#F4F4F5", // Zinc 100
    surface: "#FFFFFF",
    "on-surface": "#09090B",
    background: "#FFFFFF",
    "on-background": "#09090B",
    "on-surface-variant": "#FFFFFF",
    "surface-light": "#F4F4F5",
    facebook: "#1877F2",
    twitter: "#1DA1F2",
    linkedin: "#0A66C2",
    gray100: "#F4F4F5",
    primary200: "#E4E4E7",
    secondary200: "#E4E4E7",
    warning200: "#FDE68A",
    purple: "#7C3AED",
    progressWarning: "#D97706",
    progressSuccess: "#16A34A",
    darkblue: "#09090B",
    borderError: "#DC2626",
    borderCard: "#E4E4E7",
    lightpurple: "#F5F3FF",
  },
  variables: {
    "border-color": "#E4E4E7",
    "carousel-control-size": 10,
    gradient:
      "linear-gradient(135deg, rgb(var(--v-theme-darkprimary)), rgb(var(--v-theme-primary)))",
    "card-shadow":
      "0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px -1px rgba(0, 0, 0, 0.07)",
    "sidebar-shadow": "0px 4px 20px rgba(9, 9, 11, 0.04)",
    "shadow-key-umbra-color": "#09090B0A",
    "high-opacity": 1,
    "medium-opacity": 0.85,
    "half-opacity": 0.5,
    "shadow-opacity": 0.05,
  },
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#FAFAFA", // White / Zinc 50 in Dark Mode (PrimeVue 4 Noir)
    "on-primary": "#09090B", // Black text on white primary button
    secondary: "#A1A1AA", // Zinc 400
    "on-secondary": "#09090B",
    info: "#38BDF8", // Sky 400
    success: "#4ADE80", // Green 400
    warning: "#FBBF24", // Amber 400
    error: "#F87171", // Red 400
    lightprimary: PrimaryLightColorForDark,
    lightsecondary: "#18181B", // Zinc 900
    lightsuccess: "#052E16",
    lightinfo: "#082F49",
    lighterror: "#450A0A",
    lightwarning: "#451A03",
    darkprimary: "#FFFFFF",
    darksecondary: "#71717A",
    darkinfo: "#0284C7",
    darksuccess: "#16A34A",
    darkwarning: "#D97706",
    darkerror: "#DC2626",
    darkText: "#FAFAFA", // Zinc 50
    lightText: "#A1A1AA", // Zinc 400
    lightIcon: "#FAFAFA",
    borderLight: "#27272A", // Zinc 800
    inputBorder: "#27272A", // Zinc 800
    containerBg: "#09090B", // Zinc 950
    containerMainBg: "#121215",
    surface: "#18181B", // Zinc 900
    "on-surface": "#FAFAFA",
    background: "#09090B", // Zinc 950
    "on-background": "#FAFAFA",
    "on-surface-variant": "#18181B",
    "surface-light": "#27272A",
    facebook: "#1877F2",
    twitter: "#1DA1F2",
    linkedin: "#0A66C2",
    gray100: "#18181B",
    primary200: "#71717A",
    secondary200: "#27272A",
    warning200: "#FBBF24",
    purple: "#A78BFA",
    progressWarning: "#FBBF24",
    progressSuccess: "#4ADE80",
    darkblue: "#0284C7",
    borderError: "#F87171",
    borderCard: "#27272A",
    lightpurple: "#2E1065",
  },
  variables: {
    "border-color": "#27272A",
    gradient:
      "linear-gradient(135deg, rgb(var(--v-theme-darkprimary)), rgb(var(--v-theme-primary)))",
    "card-shadow":
      "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)",
    "sidebar-shadow": "0px 4px 20px rgba(0, 0, 0, 0.4)",
    "high-opacity": 1,
    "medium-opacity": 0.85,
    "half-opacity": 0.5,
    "shadow-opacity": 0.4,
  },
};

export default createVuetify({
  components: {
    ...components,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      ...icons,
    },
    sets: { mdi },
  },
  theme: {
    defaultTheme: "light",
    themes: { light, dark },
  },
  defaults: {
    VBtn: {
      rounded: "md",
    },
    VCard: {
      rounded: "lg",
    },
    VTextField: {
      rounded: "md",
      variant: "outlined",
      density: "comfortable",
      color: "primary",
    },
    VSelect: {
      rounded: "md",
      variant: "outlined",
      density: "comfortable",
      color: "primary",
    },
    VAutocomplete: {
      rounded: "md",
      variant: "outlined",
      density: "comfortable",
      color: "primary",
    },
    VTooltip: {
      location: "top",
    },
  },
});
