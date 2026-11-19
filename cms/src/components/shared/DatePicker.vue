<template>
  <VueDatePicker
    v-bind="$attrs"
    :locale="ja"
    auto-apply
    :enable-time-picker="false"
    :dark="theme.current.value.dark"
    teleport="body"
    :format="props.format"
    text-input
    :time-config="{ enableTimePicker: false }"
    week-start="1"
    :action-row="{
      selectBtnLabel: '選択',
      cancelBtnLabel: 'キャンセル',
      showPreview: true,
    }"
    :placeholder="props.placeholder"
    :disabled="props.isDisable"
    :style="props.isDisable ? 'opacity: 0.6' : ''"
  />
</template>

<script setup lang="ts">
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { ja } from "date-fns/locale";
import { useTheme } from "vuetify/lib/framework.mjs";
const props = defineProps({
  isDisable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "mm/dd/yyyy",
  },
  format: {
    type: String,
    default: "MM/dd/yyyy",
  },
});
const theme = useTheme();
</script>
