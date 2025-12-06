<template>
  <q-page>
    <BingoGenerator />
  </q-page>
</template>

<script setup lang="ts">
import BingoGenerator from 'components/BingoGenerator.vue';
</script>

<style>
/* Global print styles */
@media print {
  .q-header,
  .q-drawer,
  .q-footer {
    display: none !important;
  }
}
</style>
