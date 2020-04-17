import Vue from 'vue';
import VueRouter from 'vue-router';

// 导入组件
import login from '@/views/login/login.vue';
import home from '@/views/home/layout.vue';
import user from '@/views/home/user/userList.vue';
import question from '@/views/home/question/question.vue';
import chart from '@/views/home/chart/chart.vue';
import business from '@/views/home/business/business.vue';
import subject from '@/views/home/subject/subject.vue';

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
        },
        {
            path: "/home",
            redirect: "/home/subject",
            component: home,
            // 子路由嵌套
            children: [
                {
                    path: "user",
                    component: user
                },
                {
                    path: "question",
                    component: question
                },
                {
                    path: "chart",
                    component: chart
                },
                {
                    path: "business",
                    component: business
                },
                {
                    path: "subject",
                    component: subject
                },

            ]
        }
    ]
})

// 导出路由对象
export default router;