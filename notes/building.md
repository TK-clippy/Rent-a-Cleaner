🚀 Razvoj (Development Mode)

Pokretanje lokalnog servera za testiranje u pregledniku ili na emulatoru.

1. Pokretanje aplikacije za Klijente
   Bash

BUILD_TARGET=client quasar dev

    URL: http://localhost:9000/#/

    Layout: Koristi ClientLayout.vue

    ID: com.rentacleaner.client

2. Pokretanje aplikacije za Čistače
   Bash

BUILD_TARGET=cleaner quasar dev

    URL: http://localhost:9000/#/ (Automatski redirect na Dashboard)

    Layout: Koristi CleanerLayout.vue

    ID: com.rentacleaner.cleaner

📦 Buildanje APK datoteka (Production)

Za generiranje finalnih instalacijskih datoteka za Android (putem Capacitora).

1. Build za Klijente
   Bash

# Korak 1: Kompajliranje koda

BUILD_TARGET=client quasar build -m capacitor -T android

# Korak 2: Otvaranje u Android Studiju za generiranje APK-a

npx cap open android

2. Build za Čistače
   Bash

# Korak 1: Kompajliranje koda

BUILD_TARGET=cleaner quasar build -m capacitor -T android

# Korak 2: Otvaranje u Android Studiju za generiranje APK-a

npx cap open android

💡 Ključne Napomene

    Router: src/router/routes.js automatski filtrira rute. Ako je mod cleaner, klijentske rute uopće ne postoje u buildu (i obrnuto).

    Capacitor: Svaki put kad promijeniš BUILD_TARGET, Quasar će u capacitor.config.json upisati ispravan appId. To omogućuje da imaš obje aplikacije instalirane istovremeno na istom mobitelu.

    Backend: Pripazi da je tvoj API server (Express) upaljen i da axios u boot datoteci pokazuje na ispravnu IP adresu tvog računala ako testiraš na pravom mobitelu.
