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
      '--header-accent': skinStore.activeSkin?.header.accentMiddle,
    }"
  >
    <div class="header-title">
      {{ skinStore.activeSkin?.title }}
    </div>

    <div class="header-banner">
      <img src="~/assets/pengu-birthday.jpeg" alt="Pengu Birthday" class="pengu-icon" />
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
  width: 240px;
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
    transparent 25%,
    var(--header-accent) 25%,
    var(--header-accent) 80%,
    var(--header-bg) 80%,
    var(--header-bg) 100%
  );
}

.pengu-icon {
  --size: 110px;
  position: relative;
  width: var(--size);
  height: auto;
  right: 20px;
  top: 5px;
  filter: drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.15));
}
</style>
