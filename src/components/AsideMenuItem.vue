<script setup>
import { ref, computed , onMounted, onUnmounted} from 'vue'
import { RouterLink , useRouter} from 'vue-router'
import { mdiMinus, mdiPlus } from '@mdi/js'
import { getButtonColor } from '@/colors.js'
import BaseIcon from '@/components/BaseIcon.vue'
import AsideMenuList from '@/components/AsideMenuList.vue'
import { useMainStore } from '@/stores/main'
import $ from 'jquery'
const mainStore = useMainStore()
const ContextMenu = ref(false);
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isDropdownList: Boolean
})
const router = useRouter();

const menuPosition = ref({ x: 0, y: 0 });

const menu = ref(null);

const emit = defineEmits(['menu-click'])

const hasColor = computed(() => props.item && props.item.color)

const asideMenuItemActiveStyle = computed(() =>
  hasColor.value ? '' : 'aside-menu-item-active font-bold'
)

const isDropdownActive = ref(false)

const componentClass = computed(() => [
  props.isDropdownList ? 'py-3 px-6 text-sm' : 'py-3',
  hasColor.value
    ? getButtonColor(props.item.color, false, true)
    : `aside-menu-item dark:text-slate-300 dark:hover:text-white`
])

const hasDropdown = computed(() => !!props.item.menu)

const menuClick = (event) => {
  
  emit('menu-click', event, props.item)

  if (hasDropdown.value) {
    isDropdownActive.value = !isDropdownActive.value
  }
  
}

const openContextMenu=(event) =>{
  if(mainStore.showContextMenu) return
      event.stopPropagation();
      ContextMenu.value = true;
      mainStore.setShowContextMenu(true)
      mainStore.setPath(event.target.closest('.isMenuItem').getAttribute('data-to'))
      // 確保菜單顯示在滑鼠點擊的位置
      menuPosition.value = { x: event.clientX+10, y: event.clientY };

}
const openInNewTab=(path)=> {
  window.open(router.resolve(path).href, '_blank');
  ContextMenu.value = false;
  }

  const handleClickOutside=()=> {
    ContextMenu.value = false;
    mainStore.setShowContextMenu(false)
  
  
}

function handleGlobalContextMenu(event) {
  
    ContextMenu.value = false;
    mainStore.setShowContextMenu(false)
    if( event.target.closest('.isMenuItem')) 
    {      
      openContextMenu(event)
      //
    }
}



onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('contextmenu', handleGlobalContextMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('contextmenu', handleGlobalContextMenu);

});
</script>

<template>
  <li class="purple">
    <div ref="menu" :style="{ top: menuPosition.y + 'px', left: menuPosition.x + 'px' }" :class="ContextMenu&&mainStore.showContextMenu ? '' : 'd-none'" class="context-menu btn" @click.stop="openInNewTab(mainStore.path)"  >
      開新分頁
    </div>
    <component
      :is="item.to ? RouterLink : 'a'"
      v-slot="vSlot"
      :to="item.to ?? null"
      :href="item.href ?? null"
      :target="item.target ?? null"
      :data-to="item.to ?? null"  
      class="flex cursor-pointer isMenuItem"
      :class="componentClass"
      @click="menuClick"
      @contextmenu.prevent="openContextMenu"
    >
      <BaseIcon
        v-if="item.icon"
        :path="item.icon"
        class="flex-none"
        :class="[vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '']"
        w="w-16"
        :size="18"
      />
      <div v-else class="pl-7">
      </div>
      <!-- 沒有icon 右邊留位置 -->
      <span
        class="grow text-ellipsis line-clamp-1"
        :class="[
          { 'pr-12': !hasDropdown },
          vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : ''
        ]"
        >{{ item.label }}</span
      >
      <BaseIcon
        v-if="hasDropdown"
        :path="isDropdownActive ? mdiMinus : mdiPlus"
        class="flex-none"
        :class="[vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '']"
        w="w-12"
      />
    </component>
    <AsideMenuList
      v-if="hasDropdown"
      :menu="item.menu"
      :class="['aside-menu-dropdown', isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden']"
      is-dropdown-list
    />
  </li>
</template>

<style scoped>
.style-basic:not(.dark) .aside-menu-item{
  color: #7a80b4;
}

.context-menu {
  position: fixed;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  cursor: pointer;
  font-size: smaller;
  z-index: 1000;
 color: #717171;               
  
}

.context-menu:hover {
  background-color: #d7d7d7;  
  color: #000;              
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
}
</style>