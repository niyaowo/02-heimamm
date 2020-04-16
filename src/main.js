import Vue from 'vue'
import App from './App.vue'

// 导入路由对象
import router from '@/router/router.js';
// 导入数据共享管理
import store from '@/store/index.js';

Vue.config.productionTip = false;

// 导入element插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  // 注入路由对象
  router,
  // 注入数据共享
  store
}).$mount('#app')
