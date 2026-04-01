<template>
  <q-card 
    class="category-card cursor-pointer overflow-hidden" 
    v-ripple 
    @click="$emit('click')"
  >
    <q-img :src="kategorija.slika" height="120px" class="category-img">
      <div class="absolute-full flex flex-center category-overlay">
        <div class="text-subtitle1 text-weight-bolder text-uppercase">
          {{ kategorija.naziv }}
        </div>
      </div>
    </q-img>
  </q-card>
</template>

<script setup>
defineProps({
  kategorija: {
    type: Object,
    required: true
  }
})
defineEmits(['click'])
</script>

<style lang="scss" scoped>
.category-card {
  border-radius: 16px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.03);
  }
}
.category-overlay {
  background: rgba(0, 0, 0, 0.4);
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
</style>
