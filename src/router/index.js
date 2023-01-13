import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'users',
    component: () => import('../layouts/AppLayout'),
    children: [
      {
        path: '/',
        component: () => import('../views/UsersView'),
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../layouts/AppLayout'),
    children: [
      {
        path: '/user',
        component: () => import('../views/UserView'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
