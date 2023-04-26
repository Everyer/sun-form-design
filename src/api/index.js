import axios from 'axios'
import {
    Message
} from 'element-ui'


function apiHandle(headers, baseUrl, httpSuccessHandle, httpErrorHandle, httpBeforeSendHandle) {
    const api = axios.create({
        baseURL: baseUrl,
        timeout: 1000000,
        responseType: 'json'
    })

    api.interceptors.request.use(
        request => {
            if (headers) {
                for (var key in headers) {
                    request.headers[key] = headers[key]
                }
            }
            if(request.params){
                
            }
            return request
        }
    )

    api.interceptors.response.use(
        response => {
            if (httpSuccessHandle) {
                httpSuccessHandle(response.data)
            }
            return Promise.resolve(response.data)
        },
        error => {
            if (httpErrorHandle) {
                httpErrorHandle(error)
            }
            Message.error("数据请求失败")
            return Promise.reject(error)
        }
    )
    return api
}
export default apiHandle