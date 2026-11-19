<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>

const { initTheme } = useAppTheme();
onMounted(() => initTheme());
</script>
