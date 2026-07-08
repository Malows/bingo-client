<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-light-blue-6">
      <q-toolbar>
        <q-toolbar-title>Bingo Locril Patrio</q-toolbar-title>
      </q-toolbar>

      <div class="header-flag">
        <img src="~/assets/sol-de-mayo.svg" alt="Sol de Mayo" class="sun-icon" />
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style scoped>
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
