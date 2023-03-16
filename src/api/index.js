import axios from 'axios'
import {
    Message
} from 'element-ui'


function apiHandle(headers,baseUrl) {
    const api = axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        responseType: 'json'
    })

    api.interceptors.request.use(
        request => {
            if (headers) {
                for(var key in headers){
                    request.headers[key] = headers[key]
                }
            }
            return request
        }
    )

    api.interceptors.response.use(
        response => {
            return Promise.resolve(response.data)
        },
        error => {
            Message.error("数据请求失败")
            return Promise.reject(error)
        }
    )
    return api
}
export default apiHandle