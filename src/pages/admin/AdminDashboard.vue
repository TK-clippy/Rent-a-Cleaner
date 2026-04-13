<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-weight-bold q-mb-xl text-dark">Nadzorna ploča</div>

    <div v-if="loading" class="flex flex-center">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card class="bg-white shadow-2">
          <q-card-section class="row items-center">
            <q-avatar icon="person" color="blue-1" text-color="blue" size="60px" class="q-mr-md" />
            <div>
              <div class="text-subtitle2 text-grey-7">Ukupno Klijenata</div>
              <div class="text-h4 text-weight-bold">{{ stats.klijenti || 0 }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="bg-white shadow-2">
          <q-card-section class="row items-center">
            <q-avatar
              icon="cleaning_services"
              color="green-1"
              text-color="green"
              size="60px"
              class="q-mr-md"
            />
            <div>
              <div class="text-subtitle2 text-grey-7">Registrirani Čistači</div>
              <div class="text-h4 text-weight-bold">{{ stats.cistaci || 0 }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="bg-white shadow-2">
          <q-card-section class="row items-center">
            <q-avatar
              icon="event_available"
              color="orange-1"
              text-color="orange"
              size="60px"
              class="q-mr-md"
            />
            <div>
              <div class="text-subtitle2 text-grey-7">Ukupno Rezervacija</div>
              <div class="text-h4 text-weight-bold">{{ stats.rezervacije || 0 }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const stats = ref({})
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await api.get('/admin/stats')
    stats.value = res.data
  } catch (error) {
    console.error('Greška:', error)
  } finally {
    loading.value = false
  }
})
</script>
