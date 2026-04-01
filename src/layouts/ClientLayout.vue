<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Rent-A-Cleaner</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-tabs>
        <q-route-tab icon="home" to="/client/home" label="Home" />
        <q-route-tab icon="search" to="/client/search" label="Traži" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
</script>
