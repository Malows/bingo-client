import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useBingoStore } from './bingo';
import { BingoTypes } from '../models/BingoCard';

describe('useBingoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Initial State', () => {
    it('should have empty cards array initially', () => {
      const store = useBingoStore();

      expect(store.cards).toEqual([]);
      expect(store.cards75).toEqual([]);
      expect(store.cards90).toEqual([]);
    });

    it('should have null game type initially', () => {
      const store = useBingoStore();

      expect(store.gameType).toBeNull();
    });
  });

  describe('generateCards', () => {
    it('should generate specified number of Bingo75 cards', () => {
      const store = useBingoStore();

      store.generateCards(BingoTypes.BINGO_75, 3);

      expect(store.cards).toHaveLength(3);
      expect(store.cards75).toHaveLength(3);
      expect(store.cards90).toHaveLength(0);
      expect(store.gameType).toBe(BingoTypes.BINGO_75);
    });

    it('should generate specified number of Bingo90 cards', () => {
      const store = useBingoStore();

      store.generateCards(BingoTypes.BINGO_90, 2);

      expect(store.cards).toHaveLength(2);
      expect(store.cards90).toHaveLength(2);
      expect(store.cards75).toHaveLength(0);
      expect(store.gameType).toBe(BingoTypes.BINGO_90);
    });

    it('should replace previous cards when generating new type', () => {
      const store = useBingoStore();

      store.generateCards(BingoTypes.BINGO_75, 2);
      expect(store.cards75).toHaveLength(2);

      store.generateCards(BingoTypes.BINGO_90, 3);
      expect(store.cards75).toHaveLength(0);
      expect(store.cards90).toHaveLength(3);
    });

    it('should generate unique cards with unique IDs', () => {
      const store = useBingoStore();

      store.generateCards(BingoTypes.BINGO_75, 10);

      const cardIds = store.cards.map((card) => card.id);
      const uniqueIds = new Set(cardIds);

      expect(uniqueIds.size).toBe(10);
    });
  });

  describe('clearCards', () => {
    it('should clear all cards and reset gameType', () => {
      const store = useBingoStore();

      store.generateCards(BingoTypes.BINGO_75, 3);
      expect(store.cards).toHaveLength(3);

      store.clearCards();

      expect(store.cards).toEqual([]);
      expect(store.gameType).toBeNull();
    });
  });

  describe('toggleMark', () => {
    it('should toggle mark on a card cell', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_75, 1);

      const card = store.cards[0];
      expect(card).toBeDefined();
      if (!card) return;

      const result = store.toggleMark(card.id, 0, 0);
      expect(result).toBe(true);
      expect(card.grid[0]?.[0]?.marked).toBe(true);
    });

    it('should return false for non-existent card', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_75, 1);

      const result = store.toggleMark('non-existent-id', 0, 0);
      expect(result).toBe(false);
    });
  });

  describe('checkLine and checkFull', () => {
    it('should return false for non-existent card', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_75, 1);

      expect(store.checkLine('non-existent-id')).toBe(false);
      expect(store.checkFull('non-existent-id')).toBe(false);
    });

    it('should check line on a card', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_75, 1);

      const card = store.cards[0];
      expect(card).toBeDefined();
      if (!card) return;

      // Initially no line
      expect(store.checkLine(card.id)).toBe(false);
    });
  });

  describe('Bingo75 Card Generation', () => {
    it('should create cards with 5x5 grid', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_75, 1);
      const card = store.cards75[0];

      expect(card).toBeDefined();
      expect(card?.grid).toHaveLength(5);
      card?.grid.forEach((row) => {
        expect(row).toHaveLength(5);
      });
    });

    it('should have FREE in center position', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_75, 1);
      const card = store.cards75[0];

      expect(card?.grid[2]?.[2]?.value).toBe('FREE');
    });

    it('should have numbers in correct ranges for each column', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_75, 1);
      const card = store.cards75[0];

      expect(card).toBeDefined();
      if (!card) return;

      const ranges = [
        { min: 1, max: 15 }, // B
        { min: 16, max: 30 }, // I
        { min: 31, max: 45 }, // N
        { min: 46, max: 60 }, // G
        { min: 61, max: 75 }, // O
      ];

      for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 5; row++) {
          const cell = card.grid[row]?.[col];

          // Skip FREE space
          if (row === 2 && col === 2) {
            expect(cell?.value).toBe('FREE');
            continue;
          }

          expect(typeof cell?.value).toBe('number');
          if (typeof cell?.value === 'number') {
            const range = ranges[col];
            if (range) {
              expect(cell.value).toBeGreaterThanOrEqual(range.min);
              expect(cell.value).toBeLessThanOrEqual(range.max);
            }
          }
        }
      }
    });
  });

  describe('Bingo90 Card Generation', () => {
    it('should create cards with 3x9 grid', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_90, 1);
      const card = store.cards90[0];

      expect(card).toBeDefined();
      expect(card?.grid).toHaveLength(3);
      card?.grid.forEach((row) => {
        expect(row).toHaveLength(9);
      });
    });

    it('should have exactly 15 numbers total', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_90, 1);
      const card = store.cards90[0];

      expect(card).toBeDefined();
      if (!card) return;

      const numbers = card.grid.flat().filter((cell) => cell.value !== null);
      expect(numbers).toHaveLength(15);
    });

    it('should have exactly 5 numbers per row', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_90, 1);
      const card = store.cards90[0];

      expect(card).toBeDefined();
      if (!card) return;

      card.grid.forEach((row) => {
        const numbers = row.filter((cell) => cell.value !== null);
        expect(numbers).toHaveLength(5);
      });
    });

    it('should have at least 1 number per column', () => {
      const store = useBingoStore();
      store.generateCards(BingoTypes.BINGO_90, 1);
      const card = store.cards90[0];

      expect(card).toBeDefined();
      if (!card) return;

      for (let col = 0; col < 9; col++) {
        const columnCells = card.grid.map((row) => row[col]).filter((cell) => cell?.value !== null);

        expect(columnCells.length).toBeGreaterThanOrEqual(1);
        expect(columnCells.length).toBeLessThanOrEqual(3);
      }
    });
  });
});
