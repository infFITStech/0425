<script setup>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import { RouterLink } from 'vue-router'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
// import { useMainStore } from '@/stores/main.js'
import BaseIcon from '@/components/BaseIcon.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import NavBarMenuList from '@/components/NavBarMenuList.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import { useAuthStore } from '@/stores/userStore.js';
import {useMainStore} from '@/stores/main.js';
const authStore = useAuthStore();

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['menu-click'])

const is = computed(() => {
  if (props.item.href) {
    return 'a'
  }

  if (props.item.to) {
    return RouterLink
  }



  return 'div'
})

const componentClass = computed(() => {
  const base = [
    isDropdownActive.value
      ? `navbar-item-label-active dark:text-slate-400`
      : `navbar-item-label dark:text-white dark:hover:text-slate-400`,
    props.item.menu ? 'py-2 px-3' : 'py-2 px-3'
  ]

  if (props.item.isDesktopNoLabel) {
    base.push('w-16', 'justify-center')
  }

  return base
})

const itemLabel = computed(() =>{
  if(props.item.isCurrentUser&&authStore.cognitoUser) return "";
  //return authStore.cognitoUser.username ;
  else if(props.item.title) return props.item.title
  else return props.item.label
}

)

const isDropdownActive = ref(false)
const menuClick = (event) => {
  emit('menu-click', event, props.item)

  if (props.item.menu) {
    isDropdownActive.value = !isDropdownActive.value
  }
}

const menuClickDropdown = (event, item) => {
  emit('menu-click', event, item)
}

const root = ref(null)

const forceClose = (event) => {
  if (root.value && !root.value.contains(event.target)) {
    isDropdownActive.value = false
  }
}

const handleClick = (event, item) => {
  if (props.item.label==="Announcement") {
      useMainStore().setIsAnnounce(true,item)
      event.stopPropagation(); // 阻止事件冒泡//!!
      forceClose(event);
  } 
  else if(props.item.label==="notify"){
    console.log(item)
      useMainStore().setIsNotify(true,item)
  }
  
}

onMounted(() => {
  if (props.item.menu) {
    window.addEventListener('click', forceClose)
  }
})

onBeforeUnmount(() => {
  if (props.item.menu) {
    window.removeEventListener('click', forceClose)
  }
})

</script>

<template>
  <BaseDivider v-if="item.isDivider" nav-bar />
  <component
    :is="is"
    v-else
    ref="root"
    class="block flex items-center relative"
    :class="[{ 'cursor-pointer': item.menu }, componentClass]"
    :style="{ 'color': item.menu ? '' : 'black' }"
    :to="item.to ?? null"
    :href="item.href ?? null"
    :target="item.target ?? null"
    @click="(event)=>{menuClick();  handleClick(event, itemLabel);}"
  >
    <div
      class="flex items-center"
      :class="{
        'bg-gray-100 dark:bg-slate-800 bg-transparent dark:bg-transparent p-0':
          item.menu
      }"
    >
      <UserAvatarCurrentUser v-if="item.isCurrentUser" class="w-12 h-12 inline-flex" :class="{ 'mr-3': item.menu}" />
      <BaseIcon v-if="item.icon" :path="item.icon" class="transition-colors" />
      <span
        v-if="itemLabel"
        class="px-2 transition-colors"
        :class="{ 'hidden': item.isDesktopNoLabel && item.icon }"
        
        >{{ itemLabel }}</span
      >
      <BaseIcon
        v-if="item.menu && item.isCurrentUser"
        :path="isDropdownActive ? mdiChevronUp : mdiChevronDown"
        class=" inline-flex transition-colors"
      />
    </div>
    <div
      v-if="item.menu"
      class="text-sm border-b border-gray-100 border bg-white absolute top-full min-w-full z-20 rounded-lg shadow-lg dark:bg-slate-800 dark:border-slate-700"
      :class="{ 'hidden': !isDropdownActive , 'left-0': !item.notify && !item.announceCol,'right-0': item.notify || item.announceCol}"  >   
    <!-- item.notify的話，dropdown menu box是在右邊 -->
      <NavBarMenuList :menu="item.menu" @menu-click="menuClickDropdown" />
    </div>
  </component>
</template>
<style scoped>
.lg\:p-0 {
  padding: 0px;
}
</style>