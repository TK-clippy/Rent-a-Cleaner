// Za sada zanemarujemo APP_MODE kako bismo testirali rade li sve rute ispravno.
const routes = []

// --- KLIJENT ---
routes.push({
  path: '/client',
  component: () => import('layouts/ClientLayout.vue'),
  children: [
    {
      path: 'home',
      name: 'client-home',
      component: () => import('pages/client/ClientHome.vue'),
    },
    {
      path: 'search',
      name: 'client-search',
      component: () => import('pages/client/ClientSearch.vue'),
    },
    {
      path: 'checkout',
      name: 'client-checkout',
      component: () => import('pages/client/ClientCheckout.vue'),
    },
    {
      path: 'bookings',
      name: 'client-bookings',
      component: () => import('pages/client/ClientBookings.vue'),
    },
  ],
})

// --- AUTH (Prijava i Registracija) ---
routes.push({
  path: '/auth/login',
  name: 'login',
  component: () => import('pages/auth/UserLogin.vue'),
})

// --- ČISTAČ ---
routes.push({
  path: '/cleaner',
  component: () => import('layouts/CleanerLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'cleaner-dashboard',
      component: () => import('pages/cleaner/CleanerDashboard.vue'),
    },
    {
      path: 'calendar',
      name: 'cleaner-calendar',
      component: () => import('pages/cleaner/CleanerCalendar.vue'),
    },
    {
      path: 'active-job',
      name: 'cleaner-active-job',
      component: () => import('pages/cleaner/CleanerActiveJob.vue'),
    },
    {
      path: 'profile',
      name: 'cleaner-profile',
      component: () => import('pages/cleaner/CleanerProfile.vue'),
    },
  ],
})

// --- ADMIN ---
routes.push({
  path: '/admin',
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    { path: '', name: 'admin-metrics', component: () => import('pages/admin/AdminMetrics.vue') },
    { path: 'users', name: 'admin-users', component: () => import('pages/admin/AdminUsers.vue') },
    { path: 'chat', name: 'admin-chat', component: () => import('pages/admin/AdminChat.vue') },
  ],
})

// --- GLOBALNI REDIRECT ZA ROOT ---
routes.push({
  path: '/',
  redirect: '/auth/login',
})

// --- UVIJEK NA KRAJU (Samo jedan 404 catch-all!!!) ---
routes.push({
  path: '/:catchAll(.*)*',
  component: () => import('pages/ErrorNotFound.vue'),
})

export default routes
