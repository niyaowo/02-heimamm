
// 导入拦截器
import { instance } from '@/utils/request.js';
function getBusinessData(params) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        params
    })
}
// 设置企业状态
function setBusinessStatus(data) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        data
    })
}
// 删除企业
function delBusiness(data) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data
    })
}

// 新增企业
function addBusiness(data) {
    return instance({
        url: "/enterprise/add",
        method: "post",
        data
    })
}
// 编辑企业
function editBusiness(data) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}
export { getBusinessData, setBusinessStatus, delBusiness, addBusiness, editBusiness }