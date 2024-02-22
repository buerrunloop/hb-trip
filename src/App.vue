<script setup>
  import TabBar from '@/components/tabbar/tabbar.vue';
  import { useRoute } from "vue-router";
  const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view></router-view>
    <tab-bar v-if="!route.meta.hiddenTabbar"></tab-bar>
  </div>
</template>

<style scoped>

</style>

<script setup>

</script>
