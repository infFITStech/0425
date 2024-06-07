<script setup>
import { RouterView } from 'vue-router'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useMainStore } from './stores/main';
const mainStore = useMainStore();


const parts= window.location.href.slice(1).split('/');
console.log(parts[parts.length-1]);

if(parts[parts.length-1]!=="iframe-container")
{
  import('./css/global.scss'); 
}
</script>

<template>
  <RouterView />
  <loading v-model:active="mainStore.isLoading" color="#fff" background-color="rgba(0,0,0,0.5)"></loading>

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