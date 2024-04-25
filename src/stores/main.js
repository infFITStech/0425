import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

window.global ||= window;

export const useMainStore = defineStore('main', () => {
  const userName = ref('John Doe')
  const userEmail = ref('doe.doe.doe@example.com')

  const userAvatar = computed(
    () =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail.value.replace(
        /[^a-z0-9]+/gi,
        '-'
      )}`
  )

  const isFieldFocusRegistered = ref(false)

  const clients = ref([])
  const history = ref([])
  //有沒有在顯示announce
  const IsAnnounce=ref({state:false, title:""})
  const IsNotify=ref({state:false, title:""})
  function setIsAnnounce(state, title){
    IsAnnounce.value.state=state
    IsAnnounce.value.title=title

  }

  function setIsNotify(state, title){
    IsNotify.value.state=state
    IsNotify.value.title=title
  }


  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name
    }
    if (payload.email) {
      userEmail.value = payload.email
    }
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
    userName,
    userEmail,
    userAvatar,
    isFieldFocusRegistered,
    clients,
    history,
    setUser,
    fetchSampleClients,
    fetchSampleHistory,
    setIsAnnounce,
    IsAnnounce,
    IsNotify,
    setIsNotify
  }
})
