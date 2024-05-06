<script setup>
import { RouterView } from 'vue-router'

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('p, h1, h2, h3, span').forEach(element => {
    if (element.textContent.match(/[\u4e00-\u9fa5]/)) {
      // 如果含有中文字符，應用Noto Sans TC字型
      element.style.fontFamily = 'Noto Sans TC, sans-serif';
    } else {
      // 否則應用Circular Std Book字型
      element.style.fontFamily = 'Circular Std Book, sans-serif';
    }
  });
});
</script>

<template>
  <RouterView />
</template>

<style>
@import './css/global.scss'


</style>