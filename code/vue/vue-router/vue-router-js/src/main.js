import Vue from 'vue'
import App from './App.vue'
import router from './routers/index.js'

Vue.config.productionTip = false




// router.beforeEach((e) => {
//   console.log(e, 'sss')
// })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
