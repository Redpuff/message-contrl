import { createRouter, createWebHashHistory } from 'vue-router'
import { verificationToken } from '@/service/login/login'
import LocStorage from '@/utils/cache'
import { LOGIN_TOKEN } from '@/globle/constant'
import { firstMenu } from '@/utils/mapMenu'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-fount/not-fount.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const token = LocStorage.getLocStorage(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
