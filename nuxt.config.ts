// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 4000,
  },
  ssr: false,
  modules: ["@nuxt/ui", "@pinia/nuxt", "@vueuse/nuxt"],
  runtimeConfig: {
    basicAuth: process.env.NUXT_BASIC_AUTH,
  },
});
