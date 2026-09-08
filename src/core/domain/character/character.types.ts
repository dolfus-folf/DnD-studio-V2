export type StatKey =
  | 'fuerza'
  | 'destreza'
  | 'constitucion'
  | 'inteligencia'
  | 'sabiduria'
  | 'carisma';

export interface AbilityScores {
  fuerza: number;
  destreza: number;
  constitucion: number;
  inteligencia: number;
  sabiduria: number;
  carisma: number;
}

export type StatModifiers = Record<StatKey, number>;

export interface Currency {
  pc: number;
  pp: number;
  pe: number;
  po: number;
  ppt: number;
}

export type ConditionType =
  | 'cegado'
  | 'hechizado'
  | 'ensordecido'
  | 'asustado'
  | 'agarrado'
  | 'incapacitado'
  | 'invisible'
  | 'paralizado'
  | 'petrificado'
  | 'envenenado'
  | 'derribado'
  | 'restringido'
  | 'aturdido'
  | 'inconsciente'
  | 'agotamiento_1'
  | 'agotamiento_2'
  | 'agotamiento_3'
  | 'agotamiento_4'
  | 'agotamiento_5'
  | 'agotamiento_6';

export interface InventoryItemInstance {
  id: string;
  objeto_id: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  equipado: boolean;
  peso_kg: number;
  propiedades?: string[];
  notas?: string;
}

export interface EquipmentSlots {
  armadura: string | null;
  escudo: string | null;
  arma_principal: string | null;
  arma_secundaria: string | null;
  cabeza?: string | null;
  capa?: string | null;
  anillo_1?: string | null;
  anillo_2?: string | null;
}

/**
 * BASE: Datos estructurales y permanentes del personaje.
 * No cambian frecuentemente durante el combate o la sesión.
 */
export interface CharacterBase {
  id: string;
  nombre: string;
  jugador: string;
  nivel: number;
  clase: string;
  subclase: string | null;
  especie: string;
  linaje: string | null;
  trasfondo: string;
  alineamiento: string;
  puntos_experiencia: number;

  caracteristicas_base: AbilityScores;
  aumentos_caracteristica: Partial<Record<StatKey, number>>;

  competencias: {
    habilidades: string[];
    salvaciones: string[];
    armas: string[];
    armaduras: string[];
    herramientas: string[];
    idiomas?: string[];
  };
  pericias: string[]; // Expertise (doble bonificador de competencia)

  dotes: string[];
  rasgos: string[];
  maestrias_armas: string[];

  conjuros_conocidos: string[];
  conjuros_preparados: string[];

  monedas: Currency;
  notas: string;
  dado_golpe_tipo: number; // e.g. 8 for 1d8, 12 for 1d12
  creado_en: string;
  actualizado_en: string;
}

/**
 * ESTADO: Datos volátiles que cambian en tiempo real durante la partida.
 */
export interface CharacterState {
  puntos_golpe_actuales: number;
  puntos_golpe_temporales: number;
  puntos_golpe_maximos_ajuste: number; // Modificaciones mágicas al máximo
  dados_golpe_gastados: number;

  salvaciones_muerte: {
    exitos: number;
    fallos: number;
  };

  inspiracion_heroica: boolean;
  condiciones: ConditionType[];

  recursos: Record<
    string,
    {
      actual: number;
      maximo: number;
      origen?: string;
      recuperacion?: 'descanso_corto' | 'descanso_largo' | 'especial';
    }
  >;

  espacios_conjuro: Record<
    string,
    {
      total: number;
      gastados: number;
    }
  >;

  concentracion: {
    conjuro_id: string;
    nombre: string;
    iniciado_en: string;
  } | null;

  inventario: InventoryItemInstance[];
  equipamiento: EquipmentSlots;
}

/**
 * CALCULADO: Valores derivados del motor de reglas recalculables en cualquier momento.
 * No deben persistirse en bases de datos para evitar redundancias desincronizadas.
 */
export interface CharacterCalculated {
  caracteristicas_finales: AbilityScores;
  modificadores: StatModifiers;
  bonificador_competencia: number;

  puntos_golpe_maximos: number;
  clase_armadura: number;
  clase_armadura_desglose: string;

  iniciativa: number;
  velocidad: number;

  percepcion_pasiva: number;
  investigacion_pasiva: number;
  perspicacia_pasiva: number;

  salvaciones: Record<
    StatKey,
    {
      total: number;
      modificador_caracteristica: number;
      competente: boolean;
    }
  >;

  habilidades: Record<
    string,
    {
      nombre: string;
      caracteristica: StatKey;
      total: number;
      competente: boolean;
      pericia: boolean;
    }
  >;

  cd_salvacion_conjuros: number;
  bono_ataque_conjuros: number;

  capacidad_carga_kg: number;
  peso_inventario_kg: number;
  sobrecargado: boolean;
}

/**
 * HISTORIAL: Registro auditable de eventos relevantes ocurridos en el personaje.
 */
export interface CharacterEventLog {
  id: string;
  timestamp: string;
  tipo:
    | 'creacion'
    | 'dano'
    | 'curacion'
    | 'recurso'
    | 'nivel'
    | 'equipo'
    | 'condicion'
    | 'descanso'
    | 'nota';
  descripcion: string;
  detalle?: Record<string, any>;
}

/**
 * MODELO INTEGRAL DEL PERSONAJE D&D 2024
 * Respeta la separación estricta: base, estado, calculado, historial.
 */
export interface DND2024Character {
  id: string;
  base: CharacterBase;
  estado: CharacterState;
  calculado: CharacterCalculated;
  historial: CharacterEventLog[];
}
