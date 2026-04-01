<template>
  <q-card class="cleaner-card cursor-pointer" v-ripple @click="$emit('click')">
    <q-card-section class="row items-center no-wrap">
      <q-avatar size="70px" class="q-mr-md shadow-2">
        <img :src="cistac.avatar || cistac.slika" />
      </q-avatar>
      
      <div class="col">
        <div class="text-subtitle1 text-weight-bolder">{{ cistac.ime }} {{ cistac.prezime }}</div>
        <div class="text-caption text-grey-7 ellipsis">
          {{ Array.isArray(cistac.usluge) ? cistac.usluge.join(', ') : 'Sve vrste čišćenja' }}
        </div>
        
        <div class="row items-center q-mt-xs">
          <q-icon name="star" color="accent" size="18px" />
          <span class="text-weight-bold q-ml-xs">{{ cistac.ocjena }}</span>
          <span class="text-grey-6 q-ml-xs text-caption">({{ cistac.brojRecenzija || cistac.recenzije }})</span>
        </div>
      </div>

      <div class="column items-end">
        <div class="text-h6 text-primary font-weight-bold">
          {{ cistac.cijena }}€<span class="text-caption text-dark">/h</span>
        </div>
        <q-btn flat round color="grey-7" icon="chevron_right" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
// Definiramo 'props' kako bi komponenta mogla primiti podatke o bilo kojem čistaču
defineProps({
  cistac: {
    type: Object,
    required: true
  }
})

// Definiramo emitere (događaje) koje komponenta šalje roditelju
defineEmits(['click'])
</script>

<style lang="scss" scoped>
.cleaner-card {
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08) !important;
  }
}
</style>
