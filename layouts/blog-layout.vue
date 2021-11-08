<template>
  <div class="main">
    <header>
      <div class="brand">Mini's Corner</div>
      <nav>
        <NavList />
      </nav>
    </header>
    <section>
      <slot />
    </section>
    <footer>
      <div class="main-footer">
        <span>Copyright &copy; {{ new Date().getFullYear() }} MiniDigger. All Rights Reserved</span>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
:root {
  --bg-color: #1f2235;
  --bg-color-dark: #23263a;
  --font-color: #dfdfdf;
  --link-color: #ffffff;
  --grid: minmax(1rem, 10%) minmax(calc(100vw - 2rem), 2fr) minmax(1rem, 10%)
}

@media screen and (min-width: 700px) {
  :root {
    --grid: minmax(1rem, 1fr) minmax(250px, 2fr) minmax(1rem, 1fr)
  }
}

html {
  font-family: 'Poppins', sans-serif;
  font-weight: normal;
  font-style: normal;
  color: var(--font-color);
  background: var(--bg-color);
}

html p {
  line-height: 1.3rem;
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
  grid-template-areas:
    "brand nav .";
  background: var(--bg-color-dark);
  margin-bottom: 1rem;
}

nav {
  grid-area: nav;
  display: flex;
  justify-content: center;
  align-items: center;
}

.brand {
  grid-area: brand;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-weight: 700;
  font-size: 2rem;
}

section {
  grid-area: main;
}

footer {
  grid-area: footer;
  display: grid;
  grid-template-columns: var(--grid);
  grid-template-areas:
    ". mainFooter .";
  background: var(--bg-color-dark);
  margin-top: 1rem;
  padding: 1rem 0 1rem 0;
}

.main-footer {
  grid-area: mainFooter;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
<script lang="ts">
import NavList from "~/components/NavList"
export default {
  components: { NavList }
}
</script>
