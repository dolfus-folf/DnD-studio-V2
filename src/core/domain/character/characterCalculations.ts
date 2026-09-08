import {
  AbilityScores,
  CharacterBase,
  CharacterCalculated,
  CharacterState,
  StatKey,
  StatModifiers
} from './character.types';

export const SKILL_ABILITY_MAP: Record<string, StatKey> = {
  acrobacias: 'destreza',
  atletismo: 'fuerza',
  arcano: 'inteligencia',
  historia: 'inteligencia',
  investigacion: 'inteligencia',
  naturaleza: 'inteligencia',
  religion: 'inteligencia',
  trato_con_animales: 'sabiduria',
  perspicacia: 'sabiduria',
  medicina: 'sabiduria',
  percepcion: 'sabiduria',
  supervivencia: 'sabiduria',
  engano: 'carisma',
  intimidacion: 'carisma',
  interpretacion: 'carisma',
  persuasion: 'carisma',
  juego_de_manos: 'destreza',
  sigilo: 'destreza'
};

export const SKILL_NAMES_ES: Record<string, string> = {
  acrobacias: 'Acrobacias',
  atletismo: 'Atletismo',
  arcano: 'Arcano',
  historia: 'Historia',
  investigacion: 'Investigación',
  naturaleza: 'Naturaleza',
  religion: 'Religión',
  trato_con_animales: 'Trato con animales',
  perspicacia: 'Perspicacia',
  medicina: 'Medicina',
  percepcion: 'Percepción',
  supervivencia: 'Supervivencia',
  engano: 'Engaño',
  intimidacion: 'Intimidación',
  interpretacion: 'Interpretación',
  persuasion: 'Persuasión',
  juego_de_manos: 'Juego de manos',
  sigilo: 'Sigilo'
};

export const CLASS_PRIMARY_SPELL_STAT: Record<string, StatKey> = {
  bardo: 'carisma',
  clerigo: 'sabiduria',
  druida: 'sabiduria',
  hechicero: 'carisma',
  mago: 'inteligencia',
  paladin: 'carisma',
  explorador: 'sabiduria',
  brujo: 'carisma'
};

/**
 * Calcula el modificador D&D oficial: floor((puntuación - 10) / 2)
 */
export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/**
 * Bonificador de competencia según nivel (D&D 2024):
 * Nivel 1-4: +2, 5-8: +3, 9-12: +4, 13-16: +5, 17-20: +6
 */
export function calculateProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

/**
 * Calcula los Puntos de Golpe Máximos:
 * Nivel 1: Dado completo + CON mod
 * Niveles superiores: Promedio ((dado / 2) + 1) + CON mod
 * Dote Dureza (Tough): +2 PG por nivel
 */
export function calculateBaseMaxHP(
  hitDie: number,
  level: number,
  conModifier: number,
  hasToughFeat: boolean = false
): number {
  const lvl1 = Math.max(1, hitDie + conModifier);
  if (level <= 1) {
    return lvl1 + (hasToughFeat ? 2 : 0);
  }

  const avgDie = Math.floor(hitDie / 2) + 1;
  const subsequent = (level - 1) * Math.max(1, avgDie + conModifier);
  const toughBonus = hasToughFeat ? level * 2 : 0;

  return lvl1 + subsequent + toughBonus;
}

/**
 * Calcula la Clase de Armadura (CA) y el desglose de su fórmula.
 */
export function calculateArmorClassDetailed(
  base: CharacterBase,
  estado: CharacterState,
  mods: StatModifiers
): { ac: number; desglose: string } {
  const dexMod = mods.destreza;
  const conMod = mods.constitucion;
  const wisMod = mods.sabiduria;

  const equippedItems = estado.inventario.filter((item) => item.equipado);
  const equippedArmor = equippedItems.find((item) => item.categoria === 'armaduras');
  const equippedShield = equippedItems.find((item) => item.categoria === 'escudo');

  const shieldBonus = equippedShield ? 2 : 0;

  // Si viste armadura
  if (equippedArmor) {
    const armorProp = equippedArmor.propiedades || [];
    const isHeavy = armorProp.includes('pesada');
    const isMedium = armorProp.includes('media');

    let baseAC = 11;
    let dexContr = dexMod;

    if (isHeavy) {
      baseAC = 14; // Default pesada mínima (Cota de mallas o bandas)
      dexContr = 0;
    } else if (isMedium) {
      baseAC = 12; // Default media (Cuero tachonado / Malla de escamas)
      dexContr = Math.min(dexMod, 2);
    } else {
      // Ligera
      baseAC = 11;
      dexContr = dexMod;
    }

    const total = baseAC + dexContr + shieldBonus;
    return {
      ac: total,
      desglose: `${baseAC} (${equippedArmor.nombre}) ${dexContr ? `+ ${dexContr} (DES)` : ''} ${shieldBonus ? `+ ${shieldBonus} (Escudo)` : ''}`.trim()
    };
  }

  // Defensa sin armadura (Bárbaro: 10 + DES + CON, permite escudo)
  if (base.clase.toLowerCase() === 'barbaro') {
    const total = 10 + dexMod + conMod + shieldBonus;
    return {
      ac: total,
      desglose: `10 + ${dexMod} (DES) + ${conMod} (CON)${shieldBonus ? ` + ${shieldBonus} (Escudo)` : ''}`
    };
  }

  // Defensa sin armadura (Monje: 10 + DES + SAB, NO permite escudo)
  if (base.clase.toLowerCase() === 'monje' && !equippedShield) {
    const total = 10 + dexMod + wisMod;
    return {
      ac: total,
      desglose: `10 + ${dexMod} (DES) + ${wisMod} (SAB)`
    };
  }

  // Defensa base estándar: 10 + DES (+ Escudo si aplica)
  const total = 10 + dexMod + shieldBonus;
  return {
    ac: total,
    desglose: `10 + ${dexMod} (DES)${shieldBonus ? ` + ${shieldBonus} (Escudo)` : ''}`
  };
}

