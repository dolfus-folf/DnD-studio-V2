import { BackgroundDefinition } from '../types';

export const DND_BACKGROUNDS: BackgroundDefinition[] = [
  {
    id: 'acolito',
    nombre: 'Acólito',
    descripcion: 'Dedicabas tu vida al servicio de un templo enclavado en un pueblo o apartado en un bosquecillo sagrado. Aprendiste a canalizar un ápice de poder divino al servicio de tu lugar de culto.',
    dote: 'Iniciado en la magia (Clérigo)',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['inteligencia', 'sabiduria', 'carisma'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['perspicacia', 'religion'],
        herramientas: { herramienta: 'suministros_caligrafo', nombre: 'Suministros de calígrafo' }
      },
      dote: 'iniciadoenlamagia',
      descripcion: 'Dedicado al servicio de un templo sagrado.'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'suministros_caligrafo', texto: 'Suministros de calígrafo', cantidad: 1 },
            { id: 'libro', texto: 'Libro de oraciones', cantidad: 1 },
            { id: 'pergamino', texto: 'Pergamino (10)', cantidad: 10 },
            { id: 'simbolo_sagrado', texto: 'Símbolo sagrado', cantidad: 1 },
            { id: 'tunica', texto: 'Túnica', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 8, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'animador',
    nombre: 'Animador',
    descripcion: 'Pasaste buena parte de tu juventud recorriendo ferias y festivales deleitando audiencias con música, acrobacias, poesía o mímica.',
    dote: 'Músico',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['fuerza', 'destreza', 'carisma'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['acrobacias', 'interpretacion'],
        herramientas: { subtipo: 'instrumento_musical', cantidad: 1 }
      },
      dote: 'musico'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'instrumento_musical', texto: 'Instrumento musical (a elegir)', cantidad: 1, seleccion: true },
            { id: 'disfraz', texto: 'Disfraz', cantidad: 2 },
            { id: 'espejo', texto: 'Espejo', cantidad: 1 },
            { id: 'perfume', texto: 'Perfume', cantidad: 1 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 11, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'artesano',
    nombre: 'Artesano',
    descripcion: 'Comenzaste de aprendiz en el taller de un gremio comercial. Aprendiste un oficio manual detallado y a negociar con clientes exigentes.',
    dote: 'Fabricante',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['fuerza', 'destreza', 'inteligencia'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['investigacion', 'persuasion'],
        herramientas: { subtipo: 'herramientas_artesano', cantidad: 1 }
      },
      dote: 'fabricante'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'herramientas_artesano', texto: 'Herramientas de artesano', cantidad: 1, seleccion: true },
            { id: 'bolsa', texto: 'Bolsa', cantidad: 2 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 32, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'campesino',
    nombre: 'Campesino',
    descripcion: 'Criado cultivando los campos y domando bestias de tiro, tu vida te forjó con una resistencia envidiable y respeto a los ciclos de la tierra.',
    dote: 'Duro',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['fuerza', 'constitucion', 'sabiduria'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['naturaleza', 'trato_con_animales'],
        herramientas: { herramienta: 'herramientas_carpintero' }
      },
      dote: 'duro'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'hoz', texto: 'Hoz', cantidad: 1 },
            { id: 'herramientas_carpintero', texto: 'Herramientas de carpintero', cantidad: 1 },
            { id: 'utiles_sanador', texto: 'Útiles de sanador', cantidad: 1 },
            { id: 'olla_hierro', texto: 'Olla de hierro', cantidad: 1 },
            { id: 'pala', texto: 'Pala', cantidad: 1 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 30, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'charlatan',
    nombre: 'Charlatán',
    descripcion: 'Experto en leer debilidades ajenas, timar incautos en tabernas y vender remedios milagrosos o linajes falsificados con una sonrisa encantadora.',
    dote: 'Habilidoso',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['destreza', 'constitucion', 'carisma'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['engano', 'juego_de_manos'],
        herramientas: { herramienta: 'utiles_falsificar' }
      },
      dote: 'habilidoso'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'utiles_falsificar', texto: 'Útiles para falsificar', cantidad: 1 },
            { id: 'disfraz', texto: 'Disfraz', cantidad: 1 },
            { id: 'ropas_calidad', texto: 'Ropas de calidad', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 15, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'comerciante',
    nombre: 'Comerciante',
    descripcion: 'Viajaste en carretas y barcazas comprando especias, minerales y manufacturas, afinando tu intuición para detectar valor y negociar acuerdos.',
    dote: 'Afortunado',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['constitucion', 'inteligencia', 'carisma'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['persuasion', 'trato_con_animales'],
        herramientas: { herramienta: 'herramientas_navegante' }
      },
      dote: 'afortunado'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'herramientas_navegante', texto: 'Herramientas de navegante', cantidad: 1 },
            { id: 'bolsa', texto: 'Bolsa', cantidad: 2 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 22, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'criminal',
    nombre: 'Criminal',
    descripcion: 'Curtido en los callejones nocturnos y bandas clandestinas, habituado a burlar cerraduras, vigilar las sombras y eludir a la guardia.',
    dote: 'Alerta',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['destreza', 'constitucion', 'inteligencia'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['juego_de_manos', 'sigilo'],
        herramientas: { herramienta: 'herramientas_ladron' }
      },
      dote: 'alerta'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'daga', texto: 'Daga', cantidad: 2 },
            { id: 'herramientas_ladron', texto: 'Herramientas de ladrón', cantidad: 1 },
            { id: 'bolsa', texto: 'Bolsa', cantidad: 2 },
            { id: 'palanqueta', texto: 'Palanqueta', cantidad: 1 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 16, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'ermitano',
    nombre: 'Ermitaño',
    descripcion: 'Viviste en retiro espiritual en cavernas o cumbres aisladas, descubriendo remedios naturales y contemplando secretos arcanos.',
    dote: 'Sanador',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['constitucion', 'sabiduria', 'carisma'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['medicina', 'religion'],
        herramientas: { herramienta: 'utiles_herborista' }
      },
      dote: 'sanador'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'baston', texto: 'Bastón', cantidad: 1 },
            { id: 'utiles_herborista', texto: 'Útiles de herborista', cantidad: 1 },
            { id: 'aceite', texto: 'Aceite', cantidad: 3 },
            { id: 'lampara', texto: 'Lámpara', cantidad: 1 },
            { id: 'libro', texto: 'Libro de filosofía', cantidad: 1 },
            { id: 'petate', texto: 'Petate', cantidad: 1 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 16, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'erudito',
    nombre: 'Erudito',
    descripcion: 'Pasaste incontables noches examinando pergaminos antiguos y manuscritos históricos en archivos reales y abadías del saber.',
    dote: 'Iniciado en la magia (Mago)',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['constitucion', 'inteligencia', 'sabiduria'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['arcano', 'historia'],
        herramientas: { herramienta: 'suministros_caligrafo' }
      },
      dote: 'iniciadoenlamagia'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'baston', texto: 'Bastón', cantidad: 1 },
            { id: 'suministros_caligrafo', texto: 'Suministros de calígrafo', cantidad: 1 },
            { id: 'libro', texto: 'Libro de historia', cantidad: 1 },
            { id: 'pergamino', texto: 'Pergamino', cantidad: 3 },
            { id: 'tunica', texto: 'Túnica', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 8, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'escriba',
    nombre: 'Escriba',
    descripcion: 'Formado en scriptoriums copiando decretos y tratados, dotado de precisión analítica impecable y vista atenta a detalles ocultos.',
    dote: 'Habilidoso',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['destreza', 'inteligencia', 'sabiduria'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['investigacion', 'percepcion'],
        herramientas: { herramienta: 'suministros_caligrafo' }
      },
      dote: 'habilidoso'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'suministros_caligrafo', texto: 'Suministros de calígrafo', cantidad: 1 },
            { id: 'aceite', texto: 'Aceite', cantidad: 3 },
            { id: 'lampara', texto: 'Lámpara', cantidad: 1 },
            { id: 'pergamino', texto: 'Pergamino', cantidad: 12 },
            { id: 'ropas_calidad', texto: 'Ropas de calidad', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 23, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'guardia',
    nombre: 'Guardia',
    descripcion: 'Patrullero de murallas y puertas citadinas que aprendió a mantenerse alerta contra infiltradores y a lidiar con pendencieros.',
    dote: 'Alerta',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['fuerza', 'inteligencia', 'sabiduria'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['atletismo', 'percepcion'],
        herramientas: { subtipo: 'juego', cantidad: 1 }
      },
      dote: 'alerta'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'lanza', texto: 'Lanza', cantidad: 1 },
            { id: 'ballesta_ligera', texto: 'Ballesta ligera', cantidad: 1 },
            { id: 'virote', texto: 'Virote (20)', cantidad: 20 },
            { id: 'juego', texto: 'Juego (a elegir)', cantidad: 1, seleccion: true },
            { id: 'aljaba', texto: 'Aljaba', cantidad: 1 },
            { id: 'esposas', texto: 'Esposas', cantidad: 1 },
            { id: 'linterna_sorda', texto: 'Linterna sorda', cantidad: 1 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 12, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'guia',
    nombre: 'Guía',
    descripcion: 'Explorador de sendas agrestes que guio expediciones por bosques profundos y páramos, canalizando la comunión con la naturaleza.',
    dote: 'Iniciado en la magia (Druida)',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['destreza', 'constitucion', 'sabiduria'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['sigilo', 'supervivencia'],
        herramientas: { herramienta: 'herramientas_cartografo' }
      },
      dote: 'iniciadoenlamagia'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'arco_corto', texto: 'Arco corto', cantidad: 1 },
            { id: 'flecha', texto: 'Flecha (20)', cantidad: 20 },
            { id: 'herramientas_cartografo', texto: 'Herramientas de cartógrafo', cantidad: 1 },
            { id: 'aljaba', texto: 'Aljaba', cantidad: 1 },
            { id: 'petate', texto: 'Petate', cantidad: 1 },
            { id: 'tienda', texto: 'Tienda', cantidad: 1 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 3, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'marinero',
    nombre: 'Marinero',
    descripcion: 'Viviste en altamar entre cabos, vientos tempestuosos y tabernas portuarias, curtido para pelear en balanceo constante.',
    dote: 'Matón de taberna',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['fuerza', 'destreza', 'sabiduria'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['acrobacias', 'percepcion'],
        herramientas: { herramienta: 'herramientas_navegante' }
      },
      dote: 'matondetaberna'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'daga', texto: 'Daga', cantidad: 1 },
            { id: 'herramientas_navegante', texto: 'Herramientas de navegante', cantidad: 1 },
            { id: 'cuerda', texto: 'Cuerda', cantidad: 1 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 20, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'noble',
    nombre: 'Noble',
    descripcion: 'Educado entre castillos, protocolos cortesanos y poder dinástico, preparado en oratoria, historia y mando estratégico.',
    dote: 'Habilidoso',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['fuerza', 'inteligencia', 'carisma'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['historia', 'persuasion'],
        herramientas: { subtipo: 'juego', cantidad: 1 }
      },
      dote: 'habilidoso'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'juego', texto: 'Juego (a elegir)', cantidad: 1, seleccion: true },
            { id: 'perfume', texto: 'Perfume', cantidad: 1 },
            { id: 'ropas_calidad', texto: 'Ropas de calidad', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 29, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'soldado',
    nombre: 'Soldado',
    descripcion: 'Entrenado para marchar en formación, obedecer la jerarquía militar y sobrevivir a los rigores de campañas bélicas sanguinarias.',
    dote: 'Atacante salvaje',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['fuerza', 'destreza', 'constitucion'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['atletismo', 'intimidacion'],
        herramientas: { subtipo: 'juego', cantidad: 1 }
      },
      dote: 'atacantesalvaje'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'lanza', texto: 'Lanza', cantidad: 1 },
            { id: 'arco_corto', texto: 'Arco corto', cantidad: 1 },
            { id: 'flecha', texto: 'Flecha (20)', cantidad: 20 },
            { id: 'aljaba', texto: 'Aljaba', cantidad: 1 },
            { id: 'juego', texto: 'Juego (a elegir)', cantidad: 1, seleccion: true },
            { id: 'utiles_sanador', texto: 'Útiles de sanador', cantidad: 1 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 14, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  },
  {
    id: 'vagabundo',
    nombre: 'Vagabundo',
    descripcion: 'Creciste sin techo en los márgenes de las urbes, aprendiendo a desconfiar, observar en silencio y valerte de tu ingenio callejero.',
    dote: 'Afortunado',
    detalle: {
      puntuaciones_caracteristica: {
        opciones: ['destreza', 'sabiduria', 'carisma'],
        regla_aumento: { opciones_distribucion: [[2, 1], [1, 1, 1]], maximo: 20 }
      },
      competencias: {
        habilidades: ['perspicacia', 'sigilo'],
        herramientas: { herramienta: 'herramientas_ladron' }
      },
      dote: 'afortunado'
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'daga', texto: 'Daga', cantidad: 2 },
            { id: 'herramientas_ladron', texto: 'Herramientas de ladrón', cantidad: 1 },
            { id: 'juego', texto: 'Juego cualquiera', cantidad: 1 },
            { id: 'bolsa', texto: 'Bolsa', cantidad: 2 },
            { id: 'petate', texto: 'Petate', cantidad: 1 },
            { id: 'ropas_viaje', texto: 'Ropas de viaje', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 16, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [{ id: 'po', texto: 'po', cantidad: 50, moneda: true }]
        }
      ]
    }
  }
];
