import hbRequest from "../request"

export function getCityAll() {
    return hbRequest.get({
        url: "city/all"
    })
}