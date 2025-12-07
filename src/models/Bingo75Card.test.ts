import { describe, it, expect, beforeEach } from 'vitest';
import { Bingo75Card } from './Bingo75Card';
import { BINGO_75_CONSTANTS, BingoTypes } from './BingoCard';
import type { BingoCell } from './BingoCard';

// Helper para acceso seguro al grid en tests
const getCell = (grid: BingoCell[][], row: number, col: number): BingoCell => {
  return grid[row]![col]!;
};

describe('Bingo75Card', () => {
  let card: Bingo75Card;

  beforeEach(() => {
    card = new Bingo75Card();
  });

  describe('Constructor', () => {
    it('should create a card with a valid UUID', () => {
      expect(card.id).toBeDefined();
      expect(typeof card.id).toBe('string');
      expect(card.id.length).toBeGreaterThan(0);
    });

    it('should have type 75', () => {
      expect(card.type).toBe('75');
    });

    it('should create a 5x5 grid', () => {
      expect(card.grid).toHaveLength(BINGO_75_CONSTANTS.ROWS);
      card.grid.forEach((row: BingoCell[]) => {
        expect(row).toHaveLength(BINGO_75_CONSTANTS.COLS);
      });
    });

    it('should have FREE space in center (2,2)', () => {
      const centerCell = getCell(card.grid, 2, 2);
      expect(centerCell.value).toBe('FREE');
      expect(centerCell.marked).toBe(true);
    });

    it('should generate numbers in correct ranges', () => {
      for (let col = 0; col < BINGO_75_CONSTANTS.COLS; col++) {
        for (let row = 0; row < BINGO_75_CONSTANTS.ROWS; row++) {
          const cell = getCell(card.grid, row, col);

          // Skip FREE space
          if (row === 2 && col === 2) continue;

          const value = cell.value as number;
          const expectedMin = 1 + col * 15;
          const expectedMax = expectedMin + 14;

          expect(value).toBeGreaterThanOrEqual(expectedMin);
          expect(value).toBeLessThanOrEqual(expectedMax);
        }
      }
    });

    it('should have unique numbers in each column', () => {
      for (let col = 0; col < BINGO_75_CONSTANTS.COLS; col++) {
        const numbers = card.grid
          .map((row: BingoCell[]) => row[col]?.value)
          .filter((val): val is number => typeof val === 'number');

        const uniqueNumbers = new Set(numbers);
        expect(uniqueNumbers.size).toBe(numbers.length);
      }
    });

    it('should accept custom id', () => {
      const customId = 'custom-test-id';
      const customCard = new Bingo75Card(customId);
      expect(customCard.id).toBe(customId);
    });

    it('should accept custom grid', () => {
      const customGrid = card.grid;
      const newCard = new Bingo75Card('test-id', customGrid);

      expect(newCard.grid).toHaveLength(customGrid.length);
      // Should be a deep clone, not the same reference
      expect(newCard.grid).not.toBe(customGrid);
    });
  });

  describe('toggleMark', () => {
    it('should mark an unmarked cell', () => {
      const cell = getCell(card.grid, 0, 0);
      const initialState = cell.marked;

      const result = card.toggleMark(0, 0);

      expect(result).toBe(true);
      expect(cell.marked).toBe(!initialState);
    });

    it('should unmark a marked cell', () => {
      getCell(card.grid, 0, 0).marked = true;

      const result = card.toggleMark(0, 0);

      expect(result).toBe(true);
      expect(getCell(card.grid, 0, 0).marked).toBe(false);
    });

    it('should return false for invalid row', () => {
      const result = card.toggleMark(-1, 0);
      expect(result).toBe(false);
    });

    it('should return false for invalid column', () => {
      const result = card.toggleMark(0, 10);
      expect(result).toBe(false);
    });

    it('should return false for out of bounds', () => {
      expect(card.toggleMark(100, 0)).toBe(false);
      expect(card.toggleMark(0, 100)).toBe(false);
    });
  });

  describe('checkLine', () => {
    it('should detect horizontal line', () => {
      // Mark first row
      for (let col = 0; col < 5; col++) {
        getCell(card.grid, 0, col).marked = true;
      }

      expect(card.checkLine()).toBe(true);
    });

    it('should detect vertical line', () => {
      // Mark first column
      for (let row = 0; row < 5; row++) {
        getCell(card.grid, row, 0).marked = true;
      }

      expect(card.checkLine()).toBe(true);
    });

    it('should detect diagonal line (top-left to bottom-right)', () => {
      for (let i = 0; i < 5; i++) {
        getCell(card.grid, i, i).marked = true;
      }

      expect(card.checkLine()).toBe(true);
    });

    it('should detect diagonal line (top-right to bottom-left)', () => {
      for (let i = 0; i < 5; i++) {
        getCell(card.grid, i, 4 - i).marked = true;
      }

      expect(card.checkLine()).toBe(true);
    });

    it('should return false when no line is complete', () => {
      // Mark only some cells
      getCell(card.grid, 0, 0).marked = true;
      getCell(card.grid, 1, 1).marked = true;
      getCell(card.grid, 3, 3).marked = true;

      expect(card.checkLine()).toBe(false);
    });

    it('should account for FREE space in center', () => {
      // Center should already be marked
      expect(getCell(card.grid, 2, 2).marked).toBe(true);

      // Mark rest of middle row
      for (let col = 0; col < 5; col++) {
        if (col !== 2) {
          getCell(card.grid, 2, col).marked = true;
        }
      }

      expect(card.checkLine()).toBe(true);
    });
  });

  describe('checkFull', () => {
    it('should return false when card is not full', () => {
      expect(card.checkFull()).toBe(false);
    });

    it('should return true when all cells are marked', () => {
      card.grid.forEach((row: BingoCell[]) => {
        row.forEach((cell: BingoCell) => {
          cell.marked = true;
        });
      });

      expect(card.checkFull()).toBe(true);
    });

    it('should return false when almost full', () => {
      card.grid.forEach((row: BingoCell[]) => {
        row.forEach((cell: BingoCell) => {
          cell.marked = true;
        });
      });

      // Unmark one cell
      getCell(card.grid, 0, 0).marked = false;

      expect(card.checkFull()).toBe(false);
    });
  });

  describe('clone', () => {
    it('should create a deep copy', () => {
      const cloned = card.clone();

      expect(cloned).not.toBe(card);
      expect(cloned.id).toBe(card.id);
      expect(cloned.type).toBe(card.type);
      expect(cloned.grid).not.toBe(card.grid);
    });

    it('should not affect original when modified', () => {
      const cloned = card.clone();

      getCell(cloned.grid, 0, 0).marked = true;

      expect(getCell(card.grid, 0, 0).marked).not.toBe(getCell(cloned.grid, 0, 0).marked);
    });
  });

  describe('toJSON and fromJSON', () => {
    it('should serialize to JSON', () => {
      const json = card.toJSON();

      expect(json.id).toBe(card.id);
      expect(json.type).toBe('75');
      expect(json.grid).toHaveLength(5);
    });

    it('should deserialize from JSON', () => {
      const json = card.toJSON();
      const restored = Bingo75Card.fromJSON(json);

      expect(restored.id).toBe(card.id);
      expect(restored.type).toBe(card.type);
      expect(restored.grid).toHaveLength(card.grid.length);
    });

    it('should throw error for invalid type', () => {
      const invalidJson = {
        id: 'test',
        type: BingoTypes.BINGO_90,
        grid: [],
      };

      expect(() => Bingo75Card.fromJSON(invalidJson)).toThrow();
    });

    it('should preserve marked state in JSON roundtrip', () => {
      getCell(card.grid, 0, 0).marked = true;
      getCell(card.grid, 1, 1).marked = true;

      const json = card.toJSON();
      const restored = Bingo75Card.fromJSON(json);

      expect(getCell(restored.grid, 0, 0).marked).toBe(true);
      expect(getCell(restored.grid, 1, 1).marked).toBe(true);
      expect(getCell(restored.grid, 0, 1).marked).toBe(false);
    });
  });
});
