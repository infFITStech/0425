<script setup>
import { containerMaxW } from '@/config.js'
import BaseLevel from '@/components/BaseLevel.vue'
// import JustboilLogo from '@/components/JustboilLogo.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="px-8 padding-custom" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        Copyright &copy; {{ year }} infFITS. All rights reserved.
        <!-- <a href="https://justboil.me/" target="_blank">JustBoil.me</a>. -->
        <!-- <slot /> -->
      </div>
      <!-- <div class="md:py-2">
        <a href="https://justboil.me">
          <JustboilLogo class="w-auto h-8 md:h-6" />
        </a>
      </div> -->
      <slot />
    </BaseLevel>
  </footer>
</template>

<style scoped>
footer {
  background-color: #fff;
  padding-top: 0.82em;
  padding-bottom: 0.82em;
}




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