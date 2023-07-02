<template>
  <div>
    <Loader :fetching="pending" :error="error">
      <article v-if="displayPost">
        <h1>
          {{ post.title }}
        </h1>
        <h2>
          {{ post.subtitle }}
        </h2>
        <small>Posted on {{ post.date_published }}</small>
        <Markdown :source="post.content" />
      </article>
      <div v-else class="not-found">
        <h1>404</h1>
        <h2>There is nothing here!</h2>
        <small>Yet, anyways</small>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/projects">Projects</NuxtLink></li>
          <li><NuxtLink to="/blog">Blog</NuxtLink></li>
        </ul>
      </div>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { computed, ref } from "vue"
import Markdown from "~/components/Markdown.vue"
import Loader from "~/components/Loader.vue"
import { useBlogMeta } from "~/composables/meta"
import { definePageMeta, useAsyncGql, useHead } from "#imports"

const route = useRoute()
const { data, pending, error } = await useAsyncGql("getPost", {
  slug: route.params.slug as string,
})
const post = computed(() => data.value.article_by_id!)
const preview = ref(route.query.preview || false)

const displayPost = computed(() => {
  return (
    post.value &&
    (preview.value || post.value.date_published < new Date().toISOString())
  )
})

useHead(
  useBlogMeta(
    (displayPost.value && post.value.title) || "Blog loading...",
    (displayPost.value && post.value.subtitle) || "Loading..."
  )
)

definePageMeta({ layout: "blog-layout" })
</script>

<style scoped>
small {
  margin-top: -1rem;
  margin-bottom: 1rem;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.not-found h1,
.not-found h2,
.not-found small {
  flex: 1 1 100%;
}

.not-found h1 {
  font-size: 3rem;
  margin-top: 6rem;
  margin-bottom: 0.5rem;
}
.not-found li {
  list-style: disc;
}
</style>
