<script setup>
import { watch, ref } from 'vue';
import useHomeStore from '@/stores/modules/home'
import HomeNavBar from './components/home-nav-bar.vue';
import HomeSearchBox from './components/home-search-box.vue'
import HomeCategory from './components/home-category.vue'
import HomeContent from './components/home-content.vue';
import useScroll from '@/hooks/useScroll'

const homeStore = useHomeStore()
homeStore.fetchHomeHotSuggests()
homeStore.fetchHomeCategory()
homeStore.fetchHomeHouseList()

const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHomeHouseList().then(res => {
      isReachBottom.value = false
    })
  }
})

const showSearchBar = ref(false)
watch(scrollTop, (newValue) => {
  console.log("newValue: ", newValue);
  if (newValue > 100) {
    showSearchBar.value = true
  } else {
    showSearchBar.value = false
  }
})
</script>

<template>
  <div class="home">
    <div class="search-bar" v-if="showSearchBar">我是搜索框</div>
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/images/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-category />
    <home-content />
  </div>
</template>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;

  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    height: 64px;
    background-color: pink;
  }

  .banner {
    img {
      width: 100%;
    }
  }
}
</style>