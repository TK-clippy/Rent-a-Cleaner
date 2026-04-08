<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="row justify-between items-center q-mb-lg">
      <div class="text-h4 text-weight-bold text-dark">Financije i Metrika</div>
    </div>

    <div v-if="loading" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else>
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-4">
          <q-card class="bg-primary text-white shadow-2">
            <q-card-section>
              <div class="text-caption text-uppercase text-weight-bold opacity-80">
                Ukupni promet
              </div>
              <div class="text-h3 text-weight-bolder q-my-sm">{{ metrics.ukupniPromet }} €</div>
              <div class="text-caption">Završene rezervacije</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card class="bg-white text-dark shadow-2">
            <q-card-section>
              <div class="text-caption text-uppercase text-weight-bold text-grey-6">
                Provizija agencije (20%)
              </div>
              <div class="text-h3 text-weight-bolder text-positive q-my-sm">
                {{ metrics.provizija }} €
              </div>
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
              <div class="text-h3 text-weight-bolder text-orange q-my-sm">
                {{ metrics.isplateCistacima }} €
              </div>
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
              <div
                v-if="metrics.popularneUsluge?.length === 0"
                class="text-grey-6 text-center q-py-md"
              >
                Nema podataka
              </div>
              <div v-for="(u, i) in metrics.popularneUsluge" :key="i" class="q-mb-md">
                <div class="row justify-between text-caption q-mb-xs">
                  <span>{{ u.naziv }}</span>
                  <span class="text-weight-bold">{{ u.broj }} rezervacija</span>
                </div>
                <q-linear-progress
                  size="10px"
                  :value="u.broj / (metrics.popularneUsluge[0]?.broj || 1)"
                  color="primary"
                  rounded
                />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="shadow-2 full-height">
            <q-card-section>
              <div class="text-h6 text-weight-bold q-mb-md">Top Čistači (Zarada)</div>
              <div v-if="metrics.topCistaci?.length === 0" class="text-grey-6 text-center q-py-md">
                Nema završenih poslova
              </div>
              <q-list separator>
                <q-item v-for="(c, i) in metrics.topCistaci" :key="i">
                  <q-item-section avatar>
                    <q-avatar :color="i === 0 ? 'warning' : 'primary'" text-color="white">
                      {{ i + 1 }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">{{ c.ime_prezime }}</q-item-label>
                    <q-item-label caption>{{ c.poslova }} odrađenih poslova</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div class="text-weight-bold text-dark">{{ c.zarada }} €</div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const loading = ref(true)
const metrics = ref({
  ukupniPromet: 0,
  provizija: 0,
  isplateCistacima: 0,
  topCistaci: [],
  popularneUsluge: [],
})

onMounted(async () => {
  try {
    const res = await api.get('/admin/metrics')
    metrics.value = res.data
  } catch (err) {
    console.error('Greška metrika:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.opacity-80 {
  opacity: 0.8;
}
</style>
