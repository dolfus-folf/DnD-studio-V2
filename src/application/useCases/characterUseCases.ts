import {
  ConditionType,
  DND2024Character,
  EquipmentSlots,
  InventoryItemInstance
} from '../../core/domain/character/character.types';
import { recalculateCharacter } from '../../core/domain/character/characterCalculations';

/**
 * CASO DE USO: Recibir daño (D&D 2024)
 * 1. Absorbe primero los puntos de golpe temporales.
 * 2. El daño restante reduce los puntos de golpe actuales.
 * 3. Si llega a 0, queda a 0 (no números negativos), se activa 'inconsciente' y se resetean salvaciones contra la muerte.
 */
export function applyDamageUseCase(
  character: DND2024Character,
  damageAmount: number,
  tipoDano: string = 'general'
): DND2024Character {
  const amount = Math.max(0, Math.floor(damageAmount));
  if (amount === 0) return character;

  let remainingDamage = amount;
  let newTempHP = character.estado.puntos_golpe_temporales;
  let newCurrentHP = character.estado.puntos_golpe_actuales;

  if (newTempHP > 0) {
    if (remainingDamage >= newTempHP) {
      remainingDamage -= newTempHP;
      newTempHP = 0;
    } else {
      newTempHP -= remainingDamage;
      remainingDamage = 0;
    }
  }

  if (remainingDamage > 0) {
    newCurrentHP = Math.max(0, newCurrentHP - remainingDamage);
  }

  const conditions = [...character.estado.condiciones];
  let deathSaves = { ...character.estado.salvaciones_muerte };

  if (newCurrentHP === 0 && !conditions.includes('inconsciente')) {
    conditions.push('inconsciente');
    deathSaves = { exitos: 0, fallos: 0 };
  }

  const newEstado = {
    ...character.estado,
    puntos_golpe_temporales: newTempHP,
    puntos_golpe_actuales: newCurrentHP,
    condiciones: conditions,
    salvaciones_muerte: deathSaves
  };

  const newCalculated = recalculateCharacter(character.base, newEstado);

  const newLog = [
    {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      tipo: 'dano' as const,
      descripcion: `Recibió ${amount} de daño (${tipoDano}). PG actuales: ${newCurrentHP} / ${newCalculated.puntos_golpe_maximos}.`,
      detalle: { cantidad: amount, tipo: tipoDano, tempHpRestantes: newTempHP }
    },
    ...character.historial
  ];

  return {
    ...character,
    estado: newEstado,
    calculado: newCalculated,
    historial: newLog
  };
}

/**
 * CASO DE USO: Curar puntos de golpe
 * 1. Incrementa los PG actuales sin superar el máximo calculado.
 * 2. Si estaba a 0 PG, resetea salvaciones contra la muerte y retira inconsciencia.
 */
export function healCharacterUseCase(
  character: DND2024Character,
  healAmount: number
): DND2024Character {
  const amount = Math.max(0, Math.floor(healAmount));
  if (amount === 0) return character;

  const maxHP = character.calculado.puntos_golpe_maximos;
  const wasAtZero = character.estado.puntos_golpe_actuales === 0;
  const newCurrentHP = Math.min(maxHP, character.estado.puntos_golpe_actuales + amount);

  let conditions = [...character.estado.condiciones];
  let deathSaves = { ...character.estado.salvaciones_muerte };

  if (wasAtZero && newCurrentHP > 0) {
    conditions = conditions.filter((c) => c !== 'inconsciente');
    deathSaves = { exitos: 0, fallos: 0 };
  }

  const newEstado = {
    ...character.estado,
    puntos_golpe_actuales: newCurrentHP,
    condiciones: conditions,
    salvaciones_muerte: deathSaves
  };

  const newCalculated = recalculateCharacter(character.base, newEstado);

  const newLog = [
    {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      tipo: 'curacion' as const,
      descripcion: `Recuperó ${amount} PG. PG actuales: ${newCurrentHP} / ${maxHP}.`,
      detalle: { curacion: amount }
    },
    ...character.historial
  ];

  return {
    ...character,
    estado: newEstado,
    calculado: newCalculated,
    historial: newLog
  };
}

/**
 * CASO DE USO: Establecer Puntos de Golpe Temporales
 * En D&D 2024 no se acumulan: se elige conservar o reemplazar.
 */
