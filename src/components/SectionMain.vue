<script setup>
import { containerMaxW } from '@/config.js'
</script>

<template>
  <section class="p-6" :class="containerMaxW" style="padding-left: 60px;">
    <slot />
  </section>
</template>


