import apiHandle from './index'
import qs from 'qs'
var formDataHeader = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
var formFileHeader = {
    'Content-Type': 'multipart/form-data'
}
var jsonHeader = {
    'Content-Type': 'application/json'
}

function httpHandle(headers = {}, baseUrl = "", httpSuccessHandle, httpErrorHandle, httpBeforeSendHandle) {
    var api = apiHandle(headers, baseUrl, httpSuccessHandle, httpErrorHandle, httpBeforeSendHandle);

    function paramHandle(data) {
        if(data instanceof Array){
            return data;
        }
        if (typeof data !== 'object') {
            
            return data
        }
        if (data) {
            return Object.assign({}, httpBeforeSendHandle ? httpBeforeSendHandle() || {} : {}, data)
        } else {
            return httpBeforeSendHandle()
        }
    }
    var http = {
        get(url, data) { //get请求
            return api({
                url: url,
                method: 'get',
                params: paramHandle(data),
            })
        },
        getBlob(url, data) { //get请求
            return api({
                url: url,
                method: 'get',
                responseType: 'blob',
                params: paramHandle(data),
            })
        },
        post(url, data) { //post请求
            return api({
                url: url,
                method: 'post',
                data: paramHandle(data),
                headers: jsonHeader
            })
        },
        put(url, data) { //put请求
            return api({
                url: url,
                method: 'put',
                data: paramHandle(data)
            })
        },
        patch(url, data) { //patch请求
            return api({
                url: url,
                method: 'patch',
                data: paramHandle(data)
            })
        },
        delete(url, data) { //delete请求
            return api({
                url: url,
                method: 'delete',
                params: paramHandle(data)
            })
        },
        postFormData(url, data) { //formdata的post请求
            return api({
                url: url,
                method: 'post',
                data: qs.stringify(paramHandle(data)),
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
                data: qs.stringify(paramHandle(data)),
                headers: formDataHeader
            })
        },
        patchFormData(url, data) { //formdata的patch请求
            return api({
                url: url,
                method: 'patch',
                data: qs.stringify(paramHandle(data)),
                headers: formDataHeader
            })
        },
    }
    return http
}
export default httpHandle