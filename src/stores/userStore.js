
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCognito } from '@/components/new/useCognito.js'

export const useAuthStore = defineStore('auth', () => {
  const cognitoUser = ref(null)
  const isLoggedIn = ref(false)
  const idToken = ref('')
  const MainConfig = ref(null)

  const login = async (username, password) => {
    const cognito = useCognito();
    try {
      await cognito.login(username, password);
      cognitoUser.value = cognito.cognitoUser.value;
      isLoggedIn.value = true;
      idToken.value = cognito.idToken;
      console.log("Logged in as", cognitoUser.value);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  const logout = async () => {
    console.log('Logout begin');
    const cognito = useCognito();
    try {
      await cognito.logout();
      cognitoUser.value = null;
      isLoggedIn.value = false;
      idToken.value = '';
      MainConfig.value = null;
      console.log('Logged out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const setMainConfig = (config) => {
    MainConfig.value = config;
  }

  return {
    cognitoUser,
    isLoggedIn,
    idToken,
    MainConfig,
    login,
    logout,
    setMainConfig
  }
});
