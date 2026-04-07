<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Moja raspoloživost</div>
    <div class="text-caption text-grey-7 q-mb-lg">
      Označi dane i sate kada si slobodan/na za primanje novih rezervacija.
    </div>

    <q-card class="q-mb-md shadow-2">
      <q-date
        v-model="odabraniDatum"
        mask="YYYY-MM-DD"
        color="primary"
        class="full-width no-shadow"
        flat
      />
    </q-card>

    <q-card class="q-pa-md q-mb-lg shadow-2" v-if="odabraniDatum">
      <div class="text-subtitle2 q-mb-md">
        Dodaj smjenu za:
        <span class="text-primary text-weight-bold">{{ formatirajDatum(odabraniDatum) }}</span>
      </div>

      <div class="row q-col-gutter-sm items-center">
        <div class="col-5">
          <q-input filled v-model="vrijemeOd" type="time" label="Od" dense />
        </div>
        <div class="col-5">
          <q-input filled v-model="vrijemeDo" type="time" label="Do" dense />
        </div>
        <div class="col-2 flex flex-center">
          <q-btn round color="primary" icon="add" @click="dodajTermin" :loading="loading" />
        </div>
      </div>
    </q-card>

    <div class="text-h6 text-weight-bold q-mb-sm">Aktivni termini</div>

    <div v-if="loadingTermini" class="flex flex-center q-my-md">
      <q-spinner color="primary" size="2em" />
    </div>

    <q-list v-else separator class="bg-white rounded-borders shadow-1">
      <q-item v-if="spremljeniTermini.length === 0">
        <q-item-section class="text-grey text-center q-pa-md"
          >Nemaš upisanih termina.</q-item-section
        >
      </q-item>

      <q-item v-for="termin in spremljeniTermini" :key="termin.id">
        <q-item-section>
          <q-item-label class="text-weight-bold">{{ formatirajDatum(termin.datum) }}</q-item-label>
          <q-item-label caption
            >{{ termin.vrijeme_pocetka }} - {{ termin.vrijeme_kraja }}</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-btn
            flat
            round
            color="negative"
            icon="delete_outline"
            @click="obrisiTermin(termin.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const odabraniDatum = ref(new Date().toISOString().split('T')[0]) // Današnji datum
const vrijemeOd = ref('08:00')
const vrijemeDo = ref('16:00')

const spremljeniTermini = ref([])
const loading = ref(false)
const loadingTermini = ref(false)

// Dohvati termine s backenda
const ucitajTermine = async () => {
  loadingTermini.value = true
  try {
    const res = await api.get('/cleaners/calendar') // Tvoj endpoint
    spremljeniTermini.value = res.data
  } catch (error) {
    console.error(error)
  } finally {
    loadingTermini.value = false
  }
}

// Pošalji novi termin na backend
const dodajTermin = async () => {
  if (!vrijemeOd.value || !vrijemeDo.value) return

  loading.value = true
  try {
    await api.post('/cleaners/calendar', {
      datum: odabraniDatum.value,
      vrijeme_pocetka: vrijemeOd.value,
      vrijeme_kraja: vrijemeDo.value,
    })
    $q.notify({ color: 'positive', message: 'Termin dodan!', icon: 'check' })
    ucitajTermine() // Osvježi listu
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    $q.notify({ color: 'negative', message: 'Greška pri dodavanju.' })
  } finally {
    loading.value = false
  }
}

// Obriši termin na backendu
const obrisiTermin = async (id) => {
  try {
    await api.delete(`/cleaners/calendar/${id}`)
    $q.notify({ color: 'info', message: 'Termin uklonjen.' })
    ucitajTermine()
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    $q.notify({ color: 'negative', message: 'Greška pri brisanju.' })
  }
}

const formatirajDatum = (datum) => {
  return new Date(datum).toLocaleDateString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

onMounted(() => {
  ucitajTermine()
})
</script>
