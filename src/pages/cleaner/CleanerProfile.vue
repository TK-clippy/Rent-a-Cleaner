<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="column items-center q-mb-lg q-pt-md">
      <q-avatar size="100px" class="shadow-3 q-mb-md">
        <img :src="auth.user?.avatar || 'https://cdn.quasar.dev/img/avatar2.jpg'" />
      </q-avatar>
      <div class="text-h5 text-weight-bold">{{ auth.user?.ime_prezime || 'Profil Čistača' }}</div>
      <div class="text-subtitle2 text-grey-7">Profesionalni partner</div>

      <div class="row items-center q-mt-sm bg-white q-px-md q-py-xs rounded-borders shadow-1">
        <q-icon name="star" color="warning" size="24px" />
        <span class="text-h6 text-weight-bold q-ml-sm">4.9</span>
        <span class="text-caption text-grey-6 q-ml-xs">(Ocjena)</span>
      </div>
    </div>

    <div class="text-h6 text-weight-bold q-mb-sm">Tvoja statistika</div>
    <q-card class="q-mb-lg shadow-2">
      <q-card-section class="row text-center">
        <div class="col-6 border-right">
          <div class="text-h5 text-weight-bold text-primary">{{ stats.ukupno_poslova || 0 }}</div>
          <div class="text-caption text-grey-7">Odrađenih poslova</div>
        </div>
        <div class="col-6">
          <div class="text-h5 text-weight-bold text-positive">
            {{ Number(stats.ukupna_zarada || 0).toFixed(2) }} €
          </div>
          <div class="text-caption text-grey-7">Ukupna zarada</div>
        </div>
      </q-card-section>
    </q-card>

    <div class="text-h6 text-weight-bold q-mb-sm">Postavke</div>
    <q-list class="bg-white rounded-borders shadow-1">
      <q-item clickable v-ripple @click="$router.push({ name: 'cleaner-calendar' })">
        <q-item-section avatar><q-icon name="calendar_month" color="grey-7" /></q-item-section>
        <q-item-section>
          <q-item-label>Moj Raspored</q-item-label>
          <q-item-label caption>Uredi dostupnost</q-item-label>
        </q-item-section>
        <q-item-section side><q-icon name="chevron_right" /></q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple class="text-negative" @click="odjava">
        <q-item-section avatar><q-icon name="logout" color="negative" /></q-item-section>
        <q-item-section>Odjava s profila</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const auth = useAuthStore()
const router = useRouter()
const $q = useQuasar()
const stats = ref({ ukupno_poslova: 0, ukupna_zarada: 0 })

onMounted(async () => {
  try {
    const res = await api.get('/cleaners/stats')
    stats.value = res.data
  } catch (err) {
    console.error('Greška pri dohvaćanju statistike', err)
  }
})

const odjava = () => {
  $q.dialog({
    title: 'Odjava',
    message: 'Jeste li sigurni da se želite odjaviti?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    auth.logout() // Osiguraj da imaš logout akciju u auth store-u
    router.push('/login')
  })
}
</script>

<style scoped>
.border-right {
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
