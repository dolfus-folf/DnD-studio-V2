export type StatKey = 'fuerza' | 'destreza' | 'constitucion' | 'inteligencia' | 'sabiduria' | 'carisma';

export interface AbilityScores {
  fuerza: number;
  destreza: number;
  constitucion: number;
  inteligencia: number;
  sabiduria: number;
  carisma: number;
}

export interface Character {
  id: string;
  nombre: string;
  nivel: number;
  clase: string;
  subclase?: string | null;
  especie: string;
  linaje?: string | null;
  trasfondo: string;
  alineamiento: string;
  puntos_experiencia: number;
  inspiracion_heroica: boolean;
  caracteristicas: AbilityScores;
  puntos_de_golpe: {
    actuales: number;
    maximos: number;
    temporales: number;
  };
  dados_de_golpe: {
    total: number;
    gastados: number;
    tipo_dado: number;
  };
  salvaciones_competentes: string[];
  habilidades_competentes: string[];
  habilidades_pericia: string[];
  dotes: string[];
  rasgos: string[];
  maestrias_armas: string[];
  equipo: Array<{
    item: EquipmentItemDefinition;
    cantidad: number;
    equipado: boolean;
  }>;
  monedas: {
    pc: number;
    pp: number;
    pe: number;
    po: number;
    ppt: number;
  };
  espacios_conjuro: Record<string, { total: number; gastados: number }>;
  conjuros_conocidos: string[];
  conjuros_preparados: string[];
  notas: string;
  creado_en: string;
  actualizado_en: string;
}

export interface StatModifiers {
  fuerza: number;
  destreza: number;
  constitucion: number;
  inteligencia: number;
  sabiduria: number;
  carisma: number;
}

export interface InventoryItem {
  id_instancia: string;
  objeto_id: string;
  cantidad: number;
  equipado: boolean;
  ubicacion?: string;
  nombre?: string;
  peso_kg?: number;
}

export interface EquipmentSlots {
  armadura: string | null;
  escudo: string | null;
  mano_derecha: string | null;
  mano_izquierda: string | null;
  cabeza?: string | null;
  cuello?: string | null;
  capa?: string | null;
  torso?: string | null;
  manos?: string | null;
  pies?: string | null;
  anillos?: string[];
}

export interface DNDCharacter {
  id: string;
  identidad: {
    nombre: string;
    jugador: string;
    descripcion?: string;
  };
  base: {
    nivel: number;
    caracteristicas: Record<StatKey, number>;
    caracteristicas_base?: Record<StatKey, number>;
    aumentos_caracteristica?: Partial<Record<StatKey, number>>;
    especie: string;
    clase: string;
    subclase?: string | null;
    trasfondo: string;
    competencias: {
      habilidades: string[];
      salvaciones: string[];
      armas: string[];
      armaduras: string[];
      herramientas: string[];
    };
    dotes: string[];
    conjuros: string[];
    conjuros_especie?: string[];
    selecciones_especie?: Record<string, string>;
    datos_especie_seleccionada?: Record<string, any>;
    selecciones_trasfondo?: Record<string, string>;
    datos_origen?: {
      velocidad?: number;
      tamano?: string;
      caracteristica_principal?: string | string[];
      dado_puntos_golpe?: string;
    };
    rasgos_clase?: string[];
    rasgos_subclase?: string[];
    monedas?: { pc?: number; pp?: number; pe?: number; po?: number; ppt?: number };
    equipo_clase_opcion?: string | null;
    equipo_trasfondo_opcion?: string | null;
  };
  recursos: Record<string, { maximo: number; actual: number; origen?: string; nivel?: number }> & {
    espacios_conjuro?: Record<string, { maximo: number; actual: number }>;
  };
  estado: {
    puntos_golpe_maximos: number;
    puntos_golpe_actuales: number;
    puntos_golpe_temporales: number;
    dados_golpe_gastados?: number;
    salvaciones_muerte?: { exitos: number; fallos: number };
    condiciones: string[];
    equipo: {
      inventario: InventoryItem[];
      equipamiento: EquipmentSlots;
    };
  };
  calculado: {
    modificadores_caracteristica: Record<StatKey, number>;
    bonificador_competencia: number;
    clase_armadura: number;
    velocidad: number;
    peso_inventario_kg: number;
    iniciativa: number;
  };
  elecciones: Array<{
    tipo: string;
    origen?: string;
    estado: string;
    rasgo?: string;
    detalle?: any;
    valor?: any;
    motivo?: string;
  }>;
  fecha_modificacion?: string;
}

