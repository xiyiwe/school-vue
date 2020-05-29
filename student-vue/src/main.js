// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios'
// Vue.prototype.$http = axios;
import VueSession from 'vue-session'
import qs from 'qs';
Vue.prototype.$qs = qs;
Vue.use(VueSession)
Vue.prototype.axios = axios
axios.defaults.baseURL = '/bpi'
Vue.config.productionTip = false
// 安装 ElementUI
Vue.use(ElementUI);

Vue.use(VueAxios,axios)
/*// 安装路由
Vue.use(VueRouter);*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // 启用 ElementUI
  render: h => h(App),
})
