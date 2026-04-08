Rent-a-Cleaner/
├── backend/ # NODE.JS BACKEND MODUL
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js # MySQL konekcija (mysql2 pool)
│ │ ├── controllers/ # Business logika aplikacije
│ │ │ ├── authController.js # Login i Registracija
│ │ │ ├── bookingController.js # Upravljanje rezervacijama
│ │ │ └── cleanerController.js # Podaci o čistačima i uslugama
│ │ ├── middlewares/ # Sigurnosni slojevi
│ │ │ └── authMiddleware.js # Validacija JWT tokena
│ │ ├── routes/ # API Endpoints
│ │ │ ├── authRoutes.js
│ │ │ ├── bookingRoutes.js
│ │ │ └── cleanerRoutes.js
│ │ └── server.js # Glavna Express datoteka
│ ├── .env # Privatne varijable (DB_PASS, JWT_SECRET)
│ └── package.json # Skripte (npm run dev)
├── src/ # QUASAR FRONTEND MODUL
│ ├── css/
│ │ ├── app.scss # Moderni CSS (blur, radius)
│ │ └── quasar.variables.scss # Primarne boje brenda
│ ├── layouts/
│ │ ├── ClientLayout.vue # Okvir za klijente
│ │ ├── CleanerLayout.vue # Okvir za čistače
│ │ └── AdminLayout.vue # Okvir za admin sučelje
│ ├── pages/
│ │ ├── auth/
│ │ │ └── Login.vue # Prijava korisnika
│ │ ├── client/ # Modul: Klijent
│ │ │ ├── ClientHome.vue # Odabir usluga
│ │ │ ├── ClientSearch.vue # Pretraga čistača
│ │ │ ├── ClientCheckout.vue # Rezervacija termina
│ │ │ └── ClientBookings.vue # Povijest i recenzije
│ │ ├── cleaner/ # Modul: Čistač
│ │ │ ├── CleanerDashboard.vue # Popis dodijeljenih poslova
│ │ │ ├── CleanerCalendar.vue # Slobodni termini
│ │ │ └── CleanerProfile.vue # Statistika i profil
│ │ └── admin/ # Modul: Admin
│ │ ├── AdminMetrics.vue # Analitika i financije
│ │ └── AdminUsers.vue # Upravljanje bazom
│ ├── components/ # Reusable UI komponente
│ │ ├── CleanerCard.vue # Kartica s profilom čistača
│ │ ├── ServiceCategory.vue # Kartice usluga s početne
│ │ └── BookingSummary.vue # Izračun cijene (Checkout)
│ ├── router/
│ │ └── routes.js # Vue Router konfiguracija
│ └── stores/ # Pinia State Management
├── notes/ # Dokumentacija (Gitignored)
├── .gitignore # Isključuje .env, node_modules i notes/
├── quasar.config.js # Glavna konfiguracija Quasara
└── package.json # Frontend dependencyji (axios, pinia)
