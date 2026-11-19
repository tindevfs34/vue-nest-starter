<template>
  <v-list-item
    v-bind="propsForLink"
    
    class="sidebar-nav-item mb-1"
    :class="[level > 0 ? 'sub-item' : 'parent-item px-3 py-2']"
    :disabled="item.disabled"
  >
    <template v-if="level === 0 || item.icon" #prepend>
      <component
        :is="item.icon"
        v-if="item.icon"
        :size="level > 0 ? 16 : 18"
        stroke-width="1.8"
        class="me-3 nav-icon"
      />
    </template>

    <v-list-item-title class="nav-title">
      {{ item.title ?? "" }}
    </v-list-item-title>

    <template v-if="item.chip" #append>
      <v-chip
        :color="item.chipColor || 'primary'"
        size="x-small"
        class="font-weight-semibold"
        variant="tonal"
      >
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
// -- Core Framework --
import { computed } from "vue";

// -- Types, Constants & Enums --
import type { SidebarMenuItemType } from "../sidebarItem";

interface Props {
  item: SidebarMenuItemType;
  level?: number;
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
});

const propsForLink = computed(() => {
  if (props.item.type === "external") {
    return {
      href: props.item.to,
      target: "_blank",
    };
  }

  return {
    to: props.item.to,
  };
});
</script>

<style scoped lang="scss">
.sidebar-nav-item {
  color: #94a3b8 !important;
  font-size: 13.5px;
  font-weight: 500;
  border-radius: 8px !important;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.parent-item {
  min-height: 40px;
}

.sub-item {
  min-height: 36px;
  padding-left: 42px !important;
  padding-right: 12px !important;
  margin-top: 1px;
}

.sidebar-nav-item .nav-icon {
  color: #94a3b8;
  transition: color 0.15s ease;
}

.sidebar-nav-item .nav-title {
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.sub-item .nav-title {
  font-size: 13px;
  font-weight: 500;
}

.sidebar-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.06) !important;
  color: #f8fafc !important;
}

.sidebar-nav-item:hover .nav-icon {
  color: #f8fafc;
}

/* Vuetify active / router-link active */
:deep(.v-list-item--active),
.sidebar-nav-item.v-list-item--active,
.sidebar-nav-item.router-link-active {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}

:deep(.v-list-item--active) .nav-icon,
.sidebar-nav-item.v-list-item--active .nav-icon {
  color: #ffffff !important;
}
</style>
