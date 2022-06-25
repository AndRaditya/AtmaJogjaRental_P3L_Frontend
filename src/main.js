import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;

Vue.prototype.$http = axios; //code menggunakan axios
// Vue.prototype.$api = 'http://127.0.0.1:8000/api'; //link backend
// Vue.prototype.$baseUrl = 'http://127.0.0.1:8000';
Vue.prototype.$api = 'https://backend.atmarental.xyz/api'; //link backend
Vue.prototype.$baseUrl = 'https://backend.atmarental.xyz/public';

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
