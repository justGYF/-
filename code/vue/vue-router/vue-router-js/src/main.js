import Vue from 'vue'
import App from './App.vue'
// import router from './routers/index.js'

import VueRouter from 'vue-router'
Vue.use(VueRouter)


Vue.config.productionTip = false


// router.beforeEach((e) => {
//   console.log(e, 'sss')
// })


// const path = require('path')
const routerList = require.context('./components', true, /\.vue$/)
const LIST = []
routerList.keys().forEach(it => {
  // path.dirname 返回目录名
  let reg = it.match(/.\/(\w*)(\/|.vue|index)/)
  if (reg && reg.length) {
    let name = reg[1]
    console.log(name)
    let obj = {
      name,
      // path: `yourRootName/${name}`,
      path: `/${name}`,
      component: () => import(`./components/${name}`)
    }
    LIST.push(obj)
  }
})

const router = new VueRouter({
  mode: 'hash',
  routes: LIST
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
