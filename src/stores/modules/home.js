import { defineStore } from "pinia";
import { getHomeHotSuggest, getHomeCatgory, getHomeHouseList } from "@/services"

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [],
        currentPage: 1,
        houselist: [],
    }),

    actions: {
        async fetchHomeHotSuggests() {
            const res = await getHomeHotSuggest()
            this.hotSuggests = res.data
        },

        async fetchHomeCategory() {
            const res = await getHomeCatgory()
            this.categories = res.data
            console.log(this.categories);
        },

        async fetchHomeHouseList() {
            const res = await getHomeHouseList(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore