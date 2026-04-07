<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark q-py-sm" bordered>
      <q-toolbar>
        <q-toolbar-title class="text-weight-bolder text-primary"> Rent-A-Cleaner </q-toolbar-title>
        <q-btn round flat icon="person" color="grey-7" to="/auth/login" />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-dark" bordered>
      <q-tabs
        v-model="tab"
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey-7"
      >
        <q-route-tab name="home" icon="home" to="/client/home" label="Početna" />
        <q-route-tab name="search" icon="search" to="/client/search" label="Traži" />
        <q-route-tab name="bookings" icon="event_note" to="/client/bookings" label="Rezervacije" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('home')
</script>

<style lang="scss">
// Dodatno micanje sjena za moderniji izgled
.q-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
