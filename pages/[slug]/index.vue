<template>
  <div>
    <Loader :fetching="fetching" :error="error">
      <article v-if="post">
        <h1>
          {{ post.title }}
        </h1>
        <h2>
          {{ post.subtitle }}
        </h2>
        <Markdown :source="post.content" />
      </article>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { useGetPostQuery } from "~/graphql/generated/operations"
import { useRoute } from "vue-router"
import Markdown from "~/components/Markdown.vue"
import Loader from "~/components/Loader.vue"

let {
  fetching,
  error,
  data
} = await useGetPostQuery({
  variables: { slug: useRoute().params.slug as string }
})
const post = data.value?.article_by_id!
</script>

<script lang="ts">
export default {
  name: "PostPage",
  layout: "blog-layout"
}
</script>

<style scoped></style>
