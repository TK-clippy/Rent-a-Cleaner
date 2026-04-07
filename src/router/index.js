import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // --- ZAŠTITA RUTA (Navigation Guard) ---
  Router.beforeEach((to) => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    let user = null
    try {
      user = userStr ? JSON.parse(userStr) : null
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      localStorage.removeItem('user') // očisti pokvareni podatak
      user = null
    }

    console.log('GUARD:', { path: to.path, token: !!token, uloga: user?.uloga })

    const requiresAuth =
      to.path.startsWith('/client') ||
      to.path.startsWith('/cleaner') ||
      to.path.startsWith('/admin')

    // 1. Ako treba login, a nema tokena
    if (requiresAuth && !token) {
      return '/auth/login'
    }

    // 2. Ako je ulogiran, a ide na login stranicu
    if (to.path === '/auth/login' && token) {
      const target = process.env.BUILD_TARGET || 'client'
      if (target === 'cleaner') return '/cleaner/dashboard'
      if (target === 'admin') return '/admin'
      return '/client/home'
    }

    // U suprotnom, dopusti navigaciju (nema povratne vrijednosti)
  })

  return Router
})
