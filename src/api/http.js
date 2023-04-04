import apiHandle from './index'
import qs from 'qs'
var formDataHeader = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
var formFileHeader = {
    'Content-Type': 'multipart/form-data'
}

function httpHandle(headers = {}, baseUrl = "", httpSuccessHandle, httpErrorHandle) {
    var api = apiHandle(headers, baseUrl, httpSuccessHandle, httpErrorHandle);
    var http = {
        get(url, data) { //get请求
            return api({
                url: url,
                method: 'get',
                params: data || {},
            })
        },
        getBlob(url, data) { //get请求
            return api({
                url: url,
                method: 'get',
                responseType: 'blob',
                params: data || {},
            })
        },
        post(url, data) { //post请求
            return api({
                url: url,
                method: 'post',
                data: data || {}
            })
        },
        put(url, data) { //put请求
            return api({
                url: url,
                method: 'put',
                data: data || {},
            })
        },
        patch(url, data) { //patch请求
            return api({
                url: url,
                method: 'patch',
                data: data || {},
            })
        },
        delete(url, data) { //delete请求
            return api({
                url: url,
                method: 'delete',
                params: data || {},
            })
        },
        postFormData(url, data) { //formdata的post请求
            return api({
                url: url,
                method: 'post',
                data: qs.stringify(data || {}),
                headers: formDataHeader
            })
        },
        postFile(url, data) { //formdata的post请求
            return api({
                url: url,
                method: 'post',
                data: data,
                headers: formFileHeader
            })
        },
        putFormData(url, data) { //formdata的put请求
            return api({
                url: url,
                method: 'put',
                data: qs.stringify(data || {}),
                headers: formDataHeader
            })
        },
        patchFormData(url, data) { //formdata的patch请求
            return api({
                url: url,
                method: 'patch',
                data: qs.stringify(data || {}),
                headers: formDataHeader
            })
        },
    }
    return http
}
export default httpHandle