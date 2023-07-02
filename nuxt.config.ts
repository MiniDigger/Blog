export default defineNuxtConfig({
  modules: ["nuxt-graphql-client"],
  imports: {
    autoImport: false,
  },
  runtimeConfig: {
    public: {
      GQL_HOST: "https://directus.benndorf.dev/graphql?access_token=frontend",
    },
  },
})
