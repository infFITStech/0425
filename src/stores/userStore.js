
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
      // idToken.value = cognito.idToken;


      localStorage.setItem('idToken', idToken.value);
      localStorage.setItem('cognitoUser', JSON.stringify(cognitoUser.value));

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

      localStorage.removeItem('idToken');
      localStorage.removeItem('cognitoUser');
      localStorage.removeItem('UserName');
      console.log('Logged out', MainConfig.value);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const setMainConfig = (config) => {
    MainConfig.value = config;
  }

  const setIDToken = (token) => {
    idToken.value = token;
  }


//保存登入狀態(localstorage)
  const initializeAuthState = async() => {
    const cognito = useCognito();
    const token = localStorage.getItem('idToken');
    const userStr = localStorage.getItem('cognitoUser');


    if (token&&userStr) {//&&userStr
        idToken.value = token;
        cognitoUser.value = JSON.parse(userStr);
        try{
          await cognito.getCognitoIdentityCredentials(token);
          isLoggedIn.value = true;

        }
        catch(error){
          isLoggedIn.value = false;
          localStorage.removeItem('idToken');
          localStorage.removeItem('cognitoUser');
          localStorage.removeItem('UserName');
        }
        
        
        
    }
}

  return {
    cognitoUser,
    isLoggedIn,
    idToken,
    MainConfig,
    login,
    logout,
    setMainConfig,
    setIDToken,
    initializeAuthState
  }
});
