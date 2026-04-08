<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="row justify-between items-center q-mb-lg">
      <div class="text-h4 text-weight-bold text-dark">Financije i Metrika</div>
      <q-select
        outlined
        dense
        v-model="period"
        :options="['Ovaj tjedan', 'Ovaj mjesec', 'Ova godina']"
        class="bg-white"
        style="width: 200px"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4">
        <q-card class="bg-primary text-white shadow-2">
          <q-card-section>
            <div class="text-caption text-uppercase text-weight-bold opacity-80">Ukupni promet</div>
            <div class="text-h3 text-weight-bolder q-my-sm">12,450 €</div>
            <div class="text-caption">
              <q-icon name="trending_up" /> +15% u odnosu na prošli mjesec
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="bg-white text-dark shadow-2">
          <q-card-section>
            <div class="text-caption text-uppercase text-weight-bold text-grey-6">
              Provizija agencije (20%)
            </div>
            <div class="text-h3 text-weight-bolder text-positive q-my-sm">2,490 €</div>
            <div class="text-caption text-grey-7">Neto prihod platforme</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="bg-white text-dark shadow-2">
          <q-card-section>
            <div class="text-caption text-uppercase text-weight-bold text-grey-6">
              Isplate čistačima
            </div>
            <div class="text-h3 text-weight-bolder text-orange q-my-sm">9,960 €</div>
            <div class="text-caption text-grey-7">Ukupno isplaćeno partnerima</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="shadow-2 full-height">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Najpopularnije usluge</div>

            <div class="q-mb-md">
              <div class="row justify-between text-caption q-mb-xs">
                <span>Standardno čišćenje</span>
                <span class="text-weight-bold">65%</span>
              </div>
              <q-linear-progress size="10px" :value="0.65" color="primary" rounded />
            </div>

            <div class="q-mb-md">
              <div class="row justify-between text-caption q-mb-xs">
                <span>Generalno čišćenje</span>
                <span class="text-weight-bold">20%</span>
              </div>
              <q-linear-progress size="10px" :value="0.2" color="info" rounded />
            </div>

            <div class="q-mb-md">
              <div class="row justify-between text-caption q-mb-xs">
                <span>Dubinsko pranje</span>
                <span class="text-weight-bold">15%</span>
              </div>
              <q-linear-progress size="10px" :value="0.15" color="secondary" rounded />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="shadow-2 full-height">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Top Čistači (Zarada)</div>
            <q-list separator>
              <q-item v-for="(osoba, index) in topCistaci" :key="index">
                <q-item-section avatar>
                  <q-avatar :color="index === 0 ? 'warning' : 'primary'" text-color="white">
                    {{ index + 1 }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ osoba.ime }}</q-item-label>
                  <q-item-label caption>{{ osoba.poslova }} odrađenih poslova</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="text-weight-bold text-dark">{{ osoba.zarada }} €</div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const period = ref('Ovaj mjesec')

const topCistaci = ref([
  { ime: 'Ana Perić', poslova: 42, zarada: '1,450' },
  { ime: 'Marija Horvat', poslova: 38, zarada: '1,200' },
  { ime: 'Ivan Kovač', poslova: 31, zarada: '950' },
])
</script>

<style scoped>
.opacity-80 {
  opacity: 0.8;
}
</style>
