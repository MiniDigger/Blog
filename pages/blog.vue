<template>
  <div>
    <Loader :fetching="fetching" :error="error">
      <article v-for="post in posts" class="teaser">
        <NuxtLink :to="post?.slug">
          <h1>{{ post?.title }}</h1>
          <h2>{{ post?.subtitle }}</h2>
        </NuxtLink>
        <small>posted on {{ post?.date_published}}</small>
      </article>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { useGetPostsQuery } from "~/graphql/generated/operations"
import Loader from "~/components/Loader.vue"
import { useBlogMeta } from "~/composables/meta"
import { useMeta } from "#meta"

useMeta(useBlogMeta("Projects", "My blog"));

let {
  fetching,
  error,
  data
} = await useGetPostsQuery()
const posts = data.value?.article!
</script>

<script lang="ts">
export default {
  name: "HomePage",
  layout: "blog-layout"
}
</script>

<style>
article.teaser  {
  margin: 1rem;
  padding: 2rem;
  box-shadow: black 3px 3px 10px -5px;
  border-radius: 1rem;
  background: var(--bg-color-dark);
}
.teaser a {
  color: var(--link-color);
  text-decoration: none;
}

.teaser h2 {
  margin-bottom: 0;
}
</style>
