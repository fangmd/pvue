import Vue from 'vue'
import App from './App.vue'
import 'normalize.css'
import router from './router'
import store from './store'

// console.log(`${process.env.VUE_APP_MOCK}`);
// process.env.VUE_APP_MOCK && require('./mock');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
