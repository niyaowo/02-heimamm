// 导入拦截器
import { instance } from '@/utils/request.js';
function getCodeUrl(data) {
    return instance({
        url: "/sendsms",
        method: "post",
        data
    })
}

function userRegister(data) {
    return instance({
        url: "/register",
        method: "post",
        data
    })
}

export { getCodeUrl, userRegister };