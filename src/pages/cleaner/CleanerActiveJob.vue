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

    <div class="text-h5 text-weight-bold q-mb-md">Detalji čišćenja</div>

    <q-card class="q-mb-md bg-grey-1">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold">Marko Klijentović</div>
        <div class="row items-center text-grey-8 q-mt-xs">
          <q-icon name="place" size="18px" class="q-mr-xs text-primary" />
          <span>Trg Bana Jelačića 12, 51000 Rijeka</span>
        </div>

        <q-separator class="q-my-md" />

        <div class="row justify-around">
          <q-btn flat color="primary" icon="call" label="Nazovi" class="column items-center" />
          <q-btn flat color="primary" icon="chat" label="Poruka" class="column items-center" />
          <q-btn flat color="primary" icon="directions" label="Karta" class="column items-center" />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-auto">
      <q-card-section>
        <div class="text-subtitle2 text-grey-7 q-mb-xs">Napomena klijenta:</div>
        <div class="bg-amber-1 q-pa-sm rounded-borders text-dark">
          "Molim vas pazite na stakleni stol u dnevnom boravku. Ključ je ispod otirača."
        </div>

        <q-separator class="q-my-md" />

        <div class="text-subtitle2 text-grey-7 q-mb-xs">Zadaci:</div>
        <q-list dense>
          <q-item tag="label" v-ripple>
            <q-item-section side><q-checkbox v-model="zadaci[0]" /></q-item-section>
            <q-item-section>Usisavanje i pranje podova (50m²)</q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section side><q-checkbox v-model="zadaci[1]" /></q-item-section>
            <q-item-section>Brisanje prašine</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <div class="q-mt-xl q-mb-md">
      <q-btn
        v-if="!posaoZapoceo"
        color="primary"
        class="full-width text-weight-bold"
        size="xl"
        label="ZAPOČNI ČIŠĆENJE"
        @click="posaoZapoceo = true"
      />
      <q-btn
        v-else
        color="negative"
        class="full-width text-weight-bold"
        size="xl"
        label="ZAVRŠI POSAO"
        @click="zavrsiPosao"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const posaoZapoceo = ref(false)
const zadaci = ref([false, false])

const zavrsiPosao = () => {
  $q.dialog({
    title: 'Potvrda',
    message: 'Jeste li sigurni da ste završili sve zadatke i želite naplatiti posao?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    $q.notify({
      color: 'positive',
      message: 'Posao uspješno završen! Klijent je obaviješten.',
      icon: 'done_all',
    })
    router.push({ name: 'cleaner-dashboard' })
  })
}
</script>
