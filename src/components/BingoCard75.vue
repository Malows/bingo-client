<template>
  <div class="bingo-card-75">
    <div class="bingo-header">
      <div v-for="letter in ['B', 'I', 'N', 'G', 'O']" :key="letter" class="header-cell">
        {{ letter }}
      </div>
    </div>
    <div class="bingo-grid">
      <div v-for="(row, rIndex) in card" :key="rIndex" class="bingo-row">
        <div 
          v-for="(cell, cIndex) in row" 
          :key="cIndex" 
          class="bingo-cell"
          :class="{ 'free-space': cell === 'FREE' }"
        >
          <span v-if="cell === 'FREE'">FREE</span>
          <span v-else>{{ cell }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Bingo75Card } from 'src/stores/bingo';

defineProps<{
  card: Bingo75Card;
}>();
</script>

<style scoped>
.bingo-card-75 {
  border: 2px solid #333;
  width: 300px;
  background: white;
  page-break-inside: avoid;
}

.bingo-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #1976D2;
  color: white;
  font-weight: bold;
}

.header-cell {
  padding: 10px;
  text-align: center;
  border: 1px solid #333;
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

.bingo-cell {
  aspect-ratio: 1;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.free-space {
  font-size: 1rem;
  background-color: #f0f0f0;
}
</style>
