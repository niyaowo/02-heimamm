// 设置请求错误拦截器
// 导入axios
import axios from 'axios';
import router from '@/router/router.js'
import { getToken, removeToken } from './token.js'
// 导入element 弹窗
import { Message } from 'element-ui';

// 设置拦截器实例
const instance = axios.create({
    // 设置基地址
    baseURL: process.env.VUE_APP_URL,
    // 运行跨域携带cookie
    withCredentials: true
});

// 创建请求和响应拦截
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (getToken()) {
        // 设置请求头参数 token
        config.headers.token = getToken();
    }
    return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
        return response.data;
    } else if (response.data.code == 206) {
        // 请求超时/token错误
        Message.error("请求超时");
        removeToken();
        router.push("/login");
    }
    else {
        Message.error(response.data.message);
        return Promise.reject("error");
    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 导出拦截实例
export { instance }