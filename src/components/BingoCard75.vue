<script setup lang="ts">
import type { Bingo75Card } from 'src/models';
import { useSkinStore } from 'src/stores/skin';

import BingoCell from './BingoCell.vue';

const skinStore = useSkinStore();

defineProps<{ card: Bingo75Card }>();
defineEmits<{ (e: 'toggle-mark', row: number, col: number): void }>();
</script>

<template>
  <div class="bingo-card-75" :style="{ '--card-border': skinStore.activeSkin?.card.border, '--card-bg': skinStore.activeSkin?.card.background, '--header-bg': skinStore.activeSkin?.card.headerBackground, '--header-text': skinStore.activeSkin?.card.headerText, '--header-border': skinStore.activeSkin?.card.headerBorder, '--cell-border': skinStore.activeSkin?.card.cellBorder }">
    <div class="bingo-header">
      <div v-for="letter in ['B', 'I', 'N', 'G', 'O']" :key="letter" class="header-cell">
        {{ letter }}
      </div>
    </div>
    <div class="bingo-grid">
      <div v-for="(row, rIndex) in card.grid" :key="rIndex" class="bingo-row">
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
.bingo-card-75 {
  border: 2px solid var(--card-border);
  width: 300px;
  background: var(--card-bg);
  page-break-inside: avoid;
}

.bingo-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: var(--header-bg);
  color: var(--header-text);
  font-weight: bold;
}

.header-cell {
  padding: 10px;
  text-align: center;
  border: 1px solid var(--header-border);
  font-size: 1.5rem;
}

.bingo-grid {
  display: flex;
  flex-direction: column;
}

.bingo-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
