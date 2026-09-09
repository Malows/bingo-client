<script setup lang="ts">
import { useSkinStore } from 'src/stores/skin';

const skinStore = useSkinStore();
</script>

<template>
  <div class="header-shell">
    <div class="header-title">
      {{ skinStore.activeSkin?.title }}
    </div>

    <div class="header-banner">
      <img src="~/assets/pengu-birthday.webp" alt="Pengu Birthday" class="pengu-icon" />
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
  color: var(--header-text);
  overflow: hidden;
}

.header-title {
  position: relative;
  z-index: 2;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--header-text);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.header-banner {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  background: linear-gradient(135deg, transparent, var(--header-accent));
}

.pengu-icon {
  --size: 100px;
  position: relative;
  width: var(--size);
  height: auto;
  right: 10px;
  top: -5px;
  filter: drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.15));
}
</style>
