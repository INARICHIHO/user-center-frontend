import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,//暂时没用
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('@/views/UserLogin.vue')
    },
    {
      path: '/user/register',
      name: 'register',
      component: () => import('@/views/UserRegister.vue'),
    },
    {
      path: '/admin/userManage',
      name: 'userManage',
      component: () => import('@/views/UserManage.vue'),
    },
  ],
})

export default router
