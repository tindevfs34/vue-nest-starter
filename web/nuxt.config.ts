import fontDisplayPlugin from "./postcss-plugins/postcss-font-display";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    port: 3000,
  },
  build: {
    transpile: [
      "vue-tabler-icons",
      "@vuelidate/core",
      "@vuelidate/validators",
    ],
  },
  css: [
    "~/assets/scss/style.scss",
  ],
  app: {
    baseURL: "/",
  },
  runtimeConfig: {
    apiBase: process.env.NUXT_API_BASE || process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3002/api/v1",
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3002/api/v1",
    },
  },
  vite: {
    build: {
      target: "esnext",
      cssTarget: ["chrome100", "safari15", "firefox100", "edge100"],
      cssMinify: "lightningcss",
    },
    css: {
      postcss: {
        plugins: [fontDisplayPlugin()],
      },
    },
  },
  modules: [
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "nuxt-swiper",
    "@nuxtjs/sitemap",
    "vuetify-nuxt-module",
  ],
  vuetify: {
    moduleOptions: {
      styles: true,
    },
  },
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
    },
    subsets: ["latin", "vietnamese"],
    display: "swap",
  },
});
