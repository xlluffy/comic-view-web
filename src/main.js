import Vue from 'vue'
import App from './App.vue'
import store from './store'
// eslint-disable-next-line no-unused-vars
import $ from 'jquery'
import "popper.js"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import './style/main.css'
import router from './router'
import {postRequest, putRequest} from "@/api/api";
// import {getToken} from "@/api/auth";

Vue.config.productionTip = false;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;

$('[data-toggle="tooltip"]').tooltip();

router.beforeEach( (to, from, next) => {
  document.title = to.meta.title ? to.meta.title : '加载中...';
  next();
});

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');

