import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/vee-validate'
import '@/plugins/axios'
import Toasted from 'vue-toasted'

const options = {
  duration: 3000,
}
Vue.use(Toasted, options)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  },
}).$mount('#app')
