<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Pozdrav, Marko! 👋</div>
    <div class="text-subtitle2 text-grey-7 q-mb-lg">Što čistimo danas?</div>

    <div class="row q-col-gutter-sm q-mb-lg">
      <div class="col-6" v-for="usluga in kategorije" :key="usluga.id">
        <q-card class="cursor-pointer" v-ripple @click="odaberiKategoriju(usluga)">
          <q-img :src="usluga.slika" height="100px">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ usluga.naziv }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>

    <div class="text-h6 text-weight-bold q-mb-sm">Preporučeni čistači</div>
    <q-list separator>
      <q-item
        v-for="cistac in preporuceniCistaci"
        :key="cistac.id"
        clickable
        v-ripple
        @click="vidiProfil(cistac.id)"
      >
        <q-item-section avatar>
          <q-avatar size="50px">
            <img :src="cistac.avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold"
            >{{ cistac.ime }} {{ cistac.prezime }}</q-item-label
          >
          <q-item-label caption lines="1">
            <q-icon name="star" color="warning" /> {{ cistac.ocjena }} ({{
              cistac.brojRecenzija
            }}
            recenzija)
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat round color="primary" icon="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const kategorije = ref([
  { id: 1, naziv: 'Jednostavno', slika: 'https://via.placeholder.com/150?text=Osnovno' },
  { id: 2, naziv: 'Dubinsko', slika: 'https://via.placeholder.com/150?text=Dubinsko' },
  { id: 3, naziv: 'Nakon radova', slika: 'https://via.placeholder.com/150?text=Gradevina' },
  { id: 4, naziv: 'Bazeni', slika: 'https://via.placeholder.com/150?text=Bazeni' },
])

const preporuceniCistaci = ref([
  {
    id: 1001,
    ime: 'Ana',
    prezime: 'Perić',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    ocjena: 4.9,
    brojRecenzija: 120,
  },
  {
    id: 1002,
    ime: 'Ivan',
    prezime: 'Horvat',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    ocjena: 4.8,
    brojRecenzija: 85,
  },
])

const odaberiKategoriju = (usluga) => {
  // Preusmjeravanje na pretragu s pred-odabranom kategorijom
  router.push({ name: 'client-search', query: { tip: usluga.id } })
}

const vidiProfil = (id) => {
  // Navigacija na detalje čistača
  console.log('Prikaz profila za ID:', id)
}
</script>
