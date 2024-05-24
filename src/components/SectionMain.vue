<script setup>
import { containerMaxW } from '@/config.js'
</script>

<template>
  <section class="p-6 padding-custom content " :class="containerMaxW" style="overflow-y:scroll; -ms-overflow-style: none; scrollbar-width: none;">
    <slot />
  </section>
</template>


<style scoped>




@media (min-width: 1280px) {
  .padding-custom {
    padding-left: 64px;
    padding-right: 25px;
  }
}

@media (max-width: 1280px) {
  .padding-custom {
    padding-left: 60px;
    padding-right: 25px;
  }
}
</style>