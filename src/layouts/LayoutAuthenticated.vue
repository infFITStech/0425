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

const layoutAsidePadding = 'xl:pl-60'

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
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain>
        
        <NavBarItemPlain display="hidden lg:flex xl:hidden" @click.prevent="isAsideLgActive = true">
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
      <slot />
      <FooterBar>
        <!-- Get more with
        <a href="https://tailwind-vue.justboil.me/" target="_blank" class="text-blue-600"
          >Premium version</a
        > -->
        Footer
      </FooterBar>
    </div>
  </div>
</template>
