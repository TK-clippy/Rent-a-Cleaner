src/
├── css/
│   ├── app.scss              # Tvoj novi moderni CSS (bez sjena, zaobljeni rubovi)
│   └── quasar.variables.scss # Definirane primarne boje (plava, tamna, itd.)
├── layouts/
│   ├── ClientLayout.vue      # Glavni okvir za klijente (s bottom navigacijom)
│   ├── CleanerLayout.vue     # Okvir za čistače (kalendar i radni nalozi)
│   └── AdminLayout.vue       # Desktop Sidebar layout za agenciju
├── pages/
│   ├── auth/                 # Prijava i registracija korisnika
│   │   └── Login.vue
│   ├── client/               # MODUL: NARUČITELJ (Klijent)
│   │   ├── ClientHome.vue     # Početna: Odabir usluga (Generalno, Bazeni, itd.)
│   │   ├── ClientSearch.vue   # Lista čistača s ocjenama i filterima
│   │   ├── ClientCheckout.vue # Rezervacija termina i najam opreme
│   │   └── ClientBookings.vue # Povijest čišćenja i ostavljanje recenzija
│   ├── cleaner/              # MODUL: ZAPOSLENIK (Čistač)
│   │   ├── CleanerDashboard.vue # Pregled dodijeljenih poslova
│   │   ├── CleanerCalendar.vue  # Unos slobodnih termina (Availability)
│   │   ├── ActiveJob.vue        # Sučelje za rad na terenu (Start/Stop)
│   │   └── CleanerProfile.vue   # CV čistača i statistika ocjena
│   └── admin/                # MODUL: AGENCIJA (Desktop Admin)
│       ├── AdminMetrics.vue     # Analitika, financije i učinak zaposlenika
│       ├── AdminUsers.vue       # Upravljanje bazom klijenata i čistača
│       └── AdminChat.vue        # Centralni sustav za podršku i ponude
├── router/
│   └── routes.js             # Poveznica između URL-ova i ovih novih komponenti
├── stores/                   # Pinia (State Management za login i košaricu)
└── components/               # Dijeljeni UI elementi (npr. CleanerCard.vue)
	├── CleanerCard.vue      # Kartica čistača (Reusable)
	├── ServiceCategory.vue  # One 4 kartice s početne (Osnovno, Dubinsko...)
	└── BookingSummary.vue   # Sažetak cijene (koji smo imali u Checkoutu)
