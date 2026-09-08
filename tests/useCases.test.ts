import { describe, expect, it } from 'vitest';
import {
  applyConditionUseCase,
  applyDamageUseCase,
  healCharacterUseCase,
  longRestUseCase,
  modifyResourceUseCase,
  modifySpellSlotUseCase,
  removeConditionUseCase,
  setTempHPUseCase
} from '../src/application/useCases/characterUseCases';
import { DND2024Character } from '../src/core/domain/character/character.types';
import { recalculateCharacter } from '../src/core/domain/character/characterCalculations';

function createTestCharacter(): DND2024Character {
  const base = {
    id: 'test_char_1',
    nombre: 'Valtor',
    jugador: 'Tester',
    nivel: 2,
    clase: 'paladin',
    subclase: null,
    especie: 'humano',
    linaje: null,
    trasfondo: 'noble',
    alineamiento: 'Legal Bueno',
    puntos_experiencia: 300,
    caracteristicas_base: {
      fuerza: 16,
      destreza: 10,
      constitucion: 14,
      inteligencia: 10,
      sabiduria: 12,
      carisma: 14
    },
    aumentos_caracteristica: {},
    competencias: {
      habilidades: ['atletismo', 'persuasion'],
      salvaciones: ['sabiduria', 'carisma'],
      armas: ['marciales'],
      armaduras: ['pesadas'],
      herramientas: []
    },
    pericias: [],
    dotes: [],
    rasgos: [],
    maestrias_armas: [],
    conjuros_conocidos: [],
    conjuros_preparados: [],
    monedas: { pc: 0, pp: 0, pe: 0, po: 25, ppt: 0 },
    notas: '',
    dado_golpe_tipo: 10,
    creado_en: new Date().toISOString(),
    actualizado_en: new Date().toISOString()
  };

  const estado = {
    puntos_golpe_actuales: 20,
    puntos_golpe_temporales: 0,
    puntos_golpe_maximos_ajuste: 0,
    dados_golpe_gastados: 0,
    salvaciones_muerte: { exitos: 0, fallos: 0 },
    inspiracion_heroica: false,
    condiciones: [],
    recursos: {
      imposicion_de_manos: {
        actual: 10,
        maximo: 10,
        recuperacion: 'descanso_largo' as const
      }
    },
    espacios_conjuro: {
      nivel1: { total: 2, gastados: 0 }
    },
    concentracion: null,
    inventario: [],
    equipamiento: {
      armadura: null,
      escudo: null,
      arma_principal: null,
      arma_secundaria: null
    }
  };

  return {
    id: base.id,
    base,
    estado,
    calculado: recalculateCharacter(base, estado),
    historial: []
  };
}

describe('Application Use Cases', () => {
  it('absorbs damage using temporary HP first', () => {
    let char = createTestCharacter();
    char = setTempHPUseCase(char, 8);
    expect(char.estado.puntos_golpe_temporales).toBe(8);
    expect(char.estado.puntos_golpe_actuales).toBe(20);

    // Apply 5 damage: Temp HP becomes 3, Current HP untouched
    char = applyDamageUseCase(char, 5, 'cortante');
    expect(char.estado.puntos_golpe_temporales).toBe(3);
    expect(char.estado.puntos_golpe_actuales).toBe(20);

    // Apply 7 damage: 3 absorbed by Temp HP, 4 goes to Current HP (20 - 4 = 16)
    char = applyDamageUseCase(char, 7, 'fuego');
    expect(char.estado.puntos_golpe_temporales).toBe(0);
    expect(char.estado.puntos_golpe_actuales).toBe(16);
  });

  it('triggers unconscious condition when dropping to 0 HP', () => {
    let char = createTestCharacter();
    char = applyDamageUseCase(char, 50, 'necrotico');

    expect(char.estado.puntos_golpe_actuales).toBe(0);
    expect(char.estado.condiciones).toContain('inconsciente');
    expect(char.estado.salvaciones_muerte).toEqual({ exitos: 0, fallos: 0 });
  });

  it('revives and removes unconscious condition when healed from 0 HP', () => {
    let char = createTestCharacter();
    char = applyDamageUseCase(char, 50, 'necrotico');
    expect(char.estado.puntos_golpe_actuales).toBe(0);

    char = healCharacterUseCase(char, 5);
    expect(char.estado.puntos_golpe_actuales).toBe(5);
    expect(char.estado.condiciones).not.toContain('inconsciente');
  });

  it('never heals beyond calculated maximum HP', () => {
    let char = createTestCharacter();
    const maxHP = char.calculado.puntos_golpe_maximos;
    char = healCharacterUseCase(char, 100);
    expect(char.estado.puntos_golpe_actuales).toBe(maxHP);
  });

  it('manages resource spending and recovery', () => {
    let char = createTestCharacter();
    char = modifyResourceUseCase(char, 'imposicion_de_manos', -4);
    expect(char.estado.recursos.imposicion_de_manos.actual).toBe(6);

    char = modifyResourceUseCase(char, 'imposicion_de_manos', 2);
    expect(char.estado.recursos.imposicion_de_manos.actual).toBe(8);

    // Cannot exceed maximum
    char = modifyResourceUseCase(char, 'imposicion_de_manos', 10);
    expect(char.estado.recursos.imposicion_de_manos.actual).toBe(10);
  });

  it('manages spell slot expenditure', () => {
    let char = createTestCharacter();
    char = modifySpellSlotUseCase(char, 'nivel1', 1);
    expect(char.estado.espacios_conjuro.nivel1.gastados).toBe(1);

    char = modifySpellSlotUseCase(char, 'nivel1', 1);
    expect(char.estado.espacios_conjuro.nivel1.gastados).toBe(2);

    // Cannot spend more than total
    char = modifySpellSlotUseCase(char, 'nivel1', 1);
    expect(char.estado.espacios_conjuro.nivel1.gastados).toBe(2);
  });

  it('applies and removes conditions cleanly', () => {
    let char = createTestCharacter();
    char = applyConditionUseCase(char, 'envenenado');
    expect(char.estado.condiciones).toContain('envenenado');

    char = removeConditionUseCase(char, 'envenenado');
    expect(char.estado.condiciones).not.toContain('envenenado');
  });

  it('executes a complete Long Rest according to D&D 2024 rules', () => {
    let char = createTestCharacter();
    // Damage, spend slot, spend resource, add exhaustion
    char = applyDamageUseCase(char, 12, 'perforante');
    char = modifySpellSlotUseCase(char, 'nivel1', 2);
    char = modifyResourceUseCase(char, 'imposicion_de_manos', -10);
    char = applyConditionUseCase(char, 'agotamiento_2');

    expect(char.estado.puntos_golpe_actuales).toBe(8);
    expect(char.estado.espacios_conjuro.nivel1.gastados).toBe(2);
    expect(char.estado.recursos.imposicion_de_manos.actual).toBe(0);
    expect(char.estado.condiciones).toContain('agotamiento_2');

    // Execute Long Rest
    char = longRestUseCase(char);

    expect(char.estado.puntos_golpe_actuales).toBe(char.calculado.puntos_golpe_maximos);
    expect(char.estado.espacios_conjuro.nivel1.gastados).toBe(0);
    expect(char.estado.recursos.imposicion_de_manos.actual).toBe(10);
    // Exhaustion reduced by 1 level (from 2 to 1)
    expect(char.estado.condiciones).toContain('agotamiento_1');
    expect(char.estado.condiciones).not.toContain('agotamiento_2');
  });
});
