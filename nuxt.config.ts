import { defineNuxtConfig } from "nuxt3"

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  target: "static",
  ssr: true,
  buildModules: ["@nuxt3-graphql/codegen", "@nuxt3-graphql/urql"],
  urql: {
    url: "https://directus.benndorf.dev/graphql?access_token=frontend",
  },
  nitro: {
    preset: 'worker'
  }
})
