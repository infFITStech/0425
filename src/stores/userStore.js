import { defineStore } from 'pinia';
import { useCognito } from '@/components/new/useCognito.js'; 

export const useAuthStore = defineStore('auth', {
    state: () => ({
        cognitoUser: null,
        isLoggedIn: false,
        idToken: '',
        MainConfig: null
    }),
    actions: {
        async login(username, password) {
            const cognito = useCognito();
            try {
                await cognito.login(username, password);

                this.cognitoUser = cognito.cognitoUser.value;
                this.isLoggedIn = true;
                this.idToken = cognito.idToken;
                // this.MainConfig = cognito.MainConfig
                console.log("hi",this.cognitoUser)
            } catch (error) {
                console.log('Login failed:', error);
            }
        },
        async logout() {
            console.log('Logout begin');
            const cognito = useCognito();
            await cognito.logout();
            this.$reset(); // Resets to initial state
        },

        setMainConfig(config){
            this.MainConfig = config
        }

        
    }
});
