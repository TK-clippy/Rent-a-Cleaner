<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark q-py-sm" bordered>
      <q-toolbar>
        <q-toolbar-title class="text-weight-bolder text-primary">
          Rent-A-Cleaner
          <span class="text-weight-light text-grey-6" style="font-size: 0.7em">| Partner</span>
        </q-toolbar-title>

        <q-btn round flat icon="notifications" color="grey-7">
          <q-badge floating color="red" rounded />
        </q-btn>
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
        align="justify"
      >
        <q-route-tab name="dashboard" icon="dashboard" to="/cleaner/dashboard" label="Home" />

        <q-route-tab
          name="calendar"
          icon="calendar_month"
          to="/cleaner/calendar"
          label="Kalendar"
        />

        <q-route-tab name="profile" icon="person" to="/cleaner/profile" label="Profil" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('dashboard')
</script>

<style lang="scss">
// Moderniji izgled bez teških sjena
.q-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.q-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  // Dodajemo malo paddinga za iOS home bar/moderni mobilni izgled
  padding-bottom: env(safe-area-inset-bottom);
}

// Stil za aktivne tabove da izgledaju profinjenije
.q-tab--active {
  .q-tab__icon {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}
</style>
