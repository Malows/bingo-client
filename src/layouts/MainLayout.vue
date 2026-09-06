<script setup lang="ts">
import { computed } from 'vue';
import { useSkinStore } from 'src/stores/skin';
import ArgentinaHeader from 'components/headers/ArgentinaHeader.vue';
import ColombiaHeader from 'components/headers/ColombiaHeader.vue';
import LoriethHeader from 'components/headers/LoriethHeader.vue';

const skinStore = useSkinStore();

const headerComponent = computed(() => {
  const headers = {
    ArgentinaHeader,
    ColombiaHeader,
    LoriethHeader,
  };
  return headers[skinStore.activeSkin?.headerComponent ?? 'ArgentinaHeader'];
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="app-header">
      <component :is="headerComponent" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.app-header {
  background: var(--header-bg);
}
</style>
