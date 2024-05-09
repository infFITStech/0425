import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useAuthStore } from '@/stores/userStore.js';

import './css/main.css'

// Init Pinia
const pinia = createPinia()


// Create Vue app
const app=createApp(App)
app.use(pinia)

const parts= window.location.href.slice(1).split('/');
console.log(parts[parts.length-1]);

if(parts[parts.length-1]!=="iframe-container")
{
  const authStore = useAuthStore();
  await authStore.initializeAuthState();
}


app.use(router)
app.mount('#app')


// Init main store
const mainStore = useMainStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Default title tag
const defaultDocumentTitle = 'Admin One Vue 3 Tailwind'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
