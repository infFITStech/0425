import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
// import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/userStore.js';
// import { useMainStore } from '@/stores/main';
// const mainStore = useMainStore();

const routes = [
  {
    meta: {
      title: 'home'
    },
    path: '/',
    redirect: '/profile'
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },

  {//new added
    meta: {
      title: 'Contact'
    },
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },

  {
    meta: {
      title: 'Login',
      
      requiresAuth: false  
      
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')

  },

  {
    meta: {
      title: 'Route'
    },
    path: '/route',
    name: 'route',
    component: () => import('@/views/RouteView.vue')
  },
  {
    meta: {
      title: 'Product'
    },
    path: '/product',
    name: 'product',
    component: () => import('@/views/ProductView.vue')
  },
  {
    meta: {
      title: 'Theme'
    },
    path: '/theme',
    name: 'theme',
    component: () => import('@/views/ThemeView.vue')
  },
  {
    meta: {
      title: 'SupportQA',
    },
    path: '/supportQA',
    name: 'supportQA',
    component: () => import('@/views/SupportQAView.vue')
  },
  // {
  //   meta: {
  //     title: 'SignUp'
  //   },
  //   path: '/signup',
  //   name: 'signup',
  //   component: () => import('@/views/ThemeView.vue')
  // },
  {
    mata:{
      requiresAuth: false  
    },
    path: '/iframe-container',
    name: 'IframeContainer',
    component: () => import('@/components/IframeContainer.vue')
  }

]
// createWebHashHistory(),
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // mainStore.setIsLoading(true)
  const parts= window.location.href.slice(1).split('/');

  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth !== false);
  const isAuthenticated = authStore.isLoggedIn;
  if(parts[parts.length-1]=="iframe-container")
  {
    next(); 
  }
  else if (requiresAuth && !isAuthenticated) {
    next('/login'); 
    console.log("pppppppppppppppppppppppppppppppppppppppppppppp")
  } else {
    next(); 
  }
});

export default router



