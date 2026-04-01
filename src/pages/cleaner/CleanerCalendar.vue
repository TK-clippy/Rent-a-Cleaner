<template>
  <q-page class="q-pa-md">
    <div class="text-h6 text-weight-bold q-mb-md">Moj raspored rada</div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle2 q-mb-sm">Odaberi datum raspoloživosti:</div>
        <q-date v-model="odabraniDatum" mask="YYYY-MM-DD" color="primary" class="full-width" />
      </q-card-section>
    </q-card>

    <q-card flat bordered v-if="odabraniDatum">
      <q-card-section>
        <div class="text-subtitle2 q-mb-md">Radno vrijeme za {{ odabraniDatum }}:</div>

        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-input filled v-model="vrijemeOd" mask="time" label="Početak" :rules="['time']">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="vrijemeOd" format24h />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-6">
            <q-input filled v-model="vrijemeDo" mask="time" label="Kraj" :rules="['time']">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="vrijemeDo" format24h />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <q-btn
          color="primary"
          label="Spremi raspoloživost"
          class="full-width q-mt-md"
          @click="spremiTermin"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const odabraniDatum = ref('')
const vrijemeOd = ref('08:00')
const vrijemeDo = ref('16:00')

const spremiTermin = () => {
  // Simulacija API poziva prema Express backendu za spremanje termina u bazu
  $q.notify({
    color: 'positive',
    position: 'top',
    message: `Uspješno spremljeno: ${odabraniDatum.value} od ${vrijemeOd.value} do ${vrijemeDo.value}`,
    icon: 'check',
  })
}
</script>
