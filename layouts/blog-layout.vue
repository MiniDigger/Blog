<template>
  <div class="main">
    <header>
      <div class="brand">Mini's Corner</div>
      <nav>
        <NavList />
      </nav>
    </header>
    <Backdrop />
    <section>
      <slot />
    </section>
    <footer>
      <div class="main-footer">
        <span
          >Copyright &copy; {{ new Date().getFullYear() }} Martin "MiniDigger"
          Benndorf</span
        >
        <span
          >Found an error? You can fix it
          <a href="https://github.com/MiniDigger/Blog">here</a>!</span
        >
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import NavList from "~/components/NavList"
import Backdrop from "~/components/Backdrop.vue"
</script>
<style>
:root {
  --grid: minmax(1rem, 10%) minmax(calc(100vw - 2rem), 2fr) minmax(1rem, 10%);
}

@media screen and (min-width: 700px) {
  :root {
    --grid: minmax(1rem, 14vw) minmax(60vw, 70vw) minmax(1rem, 14vw);
  }
}

.main {
  display: grid;
  grid-template-rows: 75px 1fr 75px;
  grid-template-columns: var(--grid);
  grid-template-areas:
    "header header header"
    ".      main   .     "
    "footer footer footer";
  height: 100vh;
}

header {
  grid-area: header;
  display: grid;
  grid-template-columns: var(--grid);
  grid-template-areas: "brand nav .";
  background: var(--bg-color-dark);
  margin-bottom: 1rem;
  z-index: 2;
}

nav {
  grid-area: nav;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

@media screen and (min-width: 700px) {
  nav {
    justify-content: center;
    align-items: center;
  }
}

.brand {
  grid-area: brand;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-weight: 700;
  font-size: 2rem;
  z-index: 2;
}

section {
  grid-area: main;
}

footer {
  grid-area: footer;
  display: grid;
  grid-template-columns: var(--grid);
  grid-template-areas: ". mainFooter .";
  background: var(--bg-color-dark);
  margin-top: 1rem;
  padding: 1rem 0 1rem 0;
}

.main-footer {
  grid-area: mainFooter;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
}

.main-footer span {
  flex: 1 1 100%;
  line-height: 1.2;
}

@media screen and (max-width: 400px) {
  .main-footer {
    align-items: flex-start;
  }
}
</style>
