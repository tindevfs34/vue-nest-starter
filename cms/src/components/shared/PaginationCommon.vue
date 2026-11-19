<template>
  <v-row
    class="mx-2 my-4 align-center justify-space-between"
    v-if="totalPages > 1 && props.records?.items.length > 0"
  >
    <v-col cols="6" class="text-lightText text-body-2">
      <span>
        Hiển thị
        <span class="font-weight-bold">{{ toCommas(firstIndex) }}</span> -
        <span class="font-weight-bold">{{ toCommas(lastIndex) }}</span> trên
        tổng số
        <span class="font-weight-bold">{{
          toCommas(props.records?.total)
        }}</span>
        mục
      </span>
    </v-col>
    <v-col cols="6" class="d-flex justify-end">
      <v-pagination
        v-model="currentPage"
        active-color="primary"
        :length="totalPages"
        variant="flat"
        :total-visible="5"
      />
    </v-col>
  </v-row>
  <div v-else></div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed, watch, onUnmounted } from "vue";
import { toCommas } from "@/common/utils";

const props = defineProps({
  records: {
    type: Object,
  },
  filter: {
    type: Object,
  },
});

let timeout: ReturnType<typeof setTimeout> | null = null;
const route = useRoute();
const emit = defineEmits(["getRecords", "changePage"]);
const currentPage = ref<number>(props.records?.page || 1);

const firstIndex = computed(() => {
  return (Number(currentPage.value) - 1) * Number(props.records?.limit) + 1;
});

const lastIndex = computed(() => {
  const data = Number(currentPage.value) * Number(props.records?.limit);
  if (data > Number(props.records?.total)) {
    return props.records?.total;
  } else {
    return data;
  }
});

const totalPages = computed(() => {
  if (props.records?.total != 0 && props.records?.limit != 0) {
    return Math.ceil(props.records?.total / props.records?.limit);
  } else {
    return 0;
  }
});

// Hooks
watch(
  () => route,
  (newValue) => {
    if (!newValue.query.page) {
      currentPage.value = 1;
    }
  },
  { deep: true, immediate: true },
);

watch(
  () => currentPage,
  (newValue) => {
    if (newValue.value != props.filter?.page) {
      emit("changePage", newValue);
    }
  },
  { deep: true, immediate: true },
);

watch(
  () => props.filter,
  () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      currentPage.value = props.filter?.page;
      emit("getRecords");
    }, 300);
  },
  { deep: true, immediate: true },
);

onUnmounted(async () => {
  if (timeout) {
    clearTimeout(timeout);
  }
});
</script>
