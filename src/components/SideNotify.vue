<template>
    <aside
      id="aside"
      class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 h-screen-minus-56px right-0 transition-position overflow-hidden p-0"
    >
      <div class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden ">
        <button @click="close">close</button>

        <div
          class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars bg-gray-200"
        >
            {{ notifyContent }}
          <!-- <AsideMenuList :menu="menu" @menu-click="menuClick" /> -->
        </div>
  

      </div>
    </aside>
  </template>
  
  <script setup>
    import {useMainStore} from '@/stores/main.js';
    import menuNavBar from '@/menuNavBar.js'
    import {ref, watchEffect} from 'vue'

    const mainStore = useMainStore();
    const notifyContent=ref("test");


    watchEffect(() => {
  if(mainStore.IsNotify.state){
    notifyContent.value=menuNavBar.flatMap(item => {
    if (item.label==="notification") {
      return item.menu.filter(subItem => subItem.title === mainStore.IsNotify.title)
                     .map(matchedItem => matchedItem.content);
    }
    }).filter(detail => detail != null); 
  }
});

    const close = () => {
    mainStore.setIsNotify(false, null)
  };
  </script>

  <style scoped>
  .h-screen-minus-56px {
    height: calc(100vh - 56px);
}
</style>
