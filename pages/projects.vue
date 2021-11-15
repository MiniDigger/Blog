<template>
  <div>
    <Loader :fetching="fetching" :error="error">
      <div class="row">
        <article v-for="project in projects" class="project">
          <h1>{{ project?.title }}</h1>
          <Markdown :source="project?.description" />
          <a v-if="project?.link.startsWith('http')" :href="project?.link">Learn More!</a>
          <NuxtLink v-else :to="project?.link">Learn more!</NuxtLink>
        </article>
      </div>
    </Loader>
  </div>
</template>

<script setup lang="ts">
import { useGetProjectsQuery } from "~/graphql/generated/operations"
import Loader from "~/components/Loader.vue"
import Markdown from "~/components/Markdown.vue"
import { useBlogMeta } from "~/composables/meta"
import { useMeta } from "#meta"

useMeta(useBlogMeta("Projects", "Some of the projects I worked on"));

let {
  fetching,
  error,
  data
} = await useGetProjectsQuery()
const projects = data.value?.project!
</script>

<script lang="ts">
export default {
  name: "ProjectsPage",
  layout: "blog-layout"
}
</script>

<style scoped>
article.project {
  margin: 1rem;
  padding: 2rem;
  box-shadow: black 3px 3px 10px -5px;
  border-radius: 1rem;
  background: var(--bg-color-dark);
  flex: 1 1 20%;
}

.project a {
  color: var(--link-color);
  text-decoration: none;
}

.row {
  display: flex;
  flex-wrap: wrap;
}
</style>
