<script setup>
  import { ref } from 'vue';
  import { getAssetURL } from '@/utils/load_assets.js'
  import tabbarData from '@/assets/data/tabbar';

  const currentIndex = ref(0)
</script>

<template>
  <div class="tab-bar">
      <van-tabbar v-model="currentIndex" active-color="#ff9854" inactive-color="#888888">
        <template v-for="(item, index) in tabbarData" :key="index">
          <van-tabbar-item :to="item.path">
            <template #icon>
              <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
              <img v-else :src="getAssetURL(item.imageActive)" alt="">
            </template>
            <span class="text">{{ item.text }}</span>
          </van-tabbar-item>
        </template>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
.tab-bar {
  img {
    height: 28px;
  }
}
</style>