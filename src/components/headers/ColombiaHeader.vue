<script setup lang="ts">
import { useSkinStore } from 'src/stores/skin';

const skinStore = useSkinStore();
</script>

<template>
  <div class="header-shell" :style="{ '--header-bg': skinStore.activeSkin?.header.background, '--header-text': skinStore.activeSkin?.header.textColor }">
    <div class="header-title">{{ skinStore.activeSkin?.title }}</div>
    <div class="header-badge">Colombia</div>
  </div>
</template>

<style scoped>
.header-shell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  padding: 0 1rem;
  background: var(--header-bg);
  color: var(--header-text);
}

.header-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.header-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
