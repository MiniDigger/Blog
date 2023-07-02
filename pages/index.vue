<template>
  <div class="container">
    <div class="title">
      <h1>Hello world!</h1>
      <h2>I'm Martin "MiniDigger" Benndorf</h2>
      <p>
        I am a Software Engineer from Cologne, Germany. The only place on earth
        where you can drink the dialect we speak! 🍻
      </p>
      <p>
        At day, I work at an insurance company, in the customer applications
        team, managing our websites and end-user facing web apps for millions of
        customers.
      </p>
      <p>
        At night, I found a passion in the Open Source Community, especially
        around the modding community of Minecraft, but also other projects.
        <NuxtLink to="/projects">Learn more</NuxtLink>.
      </p>
    </div>
    <div class="image">
      <img src="~/assets/faded.png" alt="Picture of me" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogMeta } from "~/composables/meta"
import { definePageMeta, useHead } from "#imports"

useHead(useBlogMeta("Home", "Mini's Corner on the internet"))

definePageMeta({ layout: "blog-layout" })
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.title {
  flex: 0 0 50%;
}
.image {
  flex: 0 0 50%;
}
.image img {
  width: 100%;
}
h1 {
  font-size: 3rem;
  margin-top: 90px;
}
h2 {
  font-size: 2rem;
}

@media screen and (max-width: 800px) {
  .title {
    flex: 0 0 100%;
    order: 2;
  }
  .image {
    flex: 0 0 100%;
    order: 1;
    margin-bottom: -100px;
  }
  h1 {
    margin-top: 0;
    text-shadow: 0 0 15px black;
  }
  .container {
    margin-top: 0;
  }
}
</style>
