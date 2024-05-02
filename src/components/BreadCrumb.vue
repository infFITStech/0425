<template>
  <nav aria-label="breadcrumb">
    <ol>
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <router-link v-if="breadcrumb.link" :to="breadcrumb.link">{{ breadcrumb.name }}</router-link>
        <span v-else>{{ breadcrumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'BreadCrumb',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const breadcrumbs = [];

    for (let matched of route.matched) {
      breadcrumbs.push({
        name: matched.name,
        link: matched.path !== route.path ? matched.path : null,
      });
    }

    return { breadcrumbs };
  },
};
</script>
