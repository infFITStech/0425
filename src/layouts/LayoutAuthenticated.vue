<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import menuAside from '@/menuAside.js'
import menuNavBar from '@/menuNavBar.js'
import { useDarkModeStore } from '@/stores/darkMode.js'
import BaseIcon from '@/components/BaseIcon.vue'
// import FormControl from '@/components/FormControl.vue'
import NavBar from '@/components/NavBar.vue'
import NavBarItemPlain from '@/components/NavBarItemPlain.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import { useAuthStore } from '@/stores/userStore.js';
import PopUp from '@/components/PopUp.vue'
import {useMainStore} from '@/stores/main.js';
import SideNotify from '@/components/SideNotify.vue';

const mainStore = useMainStore();

const layoutAsidePadding = 'xl:pl-64'

const darkModeStore = useDarkModeStore()

const router = useRouter()

const isAsideMobileExpanded = ref(false)
const isAsideLgActive = ref(false)



router.beforeEach(() => {
  isAsideMobileExpanded.value = false
  isAsideLgActive.value = false
})


const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    darkModeStore.set()
  }
  //ouo notificate

  if (item.isLogout) {
    const authStore = useAuthStore();

    authStore.logout();
  }
}
</script>

<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded
    }"
    
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 xl:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto dark:bg-slate-800 dark:text-slate-100"
      style="background-color: #efeff6;"
    >
    <!--lg:w-auto 菜單右側內容是否要完全顯示  -->
      <NavBar
        :menu="menuNavBar"
        :class="[layoutAsidePadding, { 'ml-60 xl:ml-0': isAsideMobileExpanded }]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain>
        
        <NavBarItemPlain display="hidden lg:flex xl:hidden" @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded">
          <!--"isAsideLgActive = true"  -->
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>

        <!-- <NavBarItemPlain use-margin>
          <FormControl placeholder="Search (ctrl+k)" ctrl-k-focus transparent borderless />
        </NavBarItemPlain> -->

      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <PopUp v-if="mainStore.IsAnnounce.state">
        
      </PopUp>
      <SideNotify v-if="mainStore.IsNotify.state">
      </SideNotify>
      
      <div class="content">
        <slot />
      </div>

      <div style="background-color: white;"  >
      <FooterBar>
        <!-- Get more with
        <a href="https://tailwind-vue.justboil.me/" target="_blank" class="text-blue-600"
          >Premium version</a
        > -->
        <a href="https://.me/" target="_blank" style="color: gray;">Support</a>
        &nbsp;&nbsp;&nbsp;
        <a href="https://.me/" target="_blank" style="color: gray;">Contact us</a>
        
      </FooterBar>
      </div>

    </div>
  </div>
</template>

<style>
.content{
  min-height: calc(100vh - 93px)
}
</style>