import { defineStore } from "pinia";

export const useLanguageStore = defineStore("language", {
  state: () => ({
    language: "",
  }),
  actions: {
    async setLanguage(language: string) {
      this.language = language;
    },
  },
  persist: true,
});
