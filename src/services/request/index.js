import axios from 'axios'

import { BASEURL, TIMEOUT } from './config'

class HBRequest {
    constructor(baseURL, timeout) {
        this.instance = axios.create({
            baseURL: BASEURL,
            timeout: TIMEOUT
        })
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    get(config) {
        return this.request({ ...config, method: "get" })
    }

    post(config) {
        return this.request({ ...config, method: "post" })
    }
}

export default new HBRequest(BASEURL, TIMEOUT)


