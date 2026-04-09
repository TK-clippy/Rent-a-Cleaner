<template>
  <q-page class="q-pa-md">
    <div class="column items-center q-mb-xl q-pt-lg">
      <q-avatar
        size="110px"
        class="q-mb-md relative-position"
        style="box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1)"
      >
        <img
          :src="`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profil.ime_prezime || 'C')}`"
        />
      </q-avatar>
      <div class="text-h5 text-weight-bolder text-dark">
        {{ profil.ime_prezime || 'Profil Čistača' }}
      </div>
      <div class="text-subtitle2 text-grey-6">{{ profil.email }}</div>

      <div class="rating-pill q-mt-md bg-white row items-center justify-center">
        <q-icon name="star" color="warning" size="20px" />
        <span class="text-subtitle1 text-weight-bolder q-ml-sm q-mr-xs">{{
          Number(profil.prosjecna_ocjena || 0).toFixed(1)
        }}</span>
        <span class="text-caption text-grey-5">Ocjena</span>
      </div>
    </div>

    <div class="text-subtitle1 text-weight-bold q-mb-sm text-grey-8 q-ml-sm">Tvoja statistika</div>
    <q-card class="q-mb-lg" flat>
      <q-card-section class="row text-center q-pa-none">
        <div class="col-6 border-right q-py-md">
          <div class="text-h4 text-weight-bolder text-primary">{{ stats.ukupno_poslova || 0 }}</div>
          <div class="text-caption text-weight-medium text-grey-6">Odrađenih poslova</div>
        </div>
        <div class="col-6 q-py-md">
          <div class="text-h4 text-weight-bolder text-positive">
            {{ Number(stats.ukupna_zarada || 0).toFixed(2) }}€
          </div>
          <div class="text-caption text-weight-medium text-grey-6">Ukupna zarada</div>
        </div>
      </q-card-section>
    </q-card>

    <div class="text-subtitle1 text-weight-bold q-mb-sm text-grey-8 q-ml-sm">Uredi profil</div>
    <q-card class="q-mb-lg" flat>
      <q-card-section class="q-gutter-y-md">
        <q-input v-model="forma.telefon" label="Telefon" filled rounded bg-color="grey-1">
          <template v-slot:prepend><q-icon name="phone" color="grey-7" /></template>
        </q-input>
        <q-input
          v-model="forma.cijena_po_satu"
          label="Cijena po satu (€)"
          type="number"
          filled
          rounded
          bg-color="grey-1"
        >
          <template v-slot:prepend><q-icon name="euro" color="grey-7" /></template>
        </q-input>
        <q-input
          v-model="forma.bio"
          label="Bio / O meni"
          type="textarea"
          filled
          rounded
          bg-color="grey-1"
          autogrow
        >
          <template v-slot:prepend><q-icon name="edit" color="grey-7" /></template>
        </q-input>
        <q-btn
          label="Spremi promjene"
          color="primary"
          rounded
          unelevated
          class="full-width q-mt-sm"
          :loading="spremanje"
          @click="spremiProfil"
        />
      </q-card-section>
    </q-card>

    <div class="text-subtitle1 text-weight-bold q-mb-sm text-grey-8 q-ml-sm">Postavke</div>
    <q-list class="ios-list q-mb-xl">
      <q-item clickable v-ripple @click="$router.push({ name: 'cleaner-calendar' })">
        <q-item-section avatar
          ><q-icon name="calendar_month" color="primary" size="28px"
        /></q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-medium">Moj Raspored</q-item-label>
          <q-item-label caption>Uredi dostupnost</q-item-label>
        </q-item-section>
        <q-item-section side><q-icon name="chevron_right" /></q-item-section>
      </q-item>

      <q-separator inset />

      <q-item clickable v-ripple @click="odjava">
        <q-item-section avatar
          ><q-icon name="logout" color="negative" size="28px"
        /></q-item-section>
        <q-item-section class="text-negative text-weight-medium">Odjava s profila</q-item-section>
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
    $q.notify({ color: 'positive', message: 'Profil uspješno ažuriran!', icon: 'check_circle' })
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    $q.notify({ color: 'negative', message: 'Greška pri spremanju.', icon: 'error' })
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
    ok: { color: 'negative', label: 'Odjavi se', flat: true },
    // eslint-disable-next-line no-dupe-keys
    cancel: { color: 'primary', label: 'Odustani', flat: true },
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
.rating-pill {
  border-radius: 30px;
  padding: 8px 18px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}
</style>
