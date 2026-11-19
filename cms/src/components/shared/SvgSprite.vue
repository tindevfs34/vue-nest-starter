<template>
  <svg
    class="pc-icon"
    :style="{
      width:
        typeof width === 'number' || !isNaN(Number(width))
          ? `${width}px`
          : width,
      height:
        typeof height === 'number' || !isNaN(Number(height))
          ? `${height}px`
          : height,
    }"
  >
    <use :xlink:href="`${spritePath}#${props.name}`"></use>
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  name: String,
  width: {
    type: [String, Number],
    default: "20px",
  },
  height: {
    type: [String, Number],
    default: "20px",
  },
});

const spritePath = ref<string | null>(null);

onMounted(async () => {
  try {
    // Load the SVG sprite dynamically with an absolute path
    spritePath.value =
      (await import.meta.env.BASE_URL) + "assets/svg/sprite.svg";
  } catch (error) {
    console.error("Error loading SVG sprite:", error);
  }
});
</script>
