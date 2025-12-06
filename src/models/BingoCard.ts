export const BINGO_TYPES = {
  BINGO_75: '75',
  BINGO_90: '90',
} as const;

export type BingoType = (typeof BINGO_TYPES)[keyof typeof BINGO_TYPES];

export const BINGO_75_CONSTANTS = {
  ROWS: 5,
  COLS: 5,
  MIN_NUMBER: 1,
  MAX_NUMBER: 75,
  NUMBERS_PER_COLUMN: 5,
  RANGE_PER_COLUMN: 15,
  FREE_SPACE_ROW: 2,
  FREE_SPACE_COL: 2,
} as const;

export const BINGO_90_CONSTANTS = {
  ROWS: 3,
  COLS: 9,
  MIN_NUMBER: 1,
  MAX_NUMBER: 90,
  TOTAL_NUMBERS: 15,
  NUMBERS_PER_ROW: 5,
  COLUMN_RANGE: 10,
} as const;

export interface BingoCell {
  readonly id: string;
  readonly value: number | 'FREE' | null;
  marked: boolean;
}

export interface BingoCard {
  readonly id: string;
  readonly type: BingoType;
  readonly grid: BingoCell[][];

  checkLine(): boolean;
  checkFull(): boolean;
  toggleMark(row: number, col: number): boolean;
  clone(): BingoCard;
  toJSON(): BingoCardJSON;
}

export interface BingoCardJSON {
  id: string;
  type: BingoType;
  grid: BingoCell[][];
}
