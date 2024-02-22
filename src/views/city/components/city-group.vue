<script setup>
    import { computed } from 'vue'
    import { useRouter } from "vue-router";
    import useCityStore from '@/stores/modules/city';

    const props = defineProps({
        groupData: {
            type: Object,
            default: () => ({})
        }
    })

    const indexList = computed(() => {
        const list = props.groupData.cities.map(item => item.group)
        list.unshift("#")
        return list
    })

    const router = useRouter()
    const cityStore = useCityStore()
    const itemClick = (city) => {
        cityStore.currentCity = city
        router.back()
    }
</script>

<template>
    <div class="city-group">
        <van-index-bar highlight-color="#ff9854" :index-list="indexList">
            <van-index-anchor index="热门" />
            <div class="hot">
                <template v-for="(item, index) in groupData?.hotCities" :key="index">
                    <div class="hot-name" @click="itemClick(item)">{{ item.cityName }}</div>
                </template>
            </div>
            <template v-for="(item, index) in groupData?.cities" :key="index">
                <van-index-anchor :index="item.group" />
                <template v-for="(cityItem, cityIndex) in item.cities" :key="cityIndex">
                    <van-cell :title="cityItem.cityName" @click="itemClick(cityItem)" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<style lang="less" scoped>
    .city-group {
        .hot {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            
            .hot-name {
                margin: 6px;
                width: 70px;
                height: 28px;
                line-height: 28px;
                font-size: 12px;
                color: #333;
                text-align: center;
                background-color: #fff4ec;
                border-radius: 4px;
            }
        }
    }
</style>