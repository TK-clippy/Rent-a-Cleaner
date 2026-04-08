<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="column items-center q-mb-lg q-pt-md">
      <q-avatar size="100px" class="shadow-3 q-mb-md">
        <img
          :src="`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profil.ime_prezime || 'K')}`"
        />
      </q-avatar>
      <div class="text-h5 text-weight-bold">{{ profil.ime_prezime || 'Profil' }}</div>
      <div class="text-subtitle2 text-grey-7">{{ profil.email }}</div>
    </div>

    <div class="text-h6 text-weight-bold q-mb-sm">Uredi profil</div>
    <q-card class="q-mb-lg shadow-2">
      <q-card-section class="q-gutter-y-md">
        <q-input v-model="forma.ime_prezime" label="Ime i prezime" filled rounded bg-color="white">
          <template v-slot:prepend><q-icon name="person" color="primary" /></template>
        </q-input>
        <q-input v-model="forma.telefon" label="Telefon" filled rounded bg-color="white">
          <template v-slot:prepend><q-icon name="phone" color="primary" /></template>
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
      <q-item clickable v-ripple @click="$router.push({ name: 'client-bookings' })">
        <q-item-section avatar><q-icon name="event_note" color="grey-7" /></q-item-section>
        <q-item-section>
          <q-item-label>Moje rezervacije</q-item-label>
          <q-item-label caption>Pregled i povijest</q-item-label>
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
const spremanje = ref(false)
const forma = ref({ ime_prezime: '', telefon: '' })

onMounted(async () => {
  try {
    const res = await api.get('/users/profile')
    profil.value = res.data
    forma.value = {
      ime_prezime: res.data.ime_prezime || '',
      telefon: res.data.telefon || '',
    }
  } catch (err) {
    console.error('Greška pri dohvaćanju profila', err)
  }
})

const spremiProfil = async () => {
  spremanje.value = true
  try {
    await api.put('/users/profile', forma.value)
    auth.user.ime_prezime = forma.value.ime_prezime
    localStorage.setItem('user', JSON.stringify(auth.user))
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
