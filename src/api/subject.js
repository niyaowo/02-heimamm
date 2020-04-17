// 导入拦截器
import { instance } from '@/utils/request.js';
function getSubjectData(params) {
    return instance({
        url: "/subject/list",
        method: "get",
        params
    })
}

function setSubjectStatus(data) {
    return instance({
        url: "/subject/status",
        method: "post",
        data
    })
}
// 删除学科
function delSubject(data) {
    return instance({
        url: "/subject/remove",
        method: "post",
        data
    })
}

// 新增学科
function addSubject(data) {
    return instance({
        url: "/subject/add",
        method: "post",
        data
    })
}
// 编辑学科
function editSubject(data) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data
    })
}
export { getSubjectData, setSubjectStatus, delSubject, addSubject, editSubject }