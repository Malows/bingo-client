import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BingoCard90 from './BingoCard90.vue';
import { Bingo90Card } from '../models/Bingo90Card';

describe('BingoCard90.vue', () => {
  // Helper to create a mock card
  const createMockCard = (): Bingo90Card => {
    return new Bingo90Card();
  };

  it('should render the component', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: createMockCard(),
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render 3 rows', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: createMockCard(),
      },
    });

    const rows = wrapper.findAll('.bingo-row-90');
    expect(rows).toHaveLength(3);
  });

  it('should render 27 cells total (3x9)', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: createMockCard(),
      },
    });

    const cells = wrapper.findAll('.bingo-cell');
    expect(cells).toHaveLength(27);
  });

  it('should have correct number of numbered cells (15)', () => {
    const card = createMockCard();
    const wrapper = mount(BingoCard90, {
      props: { card },
    });

    const cells = wrapper.findAll('.bingo-cell');
    let numberedCount = 0;

    cells.forEach((cell) => {
      if (!cell.classes().includes('bingo-cell--empty') && cell.text().trim() !== '') {
        numberedCount++;
      }
    });

    expect(numberedCount).toBe(15);
  });

  it('should maintain 9 columns per row', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: createMockCard(),
      },
    });

    const rows = wrapper.findAll('.bingo-row-90');
    rows.forEach((row) => {
      const cells = row.findAll('.bingo-cell');
      expect(cells).toHaveLength(9);
    });
  });

  it('should emit toggle-mark event when cell is clicked', async () => {
    const card = createMockCard();

    // Find a cell with a value (non-empty)
    let targetRow = -1;
    let targetCol = -1;
    for (let r = 0; r < 3 && targetRow === -1; r++) {
      for (let c = 0; c < 9; c++) {
        const cell = card.grid[r]?.[c];
        if (cell?.value !== null) {
          targetRow = r;
          targetCol = c;
          break;
        }
      }
    }

    const wrapper = mount(BingoCard90, {
      props: { card },
    });

    const rows = wrapper.findAll('.bingo-row-90');
    const cellToClick = rows[targetRow]?.findAll('.bingo-cell')[targetCol];

    await cellToClick?.trigger('click');

    expect(wrapper.emitted('toggle-mark')).toBeTruthy();
    expect(wrapper.emitted('toggle-mark')![0]).toEqual([targetRow, targetCol]);
  });

  it('should show bingo-cell--marked class when cell with value is marked', () => {
    const card = createMockCard();

    // Find a cell with a value and mark it
    let markedRow = -1;
    let markedCol = -1;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 9; c++) {
        const cell = card.grid[r]?.[c];
        if (cell?.value !== null) {
          card.toggleMark(r, c);
          markedRow = r;
          markedCol = c;
          break;
        }
      }
      if (markedRow >= 0) break;
    }

    const wrapper = mount(BingoCard90, {
      props: { card },
    });

    const rows = wrapper.findAll('.bingo-row-90');
    const markedCell = rows[markedRow]?.findAll('.bingo-cell')[markedCol];

    expect(markedCell?.classes()).toContain('bingo-cell--marked');
  });

  it('should render empty cells correctly', () => {
    const card = createMockCard();
    const wrapper = mount(BingoCard90, {
      props: { card },
    });

    // Count empty cells (should be 12 = 27 - 15)
    const emptyCells = wrapper.findAll('.bingo-cell--empty');
    expect(emptyCells).toHaveLength(12);
  });
});
