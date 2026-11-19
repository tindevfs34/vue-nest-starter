// ===============================|| Blank Layout ||=============================== //
<template>
  <v-app
    :style="getStyleObject()"
    :theme="customizer.actTheme"
    :class="[
      customizer.actTheme,
      customizer.fontTheme,
      customizer.inputBg ? 'inputWithbg' : '',
      customizer.themeContrast ? 'contrast' : ''
    ]"
  >
    <!-- Loader start -->
    <LoaderWrapper />
    <!-- Loader end -->
    <RouterView />
  </v-app>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { RouterView } from 'vue-router';
import LoaderWrapper from '../dashboard/LoaderWrapper.vue';
import { useCustomizerStore } from '@/stores/customizer.store.ts';
import { HexToRgb } from '@/common/utils/index.ts';
const theme = useTheme();
const customizer = useCustomizerStore();

// Define the computed property to calculate the dynamic style object
const dynamicStyle = computed(() => ({
  '--v-theme-primary': HexToRgb(theme.current.value.colors.primary!),
  '--v-theme-darkprimary': HexToRgb(theme.current.value.colors.darkprimary!),
  '--v-theme-lightprimary': HexToRgb(theme.current.value.colors.lightprimary!)
}));

// Method to conditionally apply the preset class
const getStyleObject = () => {
  // Define your condition here, for example:
  const condition = true; // Replace this with your actual condition

  return condition ? dynamicStyle.value : {};
};
</script>
