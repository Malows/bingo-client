import { describe, it, expect, beforeEach } from 'vitest';
import { Bingo90Card } from './Bingo90Card';
import { BINGO_90_CONSTANTS } from './BingoCard';
import type { BingoCell } from './BingoCard';

describe('Bingo90Card', () => {
  let card: Bingo90Card;

  beforeEach(() => {
    card = new Bingo90Card();
  });

  describe('Constructor', () => {
    it('should create a card with a valid UUID', () => {
      expect(card.id).toBeDefined();
      expect(typeof card.id).toBe('string');
      expect(card.id.length).toBeGreaterThan(0);
    });

    it('should have type 90', () => {
      expect(card.type).toBe('90');
    });

    it('should create a 3x9 grid', () => {
      expect(card.grid).toHaveLength(BINGO_90_CONSTANTS.ROWS);
      card.grid.forEach((row: BingoCell[]) => {
        expect(row).toHaveLength(BINGO_90_CONSTANTS.COLS);
      });
    });

    it('should have exactly 15 numbers total', () => {
      const numberedCells = card.grid.flat().filter((cell) => typeof cell.value === 'number');

      expect(numberedCells).toHaveLength(BINGO_90_CONSTANTS.TOTAL_NUMBERS);
    });

    it('should have exactly 5 numbers per row', () => {
      card.grid.forEach((row: BingoCell[]) => {
        const numberedCells = row.filter((cell) => cell.value !== null);
        expect(numberedCells).toHaveLength(BINGO_90_CONSTANTS.NUMBERS_PER_ROW);
      });
    });

    it('should generate numbers in correct ranges for each column', () => {
      for (let col = 0; col < BINGO_90_CONSTANTS.COLS; col++) {
        const columnNumbers = card.grid
          .map((row: BingoCell[]) => row[col]?.value)
          .filter((val): val is number => typeof val === 'number');

        const expectedMin = col === 0 ? 1 : col * 10;
        const expectedMax = col === 8 ? 90 : col * 10 + 9;

        columnNumbers.forEach((num) => {
          expect(num).toBeGreaterThanOrEqual(expectedMin);
          expect(num).toBeLessThanOrEqual(expectedMax);
        });
      }
    });

    it('should have at least 1 and at most 3 numbers per column', () => {
      for (let col = 0; col < BINGO_90_CONSTANTS.COLS; col++) {
        const columnNumbers = card.grid
          .map((row: BingoCell[]) => row[col]?.value)
          .filter((val): val is number => typeof val === 'number');

        expect(columnNumbers.length).toBeGreaterThanOrEqual(1);
        expect(columnNumbers.length).toBeLessThanOrEqual(3);
      }
    });

    it('should have numbers sorted in ascending order within each column', () => {
      for (let col = 0; col < BINGO_90_CONSTANTS.COLS; col++) {
        const columnNumbers = card.grid
          .map((row: BingoCell[]) => row[col]?.value)
          .filter((val): val is number => typeof val === 'number');

        for (let i = 1; i < columnNumbers.length; i++) {
          expect(columnNumbers[i]).toBeGreaterThan(columnNumbers[i - 1]!);
        }
      }
    });

    it('should accept custom id', () => {
      const customId = 'custom-test-id-90';
      const customCard = new Bingo90Card(customId);
      expect(customCard.id).toBe(customId);
    });
  });

  describe('toggleMark', () => {
    it('should mark an unmarked cell with a number', () => {
      // Find first cell with a number
      let testRow = 0;
      let testCol = 0;

      outer: for (let row = 0; row < card.grid.length; row++) {
        for (let col = 0; col < card.grid[row]!.length; col++) {
          if (card.grid[row]![col]?.value !== null) {
            testRow = row;
            testCol = col;
            break outer;
          }
        }
      }

      const cell = card.grid[testRow]?.[testCol];
      if (cell) {
        const initialState = cell.marked;
        const result = card.toggleMark(testRow, testCol);

        expect(result).toBe(true);
        expect(cell.marked).toBe(!initialState);
      }
    });

    it('should not mark null cells', () => {
      // Find a null cell
      let testRow = 0;
      let testCol = 0;

      outer: for (let row = 0; row < card.grid.length; row++) {
        for (let col = 0; col < card.grid[row]!.length; col++) {
          if (card.grid[row]![col]?.value === null) {
            testRow = row;
            testCol = col;
            break outer;
          }
        }
      }

      const result = card.toggleMark(testRow, testCol);
      expect(result).toBe(false);
    });

    it('should return false for invalid positions', () => {
      expect(card.toggleMark(-1, 0)).toBe(false);
      expect(card.toggleMark(0, -1)).toBe(false);
      expect(card.toggleMark(10, 0)).toBe(false);
      expect(card.toggleMark(0, 20)).toBe(false);
    });
  });

  describe('checkLine', () => {
    it('should detect complete row', () => {
      // Mark all numbered cells in first row
      card.grid[0]!.forEach((cell: BingoCell) => {
        if (cell.value !== null) {
          cell.marked = true;
        }
      });

      expect(card.checkLine()).toBe(true);
    });

    it('should not detect incomplete row', () => {
      // Mark some but not all cells in first row
      let markedCount = 0;
      card.grid[0]!.forEach((cell: BingoCell) => {
        if (cell.value !== null && markedCount < 3) {
          cell.marked = true;
          markedCount++;
        }
      });

      expect(card.checkLine()).toBe(false);
    });

    it('should return false when no line is complete', () => {
      expect(card.checkLine()).toBe(false);
    });
  });

  describe('checkFull', () => {
    it('should return false when card is not full', () => {
      expect(card.checkFull()).toBe(false);
    });

    it('should return true when all numbered cells are marked', () => {
      card.grid.forEach((row: BingoCell[]) => {
        row.forEach((cell: BingoCell) => {
          if (cell.value !== null) {
            cell.marked = true;
          }
        });
      });

      expect(card.checkFull()).toBe(true);
    });

    it('should return false when almost full', () => {
      let skipFirst = true;
      card.grid.forEach((row: BingoCell[]) => {
        row.forEach((cell: BingoCell) => {
          if (cell.value !== null) {
            if (skipFirst) {
              skipFirst = false;
            } else {
              cell.marked = true;
            }
          }
        });
      });

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

      // Find first numbered cell
      for (let row = 0; row < card.grid.length; row++) {
        for (let col = 0; col < card.grid[row]!.length; col++) {
          const cell = card.grid[row]![col]!;
          if (cell?.value !== null) {
            const clonedCell = cloned.grid[row]?.[col];
            if (clonedCell) {
              clonedCell.marked = true;
              expect(cell.marked).toBe(false);
            }
            return;
          }
        }
      }
    });
  });

  describe('toJSON and fromJSON', () => {
    it('should serialize to JSON', () => {
      const json = card.toJSON();

      expect(json.id).toBe(card.id);
      expect(json.type).toBe('90');
      expect(json.grid).toHaveLength(3);
    });

    it('should deserialize from JSON', () => {
      const json = card.toJSON();
      const restored = Bingo90Card.fromJSON(json);

      expect(restored.id).toBe(card.id);
      expect(restored.type).toBe(card.type);
      expect(restored.grid).toHaveLength(card.grid.length);
    });

    it('should throw error for invalid type', () => {
      const invalidJson = {
        id: 'test',
        type: '75' as const,
        grid: [],
      };

      expect(() => Bingo90Card.fromJSON(invalidJson)).toThrow();
    });

    it('should preserve marked state in JSON roundtrip', () => {
      // Find and mark some numbered cells
      let markedCount = 0;
      for (let row = 0; row < card.grid.length; row++) {
        for (let col = 0; col < card.grid[row]!.length; col++) {
          const cell = card.grid[row]![col]!;
          if (cell?.value !== null && markedCount < 3) {
            cell.marked = true;
            markedCount++;
          }
        }
      }

      const json = card.toJSON();
      const restored = Bingo90Card.fromJSON(json);

      // Check that marked states are preserved
      for (let row = 0; row < card.grid.length; row++) {
        for (let col = 0; col < card.grid[row]!.length; col++) {
          const originalCell = card.grid[row]![col]!;
          const restoredCell = restored.grid[row]![col]!;

          if (originalCell && restoredCell) {
            expect(restoredCell.marked).toBe(originalCell.marked);
          }
        }
      }
    });
  });
});
