📝 PROJECT MEMORY: Rent-A-Cleaner

Statusni izvještaj i tehnička dokumentacija projekta

Datum zadnjeg ažuriranja: Travanj 2024.

Tehnološki Stack: Quasar Framework (Vue 3), Node.js (Express), MySQL.

1. 🎯 Cilj Projekta

Izrada platforme za pronalazak i rezervaciju čistača/čistačica po uzoru na moderne aplikacije za dostavu hrane (Wolt/Glovo).

    Klijenti: Naručuju usluge, biraju čistače, plaćaju i ocjenjuju.

    Čistači: Upravljaju kalendarom i radnim nalozima.

    Agencija (Admin): Upravlja bazom, analitikom i resursima.

2.  ✅ Šta je do sada urađeno?
    A. Frontend Arhitektura & Dizajn

        Modularnost (Novo): Uvedena mapa src/components za višekratne UI elemente.

        Naming Convention: Implementiran Multi-word standard za sve .vue datoteke (ESLint compliant).

        Modern UI (Custom CSS):

            Potpuno redizajniran Quasar izgled kroz app.scss.

            Uvedeni zaobljeni rubovi (12-16px), mekana sjena (opacity 3-5%) i iOS-style blur efekti.

            Uklonjen prisilni uppercase na gumbima i tabovima.

B. Implementirane Stranice (Klijentski modul)

    ClientHome: Dashboard s kategorijama usluga i preporučenim čistačima.

    ClientSearch: Napredna pretraga s filtriranjem po tipu usluge (Osnovno, Dubinsko, itd.).

    ClientCheckout: Logika za odabir termina, unos kvadrature i kalkulaciju cijene s opremom.

    ClientBookings: Sučelje s tabovima za nadolazeće poslove i povijest s opcijom recenziranja.

C. Reusable Komponente (Novo)

    CleanerCard.vue: Standardizirana kartica s podacima o čistaču (avatar, ocjena, cijena).

    ServiceCategory.vue: Vizualna kartica za kategorije usluga s overlay efektom i slikama.

3. 📂 Trenutna Struktura Datoteka
   Plaintext

src/
├── css/
│ ├── app.scss # Tvoj novi moderni CSS (bez sjena, zaobljeni rubovi)
│ └── quasar.variables.scss # Definirane primarne boje (plava, tamna, itd.)
├── layouts/
│ ├── ClientLayout.vue # Glavni okvir za klijente (s bottom navigacijom)
│ ├── CleanerLayout.vue # Okvir za čistače (kalendar i radni nalozi)
│ └── AdminLayout.vue # Desktop Sidebar layout za agenciju
├── pages/
│ ├── auth/ # Prijava i registracija korisnika
│ │ └── Login.vue
│ ├── client/ # MODUL: NARUČITELJ (Klijent)
│ │ ├── ClientHome.vue # Početna: Odabir usluga (Generalno, Bazeni, itd.)
│ │ ├── ClientSearch.vue # Lista čistača s ocjenama i filterima
│ │ ├── ClientCheckout.vue # Rezervacija termina i najam opreme
│ │ └── ClientBookings.vue # Povijest čišćenja i ostavljanje recenzija
│ ├── cleaner/ # MODUL: ZAPOSLENIK (Čistač)
│ │ ├── CleanerDashboard.vue # Pregled dodijeljenih poslova
│ │ ├── CleanerCalendar.vue # Unos slobodnih termina (Availability)
│ │ ├── ActiveJob.vue # Sučelje za rad na terenu (Start/Stop)
│ │ └── CleanerProfile.vue # CV čistača i statistika ocjena
│ └── admin/ # MODUL: AGENCIJA (Desktop Admin)
│ ├── AdminMetrics.vue # Analitika, financije i učinak zaposlenika
│ ├── AdminUsers.vue # Upravljanje bazom klijenata i čistača
│ └── AdminChat.vue # Centralni sustav za podršku i ponude
├── router/
│ └── routes.js # Poveznica između URL-ova i ovih novih komponenti
├── stores/ # Pinia (State Management za login i košaricu)
└── components/ # Dijeljeni UI elementi (npr. CleanerCard.vue)
├── CleanerCard.vue # Kartica čistača (Reusable)
├── ServiceCategory.vue # One 4 kartice s početne (Osnovno, Dubinsko...)
└── BookingSummary.vue # Sažetak cijene (koji smo imali u Checkoutu)

4.  🚀 Šta još moramo napraviti? (Roadmap)
    FAZA 1: Povezivanje i State (Frontend)

        Axios Setup: Povezivanje s Express backendom (http://localhost:3000).

        Pinia Stores: * useAuthStore (Login status).

            useBookingStore (Privremeno čuvanje odabira do potvrde plaćanja).

        Dinamički podaci: Zamjena statičnih ref lista podacima iz MySQL baze.

FAZA 2: Čistač & Admin Moduli

    Cleaner Modul: Izrada CleanerCalendar za unos slobodnih termina.

    Admin Modul: Implementacija AdminMetrics s grafikonima zarade.

    Real-time Chat: Osnovna komunikacija klijent-agencija.

FAZA 3: Sigurnost & Deployment

    Auth: JWT autentifikacija i Login forma.

    Validacija: Detaljna provjera unosa u Checkout formi.

5. 💡 Tehničke Bilješke

   Navigacija: Koristiti router.push({ name: 'naziv-rute', query: { ... } }) za prijenos parametara između stranica.

   UI Standard: Za sve nove kartice koristiti q-card s klasom koja automatski nasljeđuje stilove iz app.scss.

   Backend Sync: Svaka promjena u tablici Usluge_Ciscenja mora biti vidljiva u ServiceCategory komponenti.
