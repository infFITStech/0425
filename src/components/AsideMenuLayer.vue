<script setup>
import { mdiLogout, mdiClose } from '@mdi/js'
import { computed, onUnmounted, onMounted, ref } from 'vue'
import AsideMenuList from '@/components/AsideMenuList.vue'
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useAuthStore } from '@/stores/userStore.js';


defineProps({
  menu: {
    type: Array,
    required: true
  },
  isAsideMobileExpanded: Boolean,

})

const emit = defineEmits(['menu-click', 'aside-lg-close-click'])

const logoutItem = computed(() => ({
  label: 'Logout',
  icon: mdiLogout,
  color: 'info',
  isLogout: true
}))

const menuClick = (event, item) => {
  if(item.label==="Logout")
  {
    const authStore = useAuthStore();

    authStore.logout();
  }
  else
  {
    emit('menu-click', event, item)
  }
    
  
}



const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
}
</script>

<template>
  <aside
    id="aside"
    class="fixed flex z-40 top-0 h-screen transition-position overflow-hidden shadow-lg"
    :class="{ 'close-bar':!isAsideMobileExpanded }"
  >
    <div class="aside  flex-1 flex flex-col overflow-hidden dark:bg-slate-900">
      <div class="aside-brand flex flex-row items-center justify-between dark:bg-slate-900" style="height: 60px;background-color: white">
        <div class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
          <b class="font-black">One</b>
        </div>
        <!-- <button class="hidden lg:inline-block xl:hidden p-3" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button> -->
      </div>
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul>
        <AsideMenuItem :item="logoutItem" @menu-click="menuClick" />
      </ul>
    </div>
  </aside>
</template>

<style scoped>
@media (min-width: 1280px) {
      .xl\:left-0 {
          left: 0px !important;
      }
}
.close-bar {
  position: fixed;
  left: -264px;
}
#aside {
  width: 264px;
}
.aside{
  background-color: #0e0c28 !important;
}

</style>