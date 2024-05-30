import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

window.global ||= window;

export const useMainStore = defineStore('main', () => {
  

  const isFieldFocusRegistered = ref(false)
  const showContextMenu = ref(false)
  const clients = ref([])
  const history = ref([])
  //有沒有在顯示announce
  const path=ref("")
  const IsAnnounce=ref({state:false, title:""})
  const IsNotify=ref({state:false, title:""})
  function setIsAnnounce(state, title){
    IsAnnounce.value.state=state
    IsAnnounce.value.title=title

  }

  function setPath(state){
    path.value=state
  }

  function setShowContextMenu(state)
  {
    showContextMenu.value=state
  }

  function setIsNotify(state, title){
    IsNotify.value.state=state
    IsNotify.value.title=title
  }


  
  function fetchSampleClients() {
    axios
      .get(`data-sources/clients.json?v=3`)
      .then((result) => {
        clients.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  function fetchSampleHistory() {
    axios
      .get(`data-sources/history.json`)
      .then((result) => {
        history.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return {
    isFieldFocusRegistered,
    clients,
    history,
    fetchSampleClients,
    fetchSampleHistory,
    setIsAnnounce,
    IsAnnounce,
    IsNotify,
    setIsNotify,
    showContextMenu,
    setShowContextMenu,
    setPath,
    path
  }
})
