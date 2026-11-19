<template>
  <v-locale-provider :rtl="customizer.isRtl">
    <RouterView />
  </v-locale-provider>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from "vue";
import { useTheme } from "vuetify";
import { RouterView } from "vue-router";
import { useThemeHandler } from "@/composables/useThemeHandler";
import { useCustomizerStore } from "@/stores/customizer.store";
import {
  PrimaryColor,
  PrimaryDarkColor,
  PrimaryLightColor,
  PrimaryLightColorForDark,
} from "@/plugins/vuetify";
import { DirAttrSet, themeColors } from "@/common/utils";

const customizer = useCustomizerStore();

// Set the initial direction attribute when the component is mounted
onMounted(() => {
  DirAttrSet(customizer.isRtl ? "rtl" : "ltr");
});

// Watch for changes in the isRtl property and update the direction attribute accordingly
watch(
  () => customizer.isRtl,
  (newValue) => {
    DirAttrSet(newValue ? "rtl" : "ltr");
  },
);

// Get the Vuetify theme instance
const vuetifyTheme = useTheme();

const activePreset = computed(() => {
  return (
    themeColors.find((t) => t.label === customizer.presetColor) ??
    themeColors[0]
  );
});

watch(
  activePreset,
  (preset) => {
    const light = vuetifyTheme.themes.value.light;
    const dark = vuetifyTheme.themes.value.dark;

    if (!preset) return;

    const resolvedLight = {
      primary: preset.label === "default" ? PrimaryColor : preset.color,
      darkprimary:
        preset.label === "default" ? PrimaryDarkColor : preset.darkColor,
      lightprimary:
        preset.label === "default" ? PrimaryLightColor : preset.lightcolor,
    };

    const resolvedDark = {
      primary: preset.label === "default" ? PrimaryColor : preset.color,
      darkprimary:
        preset.label === "default" ? PrimaryDarkColor : preset.darkColor,
      lightprimary:
        preset.label === "default"
          ? PrimaryLightColorForDark
          : preset.lightcolorfordark,
    };

    if (light?.colors) {
      light.colors.primary = resolvedLight.primary;
      light.colors.darkprimary = resolvedLight.darkprimary;
      light.colors.lightprimary = resolvedLight.lightprimary;
    }

    if (dark?.colors) {
      dark.colors.primary = resolvedDark.primary;
      dark.colors.darkprimary = resolvedDark.darkprimary;
      dark.colors.lightprimary = resolvedDark.lightprimary;
    }
  },
  { immediate: true },
);

// Initialize theme handling
useThemeHandler();
</script>
