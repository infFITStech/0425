<script setup>
import { ref, onMounted } from 'vue';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
// import AWS from 'aws-sdk';
import { useCognito } from '@/components/new/useCognito.js';
// import router from '@/router/index.js';

import { useAuthStore } from '@/stores/userStore.js';

const authStore = useAuthStore();
// var Link = 'https://inffitsmanager.s3.ap-northeast-2.amazonaws.com/';


const {userPool, getcurrentloggedinsession } = useCognito();
const username = ref('');
const password = ref('');


//switch
function switchToVerificationCodeView() {
    $("#emailInput").hide();
    $("#userNameInput").hide();
    $("#passwordInput").hide();
    $("#confirmPasswordInput").hide();
    $("#logInButton").hide();
    $("#registerButton").hide();
    $("#bucketNameInput").hide();
    $("#verificationCodeInput").show();
    $("#verifyCodeButton").show();
    $("#listS3ObjectsButton").hide();
    $("#logOutButton").hide();
    $("#createAccount").hide();
    $("#Verification").show();

}
function switchToRegisterView() {
    $("#emailInput").show();
    $("#userNameInput").show();
    $("#passwordInput").show();
    $("#confirmPasswordInput").show();
    $("#logInButton").hide();
    $("#registerButton").show();
    $("#verificationCodeInput").hide();
    $("#verifyCodeButton").hide();
    $("#listS3ObjectsButton").hide();
    $("#bucketNameInput").hide();
    $("#logOutButton").hide();
    $("#backtoLogin").show();
    $("#createAccount").hide();
}
function switchToLogInView() {
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

// function switchToLoggedInView() {
////丟到usecognito ouo

function logMessage(message) {
  console.log(message); 
  return true;
}

/*
Starting point for user logout flow
*/
//丟到usecognito ouo
/*
Starting point for user login flow with input validation
*/

function logIn() {//丟到usecognito ouo
  $("#loader").show();

    if (!username.value || !password.value) {
        logMessage('Please enter Username and Password!');
        $('#logintext').show()
        $("#loader").hide();
        //                document.getElementById('logintext').innerHTML = 'Please enter Username and Password!'
    } else {
      // login(username.value, password.value);
      authStore.login(username.value, password.value)
      

      
    }
}


//event 
function enterlogin(e) {
e = e || window.event;
if (e.keyCode == 13) { logIn(); }
}
/*
Starting point for user registration flow with input validation
To Be Checked
*/
function register() {
switchToRegisterView();
getCurrentLoggedInSession()
var userData = {
    // Username: $('#userNameInput').val(),
    Username: username.value,
    Pool: userPool
};
authStore.cognitoUser = new CognitoUser(userData);


if (!$('#emailInput').val() || !username.value || !$('#passwordInput').val() || !$('#confirmPasswordInput').val()) {
    logMessage('Please fill all the fields!');
} else {
    if ($('#passwordInput').val() == $('#confirmPasswordInput').val()) {
        registerUser($('#emailInput').val(), username.value, $('#passwordInput').val());
    } else {
        logMessage('Confirm password failed!');
    }
}
}

/*
Starting point for user verification using AWS Cognito with input validation
*/
function verifyCode() {
if (!$('#verificationCodeInput').val()) {
    logMessage('Please enter verification field!');
} else {
    $("#loader").show();
    authStore.cognitoUser.confirmRegistration($('#verificationCodeInput').val(), true, function (err, result) {
        if (err) {
            logMessage(err.message);
        } else {
            console.log(result);
            logMessage('Successfully verified code!');
            switchToLogInView();
        }

        $("#loader").hide();
    });
}
}

/*
User registration using AWS Cognito
*/
function registerUser(email, username, password) {
var attributeList = [];

var dataEmail = {
    Name: 'email',
    Value: email
};
var dataName = {
    Name: 'name',
    Value: username
};

var attributeEmail = new CognitoUserAttribute(dataEmail);
var attributeusername = new CognitoUserAttribute(dataName);

attributeList.push(attributeEmail);
attributeList.push(attributeusername);
console.log(attributeList);
$("#loader").show();
userPool.signUp(username, password, attributeList, null, function (err, result) {
    if (err) {
        logMessage(err.message);
    } else {
      authStore.cognitoUser = result.user;
        logMessage('Registration Successful!');
        logMessage('Username is: ' +authStore.cognitoUser.getUsername());
        logMessage('Please enter the verification code sent to your Email.');
        switchToVerificationCodeView();
    }
    $("#loader").hide();
});
}

/*
Starting point for AWS List S3 Objects flow with input validation
*/
// function listS3Objects() {
// if (!$('#bucketNameInput').val()) {
//     logMessage('Please enter the name of the S3 Bucket!');
// } else {
//     $("#loader").show();
//     getAWSS3BucketObjects();
// }

// }

/*
This method will get temporary credentials for AWS using the IdentityPoolId and the Id Token recieved from AWS Cognito authentication provider.
*/
//function getCognitoIdentityCredentials  //丟到usecognito ouo



/*
This method will use AWS S3 SDK to get a list of S3 bucket object.
Before using this method, AWS Credentials must be set in AWS config.
*/
// function getAWSS3BucketObjects() {
// var s3 = new AWS.S3();

// var params = {
//     Bucket: $("#bucketNameInput").val()
// };

// s3.listObjects(params, function (err, data) {
//     if (err) logMessage(err.message);
//     else {
//         logMessage('');
//         logMessage('====== S3 Bucket Objects ======');
//         data.Contents.forEach(element => {
//             logMessage(element.Key);
//         });
//         logMessage('');
//     }

//     $("#loader").hide();
// });
// }

/*
If user has logged in before, get the previous session so user doesn't need to log in again.
*/

function getCurrentLoggedInSession() {

  $("#loader").show();
  if(getcurrentloggedinsession()==0)
  {
    $("#loader").hide();
        //redirect
        if (!window.location.href.includes("Login.html")) {
            $('#loader').show()
            window.location.href = 'Login.html';
        }
  }
  


}

//Login Initial
//移到usecognito ouo

//language//click已棄用 owo
onMounted(() => {
$('#langswitch').on('click', function () {
    var spanText = $('#langswitch').find('span')[0].innerText;
    if (spanText == '繁體中文') {
        $('#langswitch').find('span')[0].innerText = 'English';
    } else {
        $('#langswitch').find('span')[0].innerText = '繁體中文';
    }
    $(".lang-en").toggle();
    $(".lang-tw").toggle();
});

//error hide
$('.form-control').on('propertychange input', function () {
$('#logintext').hide();
})



//Start
$(function () {

//Initial
$('#loader').hide();
//Login
//obj.hasOwnProperty('referral')==Object.prototype.hasOwnProperty.call(obj, 'referral'); owo
if (Object.prototype.hasOwnProperty.call(getQueryParams(document.location.href), 'referral') && getQueryParams(document.location.href).referral == 'admin') {
    console.log(Object.prototype.hasOwnProperty.call(getQueryParams(document.location.href), 'referral'))
}

//Register
else if ( Object.prototype.hasOwnProperty.call(getQueryParams(document.location.href), 'platform') ) {
  
    if (getQueryParams(document.location.href).platform == 'EASYSTORE') {
        document.location.href = 'Register_form_easystore.html';
    }
    else if (getQueryParams(document.location.href).platform == 'CYBERBIZ') {
        document.location.href = 'Register_form_cyberbiz.html';
    }

}
})

  
}


)

//Register
function getQueryParams(url) {
const queryString = url.split('?')[1];
const params = {};
if (queryString) {
    queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });
}
return params;
}
function signup() {
if (window.location.href.includes('?')) {
    if ('platform' in getQueryParams(document.location.href)) {
        window.location.href = "signup?platform=" + getQueryParams(document.location.href).platform;
    } else {
        window.location.href = "/#/signup";
    }
}
else {
    window.location.href = "/#/signup";
}

}
</script>

