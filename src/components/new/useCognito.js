// src/composables/useCognito.js
import { ref } from 'vue';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
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
        
        try {
            const result = await authenticateUserPromise(cognitoUser.value , authenticationDetails);
            
            $('#logintext').hide();
                // switchToLoggedInView();
            idToken = result.getIdToken().getJwtToken();
    
            await getCognitoIdentityCredentials();
            // console.log('Credentials:', credentials);

    
            //redirect
            try {
                localStorage.setItem('UserName', cognitoUser.value.username);
                
            } catch (e) {
                console.log('NOLS')
            }
            //ouo ??
            // window.location.href = '/';
            logMessage('Logged in!');
            router.replace('/')
        } catch (e) {
            console.log('Login failed:', e);
            $('#logintext').show();
            $("#loader").hide();
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

    const getCognitoIdentityCredentials=() =>{

        identityPoolId = 'ap-northeast-2:67aa8e60-64f2-480a-98a9-2a281e865beb';
        AWS.config.region = region;
        var loginMap = {};
        loginMap['cognito-idp.' + region + '.amazonaws.com/' + userPoolId] = idToken;
        console.log(loginMap);
        
        //Lambda getIdentity
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: identityPoolId,
            Logins: loginMap
        });

        AWS.config.credentials.clearCachedId();
        return new Promise((resolve, reject) =>{
            AWS.config.credentials.get(async function (err) {
                if (err) {
                    console.log(err.message);
                    reject(err);
                }
                else {
                    await Initial();
                    console.log("initial finsished", MainConfig);


                    console.log('AWS Access Key: ' + AWS.config.credentials.accessKeyId);
                    console.log('AWS Secret Key: ' + AWS.config.credentials.secretAccessKey);
                    console.log('AWS Session Token: ' + AWS.config.credentials.sessionToken);
                    // 這裡使用 JavaScript 跳轉到下一個頁面的示例
                    resolve(AWS.config.credentials);
                    // window.location.href = 'product.html';
                    
                }
            });
        });
        
}

const Initial=async ()=>{
    return new Promise((resolve, reject) => {
    
    var Payload_string = '{"Brand":"'+cognitoUser.value.username+'"}';
    var lambda = new AWS.Lambda({region: 'ap-northeast-2', apiVersion: '2015-03-31'});
    var pullParams = {
                  FunctionName : 'inffits_Manager_Authorization',
                  InvocationType : 'RequestResponse',
                  LogType : 'Tail',
                  Payload : Payload_string
    };
    var pullResults;
    var infManID;
    lambda.invoke(pullParams, function(error, data) {
        
      if (error) {
          prompt(error);
          reject(error);
        } else {
            pullResults = JSON.parse(data.Payload);
            console.log(pullResults);
            infManID = pullResults;
            console.log('infManID : '+  infManID);
            var Payload_string = '{"Brand":"'+cognitoUser.value.username+'","key":"'+infManID+'","filename":"config.json"}';
            var lambda = new AWS.Lambda({region: 'ap-northeast-2', apiVersion: '2015-03-31'});
            var pullParams = {
                FunctionName : 'inffits_Manager_S3_GetObject',
                InvocationType : 'RequestResponse',
                LogType : 'Tail',
                Payload : Payload_string
            };
            lambda.invoke(pullParams, function(error, data) {
                if (error) {
                prompt(error);
                reject(error);
                } else {
                    pullResults = JSON.parse(data.Payload);
                    MainConfig = pullResults
                    // console.log(MainConfig)
                    const authStore = useAuthStore();

                    authStore.setMainConfig(MainConfig);
                    resolve(pullResults); 
                }
                
            })
            
        }
    
   })

    })

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
        router.replace('/login')
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
                      getCognitoIdentityCredentials();
                      
                  }
              });
              return 1;
          } else {
              logMessage('Session expired. Please log in again.');
              return 0;
          }
      
      
      }


   return { MainConfig,logout, userPool,getcurrentloggedinsession, idToken , login, cognitoUser, identityPoolId, Initial, switchToLogInView, logMessage };

}
