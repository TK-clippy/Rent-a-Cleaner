<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="column items-center q-mb-lg q-pt-md">
      <q-avatar size="100px" class="shadow-3 q-mb-md">
        <img
          :src="`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profil.ime_prezime || 'C')}`"
        />
      </q-avatar>
      <div class="text-h5 text-weight-bold">{{ profil.ime_prezime || 'Profil Čistača' }}</div>
      <div class="text-subtitle2 text-grey-7">{{ profil.email }}</div>
      <div class="row items-center q-mt-sm bg-white q-px-md q-py-xs rounded-borders shadow-1">
        <q-icon name="star" color="warning" size="24px" />
        <span class="text-h6 text-weight-bold q-ml-sm">{{
          Number(profil.prosjecna_ocjena || 0).toFixed(1)
        }}</span>
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

    <div class="text-h6 text-weight-bold q-mb-sm">Uredi profil</div>
    <q-card class="q-mb-lg shadow-2">
      <q-card-section class="q-gutter-y-md">
        <q-input v-model="forma.telefon" label="Telefon" filled rounded bg-color="white">
          <template v-slot:prepend><q-icon name="phone" color="primary" /></template>
        </q-input>
        <q-input
          v-model="forma.cijena_po_satu"
          label="Cijena po satu (€)"
          type="number"
          filled
          rounded
          bg-color="white"
        >
          <template v-slot:prepend><q-icon name="euro" color="primary" /></template>
        </q-input>
        <q-input
          v-model="forma.bio"
          label="Bio / O meni"
          type="textarea"
          filled
          rounded
          bg-color="white"
          autogrow
        >
          <template v-slot:prepend><q-icon name="edit" color="primary" /></template>
        </q-input>
        <q-btn
          label="Spremi promjene"
          color="primary"
          rounded
          unelevated
          class="full-width"
          :loading="spremanje"
          @click="spremiProfil"
        />
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

const profil = ref({})
const stats = ref({ ukupno_poslova: 0, ukupna_zarada: 0 })
const spremanje = ref(false)
const forma = ref({ telefon: '', cijena_po_satu: '', bio: '' })

onMounted(async () => {
  try {
    const [resProfil, resStats] = await Promise.all([
      api.get('/cleaners/profile'),
      api.get('/cleaners/stats'),
    ])
    profil.value = resProfil.data
    stats.value = resStats.data
    forma.value = {
      telefon: resProfil.data.telefon || '',
      cijena_po_satu: resProfil.data.cijena_po_satu || '',
      bio: resProfil.data.bio || '',
    }
  } catch (err) {
    console.error('Greška pri dohvaćanju profila', err)
  }
})

const spremiProfil = async () => {
  spremanje.value = true
  try {
    await api.put('/cleaners/profile', forma.value)
    $q.notify({ color: 'positive', message: 'Profil uspješno ažuriran!' })
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    $q.notify({ color: 'negative', message: 'Greška pri spremanju.' })
  } finally {
    spremanje.value = false
  }
}

const odjava = () => {
  $q.dialog({
    title: 'Odjava',
    message: 'Jeste li sigurni da se želite odjaviti?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    auth.logout()
    router.push('/auth/login')
  })
}
</script>

<style scoped>
.border-right {
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
