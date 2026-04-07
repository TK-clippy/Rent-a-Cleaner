<template>
  <q-page class="q-pa-md flex column">
    <q-btn
      flat
      icon="arrow_back"
      color="dark"
      label="Natrag"
      @click="$router.back()"
      class="q-mb-md q-px-none"
    />

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else-if="posao">
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h5 text-weight-bold">Detalji čišćenja</div>
        <q-chip :color="posao.status === 'completed' ? 'positive' : 'info'" text-color="white">
          {{ posao.status === 'completed' ? 'Završeno' : 'Na čekanju' }}
        </q-chip>
      </div>

      <q-card class="q-mb-md bg-grey-1 shadow-2">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">{{ posao.klijent_ime }}</div>
          <div class="row items-center text-grey-8 q-mt-xs">
            <q-icon name="place" size="18px" class="q-mr-xs text-primary" />
            <span>{{ posao.adresa || 'Adresa nije poznata' }}</span>
          </div>

          <div class="row items-center text-grey-8 q-mt-xs">
            <q-icon name="payments" size="18px" class="q-mr-xs text-positive" />
            <span class="text-weight-bold">{{ posao.ukupna_cijena }} €</span>
          </div>

          <q-separator class="q-my-md" />

          <div class="row justify-around">
            <q-btn flat color="primary" icon="call" label="Nazovi" class="column items-center" />
            <q-btn
              flat
              color="primary"
              icon="directions"
              label="Karta"
              class="column items-center"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-auto shadow-2">
        <q-card-section>
          <div class="text-subtitle2 text-grey-7 q-mb-xs">Usluga:</div>
          <div class="text-weight-bold q-mb-md">{{ posao.usluga_ime }}</div>

          <template v-if="posao.napomena">
            <div class="text-subtitle2 text-grey-7 q-mb-xs">Napomena klijenta:</div>
            <div class="bg-amber-1 q-pa-sm rounded-borders text-dark">"{{ posao.napomena }}"</div>
          </template>
        </q-card-section>
      </q-card>

      <div class="q-mt-xl q-mb-md" v-if="posao.status !== 'completed'">
        <q-btn
          v-if="!posaoZapoceo"
          color="primary"
          class="full-width text-weight-bold shadow-3"
          size="xl"
          label="ZAPOČNI ČIŠĆENJE"
          @click="posaoZapoceo = true"
        />
        <q-btn
          v-else
          color="negative"
          class="full-width text-weight-bold shadow-3"
          size="xl"
          label="ZAVRŠI POSAO"
          @click="zavrsiPosao"
          :loading="zavrsavanje"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const posao = ref(null)
const loading = ref(true)
const posaoZapoceo = ref(false)
const zavrsavanje = ref(false)

const ucitajPosao = async () => {
  loading.value = true
  try {
    // Dohvaćamo točno ovaj posao po ID-u iz URL-a
    const res = await api.get(`/bookings/${route.query.id}`)
    posao.value = res.data
  } catch (error) {
    console.error('Greška pri učitavanju posla:', error)
    $q.notify({ color: 'negative', message: 'Nije moguće učitati detalje posla.' })
  } finally {
    loading.value = false
  }
}

const zavrsiPosao = () => {
  $q.dialog({
    title: 'Potvrda',
    message: 'Jeste li sigurni da ste završili posao i želite ga označiti kao gotovog?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    zavrsavanje.value = true
    try {
      // Šaljemo backendu da je gotovo
      await api.put(`/bookings/${posao.value.id}/status`, { status: 'completed' })

      $q.notify({ color: 'positive', message: 'Posao uspješno završen!', icon: 'done_all' })
      router.push({ name: 'cleaner-dashboard' })
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      $q.notify({ color: 'negative', message: 'Greška pri završetku posla.' })
    } finally {
      zavrsavanje.value = false
    }
  })
}

onMounted(() => {
  if (route.query.id) ucitajPosao()
})
</script>
