// src/composables/useCognito.js
import { ref } from 'vue';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
// import AWS from 'aws-sdk';
// import { CognitoUserPool, CognitoUser, AuthenticationDetails } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } from '@aws-sdk/client-cognito-identity';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

import $ from 'jquery';
import router from '@/router/index.js';
import { useAuthStore } from '@/stores/userStore.js';

const userPoolId = 'ap-northeast-2_XwGhc4iIF';
const clientId = '6k87jd499jad39r5kpv1l5vhfv';
var region = 'ap-northeast-2';

const poolData = {
  UserPoolId: userPoolId,
  ClientId: clientId
};

export function useCognito() {
    var userPool = new CognitoUserPool(poolData);
    const cognitoUser = ref(null);
    var idToken = '';
    var identityPoolId;
    var MainConfig = null; 
     
    const authenticateUserPromise=(cognitoUser, authDetails)=> {
        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authDetails, {
                onSuccess: result => resolve(result),
                onFailure: err => reject(err),
            });
        });
    }

    const logMessage=(message)=>{
        console.log(message); 
        return true
    }
    const login = async (username, password) => {
        
        var authenticationData = {
            Username: username,
            Password: password
        };

        var authenticationDetails = new AuthenticationDetails(authenticationData);                                                                            
        userPool = new CognitoUserPool(poolData);
        cognitoUser.value = userPool.getCurrentUser();

        var userData = {
            Username: username,
            Pool: userPool
        };
        cognitoUser.value = new CognitoUser(userData);
        //try本來不再這
        try {
            localStorage.setItem('UserName', cognitoUser.value.username);
        } catch (e) {
            console.log('NOLS')
        }

        try {
            const result = await authenticateUserPromise(cognitoUser.value , authenticationDetails);
            
            $('#logintext').hide();
                // switchToLoggedInView();
            idToken = result.getIdToken().getJwtToken();

            const authStore = useAuthStore();
            authStore.setIDToken(idToken);
            
            await getCognitoIdentityCredentials(idToken);
            // console.log('Credentials:', credentials);

          
    
            //redirect
            //try本來在這
            //ouo ??
            // window.location.href = '/';
            logMessage('Logged in!');

            const redirectRoute = router.currentRoute.value.query.redirect || '/';
            router.replace(redirectRoute);
            // router.replace('/')
        } catch (e) {
            console.log('Login failed:', e);
            

            $('#logintext').show();
            $("#loader").hide();
            throw e; 
        }

        // cognitoUser.value.authenticateUser(authenticationDetails, {
        //     onSuccess: function (result) {
        //         logMessage('Logged in!');
        //         $('#logintext').hide()
        //         // switchToLoggedInView();
        //         idToken = result.getIdToken().getJwtToken();
        //         getCognitoIdentityCredentials();
        //         //redirect
        //         try {
        //             localStorage.setItem('UserName', cognitoUser.value.username);
        //         } catch (e) {
        //             console.log('NOLS')
        //         }
        //         //ouo ??
        //         // window.location.href = '/';
        //         router.replace('/')


        //     },

        //     onFailure: function (err) {
        //         logMessage(err.message);
        //         $('#logintext').show();
        //         $("#loader").hide();
        //     },
        // });
    
    };

    const getCognitoIdentityCredentials= async (idToken) =>{

        identityPoolId = 'ap-northeast-2:67aa8e60-64f2-480a-98a9-2a281e865beb';
        // AWS.config.region = region;
        const client = new CognitoIdentityClient({ region });
        const credentialsProvider = fromCognitoIdentityPool({
            client: client,
            identityPoolId: identityPoolId,
            logins: {
                ['cognito-idp.' + region + '.amazonaws.com/' + userPoolId]: idToken
            }
        });

        // var loginMap = {};
        // loginMap['cognito-idp.' + region + '.amazonaws.com/' + userPoolId] = idToken;
        // console.log(loginMap);
        try {
            const credentials = await credentialsProvider();

            console.log('AWS Access Key:', credentials.accessKeyId);
            console.log('AWS Secret Key:', credentials.secretAccessKey);
            console.log('AWS Session Token:', credentials.sessionToken);
            await Initial(credentials);
            console.log("initial finsished", MainConfig);
            // You might want to continue your application logic here
            // For example:
            // window.location.href = 'product.html';
            return credentials;
        } catch (err) {
            console.error(err.message);
            throw err; // Rethrow or handle error appropriately
        }
        //Lambda getIdentity

        
}

