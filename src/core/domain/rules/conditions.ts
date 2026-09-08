import { ConditionType } from '../character/character.types';

export interface ConditionDefinition {
  id: ConditionType;
  nombre: string;
  descripcion: string;
  efectos_resumidos: string[];
  incapacita: boolean;
}

export const DND_2024_CONDITIONS: Record<ConditionType, ConditionDefinition> = {
  cegado: {
    id: 'cegado',
    nombre: 'Cegado',
    descripcion:
      'Una criatura cegada no puede ver y falla automáticamente cualquier prueba de característica que requiera la vista.',
    efectos_resumidos: [
      'Falla automáticamente pruebas que requieran vista',
      'Tiradas de ataque contra ella tienen ventaja',
      'Sus propias tiradas de ataque tienen desventaja'
    ],
    incapacita: false
  },
  hechizado: {
    id: 'hechizado',
    nombre: 'Hechizado',
    descripcion:
      'Una criatura hechizada no puede atacar al que la hechizó ni seleccionarlo como objetivo de efectos nocivos o mágicos.',
    efectos_resumidos: [
      'No puede atacar al encantador ni dirigirle efectos dañinos',
      'El encantador tiene ventaja en pruebas de interacción social con la criatura'
    ],
    incapacita: false
  },
  ensordecido: {
    id: 'ensordecido',
    nombre: 'Ensordecido',
    descripcion:
      'Una criatura ensordecida no puede oír y falla automáticamente cualquier prueba de característica que requiera el oído.',
    efectos_resumidos: ['Falla automáticamente pruebas de oído'],
    incapacita: false
  },
  asustado: {
    id: 'asustado',
    nombre: 'Asustado',
    descripcion:
      'Una criatura asustada tiene desventaja en pruebas de característica y tiradas de ataque mientras la fuente de su miedo esté en su línea de visión.',
    efectos_resumidos: [
      'Desventaja en ataques y pruebas mientras vea a la fuente del miedo',
      'No puede acercarse voluntariamente a la fuente de su miedo'
    ],
    incapacita: false
  },
  agarrado: {
    id: 'agarrado',
    nombre: 'Agarrado',
    descripcion:
      'La velocidad de una criatura agarrada pasa a ser 0 y no puede beneficiarse de ningún bonificador a su velocidad.',
    efectos_resumidos: [
      'Velocidad 0',
      'Desventaja en tiradas de ataque contra objetivos que no sean el que la agarra (D&D 2024)'
    ],
    incapacita: false
  },
  incapacitado: {
    id: 'incapacitado',
    nombre: 'Incapacitado',
    descripcion:
      'Una criatura incapacitada no puede realizar acciones, acciones adicionales ni reacciones. Además pierde la concentración.',
    efectos_resumidos: [
      'No puede realizar acciones ni reacciones',
      'Pierde inmediatamente la concentración en conjuros',
      'No puede hablar'
    ],
    incapacita: true
  },
  invisible: {
    id: 'invisible',
    nombre: 'Invisible',
    descripcion:
      'Una criatura invisible es imposible de ver sin ayuda de magia o sentidos especiales.',
    efectos_resumidos: [
      'Sorpresa/ocultación mejorada',
      'Ventaja en sus tiradas de ataque',
      'Tiradas de ataque contra ella tienen desventaja'
    ],
    incapacita: false
  },
  paralizado: {
    id: 'paralizado',
    nombre: 'Paralizado',
    descripcion:
      'Una criatura paralizada está incapacitada y no puede moverse ni hablar. Falla automáticamente salvaciones de Fuerza y Destreza.',
    efectos_resumidos: [
      'Incapacitada: sin acciones ni reacciones',
      'Velocidad 0, no puede moverse ni hablar',
      'Falla automáticamente salvaciones de FUE y DES',
      'Ataques contra ella tienen ventaja',
      'Cualquier impacto a menos de 1.5 m es golpe crítico automático'
    ],
    incapacita: true
  },
  petrificado: {
    id: 'petrificado',
    nombre: 'Petrificado',
    descripcion:
      'Transformada en una sustancia inanimada sólida. Su peso se multiplica por diez y deja de envejecer.',
    efectos_resumidos: [
      'Incapacitada, velocidad 0',
      'Resistencia a todo tipo de daño',
      'Inmune a veneno y enfermedades',
      'Falla automáticamente salvaciones de FUE y DES'
    ],
    incapacita: true
  },
  envenenado: {
    id: 'envenenado',
    nombre: 'Envenenado',
    descripcion:
      'Una criatura envenenada sufre mareos, náuseas o debilidad toxicológica.',
    efectos_resumidos: [
      'Desventaja en tiradas de ataque y pruebas de característica'
    ],
    incapacita: false
  },
  derribado: {
    id: 'derribado',
    nombre: 'Derribado (Tumbado)',
    descripcion:
      'La criatura está en el suelo. Su única opción de movimiento es arrastrarse, a menos que se levante gastando la mitad de su velocidad.',
    efectos_resumidos: [
      'Desventaja en sus propias tiradas de ataque',
      'Ataques a 1.5 m contra ella tienen ventaja; ataques a mayor distancia tienen desventaja',
      'Levantarse cuesta la mitad de su velocidad'
    ],
    incapacita: false
  },
  restringido: {
    id: 'restringido',
    nombre: 'Restringido',
    descripcion:
      'La velocidad de una criatura restringida se reduce a 0 y no puede beneficiarse de bonificadores a su velocidad.',
    efectos_resumidos: [
      'Velocidad 0',
      'Ataques contra ella tienen ventaja',
      'Sus propios ataques tienen desventaja',
      'Desventaja en tiradas de salvación de Destreza'
    ],
    incapacita: false
  },
  aturdido: {
    id: 'aturdido',
    nombre: 'Aturdido',
    descripcion:
      'Una criatura aturdida está incapacitada, no puede moverse y solo puede balbucear con dificultad.',
    efectos_resumidos: [
      'Incapacitada: no puede actuar ni reaccionar',
      'Velocidad 0',
      'Falla automáticamente salvaciones de FUE y DES',
      'Ataques contra ella tienen ventaja'
    ],
    incapacita: true
  },
  inconsciente: {
    id: 'inconsciente',
    nombre: 'Inconsciente',
    descripcion:
      'Una criatura inconsciente está incapacitada, no puede moverse ni hablar, y no es consciente de lo que la rodea. Deja caer lo que sostenga.',
    efectos_resumidos: [
      'Incapacitada, cae al suelo derribada',
      'Falla automáticamente salvaciones de FUE y DES',
      'Ataques contra ella tienen ventaja',
      'Cualquier impacto a menos de 1.5 m es crítico automático'
    ],
    incapacita: true
  },
  agotamiento_1: {
    id: 'agotamiento_1',
    nombre: 'Agotamiento 1',
    descripcion: 'En D&D 2024, cada nivel de agotamiento aplica un penalizador de -2 por nivel a tiradas D20 y reduce la velocidad en 1.5 m.',
    efectos_resumidos: ['-2 a todas las tiradas D20', '-1.5 m a la velocidad'],
    incapacita: false
  },
  agotamiento_2: {
    id: 'agotamiento_2',
    nombre: 'Agotamiento 2',
    descripcion: 'Nivel 2 de agotamiento.',
    efectos_resumidos: ['-4 a todas las tiradas D20', '-3 m a la velocidad'],
    incapacita: false
  },
  agotamiento_3: {
    id: 'agotamiento_3',
    nombre: 'Agotamiento 3',
    descripcion: 'Nivel 3 de agotamiento.',
    efectos_resumidos: ['-6 a todas las tiradas D20', '-4.5 m a la velocidad'],
    incapacita: false
  },
  agotamiento_4: {
    id: 'agotamiento_4',
    nombre: 'Agotamiento 4',
    descripcion: 'Nivel 4 de agotamiento.',
    efectos_resumidos: ['-8 a todas las tiradas D20', '-6 m a la velocidad'],
    incapacita: false
  },
  agotamiento_5: {
    id: 'agotamiento_5',
    nombre: 'Agotamiento 5',
    descripcion: 'Nivel 5 de agotamiento.',
    efectos_resumidos: ['-10 a todas las tiradas D20', '-7.5 m a la velocidad'],
    incapacita: false
  },
  agotamiento_6: {
    id: 'agotamiento_6',
    nombre: 'Agotamiento 6',
    descripcion: 'Nivel 6 de agotamiento: la criatura muere por colapso metabólico.',
    efectos_resumidos: ['Muerte instantánea de la criatura'],
    incapacita: true
  }
};
