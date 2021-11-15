<template>
  <div>
    <Loader :fetching="fetching" :error="error">
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
      <div class="not-found" v-else>
        <h1>
          404
        </h1>
        <h2>
          There is nothing here!
        </h2>
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
import { useGetPostQuery } from "~/graphql/generated/operations"
import { useRoute } from "vue-router"
import Markdown from "~/components/Markdown.vue"
import Loader from "~/components/Loader.vue"
import { computed, ref } from "@vue/reactivity"

let route = useRoute()
let {
  fetching,
  error,
  data
} = await useGetPostQuery({
  variables: { slug: route.params.slug as string }
})
const post = data.value?.article_by_id!

const preview = ref(route.query.preview || false)

const displayPost = computed(() => {
  return post && (preview.value || post.date_published < new Date().toISOString())
})
</script>

<script lang="ts">
export default {
  name: "PostPage",
  layout: "blog-layout"
}
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
