import { ConditionType, StatKey } from '../character/character.types';

export type ActionActivationType =
  | 'accion'
  | 'accion_adicional'
  | 'reaccion'
  | 'movimiento'
  | 'gratuita'
  | 'minuto'
  | 'hora'
  | 'pasiva';

export type EventTriggerType =
  | 'inicio_turno'
  | 'fin_turno'
  | 'recibir_dano'
  | 'realizar_ataque'
  | 'impactar_ataque'
  | 'tirada_salvacion'
  | 'descanso_corto'
  | 'descanso_largo'
  | 'caer_a_0_pg';

export interface RuleRequirement {
  tipo:
    | 'puntuacion_minima'
    | 'nivel_minimo'
    | 'competencia_arma'
    | 'competencia_armadura'
    | 'espacio_conjuro'
    | 'condicion_activa';
  parametro: string;
  valor: number | string | boolean;
}

export interface RuleCost {
  tipo: 'accion' | 'recurso' | 'espacio_conjuro' | 'puntos_golpe' | 'dado_golpe';
  recurso_id?: string;
  cantidad: number;
}

export type EffectDuration =
  | 'instantaneo'
  | '1_ronda'
  | '1_minuto'
  | '10_minutos'
  | '1_hora'
  | '8_horas'
  | '24_horas'
  | 'hasta_descanso_corto'
  | 'hasta_descanso_largo'
  | 'permanente'
  | 'concentracion';

export interface RuleEffect {
  id: string;
  tipo:
    | 'bonificador_caracteristica'
    | 'bonificador_ca'
    | 'resistencia_dano'
    | 'inmunidad_dano'
    | 'ventaja_tirada'
    | 'desventaja_tirada'
    | 'aplicar_condicion'
    | 'curacion'
    | 'dano'
    | 'modificar_recurso';
  valor: number | string | ConditionType;
  duracion: EffectDuration;
  origen: string;
  descripcion: string;
}

export interface GenericDNDFeature {
  id: string;
  nombre: string;
  origen: 'clase' | 'subclase' | 'especie' | 'trasfondo' | 'dote' | 'objeto';
  nivel_requerido: number;
  activacion: ActionActivationType;
  requisitos?: RuleRequirement[];
  costes?: RuleCost[];
  efectos?: RuleEffect[];
  descripcion: string;
  limite_usos?: {
    cantidad_fija?: number;
    formula?: string; // e.g. 'PB' or 'CAR_MOD'
    recuperacion: 'descanso_corto' | 'descanso_largo' | 'amanecer';
  };
}
