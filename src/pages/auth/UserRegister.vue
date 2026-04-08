<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-1">
        <q-card
          flat
          bordered
          style="width: 100%; max-width: 400px; border-radius: 20px"
          class="q-pa-lg q-ma-md shadow-2"
        >
          <q-card-section class="text-center">
            <div class="text-h5 text-weight-bolder text-primary">Kreirajte račun</div>
            <div class="text-caption text-grey-7">Pridružite se Rent-A-Cleaner platformi</div>
          </q-card-section>

          <q-card-section class="q-gutter-y-md">
            <q-input
              v-model="forma.ime_prezime"
              label="Ime i prezime"
              filled
              rounded
              bg-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
            </q-input>

            <q-input
              v-model="forma.email"
              label="Email adresa"
              type="email"
              filled
              rounded
              bg-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>

            <q-input v-model="forma.telefon" label="Telefon" filled rounded bg-color="white">
              <template v-slot:prepend>
                <q-icon name="phone" color="primary" />
              </template>
            </q-input>

            <q-input
              v-model="forma.lozinka"
              label="Lozinka"
              :type="showPass ? 'text' : 'password'"
              filled
              rounded
              bg-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="showPass ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPass = !showPass"
                />
              </template>
            </q-input>

            <q-input
              v-model="forma.lozinka2"
              label="Potvrdi lozinku"
              :type="showPass ? 'text' : 'password'"
              filled
              rounded
              bg-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="lock_outline" color="primary" />
              </template>
            </q-input>
          </q-card-section>

          <q-select
            v-model="forma.uloga"
            :options="uloge"
            label="Vrsta računa"
            filled
            rounded
            bg-color="white"
            emit-value
            map-options
          >
            <template v-slot:prepend>
              <q-icon name="badge" color="primary" />
            </template>
          </q-select>

          <q-card-actions class="column q-mt-md">
            <q-btn
              label="Registriraj se"
              color="primary"
              rounded
              unelevated
              class="full-width q-py-sm text-weight-bold"
              :loading="loading"
              @click="handleRegister"
            />
          </q-card-actions>

          <q-separator class="q-my-md" inset />

          <div class="text-center">
            <q-btn
              flat
              no-caps
              label="Već imate račun? Prijavite se"
              color="secondary"
              to="/auth/login"
            />
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
defineOptions({ name: 'UserRegister' })

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'
import { api } from 'boot/axios'

const router = useRouter()
const $q = useQuasar()
const auth = useAuthStore()

const loading = ref(false)
const showPass = ref(false)

const uloge = [
  { label: 'Klijent', value: 'client' },
  { label: 'Čistač', value: 'cleaner' },
  { label: 'Admin', value: 'admin' },
]

const forma = ref({
  ime_prezime: '',
  email: '',
  telefon: '',
  lozinka: '',
  lozinka2: '',
  uloga: 'client',
})

const handleRegister = async () => {
  if (!forma.value.ime_prezime || !forma.value.email || !forma.value.lozinka) {
    $q.notify({ color: 'warning', message: 'Molimo ispunite sva obavezna polja.' })
    return
  }

  if (forma.value.lozinka !== forma.value.lozinka2) {
    $q.notify({ color: 'warning', message: 'Lozinke se ne podudaraju.' })
    return
  }

  loading.value = true

  try {
    const res = await api.post('/auth/register', {
      ime_prezime: forma.value.ime_prezime,
      email: forma.value.email,
      telefon: forma.value.telefon || null,
      lozinka: forma.value.lozinka,
      uloga: forma.value.uloga,
    })

    const { token, ...user } = res.data
    auth.token = token
    auth.user = user
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    $q.notify({ color: 'positive', message: 'Račun uspješno kreiran!' })

    if (user.uloga === 'admin') {
      router.push('/admin')
    } else if (user.uloga === 'cleaner') {
      router.push('/cleaner/dashboard')
    } else {
      router.push('/client/home')
    }
  } catch (err) {
    $q.notify({
      color: 'negative',
      message: err.response?.data?.poruka || 'Greška pri registraciji.',
    })
  } finally {
    loading.value = false
  }
}
</script>
