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
              <div class="text-caption text-grey-7" v-if="cistac.usluge && cistac.usluge.length">
                {{ cistac.usluge.join(', ') }}
              </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'

const router = useRouter()
const searchQuery = ref('')
const odabraniFilter = ref('Sve')
const filteri = ref(['Sve']) // Počinjemo samo sa 'Sve'
const cistaci = ref([])

const ucitajCistace = async () => {
  try {
    const res = await api.get('/cleaners')
    const data = Array.isArray(res.data) ? res.data : []
    console.log('SEARCH CISTACI:', data)

    cistaci.value = data.map((c) => {
      const parts = c.ime_prezime ? c.ime_prezime.split(' ') : ['Nepoznato']

      return {
        id: c.id,
        ime: parts[0],
        prezime: parts.slice(1).join(' '),
        cijena: c.cijena_po_satu || '—',
        ocjena: c.prosjecna_ocjena || '—',
        recenzije: c.broj_recenzija || 0,

        usluge: typeof c.usluge === 'string' && c.usluge ? c.usluge.split(', ') : [],

        slika:
          c.avatar ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.ime_prezime)}`,
      }
    })

    // FILTERI (isto kao prije ali sigurnije)
    const sveUsluge = new Set(['Sve'])
    cistaci.value.forEach((c) => {
      c.usluge.forEach((u) => sveUsluge.add(u))
    })

    filteri.value = Array.from(sveUsluge)
  } catch (err) {
    console.error('Greška:', err)
    cistaci.value = []
  }
}

onMounted(() => {
  ucitajCistace()
})

const filtriraniCistaci = computed(() => {
  return cistaci.value.filter((c) => {
    const imePrezime = `${c.ime} ${c.prezime}`.toLowerCase()
    const matchesSearch = imePrezime.includes(searchQuery.value.toLowerCase())

    const matchesFilter =
      odabraniFilter.value === 'Sve' ||
      (Array.isArray(c.usluge) && c.usluge.includes(odabraniFilter.value))

    return matchesSearch && matchesFilter
  })
})

const rezerviraj = (cistac) => {
  router.push({
    name: 'client-checkout',
    query: { id: cistac.id },
  })
}
</script>
