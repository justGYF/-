import VueRouter from 'vue-router'
import Vue from 'vue'


// import MyRouter from './myRouter.js'
// Vue.use(MyRouter)


Vue.use(VueRouter)

import A from '../components/a.vue'
import B from '../components/b.vue'
const routes = [
    {
        path: '/A',
        name: 'A',
        component: A
    },
    {
        path: '/B',
        name: 'B',
        component: B
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router