const Initial=async (c)=>{

    const lambdaClient = new LambdaClient({ region: 'ap-northeast-2', apiVersion: '2015-03-31', credentials: c });
    const cognitoUsername = localStorage.getItem('UserName'); // Ensure cognitoUser is defined and accessible
    var PayloadString = '{"Brand":"'+cognitoUsername+'"}';
    
    const invokeParams = {
        FunctionName: 'inffits_Manager_Authorization',
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: PayloadString,
      };
      try {

        let data = await lambdaClient.send(new InvokeCommand(invokeParams));
        let pullResults = JSON.parse(new TextDecoder("utf-8").decode(data.Payload));

        let infManID = pullResults;
    
        console.log('infManID : ' + infManID);
    
        PayloadString = JSON.stringify({ Brand: cognitoUsername, key: infManID, filename: "config.json" });
    
        const getObjectParams = {
          FunctionName: 'inffits_Manager_S3_GetObject',
          InvocationType: 'RequestResponse',
          LogType: 'Tail',
          Payload: PayloadString,
        };
    
        data = await lambdaClient.send(new InvokeCommand(getObjectParams));
        pullResults = JSON.parse(new TextDecoder("utf-8").decode(data.Payload));
        const authStore = useAuthStore();
        MainConfig=pullResults;

        authStore.setMainConfig(pullResults);

        if(!pullResults.mkt){
            throw new Error('MKT is false, login aborted');
        }

        return pullResults;
      } catch (error) {
        console.error(error);
        throw error;
      }
}



    const logout = async () => {        
        if (cognitoUser.value != null) {
            $("#loader").show();
            cognitoUser.value.signOut();
            switchToLogInView();
            logMessage('Logged out!');
            $("#loader").hide();
        }
        // window.location.href = '/#/login';
        // router.replace('/login')
        router.replace({ path: '/login', query: { redirect: window.location.hash.slice(1) } });
    };

    const switchToLogInView=()=> {
        $("#userNameInput").val('');
        $("#passwordInput").val('');
        $("#emailInput").hide();
        $("#userNameInput").show();
        $("#passwordInput").show();
        $("#confirmPasswordInput").hide();
        $("#logInButton").show();
        $("#registerButton").show();
        $("#verificationCodeInput").hide();
        $("#verifyCodeButton").hide();
        $("#listS3ObjectsButton").hide();
        $("#bucketNameInput").hide();
        $("#logOutButton").hide();
        $("#registerButton").hide();
        $("#createAccount").show();
        $("#backtoLogin").hide();
    }

    const getcurrentloggedinsession=()=> {

        
          userPool = new CognitoUserPool(poolData);
          cognitoUser.value = userPool.getCurrentUser();
          if (cognitoUser.value != null) {
              cognitoUser.value.getSession(function (err, session) {
                  if (err) {
                      logMessage(err.message);
                  } else {
                      // console.log(session);
                      logMessage('Session found! Logged in.');
                      // switchToLoggedInView();
                      idToken = session.getIdToken().getJwtToken();
                      getCognitoIdentityCredentials(idToken);
                      
                  }
              });
              return 1;
          } else {
              logMessage('Session expired. Please log in again.');
              return 0;
          }
      
      
      }


   return { MainConfig,logout, userPool,getcurrentloggedinsession, idToken , login, cognitoUser, identityPoolId, Initial, switchToLogInView, logMessage , getCognitoIdentityCredentials};

}
