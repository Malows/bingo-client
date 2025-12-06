import type { BingoCard, BingoCardJSON, BingoType } from './BingoCard';
import { BINGO_TYPES } from './BingoCard';
import { Bingo75Card } from './Bingo75Card';
import { Bingo90Card } from './Bingo90Card';

/**
 * Factory para crear cartones de bingo de diferentes tipos
 */
export class BingoCardFactory {
  /**
   * Crea un nuevo cartón de bingo del tipo especificado
   * @param type - Tipo de bingo ('75' o '90')
   * @param id - ID opcional para el cartón
   * @returns Una instancia de BingoCard
   * @throws Error si el tipo no es válido
   */
  static create(type: BingoType, id?: string): BingoCard {
    switch (type) {
      case BINGO_TYPES.BINGO_75:
        return new Bingo75Card(id);

      case BINGO_TYPES.BINGO_90:
        return new Bingo90Card(id);

      default:
        throw new Error(`Unknown bingo type: ${type}`);
    }
  }

  /**
   * Crea múltiples cartones de bingo del mismo tipo
   * @param type - Tipo de bingo ('75' o '90')
   * @param count - Número de cartones a crear
   * @returns Array de cartones de bingo
   */
  static createMultiple(type: BingoType, count: number): BingoCard[] {
    if (count < 1) {
      throw new Error('Count must be at least 1');
    }

    if (count > 1000) {
      throw new Error('Count exceeds maximum limit of 1000');
    }

    return Array.from({ length: count }, () => this.create(type));
  }

  /**
   * Reconstruye un cartón de bingo desde su representación JSON
   * @param json - Objeto JSON con los datos del cartón
   * @returns Una instancia de BingoCard
   * @throws Error si el tipo no es válido
   */
  static fromJSON(json: BingoCardJSON): BingoCard {
    switch (json.type) {
      case BINGO_TYPES.BINGO_75:
        return Bingo75Card.fromJSON(json);

      case BINGO_TYPES.BINGO_90:
        return Bingo90Card.fromJSON(json);

      default:
        throw new Error(`Unknown bingo type in JSON: ${json.type}`);
    }
  }

  /**
   * Valida que un tipo de bingo sea válido
   * @param type - Tipo a validar
   * @returns true si es válido, false en caso contrario
   */
  static isValidType(type: string): type is BingoType {
    return Object.values(BINGO_TYPES).includes(type as BingoType);
  }

  /**
   * Obtiene todos los tipos de bingo disponibles
   * @returns Array con los tipos disponibles
   */
  static getAvailableTypes(): BingoType[] {
    return Object.values(BINGO_TYPES);
  }
}
