// 导入拦截器
import { instance } from '@/utils/request.js';
function getUserList(params) {
    return instance({
        url: "/user/list",
        method: "get",
        params
    })
}
// 设置用户状态
function setUserStatus(data) {
    return instance({
        url: "/user/status",
        method: "post",
        data
    })
}
// 删除用户
function delUser(data) {
    return instance({
        url: "/user/remove",
        method: "post",
        data
    })
}

// 新增用户
function addUser(data) {
    return instance({
        url: "/user/add",
        method: "post",
        data
    })
}
// 编辑用户
function editUser(data) {
    return instance({
        url: "/user/edit",
        method: "post",
        data
    })
}
export { getUserList, setUserStatus, delUser, addUser, editUser }