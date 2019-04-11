import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js'
import './ui.js'
Vue.config.productionTip = false;

import Mint from 'mint-ui';//mint-ui
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import {post} from "./api/globalapi"
Vue.prototype.$post=post;

var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


