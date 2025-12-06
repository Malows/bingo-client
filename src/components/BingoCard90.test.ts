import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BingoCard90 from './BingoCard90.vue';

describe('BingoCard90.vue', () => {
  const mockCard: (number | null)[][] = [
    [1, null, 23, null, 45, null, 67, null, 89],
    [2, 15, null, 34, null, 56, null, 78, null],
    [null, null, 29, null, 49, null, 69, null, 90],
  ];

  it('should render the component', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: mockCard,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render 3 rows', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: mockCard,
      },
    });

    const rows = wrapper.findAll('.bingo-row-90');
    expect(rows).toHaveLength(3);
  });

  it('should render 27 cells total (3x9)', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: mockCard,
      },
    });

    const cells = wrapper.findAll('.bingo-cell-90');
    expect(cells).toHaveLength(27);
  });

  it('should display numbers correctly', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: mockCard,
      },
    });

    const rows = wrapper.findAll('.bingo-row-90');
    const firstRow = rows[0];
    const cells = firstRow?.findAll('.bingo-cell-90');

    expect(cells?.[0]?.text()).toBe('1');
    expect(cells?.[2]?.text()).toBe('23');
    expect(cells?.[4]?.text()).toBe('45');
  });

  it('should render empty cells as empty', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: mockCard,
      },
    });

    const rows = wrapper.findAll('.bingo-row-90');
    const firstRow = rows[0];
    const cells = firstRow?.findAll('.bingo-cell-90');

    // Cell at index 1 should be null/empty
    const emptyCell = cells?.[1];
    const emptyCellSpan = emptyCell?.find('.empty-cell');
    expect(emptyCellSpan?.exists()).toBe(true);
  });

  it('should have correct number of numbered cells', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: mockCard,
      },
    });

    const cells = wrapper.findAll('.bingo-cell-90');
    let numberedCount = 0;

    cells.forEach((cell) => {
      // If cell doesn't have empty-cell class or has numeric text
      if (!cell.find('.empty-cell').exists() && cell.text().trim() !== '') {
        numberedCount++;
      }
    });

    // Each row should have 5 numbers
    const expectedNumbers = mockCard.flat().filter((val) => val !== null).length;
    expect(numberedCount).toBe(expectedNumbers);
  });

  it('should render with different card data', () => {
    const differentCard: (number | null)[][] = [
      [null, 10, null, 30, null, 50, null, 70, 85],
      [5, null, 25, null, 40, null, 60, null, 90],
      [null, 19, null, 39, null, 59, null, 79, null],
    ];

    const wrapper = mount(BingoCard90, {
      props: {
        card: differentCard,
      },
    });

    const cells = wrapper.findAll('.bingo-cell-90');
    // First cell should be empty
    expect(cells[0]?.find('.empty-cell').exists()).toBe(true);
    // Second cell should have 10
    expect(cells[1]?.text()).toBe('10');
  });

  it('should maintain 9 columns per row', () => {
    const wrapper = mount(BingoCard90, {
      props: {
        card: mockCard,
      },
    });

    const rows = wrapper.findAll('.bingo-row-90');
    rows.forEach((row) => {
      const cells = row.findAll('.bingo-cell-90');
      expect(cells).toHaveLength(9);
    });
  });
});