export interface ClassEquipmentOption {
  id: string;
  contenido: Array<{
    id?: string;
    texto?: string;
    cantidad?: number;
    moneda?: boolean;
    seleccion?: boolean;
    objeto?: string;
  }>;
}

export interface ClassDefinition {
  id: string;
  nombre: string;
  caracteristica_principal: string | string[];
  equipo?: {
    tipo: 'seleccion' | 'texto';
    texto?: string;
    opciones?: ClassEquipmentOption[];
  };
  descripcion?: string;
  atributos_basicos?: {
    caracteristica_principal?: string | string[];
    dado_puntos_golpe?: string;
    salvaciones?: string[];
    habilidades?: {
      cantidad?: number;
      opciones?: string[] | string;
    };
    competencias?: {
      armas?: string[];
      armaduras?: string[];
      instrumentos_musicales?: {
        cantidad?: number;
        opciones?: string;
      };
    };
  };
  progresion?: Array<{
    nivel: number;
    bonificador_competencia: number;
    rasgos?: string[];
    espacios_conjuro?: Record<string, number>;
    [key: string]: any;
  }>;
  rasgos?: Record<string, {
    id: string;
    nombre: string;
    nivel?: number | number[] | null;
    descripcion?: string;
  }>;
}

export interface SpeciesSelectionOption {
  id: string;
  nombre: string;
  detalle?: any;
}

export interface SpeciesSelection {
  id: string;
  nombre: string;
  tipo: string;
  opciones: SpeciesSelectionOption[];
}

export interface SpeciesDefinition {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo_criatura?: string;
  tamano?: {
    tipo: 'fijo' | 'seleccion';
    valor?: string;
    opciones?: string[];
  };
  velocidad?: {
    base: number;
  };
  rasgos?: Record<string, any>;
  linajes?: Record<string, any>;
  legados?: Record<string, any>;
  tabla_ancestros?: Record<string, string>;
  detalle?: {
    selecciones?: SpeciesSelection[];
  };
}

export interface BackgroundDefinition {
  id: string;
  nombre: string;
  descripcion?: string;
  dote?: string;
  detalle?: {
    puntuaciones_caracteristica?: {
      opciones: string[];
      regla_aumento: {
        opciones_distribucion: number[][];
        maximo: number;
      };
    };
    competencias?: {
      habilidades?: string[];
      herramientas?: any;
    };
    dote?: string;
    descripcion?: string;
  };
  equipo?: {
    tipo: 'seleccion';
    opciones: Array<{
      id: string;
      contenido: Array<{
        id?: string;
        texto?: string;
        cantidad?: number;
        moneda?: boolean;
        seleccion?: boolean;
        objeto?: string;
      }>;
    }>;
  };
}

export interface FeatDefinition {
  id: string;
  nombre: string;
  categoria: 'General' | 'Origen' | 'Estilo de combate' | 'Don épico';
  descripcion: string;
  requisitos?: any[];
  repetible?: boolean;
}

export interface SpellDefinition {
  id: string;
  nombre: string;
  nivel: number;
  clases: string[];
  descripcion: string;
  escuela?: string;
  tiempo_lanzamiento?: string | { texto: string; tipo?: string; ritual?: boolean };
  alcance?: string | { texto: string };
  componentes?: string | { verbal?: boolean; somatico?: boolean; material?: boolean; detalle_material?: string | null };
  duracion?: string | { texto: string; concentracion?: boolean };
  concentracion?: boolean;
  ritual?: boolean;
  escalado?: string | null;
}

export interface EquipmentItemDefinition {
  id: string;
  nombre: string;
  categoria: string;
  tipo_entidad?: string;
  descripcion?: string;
  peso_kg?: number | null;
  precio?: { cantidad: number; moneda: string } | null;
  dano?: string;
  tipo_dano?: string;
  propiedades?: string[];
  propiedades_detalle?: any;
  maestria?: string;
  categoria_arma?: 'sencilla' | 'marcial';
  armadura?: {
    categoria: 'ligera' | 'media' | 'pesada';
    clase_armadura: { base: number; modificador: string | null; limite_destreza: number | null };
    fuerza_minima: number | null;
    desventaja_sigilo: boolean;
  };
  escudo?: { bonificador_ca: number };
  herramienta?: any;
  usos?: any[];
  capacidad?: any;
}
