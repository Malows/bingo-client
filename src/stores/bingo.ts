import { defineStore } from 'pinia';

export type Bingo75Card = (number | 'FREE')[][];
export type Bingo90Card = (number | null)[][];

export interface BingoState {
  cards75: Bingo75Card[];
  cards90: Bingo90Card[];
  gameType: '75' | '90';
}

export const useBingoStore = defineStore('bingo', {
  state: (): BingoState => ({
    cards75: [],
    cards90: [],
    gameType: '75',
  }),

  actions: {
    generateCards(type: '75' | '90', quantity: number) {
      this.gameType = type;
      if (type === '75') {
        this.cards75 = Array.from({ length: quantity }, () => this.generateBingo75());
        this.cards90 = []; // Clear other type
      } else {
        this.cards90 = Array.from({ length: quantity }, () => this.generateBingo90());
        this.cards75 = [];
      }
    },

    generateBingo75(): Bingo75Card {
      const card: (number | 'FREE')[][] = [];
      const columns = [
        this.getRandomNumbers(1, 15, 5),   // B
        this.getRandomNumbers(16, 30, 5),  // I
        this.getRandomNumbers(31, 45, 5),  // N
        this.getRandomNumbers(46, 60, 5),  // G
        this.getRandomNumbers(61, 75, 5),  // O
      ];

      // Transpose to rows for easier rendering
      for (let r = 0; r < 5; r++) {
        const row: (number | 'FREE')[] = [];
        for (let c = 0; c < 5; c++) {
          if (r === 2 && c === 2) {
            row.push('FREE');
          } else {
            const col = columns[c];
            if (col) {
              const val = col[r];
              if (val !== undefined) {
                row.push(val);
              }
            }
          }
        }
        card.push(row);
      }
      return card;
    },

    generateBingo90(): Bingo90Card {
        // Attempt generation until a valid card is found
        let card: (number | null)[][];
        let isValid = false;
        
        while (!isValid) {
            try {
                card = this.tryGenerateBingo90();
                isValid = true;
                return card;
            } catch (e) {
                // Retry
            }
        }
        return [];
    },

    tryGenerateBingo90(): Bingo90Card {
        const grid: (number | null)[][] = [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null]
        ];
        
        // 1. Determine how many numbers in each column.
        const colCounts: number[] = new Array(9).fill(1);
        let remaining = 15 - 9;
        
        while (remaining > 0) {
            const idx = Math.floor(Math.random() * 9);
            const currentCount = colCounts[idx];
            if (currentCount !== undefined && currentCount < 3) {
                colCounts[idx] = currentCount + 1;
                remaining--;
            }
        }

        // 2. Select numbers for each column
        const colNumbers: number[][] = [];
        for (let c = 0; c < 9; c++) {
            const min = c === 0 ? 1 : c * 10;
            const max = c === 8 ? 90 : (c * 10 + 9);
            const count = colCounts[c];
            if (count === undefined) throw new Error('Invalid count');
            const nums = this.getRandomNumbers(min, max, count).sort((a, b) => a - b);
            colNumbers.push(nums);
        }
        
        // Use tuple type to avoid undefined checks for fixed length array
        const rowCounts: [number, number, number] = [0, 0, 0];
        
        // Structure to track placement: colInstructions[colIndex] = [rowIdx1, rowIdx2...]
        const colInstructions: number[][] = Array.from({ length: 9 }, () => []);

        // Indices of columns sorted by count descending (3s, then 2s, then 1s)
        const colIndices = Array.from({ length: 9 }, (_, i) => i)
            .sort((a, b) => (colCounts[b] || 0) - (colCounts[a] || 0));

        for (const colIdx of colIndices) {
            const count = colCounts[colIdx];
            if (count === undefined) continue;

            const availableRows = ([0, 1, 2] as const).filter(r => rowCounts[r] < 5);
            
            if (count === 3) {
                if (rowCounts[0] >= 5 || rowCounts[1] >= 5 || rowCounts[2] >= 5) {
                     throw new Error('Retry');
                }
                colInstructions[colIdx] = [0, 1, 2];
                rowCounts[0]++; rowCounts[1]++; rowCounts[2]++;
            } else if (count === 2) {
                availableRows.sort((a, b) => rowCounts[a] - rowCounts[b]);
                if (availableRows.length < 2) throw new Error('Retry');
                
                const r1 = availableRows[0];
                const r2 = availableRows[1];
                if (r1 === undefined || r2 === undefined) throw new Error('Retry');

                colInstructions[colIdx] = [r1, r2].sort((a,b)=>a-b);
                rowCounts[r1]++;
                rowCounts[r2]++;
            } else if (count === 1) {
                availableRows.sort((a, b) => rowCounts[a] - rowCounts[b]);
                if (availableRows.length < 1) throw new Error('Retry');
                
                const r1 = availableRows[0];
                if (r1 === undefined) throw new Error('Retry');

                colInstructions[colIdx] = [r1];
                rowCounts[r1]++;
            }
        }
        
        if (rowCounts[0] !== 5 || rowCounts[1] !== 5 || rowCounts[2] !== 5) {
             throw new Error('Retry');
        }

        // 4. Fill grid
        for (let c = 0; c < 9; c++) {
            const rows = colInstructions[c];
            const nums = colNumbers[c];
            
            if (!rows || !nums) continue;

            for (let i = 0; i < rows.length; i++) {
                const r = rows[i];
                const val = nums[i];
                // Check r validity (it comes from [0,1,2] via availableRows/colInstructions)
                if ((r === 0 || r === 1 || r === 2) && val !== undefined && grid[r]) {
                     grid[r]![c] = val;
                }
            }
        }

        return grid;
    },

    getRandomNumbers(min: number, max: number, count: number): number[] {
      const nums = new Set<number>();
      while (nums.size < count) {
        const n = Math.floor(Math.random() * (max - min + 1)) + min;
        nums.add(n);
      }
      return Array.from(nums);
    }
  }
});
