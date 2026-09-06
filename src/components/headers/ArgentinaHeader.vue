<script setup lang="ts">
import { useSkinStore } from 'src/stores/skin';

const skinStore = useSkinStore();
</script>

<template>
  <div class="header-shell" :style="{ '--header-bg': skinStore.activeSkin?.header.background }">
    <div class="header-title">{{ skinStore.activeSkin?.title }}</div>
    <div class="header-flag">
      <img src="~/assets/sol-de-mayo.svg" alt="Sol de Mayo" class="sun-icon" />
    </div>
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
  color: white;
  overflow: hidden;
}

.header-title {
  position: relative;
  z-index: 2;
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
    135deg,
    transparent 0%,
    transparent 35%,
    white 35%,
    white 85%,
    var(--header-bg) 85%,
    var(--header-bg) 100%
  );
}

.sun-icon {
  --size: 120px;
  position: relative;
  width: var(--size);
  height: var(--size);
  right: 43px;
  top: 17px;
}
</style>
