<template>
  <div v-html="html" />
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity"
import { Remarkable } from "remarkable"

const props = defineProps<{
  source: string
}>()

const html = computed(() => {
  return new Remarkable("full", {
    highlight
  }).render(props.source)
})
</script>

<script lang="ts">
import hljs from "highlight.js"
import 'highlight.js/styles/rainbow.css'

function highlight(str: string, lang: string): string {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(str, {language: lang}).value
    } catch (err) {
    }
  }

  try {
    return hljs.highlightAuto(str).value
  } catch (err) {
  }

  return ""
}
</script>

<style>

article img,
pre,
blockquote  {
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

pre {
  overflow: auto;
}

em {
  font-style: italic;
}

h1,h2 {
  margin-bottom: 1.5rem;
  font-weight: 600;
}
h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-top: 1rem;
}

p {
  margin-bottom: 1.5rem;
}

a {
  color: var(--link-color);
  text-decoration: none;
  font-weight: bold;
}
</style>
