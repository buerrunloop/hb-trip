<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)

</script>

<template>
    <div class="category">
        <template v-for="(item, index) in categories" :key="index">
            <div class="category-item">
                <img :src="item.pictureUrl" alt="">
                <div class="title">{{ item.title }}</div>
            </div>
        </template>
    </div>
</template>

<style lang="less" scoped>
    .category {
        display: flex;
        align-items: center;
        height: 60px;
        overflow-x: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        .category-item {
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            width: 70px;

            img {
                width: 40px;
            }

            .title {
                margin-top: 4px;
                font-size: 12px;
                color: #333;
            }
        }
    }
</style>