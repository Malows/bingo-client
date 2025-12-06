import type { BingoCard, BingoCell, BingoCardJSON } from './BingoCard';
import { BINGO_TYPES, BINGO_90_CONSTANTS } from './BingoCard';

export class Bingo90Card implements BingoCard {
  readonly id: string;
  readonly type: '90' = BINGO_TYPES.BINGO_90 as '90';
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

    // En bingo 90, nulls son espacios vacíos, no clickeables
    if (cell.value === null) {
      return false;
    }

    cell.marked = !cell.marked;
    return true;
  }

  checkLine(): boolean {
    // En bingo 90, las líneas son filas horizontales
    for (const row of this.grid) {
      // Solo verificar celdas con valores (no null/espacios vacíos)
      const numberedCells = row.filter((c) => c.value !== null);
      if (numberedCells.length > 0 && numberedCells.every((c) => c.marked)) {
        return true;
      }
    }
    return false;
  }

  checkFull(): boolean {
    const allNumbered = this.grid.flat().filter((c) => c.value !== null);
    return allNumbered.length > 0 && allNumbered.every((c) => c.marked);
  }

  clone(): Bingo90Card {
    return new Bingo90Card(this.id, this.grid);
  }

  toJSON(): BingoCardJSON {
    return {
      id: this.id,
      type: this.type,
      grid: this.deepCloneGrid(this.grid),
    };
  }

  static fromJSON(json: BingoCardJSON): Bingo90Card {
    if (json.type !== BINGO_TYPES.BINGO_90) {
      throw new Error('Invalid card type for Bingo90Card');
    }
    return new Bingo90Card(json.id, json.grid);
  }

  private isValidPosition(row: number, col: number): boolean {
    const { ROWS, COLS } = BINGO_90_CONSTANTS;
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
    const maxAttempts = 100;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const gridRaw = this.tryGenerateBingo90Raw();

        return gridRaw.map((rowArr, rIdx) =>
          rowArr.map((val, cIdx) => ({
            id: crypto.randomUUID(),
            value: val,
            marked: false,
          })),
        );
      } catch (e) {
        attempts++;
      }
    }

    throw new Error(`Failed to generate valid Bingo90 grid after ${maxAttempts} attempts`);
  }

  private tryGenerateBingo90Raw(): (number | null)[][] {
    const { ROWS, COLS, TOTAL_NUMBERS, NUMBERS_PER_ROW, COLUMN_RANGE } = BINGO_90_CONSTANTS;

    const grid: (number | null)[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    // Calcular cuántos números por columna (al menos 1, máximo 3)
    const colCounts = new Array(COLS).fill(1);
    let remaining = TOTAL_NUMBERS - COLS;

    while (remaining > 0) {
      const idx = Math.floor(Math.random() * COLS);
      if (colCounts[idx] < ROWS) {
        colCounts[idx]++;
        remaining--;
      }
    }

    // Generar números aleatorios para cada columna
    const colNumbers: number[][] = [];
    for (let c = 0; c < COLS; c++) {
      const min = c === 0 ? 1 : c * COLUMN_RANGE;
      const max = c === 8 ? 90 : c * COLUMN_RANGE + COLUMN_RANGE - 1;
      const count = colCounts[c];
      const nums = this.getRandomNumbers(min, max, count).sort((a, b) => a - b);
      colNumbers.push(nums);
    }

    // Distribuir números en el grid asegurando 5 números por fila
    const rowCounts: number[] = [0, 0, 0];
    const colInstructions: number[][] = Array.from({ length: COLS }, () => []);

    // Ordenar columnas por cantidad de números (más llenas primero)
    const colIndices = Array.from({ length: COLS }, (_, i) => i).sort(
      (a, b) => colCounts[b] - colCounts[a],
    );

    for (const colIdx of colIndices) {
      const count = colCounts[colIdx];
      const availableRows = [0, 1, 2].filter((r) => (rowCounts[r] ?? 0) < NUMBERS_PER_ROW);

      if (count === 3) {
        // Todas las filas deben estar disponibles
        if (availableRows.length < 3) {
          throw new Error('Retry');
        }
        colInstructions[colIdx] = [0, 1, 2];
        rowCounts[0] = (rowCounts[0] ?? 0) + 1;
        rowCounts[1] = (rowCounts[1] ?? 0) + 1;
        rowCounts[2] = (rowCounts[2] ?? 0) + 1;
      } else if (count === 2) {
        // Elegir las dos filas con menos números
        availableRows.sort((a, b) => (rowCounts[a] ?? 0) - (rowCounts[b] ?? 0));
        if (availableRows.length < 2) {
          throw new Error('Retry');
        }
        const r1 = availableRows[0];
        const r2 = availableRows[1];

        if (r1 === undefined || r2 === undefined) {
          throw new Error('Retry');
        }

        colInstructions[colIdx] = [r1, r2].sort((a, b) => a - b);
        rowCounts[r1] = (rowCounts[r1] ?? 0) + 1;
        rowCounts[r2] = (rowCounts[r2] ?? 0) + 1;
      } else if (count === 1) {
        // Elegir la fila con menos números
        availableRows.sort((a, b) => (rowCounts[a] ?? 0) - (rowCounts[b] ?? 0));
        if (availableRows.length < 1) {
          throw new Error('Retry');
        }
        const r1 = availableRows[0];

        if (r1 === undefined) {
          throw new Error('Retry');
        }

        colInstructions[colIdx] = [r1];
        rowCounts[r1] = (rowCounts[r1] ?? 0) + 1;
      }
    }

    // Validar que cada fila tenga exactamente 5 números
    if (!rowCounts.every((count) => count === NUMBERS_PER_ROW)) {
      throw new Error('Retry');
    }

    // Llenar el grid con los números
    for (let c = 0; c < COLS; c++) {
      const rows = colInstructions[c];
      const nums = colNumbers[c];

      if (!rows || !nums) {
        continue;
      }

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const num = nums[i];

        if (row !== undefined && num !== undefined && grid[row]) {
          grid[row][c] = num;
        }
      }
    }

    return grid;
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
