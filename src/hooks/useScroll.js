import { ref } from 'vue'

const useScroll = () => {
    const isReachBottom = ref(false)
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)

    window.addEventListener("scroll", () => {
        clientHeight.value = document.documentElement.clientHeight
        scrollTop.value = document.documentElement.scrollTop
        scrollHeight.value = document.documentElement.scrollHeight
        if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
            // homeStore.fetchHomeHouseList()
            isReachBottom.value = true
        }
    })

    return {
        isReachBottom,
        clientHeight,
        scrollTop,
        scrollHeight
    }
}

export default useScroll