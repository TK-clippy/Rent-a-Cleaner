<template>
  <q-page class="q-pa-md bg-grey-2" style="height: calc(100vh - 50px)">
    <q-card class="full-height shadow-2">
      <q-splitter v-model="splitterModel" class="full-height">
        <template v-slot:before>
          <div class="q-pa-md bg-grey-1 full-height">
            <div class="text-h6 text-weight-bold q-mb-md">Poruke</div>
            <q-input dense filled v-model="search" placeholder="Pretraži korisnike" class="q-mb-md">
              <template v-slot:append><q-icon name="search" /></template>
            </q-input>

            <q-list separator>
              <q-item
                v-for="kontakt in kontakti"
                :key="kontakt.id"
                clickable
                v-ripple
                :active="aktivniKontakt === kontakt.id"
                active-class="bg-blue-1"
                @click="aktivniKontakt = kontakt.id"
              >
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">{{
                    kontakt.ime.charAt(0)
                  }}</q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ kontakt.ime }}</q-item-label>
                  <q-item-label caption lines="1">{{ kontakt.zadnjaPoruka }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-badge v-if="kontakt.neprocitano" color="negative" rounded />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>

        <template v-slot:after>
          <div class="column full-height" v-if="aktivniKontakt">
            <q-toolbar class="bg-white border-bottom text-dark">
              <q-avatar size="40px" color="primary" text-color="white" class="q-mr-sm">
                {{ trenutniKontakt?.ime.charAt(0) }}
              </q-avatar>
              <q-toolbar-title class="text-weight-bold text-subtitle1">
                {{ trenutniKontakt?.ime }}
                <div class="text-caption text-grey-6">{{ trenutniKontakt?.uloga }}</div>
              </q-toolbar-title>
              <q-btn flat round icon="more_vert" />
            </q-toolbar>

            <q-scroll-area class="col q-pa-md bg-grey-2">
              <q-chat-message
                v-for="msg in poruke"
                :key="msg.id"
                :text="[msg.tekst]"
                :sent="msg.poslanoOdAdmina"
                :bg-color="msg.poslanoOdAdmina ? 'primary' : 'white'"
                :text-color="msg.poslanoOdAdmina ? 'white' : 'dark'"
                :stamp="msg.vrijeme"
              />
            </q-scroll-area>

            <div class="q-pa-sm bg-white border-top row items-center">
              <q-input
                v-model="novaPoruka"
                outlined
                dense
                placeholder="Napiši poruku..."
                class="col q-mr-sm"
                @keyup.enter="posaljiPoruku"
              />
              <q-btn round color="primary" icon="send" @click="posaljiPoruku" />
            </div>
          </div>

          <div v-else class="full-height flex flex-center text-grey-6 column">
            <q-icon name="forum" size="64px" class="q-mb-md opacity-50" />
            <div class="text-h6">Odaberi razgovor</div>
          </div>
        </template>
      </q-splitter>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const splitterModel = ref(30) // 30% širine za listu kontakata
const search = ref('')
const aktivniKontakt = ref(null)
const novaPoruka = ref('')

// Mock podaci (kasnije spojiš s backendom preko axiosa i WebSocketa)
const kontakti = ref([
  {
    id: 1,
    ime: 'Marko Klijentović',
    uloga: 'Klijent',
    zadnjaPoruka: 'Trebam pomoć oko računa.',
    neprocitano: true,
  },
  {
    id: 2,
    ime: 'Ana Perić',
    uloga: 'Čistač',
    zadnjaPoruka: 'Mogu li otkazati smjenu sutra?',
    neprocitano: false,
  },
])

const poruke = ref([
  { id: 1, tekst: 'Poštovani, imam problem s naplatom.', poslanoOdAdmina: false, vrijeme: '10:00' },
  {
    id: 2,
    tekst: 'Pozdrav Marko, molim Vas broj rezervacije kako bismo provjerili.',
    poslanoOdAdmina: true,
    vrijeme: '10:05',
  },
])

const trenutniKontakt = computed(() => kontakti.value.find((k) => k.id === aktivniKontakt.value))

const posaljiPoruku = () => {
  if (!novaPoruka.value.trim()) return

  poruke.value.push({
    id: Date.now(),
    tekst: novaPoruka.value,
    poslanoOdAdmina: true,
    vrijeme: new Date().toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' }),
  })
  novaPoruka.value = ''
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.border-top {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
