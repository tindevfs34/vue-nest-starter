import { watch } from 'vue';
import { useTheme } from 'vuetify';
import { useCustomizerStore } from '@/stores/customizer.store';
import { ThemeMode } from '@/common/enums/theme-mode.enum';

export function useThemeHandler() {
  const theme = useTheme();
  const customizerStore = useCustomizerStore();

  watch(
    () => [customizerStore.actTheme, customizerStore.systemPreference],
    ([actTheme, systemPref]) => {
      let target = 'light';

      switch (actTheme) {
        case ThemeMode.Dark:
          target = 'dark';
          break;

        case ThemeMode.Light:
          target = 'light';
          break;

        case ThemeMode.System:
          target = systemPref ? 'dark' : 'light';
          break;
      }

      theme.change(target);
    },
    { immediate: true }
  );

  return { theme };
}
