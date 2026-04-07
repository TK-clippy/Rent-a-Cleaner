<template>
  <q-page class="q-pa-md">
    <!-- Header s pozdravom -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">
          Bok, {{ auth.user?.ime || auth.user?.ime_prezime?.split(' ')[0] || 'čistaču' }}!
        </div>

        <div class="text-subtitle2 text-grey-7">
          <template v-if="loading"> Učitavam tvoj raspored... </template>
          <template v-else>
            {{
              poslovi.length > 0
                ? `Danas imaš ${poslovi.length} dogovorena čišćenja.`
                : 'Danas nemaš zakazanih čišćenja.'
            }}
          </template>
        </div>
      </div>
      <q-avatar size="50px" class="shadow-2">
        <img :src="auth.user?.avatar || 'https://cdn.quasar.dev/img/avatar2.jpg'" />
      </q-avatar>
    </div>

    <!-- Kartice s metrikom -->
    <div class="row q-col-gutter-sm q-mb-lg">
      <div class="col-6">
        <q-card class="bg-primary text-white text-center q-pa-sm">
          <div class="text-h6 text-weight-bold">
            {{ Number(stats.ukupna_zarada || 0).toFixed(2) }} €
          </div>
          <div class="text-caption">Ukupna zarada</div>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="bg-secondary text-white text-center q-pa-sm">
          <div class="text-h6 text-weight-bold">{{ stats.ukupno_poslova || 0 }}</div>
          <div class="text-caption">Odrađenih poslova</div>
        </q-card>
      </div>
    </div>

    <!-- Popis poslova / raspored -->
    <div class="text-h6 text-weight-bold q-mb-md">Tvoj raspored</div>

    <div v-if="loading" class="row justify-center q-my-xl">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-else-if="poslovi.length === 0" class="column items-center q-mt-xl text-grey-6">
      <q-icon name="event_available" size="64px" />
      <div class="text-subtitle1 q-mt-md">Trenutno nemaš rezerviranih poslova.</div>
    </div>

    <div v-else>
      <q-card
        v-for="posao in poslovi"
        :key="posao.id"
        class="q-mb-md cursor-pointer border-left-accent shadow-2"
        @click="otvoriPosao(posao.id)"
      >
        <q-card-section>
          <div class="row justify-between items-center q-mb-sm">
            <q-chip
              :color="isToday(posao.datum_ciscenja) ? 'negative' : 'info'"
              text-color="white"
              size="sm"
              class="text-weight-bold"
            >
              {{ isToday(posao.datum_ciscenja) ? 'DANAS' : formatDate(posao.datum_ciscenja) }} •
              {{ posao.vrijeme_pocetka ? posao.vrijeme_pocetka.substring(0, 5) : '00:00' }}h
            </q-chip>
            <div class="text-weight-bold text-primary">{{ posao.ukupna_cijena }} €</div>
          </div>

          <div class="text-subtitle1 text-weight-bold">{{ posao.usluga_ime }}</div>

          <div class="text-caption text-grey-8 q-mb-xs">Klijent: {{ posao.klijent_ime }}</div>

          <div class="row items-center text-grey-7 q-mt-sm">
            <q-icon name="place" size="16px" class="q-mr-xs text-primary" />
            <span class="text-caption">{{ posao.adresa || 'Adresa nije navedena' }}</span>
          </div>

          <div class="row items-center text-grey-7 q-mt-xs" v-if="posao.oprema_agencije">
            <q-icon name="inventory_2" size="16px" class="q-mr-xs text-orange" />
            <span class="text-caption text-orange-9 text-weight-medium"
              >Potrebno preuzeti opremu</span
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { useAuthStore } from 'stores/auth'

const router = useRouter()
const auth = useAuthStore()

// State varijable
const stats = ref({ ukupna_zarada: 0, ukupno_poslova: 0 })
const poslovi = ref([])
const loading = ref(true)

// Funkcija za dohvaćanje podataka s backenda
const ucitajPodatke = async () => {
  loading.value = true
  try {
    // 1. Dohvati statistiku (broj poslova i zaradu)
    const sRes = await api.get('/cleaners/stats')
    stats.value = sRes.data

    // 2. Dohvati listu rezervacija dodijeljenih ovom čistaču
    const pRes = await api.get('/bookings/my-bookings')
    poslovi.value = pRes.data
  } catch (err) {
    console.error('Greška pri učitavanju dashboarda:', err)
  } finally {
    loading.value = false
  }
}

// Helper: Provjerava je li datum danas
const isToday = (dateStr) => {
  if (!dateStr) return false
  const today = new Date().toISOString().split('T')[0]
  const d = new Date(dateStr).toISOString().split('T')[0]
  return d === today
}

// Helper: Formatira datum u HR format (dd.mm.)
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('hr-HR', { day: '2-digit', month: '2-digit' })
}

onMounted(() => {
  ucitajPodatke()
})

// Navigacija na detalje posla
const otvoriPosao = (id) => {
  router.push({ name: 'cleaner-active-job', query: { id } })
}
</script>

<style scoped>
.border-left-accent {
  border-left: 5px solid var(--q-primary);
  transition: transform 0.2s;
}
.border-left-accent:active {
  transform: scale(0.98);
}
</style>
