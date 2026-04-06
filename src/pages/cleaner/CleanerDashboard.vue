<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Bok, Ana! 🧹</div>
        <div class="text-subtitle2 text-grey-7">Danas imaš 2 dogovorena čišćenja.</div>
      </div>
      <q-avatar size="50px" class="shadow-2">
        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
      </q-avatar>
    </div>

    <div class="row q-col-gutter-sm q-mb-lg">
      <div class="col-6">
        <q-card class="bg-primary text-white text-center q-pa-sm">
          <div class="text-h6 text-weight-bold">120.00 €</div>
          <div class="text-caption">Tjedna zarada</div>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="bg-secondary text-white text-center q-pa-sm">
          <div class="text-h6 text-weight-bold">8h</div>
          <div class="text-caption">Odrađeno sati</div>
        </q-card>
      </div>
    </div>

    <div class="text-h6 text-weight-bold q-mb-md">Tvoj raspored</div>

    <q-card
      v-for="posao in poslovi"
      :key="posao.id"
      class="q-mb-md cursor-pointer border-left-accent"
      @click="otvoriPosao(posao.id)"
    >
      <q-card-section>
        <div class="row justify-between items-center q-mb-sm">
          <q-chip
            :color="posao.status === 'Danas' ? 'negative' : 'info'"
            text-color="white"
            size="sm"
            class="text-weight-bold"
          >
            {{ posao.status }} • {{ posao.vrijeme }}
          </q-chip>
          <div class="text-weight-bold text-primary">{{ posao.zarada }} €</div>
        </div>

        <div class="text-subtitle1 text-weight-bold">{{ posao.usluga }}</div>
        <div class="row items-center text-grey-7 q-mt-xs">
          <q-icon name="place" size="16px" class="q-mr-xs" />
          <span class="text-caption">{{ posao.adresa }}</span>
        </div>
        <div class="row items-center text-grey-7 q-mt-xs" v-if="posao.oprema">
          <q-icon name="inventory_2" size="16px" class="q-mr-xs" />
          <span class="text-caption">Potrebno preuzeti opremu iz agencije</span>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const poslovi = ref([
  {
    id: 1,
    status: 'Danas',
    vrijeme: '14:00 - 17:00',
    usluga: 'Generalno čišćenje',
    adresa: 'Trg Bana Jelačića 12, Rijeka',
    zarada: '45.00',
    oprema: true,
  },
  {
    id: 2,
    status: 'Sutra',
    vrijeme: '09:00 - 11:00',
    usluga: 'Dubinsko pranje',
    adresa: 'Osječka ulica 45, Rijeka',
    zarada: '30.00',
    oprema: false,
  },
])

const otvoriPosao = (id) => {
  // Vodi na zaslon za aktivni posao (navigacija na terenu)
  router.push({ name: 'cleaner-active-job', query: { id } })
}
</script>

<style scoped>
.border-left-accent {
  border-left: 5px solid var(--q-primary);
}
</style>
