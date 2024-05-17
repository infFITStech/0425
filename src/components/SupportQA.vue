<template>
    <div :class="{ 'has-dropdown': hasDropdown, 'shadow': hasDropdown&&isDropdownActive, 'mb-1':hasDropdown, 'flex-col':!hasDropdown}" class="py-3 w-full cursor-pointer bg-white  item" 
    :style="{ borderBottom: item.ans ? '2px solid rgb(239, 239, 246)': '' , alignItems:item.ans?'flex-start':'center'}"
    style="display: flex;"
    @click="clickDrop"
   >
   <!--     :style="{ boxShadow: hasDropdown ? 'rgba(0, 0, 0, 0.15) 0 2px 8px' : '' }"
  style="box-shadow: rgba(0, 0, 0, 0.15) 0 2px 8px" -->
        <BaseIcon
        v-if="hasDropdown"
        :path="mdiViewList"
        class="flex-none"
        w="w-16"
        :size="18"
      />
      <span
      :class="{ 'pl-12': !hasDropdown }"
      :style="{fontSize:hasDropdown?'18px':'16px'}"
      style=""
        class="grow text-ellipsis line-clamp-1 inline-block "

        >{{ item.title }}</span
      >
      <span v-if="item.ans"
      :class="{ 'pl-12': !hasDropdown }"
        class="grow text-ellipsis line-clamp-1  "
        >{{ item.ans }}</span
      >
        <BaseIcon
        v-if="hasDropdown"
        :path="isDropdownActive ? mdiMinus : mdiPlus"
        class="flex-none"
        w="w-12"
      />
        
    </div>
    <transition name="slide">

    <div v-if="isDropdownActive" class="pl-2 mb-1" >
        <SupportQA
        
        v-for="(a, index) in item.menu"
        :key="index"
        :item="a"
      />
    </div>
  </transition>


    <hr
    v-if="hasDropdown"
    :class="'my-0 dark:border-slate-800'"
    class="border-t border-gray-100"
  />


</template>

<script setup>
import { mdiMinus, mdiPlus,mdiViewList } from '@mdi/js'
import BaseIcon from '@/components/BaseIcon.vue'
import { ref , computed} from 'vue';
import SupportQA from '@/components/SupportQA.vue'
const isDropdownActive = ref(false)
const hasDropdown = computed(() => !!props.item.menu)
const clickDrop = () => {
    if (hasDropdown.value) {
    isDropdownActive.value = !isDropdownActive.value
  }
}
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
})

</script>


<style scoped>
.item:nth-child(odd):not(.has-dropdown) {
    background-color: white; /* 淺灰色 */
  }
  .item:nth-child(even):not(.has-dropdown) {
    background-color: #ffffff; /* 白色 */
  }
.has-dropdown:hover{
  filter: brightness(98%);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

</style>