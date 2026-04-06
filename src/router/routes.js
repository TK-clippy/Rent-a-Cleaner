const appMode = process.env.APP_MODE || 'client'
const routes = []

// --- KLIJENT ---
if (appMode === 'client') {
  routes.push({
    path: '/',
    component: () => import('layouts/ClientLayout.vue'),
    children: [
      { path: '', name: 'client-home', component: () => import('pages/client/ClientHome.vue') },
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
}

// --- ČISTAČ ---
if (appMode === 'cleaner') {
  routes.push({
    path: '/',
    component: () => import('layouts/CleanerLayout.vue'),
    children: [
      {
        path: '',
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
}

// --- ADMIN & 404 ---
routes.push({
  path: '/admin',
  component: () => import('layouts/AdminLayout.vue'),
  children: [
    { path: '', name: 'admin-metrics', component: () => import('pages/admin/AdminMetrics.vue') },
    { path: 'users', name: 'admin-users', component: () => import('pages/admin/AdminUsers.vue') },
    { path: 'chat', name: 'admin-chat', component: () => import('pages/admin/AdminChat.vue') },
  ],
})

routes.push({
  path: '/:catchAll(.*)*',
  component: () => import('pages/ErrorNotFound.vue'),
})

export default routes
