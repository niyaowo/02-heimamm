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
import store from '../store';

// 注册路由
Vue.use(VueRouter);
// 实例化路由对象
const router = new VueRouter({
    routes: [
        // 注册登录页
        {
            path: '/',
            component: login,
            meta: {
                title: "登录页",
                rules: ["超级管理员", "管理员", "老师", "学生"]
            }
        },
        {
            path: '/login',
            component: login,
            meta: {
                title: "登录页",
                rules: ["超级管理员", "管理员", "老师", "学生"]
            }
        },
        {
            path: "/home",
            redirect: "/home/subject",
            component: home,
            meta: {
                title: "首页",
                rules: ["超级管理员", "管理员", "老师", "学生"]
            },
            // 子路由嵌套
            children: [
                {
                    path: "chart",
                    component: chart,
                    meta: {
                        title: "数据概览",
                        rules: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-pie-chart"
                    }
                },


                {
                    path: "user",
                    component: user,
                    meta: {
                        title: "用户列表",
                        rules: ["超级管理员", "管理员"],
                        icon: "el-icon-user"
                    }
                },
                {
                    path: "question",
                    component: question,
                    meta: {
                        title: "题库列表",
                        rules: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-edit-outline"
                    }
                },
                {
                    path: "business",
                    component: business,
                    meta: {
                        title: "企业列表",
                        rules: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-office-building"
                    }
                },
                {
                    path: "subject",
                    component: subject,
                    meta: {
                        title: "学科列表",
                        rules: ["超级管理员", "管理员", "老师", "学生"],
                        icon: "el-icon-notebook-2"
                    }
                },

            ]
        }
    ]
});
import { Message } from "element-ui";
import { removeToken } from '@/utils/token.js'
// 导航守卫
router.beforeEach((to, form, next) => {
    if (to.meta.rules.includes(store.state.role)) {
        next();
    } else {
        Message.error("您的权限不够");
        removeToken();
        next("/");
    }
})
router.afterEach((to) => {
    document.title = to.meta.title;
})

// 导出路由对象
export default router;