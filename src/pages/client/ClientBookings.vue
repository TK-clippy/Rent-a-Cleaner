<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Moje rezervacije</div>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      no-caps
    >
      <q-tab name="aktivne" label="Nadolazeće" />
      <q-tab name="povijest" label="Povijest" />
    </q-tabs>

    <q-separator />

    <div v-if="loading" class="row justify-center q-my-xl">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div
      v-else-if="filtriraneRezervacije.length === 0"
      class="column items-center q-mt-xl text-grey-6"
    >
      <q-icon name="event_busy" size="64px" />
      <div class="text-h6 q-mt-md">Nema rezervacija u ovoj kategoriji</div>
    </div>

    <q-tab-panels v-else v-model="tab" animated class="bg-transparent q-mt-md">
      <q-tab-panel name="aktivne" class="q-pa-none">
        <q-card
          v-for="res in filtriraneRezervacije"
          :key="res.id"
          class="q-mb-md border-primary shadow-2"
        >
          <q-card-section>
            <div class="row justify-between items-center q-mb-sm">
              <q-chip
                :color="getStatusColor(res.status)"
                text-color="white"
                size="sm"
                class="text-weight-bold"
              >
                {{ res.status ? res.status.toUpperCase() : 'NA ČEKANJU' }}
              </q-chip>
              <div class="text-caption text-weight-medium text-primary">
                {{ formatirajDatum(res.datum_ciscenja) }} u
                {{ res.vrijeme_pocetka ? res.vrijeme_pocetka.substring(0, 5) : '' }}h
              </div>
            </div>

            <div class="text-subtitle1 text-weight-bold">
              {{ res.usluga_ime }} - {{ res.cistac_ime }}
            </div>

            <div class="text-body2 text-grey-7">
              <q-icon name="place" /> {{ res.adresa || 'Adresa nije navedena' }}
            </div>
          </q-card-section>

          <q-card-actions align="right" class="q-pt-none">
            <q-btn
              flat
              color="negative"
              label="Otkaži"
              no-caps
              @click="otkaziRezervaciju(res.id)"
            />
            <q-btn
              flat
              color="primary"
              label="Kontaktiraj"
              icon="chat"
              no-caps
              @click="kontaktiraj(res)"
            />
          </q-card-actions>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="povijest" class="q-pa-none">
        <q-card
          v-for="res in filtriraneRezervacije"
          :key="res.id"
          class="q-mb-md opacity-90 shadow-1"
        >
          <q-card-section>
            <div class="row justify-between items-center q-mb-sm">
              <q-chip color="grey-7" text-color="white" size="sm">
                {{ res.status }}
              </q-chip>
              <div class="text-caption text-grey-7">
                {{ formatirajDatum(res.datum_ciscenja) }}
              </div>
            </div>

            <div class="text-subtitle1 text-weight-bold">
              {{ res.usluga_ime }} - {{ res.cistac_ime }}
            </div>

            <div class="text-body2 text-grey-9 text-weight-medium">
              Ukupno plaćeno: {{ res.ukupna_cijena }} €
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              outline
              color="accent"
              :label="res.recenzija_id ? 'Recenzirano' : 'Ocijeni čistača'"
              :disable="!!res.recenzija_id"
              no-caps
              @click="pripremiRecenziju(res)"
            />
          </q-card-actions>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="otvoriRecenziju" position="bottom">
      <q-card style="width: 100%; border-radius: 20px 20px 0 0">
        <q-card-section class="column items-center">
          <div class="text-h6 q-mb-xs">Kako ste zadovoljni?</div>
          <div class="text-caption text-grey q-mb-md">
            Vaša ocjena za {{ odabranaRezervacija?.cistac_ime }}
          </div>

          <q-rating
            v-model="novaRecenzija.ocjena"
            size="3.5em"
            color="accent"
            icon="star_border"
            icon-selected="star"
            class="q-mb-md"
          />

          <q-input
            v-model="novaRecenzija.komentar"
            filled
            type="textarea"
            placeholder="Što vam se najviše svidjelo?"
            class="full-width"
            color="accent"
          />
        </q-card-section>

        <q-card-actions align="center" class="q-px-md q-pb-lg">
          <q-btn
            color="primary"
            label="Pošalji recenziju"
            class="full-width q-py-sm"
            rounded
            unelevated
            :loading="slanjeRecenzije"
            @click="posaljiRecenziju"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'

const $q = useQuasar()
const auth = useAuthStore()
const tab = ref('aktivne')
const loading = ref(true)
const rezervacije = ref([])

