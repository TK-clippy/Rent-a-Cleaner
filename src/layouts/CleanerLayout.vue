<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent text-dark" :style="headerStyle">
      <q-toolbar class="q-px-md">
        <q-toolbar-title class="text-weight-bolder text-primary text-h5">
          Rent-A-Cleaner
          <span class="text-weight-light text-grey-6" style="font-size: 0.7em">| Partner</span>
        </q-toolbar-title>
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
import { ref, computed } from 'vue'

const tab = ref('dashboard')

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
.q-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}
</style>
