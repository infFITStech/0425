<script setup>
import { reactive, ref,markRaw} from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiAccount, mdiMail, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import UserCard from '@/components/UserCard.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TabCard from '@/components/TabCard.vue'
import OrderNow from '@/components/OrderNow.vue'
import OrderNext from '@/components/OrderNext.vue'
import { useAuthStore } from '@/stores/userStore.js';

const authStore = useAuthStore();
const mainStore = useMainStore()

const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail
})

const passwordForm = ref({
  password_current: '',
  password: '',
  password_confirmation: ''
})

const tabsForChild = ref([
  { name: '本期訂閱', component: markRaw(OrderNow)},
  { name: '下期訂閱', component: markRaw(OrderNext)}
])

const submitProfile = () => {
  mainStore.setUser(profileForm)
}

const submitPass = async () => {
  if (passwordForm.value.password !== passwordForm.value.password_confirmation) {
    alert("New passwords do not match.");
    return;
  }
  

  authStore.cognitoUser.changePassword(passwordForm.value.password_current, passwordForm.value.password, (err, result) => {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    alert("Password changed successfully!");
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
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
        <!-- title+button -->
        <!-- <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        /> -->
      </SectionTitleLineWithButton>

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

          <label class="block font-bold mb-2 text-lg">更改密碼</label>

          <BaseDivider />

          <FormField label="Current password" help="Required. Your current password">
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

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField label="Confirm password" help="Required. New password one more time">
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
              <BaseButton type="submit" color="info" label="Submit" />
            </BaseButtons>
          </template>
        </CardBox>

        <!-- 品牌帳單資訊 -->
        <CardBox>
          <label class="block font-bold mb-2 text-lg">品牌帳單資訊</label>
          <BaseDivider />

          <label v-if="true" class="block mb-2 text-lg">沒有服務費用</label>

          <table>
            <thead>
              <tr>
                <th>帳單號碼</th>
                <th>項目</th>
                <th>帳單周期</th>
                <th>帳單狀態</th>
                <th>該期總金額</th>
                <th>繳費期限</th>
              </tr>
            </thead>
            <tbody>
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
          <label class="block font-bold mb-2 text-lg">線下匯款</label>
          <BaseDivider />

          <FormField label="付款指示" >
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <div class="lg:col-span-1"> 
                <label class="block  mb-2 text-sm">帳戶:</label>
              </div>
              <div class="lg:col-span-2"> 
                <label class="block  mb-2 text-sm">123</label>
              </div>
              <div class="lg:col-span-1"> 

                <label class="block  mb-2 text-sm">銀行:</label>
              </div>
              <div class="lg:col-span-2"> 
                <label class="block  mb-2 text-sm">123</label>
              </div>
              <div class="lg:col-span-1"> 

                <label class="block  mb-2 text-sm">分行代碼:</label>
              </div>
              <div class="lg:col-span-2"> 
                <label class="block  mb-2 text-sm">123</label>
              </div>
              <div class="lg:col-span-1"> 

                <label class="block  mb-2 text-sm">銀行代碼:</label>
              </div>
              <div class="lg:col-span-2"> 
                <label class="block  mb-2 text-sm">123</label>
              </div>
              <div class="lg:col-span-1"> 

                <label class="block  mb-2 text-sm">帳戶號碼:</label>

              </div>
              <div class="lg:col-span-2"> 
                <label class="block  mb-2 text-sm">123</label>
              </div>
            

            </div>
          </FormField>

          <FormField label="付款完成後" >
            <label class="block  mb-2 text-sm">請通知線上顧問後五碼，或以電子郵件方式回覆至，<a href="mailto:example@example.com">example@example.com</a>
              我們會為您確認款項。</label>

          </FormField>

          
         


        </CardBox>
        <!-- 品牌帳單資訊 -->
        <CardBox>
          <TabCard :tabs="tabsForChild">
          </TabCard>
        </CardBox>
      </div>

    </SectionMain>
  </LayoutAuthenticated>
</template>

<style scoped>

</style>