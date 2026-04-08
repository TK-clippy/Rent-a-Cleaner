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
          <q-form @submit.prevent="handleLogin">
            <q-card-section class="text-center">
              <div class="text-h5 text-weight-bolder text-primary">Dobrodošli natrag</div>
              <div class="text-caption text-grey-7">Prijavite se u svoj Rent-A-Cleaner račun</div>
            </q-card-section>

            <q-card-section class="q-gutter-y-md">
              <q-input
                v-model="credentials.email"
                label="Email adresa"
                filled
                rounded
                bg-color="white"
              >
                <template v-slot:prepend>
                  <q-icon name="email" color="primary" />
                </template>
              </q-input>

              <q-input
                v-model="credentials.lozinka"
                type="password"
                label="Lozinka"
                filled
                rounded
                bg-color="white"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" color="primary" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-actions class="column q-mt-md">
              <q-btn
                type="submit"
                label="Prijavi se"
                color="primary"
                rounded
                unelevated
                class="full-width q-py-sm text-weight-bold"
                :loading="loading"
              />
              <q-btn
                flat
                no-caps
                label="Zaboravili ste lozinku?"
                color="grey-7"
                size="sm"
                class="q-mt-sm"
              />
            </q-card-actions>
          </q-form>

          <q-separator class="q-my-md" inset />

          <div class="text-center">
            <q-btn
              flat
              no-caps
              label="Nemate račun? Registrirajte se"
              color="secondary"
              to="/auth/register"
            />
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'UserLogin',
})

import { ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const auth = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const loading = ref(false)
const credentials = ref({
  email: '',
  lozinka: '',
})

const handleLogin = async () => {
  if (!credentials.value.email || !credentials.value.lozinka) {
    $q.notify({ color: 'warning', message: 'Molimo unesite email i lozinku' })
    return
  }

  loading.value = true

  try {
    const res = await auth.login(credentials.value)

    if (res && res.success) {
      // PROVJERA: Uzimamo ulogu iz store-a jer je tamo sigurno spremljena
      const pravaUloga = auth.user?.uloga
      console.log('Uspješan login. Uloga u sustavu:', pravaUloga)

      $q.notify({
        color: 'positive',
        message: `Dobrodošli, ${auth.user?.ime_prezime || 'korisniče'}!`,
        icon: 'check_circle',
      })

      // STROGO PREUSMJERAVANJE NA TEMELJU ULOGE IZ BAZE
      if (pravaUloga === 'admin') {
        console.log('Navigiram na ADMIN panel...')
        await router.push('/admin/dashboard')
      } else if (pravaUloga === 'cleaner') {
        console.log('Navigiram na CLEANER panel...')
        await router.push('/cleaner/dashboard')
      } else {
        console.log('Navigiram na CLIENT panel...')
        await router.push('/client/home')
      }
    } else {
      $q.notify({
        color: 'negative',
        message: res?.message || 'Neispravni podaci.',
        icon: 'error',
      })
    }
  } catch (err) {
    console.error('Kritična greška u UserLogin:', err)
  } finally {
    loading.value = false
  }
}
</script>
