<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Pozdrav, {{ imeKorisnika }}!</div>
        <div class="text-subtitle2 text-grey-7">Što čistimo danas?</div>
      </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import { api } from 'boot/axios'
import ServiceCategory from 'components/ServiceCategory.vue'
import CleanerCard from 'components/CleanerCard.vue'

const router = useRouter()
const auth = useAuthStore()

const imeKorisnika = computed(() => {
  const puno = auth.user?.ime_prezime || 'Korisnik'
  return puno.split(' ')[0]
})

const kategorije = ref([])
const preporuceniCistaci = ref([])

// Fallback slike ako baza nema slika_url
const slikeUsluga = {
  'Osnovno čišćenje':
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop',
  'Dubinsko čišćenje':
    'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=400&auto=format&fit=crop',
  'Nakon radova':
    'https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=400&auto=format&fit=crop',
  Bazeni:
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=400&auto=format&fit=crop',
}

const ucitajPodatke = async () => {
  try {
    const resServices = await api.get('/cleaners/services')
    const services = Array.isArray(resServices.data) ? resServices.data : []

    // Deduplikacija po nazivu
    const unique = services.filter(
      (u, index, self) => index === self.findIndex((s) => s.naziv === u.naziv),
    )

    kategorije.value = unique.map((u) => ({
      id: u.id,
      naziv: u.naziv,
      // Koristi slika_url iz baze, pa fallback po nazivu, pa generički fallback
      slika:
        u.slika_url ||
        slikeUsluga[u.naziv] ||
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400',
    }))
  } catch (err) {
    console.error('Greška services:', err)
    kategorije.value = []
  }

  try {
    const resCleaners = await api.get('/cleaners')
    const cleaners = Array.isArray(resCleaners.data) ? resCleaners.data : []

    preporuceniCistaci.value = cleaners.slice(0, 3).map((c) => ({
      id: c.id,
      ime: c.ime_prezime.split(' ')[0],
      prezime: c.ime_prezime.split(' ').slice(1).join(' '),
      cijena: c.cijena_po_satu || '—',
      ocjena: c.prosjecna_ocjena || '—',
      brojRecenzija: c.broj_recenzija || 0,
      avatar:
        c.avatar ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.ime_prezime)}`,
    }))
  } catch (err) {
    console.error('Greška cleaners:', err)
    preporuceniCistaci.value = []
  }
}

onMounted(() => {
  ucitajPodatke()
})

const odaberiKategoriju = (usluga) => {
  router.push({ name: 'client-search', query: { tip: usluga.id } })
}

const vidiProfil = (id) => {
  router.push({ name: 'client-search', query: { selected: id } })
}
</script>
