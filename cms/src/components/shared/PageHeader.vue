<template>
  <div
    v-if="!noWrapper"
    class="page-header d-flex flex-wrap align-center justify-space-between mb-5 ga-3"
  >
    <!-- Left Section with optional Back button -->
    <div class="d-flex align-center ga-2">
      <v-btn
        v-if="showBack"
        icon
        variant="text"
        rounded="md"
        :aria-label="backAriaLabel || 'Quay lại'"
        class="flex-shrink-0"
        @click="emit('back')"
      >
        <ArrowLeftIcon size="20" />
      </v-btn>

      <!-- Title Block (Exact layout matching product/ListPage.vue) -->
      <div class="page-header-title">
        <h2
          class="text-h6 font-weight-bold text-darkText mb-1 d-flex align-center ga-2"
          :data-testid="titleTestId"
        >
          <component
            :is="icon"
            v-if="icon"
            :size="iconSize"
            :class="iconColor"
            class="flex-shrink-0"
          />
          <slot v-else name="icon" />
          <span>
            <slot name="title">{{ title }}</slot>
          </span>
        </h2>
        <p
          v-if="subtitle || $slots.subtitle"
          class="text-caption text-lightText mb-0"
          :data-testid="subtitleTestId"
        >
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>
    </div>

    <!-- Right Actions Slot -->
    <div
      v-if="$slots.actions || showRefresh"
      class="page-header-actions d-flex align-center justify-end ga-2 flex-wrap ms-auto"
    >
      <RefreshButton
        v-if="showRefresh"
        :loading="refreshLoading"
        :tooltip="refreshTooltip || 'Làm mới dữ liệu'"
        :text="refreshText"
        :show-text="showRefreshText"
        @refresh="emit('refresh')"
      />
      <slot name="actions" />
    </div>
  </div>

  <!-- Without Wrapper (noWrapper = true) -->
  <div v-else class="d-flex align-center ga-2">
    <v-btn
      v-if="showBack"
      icon
      variant="text"
      rounded="md"
      :aria-label="backAriaLabel || 'Quay lại'"
      class="flex-shrink-0"
      @click="emit('back')"
    >
      <ArrowLeftIcon size="20" />
    </v-btn>

    <div class="page-header-title">
      <h2
        class="text-h6 font-weight-bold text-darkText mb-1 d-flex align-center ga-2"
        :data-testid="titleTestId"
      >
        <component
          :is="icon"
          v-if="icon"
          :size="iconSize"
          :class="iconColor"
          class="flex-shrink-0"
        />
        <slot v-else name="icon" />
        <span>
          <slot name="title">{{ title }}</slot>
        </span>
      </h2>
      <p
        v-if="subtitle || $slots.subtitle"
        class="text-caption text-lightText mb-0"
        :data-testid="subtitleTestId"
      >
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { ArrowLeftIcon } from "vue-tabler-icons";
import RefreshButton from "@/components/shared/RefreshButton.vue";

interface Props {
  title?: string;
  subtitle?: string;
  icon?: Component;
  iconColor?: string;
  iconSize?: number | string;
  noWrapper?: boolean;
  showBack?: boolean;
  backAriaLabel?: string;
  titleTestId?: string;
  subtitleTestId?: string;
  showRefresh?: boolean;
  refreshLoading?: boolean;
  refreshTooltip?: string;
  refreshText?: string;
  showRefreshText?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  iconColor: "text-primary",
  iconSize: 24,
  noWrapper: false,
  showBack: false,
  backAriaLabel: "Quay lại",
  titleTestId: undefined,
  subtitleTestId: undefined,
  showRefresh: false,
  refreshLoading: false,
  refreshTooltip: "Làm mới dữ liệu",
  refreshText: "",
  showRefreshText: false,
});

const emit = defineEmits<{
  (e: "back"): void;
  (e: "refresh"): void;
}>();
</script>

<style scoped lang="scss">
.page-header-actions {
  margin-left: auto;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: flex-end !important;
  }
}
</style>
