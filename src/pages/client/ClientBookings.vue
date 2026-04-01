<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Moje rezervacije</div>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="aktivne" label="Nadolazeće" />
      <q-tab name="povijest" label="Povijest" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="bg-transparent q-mt-md">
      <q-tab-panel name="aktivne" class="q-pa-none">
        <q-card class="q-mb-md border-primary">
          <q-card-section>
            <div class="row justify-between items-center q-mb-sm">
              <q-chip color="info" text-color="white" size="sm">Potvrđeno</q-chip>
              <div class="text-caption text-grey-7">Sutra, 10:00h</div>
            </div>
            <div class="text-subtitle1 text-weight-bold">Generalno čišćenje - Ana Perić</div>
            <div class="text-body2 text-grey-7">Zagrebačka avenija 12, 50m²</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="negative" label="Otkaži" />
            <q-btn flat color="primary" label="Kontaktiraj" icon="chat" />
          </q-card-actions>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="povijest" class="q-pa-none">
        <q-card class="q-mb-md opacity-80">
          <q-card-section>
            <div class="row justify-between items-center q-mb-sm">
              <q-chip color="positive" text-color="white" size="sm">Završeno</q-chip>
              <div class="text-caption text-grey-7">12.04.2024.</div>
            </div>
            <div class="text-subtitle1 text-weight-bold">Dubinsko pranje - Ivan Horvat</div>
            <div class="text-body2 text-grey-7">Ukupno plaćeno: 65.00 €</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn outline color="accent" label="Ocijeni čistača" @click="otvoriRecenziju = true" />
          </q-card-actions>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="otvoriRecenziju" position="bottom">
      <q-card style="width: 100%">
        <q-card-section class="column items-center">
          <div class="text-h6 q-mb-md">Kako ste zadovoljni uslugom?</div>
          <q-rating
            v-model="ocjena"
            size="3em"
            color="accent"
            icon="star_border"
            icon-selected="star"
          />
          <q-input
            v-model="komentar"
            filled
            type="textarea"
            placeholder="Ostavite kratak komentar..."
            class="full-width q-mt-md"
          />
        </q-card-section>
        <q-card-actions align="center" class="q-pb-md">
          <q-btn color="primary" label="Pošalji recenziju" v-close-popup class="full-width" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('aktivne')
const otvoriRecenziju = ref(false)
const ocjena = ref(0)
const komentar = ref('')
</script>

<style scoped>
.border-primary {
  border-left: 4px solid var(--q-primary);
}
.opacity-80 {
  opacity: 0.8;
}
</style>
