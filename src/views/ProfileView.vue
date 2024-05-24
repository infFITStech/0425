<script setup>
import { ref,markRaw} from 'vue'
import { mdiAccount, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
// import FormFilePicker from '@/components/FormFilePicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import UserCard from '@/components/UserCard.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TabCard from '@/components/TabCard.vue'
import OrderNow from '@/components/OrderNow.vue'
import OrderNext from '@/components/OrderNext.vue'
import { useAuthStore } from '@/stores/userStore.js';
import BreadCrumb from '@/components/BreadCrumb.vue';


const authStore = useAuthStore();

const billingInform= ref(authStore.MainConfig.Billing["0"].Item)

const passwordForm = ref({
  password_current: '',
  password: '',
  password_confirmation: ''
})

const tabsForChild = ref([
  { name: '本期訂閱', component: markRaw(OrderNow)},
  { name: '下期訂閱', component: markRaw(OrderNext)}
])


const submitPass = async () => {
  if (passwordForm.value.password !== passwordForm.value.password_confirmation) {
    alert("請確認兩次輸入的新密碼相同");
    return;
  }
  

  authStore.cognitoUser.changePassword(passwordForm.value.password_current, passwordForm.value.password, (err, result) => {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    alert("密碼已修改成功");
    passwordForm.value = {
      password_current: '',
      password: '',
      password_confirmation: ''
    }
    // 可以在這裡重置表單或進行其他操作
  });
};
</script>

<template>
  <LayoutAuthenticated>
    <!-- {{billingInform}} -->
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="商家設定" main>
        &nbsp;
      </SectionTitleLineWithButton>
      
      <!-- <BreadCrumb>
      </BreadCrumb> -->

      

    <div style="padding-left: 15px; padding-right: 15px;">
      <UserCard class="mb-6" /> 
      <!-- user img and inform -->

    
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- change profile -->
        <!-- <CardBox is-form @submit.prevent="submitProfile">
          <FormField label="Avatar" help="Max 500kb">
            <FormFilePicker label="Upload" />
          </FormField>

          <FormField label="Name" help="Required. Your name">
            <FormControl
              v-model="profileForm.name"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="E-mail" help="Required. Your e-mail">
            <FormControl
              v-model="profileForm.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Submit" />
              <BaseButton color="info" label="Options" outline />
            </BaseButtons>
          </template>
        </CardBox> -->

        <!-- change password -->
        <CardBox is-form @submit.prevent="submitPass">

          <label class="block font-bold mb-2 text-lg" >更改密碼</label>

          <BaseDivider />

          <!-- help="請輸入密碼" -->
          <FormField label="現在密碼" >
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />

          <FormField label="更新密碼" >
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField label="確認更新密碼" >
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="contrast" label="Submit" />
            </BaseButtons>
          </template>
        </CardBox>

        <!-- 品牌帳單資訊 -->
        <CardBox>
          <label class="block font-bold mb-2 text-lg"  >品牌帳單資訊</label>
          <BaseDivider />

          <label v-if="!billingInform.length" class="block mb-2 text-lg">沒有服務費用</label>

          <table>
            <thead class="TH">
              <tr>
                <th>項目名稱</th>
                <th>描述</th>
                <th>數量</th>
                <th>單位</th>
                <th>金額</th>
                <!-- <th>繳費期限</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in billingInform" :key="item['#']">
                <td class="TD" data-label="項目名稱">{{ item['項目名稱'] }}</td>
                <td class="TD" data-label="描述">{{ item['描述'] }}</td>
                <td class="TD" data-label="數量">{{ item['數量'] }}</td>
                <td class="TD" data-label="單位">{{ item['單位'] }}</td>
                <td class="TD" data-label="金額">{{ item['金額'] ? item['金額'] : '-' }}</td>
              </tr>
            </tbody>
          </table>
        </CardBox>
      </div>

      <BaseDivider />

        <SectionTitleLineWithButton  title="匯款資訊" > &emsp;</SectionTitleLineWithButton>

        <!-- <label class="block font-bold mb-2 text-lg"></label> -->


      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 線下匯款 -->
        <CardBox>
          <label class="block font-bold mb-2 text-lg" >轉帳匯款</label>
          <BaseDivider />

          <FormField label="付款指示" >
          
            <div class="grid grid-cols-1 md:grid-cols-3 lg:gap-6 mt-3">

              <div class="md:col-span-1"> 
                <label class="block  mb-2 text-sm">【戶名】</label>
              </div>
              <div class="md:col-span-2"> 
                <label class="block  mb-2 text-sm">飛德科技有限公司</label>
              </div>
              <div class="md:col-span-1"> 

                <label class="block  mb-2 text-sm">【銀行】</label>
              </div>
              <div class="md:col-span-2"> 
                <label class="block  mb-2 text-sm">中國信託商業銀行</label>
              </div>
              <div class="md:col-span-1"> 

                <label class="block  mb-2 text-sm">【分行代碼】</label>
              </div>
              <div class="md:col-span-2"> 
                <label class="block  mb-2 text-sm">3267</label>
              </div>
              <div class="md:col-span-1"> 

                <label class="block  mb-2 text-sm">【銀行代碼】</label>
              </div>
              <div class="md:col-span-2"> 
                <label class="block  mb-2 text-sm">822</label>
              </div>
              <div class="md:col-span-1"> 

                <label class="block  mb-2 text-sm">【帳號】</label>

              </div>
              <div class="md:col-span-2"> 
                <label class="block  mb-2 text-sm">495540641709</label>
              </div>
            

            </div>
          </FormField>

          <FormField label="付款完成後" >
            <label class="block  mb-2 text-sm">請通知相關窗口，或以電子郵件回覆至 <a href="mailto:contact@inffits.com">contact@inffits.com</a> 我們將盡快為您確認款項。</label>

          </FormField>

          
         


        </CardBox>
        <!-- 品牌帳單資訊 -->
        <!-- 本期訂閱.下期訂閱.擴充功能.購買方案... -->
        <!-- <CardBox>
          <TabCard :tabs="tabsForChild">
          </TabCard>
        </CardBox> -->
      </div>
    </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<style scoped>

</style>