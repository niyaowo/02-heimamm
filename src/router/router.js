import Vue from 'vue';
import VueRouter from 'vue-router';

// 导入组件
import login from '@/views/login.vue';

// 注册路由
Vue.use(VueRouter);
// 实例化路由对象
const router = new VueRouter({
    routes: [
        // 注册登录页
        {
            path: '/',
            component: login
        },
        {
            path: '/login',
            component: login
        }
    ]
})

// 导出路由对象
export default router;