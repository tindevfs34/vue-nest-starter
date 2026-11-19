<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer.store';
import { ThemeMode } from '@/common/enums/theme-mode.enum';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const customizer = useCustomizerStore();

const themeItems = [
  {
    label: 'Light',
    value: ThemeMode.Light,
    icon: 'custom-sun-1'
  },
  {
    label: 'Dark',
    value: ThemeMode.Dark,
    icon: 'custom-moon-fill'
  },
  {
    label: 'Default',
    value: ThemeMode.System,
    icon: 'custom-setting-fill'
  }
];

const setTheme = (theme: ThemeMode) => {
  customizer.SET_THEME(theme);
};
</script>

<template>
  <v-list class="px-2" aria-label="theme mode list">
    <v-list-item
      v-for="item in themeItems"
      :key="item.value"
      color="primary"
      variant="tonal"
      rounded="md"
      :active="customizer.actTheme === item.value"
      class="mb-2"
      @click="setTheme(item.value)"
    >
      <template v-slot:prepend>
        <SvgSprite :name="item.icon" style="width: 18px; height: 18px" class="mr-3" />
      </template>

      <v-list-item-title class="text-h6">{{ item.label }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
