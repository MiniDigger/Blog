<template>
  <div>
    <h1>Games</h1>
    <p>Just random stuff I do when am bored</p>
    <h2>Minesweeper</h2>
    <p>Well, the most primitive form possible</p>
    <Minesweeper />
  </div>
</template>

<script setup lang="ts">
import { useBlogMeta } from "~/composables/meta"
import { useHead, definePageMeta } from "#imports"
import Minesweeper from "~/components/games/Minesweeper.vue"

useHead(useBlogMeta("Games", "Some random games I wrote"))

definePageMeta({ layout: "blog-layout" })
</script>

<style scoped></style>
