<template>
  <v-app
    :style="getStyleObject()"
    :theme="customizer.actTheme"
    :class="[
      customizer.actTheme,
      customizer.fontTheme,
      customizer.mini_sidebar ? 'mini-sidebar' : '',
      customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
      customizer.inputBg ? 'inputWithbg' : '',
      customizer.themeContrast ? 'contrast' : '',
    ]"
  >
    <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
    <VerticalHeaderVue v-if="!customizer.setHorizontalLayout" />
    <v-main class="page-wrapper">
      <v-container fluid>
        <div :class="customizer.boxed ? 'maxWidth' : ''">
          <LoaderWrapper />
          <RouterView />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// -- Core Framework --
import { computed, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useTheme } from "vuetify";

// -- Internal Layouts & Components --
import LoaderWrapper from "@/layouts/dashboard/LoaderWrapper.vue";
import VerticalHeaderVue from "@/layouts/dashboard/vertical-header/VerticalHeader.vue";
import VerticalSidebarVue from "@/layouts/dashboard/vertical-sidebar/VerticalSidebar.vue";

// -- Composables & Stores --
import { useAuthStore } from "@/stores/auth.store";
import { useCustomizerStore } from "@/stores/customizer.store";
import { useUserStore } from "@/stores/user.store";

// -- Utils & Helpers --
import { HexToRgb } from "@/common/utils";

const customizer = useCustomizerStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const theme = useTheme();

onMounted(() => {
  if (authStore.isAuthenticated) {
    userStore.getUserInfo();
  }
});

const dynamicStyle = computed(() => ({
  "--v-theme-primary": HexToRgb(theme.current.value.colors.primary!),
  "--v-theme-darkprimary": HexToRgb(theme.current.value.colors.darkprimary!),
  "--v-theme-lightprimary": HexToRgb(theme.current.value.colors.lightprimary!),
}));

const getStyleObject = () => {
  const condition = true;
  return condition ? dynamicStyle.value : {};
};
</script>
