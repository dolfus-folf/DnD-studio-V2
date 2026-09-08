import { DND2024Character } from '../../core/domain/character/character.types';

export interface ICharacterRepository {
  getAll(): Promise<DND2024Character[]>;
  getById(id: string): Promise<DND2024Character | null>;
  save(character: DND2024Character): Promise<void>;
  saveAll(characters: DND2024Character[]): Promise<void>;
  delete(id: string): Promise<void>;
}
