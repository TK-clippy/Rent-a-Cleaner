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
            <q-btn flat no-caps label="Nemate račun? Registrirajte se" color="secondary" />
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

  let res

  try {
    res = await auth.login(credentials.value)
  } catch (err) {
    console.error('Login error:', err)
    $q.notify({
      color: 'negative',
      message: 'Greška u komunikaciji sa serverom.',
    })
    loading.value = false
    return
  }

  if (res && res.success) {
    $q.notify({
      color: 'positive',
      message: 'Uspješno ste ulogirani!',
    })

    const target = process.env.BUILD_TARGET || 'client'

    try {
      if (target === 'cleaner') {
        await router.push('/cleaner/dashboard')
      } else if (target === 'admin') {
        await router.push('/admin')
      } else {
        await router.push('/client/home')
      }
    } catch (navErr) {
      console.error('Router error:', navErr)
    }
  } else {
    $q.notify({
      color: 'negative',
      message: res?.message || 'Neispravan email ili lozinka.',
    })
  }

  loading.value = false
}
</script>
