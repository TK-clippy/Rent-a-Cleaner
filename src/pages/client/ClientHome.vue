<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Pozdrav, Marko! 👋</div>
        <div class="text-subtitle2 text-grey-7">Što čistimo danas?</div>
      </div>
      <q-btn round flat icon="notifications" color="grey-7">
        <q-badge color="red" floating>2</q-badge>
      </q-btn>
    </div>

    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-6" v-for="usluga in kategorije" :key="usluga.id">
        <ServiceCategory :kategorija="usluga" @click="odaberiKategoriju(usluga)" />
      </div>
    </div>

    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6 text-weight-bold">Preporučeni čistači</div>
      <q-btn flat color="primary" label="Vidi sve" no-caps to="/client/search" />
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12" v-for="cistac in preporuceniCistaci" :key="cistac.id">
        <CleanerCard :cistac="cistac" @click="vidiProfil(cistac.id)" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Uvozimo naše nove komponente
import ServiceCategory from 'components/ServiceCategory.vue'
import CleanerCard from 'components/CleanerCard.vue'

const router = useRouter()

// Kategorije s Unsplash slikama za moderniji izgled
const kategorije = ref([
  {
    id: 'generalno',
    naziv: 'Osnovno',
    slika: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=400',
  },
  {
    id: 'dubinsko',
    naziv: 'Dubinsko',
    slika: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=400',
  },
  {
    id: 'gradjevina',
    naziv: 'Nakon radova',
    slika: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=400',
  },
  {
    id: 'bazeni',
    naziv: 'Bazeni',
    slika: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=400',
  },
])

const preporuceniCistaci = ref([
  {
    id: 1001,
    ime: 'Ana',
    prezime: 'Perić',
    slika: 'https://cdn.quasar.dev/img/avatar2.jpg',
    ocjena: 4.9,
    recenzije: 120,
    cijena: 15,
    usluge: ['Osnovno', 'Peglanje'],
  },
  {
    id: 1002,
    ime: 'Ivan',
    prezime: 'Horvat',
    slika: 'https://cdn.quasar.dev/img/avatar1.jpg',
    ocjena: 4.8,
    recenzije: 85,
    cijena: 18,
    usluge: ['Dubinsko', 'Prozori'],
  },
])

const odaberiKategoriju = (usluga) => {
  router.push({ name: 'client-search', query: { tip: usluga.id } })
}

const vidiProfil = (id) => {
  // Za sada šaljemo na search, kasnije na detaljni profil
  router.push({ name: 'client-search', query: { selected: id } })
}
</script>
