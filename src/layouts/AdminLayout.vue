<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-weight-bold">
          Rent-A-Cleaner <span class="text-primary">| ADMIN</span>
        </q-toolbar-title>
        <q-btn flat icon="logout" label="Odjava" @click="odjava" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list padding class="text-grey-9">
        <q-item-label header class="text-weight-bold">UPRAVLJAČKA PLOČA</q-item-label>

        <q-item
          clickable
          v-ripple
          exact
          to="/admin/dashboard"
          active-class="bg-blue-1 text-primary"
        >
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Nadzorna ploča</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/users" active-class="bg-blue-1 text-primary">
          <q-item-section avatar><q-icon name="people" /></q-item-section>
          <q-item-section>Korisnici & Čistači</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/services" active-class="bg-blue-1 text-primary">
          <q-item-section avatar><q-icon name="cleaning_services" /></q-item-section>
          <q-item-section>Usluge i Cijene</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/bookings" active-class="bg-blue-1 text-primary">
          <q-item-section avatar><q-icon name="event_note" /></q-item-section>
          <q-item-section>Sve Rezervacije</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'

const leftDrawerOpen = ref(false)
const router = useRouter()
const auth = useAuthStore()

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const odjava = () => {
  auth.logout()
  router.push('/login')
}
</script>
