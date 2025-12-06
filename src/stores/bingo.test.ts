import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useBingoStore } from './bingo';

describe('useBingoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Initial State', () => {
    it('should have empty cards arrays initially', () => {
      const store = useBingoStore();

      expect(store.cards75).toEqual([]);
      expect(store.cards90).toEqual([]);
    });

    it('should have default game type of 75', () => {
      const store = useBingoStore();

      expect(store.gameType).toBe('75');
    });
  });

  describe('generateCards', () => {
    it('should generate specified number of Bingo75 cards', () => {
      const store = useBingoStore();

      store.generateCards('75', 3);

      expect(store.cards75).toHaveLength(3);
      expect(store.cards90).toHaveLength(0);
      expect(store.gameType).toBe('75');
    });

    it('should generate specified number of Bingo90 cards', () => {
      const store = useBingoStore();

      store.generateCards('90', 2);

      expect(store.cards90).toHaveLength(2);
      expect(store.cards75).toHaveLength(0);
      expect(store.gameType).toBe('90');
    });

    it('should clear previous cards when generating new type', () => {
      const store = useBingoStore();

      store.generateCards('75', 2);
      expect(store.cards75).toHaveLength(2);

      store.generateCards('90', 3);
      expect(store.cards75).toHaveLength(0);
      expect(store.cards90).toHaveLength(3);
    });

    it('should generate unique cards', () => {
      const store = useBingoStore();

      store.generateCards('75', 10);

      const cardsAsStrings = store.cards75.map((card) => JSON.stringify(card));
      const uniqueCards = new Set(cardsAsStrings);

      expect(uniqueCards.size).toBeGreaterThan(1);
    });
  });

  describe('generateBingo75', () => {
    it('should create a 5x5 grid', () => {
      const store = useBingoStore();
      const card = store.generateBingo75();

      expect(card).toHaveLength(5);
      card.forEach((row) => {
        expect(row).toHaveLength(5);
      });
    });

    it('should have FREE in center position', () => {
      const store = useBingoStore();
      const card = store.generateBingo75();

      expect(card[2]?.[2]).toBe('FREE');
    });

    it('should have numbers in correct ranges for each column', () => {
      const store = useBingoStore();
      const card = store.generateBingo75();

      const ranges = [
        { min: 1, max: 15 }, // B
        { min: 16, max: 30 }, // I
        { min: 31, max: 45 }, // N
        { min: 46, max: 60 }, // G
        { min: 61, max: 75 }, // O
      ];

      for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 5; row++) {
          const value = card[row]?.[col];

          // Skip FREE space
          if (row === 2 && col === 2) {
            expect(value).toBe('FREE');
            continue;
          }

          expect(typeof value).toBe('number');
          if (typeof value === 'number') {
            const range = ranges[col];
            if (range) {
              expect(value).toBeGreaterThanOrEqual(range.min);
              expect(value).toBeLessThanOrEqual(range.max);
            }
          }
        }
      }
    });

    it('should have unique numbers in each column', () => {
      const store = useBingoStore();
      const card = store.generateBingo75();

      for (let col = 0; col < 5; col++) {
        const columnValues: number[] = [];

        for (let row = 0; row < 5; row++) {
          const value = card[row]?.[col];
          if (typeof value === 'number') {
            columnValues.push(value);
          }
        }

        const uniqueValues = new Set(columnValues);
        expect(uniqueValues.size).toBe(columnValues.length);
      }
    });
  });

  describe('generateBingo90', () => {
    it('should create a 3x9 grid', () => {
      const store = useBingoStore();
      const card = store.generateBingo90();

      expect(card).toHaveLength(3);
      card.forEach((row) => {
        expect(row).toHaveLength(9);
      });
    });

    it('should have exactly 15 numbers total', () => {
      const store = useBingoStore();
      const card = store.generateBingo90();

      const numbers = card.flat().filter((val) => val !== null);
      expect(numbers).toHaveLength(15);
    });

    it('should have exactly 5 numbers per row', () => {
      const store = useBingoStore();
      const card = store.generateBingo90();

      card.forEach((row) => {
        const numbers = row.filter((val) => val !== null);
        expect(numbers).toHaveLength(5);
      });
    });

    it('should have numbers in correct ranges for each column', () => {
      const store = useBingoStore();
      const card = store.generateBingo90();

      for (let col = 0; col < 9; col++) {
        const columnNumbers: number[] = [];

        for (let row = 0; row < 3; row++) {
          const value = card[row]?.[col];
          if (typeof value === 'number') {
            columnNumbers.push(value);
          }
        }

        const expectedMin = col === 0 ? 1 : col * 10;
        const expectedMax = col === 8 ? 90 : col * 10 + 9;

        columnNumbers.forEach((num) => {
          expect(num).toBeGreaterThanOrEqual(expectedMin);
          expect(num).toBeLessThanOrEqual(expectedMax);
        });
      }
    });

    it('should have at least 1 number per column', () => {
      const store = useBingoStore();
      const card = store.generateBingo90();

      for (let col = 0; col < 9; col++) {
        const columnNumbers = card.map((row) => row[col]).filter((val) => val !== null);

        expect(columnNumbers.length).toBeGreaterThanOrEqual(1);
        expect(columnNumbers.length).toBeLessThanOrEqual(3);
      }
    });

    it('should have numbers sorted in ascending order within each column', () => {
      const store = useBingoStore();
      const card = store.generateBingo90();

      for (let col = 0; col < 9; col++) {
        const columnNumbers = card
          .map((row) => row[col])
          .filter((val): val is number => val !== null);

        for (let i = 1; i < columnNumbers.length; i++) {
          const prev = columnNumbers[i - 1];
          const curr = columnNumbers[i];
          if (prev !== undefined && curr !== undefined) {
            expect(curr).toBeGreaterThan(prev);
          }
        }
      }
    });
  });

  describe('getRandomNumbers', () => {
    it('should generate requested count of numbers', () => {
      const store = useBingoStore();
      const numbers = store.getRandomNumbers(1, 100, 10);

      expect(numbers).toHaveLength(10);
    });

    it('should generate unique numbers', () => {
      const store = useBingoStore();
      const numbers = store.getRandomNumbers(1, 100, 20);

      const uniqueNumbers = new Set(numbers);
      expect(uniqueNumbers.size).toBe(20);
    });

    it('should generate numbers within range', () => {
      const store = useBingoStore();
      const numbers = store.getRandomNumbers(10, 20, 5);

      numbers.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(10);
        expect(num).toBeLessThanOrEqual(20);
      });
    });

    it('should handle small ranges', () => {
      const store = useBingoStore();
      const numbers = store.getRandomNumbers(1, 5, 5);

      expect(numbers).toHaveLength(5);
      expect(new Set(numbers).size).toBe(5);
    });
  });
});
