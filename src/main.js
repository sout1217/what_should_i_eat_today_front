import Vue from 'vue'
import App from './App.vue'
import router from '@/routes/index'
import store from '@/store/index'
import vuetify from '@/plugins/vuetify'
import '@/plugins/toast'
import '@/plugins/mdivue'
import '@/css/index.scss'
import '@/css/admin.scss'
import '@/plugins/vee-validation'
import '@/filter'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount('#app')