/**
 * RECALCULA TODO EL ESTADO DERIVADO DEL PERSONAJE
 * Función pura: no muta la base ni el estado, retorna un nuevo objeto CharacterCalculated.
 */
export function recalculateCharacter(
  base: CharacterBase,
  estado: CharacterState
): CharacterCalculated {
  // 1. Puntuaciones y Modificadores finales
  const caracteristicas_finales: AbilityScores = {
    fuerza: base.caracteristicas_base.fuerza + (base.aumentos_caracteristica.fuerza || 0),
    destreza: base.caracteristicas_base.destreza + (base.aumentos_caracteristica.destreza || 0),
    constitucion:
      base.caracteristicas_base.constitucion + (base.aumentos_caracteristica.constitucion || 0),
    inteligencia:
      base.caracteristicas_base.inteligencia + (base.aumentos_caracteristica.inteligencia || 0),
    sabiduria:
      base.caracteristicas_base.sabiduria + (base.aumentos_caracteristica.sabiduria || 0),
    carisma: base.caracteristicas_base.carisma + (base.aumentos_caracteristica.carisma || 0)
  };

  const modificadores: StatModifiers = {
    fuerza: calculateModifier(caracteristicas_finales.fuerza),
    destreza: calculateModifier(caracteristicas_finales.destreza),
    constitucion: calculateModifier(caracteristicas_finales.constitucion),
    inteligencia: calculateModifier(caracteristicas_finales.inteligencia),
    sabiduria: calculateModifier(caracteristicas_finales.sabiduria),
    carisma: calculateModifier(caracteristicas_finales.carisma)
  };

  // 2. Bonificador de Competencia
  const pb = calculateProficiencyBonus(base.nivel);

  // 3. Puntos de golpe máximos
  const hasTough = base.dotes.some((d) => d.toLowerCase().includes('dureza') || d.toLowerCase().includes('tough'));
  const baseHP = calculateBaseMaxHP(base.dado_golpe_tipo, base.nivel, modificadores.constitucion, hasTough);
  const puntos_golpe_maximos = Math.max(1, baseHP + estado.puntos_golpe_maximos_ajuste);

  // 4. Clase de Armadura
  const { ac, desglose: clase_armadura_desglose } = calculateArmorClassDetailed(
    base,
    estado,
    modificadores
  );

  // 5. Salvaciones
  const salvaciones = (
    [
      'fuerza',
      'destreza',
      'constitucion',
      'inteligencia',
      'sabiduria',
      'carisma'
    ] as StatKey[]
  ).reduce(
    (acc, stat) => {
      const isProf = base.competencias.salvaciones.includes(stat);
      const mod = modificadores[stat];
      acc[stat] = {
        total: mod + (isProf ? pb : 0),
        modificador_caracteristica: mod,
        competente: isProf
      };
      return acc;
    },
    {} as CharacterCalculated['salvaciones']
  );

  // 6. Habilidades
  const habilidades = Object.entries(SKILL_ABILITY_MAP).reduce(
    (acc, [skillKey, statKey]) => {
      const isProf = base.competencias.habilidades.includes(skillKey);
      const isExpert = base.pericias.includes(skillKey);
      const mod = modificadores[statKey];

      let bonus = mod;
      if (isExpert) {
        bonus += pb * 2;
      } else if (isProf) {
        bonus += pb;
      }

      acc[skillKey] = {
        nombre: SKILL_NAMES_ES[skillKey] || skillKey,
        caracteristica: statKey,
        total: bonus,
        competente: isProf,
        pericia: isExpert
      };
      return acc;
    },
    {} as CharacterCalculated['habilidades']
  );

  // 7. Percepción, Investigación y Perspicacia pasivas
  const percepcion_pasiva = 10 + (habilidades.percepcion?.total ?? modificadores.sabiduria);
  const investigacion_pasiva =
    10 + (habilidades.investigacion?.total ?? modificadores.inteligencia);
  const perspicacia_pasiva = 10 + (habilidades.perspicacia?.total ?? modificadores.sabiduria);

  // 8. Iniciativa y Velocidad
  const iniciativa = modificadores.destreza;
  const velocidad = 9; // 9 metros / 30 pies estándar

  // 9. Aptitud de Conjuros
  const spellStat = CLASS_PRIMARY_SPELL_STAT[base.clase.toLowerCase()] || 'inteligencia';
  const spellMod = modificadores[spellStat];
  const cd_salvacion_conjuros = 8 + pb + spellMod;
  const bono_ataque_conjuros = pb + spellMod;

  // 10. Capacidad de Carga y Peso Inventario
  const capacidad_carga_kg = Math.round(caracteristicas_finales.fuerza * 7.5 * 10) / 10;
  const peso_inventario_kg = Math.round(
    estado.inventario.reduce((acc, item) => acc + (item.peso_kg || 0) * (item.cantidad || 1), 0) *
      10
  ) / 10;
  const sobrecargado = peso_inventario_kg > capacidad_carga_kg;

  return {
    caracteristicas_finales,
    modificadores,
    bonificador_competencia: pb,
    puntos_golpe_maximos,
    clase_armadura: ac,
    clase_armadura_desglose,
    iniciativa,
    velocidad,
    percepcion_pasiva,
    investigacion_pasiva,
    perspicacia_pasiva,
    salvaciones,
    habilidades,
    cd_salvacion_conjuros,
    bono_ataque_conjuros,
    capacidad_carga_kg,
    peso_inventario_kg,
    sobrecargado
  };
}
