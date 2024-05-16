<script setup>
// import { useMainStore } from '@/stores/main'
import UserAvatar from '@/components/UserAvatar.vue'
import { useAuthStore } from '@/stores/userStore.js';

const authStore = useAuthStore();
// const mainStore = useMainStore()
</script>

<template>
  <UserAvatar v-if="authStore.cognitoUser" :username="authStore.cognitoUser.username" :avatar="authStore.MainConfig.Logo">
    <slot />
  </UserAvatar>
</template>
