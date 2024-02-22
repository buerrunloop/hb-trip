import hbRequest from "../request"

export function getHomeHotSuggest() {
    return hbRequest.get({
        url: "home/hotSuggests"
    })
}

export function getHomeCatgory() {
    return hbRequest.get({
        url: "home/categories"
    })
}

export function getHomeHouseList(currentPage) {
    return hbRequest.get({
        url: "home/houselist",
        params: {
            page: currentPage
        }
    })
}