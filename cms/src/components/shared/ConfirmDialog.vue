<template>
  <v-dialog
    :model-value="modelValue"
    width="420"
    persistent
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card
      variant="outlined"
      elevation="0"
      class="bg-surface pa-6 text-center"
      data-testid="delete-confirm-dialog"
    >
      <!-- Warning Icon -->
      <div class="d-flex justify-center mb-2">
        <v-avatar size="56">
          <SvgSprite
            name="custom-warning"
            class="text-progressWarning"
            width="38"
            height="38"
          />
        </v-avatar>
      </div>

      <!-- Title -->
      <h3 class="text-h5 font-weight-bold mb-3 text-darkText" data-testid="delete-dialog-title">
        {{ title }}
      </h3>

      <!-- Content / Messages -->
      <div class="text-body-2 text-medium-emphasis mb-6">
        <p class="mb-1" data-testid="delete-dialog-message">{{ message }}</p>
        <p v-if="subMessage" class="mb-0">{{ subMessage }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="d-flex justify-center ga-3">
        <v-btn
          variant="outlined"
          rounded="md"
          min-width="110"
          class="text-none"
          data-testid="btn-cancel-delete"
          :disabled="loading"
          @click="handleCancel"
          color="secondary"
        >
          Hủy
        </v-btn>
        <v-btn
          variant="flat"
          :color="confirmColor"
          rounded="md"
          min-width="110"
          class="text-none font-weight-medium"
          data-testid="btn-confirm-delete"
          :loading="loading"
          @click="handleConfirm"
        >
          <SvgSprite v-if="confirmIcon" :name="confirmIcon" class="me-1" />
          {{ confirmText }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
  subMessage?: string;
  loading?: boolean;
  confirmText?: string;
  confirmColor?: string;
  confirmIcon?: string | null;
}

withDefaults(defineProps<Props>(), {
  title: "Xác nhận",
  message: "Bạn có chắc chắn muốn thực hiện hành động này?",
  subMessage: "",
  loading: false,
  confirmText: "Xác nhận",
  confirmColor: "primary",
  confirmIcon: null,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "confirm"): void;
}>();

const handleCancel = () => {
  emit("update:modelValue", false);
};

const handleConfirm = () => {
  emit("confirm");
};
</script>
