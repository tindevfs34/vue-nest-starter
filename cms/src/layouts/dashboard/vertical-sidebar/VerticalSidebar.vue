<template>
  <v-navigation-drawer
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="72"
    mobile-breakpoint="lg"
    width="250"
    app
    class="diamond-sidebar"
    :rail="isRailMode"
    :expand-on-hover="isRailMode"
  >
    <!-- Brand / Logo Header -->
    <div class="logo-container d-flex align-center px-3 py-2 flex-shrink-0">
      <div class="d-flex align-center ga-3 w-100 overflow-hidden">
        <div v-if="!isRailMode" class="d-flex flex-column w-100">
          <div class="brand-logo-wrap d-flex align-center justify-center">
            <img
              :src="brandLogo"
              alt="Săn Giá Tốt"
              class="brand-logo"
            />
          </div>
          <span
            v-if="currentUser?.companyName"
            class="brand-subtitle text-caption font-weight-medium text-uppercase text-truncate mt-1"
          >
            {{ currentUser?.companyName }}
          </span>
        </div>
      </div>
    </div>

    <!-- Navigation Menu (Scrollable Area) -->
    <div class="sidebar-scrollable custom-scrollbar">
      <v-list
        class="px-3 py-1 ga-1 bg-transparent"
        aria-label="sidebar navigation menu"
      >
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!-- Sub Header -->
          <NavGroup
            v-if="item.header"
            v-show="!isRailMode"
            :item="item"
            :key="`header-${i}`"
          />

          <!-- Divider -->
          <v-divider
            v-else-if="item.divider"
            class="my-2 border-slate"
            :key="`divider-${i}`"
          />

          <!-- Collapse Item -->
          <NavCollapse
            v-else-if="item.children"
            :item="item"
            :level="0"
            :key="`collapse-${i}`"
          />

          <!-- Single Item -->
          <NavItem v-else :item="item" :level="0" :key="`item-${i}`" />
        </template>
      </v-list>
    </div>

    <!-- Footer Pinned at Bottom -->
    <template #append>
      <div class="sidebar-footer pa-3">
        <!-- Expanded Mode: User Profile Card + Quick Logout -->
        <div
          v-if="!isRailMode"
          class="user-card d-flex align-center justify-space-between pa-2"
        >
          <div class="d-flex align-center ga-2 min-w-0 flex-grow-1 overflow-hidden">
            <div
              class="avatar-icon-wrap d-flex align-center justify-center flex-shrink-0"
            >
              <UserIcon size="18" class="text-slate" />
            </div>
            <div class="user-info-text d-flex flex-column min-w-0 flex-grow-1 overflow-hidden">
              <span
                class="user-name text-truncate text-white font-weight-semibold"
                :title="currentUser?.fullName || 'Admin User'"
              >
                {{ currentUser?.fullName || "Admin User" }}
              </span>
              <span
                class="user-role text-truncate"
                :title="
                  currentUser?.role?.name ||
                  (authStore.isSuperAdmin ? 'Super Admin' : 'Administrator')
                "
              >
                {{
                  currentUser?.role?.name ||
                  (authStore.isSuperAdmin ? "Super Admin" : "Administrator")
                }}
              </span>
            </div>
          </div>

          <v-btn
            icon
            size="small"
            variant="text"
            
            class="logout-icon-btn flex-shrink-0 ms-2"
            title="Đăng xuất"
            aria-label="Logout"
            @click="authStore.logout()"
          >
            <LogoutIcon size="17" stroke-width="2" />
          </v-btn>
        </div>

        <!-- Rail / Mini Mode: Centered Logout Icon -->
        <div v-else class="d-flex justify-center py-1">
          <v-btn
            icon
            size="small"
            variant="text"
            
            class="logout-icon-btn"
            title="Đăng xuất"
            aria-label="Logout"
            @click="authStore.logout()"
          >
            <LogoutIcon size="18" stroke-width="2" />
          </v-btn>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
// -- Core Framework --
import { computed, onMounted } from "vue";
import { useDisplay } from "vuetify";

// -- Third-party Libraries --
import { LogoutIcon, UserIcon } from "vue-tabler-icons";

// -- Internal Components --
import NavCollapse from "./NavCollapse/NavCollapse.vue";
import NavGroup from "./NavGroup/NavGroup.vue";
import NavItem from "./NavItem/NavItem.vue";

// -- Composables & Stores --
import { useAuthStore } from "@/stores/auth.store.ts";
import { useCustomizerStore } from "@/stores/customizer.store.ts";
import { useUserStore } from "@/stores/user.store.ts";

// -- Constants & Enums --
import sidebarItems from "./sidebarItem";

// -- Assets --
import brandLogo from "@/assets/images/logo.png";

// -- Types --
import type { SidebarMenuItemType } from "./sidebarItem";

const customizer = useCustomizerStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const { mobile } = useDisplay();

const currentUser = computed(() => userStore.user || authStore.user);

onMounted(() => {
  if (authStore.isAuthenticated && !userStore.user) {
    userStore.getUserInfo();
  }
});

const isRailMode = computed(() => !mobile.value && customizer.mini_sidebar);

const hasAccess = (item: SidebarMenuItemType): boolean => {
  if (item.superAdminOnly) return authStore.isSuperAdmin;
  if (item.adminOnly) return authStore.isSystemAdmin;
  return true;
};

const sidebarMenu = computed(() => {
  return sidebarItems
    .filter(hasAccess)
    .map((item) => {
      if (!item.children) return item;
      return {
        ...item,
        children: item.children.filter(hasAccess),
      };
    })
    .filter((item) => !item.children || item.children.length > 0);
});
</script>

<style scoped lang="scss">
.diamond-sidebar {
  background-color: #080c14 !important;
  border-right: 1px solid rgba(255, 255, 255, 0.06) !important;
  display: flex !important;
  flex-direction: column !important;
  height: 100vh !important;

  &.v-navigation-drawer--rail :deep(.nav-group-header) {
    display: none !important;
  }
}

.diamond-sidebar :deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.diamond-sidebar :deep(.v-navigation-drawer__append) {
  margin-top: auto;
  flex-shrink: 0;
}

.logo-container {
  min-height: 68px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-logo-wrap {
  border-radius: 10px;
  padding: 4px 8px;
  width: 100%;
}

.brand-logo {
  display: block;
  max-width: 100%;
  height: 48px;
  width: auto;
  object-fit: contain;
}

.brand-subtitle {
  font-size: 0.65rem;
  letter-spacing: 1px;
  color: #f43f5e !important;
}

.sidebar-scrollable {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 8px;
}

/* Hide scrollbar */
.custom-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.custom-scrollbar::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.border-slate {
  border-color: rgba(255, 255, 255, 0.06) !important;
}

/* Pinned Bottom Footer */
.sidebar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background-color: #080c14;
}

.user-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  transition: all 0.2s ease;
  overflow: hidden;
  max-width: 100%;
}

.user-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}

.avatar-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
}

.user-info-text {
  min-width: 0;
  overflow: hidden;
}

.user-name {
  font-size: 12.5px;
  line-height: 1.3;
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-role {
  font-size: 10.5px;
  color: #64748b;
  line-height: 1.3;
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-slate {
  color: #94a3b8 !important;
}

.logout-icon-btn {
  color: #94a3b8;
  transition: all 0.2s ease;
}

.logout-icon-btn:hover {
  color: #ef4444 !important;
  background-color: rgba(239, 68, 68, 0.12) !important;
}
</style>
