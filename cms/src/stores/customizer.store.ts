import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import config from '@/config';
import { DirAttrSet } from '@/common/utils';
import { ThemeMode } from '@/common/enums/theme-mode.enum';

export const useCustomizerStore = defineStore('customizer', () => {
  const Sidebar_drawer = ref(config.Sidebar_drawer);
  const Customizer_drawer = ref(config.Customizer_drawer);
  const mini_sidebar = ref(config.mini_sidebar);
  const setHorizontalLayout = ref(config.setHorizontalLayout);
  const actTheme = ref(config.actTheme as ThemeMode);
  const systemPreference = ref(false);
  const fontTheme = ref(config.fontTheme);
  const inputBg = ref(config.inputBg);
  const boxed = ref(config.boxed);
  const themeContrast = ref(config.themeContrast);
  const isRtl = ref(config.isRtl);
  const presetColor = ref(config.presetColor);

  const isDarkMode = computed(() => {
    switch (actTheme.value) {
      case ThemeMode.Dark: {
        return true;
      }
      case ThemeMode.System: {
        return systemPreference.value;
      }
      default: {
        return false;
      }
    }
  });

  // Setup system media query listener
  let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemPreference.value = mediaQuery.matches;

    mediaQueryListener = (e: MediaQueryListEvent) => {
      systemPreference.value = e.matches;
    };
    mediaQuery.addEventListener('change', mediaQueryListener);
  }

  function SET_SIDEBAR_DRAWER() {
    Sidebar_drawer.value = !Sidebar_drawer.value;
  }

  function SET_MINI_SIDEBAR(payload: boolean) {
    mini_sidebar.value = payload;
  }

  function SET_THEMECONTRAST(payload: boolean) {
    themeContrast.value = payload;
  }

  function SET_CUSTOMIZER_DRAWER(payload: boolean) {
    Customizer_drawer.value = payload;
  }

  function SET_LAYOUT(payload: boolean) {
    setHorizontalLayout.value = payload;
  }

  function SET_THEME(payload: ThemeMode) {
    actTheme.value = payload;
  }

  function SET_INPUTBG(payload: boolean) {
    inputBg.value = payload;
  }

  function SET_BOXED(payload: boolean) {
    boxed.value = payload;
  }

  function SET_FONT(payload: string) {
    fontTheme.value = payload;
  }

  function SET_DIRECTION(dir: 'ltr' | 'rtl') {
    isRtl.value = dir === 'rtl';
    DirAttrSet(dir);
  }

  function SET_PRESET_COLOR(label: string) {
    presetColor.value = label;
    config.presetColor = label; // keep config in sync
  }

  return {
    Sidebar_drawer,
    Customizer_drawer,
    mini_sidebar,
    setHorizontalLayout,
    themeContrast,
    actTheme,
    systemPreference,
    isDarkMode,
    fontTheme,
    inputBg,
    isRtl,
    boxed,
    presetColor,
    SET_THEME,
    SET_SIDEBAR_DRAWER,
    SET_CUSTOMIZER_DRAWER,
    SET_MINI_SIDEBAR,
    SET_LAYOUT,
    SET_FONT,
    SET_THEMECONTRAST,
    SET_DIRECTION,
    SET_INPUTBG,
    SET_BOXED,
    SET_PRESET_COLOR
  };
});
