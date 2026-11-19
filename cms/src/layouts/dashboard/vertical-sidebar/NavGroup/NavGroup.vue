<template>
  <div class="nav-group-header px-3 mt-4 mb-2 text-uppercase">
    {{ item.header }}
  </div>
</template>

<script setup lang="ts">
// -- Types, Constants & Enums --
import type { SidebarMenuItemType } from "../sidebarItem";

interface Props {
  item: SidebarMenuItemType;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.nav-group-header {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #64748b;
  user-select: none;
}
</style>
