import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import { router } from "./router";
import { useLanguageStore } from "@/stores/language.store.ts";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Import library CSS first
import "@vuepic/vue-datepicker/dist/main.css";
import "@/scss/style.scss";

import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import VueTablerIcons from "vue-tabler-icons";

import SvgSprite from "@/components/shared/SvgSprite.vue";
// Toast
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import PaginationCommon from "@/components/shared/PaginationCommon.vue";

// google-fonts
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/700.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";

// DatePicker
import DatePicker from "@/components/shared/DatePicker.vue";

import vuetify from "@/plugins/vuetify.ts";
import { initValidatorI18nSync } from "@/common/utils/i18n-validators.util.ts";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);

const useLanguage = useLanguageStore();
// export const i18n = createI18n({
//   locale: useLanguage.language || "ja",
//   legacy: false,
//   globalInjection: true,
//   silentTranslationWarn: true,
//   silentFallbackWarn: true,
// });

initValidatorI18nSync();

app.use(router);
// app.component("EasyDataTable", DataTable);
app.use(PerfectScrollbarPlugin);
app.component("SvgSprite", SvgSprite);
app.component("Pagination", PaginationCommon);
app.component("DatePicker", DatePicker);
app.use(VueTablerIcons);
app.use(ToastPlugin);
// app.use(i18n);
app.use(vuetify);
app.mount("#app");
