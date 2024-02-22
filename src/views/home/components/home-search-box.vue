<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { formatMonthDay, getDiffDay } from '@/utils/date.js'
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home'

const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("res: ", res);
    }, err => {
        console.log("err: ", err);
    }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    })
}

const router = useRouter()
const cityClick = () => {
    router.push({
        path: "/city"
    })
}

const cityStore = useCityStore()
const { currentCity } = cityStore

const startDate = new Date()
const endDate = new Date()

let startDateFormat = ref(formatMonthDay(startDate))
let endDateFormat = ref(formatMonthDay(endDate.setDate(endDate.getDate() + 1)))
const stayDay = ref(getDiffDay(startDate, endDate))

const showCalendar = ref(false)
const formatter = (day) => {
    if (day.type === 'start') {
        day.bottomInfo = '入住';
    } else if (day.type === 'end') {
        day.bottomInfo = '离店';
    }

    return day;
};

const dateClick = () => {
    showCalendar.value = true
}

const onConfirm = (date) => {
    const selectStartDate = date[0]
    const selectEndDate = date[1]
    startDateFormat = formatMonthDay(selectStartDate)
    endDateFormat = formatMonthDay(selectEndDate)
    stayDay.value = getDiffDay(selectStartDate, selectEndDate)
    showCalendar.value = false
}

const homeStore = useHomeStore()
const { hotSuggests, categories } = storeToRefs(homeStore)

</script>

<template>
    <div class="home-search">
        <!-- 位置 -->
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span>我的位置</span>
                <img src="@/assets/images/home/icon_location.png" alt="">
            </div>
        </div>

        <!-- 日期 -->
        <div class="date" @click="dateClick">
            <div class="start-date">
                <span>{{ startDateFormat }}</span>
                <span>入住</span>
            </div>
            <div class="stay-day">留{{ stayDay }}晚</div>
            <div class="end-date">
                <span>{{ endDateFormat }}</span>
                <span>离开</span>
            </div>
        </div>

        <!-- 精选建议 -->
        <div class="hot">
            <div>热门建议</div>
            <div class="suggests">
                <template v-for="(item, index) in hotSuggests" :key="index">
                    <span :style="{ color: item.tagText.color, background: item.tagText.background.color }" class="hot-item">{{ item.tagText.text }}</span>
                </template>
            </div>
        </div>

        <!-- 搜索 -->
        <div class="search">
            <div class="search-btn">立即搜索</div>
        </div>

        <!-- 日期选择器 -->
        <van-calendar 
            v-model:show="showCalendar" 
            type="range" 
            :formatter="formatter"
            :round="false"
            :show-confirm="false"
            @confirm="onConfirm"
        />
    </div>
</template>

<style lang="less" scoped>
.home-search {
    --van-calendar-popup-height: 100% !important;

    .location {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        height: 44px;

        .city {
            font-size: 15px;
            color: #333;
        }

        .position {
            display: flex;
            align-items: center;

            span {
                font-size: 15px;
                color: #666;
            }

            img {
                position: relative;
                top: -2px;
                margin-left: 8px;
                width: 20px;
            }
        }
    }

    .date {
        display: flex;
        padding: 0 10px;
        justify-content: space-between;

        .start-date,
        .end-date {
            display: flex;
            flex-direction: column;
        }
    }

    .hot {
        padding: 10px 10px;

        .suggests {
            .hot-item {
                display: inline-block;
                margin: 4px;
                padding: 4px 8px;
                border-radius: 2px;
                font-size: 12px;
                text-align: center;
            }
        }
    }

    .search-btn {
        margin: 10px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: #ff9854;
        font-size: 16px;
        color: #fff;
        border-radius: 4px;
    }
}
</style>