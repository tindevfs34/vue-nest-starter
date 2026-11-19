import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";
import { type ThemeDefinition } from "vuetify";
/**
 * Custom MDI icon aliases for vuetify-nuxt-module SVG icon set.
 * vuetify-nuxt-module auto-imports these from @mdi/js using their export names.
 */
const customIcons: Record<string, string> = {
  checkboxMarkedCircleOutline: "mdiCheckboxMarkedCircleOutline",
  circleOutline: "mdiCircleOutline",
  closeCircle: "mdiCloseCircle",
  chevronUp: "mdiChevronUp",
  chevronRight: "mdiChevronRight",
  chevronLeft: "mdiChevronLeft",
  chevronDown: "mdiChevronDown",
  heart: "mdiHeart",
  heartOutline: "mdiHeartOutline",
  heartHalf: "mdiHeartHalf",
  magnify: "mdiMagnify",
  plus: "mdiPlus",
  basketball: "mdiBasketball",
  languagehtml5: "mdiLanguageHtml5",
  nodejs: "mdiNodejs",
  codejson: "mdiCodeJson",
  languagemarkdown: "mdiLanguageMarkdown",
  filepdf: "mdiFilePdfBox",
  fileimage: "mdiFileImage",
  filedocumentoutline: "mdiFileDocumentOutline",
  filexcel: "mdiFileExcel",
  folder: "mdiFolder",
  folderopen: "mdiFolderOpen",
  closecircleoutline: "mdiCloseCircleOutline",
  foldernetwork: "mdiFolderNetwork",
  homevariant: "mdiHomeVariant",
  videoOutline: "mdiVideoOutline",
  fileoutline: "mdiFileOutline",
  snowflake: "mdiSnowflake",
  leaf: "mdiLeaf",
  fire: "mdiFire",
  water: "mdiWater",
  refresh: "mdiRefresh",
  cloudUpload: "mdiCloudUpload",
  paperClip: "mdiPaperclip",
  bookmarkOutline: "mdiBookmarkOutline",
  contentSave: "mdiContentSave",
  bookmark: "mdiBookmark",
  bookmarkMinus: "mdiBookmarkMinus",
  glassMug: "mdiGlassMug",
  glassMugVariant: "mdiGlassMugVariant",
  beer: "mdiBeer",
  liquor: "mdiLiquor",
  close: "mdiClose",
  menu: "mdiMenu",
  login: "mdiLogin",
  storefront: "mdiStorefrontOutline",
  account: "mdiAccountOutline",
  tag: "mdiTagOutline",
  shopping: "mdiShoppingOutline",
  arrowRight: "mdiArrowRight",
};

/**
 * PrimeVue 4 & Diamond Theme Palette (Noir / Dark-First Minimalist Modern)
 * Ref: https://primevue.dev/ | https://diamond.primevue.org/
 */
export const PrimaryColor = "#2563EB"; // Brand Primary Red
export const PrimaryDarkColor = "#09090B"; // Zinc 950
export const PrimaryLightColor = "#F4F4F5"; // Zinc 100
export const PrimaryLightColorForDark = "#27272A"; // Zinc 800

const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: PrimaryColor,
    cta: "#F97316",
    "on-cta": "#FFFFFF",
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
    cta: "#F97316",
    "on-cta": "#FFFFFF",
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

/**
 * Vuetify configuration for vuetify-nuxt-module.
 * This file is auto-detected by the module when placed at the project root.
 *
 * @see https://vuetify-nuxt-module.pages.dev/guide/vuetify-configuration.html
 */
export default defineVuetifyConfiguration({
  icons: {
    defaultSet: "mdi-svg",
    svg: {
      mdi: {
        aliases: customIcons,
      },
    },
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
