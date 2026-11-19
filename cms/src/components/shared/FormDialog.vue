<template>
  <v-dialog
    :model-value="modelValue"
    :width="width"
    :scrollable="scrollable"
    persistent
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-form @submit.prevent="handleSubmit">
      <v-card variant="outlined" elevation="0" class="bg-surface" >
        <!-- Title & Close Header -->
        <v-card-title class="d-flex align-center justify-space-between pa-5">
          <span class="text-h5 font-weight-bold">{{ title }}</span>
          <v-btn icon variant="text" :disabled="loading" @click="handleClose">
            <SvgSprite name="custom-x" />
          </v-btn>
        </v-card-title>
        <v-divider />

        <!-- Content Slot -->
        <v-card-text class="pa-5">
          <slot />
        </v-card-text>
        <v-divider />

        <!-- Actions Footer -->
        <v-card-actions class="d-flex justify-end pa-4 ga-2">
          <v-btn
            type="button"
            variant="outlined"
            rounded="md"
            class="px-4"
            :disabled="loading"
            @click="handleClose"
            color="secondary"
          >
            {{ cancelText }}
          </v-btn>
          <v-btn
            type="submit"
            variant="flat"
            color="primary"
            rounded="md"
            class="px-4"
            :loading="loading"
            :disabled="disabled"
          >
            <SvgSprite v-if="submitIcon" :name="submitIcon" class="me-1" />
            {{ submitText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  width?: string | number;
  cancelText?: string;
  submitText?: string;
  submitIcon?: string;
  loading?: boolean;
  disabled?: boolean;
  scrollable?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: "",
  width: 540,
  cancelText: "Hủy",
  submitText: "Lưu",
  submitIcon: "custom-check",
  loading: false,
  disabled: false,
  scrollable: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
  (e: "submit"): void;
}>();

const handleClose = () => {
  emit("update:modelValue", false);
  emit("close");
};

const handleSubmit = () => {
  emit("submit");
};
</script>
