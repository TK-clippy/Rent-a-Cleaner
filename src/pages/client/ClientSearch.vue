<template>
  <q-page class="q-pa-md">
    <div class="q-mb-lg">
      <q-input
        v-model="searchQuery"
        filled
        placeholder="Pronađi čistača ili uslugu..."
        class="q-mb-md"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <div class="row q-gutter-sm">
        <q-chip
          v-for="filter in filteri"
          :key="filter"
          clickable
          :color="odabraniFilter === filter ? 'primary' : 'grey-2'"
          :text-color="odabraniFilter === filter ? 'white' : 'dark'"
          @click="odabraniFilter = filter"
        >
          {{ filter }}
        </q-chip>
      </div>
    </div>

    <div class="text-h6 text-weight-bold q-mb-md">Dostupni čistači</div>

    <div class="row q-col-gutter-md">
      <div class="col-12" v-for="cistac in filtriraniCistaci" :key="cistac.id">
        <q-card class="cursor-pointer" v-ripple @click="rezerviraj(cistac)">
          <q-card-section class="row items-center no-wrap">
            <q-avatar size="70px" class="q-mr-md">
              <img :src="cistac.slika" />
            </q-avatar>

            <div class="col">
              <div class="text-subtitle1 text-weight-bold">
                {{ cistac.ime }} {{ cistac.prezime }}
              </div>
              <div class="text-caption text-grey-7">{{ cistac.usluge.join(', ') }}</div>
              <div class="row items-center q-mt-xs">
                <q-icon name="star" color="accent" size="18px" />
                <span class="text-weight-bold q-ml-xs">{{ cistac.ocjena }}</span>
                <span class="text-grey-6 q-ml-xs">({{ cistac.recenzije }})</span>
              </div>
            </div>

            <div class="column items-end">
              <div class="text-h6 text-primary">
                {{ cistac.cijena }}€<span class="text-caption text-dark">/h</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const odabraniFilter = ref('Sve')
const filteri = ['Sve', 'Generalno', 'Dubinsko', 'Peglanje']

const cistaci = ref([
  {
    id: 1,
    ime: 'Ana',
    prezime: 'Perić',
    slika: 'https://cdn.quasar.dev/img/avatar1.jpg',
    ocjena: 4.9,
    recenzije: 120,
    cijena: 15,
    usluge: ['Generalno', 'Peglanje'],
  },
  {
    id: 2,
    ime: 'Ivan',
    prezime: 'Horvat',
    slika: 'https://cdn.quasar.dev/img/avatar2.jpg',
    ocjena: 4.7,
    recenzije: 85,
    cijena: 18,
    usluge: ['Dubinsko', 'Generalno'],
  },
  {
    id: 3,
    ime: 'Marija',
    prezime: 'Kovač',
    slika: 'https://cdn.quasar.dev/img/avatar3.jpg',
    ocjena: 5.0,
    recenzije: 42,
    cijena: 20,
    usluge: ['Dubinsko', 'Bazeni'],
  },
])

const filtriraniCistaci = computed(() => {
  return cistaci.value.filter((c) => {
    const matchesSearch = c.ime.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter = odabraniFilter.value === 'Sve' || c.usluge.includes(odabraniFilter.value)
    return matchesSearch && matchesFilter
  })
})

const rezerviraj = (cistac) => {
  // Sada koristimo 'cistac' pa ESLint neće javljati grešku
  console.log('Rezervacija za:', cistac.ime)

  router.push({
    name: 'client-checkout',
    query: { id: cistac.id },
  })
}
</script>
