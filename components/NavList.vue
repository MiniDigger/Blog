<template>
  <template v-if="mobile">
    <div class="menu-button" ref="menuButton" @click="toggleMenu">
      <span>Menu</span>
    </div>
  </template>
  <div v-if="!mobile || menuOpen" :class="mobile ? 'menu' : ''" ref="menu">
    <NuxtLink to="/" @click="toggleMenu">Home</NuxtLink>
    <NuxtLink to="/projects" @click="toggleMenu">Projects</NuxtLink>
    <NuxtLink to="/blog" @click="toggleMenu">Blog</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "@vue/reactivity"
import { nextTick, onBeforeUnmount, onMounted, watch, watchEffect } from "@vue/runtime-core"

const windowWidth = ref(1000)
const menuOpen = ref(false)
const menu = ref()
const menuButton = ref()
const mobile = computed(() => windowWidth.value < 700)

onMounted(() => {
  nextTick(() => {
    onResize()
    window.addEventListener("resize", onResize)
    window.addEventListener("click", onClick)
  })
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize)
  window.removeEventListener("click", onClick)
})

// hide when resizing away from mobile
watch(mobile, (newValue, oldValue) => {
  if (!newValue && menuOpen.value) {
    toggleMenu()
  }
})

function onResize() {
  windowWidth.value = window.innerWidth
}

function toggleMenu() {
  if (mobile.value) {
    document.getElementsByTagName("body")[0].classList.toggle("modal")
    menuOpen.value = !menuOpen.value
  }
}

// close on outside click
function onClick(event: MouseEvent) {
  const menuClicked = menu.value === event.target || menu.value?.contains(event.target)
  const menuButtonClicked = menuButton.value === event.target || menuButton.value?.contains(event.target)
  if (menuOpen.value && !menuClicked && !menuButtonClicked) {
    toggleMenu()
  }
}
</script>

<style scoped>
a,
.menu-button {
  color: var(--font-color);
  text-decoration: none;
  font-weight: 700;
  font-size: 2rem;
  margin: 0 1rem 0 1rem;
}

.menu-button {
  display: flex;
  height: 100%;
  align-items: center;
  z-index: 1;
  cursor: pointer;
}

.menu {
  position: absolute;
  left: 0;
  top: 59px;
  width: calc(100% - 4rem);
  padding: 2rem;
  background-color: var(--bg-color-dark);
}

.menu a {
  display: block;
  padding: 1rem 0 1rem 0;
  width: fit-content;
}
</style>
