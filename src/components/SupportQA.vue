<template>
    <div :class="{'hover:bg-gray-100 dark:hover:bg-slate-700':hasDropdown, 'has-dropdown': hasDropdown}" class="ml-2 py-3 w-full cursor-pointer bg-gray-50 dark:bg-slate-800 item" @click="clickDrop">
        <BaseIcon
        v-if="hasDropdown"
        :path="mdiViewList"
        class="flex-none"
        w="w-16"
        :size="18"
      />
      <span
      :class="{ 'pl-12': !hasDropdown }"
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
    <div v-if="isDropdownActive" >
        <SupportQA
        
        v-for="(a, index) in item.menu"
        :key="index"
        :item="a"
      />
    </div>

    <hr
    v-if="hasDropdown"
    :class="'my-0 -mx-6 dark:border-slate-800'"
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
    background-color: #f8f8f8; /* 淺灰色 */
  }
  .item:nth-child(even):not(.has-dropdown) {
    background-color: #ffffff; /* 白色 */
  }

</style>