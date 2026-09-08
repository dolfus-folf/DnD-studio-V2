import { Character, AbilityScores } from '../types';
import { DND_CLASSES } from '../data/dndClasses';
import { DND_SPECIES } from '../data/dndSpecies';
import { DND_BACKGROUNDS } from '../data/dndBackgrounds';
import { DND_EQUIPMENT_CATALOG } from '../data/dndEquipment';

export const SKILL_ABILITY_MAP: Record<string, keyof AbilityScores> = {
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

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function getProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

export function calculateMaxHP(
  hitDie: number,
  level: number,
  conScore: number,
  hasToughFeat: boolean = false
): number {
  const conMod = calculateModifier(conScore);
  // Level 1: max hit die + CON
  const lvl1HP = Math.max(1, hitDie + conMod);
  if (level === 1) return lvl1HP + (hasToughFeat ? 2 : 0);

  // Subsequent levels: average (die/2 + 1) + CON
  const avgDie = Math.floor(hitDie / 2) + 1;
  const subsequentHP = (level - 1) * Math.max(1, avgDie + conMod);
  const toughBonus = hasToughFeat ? level * 2 : 0;
  return lvl1HP + subsequentHP + toughBonus;
}

export function calculateArmorClass(character: Character): {
  ac: number;
  breakdown: string;
} {
  const dexMod = calculateModifier(character.caracteristicas.destreza);
  const conMod = calculateModifier(character.caracteristicas.constitucion);
  const wisMod = calculateModifier(character.caracteristicas.sabiduria);

  const equippedArmor = character.equipo.find(
    (item) => item.equipado && item.item.categoria === 'armaduras'
  );
  const equippedShield = character.equipo.find(
    (item) => item.equipado && item.item.categoria === 'escudo'
  );

  const shieldBonus = equippedShield ? (equippedShield.item.escudo?.bonificador_ca || 2) : 0;

  if (equippedArmor && equippedArmor.item.armadura) {
    const arm = equippedArmor.item.armadura;
    let base = arm.clase_armadura.base;
    let dexContr = 0;

    if (arm.categoria === 'ligera') {
      dexContr = dexMod;
    } else if (arm.categoria === 'media') {
      dexContr = Math.min(dexMod, arm.clase_armadura.limite_destreza ?? 2);
    } // pesada gets 0 dex

    const total = base + dexContr + shieldBonus;
    return {
      ac: total,
      breakdown: `${arm.clase_armadura.base} (${equippedArmor.item.nombre}) ${dexContr ? `+ ${dexContr} (DES)` : ''} ${shieldBonus ? `+ ${shieldBonus} (Escudo)` : ''}`
    };
  }

  // Unarmored
  if (character.clase === 'barbaro') {
    const total = 10 + dexMod + conMod + shieldBonus;
    return {
      ac: total,
      breakdown: `10 + ${dexMod} (DES) + ${conMod} (CON)${shieldBonus ? ` + ${shieldBonus} (Escudo)` : ''}`
    };
  }

  if (character.clase === 'monje' && !equippedShield) {
    const total = 10 + dexMod + wisMod;
    return {
      ac: total,
      breakdown: `10 + ${dexMod} (DES) + ${wisMod} (SAB)`
    };
  }

  const total = 10 + dexMod + shieldBonus;
  return {
    ac: total,
    breakdown: `10 + ${dexMod} (DES)${shieldBonus ? ` + ${shieldBonus} (Escudo)` : ''}`
  };
}

export function calculateCarryingCapacity(fuerza: number): {
  capacidadKg: number;
  pesoActualKg: number;
  sobrecargado: boolean;
} {
  const capacidadKg = Math.round(fuerza * 7.5 * 10) / 10;
  return { capacidadKg, pesoActualKg: 0, sobrecargado: false };
}

export function parseHitDieNumber(dieStr?: string): number {
  if (!dieStr) return 8;
  const match = dieStr.match(/(\d+)$/);
  return match ? parseInt(match[1], 10) : 8;
}

export function createNewDefaultCharacter(): Character {
  const defaultClass = DND_CLASSES[0]; // Barbaro
  const defaultSpecies = DND_SPECIES[0]; // Humano
  const defaultBackground = DND_BACKGROUNDS[13]; // Soldado

  const initialScores: AbilityScores = {
    fuerza: 15 + 2, // 17
    destreza: 14,
    constitucion: 13 + 1, // 14
    inteligencia: 10,
    sabiduria: 12,
    carisma: 8
  };

  const hitDie = parseHitDieNumber(defaultClass.atributos_basicos?.dado_puntos_golpe || '1d12');
  const maxHP = calculateMaxHP(hitDie, 1, initialScores.constitucion);

  // Starter equipment from Soldier and Barbarian
  const starterWeapons = [
    { item: DND_EQUIPMENT_CATALOG.find((e) => e.id === 'hacha_a_dos_manos')!, cantidad: 1, equipado: true },
    { item: DND_EQUIPMENT_CATALOG.find((e) => e.id === 'jabalina')!, cantidad: 4, equipado: true }
  ];

  const saves = defaultClass.atributos_basicos?.salvaciones || ['fuerza', 'constitucion'];

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    nombre: 'Valtor Martillo de Hierro',
    nivel: 1,
    clase: 'barbaro',
    subclase: null,
    especie: 'humano',
    linaje: null,
    trasfondo: 'soldado',
    alineamiento: 'Caótico Bueno',
    puntos_experiencia: 0,
    inspiracion_heroica: false,
    caracteristicas: initialScores,
    puntos_de_golpe: {
      actuales: maxHP,
      maximos: maxHP,
      temporales: 0
    },
    dados_de_golpe: {
      total: 1,
      gastados: 0,
      tipo_dado: hitDie
    },
    salvaciones_competentes: [...saves],
    habilidades_competentes: ['atletismo', 'intimidacion', 'percepcion', 'supervivencia'],
    habilidades_pericia: [],
    dotes: ['atacantesalvaje', 'habilidoso'],
    rasgos: [
      'Furia (2/descanso largo)',
      'Defensa sin armadura',
      'Maestría en armas (Hacha a dos manos: Hender, Jabalina: Ralentizar)',
      'Ingenioso (Humano: Inspiración heroica diaria)',
      'Versátil (Dote de origen extra)'
    ],
    maestrias_armas: ['hacha_a_dos_manos', 'jabalina'],
    equipo: starterWeapons,
    monedas: {
      pc: 0,
      pp: 0,
      pe: 0,
      po: 14,
      ppt: 0
    },
    espacios_conjuro: {
      nivel1: { total: 0, gastados: 0 },
      nivel2: { total: 0, gastados: 0 },
      nivel3: { total: 0, gastados: 0 },
      nivel4: { total: 0, gastados: 0 },
      nivel5: { total: 0, gastados: 0 },
      nivel6: { total: 0, gastados: 0 },
      nivel7: { total: 0, gastados: 0 },
      nivel8: { total: 0, gastados: 0 },
      nivel9: { total: 0, gastados: 0 }
    },
    conjuros_conocidos: [],
    conjuros_preparados: [],
    notas: 'Soldado veterano de las Guerras Fronterizas. Busca gloria y redención con su fiel hacha de guerra.',
    creado_en: new Date().toISOString(),
    actualizado_en: new Date().toISOString()
  };
}
