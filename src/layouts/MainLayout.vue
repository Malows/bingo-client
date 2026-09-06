<script setup lang="ts">
import { computed } from 'vue';
import { useSkinStore } from 'src/stores/skin';
import ArgentinaHeader from 'components/headers/ArgentinaHeader.vue';
import ColombiaHeader from 'components/headers/ColombiaHeader.vue';

const skinStore = useSkinStore();

const headerComponent = computed(() => {
  return skinStore.activeSkin?.headerComponent === 'ColombiaHeader'
    ? ColombiaHeader
    : ArgentinaHeader;
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :style="{ background: skinStore.activeSkin?.header.background }">
      <component :is="headerComponent" />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
