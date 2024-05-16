<template>
<div class="text-sm">
    <label class="font-bold mb-0 text-lg mr-3">付費訂閱</label>
    <PillTag label="啟用中" color="success" :icon="mdiCheckDecagram" />
    <BaseButton label="購買方案" color="info" :class="{ 'float-right': true}">
    </BaseButton>
</div>



<div class="sm:flex mt-3 h-full">
    <!-- 左侧列 -->
    <div class="sm:w-1/2 p-4">
        <div class="text-sm ">
            <div  class="flex justify-between items-center cursor-pointer" @click="toggle">
                <span>擴充功能 ({{ items.length }})</span>
                <BaseIcon
                :path="show ? mdiChevronUp : mdiChevronDown"
                class="hidden lg:inline-flex transition-colors"
            />        
            </div>
            
            <div v-show="show">
                <ul>
                <li v-for="(item, index) in items" :key="index">{{ item }}</li>
                </ul>
            </div>
        </div>
    </div>
  

    <div class="hidden lg:block lg:w-px bg-gray-300"></div>
  
    <!-- 右侧列 -->
    <div class="sm:w-1/2 p-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div class="lg:col-span-1"> 
              <label class="block font-bold mb-2 text-sm">繳費週期:</label>
            </div>
            <div class="lg:col-span-2"> 
              <label class="block  mb-2 text-sm">123</label>
            </div>
            <div class="lg:col-span-1"> 

              <label class="block font-bold mb-2 text-sm">方案開始日:</label>
            </div>
            <div class="lg:col-span-2"> 
              <label class="block  mb-2 text-sm">123</label>
            </div>
            <div class="lg:col-span-1"> 

                <label class="block font-bold mb-2 text-sm">方案到期日:</label>
              </div>
              <div class="lg:col-span-2"> 
                <label class="block  mb-2 text-sm">123</label>
              </div>
              <div class="lg:col-span-1"> 

                <label class="block font-bold mb-2 text-sm">付款方式:</label>
              </div>
              <div class="lg:col-span-2"> 
                <label class="block  mb-2 text-sm">123</label>
              </div>
        </div>

    </div>
  </div>
  

</template>

<script setup>
import PillTag from '@/components/PillTag.vue'
import { mdiCheckDecagram } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import { ref } from 'vue'
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import BaseIcon from '@/components/BaseIcon.vue'


const items = ref(['項目1', '項目2', '項目3', '項目4', '項目5', '項目6', '項目7', '項目4', '項目5', '項目6', '項目7'])

// 下拉清單顯示隱藏
const show = ref(false)

const toggle = () => {
  show.value = !show.value
}
</script>

<style scoped>
ul {
  padding: 0;
  list-style-type: disc;
}
li {
  padding: 0.5rem 0;
}

</style>