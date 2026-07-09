<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      :class="{
        'header-shell': skinStore.currentSkinId === 'argentina',
      }"
    >
      <q-toolbar>
        <q-toolbar-title>
          {{ skinStore.title }}
        </q-toolbar-title>
      </q-toolbar>

      <div v-if="skinStore.currentSkinId === 'argentina'" class="header-flag">
        <img src="~/assets/sol-de-mayo.svg" alt="Sol de Mayo" class="sun-icon" />
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useSkinStore } from 'src/stores/skin';

const skinStore = useSkinStore();
</script>

<style scoped>
.header-shell {
  background: #03a9f4;
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
    #03a9f4 85%,
    #03a9f4 100%
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
