<script setup lang="ts">
import { BingoTypes } from 'src/models';

const { marked, row, col, value, type } = defineProps<{
  type: BingoTypes;
  row: number;
  col: number;
  value: 'FREE' | number | null;
  marked: boolean;
}>();
const emit = defineEmits<{ (e: 'toggle-mark', row: number, col: number): void }>();

function handleClick() {
  if (marked || value === 'FREE') return;
  emit('toggle-mark', row, col);
}

function handleDoubleClick() {
  if (value === 'FREE' || !marked) return;
  emit('toggle-mark', row, col);
}
</script>

<template>
  <div
    class="bingo-cell cursor-pointer"
    :class="{
      'bingo-cell--90': type === BingoTypes.BINGO_90,
      'bingo-cell--75': type === BingoTypes.BINGO_75,
      'free-space': value === 'FREE',
      marked: marked,
      'bingo-cell--90--empty': type === BingoTypes.BINGO_90 && value === null,
    }"
    @click="handleClick"
    @dblclick="handleDoubleClick"
    @selectstart.prevent
  >
    <span v-if="value === 'FREE'">FREE</span>
    <span v-else>{{ value }}</span>
  </div>
</template>

<style lang="scss" scoped>
.bingo-cell {
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;

  &--90--empty {
    width: 100%;
    height: 100%;
    background-color: #ffebee;
  }
  &--75 {
    aspect-ratio: 1;
  }
}

.free-space {
  font-size: 1rem;
  background-color: #f0f0f0;
  background-color: #81c784;
  &.marked {
    background-color: #81c784;
  }
}

.marked {
  background-color: #4caf50;
  color: white;
}

/* Printing optimization */
@media print {
  .bingo-card--90 {
    break-inside: avoid;
    margin-bottom: 10px;
  }
}
</style>
