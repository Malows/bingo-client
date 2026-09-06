<script setup lang="ts">
import { computed } from 'vue';
import { BingoTypes } from 'src/models';
import { useSkinStore } from 'src/stores/skin';

const props = defineProps<{
  type: BingoTypes;
  row: number;
  col: number;
  value: 'FREE' | number | null;
  marked: boolean;
}>();

const emit = defineEmits<{ (e: 'toggle-mark', row: number, col: number): void }>();
const skinStore = useSkinStore();

const isEmpty = computed(() => props.value === null);
const isFree = computed(() => props.value === 'FREE');
const isInteractive = computed(() => !isEmpty.value);

function handleClick() {
  if (isEmpty.value || isFree.value || props.marked) return;
  emit('toggle-mark', props.row, props.col);
}

function handleDoubleClick() {
  if (isEmpty.value || isFree.value || !props.marked) return;
  emit('toggle-mark', props.row, props.col);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (props.marked) {
      handleDoubleClick();
    } else {
      handleClick();
    }
  }
}
</script>

<template>
  <div
    class="bingo-cell"
    :class="{
      'bingo-cell--90': type === BingoTypes.BINGO_90,
      'bingo-cell--75': type === BingoTypes.BINGO_75,
      'bingo-cell--free': isFree,
      'bingo-cell--marked': marked,
      'bingo-cell--empty': isEmpty,
      'bingo-cell--interactive': isInteractive,
    }"
    :style="{
      '--cell-border': skinStore.activeSkin?.cell.border,
      '--cell-hover': skinStore.activeSkin?.cell.hover,
      '--cell-focus': skinStore.activeSkin?.cell.focus,
      '--cell-empty': skinStore.activeSkin?.cell.empty,
      '--cell-free': skinStore.activeSkin?.cell.free,
      '--cell-marked': skinStore.activeSkin?.cell.marked,
      '--cell-marked-text': skinStore.activeSkin?.cell.markedText,
    }"
    :role="isInteractive ? 'button' : undefined"
    :tabindex="isInteractive ? 0 : -1"
    :aria-pressed="isInteractive ? marked : undefined"
    :aria-label="isFree ? 'Free space' : value?.toString()"
    @click="handleClick"
    @dblclick="handleDoubleClick"
    @keydown="handleKeydown"
    @selectstart.prevent
  >
    <span v-if="isFree" class="bingo-cell__text">FREE</span>
    <span v-else-if="!isEmpty" class="bingo-cell__text">{{ value }}</span>
  </div>
</template>

<style lang="scss" scoped>
.bingo-cell {
  border: 1px solid var(--cell-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  user-select: none;
  transition: background-color 0.15s ease;

  &--interactive {
    cursor: pointer;

    &:hover:not(.bingo-cell--marked):not(.bingo-cell--free) {
      background-color: var(--cell-hover);
    }

    &:focus {
      outline: 2px solid var(--cell-focus);
      outline-offset: -2px;
    }
  }

  &--75 {
    aspect-ratio: 1;
  }

  &--empty {
    background-color: var(--cell-empty);
    cursor: default;
  }

  &--free {
    font-size: 1rem;
    background-color: var(--cell-free);
  }

  &--marked {
    background-color: var(--cell-marked);
    color: var(--cell-marked-text);
  }

  &__text {
    pointer-events: none;
  }
}

@media print {
  .bingo-cell {
    &--interactive:hover {
      background-color: transparent;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
