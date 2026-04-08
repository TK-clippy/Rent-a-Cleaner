<template>
  <q-page class="q-pa-lg">
    <div class="row justify-between items-center q-mb-lg">
      <div class="text-h4 text-weight-bold text-dark">Upravljanje korisnicima</div>
      <q-btn color="primary" icon="add" label="Dodaj korisnika" />
    </div>

    <q-card class="shadow-2">
      <q-table
        flat
        bordered
        :rows="korisnici"
        :columns="columns"
        row-key="id"
        :loading="loading"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Pretraži...">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-uloga="props">
          <q-td :props="props">
            <q-chip
              :color="
                props.row.uloga === 'admin'
                  ? 'negative'
                  : props.row.uloga === 'cleaner'
                    ? 'green'
                    : 'blue'
              "
              text-color="white"
              size="sm"
            >
              {{ props.row.uloga.toUpperCase() }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-akcije="props">
          <q-td :props="props">
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="obrisiKorisnika(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const korisnici = ref([])
const loading = ref(true)
const filter = ref('')

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'ime', align: 'left', label: 'Ime i Prezime', field: 'ime_prezime', sortable: true },
  { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
  { name: 'uloga', align: 'center', label: 'Uloga', field: 'uloga', sortable: true },
  { name: 'akcije', align: 'right', label: 'Akcije', field: 'akcije' },
]

const ucitajKorisnike = async () => {
  loading.value = true
  try {
    const res = await api.get('/admin/users')
    korisnici.value = res.data
  } catch (err) {
    console.error(err)
    $q.notify({ color: 'negative', message: 'Greška pri dohvaćanju korisnika.' })
  } finally {
    loading.value = false
  }
}

const obrisiKorisnika = (id) => {
  $q.dialog({
    title: 'Brisanje',
    message: 'Jeste li sigurni da želite obrisati ovog korisnika?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await api.delete(`/admin/users/${id}`)
      $q.notify({ color: 'positive', message: 'Korisnik obrisan.' })
      ucitajKorisnike()
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      $q.notify({ color: 'negative', message: 'Brisanje nije uspjelo.' })
    }
  })
}

onMounted(() => {
  ucitajKorisnike()
})
</script>
