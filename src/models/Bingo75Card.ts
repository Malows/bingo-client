import type { BingoCard, BingoCell, BingoCardJSON } from './BingoCard';
import { BingoTypes, BINGO_75_CONSTANTS } from './BingoCard';

export class Bingo75Card implements BingoCard {
  readonly id: string;
  readonly type: BingoTypes = BingoTypes.BINGO_75;
  readonly grid: BingoCell[][];

  constructor(id?: string, grid?: BingoCell[][]) {
    this.id = id || crypto.randomUUID();
    if (grid) {
      this.grid = this.deepCloneGrid(grid);
    } else {
      this.grid = this.generateGrid();
    }
  }

  toggleMark(row: number, col: number): boolean {
    if (!this.isValidPosition(row, col)) {
      return false;
    }

    const cell = this.grid[row]?.[col];

    if (!cell) {
      return false;
    }

    // No permitir marcar celdas sin valor
    if (cell.value === null) {
      return false;
    }

    cell.marked = !cell.marked;
    return true;
  }

  checkLine(): boolean {
    const { ROWS, COLS } = BINGO_75_CONSTANTS;

    // Filas
    for (let r = 0; r < ROWS; r++) {
      const row = this.grid[r];
      if (row && row.every((c) => c.marked)) {
        return true;
      }
    }

    // Columnas
    for (let c = 0; c < COLS; c++) {
      if (this.grid.every((row) => row[c]?.marked)) {
        return true;
      }
    }

    // Diagonal principal (↘)
    if (this.grid.every((row, idx) => row[idx]?.marked)) {
      return true;
    }

    // Diagonal inversa (↙)
    if (this.grid.every((row, idx) => row[COLS - 1 - idx]?.marked)) {
      return true;
    }

    return false;
  }

  checkFull(): boolean {
    return this.grid.flat().every((c) => c.marked);
  }

  clone(): Bingo75Card {
    return new Bingo75Card(this.id, this.grid);
  }

  toJSON(): BingoCardJSON {
    return {
      id: this.id,
      type: this.type,
      grid: this.deepCloneGrid(this.grid),
    };
  }

  static fromJSON(json: BingoCardJSON): Bingo75Card {
    if (json.type !== BingoTypes.BINGO_75) {
      throw new Error('Invalid card type for Bingo75Card');
    }
    return new Bingo75Card(json.id, json.grid);
  }

  private isValidPosition(row: number, col: number): boolean {
    const { ROWS, COLS } = BINGO_75_CONSTANTS;
    return (
      row >= 0 &&
      row < ROWS &&
      col >= 0 &&
      col < COLS &&
      this.grid[row] !== undefined &&
      this.grid[row][col] !== undefined
    );
  }

  private generateGrid(): BingoCell[][] {
    const { ROWS, COLS, RANGE_PER_COLUMN, MIN_NUMBER, FREE_SPACE_ROW, FREE_SPACE_COL } =
      BINGO_75_CONSTANTS;

    const columns = Array.from({ length: COLS }, (_, colIdx) => {
      const min = MIN_NUMBER + colIdx * RANGE_PER_COLUMN;
      const max = min + RANGE_PER_COLUMN - 1;
      return this.getRandomNumbers(min, max, ROWS);
    });

    return Array.from({ length: ROWS }, (_, row) => {
      return Array.from({ length: COLS }, (_, col) => {
        let value: number | 'FREE' | null = columns[col]?.[row] ?? 0;
        let marked = false;

        // Espacio FREE en el centro
        if (row === FREE_SPACE_ROW && col === FREE_SPACE_COL) {
          value = 'FREE';
          marked = true;
        }

        return {
          id: crypto.randomUUID(),
          value,
          marked,
        };
      });
    });
  }

  private getRandomNumbers(min: number, max: number, count: number): number[] {
    const nums = new Set<number>();
    const maxAttempts = (max - min + 1) * 10;
    let attempts = 0;

    while (nums.size < count && attempts < maxAttempts) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      nums.add(n);
      attempts++;
    }

    if (nums.size < count) {
      throw new Error(`Unable to generate ${count} unique numbers between ${min} and ${max}`);
    }

    return Array.from(nums);
  }

  private deepCloneGrid(grid: BingoCell[][]): BingoCell[][] {
    return grid.map((row) => row.map((cell) => ({ ...cell })));
  }
}
