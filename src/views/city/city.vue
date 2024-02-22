<script setup>
    import { ref, computed } from "vue";
    import { useRouter } from "vue-router";
    import { storeToRefs } from "pinia";
    import  useCityStore  from "@/stores/modules/city"

    import CityGroup from './components/city-group.vue'

    // 搜索框
    const router = useRouter()
    const searchValue = ref("")
    
    const cancelClick = () => {
        router.back()
    }

    // tab
    const tabActive = ref(0)

    // 获取城市数据
    const cityStore = useCityStore()
    cityStore.fetchAllCityData()
    const { allCities } = storeToRefs(cityStore)

    // 获取tab切换城市数据
    const currentCityGroup = computed(() => allCities.value[tabActive.value])

</script>

<template>
    <div class="city">
        <!-- 顶部搜索及tab切换 -->
        <div class="top">
            <van-search
                :show-action="true"
                v-model="searchValue"
                shape="round"
                placeholder="城市/区域/位置"
                @cancel="cancelClick"
            />

            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        
        <!-- 城市列表数据 -->
        <div class="content">
            <template v-for="(value, key, index) in allCities" :key="index">
                <city-group v-show="key === tabActive" :groupData="value"></city-group>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .city {
        --van-tabs-line-height: 36px !important;

        .top {
            position: relative;
            z-index: 9;
        }
        .content {
            overflow-y: auto;
            height: calc(100vh - 90px);
        }
    }
</style>