<script setup lang="ts">
import type { Bingo90Card } from 'src/models';
import { useSkinStore } from 'src/stores/skin';

import BingoCell from './BingoCell.vue';

defineProps<{ card: Bingo90Card }>();
defineEmits<{ (e: 'toggle-mark', row: number, col: number): void }>();

const skinStore = useSkinStore();
</script>

<template>
  <div
    class="bingo-card-90"
    :style="{
      '--card-border': skinStore.activeSkin?.card.border,
      '--card-bg': skinStore.activeSkin?.card.background,
    }"
  >
    <div class="bingo-grid-90">
      <div v-for="(row, rIndex) in card.grid" :key="rIndex" class="bingo-row-90">
        <bingo-cell
          v-for="(cell, cIndex) in row"
          :key="cell.id"
          :row="rIndex"
          :col="cIndex"
          :value="cell.value"
          :marked="cell.marked"
          :type="card.type"
          @toggle-mark="$emit('toggle-mark', rIndex, cIndex)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bingo-card-90 {
  border: 4px solid var(--card-border);
  width: 100%;
  max-width: 600px;
  background: var(--card-bg);
  page-break-inside: avoid;
}

.bingo-grid-90 {
  display: flex;
  flex-direction: column;
}

.bingo-row-90 {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  height: 60px;
}
</style>
