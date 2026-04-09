<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent text-dark" :style="headerStyle">
      <q-toolbar class="q-px-md">
        <q-toolbar-title class="text-weight-bolder text-primary text-h5">
          Rent-A-Cleaner
        </q-toolbar-title>
        <q-space />
        <q-btn round flat icon="search" color="dark" to="/client/search" size="16px" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-transparent">
      <q-tabs
        v-model="tab"
        no-caps
        active-color="primary"
        indicator-color="transparent"
        align="justify"
      >
        <q-route-tab name="home" icon="home" to="/client/home" label="Početna" />
        <q-route-tab name="bookings" icon="event_note" to="/client/bookings" label="Rezervacije" />
        <q-route-tab name="profile" icon="person" to="/client/profile" label="Profil" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'

const tab = ref('home')

const statusBarHeight = computed(() => {
  if (window.StatusBar) return '24px'
  return 'env(safe-area-inset-top, 24px)'
})

const headerStyle = computed(() => ({
  paddingTop: statusBarHeight.value,
  backdropFilter: 'blur(20px)',
  webkitBackdropFilter: 'blur(20px)',
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
}))
</script>

<style lang="scss">
.q-tab__label {
  font-size: 11px;
  font-weight: 600;
}

.q-header--bordered {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}
</style>
