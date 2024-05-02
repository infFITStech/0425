<script setup>
import { ref } from 'vue'
import { mdiClose, mdiDotsVertical } from '@mdi/js'
import { containerMaxW } from '@/config.js'
import BaseIcon from '@/components/BaseIcon.vue'
import NavBarMenuList from '@/components/NavBarMenuList.vue'
import NavBarItemPlain from '@/components/NavBarItemPlain.vue'

defineProps({
  menu: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['menu-click'])

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

// const isMenuNavBarActive = ref(false)
</script>

<template>
  <nav
    class="top-0 inset-x-0 fixed z-50 transition-position w-screen lg:w-auto dark:bg-slate-800 shadow-sm"
  >
  <!-- 放logo -->
  <div class="items-center space-x-4 py-3 pl-10" style="position:fixed; top:0;left:0; height:60px; width:auto;">
    <a href="/" class="float items-center">
      <img src="https://myinffits.com/images/infFITS_Logo_graycenter.png" alt="Logo" style="height:100%;width:auto">
    </a>
    <!-- 其他导航栏项目 -->
  </div>

    <div class="flex lg:items-stretch" :class="containerMaxW">
      <div class="flex flex-1 items-stretch" style="height: 60px;">
        <slot />
      </div>
      <!-- <div class="flex-none items-stretch flex h-14 lg:hidden"> 
        <NavBarItemPlain @click.prevent="isMenuNavBarActive = !isMenuNavBarActive">
          <BaseIcon :path="isMenuNavBarActive ? mdiClose : mdiDotsVertical" size="24" />
        </NavBarItemPlain>
      </div> -->
      <div
        class="max-h-screen-menu overflow-visible w-screen top-14 left-0 w-auto flex static shadow-none dark:bg-slate-800"
        :class="[1 ? 'block' : 'hidden']"
        style="background-color: white;"
      >
      <!-- isMenuNavBarActive -->
        <NavBarMenuList :menu="menu" @menu-click="menuClick" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.lg\:shadow-none{
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
  ;
}
.z-41{
  z-index: 41;
}
nav{
  height: 60px;
  background-color: white !important;
}
</style>