const otvoriRecenziju = ref(false)
const odabranaRezervacija = ref(null)
const slanjeRecenzije = ref(false)
const novaRecenzija = ref({
  ocjena: 0,
  komentar: '',
})

const ucitajRezervacije = async () => {
  loading.value = true
  try {
    const res = await api.get('/bookings/my-bookings')
    console.log('REZERVACIJE:', res.data) // ← DODAJ OVO
    rezervacije.value = Array.isArray(res.data) ? res.data : []
  } catch (err) {
    console.error(err)
    $q.notify({ color: 'negative', message: 'Greška pri učitavanju rezervacija' })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  ucitajRezervacije()
})

const filtriraneRezervacije = computed(() => {
  if (tab.value === 'aktivne') {
    return rezervacije.value.filter((r) =>
      ['pending', 'confirmed', 'Na čekanju', 'Potvrđeno'].includes(r.status),
    )
  } else {
    return rezervacije.value.filter((r) => ['completed', 'cancelled'].includes(r.status))
  }
})

const getStatusColor = (status) => {
  const s = status ? status.toLowerCase() : ''
  if (s === 'pending' || s === 'na čekanju') return 'orange'
  if (s === 'confirmed' || s === 'potvrđeno') return 'info'
  if (s === 'completed' || s === 'dovršeno') return 'positive'
  if (s === 'cancelled' || s === 'otkazano') return 'negative'
  return 'grey'
}

const formatirajDatum = (isoString) => {
  return new Date(isoString).toLocaleDateString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const pripremiRecenziju = (res) => {
  odabranaRezervacija.value = res
  novaRecenzija.value = { ocjena: 5, komentar: '' }
  otvoriRecenziju.value = true
}

const posaljiRecenziju = async () => {
  if (novaRecenzija.value.ocjena === 0) {
    $q.notify({ message: 'Molimo odaberite ocjenu', color: 'warning' })
    return
  }

  slanjeRecenzije.value = true
  try {
    await api.post('/cleaners/reviews', {
      booking_id: odabranaRezervacija.value.id,
      cleaner_id: odabranaRezervacija.value.cleaner_id,
      user_id: auth.user?.id,
      ocjena: novaRecenzija.value.ocjena,
      komentar: novaRecenzija.value.komentar,
    })

    $q.notify({ color: 'positive', message: 'Hvala na recenziji!' })
    otvoriRecenziju.value = false
    ucitajRezervacije()
  } catch (err) {
    console.error(err)
    $q.notify({ color: 'negative', message: 'Greška pri slanju recenzije' })
  } finally {
    slanjeRecenzije.value = false
  }
}

const otkaziRezervaciju = (id) => {
  $q.dialog({
    title: 'Otkaži rezervaciju',
    message: 'Jeste li sigurni da želite otkazati ovaj termin?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await api.patch(`/bookings/${id}/cancel`)
      $q.notify({ color: 'positive', message: 'Rezervacija uspješno otkazana' })
      ucitajRezervacije()
    } catch (err) {
      console.error(err)
      $q.notify({ color: 'negative', message: 'Greška pri otkazivanju' })
    }
  })
}
const kontaktiraj = (rezervacija) => {
  // Ovisno tko gleda, uzimamo prava imena i podatke
  const ime = rezervacija.cistac_ime || rezervacija.klijent_ime
  const email = rezervacija.cistac_email || rezervacija.klijent_email || 'Nije dostupno'
  const telefon = rezervacija.cistac_telefon || rezervacija.klijent_telefon || 'Nije dostupno'

  $q.dialog({
    title: `Kontaktiraj: ${ime}`,
    // Koristimo HTML kako bismo napravili klikabilne linkove za mail i poziv
    message: `
      <div class="q-mt-md">
        <div class="q-mb-sm">
          <q-icon name="email" color="primary" size="sm" class="q-mr-sm" />
          <a href="mailto:${email}" style="text-decoration: none; color: #1976D2; font-size: 16px;">${email}</a>
        </div>
        <div>
          <q-icon name="phone" color="primary" size="sm" class="q-mr-sm" />
          <a href="tel:${telefon}" style="text-decoration: none; color: #1976D2; font-size: 16px;">${telefon}</a>
        </div>
      </div>
    `,
    html: true,
    ok: {
      label: 'Zatvori',
      color: 'grey-7',
      flat: true,
    },
  })
}
</script>

<style scoped>
.border-primary {
  border-left: 5px solid var(--q-primary);
}
.opacity-90 {
  opacity: 0.9;
}
/* iOS Style zaobljeni rubovi kartica */
.q-card {
  border-radius: 16px;
}
</style>
