<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="column items-center q-mb-lg q-pt-md">
      <q-avatar size="100px" class="shadow-3 q-mb-md">
        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
      </q-avatar>
      <div class="text-h5 text-weight-bold">Ana Perić</div>
      <div class="text-subtitle2 text-grey-7">Profesionalni čistač</div>

      <div class="row items-center q-mt-sm bg-white q-px-md q-py-xs rounded-borders shadow-1">
        <q-icon name="star" color="warning" size="24px" />
        <span class="text-h6 text-weight-bold q-ml-sm">4.9</span>
        <span class="text-caption text-grey-6 q-ml-xs">(120 recenzija)</span>
      </div>
    </div>

    <div class="text-h6 text-weight-bold q-mb-sm">Moja metrika (Ovaj mjesec)</div>
    <q-card class="q-mb-lg">
      <q-card-section class="row text-center">
        <div class="col-4 border-right">
          <div class="text-h5 text-weight-bold text-primary">45</div>
          <div class="text-caption text-grey-7">Odrađenih poslova</div>
        </div>
        <div class="col-4 border-right">
          <div class="text-h5 text-weight-bold text-primary">112</div>
          <div class="text-caption text-grey-7">Sati rada</div>
        </div>
        <div class="col-4">
          <div class="text-h5 text-weight-bold text-positive">950€</div>
          <div class="text-caption text-grey-7">Zarada</div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-btn flat color="primary" icon="account_balance_wallet" label="Zatraži isplatu zarade" />
      </q-card-actions>
    </q-card>

    <div class="text-h6 text-weight-bold q-mb-sm">Moje usluge i CV</div>
    <q-list class="bg-white rounded-borders shadow-1">
      <q-item clickable v-ripple>
        <q-item-section avatar><q-icon name="cleaning_services" color="grey-7" /></q-item-section>
        <q-item-section>
          <q-item-label>Usluge koje nudim</q-item-label>
          <q-item-label caption>Generalno, Dubinsko, Peglanje</q-item-label>
        </q-item-section>
        <q-item-section side><q-icon name="chevron_right" /></q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section avatar><q-icon name="description" color="grey-7" /></q-item-section>
        <q-item-section>
          <q-item-label>Moj CV i Radno iskustvo</q-item-label>
          <q-item-label caption>Ažurirano prije 2 tjedna</q-item-label>
        </q-item-section>
        <q-item-section side><q-icon name="chevron_right" /></q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple class="text-negative">
        <q-item-section avatar><q-icon name="logout" color="negative" /></q-item-section>
        <q-item-section>Odjava s profila</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<style scoped>
.border-right {
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
