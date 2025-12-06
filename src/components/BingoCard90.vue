<template>
  <div class="bingo-card-90">
    <div class="bingo-grid-90">
      <div v-for="(row, rIndex) in card" :key="rIndex" class="bingo-row-90">
        <div 
          v-for="(cell, cIndex) in row" 
          :key="cIndex" 
          class="bingo-cell-90"
        >
          <span v-if="cell !== null">{{ cell }}</span>
          <span v-else class="empty-cell"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Bingo90Card } from 'src/stores/bingo';

defineProps<{
  card: Bingo90Card;
}>();
</script>

<style scoped>
.bingo-card-90 {
  border: 4px solid #D32F2F; /* Red border typical of UK bingo tickets */
  width: 100%;
  max-width: 600px;
  background: white;
  margin-bottom: 20px;
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

.bingo-cell-90 {
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.empty-cell {
  width: 100%;
  height: 100%;
  background-color: #ffebee;
}

/* Printing optimization */
@media print {
  .bingo-card-90 {
    break-inside: avoid;
    margin-bottom: 10px;
  }
}
</style>
