<template>
  <q-page class="q-pa-md">
    <q-btn
      flat
      icon="arrow_back"
      color="dark"
      label="Natrag"
      @click="$router.back()"
      class="q-mb-md q-px-none"
    />

    <div class="text-h5 text-weight-bold q-mb-lg">Detalji rezervacije</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle2 text-grey-7 q-mb-sm">Kada vam treba čišćenje?</div>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-input filled v-model="datum" type="date" />
          </div>
          <div class="col-6">
            <q-input filled v-model="vrijeme" type="time" />
          </div>
        </div>

        <q-input filled v-model="adresa" label="Vaša adresa" class="q-mt-md">
          <template v-slot:prepend><q-icon name="place" /></template>
        </q-input>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle2 text-grey-7 q-mb-sm">Veličina prostora i oprema</div>
        <q-input
          filled
          v-model.number="kvadratura"
          type="number"
          label="Kvadratura (m²)"
          suffix="m²"
        />

        <q-toggle
          v-model="trebaOpremu"
          label="Čistač treba donijeti svoja sredstva (+10€)"
          color="primary"
          class="q-mt-sm"
        />
      </q-card-section>
    </q-card>

    <q-card class="bg-grey-1">
      <q-card-section>
        <div class="row justify-between q-mb-sm">
          <span class="text-grey-8">Osnovno čišćenje (procjena 3h)</span>
          <span class="text-weight-bold">45.00 €</span>
        </div>
        <div class="row justify-between q-mb-sm" v-if="trebaOpremu">
          <span class="text-grey-8">Sredstva za čišćenje</span>
          <span class="text-weight-bold">10.00 €</span>
        </div>
        <q-separator class="q-my-md" />
        <div class="row justify-between text-h6">
          <span>Ukupno</span>
          <span class="text-primary">{{ ukupnaCijena }} €</span>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-mt-xl">
      <q-btn
        color="primary"
        class="full-width"
        size="lg"
        label="Potvrdi i plati"
        @click="potvrdiRezervaciju"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'
import { api } from 'boot/axios'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
// eslint-disable-next-line no-unused-vars
const auth = useAuthStore()

// Čistač i usluga dolaze iz query parametara
const cleanerId = route.query.id
const serviceId = route.query.serviceId || 1 // fallback na 1 dok nema odabira usluge

const datum = ref('')
const vrijeme = ref('10:00')
const adresa = ref('')
const kvadratura = ref(50)
const trebaOpremu = ref(false)
const loading = ref(false)

const ukupnaCijena = computed(() => {
  let osnovica = 45
  if (trebaOpremu.value) osnovica += 10
  return osnovica.toFixed(2)
})

const potvrdiRezervaciju = async () => {
  if (!datum.value || !adresa.value) {
    $q.notify({ color: 'warning', message: 'Molimo unesite datum i adresu' })
    return
  }

  if (!cleanerId) {
    $q.notify({ color: 'negative', message: 'Nije odabran čistač' })
    return
  }

  loading.value = true

  try {
    await api.post('/bookings', {
      cleaner_id: cleanerId,
      service_id: serviceId,
      adresa: adresa.value,
      kvadratura: kvadratura.value,
      datum_ciscenja: datum.value,
      vrijeme_pocetka: vrijeme.value,
      ukupna_cijena: parseFloat(ukupnaCijena.value),
      oprema_agencije: trebaOpremu.value ? 1 : 0,
    })

    $q.notify({
      color: 'positive',
      message: 'Uspješno rezervirano! Preusmjeravam...',
      icon: 'check_circle',
    })

    setTimeout(() => {
      router.push({ name: 'client-bookings' })
    }, 1500)
  } catch (err) {
    console.error(err)
    $q.notify({
      color: 'negative',
      message: err.response?.data?.poruka || 'Greška pri rezervaciji',
    })
  } finally {
    loading.value = false
  }
}
</script>
