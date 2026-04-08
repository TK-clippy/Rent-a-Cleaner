📝 PROJECT MEMORY: Rent-A-Cleaner

Statusni izvještaj i tehnička dokumentacija projekta

Datum zadnjeg ažuriranja: Travanj 2026. (Update: Sigurnost Autentifikacije & Routing Fix)

Tehnološki Stack: Quasar Framework (Vue 3), Pinia, Axios, Node.js (Express), MySQL.
1. ✅ Što je do sada urađeno?
A. Backend Arhitektura

    Baza Podataka: Shema tkatic aktivna na ucka.veleri.hr.

    API Server: Express server (Port 3000) s JWT sustavom i bcryptjs hashiranjem.

    Rute: Auth (Login/Register), Services, Bookings potpuno funkcionalni.

B. Frontend Integracija & Auth (Novo 🚀)

    Axios Setup: Implementiran boot/axios.js s interceptorom koji automatski lijepi Bearer token u header svake molbe.

    Pinia Auth Store: auth.js upravlja stanjem korisnika, tokenom i perzistencijom u localStorage.

    UI Feedback: Aktiviran Quasar Notify plugin za prikaz uspješnih/neuspješnih prijava.

    Pametni Routing: Implementiran navigation guard koji automatski preusmjerava korisnika na /admin, /cleaner ili /client ovisno o njegovoj ulozi (uloga).

2. 🛠️ Riješeni Kritični Problemi (Bug Log)

    JSON Parse Error: Ispravljen pad aplikacije u router/index.js. Guard je pucao jer je localStorage nekad vraćao string "undefined". Uveden try-catch blok za sigurno parsiranje korisničkih podataka.

    Login Redirect Fix: Riješen problem gdje je bio potreban ručni refresh nakon prijave. Sada se router.push izvršava odmah nakon uspješnog API odgovora.

    Safe Headers: Tokeni se sada dinamički dodaju u Axios defaultne headere odmah pri prijavi, bez potrebe za ponovnim učitavanjem stranice.

3. 🏁 Trenutno Stanje

    Protokol prijave: Korisnik se prijavljuje -> Token i User idu u localStorage -> Pinia se ažurira -> Prikazuje se Notify poruka -> Router preusmjerava na početnu stranicu uloge.

    Stabilnost: Aplikacija se više ne "zacrni" (prazan ekran) pri osvježavanju jer guard sigurno obrađuje prazne ili neispravne tokene.

🚀 Što je sljedeće? (Roadmap)
FAZA 1: Dinamički podaci (Prioritet)

    ClientHome: Povlačenje stvarnih kategorija usluga iz tablice Services.

    CleanerSearch: Implementacija pretrage čistača po bazi podataka umjesto statičnih mock podataka.

FAZA 2: Profil & Terminologija

    Cleaner Dashboard: Izrada sučelja za čistače gdje vide svoje nadolazeće poslove.

    User Profile: Mogućnost izmjene lozinke i osobnih podataka.

💡 Tehničke Bilješke (Podsjetnik za dev tim)

    LocalStorage Guard: Uvijek koristiti try { JSON.parse(...) } kada se čita iz localStorage. Nikada ne pretpostavljaj da je podatak ispravan JSON.

    Uloge (Roles): Provjeriti jesu li nazivi uloga u bazi (admin, cleaner, client) usklađeni s provjerama u UserLogin.vue i router/index.js.

    App Mode: Trenutno su sve rute (client, cleaner, admin) dostupne unutar istog builda radi lakšeg testiranja preusmjeravanja.

    Notify Plugin: Ako Notify ne radi, provjeri je li dodan u quasar.config.js pod framework -> plugins.