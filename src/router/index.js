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
      user = userStr && userStr !== 'undefined' ? JSON.parse(userStr) : null
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      localStorage.removeItem('user')
      user = null
    }

    const isLoggedIn = !!token && !!user
    const uloga = user?.uloga // 'admin', 'cleaner', 'client'

    // Definiraj rute koje zahtijevaju specifične uloge
    const isAdminRoute = to.path.startsWith('/admin')
    const isCleanerRoute = to.path.startsWith('/cleaner')
    const isClientRoute = to.path.startsWith('/client')
    const requiresAuth = isAdminRoute || isCleanerRoute || isClientRoute

    // 1. Ako ruta zahtijeva auth, a korisnik nije ulogiran
    if (requiresAuth && !isLoggedIn) {
      return '/auth/login'
    }

    // 2. LOGIKA ZA ADMIN BUILD TARGET & ROLE PROTECTION
    // Ako korisnik pokuša ući na /admin, a NIJE admin -> baci ga na login ili home
    if (isAdminRoute && uloga !== 'admin') {
      return '/auth/login'
    }

    // Isto vrijedi i za čistača
    if (isCleanerRoute && uloga !== 'cleaner') {
      return '/auth/login'
    }

    // 3. Automatski redirect s Login stranice ako je već ulogiran
    if (to.path === '/auth/login' && isLoggedIn) {
      if (uloga === 'admin') return '/admin'
      if (uloga === 'cleaner') return '/cleaner/dashboard'
      return '/client/home'
    }

    // 4. Ako admin pokuša otići na klijentski home, možda ga želiš pustiti,
    // ali za strogi "Admin Build" obično ga držimo unutar /admin
    if (process.env.BUILD_TARGET === 'admin' && uloga === 'admin' && to.path === '/') {
      return '/admin'
    }
  })

  return Router
})
