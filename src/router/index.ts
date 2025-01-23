import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './auth'
import { formsRoutes } from './forms'
import {useCookie} from "@/composables/useCookie";
import {cookies} from "@/statics/cookies";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: { name: 'ListForm' }},
    ...authRoutes,
    ...formsRoutes
  ],
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await useCookie().existed(cookies.ACCESS_TOKEN)

  if (to.meta?.requiredAuth && !isAuthenticated) {
    next('/auth')
  }

  next()
})

export default router
