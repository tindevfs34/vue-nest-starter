<template>
  <v-app-bar
    elevation="0"
    :priority="priority"
    height="64"
    class="diamond-header px-2 px-sm-4 px-md-6"
  >
    <!-- Left Section: Toggle & Title -->
    <div class="d-flex align-center ga-2 ga-sm-3 min-w-0 flex-shrink-1">
      <!-- Mobile Drawer Toggle Button -->
      <v-btn
        v-if="mobile"
        icon
        variant="text"
        size="small"
        class="toggle-btn"
        aria-label="Open mobile navigation"
        @click.stop="customizer.SET_SIDEBAR_DRAWER()"
      >
        <Menu2Icon size="22" stroke-width="2" />
      </v-btn>

      <!-- Desktop Mini Sidebar Toggle Button -->
      <v-btn
        v-else
        icon
        variant="text"
        size="small"
        class="toggle-btn"
        aria-label="Toggle mini sidebar"
        @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      >
        <ChevronLeftIcon
          size="20"
          stroke-width="2"
          class="toggle-icon transition-transform duration-200"
          :class="{ 'rotate-180': customizer.mini_sidebar }"
        />
      </v-btn>
    </div>

    <v-spacer />
  </v-app-bar>
</template>

<script setup lang="ts">
// -- Core Framework --
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

// -- Third-party Libraries --
import {
  BellIcon,
  ChevronLeftIcon,
  Menu2Icon,
  SearchIcon,
} from "vue-tabler-icons";

// -- Internal Components --

// -- Composables & Stores --
import { useAuthStore } from "@/stores/auth.store";
import { useCustomizerStore } from "@/stores/customizer.store";
import { useUserStore } from "@/stores/user.store";

// -- Constants & Enums --
import sidebarItems from "@/layouts/dashboard/vertical-sidebar/sidebarItem";
import { ROUTER_PATH } from "@/common/constants";
import { checkIsSuperAdmin } from "@/common/utils";

// -- Types --
import type { SidebarMenuItemType } from "@/layouts/dashboard/vertical-sidebar/sidebarItem";

const customizer = useCustomizerStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { mobile } = useDisplay();

const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
watch(priority, (newPriority) => {
  priority.value = newPriority;
});

const goToProfile = () => {
  router.push(ROUTER_PATH.PROFILE_SETTING);
};

const currentUser = computed(() => userStore.user || authStore.user);

const isSuperAdmin = computed(
  () =>
    authStore.isSuperAdmin ||
    Boolean(currentUser.value?.isSuperAdmin) ||
    checkIsSuperAdmin(currentUser.value),
);


const userInitials = computed(() => {
  const name = currentUser.value?.fullName || currentUser.value?.email || "AD";
  return name.slice(0, 2).toUpperCase();
});

/** Flatten all sidebar items into one list */
const allMenuItems = computed(() => {
  const result: {
    title: string;
    subTitle?: string;
    subCaption?: string;
    to: string;
  }[] = [];

  const collect = (items: SidebarMenuItemType[]) => {
    for (const item of items) {
      if (item.to) {
        result.push({
          title: item.title ?? "",
          subTitle: item.subTitle,
          subCaption: item.subCaption,
          to: item.to,
        });
      }
      if (item.children) {
        collect(item.children);
      }
    }
  };

  collect(sidebarItems);
  return result;
});

/** Match current route path against sidebar items */
const currentMenuItem = computed(() =>
  allMenuItems.value.find(
    (m) =>
      route.path === m.to ||
      (m.to !== "/" && route.path.startsWith(`${m.to}/`)),
  ),
);

const pageTitle = computed(
  () => currentMenuItem.value?.subTitle ?? currentMenuItem.value?.title ?? "",
);
</script>

<style scoped lang="scss">
.diamond-header {
  background-color: #ffffff !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

.toggle-btn {
  color: #1e293b !important;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a !important;
  }
}

.rotate-180 {
  transform: rotate(180deg);
}

.header-title {
  font-size: 0.95rem;
  color: #0f172a;
  letter-spacing: -0.01em;
  white-space: nowrap;
  line-height: 1.2;

  @media (min-width: 600px) {
    font-size: 1.05rem;
  }

  @media (min-width: 960px) {
    font-size: 1.15rem;
  }
}

.header-icon-btn {
  color: #1e293b !important;
  transition: all 0.2s ease;
  width: 34px !important;
  height: 34px !important;

  @media (max-width: 600px) {
    width: 32px !important;
    height: 32px !important;
  }

  &:hover {
    background-color: #f1f5f9;
    color: #000000 !important;
  }
}

.notification-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ef4444;
  border: 1.5px solid #ffffff;
}

.user-avatar {
  border: 1.5px solid #cbd5e1;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  font-size: 12px;
}
</style>
