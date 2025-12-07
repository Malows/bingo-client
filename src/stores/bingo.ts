import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { BingoTypes, type BingoCard } from '../models/BingoCard';
import { Bingo75Card } from '../models/Bingo75Card';
import { Bingo90Card } from '../models/Bingo90Card';

export const useBingoStore = defineStore('bingo', () => {
  const cards = ref<BingoCard[]>([]);
  const gameType = ref<BingoTypes | null>(null);

  const cards75 = computed(() =>
    cards.value.filter((card): card is Bingo75Card => card.type === BingoTypes.BINGO_75),
  );

  const cards90 = computed(() =>
    cards.value.filter((card): card is Bingo90Card => card.type === BingoTypes.BINGO_90),
  );

  function generateCards(type: BingoTypes, quantity: number) {
    gameType.value = type;

    const generator = type === BingoTypes.BINGO_75 ? Bingo75Card : Bingo90Card;
    cards.value = Array.from({ length: quantity }, () => new generator());
  }

  function clearCards() {
    cards.value = [];
    gameType.value = null;
  }

  function toggleMark(cardId: string, row: number, col: number): boolean {
    const card = cards.value.find((c) => c.id === cardId);
    if (!card) return false;
    return card.toggleMark(row, col);
  }

  function checkLine(cardId: string): boolean {
    const card = cards.value.find((c) => c.id === cardId);
    if (!card) return false;
    return card.checkLine();
  }

  function checkFull(cardId: string): boolean {
    const card = cards.value.find((c) => c.id === cardId);
    if (!card) return false;
    return card.checkFull();
  }

  return {
    // State
    cards,
    gameType,
    // Getters
    cards75,
    cards90,
    // Actions
    generateCards,
    clearCards,
    toggleMark,
    checkLine,
    checkFull,
  };
});
