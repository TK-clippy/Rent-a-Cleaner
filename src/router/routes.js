const routes = [
  // --- KLIJENT (Naručitelj) ---
  {
    path: '/',
    component: () => import('layouts/ClientLayout.vue'),
    children: [
      { path: '', name: 'client-home', component: () => import('pages/client/Home.vue') },
      { path: 'search', name: 'client-search', component: () => import('pages/client/Search.vue') },
      {
        path: 'checkout',
        name: 'client-checkout',
        component: () => import('pages/client/Checkout.vue'),
      },
      {
        path: 'bookings',
        name: 'client-bookings',
        component: () => import('pages/client/Bookings.vue'),
      },
    ],
  },

  // --- ČISTAČ (Zaposlenik) ---
  {
    path: '/cleaner',
    component: () => import('layouts/CleanerLayout.vue'),
    children: [
      {
        path: '',
        name: 'cleaner-dashboard',
        component: () => import('pages/cleaner/Dashboard.vue'),
      },
      {
        path: 'calendar',
        name: 'cleaner-calendar',
        component: () => import('pages/cleaner/Calendar.vue'),
      },
      {
        path: 'active-job',
        name: 'cleaner-active-job',
        component: () => import('pages/cleaner/ActiveJob.vue'),
      },
      {
        path: 'profile',
        name: 'cleaner-profile',
        component: () => import('pages/cleaner/Profile.vue'),
      },
    ],
  },

  // --- AGENCIJA (Admin - Desktop Only) ---
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', name: 'admin-metrics', component: () => import('pages/admin/Metrics.vue') },
      { path: 'users', name: 'admin-users', component: () => import('pages/admin/Users.vue') },
      { path: 'chat', name: 'admin-chat', component: () => import('pages/admin/Chat.vue') },
    ],
  },

  // Catch-all za 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