export function setTempHPUseCase(
  character: DND2024Character,
  tempHP: number
): DND2024Character {
  const amount = Math.max(0, Math.floor(tempHP));
  const newEstado = {
    ...character.estado,
    puntos_golpe_temporales: amount
  };
  const newCalculated = recalculateCharacter(character.base, newEstado);

  return {
    ...character,
    estado: newEstado,
    calculado: newCalculated,
    historial: [
      {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        timestamp: new Date().toISOString(),
        tipo: 'curacion' as const,
        descripcion: `Puntos de golpe temporales fijados en ${amount}.`
      },
      ...character.historial
    ]
  };
}

/**
 * CASO DE USO: Gastar o recuperar recurso de personaje
 */
export function modifyResourceUseCase(
  character: DND2024Character,
  resourceKey: string,
  delta: number
): DND2024Character {
  const currentResource = character.estado.recursos[resourceKey];
  if (!currentResource) return character;

  const newActual = Math.max(0, Math.min(currentResource.maximo, currentResource.actual + delta));
  const newEstado = {
    ...character.estado,
    recursos: {
      ...character.estado.recursos,
      [resourceKey]: {
        ...currentResource,
        actual: newActual
      }
    }
  };

  return {
    ...character,
    estado: newEstado,
    calculado: recalculateCharacter(character.base, newEstado)
  };
}

/**
 * CASO DE USO: Gastar o recuperar espacio de conjuro
 */
export function modifySpellSlotUseCase(
  character: DND2024Character,
  slotLevelKey: string, // e.g. 'nivel1'
  deltaSpent: number
): DND2024Character {
  const currentSlot = character.estado.espacios_conjuro[slotLevelKey];
  if (!currentSlot) return character;

  const newGastados = Math.max(0, Math.min(currentSlot.total, currentSlot.gastados + deltaSpent));
  const newEstado = {
    ...character.estado,
    espacios_conjuro: {
      ...character.estado.espacios_conjuro,
      [slotLevelKey]: {
        ...currentSlot,
        gastados: newGastados
      }
    }
  };

  return {
    ...character,
    estado: newEstado,
    calculado: recalculateCharacter(character.base, newEstado)
  };
}

/**
 * CASO DE USO: Equipar objeto en inventario
 */
export function equipItemUseCase(
  character: DND2024Character,
  instanceId: string,
  slot: keyof EquipmentSlots
): DND2024Character {
  const targetItem = character.estado.inventario.find((i) => i.id === instanceId);
  if (!targetItem) return character;

  // Desequipar cualquier item previo en ese slot
  const currentSlotItemId = character.estado.equipamiento[slot];

  const updatedInventory = character.estado.inventario.map((item) => {
    if (item.id === instanceId) {
      return { ...item, equipado: true };
    }
    if (currentSlotItemId && item.id === currentSlotItemId) {
      return { ...item, equipado: false };
    }
    return item;
  });

  const updatedSlots: EquipmentSlots = {
    ...character.estado.equipamiento,
    [slot]: instanceId
  };

  const newEstado = {
    ...character.estado,
    inventario: updatedInventory,
    equipamiento: updatedSlots
  };

  const newCalculated = recalculateCharacter(character.base, newEstado);

  return {
    ...character,
    estado: newEstado,
    calculado: newCalculated,
    historial: [
      {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        timestamp: new Date().toISOString(),
        tipo: 'equipo' as const,
        descripcion: `Equipó ${targetItem.nombre} en ${slot}. Nueva CA: ${newCalculated.clase_armadura}.`
      },
      ...character.historial
    ]
  };
}

/**
 * CASO DE USO: Desequipar objeto
 */
export function unequipItemUseCase(
  character: DND2024Character,
  instanceId: string
): DND2024Character {
  const targetItem = character.estado.inventario.find((i) => i.id === instanceId);
  if (!targetItem) return character;

  const updatedInventory = character.estado.inventario.map((item) =>
    item.id === instanceId ? { ...item, equipado: false } : item
  );

  const updatedSlots = { ...character.estado.equipamiento };
  (Object.keys(updatedSlots) as Array<keyof EquipmentSlots>).forEach((slotKey) => {
    if (updatedSlots[slotKey] === instanceId) {
      updatedSlots[slotKey] = null;
    }
  });

  const newEstado = {
    ...character.estado,
    inventario: updatedInventory,
    equipamiento: updatedSlots
  };

  const newCalculated = recalculateCharacter(character.base, newEstado);

  return {
    ...character,
    estado: newEstado,
    calculado: newCalculated,
    historial: [
      {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        timestamp: new Date().toISOString(),
        tipo: 'equipo' as const,
        descripcion: `Desequipó ${targetItem.nombre}. Nueva CA: ${newCalculated.clase_armadura}.`
      },
      ...character.historial
    ]
  };
}

