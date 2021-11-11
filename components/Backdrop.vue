<template>
  <div class="backdrop"></div>
</template>

<style>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background: #0000009e;
  display: none;
}

.modal .backdrop {
  display: block;
}
</style>
