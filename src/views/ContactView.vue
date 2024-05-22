<template>
<LayoutAuthenticated>
    <SectionMain>
    <!-- ============================================================== -->
<!-- wrapper  -->
<!-- ============================================================== -->
<div class="">
    <SectionTitleLineWithButton :icon="mdiEmailOutline" title="聯絡我們" main>
        &nbsp;
        
    </SectionTitleLineWithButton>

    <!-- class="dashboard-wrapper" -->
    <div class="dashboard-ecommerce">
        <div class="container-fluid dashboard-content pt-0" >

    <!-- ============================================================== -->
    <!-- Upload Form -->
    <!-- ============================================================== -->
    <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="section-block" id="basicform">
                            <!-- <h3 class="section-title" style="font-size:1.75rem"><span class='lang-en'>Contact Us</span><span class='lang-tw'>聯絡我們</span></h3> -->
                            <p style="margin-bottom: 1rem;"><span class='lang-en'>Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</span><span class='lang-tw'>如果有任何問題，歡迎隨時與我們聯絡，將儘快回覆您。</span></p>
                        <div id='afterChangingPassword' style='display:none;'><span class='lang-en'>Your message has been sent.</span><span class='lang-tw'>您的訊息已送出。</span></div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <label for="inputText3" class="col-form-label"><span class='lang-en'>Name</span><span class='lang-tw'>聯絡人</span>*</label>
                                        <input id="contactname" v-model="name" type="text" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="inputEmail"><span class='lang-en'>Email address</span><span class='lang-tw'>電子信箱</span>*</label>
                                        <input id="inputEmail" v-model="email" type="email" placeholder="name@example.com" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1"><span class='lang-en'>Message</span><span class='lang-tw'>訊息內容</span>*</label>
                                        <textarea  v-model="message" class="form-control" id="mailcontent" rows="5" style="margin-top: 0px; margin-bottom: 0px; height: 150px;"></textarea>
                                    </div>
                                </form>
                                <div style='text-align:right'>
                                <span id='missingtext' style='margin-right:20px;display:none;color:red'><span class='lang-en'>Imcomplete Values</span><span class='lang-tw'>請確認信件相關內容，再試一次。</span></span><span id='Completetext' style='margin-right:20px;display:none;color:rgba(0,150,0)'>Thank You! Your message has been sent</span>
                                <button class="btn btn-primary" @click="sendEmail" :disabled="isSending"><span class='lang-en'>Send</span><span class='lang-tw'>送出</span></button></div>
                            </div>
                        </div>
                    </div>
    </div>
    <!-- ============================================================== -->
    <!-- end Form  -->
    <!-- ============================================================== -->
    
            
<!-- ============================================================== -->
<!-- end wrapper  -->
<!-- ============================================================== -->
</div>
    </div>

</div>
<!-- Optional JavaScript -->

    </SectionMain>
</LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import { ref } from 'vue'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import { useAuthStore } from '@/stores/userStore.js'
import { useCognito } from '@/components/new/useCognito.js';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import {  mdiEmailOutline } from '@mdi/js';

const name = ref("")
const email = ref("")
const message = ref("")
const isSending=ref(false)

const sendEmail = async() => {
isSending.value=true
//   const subject = document.getElementById('BrandName').innerText + "後台問題"
//   沒有brandname 先用authstore username代替看看
const authStore = useAuthStore();
const subject = authStore.cognitoUser.username + "後台問題"

  if (name.value !== "" && email.value.includes('@') && message.value !== "") {
    const cognito= useCognito();
    const c= cognito.getCognitoIdentityCredentials(authStore.idToken);
    const lambdaClient = new LambdaClient({ region: 'ap-northeast-2', credentials: c });
    const payload={
            Email: email,
            Name: name,
            Phone: "pass",
            Subject: subject,
            Message: message,
        };
    const invokeParams = {
            FunctionName: 'SendEmail',
            Payload: new TextEncoder().encode(JSON.stringify(payload)),
        };
    try {
            const data = await lambdaClient.send(new InvokeCommand(invokeParams));
            const pullResults = JSON.parse(new TextDecoder().decode(data.Payload))

            name.value = "";
            email.value = "";
            message.value = "";

            // 
            console.log(pullResults);
        } catch (error) {
            console.error(error);
        }
}
isSending.value=false
}


</script>

<style>
.card {
    background-color: white;
}

.dashboard-content{
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 30px;
    padding-bottom: 60px;
}
.form-group{
    margin-bottom: 1rem;
}
.col-form-label {
    padding-top: calc(.375rem + 1px);
    padding-bottom: calc(.375rem + 1px);
    margin-bottom: 0;
    font-size: inherit;
    line-height: 1.5;
}

.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.btn{
    border: 1px solid transparent;
}
label {
    display: inline-block;
    margin-bottom: .5rem;
}
</style>