/**
 * CASO DE USO: Aplicar condición D&D 2024
 */
export function applyConditionUseCase(
  character: DND2024Character,
  condition: ConditionType
): DND2024Character {
  if (character.estado.condiciones.includes(condition)) return character;

  const newEstado = {
    ...character.estado,
    condiciones: [...character.estado.condiciones, condition]
  };

  return {
    ...character,
    estado: newEstado,
    calculado: recalculateCharacter(character.base, newEstado),
    historial: [
      {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        timestamp: new Date().toISOString(),
        tipo: 'condicion' as const,
        descripcion: `Adquirió estado: ${condition}.`
      },
      ...character.historial
    ]
  };
}

/**
 * CASO DE USO: Remover condición
 */
export function removeConditionUseCase(
  character: DND2024Character,
  condition: ConditionType
): DND2024Character {
  if (!character.estado.condiciones.includes(condition)) return character;

  const newEstado = {
    ...character.estado,
    condiciones: character.estado.condiciones.filter((c) => c !== condition)
  };

  return {
    ...character,
    estado: newEstado,
    calculado: recalculateCharacter(character.base, newEstado),
    historial: [
      {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        timestamp: new Date().toISOString(),
        tipo: 'condicion' as const,
        descripcion: `Se liberó del estado: ${condition}.`
      },
      ...character.historial
    ]
  };
}

/**
 * CASO DE USO: Descanso Largo (D&D 2024)
 * - Restaura todos los PG al máximo.
 * - Elimina PG temporales.
 * - Restaura hasta la mitad de los dados de golpe totales (mínimo 1).
 * - Restaura todos los espacios de conjuro.
 * - Restaura recursos de descanso corto y largo.
 * - Reduce el agotamiento en 1 nivel si aplica.
 * - Resetea salvaciones contra la muerte.
 */
export function longRestUseCase(character: DND2024Character): DND2024Character {
  const maxHP = character.calculado.puntos_golpe_maximos;

  // Restaurar dados de golpe (mínimo 1, hasta total / 2)
  const totalDice = character.base.nivel;
  const diceToRecover = Math.max(1, Math.floor(totalDice / 2));
  const newDiceSpent = Math.max(0, character.estado.dados_golpe_gastados - diceToRecover);

  // Restaurar recursos
  const restoredResources = { ...character.estado.recursos };
  Object.keys(restoredResources).forEach((key) => {
    const res = restoredResources[key];
    if (res.recuperacion === 'descanso_corto' || res.recuperacion === 'descanso_largo') {
      restoredResources[key] = { ...res, actual: res.maximo };
    }
  });

  // Restaurar espacios de conjuro
  const restoredSpellSlots = { ...character.estado.espacios_conjuro };
  Object.keys(restoredSpellSlots).forEach((lvl) => {
    restoredSpellSlots[lvl] = { ...restoredSpellSlots[lvl], gastados: 0 };
  });

  // Manejar agotamiento (D&D 2024 reduce 1 nivel por descanso largo con comida)
  let conditions = character.estado.condiciones.filter((c) => !c.startsWith('agotamiento_'));
  const currentExhaustion = character.estado.condiciones.find((c) => c.startsWith('agotamiento_'));
  if (currentExhaustion) {
    const levelMatch = currentExhaustion.match(/\d+$/);
    if (levelMatch) {
      const currentLevel = parseInt(levelMatch[0], 10);
      if (currentLevel > 1) {
        conditions.push(`agotamiento_${currentLevel - 1}` as ConditionType);
      }
    }
  }

  // Quitar inconsciencia si estaba dormido
  conditions = conditions.filter((c) => c !== 'inconsciente');

  const newEstado = {
    ...character.estado,
    puntos_golpe_actuales: maxHP,
    puntos_golpe_temporales: 0,
    dados_golpe_gastados: newDiceSpent,
    salvaciones_muerte: { exitos: 0, fallos: 0 },
    recursos: restoredResources,
    espacios_conjuro: restoredSpellSlots,
    condiciones: conditions,
    concentracion: null
  };

  const newCalculated = recalculateCharacter(character.base, newEstado);

  return {
    ...character,
    estado: newEstado,
    calculado: newCalculated,
    historial: [
      {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        timestamp: new Date().toISOString(),
        tipo: 'descanso' as const,
        descripcion: `Completó un Descanso Largo. PG restaurados a ${maxHP}, espacios de conjuro y recursos recargados.`
      },
      ...character.historial
    ]
  };
}
