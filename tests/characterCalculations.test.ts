import { describe, expect, it } from 'vitest';
import {
  calculateArmorClassDetailed,
  calculateBaseMaxHP,
  calculateModifier,
  calculateProficiencyBonus,
  recalculateCharacter
} from '../src/core/domain/character/characterCalculations';
import { CharacterBase, CharacterState } from '../src/core/domain/character/character.types';

describe('D&D 2024 Domain Calculations', () => {
  it('calculates ability modifiers according to official D&D formula', () => {
    expect(calculateModifier(10)).toBe(0);
    expect(calculateModifier(11)).toBe(0);
    expect(calculateModifier(12)).toBe(1);
    expect(calculateModifier(13)).toBe(1);
    expect(calculateModifier(14)).toBe(2);
    expect(calculateModifier(15)).toBe(2);
    expect(calculateModifier(18)).toBe(4);
    expect(calculateModifier(20)).toBe(5);
    expect(calculateModifier(8)).toBe(-1);
    expect(calculateModifier(9)).toBe(-1);
    expect(calculateModifier(7)).toBe(-2);
    expect(calculateModifier(3)).toBe(-4);
  });

  it('calculates proficiency bonus according to character level', () => {
    expect(calculateProficiencyBonus(1)).toBe(2);
    expect(calculateProficiencyBonus(4)).toBe(2);
    expect(calculateProficiencyBonus(5)).toBe(3);
    expect(calculateProficiencyBonus(8)).toBe(3);
    expect(calculateProficiencyBonus(9)).toBe(4);
    expect(calculateProficiencyBonus(13)).toBe(5);
    expect(calculateProficiencyBonus(17)).toBe(6);
    expect(calculateProficiencyBonus(20)).toBe(6);
  });

  it('calculates hit points correctly with and without Tough feat', () => {
    // Barbarian (d12), Level 1, CON 14 (+2 mod)
    expect(calculateBaseMaxHP(12, 1, 2, false)).toBe(14);
    // With Tough feat (+2 per level)
    expect(calculateBaseMaxHP(12, 1, 2, true)).toBe(16);

    // Level 2 Barbarian: 14 + (7 + 2) = 23
    expect(calculateBaseMaxHP(12, 2, 2, false)).toBe(23);
    // Level 2 with Tough: 23 + 4 = 27
    expect(calculateBaseMaxHP(12, 2, 2, true)).toBe(27);
  });

  it('calculates Unarmored Defense for Barbarian and Monk', () => {
    const barbarianBase: CharacterBase = {
      id: 'barb_1',
      nombre: 'Krag',
      jugador: 'Player',
      nivel: 1,
      clase: 'barbaro',
      subclase: null,
      especie: 'humano',
      linaje: null,
      trasfondo: 'soldado',
      alineamiento: 'Caótico Bueno',
      puntos_experiencia: 0,
      caracteristicas_base: {
        fuerza: 16,
        destreza: 14,
        constitucion: 16,
        inteligencia: 8,
        sabiduria: 12,
        carisma: 10
      },
      aumentos_caracteristica: {},
      competencias: { habilidades: [], salvaciones: [], armas: [], armaduras: [], herramientas: [] },
      pericias: [],
      dotes: [],
      rasgos: [],
      maestrias_armas: [],
      conjuros_conocidos: [],
      conjuros_preparados: [],
      monedas: { pc: 0, pp: 0, pe: 0, po: 10, ppt: 0 },
      notas: '',
      dado_golpe_tipo: 12,
      creado_en: new Date().toISOString(),
      actualizado_en: new Date().toISOString()
    };

    const emptyState: CharacterState = {
      puntos_golpe_actuales: 15,
      puntos_golpe_temporales: 0,
      puntos_golpe_maximos_ajuste: 0,
      dados_golpe_gastados: 0,
      salvaciones_muerte: { exitos: 0, fallos: 0 },
      inspiracion_heroica: false,
      condiciones: [],
      recursos: {},
      espacios_conjuro: {},
      concentracion: null,
      inventario: [],
      equipamiento: { armadura: null, escudo: null, arma_principal: null, arma_secundaria: null }
    };

    const mods = {
      fuerza: 3,
      destreza: 2,
      constitucion: 3,
      inteligencia: -1,
      sabiduria: 1,
      carisma: 0
    };

    // Barbarian AC: 10 + 2 (DEX) + 3 (CON) = 15
    const barbAC = calculateArmorClassDetailed(barbarianBase, emptyState, mods);
    expect(barbAC.ac).toBe(15);

    // Monk AC: 10 + 2 (DEX) + 1 (WIS) = 13
    const monkBase = { ...barbarianBase, clase: 'monje' };
    const monkAC = calculateArmorClassDetailed(monkBase, emptyState, mods);
    expect(monkAC.ac).toBe(13);
  });

  it('recalculates full derived character without mutating input', () => {
    const base: CharacterBase = {
      id: 'wizard_1',
      nombre: 'Elminster',
      jugador: 'Master',
      nivel: 3,
      clase: 'mago',
      subclase: 'evocacion',
      especie: 'humano',
      linaje: null,
      trasfondo: 'erudito',
      alineamiento: 'Neutral Bueno',
      puntos_experiencia: 900,
      caracteristicas_base: {
        fuerza: 8,
        destreza: 14,
        constitucion: 14,
        inteligencia: 16,
        sabiduria: 12,
        carisma: 10
      },
      aumentos_caracteristica: {},
      competencias: {
        habilidades: ['arcano', 'historia', 'investigacion'],
        salvaciones: ['inteligencia', 'sabiduria'],
        armas: [],
        armaduras: [],
        herramientas: []
      },
      pericias: ['arcano'],
      dotes: [],
      rasgos: [],
      maestrias_armas: [],
      conjuros_conocidos: [],
      conjuros_preparados: [],
      monedas: { pc: 0, pp: 0, pe: 0, po: 50, ppt: 0 },
      notas: '',
      dado_golpe_tipo: 6,
      creado_en: new Date().toISOString(),
      actualizado_en: new Date().toISOString()
    };

    const estado: CharacterState = {
      puntos_golpe_actuales: 20,
      puntos_golpe_temporales: 0,
      puntos_golpe_maximos_ajuste: 0,
      dados_golpe_gastados: 0,
      salvaciones_muerte: { exitos: 0, fallos: 0 },
      inspiracion_heroica: true,
      condiciones: [],
      recursos: {},
      espacios_conjuro: { nivel1: { total: 4, gastados: 1 }, nivel2: { total: 2, gastados: 0 } },
      concentracion: null,
      inventario: [],
      equipamiento: { armadura: null, escudo: null, arma_principal: null, arma_secundaria: null }
    };

    const calculated = recalculateCharacter(base, estado);

    expect(calculated.bonificador_competencia).toBe(2);
    expect(calculated.modificadores.inteligencia).toBe(3);
    // Expertise in arcano: +3 INT + (2 PB * 2) = +7
    expect(calculated.habilidades.arcano.total).toBe(7);
    expect(calculated.habilidades.arcano.pericia).toBe(true);
    // Spell save DC: 8 + 2 PB + 3 INT = 13
    expect(calculated.cd_salvacion_conjuros).toBe(13);
    // Spell attack bonus: 2 PB + 3 INT = 5
    expect(calculated.bono_ataque_conjuros).toBe(5);
  });
});
