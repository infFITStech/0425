import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useAuthStore } from '@/stores/userStore.js';
import vTooltip from '@/v-tooltip.js';

// import './css/main.css'

// Init Pinia
const pinia = createPinia()


// Create Vue app
const app=createApp(App)
app.use(pinia)

const initApp = async () => {
  const parts = window.location.href.slice(1).split('/');
  console.log(parts[parts.length - 1]);

  if (parts[parts.length - 1] !== "iframe-container") {
    const authStore = useAuthStore();
    await authStore.initializeAuthState();
    await import('./css/main.css'); // 如果已經在上面導入，可以注釋掉這行
  }

  app.use(router)
  app.directive('tooltip', vTooltip);
  app.mount('#app')

  // Init main store
  const mainStore = useMainStore(pinia)

  // Fetch sample data
  mainStore.fetchSampleClients()
  mainStore.fetchSampleHistory()

  // Default title tag
  const defaultDocumentTitle = 'Dashboard'

  // Set document title from route meta
  router.afterEach((to) => {
    document.title = to.meta?.title
      ? `${to.meta.title} — ${defaultDocumentTitle}`
      : defaultDocumentTitle
  })
}



// Call the init function
initApp().catch(error => {
  console.error("Error during app initialization:", error);
});



