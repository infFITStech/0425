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


<!-- 解決modal 都會跳到最上層 -->
<style>
body.modal-open {
  overflow:visible !important;
  padding-right: 0px !important;

}

.modal{
  padding-right: 0px !important;
}

</style>