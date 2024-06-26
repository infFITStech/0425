import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useMainStore } from '@/stores/main.js'
import { useAuthStore } from '@/stores/userStore.js';
import vTooltip from '@/v-tooltip.js';

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
// import './css/main.css'

// Init Pinia
const pinia = createPinia()


// Create Vue app
const app=createApp(App)
app.use(pinia)
app.use(Toast,  {
  transition: "Vue-Toastification__fade",
  maxToasts: 3,
  newestOnTop: true
});

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
  const defaultDocumentTitle = "infFITS Manager"

  // Set document title from route meta
  router.afterEach((to) => {
    
    document.title = to.meta?.title
      ? `${defaultDocumentTitle} — ${to.meta.title}`
      : defaultDocumentTitle
  })

  
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
    // NProgress.set(0.4);     // Sorta same as .start()

  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})




}



// Call the init function
initApp().catch(error => {
  console.error("Error during app initialization:", error);
});



