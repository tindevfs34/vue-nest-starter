import { computed, onMounted, ref } from "vue";
import { useCustomizerStore } from "@/stores/customizer.store";
import { ThemeMode } from "@/common/enums/theme-mode.enum";

export const useApexChartTheme = () => {
  const customizer = useCustomizerStore();
  const prefersDark = ref(false);

  // Safe for browser environment
  onMounted(() => {
    if (window.matchMedia) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      prefersDark.value = media.matches;

      media.addEventListener("change", (e) => {
        prefersDark.value = e.matches;
      });
    }
  });

  const isDark = computed(() => {
    if (customizer.actTheme === ThemeMode.System) {
      return prefersDark.value;
    }
    return customizer.actTheme === ThemeMode.Dark;
  });

  const getThemeMode = () => ({
    theme: {
      mode: (isDark.value ? "dark" : "light") as "dark" | "light",
    },
  });

  return {
    isDark,
    getThemeMode,
  };
};
