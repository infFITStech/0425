<template>
    <div class="h-cos">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="tab === currentTab ? 'border-black-500 text-blue-500 border-b-2 font-bold py-2 px-4 pb-3' : 'py-2 px-4'"
        @click="currentTab = tab"
      >
      <label class="mb-0 text-md cursor-pointer">{{ tab.name }}</label>
      </button>
      <hr
      :class=" 'mt-0 mb-6 -mx-6 dark:border-slate-800'
      "
      class="border-t border-gray-100"
    />

  
      <div v-if="currentTab" class="f16 h-full" >
        <component :is="currentTab.component"></component>
      </div>
     
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'

  const props = defineProps({
  tabs: {
    type: Array,
    default: () => []
  }
})


const currentTab = ref(props.tabs[0])
  </script>
  
  <style>


  .cursor-pointer{
    cursor: pointer;
  }
  .f16{
    font-size: 14px;
  }
.h_cos{
  height: calc(100vh - 50px);
}
 
  </style>
  