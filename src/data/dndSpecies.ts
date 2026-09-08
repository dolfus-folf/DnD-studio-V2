import { SpeciesDefinition } from '../types';

export const DND_SPECIES: SpeciesDefinition[] = [
  {
    id: 'aasimar',
    nombre: 'Aasimar',
    descripcion: 'Mortales cuyas almas albergan una chispa sagrada de los Planos Superiores, dotados de resistencia celestial y la capacidad de manifestar un avatar de luz o juicio divino.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'seleccion', opciones: ['mediano', 'pequeno'] },
    velocidad: { base: 9 },
    rasgos: {
      manos_curativas: {
        id: 'manos_curativas',
        nombre: 'Manos curativas',
        nivel: 1,
        descripcion: 'Como acción de magia, tocas a una criatura y tiras una cantidad de d4 igual a tu bonificador por competencia. La criatura recupera una cantidad de puntos de golpe igual al resultado total. (1 uso por descanso largo).'
      },
      portador_de_luz: {
        id: 'portador_de_luz',
        nombre: 'Portador de luz',
        nivel: 1,
        descripcion: 'Conoces el truco Luz. Carisma es tu aptitud mágica.'
      },
      resistencia_celestial: {
        id: 'resistencia_celestial',
        nombre: 'Resistencia celestial',
        nivel: 1,
        descripcion: 'Tienes resistencia al daño necrótico y al daño radiante.'
      },
      vision_en_la_oscuridad: {
        id: 'vision_en_la_oscuridad',
        nombre: 'Visión en la oscuridad (18 m)',
        nivel: 1,
        descripcion: 'Puedes ver en luz tenue como si fuera luz brillante, y en oscuridad como si fuera luz tenue hasta 18 metros.'
      },
      revelacion_celestial: {
        id: 'revelacion_celestial',
        nombre: 'Revelación celestial',
        nivel: 3,
        descripcion: 'A nivel 3, puedes transformarte como acción adicional durante 1 minuto. Puedes elegir Alas celestiales (vuelo), Fulgor interior (daño radiante a 3m) o Mortaja necrótica (asusta a enemigos).'
      }
    },
    detalle: {
      selecciones: [
        {
          id: 'revelacion_celestial',
          nombre: 'Revelación celestial (Nivel 3+)',
          tipo: 'opcion_rasgo',
          opciones: [
            { id: 'alas_celestiales', nombre: 'Alas celestiales (Vuelo igual a tu velocidad)' },
            { id: 'fulgor_interior', nombre: 'Fulgor interior (Luz brillante + daño radiante igual a PB)' },
            { id: 'mortaja_necrotica', nombre: 'Mortaja necrótica (Asusta criaturas a 3 m, salvación CAR)' }
          ]
        }
      ]
    }
  },
  {
    id: 'draconido',
    nombre: 'Dracónido',
    descripcion: 'Orgullosos vástagos de dragones que exhiben escamas relucientes, aliento elemental destructivo y resistencia a su elemento ancestral.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'fijo', valor: 'mediano' },
    velocidad: { base: 9 },
    rasgos: {
      linaje_draconico: {
        id: 'linaje_draconico',
        nombre: 'Linaje dracónico',
        nivel: 1,
        descripcion: 'Elige tu ancestro de dragón. Determina el tipo de daño de tu Ataque de aliento y de tu Resistencia al daño.'
      },
      ataque_de_aliento: {
        id: 'ataque_de_aliento',
        nombre: 'Ataque de aliento',
        nivel: 1,
        descripcion: 'Al atacar, puedes sustituir uno de tus ataques por una exhalación en un cono de 4,5 m o una línea de 9 m por 1,5 m. Daño 1d10 (escala a 2d10 a Nv.5, 3d10 a Nv.11, 4d10 a Nv.17). Salvación de DES (CD 8 + CON + PB).'
      },
      resistencia_al_dano: {
        id: 'resistencia_al_dano',
        nombre: 'Resistencia elemental',
        nivel: 1,
        descripcion: 'Resistencia al tipo de daño otorgado por tu linaje dracónico.'
      },
      vision_en_la_oscuridad: {
        id: 'vision_en_la_oscuridad',
        nombre: 'Visión en la oscuridad (18 m)',
        nivel: 1,
        descripcion: 'Ves en oscuridad hasta 18 metros.'
      },
      vuelo_draconico: {
        id: 'vuelo_draconico',
        nombre: 'Vuelo dracónico (Nivel 5)',
        nivel: 5,
        descripcion: 'A nivel 5, como acción adicional brotan alas espectrales durante 10 minutos con velocidad volando igual a tu velocidad.'
      }
    },
    tabla_ancestros: {
      azul: 'relampago',
      blanco: 'frio',
      bronce: 'relampago',
      cobre: 'acido',
      negro: 'acido',
      oro: 'fuego',
      oropel: 'fuego',
      plata: 'frio',
      rojo: 'fuego',
      verde: 'veneno'
    },
    detalle: {
      selecciones: [
        {
          id: 'linaje_draconico',
          nombre: 'Linaje dracónico',
          tipo: 'eleccion',
          opciones: [
            { id: 'azul', nombre: 'Dragón Azul (Relámpago)' },
            { id: 'blanco', nombre: 'Dragón Blanco (Frío)' },
            { id: 'bronce', nombre: 'Dragón de Bronce (Relámpago)' },
            { id: 'cobre', nombre: 'Dragón de Cobre (Ácido)' },
            { id: 'negro', nombre: 'Dragón Negro (Ácido)' },
            { id: 'oro', nombre: 'Dragón de Oro (Fuego)' },
            { id: 'oropel', nombre: 'Dragón de Oropel (Fuego)' },
            { id: 'plata', nombre: 'Dragón de Plata (Frío)' },
            { id: 'rojo', nombre: 'Dragón Rojo (Fuego)' },
            { id: 'verde', nombre: 'Dragón Verde (Veneno)' }
          ]
        }
      ]
    }
  },
  {
    id: 'elfo',
    nombre: 'Elfo',
    descripcion: 'Pueblo grácil e inmune al sueño mágico, con una conexión profunda con los Parajes Feéricos y la magia milenaria.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'fijo', valor: 'mediano' },
    velocidad: { base: 9 },
    rasgos: {
      linaje_elfico: {
        id: 'linaje_elfico',
        nombre: 'Linaje élfico',
        nivel: 1,
        descripcion: 'Elige entre Alto elfo, Drow o Elfo de los bosques.'
      },
      linaje_feerico: {
        id: 'linaje_feerico',
        nombre: 'Linaje feérico',
        nivel: 1,
        descripcion: 'Ventaja en tiradas de salvación para evitar o poner fin al estado de hechizado.'
      },
      sentidos_agudos: {
        id: 'sentidos_agudos',
        nombre: 'Sentidos agudos',
        nivel: 1,
        descripcion: 'Competencia en Percepción, Perspicacia o Supervivencia.'
      },
      trance: {
        id: 'trance',
        nombre: 'Trance',
        nivel: 1,
        descripcion: 'No necesitas dormir y la magia no puede dormirte. Finalizas un descanso largo en solo 4 horas de meditación.'
      },
      vision_en_la_oscuridad: {
        id: 'vision_en_la_oscuridad',
        nombre: 'Visión en la oscuridad (18 m / 36 m Drow)',
        nivel: 1,
        descripcion: 'Ves en la penumbra y oscuridad.'
      }
    },
    linajes: {
      alto_elfo: {
        nombre: 'Alto elfo',
        descripcion: 'Conexión arcana pura: conoces el truco Prestidigitación y conjuros arcanos progresivos (Detectar magia a Nv.3, Paso brumoso a Nv.5).'
      },
      drow: {
        nombre: 'Drow',
        descripcion: 'Elfo de las profundidades: Visión en la oscuridad superior (36 m), luces danzantes, Fuego feérico (Nv.3) y Oscuridad (Nv.5).'
      },
      elfo_bosques: {
        nombre: 'Elfo de los bosques',
        descripcion: 'Velocidad base aumentada a 10.5 m, truco Saber druídico, Zancada prodigiosa (Nv.3) y Pasar sin rastro (Nv.5).'
      }
    },
    detalle: {
      selecciones: [
        {
          id: 'linaje_elfico',
          nombre: 'Linaje élfico',
          tipo: 'eleccion',
          opciones: [
            { id: 'alto_elfo', nombre: 'Alto elfo (Truco mago adicional + Paso brumoso a Nv.5)' },
            { id: 'drow', nombre: 'Drow (Visión 36m + Luces danzantes + Oscuridad)' },
            { id: 'elfo_bosques', nombre: 'Elfo de los bosques (Velocidad 10.5 m + Pasar sin rastro)' }
          ]
        },
        {
          id: 'sentidos_agudos',
          nombre: 'Sentidos agudos',
          tipo: 'habilidad',
          opciones: [
            { id: 'percepcion', nombre: 'Percepción' },
            { id: 'perspicacia', nombre: 'Perspicacia' },
            { id: 'supervivencia', nombre: 'Supervivencia' }
          ]
        }
      ]
    }
  },
  {
    id: 'enano',
    nombre: 'Enano',
    descripcion: 'Robustos y tenaces artesanos y guerreros nacidos en las forjas de las montañas, dotados de vitalidad imperturbable y resistencia a toxinas.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'fijo', valor: 'mediano' },
    velocidad: { base: 9 },
    rasgos: {
      afinidad_con_la_piedra: {
        id: 'afinidad_con_la_piedra',
        nombre: 'Afinidad con la piedra',
        nivel: 1,
        descripcion: 'Como acción adicional, puedes sentir vibraciones hasta 18 m durante 10 minutos si estás en contacto con piedra (usos igual a PB por descanso largo).'
      },
      aguante_enano: {
        id: 'aguante_enano',
        nombre: 'Aguante enano',
        nivel: 1,
        descripcion: 'Tus puntos de golpe máximos se incrementan en 1 por cada nivel de personaje (+1 por nivel acumulativo).'
      },
      resistencia_enana: {
        id: 'resistencia_enana',
        nombre: 'Resistencia enana',
        nivel: 1,
        descripcion: 'Resistencia al daño de veneno y ventaja en salvaciones para evitar o poner fin al estado de envenenado.'
      },
      vision_en_la_oscuridad: {
        id: 'vision_en_la_oscuridad',
        nombre: 'Visión en la oscuridad superior (36 m)',
        nivel: 1,
        descripcion: 'Ves en oscuridad hasta 36 metros.'
      }
    }
  },
  {
    id: 'gnomo',
    nombre: 'Gnomo',
    descripcion: 'Pobladores ingeniosos y vivaces que poseen una mente extraordinariamente astuta para desafiar efectos mágicos.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'fijo', valor: 'pequeno' },
    velocidad: { base: 9 },
    rasgos: {
      astucia_gnoma: {
        id: 'astucia_gnoma',
        nombre: 'Astucia gnoma',
        nivel: 1,
        descripcion: 'Tienes ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma.'
      },
      linaje_gnomo: {
        id: 'linaje_gnomo',
        nombre: 'Linaje gnomo',
        nivel: 1,
        descripcion: 'Elige entre Gnomo de las rocas o Gnomo de los bosques.'
      },
      vision_en_la_oscuridad: {
        id: 'vision_en_la_oscuridad',
        nombre: 'Visión en la oscuridad (18 m)',
        nivel: 1,
        descripcion: 'Ves en oscuridad hasta 18 metros.'
      }
    },
    linajes: {
      gnomo_rocas: {
        nombre: 'Gnomo de las rocas',
        descripcion: 'Inventores natos: conoces Prestidigitación y Reparar; puedes construir pequeños mecanismos relojeros como acción adicional.'
      },
      gnomo_bosques: {
        nombre: 'Gnomo de los bosques',
        descripcion: 'Conexión con el bosque: conoces Ilusión menor y siempre tienes preparado Hablar con los animales (lanzamiento gratuito igual a PB).'
      }
    },
    detalle: {
      selecciones: [
        {
          id: 'linaje_gnomo',
          nombre: 'Linaje gnomo',
          tipo: 'eleccion',
          opciones: [
            { id: 'gnomo_rocas', nombre: 'Gnomo de las rocas (Prestidigitación, Reparar y Mecanismos)' },
            { id: 'gnomo_bosques', nombre: 'Gnomo de los bosques (Ilusión menor y Hablar con los animales)' }
          ]
        }
      ]
    }
  },
  {
    id: 'goliat',
    nombre: 'Goliat',
    descripcion: 'Montañeses colosales que descienden de gigantes primigenios y portan dones elementales devastadores en su anatomía.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'fijo', valor: 'mediano' },
    velocidad: { base: 10.5 },
    rasgos: {
      constitucion_poderosa: {
        id: 'constitucion_poderosa',
        nombre: 'Constitución poderosa',
        nivel: 1,
        descripcion: 'Ventaja en pruebas para liberarte de agarres y cuentas como una categoría superior para capacidad de carga.'
      },
      linaje_gigante: {
        id: 'linaje_gigante',
        nombre: 'Linaje de gigante',
        nivel: 1,
        descripcion: 'Elige tu ancestro: Fuego (+1d10 daño), Colinas (derriba objetivos), Nubes (teletransporte 9m), Escarcha (+1d6 frío y ralentiza), Piedra (reduce daño 1d12+CON), Tormenta (reacción 1d8 trueno). Usos igual a PB por descanso largo.'
      },
      forma_grande: {
        id: 'forma_grande',
        nombre: 'Forma grande (Nivel 5)',
        nivel: 5,
        descripcion: 'Como acción adicional creces a tamaño Grande durante 10 minutos (+3m de velocidad y ventaja en pruebas de Fuerza). 1 uso por descanso largo.'
      }
    },
    detalle: {
      selecciones: [
        {
          id: 'linaje_gigante',
          nombre: 'Linaje de gigante',
          tipo: 'eleccion',
          opciones: [
            { id: 'abrasion_fuego', nombre: 'Gigante de Fuego (+1d10 de daño de fuego al acertar)' },
            { id: 'caida_colinas', nombre: 'Gigante de las Colinas (Derriba al enemigo impactado)' },
            { id: 'excursion_nubes', nombre: 'Gigante de las Nubes (Teletransporte 9m como acción adicional)' },
            { id: 'frio_escarcha', nombre: 'Gigante de la Escarcha (+1d6 de frío y -3m de velocidad al enemigo)' },
            { id: 'resistencia_piedra', nombre: 'Gigante de Piedra (Reacción: reduce daño en 1d12 + CON)' },
            { id: 'trueno_tormenta', nombre: 'Gigante de la Tormenta (Reacción: inflige 1d8 de trueno a 18m)' }
          ]
        }
      ]
    }
  },
  {
    id: 'humano',
    nombre: 'Humano',
    descripcion: 'La especie más versátil, ambiciosa y adaptable del multiverso, capaz de dominar cualquier disciplina con ingenio y determinación inquebrantable.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'seleccion', opciones: ['mediano', 'pequeno'] },
    velocidad: { base: 9 },
    rasgos: {
      diestro: {
        id: 'diestro',
        nombre: 'Diestro',
        nivel: 1,
        descripcion: 'Ganas competencia en una habilidad adicional de tu elección.'
      },
      ingenioso: {
        id: 'ingenioso',
        nombre: 'Ingenioso',
        nivel: 1,
        descripcion: 'Obtienes Inspiración heroica automáticamente tras finalizar cada descanso largo.'
      },
      versatil: {
        id: 'versatil',
        nombre: 'Versátil (Dote de origen extra)',
        nivel: 1,
        descripcion: 'Obtienes una dote de origen adicional de tu elección (ej. Habilidoso, Alerta, Duro, Afortunado).'
      }
    },
    detalle: {
      selecciones: [
        {
          id: 'diestro',
          nombre: 'Habilidad adicional de Diestro',
          tipo: 'habilidad',
          opciones: [
            { id: 'acrobacias', nombre: 'Acrobacias' },
            { id: 'atletismo', nombre: 'Atletismo' },
            { id: 'arcano', nombre: 'Arcano' },
            { id: 'engano', nombre: 'Engaño' },
            { id: 'historia', nombre: 'Historia' },
            { id: 'interpretacion', nombre: 'Interpretación' },
            { id: 'intimidacion', nombre: 'Intimidación' },
            { id: 'investigacion', nombre: 'Investigación' },
            { id: 'juego_de_manos', nombre: 'Juego de manos' },
            { id: 'medicina', nombre: 'Medicina' },
            { id: 'naturaleza', nombre: 'Naturaleza' },
            { id: 'percepcion', nombre: 'Percepción' },
            { id: 'perspicacia', nombre: 'Perspicacia' },
            { id: 'persuasion', nombre: 'Persuasión' },
            { id: 'religion', nombre: 'Religión' },
            { id: 'sigilo', nombre: 'Sigilo' },
            { id: 'supervivencia', nombre: 'Supervivencia' },
            { id: 'trato_con_animales', nombre: 'Trato con animales' }
          ]
        },
        {
          id: 'versatil',
          nombre: 'Dote de origen de Versátil',
          tipo: 'dote',
          opciones: [
            { id: 'habilidoso', nombre: 'Habilidoso (3 competencias)' },
            { id: 'alerta', nombre: 'Alerta (+PB a iniciativa)' },
            { id: 'afortunado', nombre: 'Afortunado (Puntos de suerte)' },
            { id: 'duro', nombre: 'Duro (+2 PG por nivel)' },
            { id: 'matondetaberna', nombre: 'Matón de taberna' },
            { id: 'musico', nombre: 'Músico (Inspiración en descanso)' },
            { id: 'sanador', nombre: 'Sanador' },
            { id: 'atacantesalvaje', nombre: 'Atacante salvaje' }
          ]
        }
      ]
    }
  },
  {
    id: 'mediano',
    nombre: 'Mediano',
    descripcion: 'Gente menuda, hospitalaria y valiente cuya legendaria suerte les libra de las peores adversidades.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'fijo', valor: 'pequeno' },
    velocidad: { base: 9 },
    rasgos: {
      agilidad_de_mediano: {
        id: 'agilidad_de_mediano',
        nombre: 'Agilidad de mediano',
        nivel: 1,
        descripcion: 'Puedes moverte a través del espacio ocupado por cualquier criatura de tamaño superior al tuyo.'
      },
      fortuna: {
        id: 'fortuna',
        nombre: 'Afortunado (Suerte del mediano)',
        nivel: 1,
        descripcion: 'Cuando saques un 1 natural en el d20 de una tirada de ataque, prueba de característica o salvación, puedes repetir la tirada y usar el nuevo resultado.'
      },
      sigiloso_por_naturaleza: {
        id: 'sigiloso_por_naturaleza',
        nombre: 'Sigiloso por naturaleza',
        nivel: 1,
        descripcion: 'Puedes intentar esconderte incluso cuando solo estás cubierto por una criatura al menos una categoría mayor que tú.'
      },
      valiente: {
        id: 'valiente',
        nombre: 'Valiente',
        nivel: 1,
        descripcion: 'Tienes ventaja en las tiradas de salvación para evitar o poner fin al estado de asustado.'
      }
    }
  },
  {
    id: 'orco',
    nombre: 'Orco',
    descripcion: 'Poderosos y decididos guerreros que canalizan un aguante inquebrantable para rechazar la muerte y una descarga de adrenalina para cerrar distancias rápidamente.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'fijo', valor: 'mediano' },
    velocidad: { base: 9 },
    rasgos: {
      aguante_incansable: {
        id: 'aguante_incansable',
        nombre: 'Aguante incansable',
        nivel: 1,
        descripcion: 'Cuando tus puntos de golpe se reducen a 0 y no mueres inmediatamente, puedes quedarte con 1 punto de golpe (1 uso por descanso largo).'
      },
      descarga_de_adrenalina: {
        id: 'descarga_de_adrenalina',
        nombre: 'Descarga de adrenalina',
        nivel: 1,
        descripcion: 'Puedes llevar a cabo la acción de Correr como acción adicional. Al hacerlo, obtienes puntos de golpe temporales iguales a tu bonificador por competencia (usos igual a PB por descanso corto o largo).'
      },
      vision_en_la_oscuridad: {
        id: 'vision_en_la_oscuridad',
        nombre: 'Visión en la oscuridad superior (36 m)',
        nivel: 1,
        descripcion: 'Ves en oscuridad hasta 36 metros.'
      }
    }
  },
  {
    id: 'tiefling',
    nombre: 'Tiefling',
    descripcion: 'Portadores de un legado infernal manifiesto en sus cuernos, cola y ojos sin pupila, capaces de canalizar magia del averno según su linaje.',
    tipo_criatura: 'humanoide',
    tamano: { tipo: 'seleccion', opciones: ['mediano', 'pequeno'] },
    velocidad: { base: 9 },
    rasgos: {
      legado_infernal: {
        id: 'legado_infernal',
        nombre: 'Legado infernal',
        nivel: 1,
        descripcion: 'Elige tu legado: Abisal (Veneno y Rociada venenosa), Ctónico (Necrótico y Toque helado) o Infernal (Fuego y Descarga de fuego).'
      },
      presencia_sobrenatural: {
        id: 'presencia_sobrenatural',
        nombre: 'Presencia sobrenatural',
        nivel: 1,
        descripcion: 'Conoces el truco Taumaturgia.'
      },
      vision_en_la_oscuridad: {
        id: 'vision_en_la_oscuridad',
        nombre: 'Visión en la oscuridad (18 m)',
        nivel: 1,
        descripcion: 'Ves en la oscuridad hasta 18 metros.'
      }
    },
    legados: {
      abisal: {
        nombre: 'Abisal',
        descripcion: 'Resistencia a veneno, truco Rociada venenosa, Rayo nauseabundo (Nv.3) e Inmovilizar persona (Nv.5).'
      },
      ctonico: {
        nombre: 'Ctónico',
        descripcion: 'Resistencia a daño necrótico, truco Toque helado, Falsa vida (Nv.3) y Rayo debilitador (Nv.5).'
      },
      infernal: {
        nombre: 'Infernal',
        descripcion: 'Resistencia a fuego, truco Descarga de fuego, Reprensión infernal (Nv.3) y Oscuridad (Nv.5).'
      }
    },
    detalle: {
      selecciones: [
        {
          id: 'legado_infernal',
          nombre: 'Legado infernal',
          tipo: 'eleccion',
          opciones: [
            { id: 'abisal', nombre: 'Legado Abisal (Resistencia Veneno + Rociada venenosa)' },
            { id: 'ctonico', nombre: 'Legado Ctónico (Resistencia Necrótico + Toque helado)' },
            { id: 'infernal', nombre: 'Legado Infernal (Resistencia Fuego + Descarga de fuego)' }
          ]
        }
      ]
    }
  }
];
