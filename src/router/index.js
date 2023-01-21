// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Terminal',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Terminal.vue'),
      },
      {
      path: 'tutulutu',
      name: 'tkt',
      component: () => import(/* webpackChunkName: "shark" */ '@/views/Shark.vue'),
      },
      {
        path: 'login',
        name: 'log',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      },
      {
        path: 'register',
        name: 'signup',
        component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
      }
  
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