<template>
    
<div class="body">
    <!-- Preloader -->
  <div class="preloader" id='loader'>
      <img src="@/img/inffits_f_black.png" >
      <div class="cssload-speeding-wheel"></div>
  </div>
  <!-- ============================================================== -->
  <!-- login page  -->
  <!-- ============================================================== -->
  <div class="splash-container" style='position:relative;'>
      <div class="card">
          <div class="card-header text-center">
              <div>
                  <img class="logo-img" src="https://myinffits.com/images/infFITS_Logo_2019_web.png" width='125px'
                      alt="logo" >
                  <div style='padding:8px;cursor:pointer;color:darkgray;position:absolute;right:0;top:0'
                      id='langswitch'><span>English</span> <i class="fa fa-angle-down"></i></div>
              </div>
              <span class="splash-description">
                  <span class='lang-en'>Log in to infFITS Admin</span>
                  <span class='lang-tw'>登入 infFITS Admin</span>
              </span>
          </div>
          <div class="card-body">
              <form>
                  <div class="form-group">
                      <input class="form-control form-control-lg" id="emailInput" type="text" placeholder="Email"
                          autocomplete="off" style='display:none'>
                  </div>
                  <div class="form-group">
                      <input v-model="username" class="form-control form-control-lg" id="userNameInput" type="text"
                          placeholder="Username" autocomplete="off" @keypress="enterlogin(event)">
                  </div>
                  <div class="form-group">
                      <input v-model="password" class="form-control form-control-lg" id="passwordInput" type="password"
                          placeholder="Password" @keypress="enterlogin(event)">
                  </div>
                  <div class="form-group">
                      <input class="form-control form-control-lg" id="confirmPasswordInput" type="password"
                          placeholder="Password" style='display:none'>
                  </div>
                  <div type="submit" id="registerButton" @click="register()" class="btn btn-primary btn-lg btn-block"
                      style='display:none'>註冊</div><br>
                  <div class="form-group" id="Verification" style='display:none'>
                      <input class="form-control form-control-lg" id="verificationCodeInput" type="text"
                          placeholder="Verification Code" /> <br>
                      <input class="btn btn-primary btn-lg btn-block" id="verifyCodeButton" type="button"
                          value="Verify" @click="verifyCode()">
                  </div>
                  <div class="form-group" id="logintext">請確認帳號密碼，再試一次。</div>
                  <div id="logInButton" @keypress="enterlogin(event) "
                  @click.prevent.stop="logIn"
                  @touchend.prevent.stop="logIn"
                      class="btn btn-primary btn-lg btn-block">
                      <span class='lang-en'>Log in</span>
                      <span class='lang-tw'>登入</span>
                  </div>
                  <div style="margin-top: 16px;text-align: center;">
                      <span class='lang-en'>Don't have an account? <a
                              style="color:black;font-weight:500;cursor:pointer" @click="signup()"
                              target="_blank">Sign Up</a></span>
                      <span class='lang-tw'>尚未擁有登入資訊? <a style="color:black;font-weight:500;cursor:pointer"
                        @click="signup()" target="_blank">申請服務</a></span>
                  </div>
              </form>
              <div class="card-footer bg-white p-0" id='backtoLogin' style='text-align: center;display:none'>
                  <div class="card-footer-item card-footer-item-bordered" @click="switchToLogInView()">
                      <div href="#" class="footer-link">Back to Login</div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class='footer' style="position:absolute;left:0;bottom:0;background:transparent">
      <div class="col-md-7">
          <p><a style="color:gray;font-weight:400;cursor:pointer"
                  href="https://www.inffits.com/Privacy.html"><span>隱私權聲明</span></a>&nbsp; | &nbsp;<a
                  style="color:gray;font-weight:400;cursor:pointer"
                  href="https://www.inffits.com/Terms.html"><span>使用條款</span></a></p>
      </div>
  </div>

</div>

</template>


<style scoped>

body{
    
    background-color: #efeff6;
}
.body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
 
  font-family: 'Circular Std Book';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #71748d;
  background-color: #efeff6;
  -webkit-font-smoothing: antialiased;
  height: 100%;
}
.preloader img{
  height: 15px;
}
.logo-img{
  display: inline-block;
}
.card-header{
  background-color: white;
}
.splash-container .card-header{
  padding: 0px;
}
.form-control-lg {
  padding: 12px;
}
.form-control{
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 1.42857143;
  color: #71748d;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d2d2e4;
  border-radius: 2px;
}
.card{
    width: 410px;
}
input{
    height: 46px;

}
form{
    min-height:220px
}
.card-body{
    min-height: 272px;
}
.splash-container {
    width: 100%;
    max-width: 450px;
    padding: 20px;
    margin: auto;
}
</style>