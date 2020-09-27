// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import './plugins/element.js'
import ElementUI from 'element-ui';
import iconPicker from 'vue-fontawesome-elementui-icon-picker';

import VueCookies from 'vue-cookies'
import glaData from './glaData'
import api from "../src/api";
import lefts from '@/components/left/left'
import headers from '@/components/header/header.vue'

Vue.component('lefts', lefts)
Vue.component('headers',headers)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCookies)
Vue.use(headers)
Vue.use(iconPicker);
// Vue.use($)
axios.defaults.withCredentials = true; //让ajax携带cookie
Vue.prototype.$axios = axios;
Vue.prototype.glaData = glaData
Vue.prototype.api = api
/* eslint-disable no-new */
var routeList = [];

router.beforeEach((to, from, next) => {
  var index = -1;
  console.log(routeList)
  for (var i = 0; i < routeList.length; i++) {
    if (routeList[i].name == to.name) {
      index = i;
      break;
    }
  }
  
  if (index !== -1) {
    //如果存在路由列表，则把之后的路由都删掉
    routeList.splice(index + 1, routeList.length - index - 1);
  } else if (to.name != '登录') {
    console.log(to)
    routeList.push({
      "name": to.name,
      "path": to.fullPath,
      'showTO':to.showTO
    });
  }
  to.meta.routeList = routeList;
  next()
});
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
