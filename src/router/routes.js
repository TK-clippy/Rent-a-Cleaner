const routes = [
  // --- KLIJENT (Naručitelj) ---
  {
    path: '/',
    component: () => import('layouts/ClientLayout.vue'),
    children: [
      // Prazan path ('') znači da je ovo početna stranica na http://localhost:9000/#/
      {
        path: '',
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
  },

  // --- ČISTAČ (Zaposlenik) ---
  {
    path: '/cleaner',
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
        component: () => import('src/pages/cleaner/CleanerActiveJob.vue'),
      },
      {
        path: 'profile',
        name: 'cleaner-profile',
        component: () => import('pages/cleaner/CleanerProfile.vue'),
      },
    ],
  },

  // --- AGENCIJA (Admin - Desktop Only) ---
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin-metrics',
        component: () => import('pages/admin/AdminMetrics.vue'),
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('pages/admin/AdminUsers.vue'),
      },
      {
        path: 'chat',
        name: 'admin-chat',
        component: () => import('pages/admin/AdminChat.vue'),
      },
    ],
  },

  // Catch-all za 404 stranicu
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
