import { describe, expect, it } from 'vitest';
import { normalizeToDND2024Character } from '../src/infrastructure/persistence/indexedDBCharacterRepository';

describe('IndexedDB Persistence Normalization', () => {
  it('converts legacy character object to canonical 4-part DND2024Character', () => {
    const legacyRaw = {
      id: 'legacy_123',
      nombre: 'Arthas',
      nivel: 1,
      clase: 'paladin',
      especie: 'humano',
      trasfondo: 'noble',
      caracteristicas: {
        fuerza: 16,
        destreza: 10,
        constitucion: 14,
        inteligencia: 10,
        sabiduria: 12,
        carisma: 14
      },
      puntos_de_golpe: {
        actuales: 12,
        maximos: 12,
        temporales: 0
      },
      dados_de_golpe: {
        total: 1,
        gastados: 0,
        tipo_dado: 10
      },
      salvaciones_competentes: ['sabiduria', 'carisma'],
      habilidades_competentes: ['atletismo', 'persuasion'],
      equipo: []
    };

    const canonical = normalizeToDND2024Character(legacyRaw);

    expect(canonical.id).toBe('legacy_123');
    expect(canonical.base.nombre).toBe('Arthas');
    expect(canonical.base.caracteristicas_base.fuerza).toBe(16);
    expect(canonical.estado.puntos_golpe_actuales).toBe(12);
    expect(canonical.calculado.modificadores.fuerza).toBe(3);
    expect(canonical.calculado.bonificador_competencia).toBe(2);
    expect(canonical.calculado.habilidades.persuasion.competente).toBe(true);
    expect(Array.isArray(canonical.historial)).toBe(true);
  });
});
