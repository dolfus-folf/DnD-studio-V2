export interface ClassFeatureInfo {
  nombre: string;
  descripcion: string;
  nivel: number;
  tipo?: string;
}

export const DND_CLASS_FEATURES: Record<string, ClassFeatureInfo> = {
  // Bárbaro
  'defensa_sin_armadura_barbaro': {
    nombre: 'Defensa sin armadura (Bárbaro)',
    nivel: 1,
    descripcion: 'Mientras no lleves puesta ninguna armadura, tu Clase de Armadura es igual a 10 + tu modificador de Destreza + tu modificador de Constitución. Puedes empuñar un escudo y seguir obteniendo este beneficio.'
  },
  'furia': {
    nombre: 'Furia',
    nivel: 1,
    descripcion: 'Como acción adicional, desatas una fuerza salvaje durante 1 minuto o hasta quedar inconsciente. Obtienes ventaja en tiradas de salvación y pruebas de Fuerza, bonificador de daño por furia (+2) a los ataques cuerpo a cuerpo con Fuerza, y resistencia al daño contundente, cortante y perforante.'
  },
  'maestria_con_armas': {
    nombre: 'Maestría con armas',
    nivel: 1,
    descripcion: 'Tu entrenamiento te permite desbloquear la propiedad de maestría de una cantidad de armas determinada por tu clase (como Hendidura, Desestabilizar, Arrollar, Empujar, Ralentizar, Roce o Mella). Puedes cambiarlas tras finalizar un descanso largo.'
  },
  'ataque_temerario': {
    nombre: 'Ataque temerario',
    nivel: 2,
    descripcion: 'Puedes arrojar toda precaución al viento. En tu primer ataque del turno, puedes decidir atacar de forma temeraria: obtienes ventaja en todos los ataques cuerpo a cuerpo con Fuerza durante este turno, pero los ataques contra ti también tendrán ventaja hasta el inicio de tu siguiente turno.'
  },
  'sentir_el_peligro': {
    nombre: 'Sentir el peligro',
    nivel: 2,
    descripcion: 'Obtienes una percepción sobrenatural del peligro inminente: tienes ventaja en las tiradas de salvación de Destreza contra efectos que puedas ver, como trampas o conjuros, siempre que no estés incapacitado.'
  },

  // Bardo
  'inspiracion_bardica': {
    nombre: 'Inspiración bárdica',
    nivel: 1,
    descripcion: 'Como acción adicional, puedes otorgar un dado de Inspiración bárdica (1d6 a nivel 1) a una criatura aliada situada a 18 m o menos. En los siguientes 10 minutos, puede sumar este dado a una tirada de d20 (ataque, salvación o prueba). Usos iguales a tu modificador de Carisma por descanso largo.'
  },
  'lanzamiento_de_conjuros': {
    nombre: 'Lanzamiento de conjuros',
    nivel: 1,
    descripcion: 'Has aprendido a moldear la realidad y desatar magia arcana o divina a través de tu entrenamiento, instrumento musical o foco místico. Preparas y lanzas conjuros utilizando tus espacios de conjuro disponibles.'
  },
  'aprendiz_de_mucho': {
    nombre: 'Aprendiz de mucho',
    nivel: 2,
    descripcion: 'Puedes sumar la mitad de tu bonificador por competencia (redondeado hacia abajo) a cualquier prueba de característica que hagas y que no incluya ya tu bonificador por competencia.'
  },
  'pericia': {
    nombre: 'Pericia',
    nivel: 2,
    descripcion: 'Tu bonificador por competencia se duplica para cualquier prueba de característica que utilice las habilidades elegidas con pericia.'
  },

  // Brujo
  'pacto_del_brujo': {
    nombre: 'Pacto del brujo',
    nivel: 1,
    descripcion: 'Has sellado un pacto místico con una entidad de otro plano (como un Infernal, Hada, Primigenio o Celestial). Obtienes dones sobrenaturales y lanzas magia mediante la magia del pacto, recuperando todos tus espacios en un descanso corto o largo.'
  },
  'invocaciones_sobrenaturales': {
    nombre: 'Invocaciones sobrenaturales',
    nivel: 1,
    descripcion: 'Fragmentos de conocimiento prohibido que te otorgan capacidades mágicas permanentes, como ver en la oscuridad mágica, lanzar ciertos conjuros a voluntad o fortalecer tus armas y trucos.'
  },

  // Clérigo
  'orden_divina': {
    nombre: 'Orden divina',
    nivel: 1,
    descripcion: 'Dedicas tu servicio sacerdotal a uno de dos caminos sagrados: Protector (competencia con armas marciales y armaduras pesadas) o Taumaturgo (un truco adicional y bonificador a Religión y Perspicacia).'
  },
  'canalizar_divinidad': {
    nombre: 'Canalizar divinidad',
    nivel: 2,
    descripcion: 'Canalizas la energía directa de tu deidad para alimentar efectos milagrosos, como Expulsar muertos vivientes o Chispazo divino para curar o dañar.'
  },

  // Druida
  'orden_druidica': {
    nombre: 'Orden druídica',
    nivel: 1,
    descripcion: 'Eliges una senda de comunión con la naturaleza: Mago primigenio (un truco extra e Inteligencia para Naturaleza) o Guardián (competencia con armas marciales y armaduras medias).'
  },
  'forma_salvaje': {
    nombre: 'Forma salvaje',
    nivel: 2,
    descripcion: 'Como acción adicional, asumes mágicamente la forma de una bestia salvaje que hayas visto. Obtienes sus sentidos, velocidad y ataques mientras conservas tu mente, salvaciones e idioma.'
  },

  // Explorador
  'enemigo_predilecto': {
    nombre: 'Enemigo predilecto',
    nivel: 1,
    descripcion: 'Siempre tienes preparado el conjuro Marca del cazador. Puedes lanzarlo sin gastar un espacio de conjuro una cantidad de veces igual a tu bonificador por competencia por descanso largo.'
  },
  'estilo_de_combate': {
    nombre: 'Estilo de combate',
    nivel: 2,
    descripcion: 'Adoptas una especialización marcial como dote de estilo de combate: Tiro con arco, Defensa, Duelo o Combate con dos armas.'
  },

  // Guerrero
  'segundo_aliento': {
    nombre: 'Segundo aliento',
    nivel: 1,
    descripcion: 'Tienes un pozo de resistencia del que puedes beber para protegerte. En tu turno, como acción adicional, recuperas una cantidad de puntos de golpe igual a 1d10 + tu nivel de guerrero. Usos recargables en descansos.'
  },
  'accion_subita': {
    nombre: 'Acción súbita',
    nivel: 2,
    descripcion: 'Puedes sobrepasar tus límites normales durante un instante. En tu turno, puedes realizar una acción adicional además de tu acción normal y cualquier acción adicional. Se recupera con un descanso corto o largo.'
  },

  // Hechicero
  'magia_innata': {
    nombre: 'Magia innata',
    nivel: 1,
    descripcion: 'Una chispa de magia primigenia brota de tu sangre. Como acción adicional, desatas tu poder interior durante 1 minuto: tu CD de salvación de conjuros aumenta en +1 y tienes ventaja en las tiradas de ataque con conjuros.'
  },
  'metamagia': {
    nombre: 'Metamagia',
    nivel: 2,
    descripcion: 'Obtienes puntos de hechicería para doblar y retorcer las leyes de tus conjuros a tu antojo: Acelerar conjuro, Conjuro sutil, Conjuro cuidadoso o Conjuro potenciado.'
  },

  // Mago
  'recuperacion_arcana': {
    nombre: 'Recuperación arcana',
    nivel: 1,
    descripcion: 'Una vez al día tras finalizar un descanso corto, puedes estudiar tu libro de conjuros y recuperar espacios de conjuro gastados con un nivel combinado igual o menor a la mitad de tu nivel de mago (redondeado hacia arriba).'
  },
  'libro_de_conjuros': {
    nombre: 'Libro de conjuros',
    nivel: 1,
    descripcion: 'El compendio físico donde anotas los secretos arcanos que dominas. Puedes copiar nuevos conjuros que encuentres en tus aventuras y lanzar conjuros rituales directamente desde sus páginas.'
  },

  // Monje
  'defensa_sin_armadura_monje': {
    nombre: 'Defensa sin armadura (Monje)',
    nivel: 1,
    descripcion: 'Mientras no lleves armadura ni empuñes un escudo, tu Clase de Armadura es igual a 10 + tu modificador de Destreza + tu modificador de Sabiduría.'
  },
  'artes_marciales': {
    nombre: 'Artes marciales',
    nivel: 1,
    descripcion: 'Tu dominio del combate sin armas te permite usar Destreza en lugar de Fuerza para ataques desarmados y armas de monje, infligir un dado de artes marciales (1d6) de daño y realizar un ataque desarmado extra como acción adicional.'
  },
  'disciplina_monastica': {
    nombre: 'Foco de enfoque (Disciplina)',
    nivel: 2,
    descripcion: 'Canalizas tu energía interna para alimentar maniobras asombrosas: Ráfaga de golpes (dos ataques desarmados adicionales), Defensa paciente (Esquivar) y Paso del viento (Destrabarse o Correr).'
  },

  // Paladín
  'sentido_divino': {
    nombre: 'Sentido divino',
    nivel: 1,
    descripcion: 'Percibes la presencia de fuerzas celestiales, infernales o no-muertas y lugares consagrados o profanados a menos de 18 metros.'
  },
  'imposicion_de_manos': {
    nombre: 'Imposición de manos',
    nivel: 1,
    descripcion: 'Tu bendición sagrada puede curar heridas. Tienes una reserva de curación igual a 5 × tu nivel de paladín. Como acción adicional o de magia puedes tocar una criatura y restaurar puntos de golpe o curar envenenamiento.'
  },
  'castigo_divino': {
    nombre: 'Castigo divino',
    nivel: 2,
    descripcion: 'Cuando impactas a una criatura con un arma cuerpo a cuerpo o un ataque desarmado, puedes gastar un espacio de conjuro para infligir daño radiante adicional (2d8 para nivel 1 + 1d8 por cada nivel superior).'
  },

  // Pícaro
  'ataque_furtivo': {
    nombre: 'Ataque furtivo',
    nivel: 1,
    descripcion: 'Una vez por turno, puedes infligir 1d6 de daño adicional a una criatura a la que impactes con un arma sutil o a distancia si tienes ventaja en la tirada de ataque, o si un aliado consciente está a 1,5 m de tu objetivo y no tienes desventaja.'
  },
  'jerga_de_ladrones': {
    nombre: 'Jerga de ladrones',
    nivel: 1,
    descripcion: 'Conoces la jerga de ladrones, un dialecto secreto de términos, gestos y símbolos que te permite ocultar mensajes en conversaciones ordinarias.'
  },
  'accion_astuta': {
    nombre: 'Acción astuta',
    nivel: 2,
    descripcion: 'Tu rapidez mental y agilidad te permiten moverte y actuar con una velocidad pasmosa. Puedes llevar a cabo una acción adicional en cada uno de tus turnos para Correr, Destrabarte o Esconderte.'
  }
};

export const getClassFeatureInfo = (featureName: string): ClassFeatureInfo => {
  const norm = featureName.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '_');

  for (const [key, val] of Object.entries(DND_CLASS_FEATURES)) {
    if (norm.includes(key) || key.includes(norm)) {
      return val;
    }
  }

  // Fallback
  return {
    nombre: featureName,
    nivel: 1,
    descripcion: `Rasgo oficial de clase: otorga competencias, capacidades y mecánicas únicas descritas en el Player's Handbook 2024 (SRD 5.2).`
  };
};
