<template>
  <div>
    <Loader :fetching="pending" :error="error">
      <article v-for="post in posts" :key="post.title" class="teaser">
        <NuxtLink :to="post?.slug">
          <h1>{{ post?.title }}</h1>
          <h2>{{ post?.subtitle }}</h2>
        </NuxtLink>
        <small>posted on {{ post?.date_published }}</small>
      </article>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import Loader from "~/components/Loader.vue"
import { useBlogMeta } from "~/composables/meta"
import { definePageMeta, useAsyncGql, useHead } from "#imports"

useHead(useBlogMeta("Projects", "My blog"))

definePageMeta({ layout: "blog-layout" })

const { data, pending, error } = await useAsyncGql("getPosts")
const posts = computed(() => data.value.article!)
</script>

<style>
article.teaser {
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
