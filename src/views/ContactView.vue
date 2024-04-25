<template>
<LayoutAuthenticated>
    <SectionMain>
    <!-- ============================================================== -->
<!-- wrapper  -->
<!-- ============================================================== -->
<div class="dashboard-wrapper">
    <div class="dashboard-ecommerce">
        <div class="container-fluid dashboard-content ">

    <!-- ============================================================== -->
    <!-- Upload Form -->
    <!-- ============================================================== -->
    <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="section-block" id="basicform">
                            <h3 class="section-title"><span class='lang-en'>Contact Us</span><span class='lang-tw'>聯絡我們</span></h3>
                            <p><span class='lang-en'>Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</span><span class='lang-tw'>如果有任何問題，歡迎隨時與我們聯絡，將儘快回覆您。</span></p>
                        <div id='afterChangingPassword' style='display:none;'><span class='lang-en'>Your message has been sent.</span><span class='lang-tw'>您的訊息已送出。</span></div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <label for="inputText3" class="col-form-label"><span class='lang-en'>Name</span><span class='lang-tw'>聯絡人</span>*</label>
                                        <input id="contactname" type="text" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="inputEmail"><span class='lang-en'>Email address</span><span class='lang-tw'>電子信箱</span>*</label>
                                        <input id="inputEmail" type="email" placeholder="name@example.com" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1"><span class='lang-en'>Message</span><span class='lang-tw'>訊息內容</span>*</label>
                                        <textarea class="form-control" id="mailcontent" rows="5" style="margin-top: 0px; margin-bottom: 0px; height: 150px;"></textarea>
                                    </div>
                                </form>
                                <div style='text-align:right'>
                                <span id='missingtext' style='margin-right:20px;display:none;color:red'><span class='lang-en'>Imcomplete Values</span><span class='lang-tw'>請確認信件相關內容，再試一次。</span></span><span id='Completetext' style='margin-right:20px;display:none;color:rgba(0,150,0)'>Thank You! Your message has been sent</span>
                                <button class="btn btn-primary" onclick='SendEmail_SES()'><span class='lang-en'>Send</span><span class='lang-tw'>送出</span></button></div>
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

</script>
