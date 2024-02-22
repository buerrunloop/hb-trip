import { defineStore } from "pinia";
import { getCityAll } from "@/services";

const useCityStore = defineStore("city", {
    state: () => ({
        allCities: {},
        currentCity: {
            cityName: "贵阳"
        }
    }),
    actions: {
        async fetchAllCityData() {
            const res = await getCityAll()
            this.allCities = res.data
        }
    }
})

export default useCityStore