<script setup lang="ts">
import { shallowRef, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLanguageStore } from '@/stores/language.store';

const languageStore = useLanguageStore();
const { locale } = useI18n();

const languageDD = shallowRef([
  { title: '日本語', subtext: 'Japan', value: 'ja' },
  { title: 'English', subtext: 'UK', value: 'en' },
]);

const currentLocale = computed(() => languageStore.language);

const changeLocale = (value: string) => {
  languageStore.language = value;
  locale.value = value;
};
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- language DD -->
  <!-- ---------------------------------------------- -->
  <v-list class="px-2" aria-label="language list" aria-busy="true">
    <v-list-item
      v-for="(item, index) in languageDD"
      :key="index"
      color="primary"
      rounded="md"
      :active="currentLocale === item.value"
      class="d-flex align-center"
      @click="changeLocale(item.value)"
    >
      <v-list-item-title class="text-h6">
        {{ item.title }}
        <span class="text-lightText text-caption pl-2">({{ item.subtext }})</span>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
