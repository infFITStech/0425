<script setup>
import { RouterView } from 'vue-router'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useMainStore } from './stores/main';
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
const mainStore = useMainStore();


const parts= window.location.href.slice(1).split('/');
console.log(parts[parts.length-1]);

if(parts[parts.length-1]!=="iframe-container")
{
  import('./css/global.scss'); 
}


// onMounted(() => {
//   const router = useRouter();



//   router.beforeEach((to, from, next) => {
//     mainStore.setIsLoading(true);
//     console.log('qwer', mainStore.isLoading)

//     next();
//   });

//   router.afterEach(() => {
//     mainStore.setIsLoading(false);
//   });

//   onBeforeUnmount(() => {
//     // router.beforeEach(null);
//     // router.afterEach(null);
//   });
// });
</script>

<template>
  <RouterView />
  <!-- <loading v-model:active="mainStore.isLoading" color="#fff" background-color="rgba(0,0,0,0.5)"></loading> -->
  <div v-if="mainStore.isLoading" class="preloader" style="z-index: 9999;" >
    <img src="@/img/inffits_f_black.png" >
    <div class="cssload-speeding-wheel"></div>
</div>
</template>


<!-- 解決modal 都會跳到最上層 -->
<style>
.preloader img{
  height: 15px;
}

body.modal-open {
  overflow:visible !important;
  padding-right: 0px !important;

}

.modal{
  padding-right: 0px !important;
}



</style>