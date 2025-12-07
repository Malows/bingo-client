import { describe, it, expect } from 'vitest';
import { BingoCardFactory } from './BingoCardFactory';
import { Bingo75Card } from './Bingo75Card';
import { Bingo90Card } from './Bingo90Card';
import { BingoTypes } from './BingoCard';

describe('BingoCardFactory', () => {
  describe('create', () => {
    it('should create a Bingo75Card when type is 75', () => {
      const card = BingoCardFactory.create(BingoTypes.BINGO_75);

      expect(card).toBeInstanceOf(Bingo75Card);
      expect(card.type).toBe('75');
    });

    it('should create a Bingo90Card when type is 90', () => {
      const card = BingoCardFactory.create(BingoTypes.BINGO_90);

      expect(card).toBeInstanceOf(Bingo90Card);
      expect(card.type).toBe('90');
    });

    it('should accept custom id for Bingo75Card', () => {
      const customId = 'custom-75-id';
      const card = BingoCardFactory.create(BingoTypes.BINGO_75, customId);

      expect(card.id).toBe(customId);
    });

    it('should accept custom id for Bingo90Card', () => {
      const customId = 'custom-90-id';
      const card = BingoCardFactory.create(BingoTypes.BINGO_90, customId);

      expect(card.id).toBe(customId);
    });

    it('should throw error for unknown type', () => {
      expect(() => BingoCardFactory.create('invalid' as unknown as '75')).toThrow(
        'Unknown bingo type',
      );
    });
  });

  describe('createMultiple', () => {
    it('should create multiple Bingo75 cards', () => {
      const cards = BingoCardFactory.createMultiple(BingoTypes.BINGO_75, 5);

      expect(cards).toHaveLength(5);
      cards.forEach((card) => {
        expect(card).toBeInstanceOf(Bingo75Card);
        expect(card.type).toBe('75');
      });
    });

    it('should create multiple Bingo90 cards', () => {
      const cards = BingoCardFactory.createMultiple(BingoTypes.BINGO_90, 3);

      expect(cards).toHaveLength(3);
      cards.forEach((card) => {
        expect(card).toBeInstanceOf(Bingo90Card);
        expect(card.type).toBe('90');
      });
    });

    it('should create cards with unique ids', () => {
      const cards = BingoCardFactory.createMultiple(BingoTypes.BINGO_75, 10);
      const ids = cards.map((card) => card.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(10);
    });

    it('should throw error when count is less than 1', () => {
      expect(() => BingoCardFactory.createMultiple(BingoTypes.BINGO_75, 0)).toThrow(
        'Count must be at least 1',
      );
      expect(() => BingoCardFactory.createMultiple(BingoTypes.BINGO_75, -5)).toThrow(
        'Count must be at least 1',
      );
    });

    it('should throw error when count exceeds maximum', () => {
      expect(() => BingoCardFactory.createMultiple(BingoTypes.BINGO_75, 1001)).toThrow(
        'Count exceeds maximum limit',
      );
    });

    it('should allow creating exactly 1000 cards', () => {
      const cards = BingoCardFactory.createMultiple(BingoTypes.BINGO_75, 1000);
      expect(cards).toHaveLength(1000);
    });
  });

  describe('fromJSON', () => {
    it('should reconstruct Bingo75Card from JSON', () => {
      const original = new Bingo75Card('test-id-75');
      const json = original.toJSON();

      const restored = BingoCardFactory.fromJSON(json);

      expect(restored).toBeInstanceOf(Bingo75Card);
      expect(restored.id).toBe(original.id);
      expect(restored.type).toBe('75');
    });

    it('should reconstruct Bingo90Card from JSON', () => {
      const original = new Bingo90Card('test-id-90');
      const json = original.toJSON();

      const restored = BingoCardFactory.fromJSON(json);

      expect(restored).toBeInstanceOf(Bingo90Card);
      expect(restored.id).toBe(original.id);
      expect(restored.type).toBe('90');
    });

    it('should preserve marked cells in Bingo75Card', () => {
      const original = new Bingo75Card();
      original.grid[0]![0]!.marked = true;
      original.grid[1]![1]!.marked = true;

      const json = original.toJSON();
      const restored = BingoCardFactory.fromJSON(json);

      expect(restored.grid[0]?.[0]?.marked).toBe(true);
      expect(restored.grid[1]?.[1]?.marked).toBe(true);
    });

    it('should throw error for invalid type in JSON', () => {
      const invalidJson = {
        id: 'test',
        type: 'invalid' as BingoTypes,
        grid: [],
      };

      expect(() => BingoCardFactory.fromJSON(invalidJson)).toThrow('Unknown bingo type in JSON');
    });
  });

  describe('isValidType', () => {
    it('should return true for valid type 75', () => {
      expect(BingoCardFactory.isValidType('75')).toBe(true);
    });

    it('should return true for valid type 90', () => {
      expect(BingoCardFactory.isValidType('90')).toBe(true);
    });

    it('should return false for invalid types', () => {
      expect(BingoCardFactory.isValidType('80')).toBe(false);
      expect(BingoCardFactory.isValidType('invalid')).toBe(false);
      expect(BingoCardFactory.isValidType('')).toBe(false);
      expect(BingoCardFactory.isValidType('100')).toBe(false);
    });
  });

  describe('getAvailableTypes', () => {
    it('should return all available bingo types', () => {
      const types = BingoCardFactory.getAvailableTypes();

      expect(types).toContain('75');
      expect(types).toContain('90');
      expect(types).toHaveLength(2);
    });

    it('should return an array', () => {
      const types = BingoCardFactory.getAvailableTypes();
      expect(Array.isArray(types)).toBe(true);
    });
  });
});
