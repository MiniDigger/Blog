<template>
  <div v-if="fetching">Loading...</div>
  <div v-else-if="error">Oh no... {{ error }}</div>
  <slot v-else />
</template>

<script setup lang="ts">
defineProps<{
  fetching?: Boolean
  error?: string
}>()
</script>
