# Rent-A-Cleaner

**Rent-A-Cleaner** je cjelovito rješenje za posredovanje pri uslugama čišćenja. Sustav omogućuje klijentima pronalazak i rezervaciju čistača, čistačima upravljanje poslovima, a administratorima potpunu kontrolu nad korisnicima i uslugama.

Projekt je izrađen u sklopu kolegija na fakultetu, koristeći suvremene web i mobilne tehnologije.

---

## Tehnološki Stack

Sustav je izveden kao **full-stack** aplikacija:

- **Frontend:** [Quasar Framework](https://quasar.dev/) (Vue 3, Vite, Composition API)
- **State Management:** [Pinia](https://pinia.vuejs.org/) (upravljanje autentifikacijom i stanjem korisnika)
- **Backend:** [Node.js](https://nodejs.org/) s [Express.js](https://expressjs.com/) okvirom
- **Baza podataka:** [MySQL](https://www.mysql.com/) (hostana na `ucka.veleri.hr`)
- **Mobilna podrška:** [Capacitor](https://capacitorjs.com/) (izrada Android APK datoteke)
- **Autentifikacija:** JSON Web Tokens (JWT) s `bcryptjs` enkripcijom lozinki

---

## Arhitektura Sustava

Aplikacija koristi **Role-Based Access Control (RBAC)** model koji korisnike dijeli na tri razine:

1. **Klijent (Client):** Pregled usluga, pretraga dostupnih čistača i kreiranje rezervacija.
2. **Čistač (Cleaner):** Upravljanje profilom, postavljanje satnice i pregled dodijeljenih termina.
3. **Administrator:** Upravljanje bazom korisnika, kategorijama usluga i nadzor svih rezervacija (dostupno putem web sučelja).

Svi podaci se sinkroniziraju putem centralnog API-ja hostanog na Hostingeru, koji komunicira s udaljenom MySQL bazom na sveučilišnom poslužitelju.

---

## Instalacija i Pokretanje

### 1. Backend (API)

U slučaju self hostanja potrebno je kreirati `.env` datoteku u `/backend` mapi sa sljedećim varijablama:

```env
DB_HOST=ucka.veleri.hr
DB_USER=tvoj_user
DB_PASS=tvoja_lozinka
DB_NAME=user
JWT_SECRET=tvoja_tajna_za_token
PORT=3000
```

Zatim instalirajte ovisnosti i pokrenite server:

```bash
cd backend
npm install
npm start
```

### 2. Frontend (Quasar)

U korijenu projekta instalirajte ovisnosti:

```bash
npm install
```

Pokretanje razvojnog sučelja:

```bash
quasar dev
```

Build za produkciju (SPA):

```bash
quasar build
```

---

## Mobilna Aplikacija

Projekt uključuje mobilnu verziju za Android uređaje, izgrađenu pomoću Capacitora.

- **GitHub Releases:** [https://velerihr-my.sharepoint.com/:u:/g/personal/tkatic_veleri_hr/IQBef7JyDo5tRLf5iYgpwq0QAew0Ia7CqqvUEdeIT06eY78?e=XTCBVL](https://github.com/TK-clippy/Rent-a-Cleaner/releases/tag/apk)
- **OneDrive Download:** [https://github.com/TK-clippy/Rent-a-Cleaner/releases/tag/apk](https://github.com/TK-clippy/Rent-a-Cleaner/releases/tag/apk)

> **Napomena:** Za instalaciju je potrebno omogućiti „Instalaciju iz nepoznatih izvora" u postavkama Android uređaja.

---

## Ključne Značajke

- **JWT Autentifikacija:** Sigurna prijava i trajna sesija putem localStorage i Pinia store-a.
- **Dinamički Routing:** Pametni navigacijski čuvari (guards) koji preusmjeravaju korisnika ovisno o ulozi (admin, cleaner, client).
- **Axios Interceptors:** Automatsko umetanje Bearer tokena u zaglavlje svakog API zahtjeva.
- **Relacijska Baza:** Složena struktura tablica s Foreign Key ograničenjima i integriranim sustavom recenzija.
- **Notify Plugin:** Integrirani sustav Quasar obavijesti za povratne informacije korisniku.

---

## Autori

| Ime i prezime | Ustanova | Kolegij |
|---|---|---|
| Tomislav Katić | Veleučilište u Rijeci | Programsko inžinjerstvo |
| Eugen Šuša | Veleučilište u Rijeci | Programsko inžinjerstvo |
| Marin Cividini | Veleučilište u Rijeci | Programsko inžinjerstvo |