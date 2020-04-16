import { instance } from "@/utils/request.js";

// 获取用户信息
function getUserInfo() {
    return instance({
        url: '/info',
        method: 'get'
    })
}
// 用户退出功能
function userLogOut() {
    return instance({
        url: '/logOut',
        method: 'get'
    })
}
export { getUserInfo, userLogOut }