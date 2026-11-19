<template>
  <v-list-group :value="item.title" class="sidebar-nav-group">
    <template #activator="{ props, isOpen }">
      <v-list-item
        v-bind="props"
        
        class="sidebar-nav-item mb-1 px-3 py-2"
      >
        <template #prepend>
          <component
            :is="item.icon"
            v-if="item.icon"
            size="18"
            stroke-width="1.8"
            class="me-3 nav-icon"
          />
        </template>

        <v-list-item-title class="nav-title">
          {{ item.title }}
        </v-list-item-title>

        <template #append>
          <ChevronDownIcon
            size="15"
            stroke-width="2"
            class="chevron-icon"
            :class="{ 'rotate-180': isOpen }"
          />
        </template>
      </v-list-item>
    </template>

    <div class="nested-items">
      <template v-for="(subitem, i) in item.children" :key="i">
        <NavCollapse
          v-if="subitem.children"
          :item="subitem"
          :level="level + 1"
        />
        <NavItem
          v-else
          :item="subitem"
          :level="level + 1"
        />
      </template>
    </div>
  </v-list-group>
</template>

<script setup lang="ts">
// -- Third-party Libraries --
import { ChevronDownIcon } from "vue-tabler-icons";

// -- Internal Components --
import NavItem from "../NavItem/NavItem.vue";

// -- Types, Constants & Enums --
import type { SidebarMenuItemType } from "../sidebarItem";

interface Props {
  item: SidebarMenuItemType;
  level?: number;
}

withDefaults(defineProps<Props>(), {
  level: 0,
});
</script>

<style scoped lang="scss">
.sidebar-nav-item {
  color: #94a3b8 !important;
  font-size: 13.5px;
  font-weight: 500;
  min-height: 40px;
  border-radius: 8px !important;
  transition: background-color 0.15s ease, color 0.15s ease;
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

.sidebar-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.06) !important;
  color: #f8fafc !important;
}

.sidebar-nav-item:hover .nav-icon {
  color: #f8fafc;
}

.chevron-icon {
  color: #64748b;
  transition: transform 0.2s ease, color 0.15s ease;
}

.sidebar-nav-item:hover .chevron-icon {
  color: #f8fafc;
}

.rotate-180 {
  transform: rotate(180deg);
}

.nested-items {
  margin-top: 1px;
  margin-bottom: 2px;
}
</style>
