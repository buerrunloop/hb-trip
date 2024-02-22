<script setup>
import { storeToRefs } from 'pinia';
import useHomeStore from '@/stores/modules/home';
import HouseItemV3 from '@/components/house-item-v3/house-item-v3.vue';
import HouseItemV9 from '@/components/house-item-v9/house-item-v9.vue';

const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

</script>

<template>
    <div class="content">
        <h2>热门精选</h2>
        <div class="house">
            <template v-for="(item, index) in houselist" :key="item.data.houseId">
                <house-item-v3 v-if="item.discoveryContentType === 3" :houseData="item.data">
                    <span>{{ item.data.houseName }}</span>
                </house-item-v3>
                <house-item-v9 v-else-if="item.discoveryContentType === 9" :houseData="item.data" />
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    margin-top: 10px;
    padding: 10px;
    .house {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>