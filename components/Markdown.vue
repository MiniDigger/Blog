<template>
  <div v-html="html" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Remarkable } from "remarkable"
import hljs from "highlight.js"
import "highlight.js/styles/rainbow.css"

const props = defineProps<{
  source: string
}>()

const html = computed(() => {
  return new Remarkable("full", {
    highlight,
  }).render(props.source)
})

function highlight(str: string, lang: string): string {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(str, { language: lang }).value
    } catch (err) {}
  }

  try {
    return hljs.highlightAuto(str).value
  } catch (err) {}

  return ""
}
</script>

<style>
article img,
pre,
blockquote {
  margin: 2rem 1rem 2rem 1rem;
  padding: 2rem;
  box-shadow: black 3px 3px 10px -5px;
  border-radius: 1rem;
  background: var(--bg-color-dark);
}
blockquote p:last-child {
  margin-bottom: 0;
}

article img {
  width: calc(100% - 2rem);
  padding: 0;
}
</style>
