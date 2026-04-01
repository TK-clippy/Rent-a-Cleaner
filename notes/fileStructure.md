src/
├── components/           # Reusable komponente (Kartice čistača, forme za ocjenjivanje, itd.)
├── layouts/              # Glavni okviri aplikacije
│   ├── ClientLayout.vue  # Mobile-first dizajn s donjom navigacijom za klijente
│   ├── CleanerLayout.vue # Mobile-first dizajn za čistače
│   └── AdminLayout.vue   # Desktop-only dashboard dizajn za agenciju
├── pages/
│   ├── auth/             # Login i registracija [cite: 100]
│   ├── client/           # Stranice naručitelja
│   │   ├── Home.vue      # Odabir tipa usluge (prašina, duboko, bazeni) 
│   │   ├── Search.vue    # Prikaz i filtriranje čistača po vremenu/ocjeni [cite: 48, 49]
│   │   ├── Checkout.vue  # Odabir termina, plaćanje (kartica) i najam opreme [cite: 46, 47]
│   │   └── Bookings.vue  # Pregled narudžbi i ostavljanje recenzija [cite: 70]
│   ├── cleaner/          # Stranice zaposlenika
│   │   ├── Dashboard.vue # Pregled novih poslova i obavijesti [cite: 68]
│   │   ├── Calendar.vue  # Unos raspoloživosti [cite: 68]
│   │   ├── ActiveJob.vue # Potvrda završetka posla [cite: 68]
│   │   └── Profile.vue   # Radno iskustvo, CV i ocjene [cite: 68]
│   └── admin/            # Agencijsko upravljanje (Desktop)
│       ├── Metrics.vue   # Izvještaji o brzini i učinku čistača [cite: 66]
│       ├── Users.vue     # Upravljanje zaposlenicima i klijentima [cite: 66]
│       └── Chat.vue      # Slanje poruka i ponuda [cite: 66]
├── router/
│   └── routes.js         # Vue Router konfiguracija
└── stores/               # Pinia store za state management (Korisnici, Narudžbe)
