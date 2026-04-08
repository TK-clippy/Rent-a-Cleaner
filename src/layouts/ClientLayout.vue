<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark" bordered :style="headerStyle">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bolder text-primary"> Rent-A-Cleaner </q-toolbar-title>
        <q-btn round flat icon="notifications" color="grey-7">
          <q-badge color="red" floating>2</q-badge>
        </q-btn>
        <q-btn round flat icon="person" color="grey-7">
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup to="/client/profile">
                <q-item-section avatar><q-icon name="person" /></q-item-section>
                <q-item-section>Profil</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="odjava">
                <q-item-section avatar><q-icon name="logout" color="negative" /></q-item-section>
                <q-item-section class="text-negative">Odjava</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
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
        <q-route-tab name="home" icon="home" to="/client/home" label="Početna" />
        <q-route-tab name="search" icon="search" to="/client/search" label="Traži" />
        <q-route-tab name="bookings" icon="event_note" to="/client/bookings" label="Rezervacije" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'

const tab = ref('home')
const router = useRouter()
const auth = useAuthStore()

const statusBarHeight = computed(() => {
  if (window.StatusBar) return '24px'
  return 'env(safe-area-inset-top, 24px)'
})

const headerStyle = computed(() => ({
  paddingTop: statusBarHeight.value,
}))

const odjava = () => {
  auth.logout()
  router.push('/auth/login')
}
</script>

<style lang="scss">
.q-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.q-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: env(safe-area-inset-bottom);
}

.q-tab--active {
  .q-tab__icon {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}
</style>
