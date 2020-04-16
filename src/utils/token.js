// 获取设置token值
function setToken(val, name = "token") {
    window.localStorage.setItem(name, val);
}

// 获取token
function getToken(name = "token") {
    // 一定要return token值 否则获取不到
    return window.localStorage.getItem(name);
}

// 删除token
function removeToken(name = "token") {
    window.localStorage.removeItem(name);
}

// 导出token方法
export { getToken, setToken, removeToken };