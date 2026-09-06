<template>
  <div id="q-app" :data-skin="skinStore.currentSkinId">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useSkinStore } from 'src/stores/skin';

const skinStore = useSkinStore();
</script>
