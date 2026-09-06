<script setup lang="ts">
import { useSkinStore } from 'src/stores/skin';

const skinStore = useSkinStore();
</script>

<template>
  <div
    class="header-shell"
    :style="{
      '--header-bg': skinStore.activeSkin?.header.background,
      '--header-text': skinStore.activeSkin?.header.textColor,
    }"
  >
    <div class="header-title">{{ skinStore.activeSkin?.title }}</div>
    <div class="header-flag"></div>
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

.header-flag {
  position: absolute;
  top: 0;
  right: 0;
  width: 220px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  background: linear-gradient(
    130deg,
    transparent 0%,
    transparent 20%,
    #243b7f 20%,
    #243b7f 60%,
    #c8202f 60%,
    #c8202f 100%
  );
}

.header-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
