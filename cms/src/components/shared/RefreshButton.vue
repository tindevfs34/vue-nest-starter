<template>
  <v-tooltip :text="tooltip" location="top">
    <template #activator="{ props: tooltipProps }">
      <v-btn
        v-bind="tooltipProps"
        :variant="variant"
        :color="color"
        :rounded="rounded"
        :size="size"
        :density="density"
        :disabled="disabled || loading"
        class="refresh-btn text-none"
        :class="[customClass, { 'refresh-btn--loading': loading }]"
        :data-testid="testId || 'btn-refresh'"
        @click="handleClick"
      >
        <span class="d-inline-flex align-center ga-1">
          <RefreshIcon
            :size="iconSize"
            :class="['refresh-icon', { 'spin-animation': loading }]"
          />
          <span v-if="text || showText">{{ text || 'Làm mới' }}</span>
        </span>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { RefreshIcon } from "vue-tabler-icons";

interface Props {
  loading?: boolean;
  tooltip?: string;
  text?: string;
  showText?: boolean;
  variant?: "outlined" | "text" | "flat" | "tonal" | "elevated" | "plain";
  color?: string;
  size?: string | number;
  density?: "default" | "comfortable" | "compact";
  rounded?: string;
  iconSize?: number | string;
  disabled?: boolean;
  customClass?: string;
  testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  tooltip: "Làm mới dữ liệu",
  text: "",
  showText: false,
  variant: "outlined",
  color: "secondary",
  size: "default",
  density: "default",
  rounded: "md",
  iconSize: 18,
  disabled: false,
  customClass: "",
  testId: "btn-refresh",
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
  (e: "refresh"): void;
}>();

const handleClick = (event: MouseEvent): void => {
  if (props.loading || props.disabled) return;
  emit("click", event);
  emit("refresh");
};
</script>

<style scoped lang="scss">
.refresh-btn {
  transition: all 0.2s ease-in-out;

  &:not(:disabled):hover {
    transform: translateY(-1px);
  }

  .refresh-icon {
    display: inline-block;
    transition: transform 0.3s ease-in-out;
  }

  &--loading {
    opacity: 0.85;
    pointer-events: none;
  }
}

.spin-animation {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
