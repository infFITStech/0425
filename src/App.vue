<script setup>
import { RouterView } from 'vue-router'
const parts= window.location.href.slice(1).split('/');
console.log(parts[parts.length-1]);

if(parts[parts.length-1]!=="iframe-container")
{
  import('./css/global.scss'); 
}
</script>

<template>
  <RouterView />
</template>

<!-- <style>
@import './css/global.scss'


</style> -->