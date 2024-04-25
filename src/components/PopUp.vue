<template>
    <div v-if="mainStore.IsAnnounce.state" ref="popupElement" class="popup" >
      
      <div class="popup-content">

        
        <p>{{content}}</p>
        <button @click="closePopup">close</button>
    
      </div>
    </div>

  </template>
  
  <script setup>
  import {ref,watchEffect,onMounted, onBeforeUnmount} from 'vue'
  import {useMainStore} from '@/stores/main.js';
  import menuNavBar from '@/menuNavBar.js'

  // import CardBox from '@/components/CardBox.vue'

  const mainStore = useMainStore();
  const content=ref("");
  const popupElement = ref(null);

  const forceCloseAnnounce = (event) => {
  if (popupElement.value && !popupElement.value.contains(event.target) ) {
    mainStore.setIsAnnounce(false, null)
    console.log('force close announce')
  }
}

  watchEffect(() => {
  if(mainStore.IsAnnounce.state){
    content.value=menuNavBar.flatMap(item => {
    if (item.label==="announcement") {
      return item.menu.filter(subItem => subItem.title === mainStore.IsAnnounce.title)
                     .map(matchedItem => matchedItem.announceDetail);
    }
    }).filter(detail => detail != null); 
  }
});

  const closePopup = () => {
    mainStore.setIsAnnounce(false, null)
  };

  onMounted(() => {
    window.addEventListener('click', forceCloseAnnounce)
  
})

  onBeforeUnmount(() => {
   
      window.removeEventListener('click', forceCloseAnnounce)
  
  })
  </script>
  
  <style>
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    max-height: 50%;
    width: 50%;
    transform: translate(-50%, -50%);
    background-color: pink;
    border: 1px solid black;
    z-index: 1000;
    padding: 20px;
    overflow: auto;
  }
  
  .popup-content {
  }
  </style>
  