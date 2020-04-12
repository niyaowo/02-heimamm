// 导入拦截器
import { instance } from '@/utils/request.js';
// 用户登入请求
function userLogin(data) {
    return instance({
        url: "/login",
        method: "post",
        data
    })
}

export { userLogin }