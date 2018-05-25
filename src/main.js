import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource'
import {router} from './routes.js';
import {store} from './store/store.js';

Vue.use(VueResource);



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
