<script setup>
import { computed } from 'vue'
import { mdiCheckDecagram } from '@mdi/js'
import BaseLevel from '@/components/BaseLevel.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import CardBox from '@/components/CardBox.vue'
import PillTag from '@/components/PillTag.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import { useAuthStore } from '@/stores/userStore.js';

const authStore = useAuthStore();

const userName = computed(() => authStore.cognitoUser.username)

</script>

<template>
  <CardBox>
    <label class="block font-bold mb-0 text-lg">品牌基本資訊 及 方案時間</label>
    <BaseDivider />
    <BaseLevel type="justify-around lg:justify-center">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div class="lg:col-span-1"> 

            <UserAvatarCurrentUser class="lg:mx-12" />
        </div>

        <div class="lg:col-span-1"> 
          <div class="space-y-3 text-center md:text-left lg:mx-12">
            <!-- <div class="flex justify-center md:block">
              <FormCheckRadio
                v-model="userSwitchVal"
                name="notifications-switch"
                type="switch"
                label="Notifications"
                :input-value="true"
              />
            </div> -->
            <h1 class="text-2xl">
            <b>{{ userName }}</b>
            <br/>
             <label class="text-sm"> {{ authStore.MainConfig.BrandName }}</label>
            </h1>

            <div class="flex justify-center md:block">
              <PillTag label="啟用中" color="success" :icon="mdiCheckDecagram" />
            </div>
          </div>
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
