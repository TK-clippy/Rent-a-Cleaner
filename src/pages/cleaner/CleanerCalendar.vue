<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Moja raspoloživost</div>
    <div class="text-caption text-grey-7 q-mb-lg">
      Označi dane i sate kada si slobodan/na za primanje novih rezervacija.
    </div>

    <q-card class="q-mb-md">
      <q-date
        v-model="odabraniDatum"
        mask="YYYY-MM-DD"
        color="primary"
        class="full-width no-shadow"
        flat
      />
    </q-card>

    <q-card class="q-pa-md q-mb-lg" v-if="odabraniDatum">
      <div class="text-subtitle2 q-mb-md">
        Dodaj smjenu za: <span class="text-primary text-weight-bold">{{ odabraniDatum }}</span>
      </div>

      <div class="row q-col-gutter-sm items-center">
        <div class="col-5">
          <q-input filled v-model="vrijemeOd" type="time" label="Od" dense />
        </div>
        <div class="col-5">
          <q-input filled v-model="vrijemeDo" type="time" label="Do" dense />
        </div>
        <div class="col-2 flex flex-center">
          <q-btn round color="primary" icon="add" @click="dodajTermin" />
        </div>
      </div>
    </q-card>

    <div class="text-h6 text-weight-bold q-mb-sm">Aktivni termini</div>
    <q-list separator class="bg-white rounded-borders">
      <q-item v-for="(termin, index) in spremljeniTermini" :key="index">
        <q-item-section>
          <q-item-label class="text-weight-bold">{{ termin.datum }}</q-item-label>
          <q-item-label caption>{{ termin.od }} - {{ termin.do }}h</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round color="negative" icon="delete_outline" @click="obrisiTermin(index)" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const odabraniDatum = ref('2024-04-15')
const vrijemeOd = ref('08:00')
const vrijemeDo = ref('16:00')

const spremljeniTermini = ref([
  { datum: '2024-04-15', od: '08:00', do: '16:00' },
  { datum: '2024-04-16', od: '10:00', do: '14:00' },
])

const dodajTermin = () => {
  spremljeniTermini.value.push({
    datum: odabraniDatum.value,
    od: vrijemeOd.value,
    do: vrijemeDo.value,
  })
  $q.notify({ color: 'positive', message: 'Termin dodan!', icon: 'check' })
}

const obrisiTermin = (index) => {
  spremljeniTermini.value.splice(index, 1)
  $q.notify({ color: 'info', message: 'Termin uklonjen.' })
}
</script>
