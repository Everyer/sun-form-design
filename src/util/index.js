import store from '@/store/index'

export function deepClone(target) {
    // 定义一个变量
    let result
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = [] // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {}
            for (let i in target) {
                result[i] = deepClone(target[i])
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target
    }
    // 返回最终结果
    return result
}

function hasPermission(permission) {
    if (store.state.settings.openPermission) {
        return store.state.user.permissions.some(v => {
            return v === permission
        })
    } else {
        return true
    }
}

export function auth(value) {
    let auth
    if (typeof value === 'string') {
        auth = hasPermission(value)
    } else {
        auth = value.some(item => {
            return hasPermission(item)
        })
    }
    return auth
}

export function authAll(value) {
    const auth = value.every(item => {
        return hasPermission(item)
    })
    return auth
}
export function fileType(value) {
    var strFilter = ".jpeg|.gif|.jpg|.png|.bmp|.pic|.svg|";
    var videoFilter = ".avi|.wmv|.mpg|.mpeg|.mov|.rm|.ram|.swf|.flv|.mp4|.mp3|.wma|.avi|.rm|.rmvb|.flv|.mpg|.mkv";
    if (value.indexOf(".") > -1) {
        var p = value.lastIndexOf(".");
        var strPostfix = value.substring(p, value.length) + '|';
        var d=value.substring(p, value.length)
        strPostfix = strPostfix.toLowerCase();
        if (strFilter.indexOf(strPostfix) > -1) {
            return 'image';
        }
        if (videoFilter.indexOf(strPostfix) > -1) {
            return 'media';
        }
    }
    return d.split('.')[1];
}