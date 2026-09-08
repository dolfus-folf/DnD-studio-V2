export interface SubclassInfo {
  id: string;
  nombre: string;
  clase: string;
  descripcion: string;
  rasgos: Array<{ nombre: string; nivel: number; descripcion: string }>;
}

export const DND_SUBCLASSES: SubclassInfo[] = [
  // BÁRBARO
  {
    id: 'senda_arbol_mundo',
    nombre: 'Senda del Árbol del Mundo',
    clase: 'barbaro',
    descripcion: 'Canalizan la fuerza vital de Yggdrasil para otorgar puntos de golpe temporales a aliados, manipular ramas espectrales para teletransportar enemigos o aliados y extender su alcance.',
    rasgos: [
      { nombre: 'Vitalidad del Árbol', nivel: 3, descripcion: 'Puntos de golpe temporales al enfurecerte y a un aliado al inicio de cada turno.' },
      { nombre: 'Ramas del Árbol', nivel: 6, descripcion: 'Reacción para teletransportar a una criatura visible hasta ti.' },
      { nombre: 'Raíces apaleadoras', nivel: 10, descripcion: 'Alcance cuerpo a cuerpo aumentado en 3 m y maestría combinada (derribar/empujar).' },
      { nombre: 'Viajar por el árbol', nivel: 14, descripcion: 'Teletransporte masivo para ti y hasta 6 aliados durante la Furia.' }
    ]
  },
  {
    id: 'senda_berserker',
    nombre: 'Senda del Berserker',
    clase: 'barbaro',
    descripcion: 'Ponen su furia al servicio de la violencia pura, desatando frenesí sanguinario, inmunidad a estados mentales y ataques de represalia.',
    rasgos: [
      { nombre: 'Frenesí', nivel: 3, descripcion: 'Daño adicional con dados de furia al usar Ataque temerario.' },
      { nombre: 'Furia irracional', nivel: 6, descripcion: 'Inmunidad a los estados Asustado y Hechizado mientras estás en Furia.' },
      { nombre: 'Represalia', nivel: 10, descripcion: 'Reacción para contraatacar a quien te inflija daño a 1,5 m.' },
      { nombre: 'Presencia intimidante', nivel: 14, descripcion: 'Acción adicional para asustar a enemigos en un radio de 9 m.' }
    ]
  },
  {
    id: 'senda_corazon_salvaje',
    nombre: 'Senda del Corazón Salvaje',
    clase: 'barbaro',
    descripcion: 'Canalizan espíritus totémicos de la naturaleza: Oso (resistencia total), Águila (carrera ágil) o Lobo (ventaja a aliados).',
    rasgos: [
      { nombre: 'Furia de lo salvaje', nivel: 3, descripcion: 'Elige tótem animal: Oso (resistencia a todo excepto psíquico), Águila o Lobo.' },
      { nombre: 'Portavoz de los animales', nivel: 3, descripcion: 'Lanzas Hablar con los animales y Sentidos de la bestia como rituales.' },
      { nombre: 'Aspecto de lo salvaje', nivel: 6, descripcion: 'Dones de viaje: Búho (visión nocturna), Pantera (trepar) o Salmón (nadar).' },
      { nombre: 'Hablante de la naturaleza', nivel: 10, descripcion: 'Lanzas Comunión con la naturaleza como ritual.' },
      { nombre: 'Poder de lo salvaje', nivel: 14, descripcion: 'Dones superiores: Carnero (derribo), Halcón (vuelo sin armadura) o León (desventaja a enemigos).' }
    ]
  },
  {
    id: 'senda_fanatico',
    nombre: 'Senda del Fanático',
    clase: 'barbaro',
    descripcion: 'Guerreros imbuidos de fervor divino que causan daño radiante o necrótico adicional y son revitalizados por deidades en el umbral de la muerte.',
    rasgos: [
      { nombre: 'Furia divina', nivel: 3, descripcion: '1d6 + mitad de nivel en daño radiante o necrótico con el primer golpe.' },
      { nombre: 'Guerrero de los dioses', nivel: 3, descripcion: 'Reserva de d12 para curarte como acción adicional.' },
      { nombre: 'Foco fanático', nivel: 6, descripcion: 'Repites una tirada de salvación fallida sumando tu bonificador de furia.' },
      { nombre: 'Presencia ferviente', nivel: 10, descripcion: 'Grito de guerra que da ventaja en ataques y salvaciones a hasta 10 aliados.' },
      { nombre: 'Furia de los dioses', nivel: 14, descripcion: 'Forma divina al enfurecerte con resistencias y vuelo celestial.' }
    ]
  },

  // BARDO
  {
    id: 'colegio-conocimiento',
    nombre: 'Colegio del conocimiento',
    clase: 'bardo',
    descripcion: 'Eruditos del saber cósmico que dominan múltiples habilidades, lanzan insultos cortantes para mermar tiradas enemigas y roban magia de cualquier clase.',
    rasgos: [
      { nombre: 'Competencias adicionales', nivel: 3, descripcion: 'Competencia en tres habilidades cualesquiera.' },
      { nombre: 'Palabras cortantes', nivel: 3, descripcion: 'Resta tu dado de Inspiración bárdica al ataque, prueba o daño de un enemigo.' },
      { nombre: 'Descubrimientos mágicos', nivel: 6, descripcion: 'Preparas 2 conjuros de cualquier lista (clérigo, druida o mago).' },
      { nombre: 'Habilidad sin parangón', nivel: 14, descripcion: 'Añades Inspiración a pruebas o ataques propios fallidos; no se gasta si no aciertas.' }
    ]
  },
  {
    id: 'colegio-danza',
    nombre: 'Colegio de la danza',
    clase: 'bardo',
    descripcion: 'Artistas marciales del movimiento que luchan sin armadura, asestan patadas deslumbrantes con el ritmo de la música y guían la iniciativa de su grupo.',
    rasgos: [
      { nombre: 'Juego de pies deslumbrante', nivel: 3, descripcion: 'CA = 10 + DES + CAR; ataques sin armas mejorados usando el dado bárdico.' },
      { nombre: 'Juego de pies conjunto', nivel: 6, descripcion: 'Suma tu dado bárdico a la iniciativa tuya y de tus aliados cercanos.' },
      { nombre: 'Movimiento inspirador', nivel: 6, descripcion: 'Reacción para moverte tú y un aliado la mitad de velocidad sin ataques de oportunidad.' },
      { nombre: 'Evasión dirigida', nivel: 14, descripcion: 'Evasión total contra salvaciones de Destreza compartida con un aliado.' }
    ]
  },
  {
    id: 'colegio-glamour',
    nombre: 'Colegio del glamour',
    clase: 'bardo',
    descripcion: 'Tejidos de encanto feérico que cautivan voluntades, conceden armaduras temporales de majestad y ordenan la sumisión de sus adversarios.',
    rasgos: [
      { nombre: 'Magia cautivadora', nivel: 3, descripcion: 'Hechizar persona e Imagen múltiple preparados; fascina o asusta al lanzar encantamientos.' },
      { nombre: 'Manto de inspiración', nivel: 3, descripcion: 'Concede PG temporales y movimiento veloz inmediato sin ataques de oportunidad.' },
      { nombre: 'Manto de majestuosidad', nivel: 6, descripcion: 'Lanzas Orden imperiosa como acción adicional sin gastar espacios de conjuro.' },
      { nombre: 'Majestad inquebrantable', nivel: 14, descripcion: 'Aura majestuosa que hace fallar ataques de enemigos que no superen salvación de CAR.' }
    ]
  },
  {
    id: 'colegio-valor',
    nombre: 'Colegio del valor',
    clase: 'bardo',
    descripcion: 'Trovadores de combate entrenados con armaduras medias, escudos y armas marciales, capaces de lanzar conjuros y atacar en el mismo asalto.',
    rasgos: [
      { nombre: 'Entrenamiento marcial', nivel: 3, descripcion: 'Competencia con armas marciales, armaduras medias, escudos y armas como foco.' },
      { nombre: 'Inspiración en combate', nivel: 3, descripcion: 'Tu Inspiración bárdica puede sumarse a la CA o al daño de un aliado.' },
      { nombre: 'Ataque adicional', nivel: 6, descripcion: 'Dos ataques por acción, pudiendo cambiar uno por un truco mágico.' },
      { nombre: 'Magia de batalla', nivel: 14, descripcion: 'Ataque con arma como acción adicional tras lanzar un conjuro con tu acción.' }
    ]
  },

  // BRUJO
  {
    id: 'patron-celestial',
    nombre: 'Patrón celestial',
    clase: 'brujo',
    descripcion: 'Pacto con ángeles, solares o unicornios que te otorgan una reserva de dados de curación brillante y resistencia a las energías radiantes.',
    rasgos: [
      { nombre: 'Luz sanadora', nivel: 3, descripcion: 'Reserva de dados d6 igual a 1 + nivel para curar con acción adicional a 18 m.' },
      { nombre: 'Alma radiante', nivel: 6, descripcion: 'Resistencia radiante y suma tu CAR al daño radiante o de fuego.' },
      { nombre: 'Resiliencia celestial', nivel: 10, descripcion: 'Concede PG temporales a ti y 5 aliados al descansar o usar Astucia mágica.' },
      { nombre: 'Venganza ardiente', nivel: 14, descripcion: 'Al caer a 0 PG te recuperas al 50% y deslumbras/dañas a enemigos a 9 m.' }
    ]
  },
  {
    id: 'patron-feerico',
    nombre: 'Patrón feérico',
    clase: 'brujo',
    descripcion: 'Pacto con señores de los Parajes Feéricos que confieren teletransportes constantes (Pasos feéricos), engaños ilusorios y escapes brumosos.',
    rasgos: [
      { nombre: 'Pasos feéricos', nivel: 3, descripcion: 'Paso brumoso gratuito tantas veces como tu CAR, con efectos de burla o vitalidad.' },
      { nombre: 'Escape brumoso', nivel: 6, descripcion: 'Paso brumoso reactivo al recibir daño con efectos aterrador o invisible.' },
      { nombre: 'Defensas seductoras', nivel: 10, descripcion: 'Inmunidad a hechizado; refleja daño psíquico a quien te impacte.' },
      { nombre: 'Magia embrujadora', nivel: 14, descripcion: 'Paso brumoso libre tras lanzar encantamientos o ilusiones.' }
    ]
  },
  {
    id: 'patron-infernal',
    nombre: 'Patrón infernal',
    clase: 'brujo',
    descripcion: 'Pacto forjado con archidiablos de los Nueve Infiernos para cosechar almas caídas en puntos de golpe temporales y arrastrar enemigos al averno.',
    rasgos: [
      { nombre: 'Bendición del Oscuro', nivel: 3, descripcion: 'Obtienes PG temporales (CAR + nivel) cuando un enemigo cercano muere.' },
      { nombre: 'La suerte del Oscuro', nivel: 6, descripcion: 'Suma 1d10 a una prueba de característica o tirada de salvación.' },
      { nombre: 'Resistencia infernal', nivel: 10, descripcion: 'Elige un tipo de daño tras cada descanso para obtener resistencia pasiva.' },
      { nombre: 'Arrastrar por el infierno', nivel: 14, descripcion: 'Al acertar un golpe, transportas al enemigo al infierno causando 8d10 de daño psíquico.' }
    ]
  },
  {
    id: 'patron-primigenio',
    nombre: 'Patrón primigenio',
    clase: 'brujo',
    descripcion: 'Vínculo con inteligencias incomprensibles del Reino Lejano o Grandes Antiguos que dotan de telepatía, daño psíquico y aberraciones aliadas.',
    rasgos: [
      { nombre: 'Mente iluminada & Conjuros psíquicos', nivel: 3, descripcion: 'Telepatía a larga distancia y convierte el daño de conjuros en psíquico sin verbales.' },
      { nombre: 'Combatiente clarividente', nivel: 6, descripcion: 'Vínculo telepático hostil que impone desventaja al enemigo y te otorga ventaja.' },
      { nombre: 'Escudo mental & Maleficio superior', nivel: 10, descripcion: 'Pensamientos invulnerables, refleja daño psíquico y Maleficio afecta salvaciones.' },
      { nombre: 'Crear siervo', nivel: 14, descripcion: 'Invoca aberración sin concentración con daño psíquico potenciado.' }
    ]
  },

  // CLÉRIGO
  {
    id: 'dominio-engano',
    nombre: 'Dominio del engaño',
    clase: 'clerigo',
    descripcion: 'Devotos de deidades de la picardía y las sombras que manifiestan duplicados ilusorios perfectos para lanzar conjuros y despistar enemigos.',
    rasgos: [
      { nombre: 'Bendición del embaucador', nivel: 3, descripcion: 'Ventaja en Sigilo para ti o un aliado hasta descanso largo.' },
      { nombre: 'Invocar duplicidad', nivel: 3, descripcion: 'Canalizar divinidad para crear un duplicado ilusorio desde el que lanzar conjuros con ventaja.' },
      { nombre: 'Transposición del embaucador', nivel: 6, descripcion: 'Teletransporte para intercambiar posición con tu ilusión como acción adicional.' },
      { nombre: 'Duplicidad mejorada', nivel: 17, descripcion: 'Tu ilusión otorga ventaja a aliados y cura cuando desaparece.' }
    ]
  },
  {
    id: 'dominio-guerra',
    nombre: 'Dominio de la guerra',
    clase: 'clerigo',
    descripcion: 'Clérigos campeones de la batalla que bendicen sus ataques marciales con precisión sobrenatural (+10) y resistencias de titán.',
    rasgos: [
      { nombre: 'Golpe guiado', nivel: 3, descripcion: 'Canalizar divinidad para sumar +10 a una tirada de ataque fallida tuya o de un aliado.' },
      { nombre: 'Sacerdote guerrero', nivel: 3, descripcion: 'Ataque con arma como acción adicional (tantos como tu mod. de Sabiduría).' },
      { nombre: 'Bendición del dios de la guerra', nivel: 6, descripcion: 'Canalizar para lanzar Arma espiritual o Escudo de fe sin concentración por 1 minuto.' },
      { nombre: 'Avatar de la batalla', nivel: 17, descripcion: 'Resistencia permanente al daño contundente, cortante y perforante.' }
    ]
  },
  {
    id: 'dominio-luz',
    nombre: 'Dominio de la luz',
    clase: 'clerigo',
    descripcion: 'Portadores de la llama solar que deslumbran a sus agresores con fulgores protectores y desatan orbes de fuego y resplandores del amanecer.',
    rasgos: [
      { nombre: 'Fulgor protector', nivel: 3, descripcion: 'Reacción para imponer desventaja a quien te ataque a 9 m.' },
      { nombre: 'Resplandor del amanecer', nivel: 3, descripcion: 'Canalizar para disipar oscuridad mágica y causar 2d10 + nivel radiante en 9 m.' },
      { nombre: 'Fulgor protector mejorado', nivel: 6, descripcion: 'Recuperación de usos en descanso corto y concede PG temporales.' },
      { nombre: 'Halo de luz', nivel: 17, descripcion: 'Aura solar que impone desventaja en salvaciones a enemigos frente a tu fuego y radiante.' }
    ]
  },
  {
    id: 'dominio-vida',
    nombre: 'Dominio de la vida',
    clase: 'clerigo',
    descripcion: 'Canalizadores supremos de la sanación que maximizan la recuperación de puntos de golpe de aliados caídos y preservan la vida en cualquier escenario.',
    rasgos: [
      { nombre: 'Discípulo de la vida', nivel: 3, descripcion: 'Tus conjuros de curación añaden 2 + nivel del conjuro en puntos de golpe.' },
      { nombre: 'Preservar vida', nivel: 3, descripcion: 'Canalizar para repartir una bolsa de 5 x nivel en curación entre heridos.' },
      { nombre: 'Sanador bendito', nivel: 6, descripcion: 'Cuando curas a otro personaje, te curas a ti mismo 2 + nivel del conjuro.' },
      { nombre: 'Sanación suprema', nivel: 17, descripcion: 'Todos los dados de curación que lances arrojan su resultado numérico máximo automáticamente.' }
    ]
  },

  // DRUIDA
  {
    id: 'circulo-estrellas',
    nombre: 'Círculo de las estrellas',
    clase: 'druida',
    descripcion: 'Navegantes celestiales que leen los augurios cósmicos y adoptan constelaciones estelares: Arquero (rayo de luz), Cáliz (sanación) o Dragón (concentración infalible).',
    rasgos: [
      { nombre: 'Forma estelar', nivel: 3, descripcion: 'Gastas Forma salvaje para constelación: Arquero (d8 radiante), Cáliz (curación extra) o Dragón (mínimo 10 en d20).' },
      { nombre: 'Mapa estelar', nivel: 3, descripcion: 'Guía y Saeta guía preparados; lanzamientos gratuitos de Saeta guía igual a Sabiduría.' },
      { nombre: 'Presagio cósmico', nivel: 6, descripcion: 'Reacción para sumar o restar 1d6 a pruebas d20 de aliados o enemigos.' },
      { nombre: 'Constelaciones centelleantes', nivel: 10, descripcion: 'Mejora los dados a 2d8 y Dragón concede velocidad de vuelo 6 m.' },
      { nombre: 'Colmado de luz estelar', nivel: 14, descripcion: 'Resistencia al daño físico (contundente, cortante, perforante) en Forma estelar.' }
    ]
  },
  {
    id: 'circulo-luna',
    nombre: 'Círculo de la luna',
    clase: 'druida',
    descripcion: 'Especialistas en transformaciones combativas formidables, con formas de bestia de mayor desafío, daño radiante y pasos de luz lunar.',
    rasgos: [
      { nombre: 'Formas del círculo', nivel: 3, descripcion: 'Formas salvajes hasta VD nivel/3, CA = 13 + SAB y PG temporales de 3 x nivel.' },
      { nombre: 'Formas mejoradas', nivel: 6, descripcion: 'Ataques de bestia con daño radiante y suma SAB a salvaciones de Constitución.' },
      { nombre: 'Paso de la luz lunar', nivel: 10, descripcion: 'Teletransporte 9m con ventaja en tu siguiente ataque como acción adicional.' },
      { nombre: 'Forma lunar', nivel: 14, descripcion: 'Teletransporta a un aliado contigo y añade 2d10 de daño radiante por asalto.' }
    ]
  },
  {
    id: 'circulo-mar',
    nombre: 'Círculo del mar',
    clase: 'druida',
    descripcion: 'Vástagos de mareas y tempestades que envuelven su cuerpo en una tempestad marina de agua fría, empujando adversarios con la furia del océano.',
    rasgos: [
      { nombre: 'Ira de los mares', nivel: 3, descripcion: 'Emanación acuática de 1,5 m que causa daño de frío (d6 x SAB) y empuja 4,5 m.' },
      { nombre: 'Afinidad acuática', nivel: 6, descripcion: 'Emanación de 3 m y velocidad nadando igual a tu velocidad.' },
      { nombre: 'Nacido de la tempestad', nivel: 10, descripcion: 'Resistencia a frío, relámpago y trueno, con velocidad de vuelo por la tempestad.' },
      { nombre: 'Obsequio oceánico', nivel: 14, descripcion: 'Comparte el aura de tempestad con un aliado o ambos a la vez.' }
    ]
  },
  {
    id: 'circulo-tierra',
    nombre: 'Círculo de la tierra',
    clase: 'druida',
    descripcion: 'Místicos sintonizados con la magia telúrica de biomas áridos, polares, templados o tropicales, recuperando magia con reposo natural.',
    rasgos: [
      { nombre: 'Ayuda de la tierra', nivel: 3, descripcion: 'Esfera de 3m que daña con necrótico y cura a un aliado.' },
      { nombre: 'Conjuros del círculo', nivel: 3, descripcion: 'Elige bioma tras descanso largo para obtener conjuros temáticos siempre listos.' },
      { nombre: 'Recuperación natural', nivel: 6, descripcion: 'Recupera espacios de conjuro en descansos cortos y un conjuro gratis.' },
      { nombre: 'Protección de la naturaleza', nivel: 10, descripcion: 'Inmunidad a veneno y resistencia elemental según el bioma activo.' },
      { nombre: 'Santuario de la naturaleza', nivel: 14, descripcion: 'Crea un bosque protector espectral que otorga cobertura y resistencias.' }
    ]
  },

  // EXPLORADOR
  {
    id: 'acechador_en_la_penumbra',
    nombre: 'Acechador en la penumbra',
    clase: 'explorador',
    descripcion: 'Maestro de la Infraoscuridad y las tinieblas que embosca desde las sombras, invisible a la visión en la oscuridad y golpeando con furia inicial.',
    rasgos: [
      { nombre: 'Emboscador pavoroso', nivel: 3, descripcion: 'Iniciativa aumentada, velocidad extra y daño adicional en el primer asalto.' },
      { nombre: 'Visión en la umbra', nivel: 3, descripcion: 'Visión en la oscuridad 18m e invisible para criaturas que dependan de ella.' },
      { nombre: 'Mente de hierro', nivel: 7, descripcion: 'Competencia en tiradas de salvación de Sabiduría.' },
      { nombre: 'Oleada del acechador', nivel: 11, descripcion: 'Ataques adicionales cuando fallas una tirada en tu turno.' },
      { nombre: 'Esquiva de las sombras', nivel: 15, descripcion: 'Reacción para imponer desventaja a quien te ataque sin ventaja.' }
    ]
  },
  {
    id: 'cazador',
    nombre: 'Cazador',
    clase: 'explorador',
    descripcion: 'Depredador táctico experto en derribar hordas de enemigos o gigantes mediante maniobras especializadas como Coloso, Torbellino y Evasión.',
    rasgos: [
      { nombre: 'El cazador y la presa', nivel: 3, descripcion: 'Asesino de colosos (daño extra a heridos) o Rompehordas (ataque a enemigo adyacente).' },
      { nombre: 'Sabiduría del cazador', nivel: 3, descripcion: 'Averigua vulnerabilidades, resistencias e inmunidades del objetivo de tu marca.' },
      { nombre: 'Tácticas defensivas', nivel: 7, descripcion: 'Defensas contra ataques múltiples o ventaja contra derribos/miedos.' },
      { nombre: 'El cazador experto', nivel: 11, descripcion: 'Ataques múltiples de ráfaga o contraataques demoledores.' },
      { nombre: 'Defensa de cazador experto', nivel: 15, descripcion: 'Evasión total o esquiva reactiva infalible.' }
    ]
  },
  {
    id: 'errante_feerico',
    nombre: 'Errante feérico',
    clase: 'explorador',
    descripcion: 'Guerrero impregnado de la magia caprichosa de los Parajes Feéricos, sumando su Sabiduría al Carisma y castigando con daño psíquico.',
    rasgos: [
      { nombre: 'Glamur sobrenatural', nivel: 3, descripcion: 'Suma tu modificador de Sabiduría a todas las pruebas de Carisma.' },
      { nombre: 'Golpes pavorosos', nivel: 3, descripcion: '1d4 de daño psíquico adicional una vez por turno con armas.' },
      { nombre: 'Giro seductor', nivel: 7, descripcion: 'Ventaja contra hechizado/asustado; redirige el estado a un enemigo cuando se supere.' },
      { nombre: 'Refuerzos feéricos', nivel: 11, descripcion: 'Conjuras seres feéricos sin gastar concentración.' },
      { nombre: 'Errante brumoso', nivel: 15, descripcion: 'Paso brumoso a voluntad para ti y un aliado.' }
    ]
  },
  {
    id: 'senor_de_las_bestias',
    nombre: 'Señor de las bestias',
    clase: 'explorador',
    descripcion: 'Forja un lazo espiritual irrompible con un compañero primigenio de tierra, mar o cielo que combate coordinadamente en tu mismo turno.',
    rasgos: [
      { nombre: 'Compañero primigenio', nivel: 3, descripcion: 'Invocas una bestia primigenia de tierra, mar o aire que ataca con tu acción o ataque.' },
      { nombre: 'Entrenamiento excepcional', nivel: 7, descripcion: 'La bestia corre, se destraba o ayuda como acción adicional; sus ataques son mágicos.' },
      { nombre: 'Furia bestial', nivel: 11, descripcion: 'La bestia realiza dos ataques y se beneficia de Marca del cazador.' },
      { nombre: 'Compartir conjuros', nivel: 15, descripcion: 'Los conjuros que te lances a ti mismo también afectan a tu bestia a 9 m.' }
    ]
  },

  // GUERRERO
  {
    id: 'caballero_arcano',
    nombre: 'Caballero arcano',
    clase: 'guerrero',
    descripcion: 'Combina el entrenamiento con armas marciales con la magia arcana de la escuela de mago, vinculando su arma y lanzando trucos en combate.',
    rasgos: [
      { nombre: 'Lanzamiento de conjuros & Vínculo de guerra', nivel: 3, descripcion: 'Conjuros de mago con INT y vínculo con hasta dos armas que puedes convocar a tu mano.' },
      { nombre: 'Magia de guerra', nivel: 7, descripcion: 'Sustituye uno de tus ataques por un truco mágico de acción.' },
      { nombre: 'Golpe sobrenatural', nivel: 10, descripcion: 'Quien reciba un impacto tuyo tiene desventaja en salvación contra tu siguiente conjuro.' },
      { nombre: 'Carga arcana', nivel: 15, descripcion: 'Teletransporte de 9 m cuando usas tu Acción súbita.' },
      { nombre: 'Magia de guerra mejorada', nivel: 18, descripcion: 'Sustituye dos ataques por un conjuro de nivel 1 o 2.' }
    ]
  },
  {
    id: 'campeon',
    nombre: 'Campeón',
    clase: 'guerrero',
    descripcion: 'La cúspide de la potencia física y la simplicidad letal: asesta golpes críticos con 19-20, adquiere estilos de combate extra y regenera salud.',
    rasgos: [
      { nombre: 'Crítico mejorado (19-20)', nivel: 3, descripcion: 'Tus ataques con armas logran un golpe crítico con 19 o 20 en el d20.' },
      { nombre: 'Atleta sobresaliente', nivel: 3, descripcion: 'Ventaja en iniciativa y pruebas de atletismo; aumentan tus saltos.' },
      { nombre: 'Estilo de combate adicional', nivel: 7, descripcion: 'Ganas un segundo Estilo de combate a tu elección.' },
      { nombre: 'Guerrero heroico', nivel: 10, descripcion: 'Ganas Inspiración heroica al inicio de tu turno si no la tienes.' },
      { nombre: 'Crítico superior (18-20)', nivel: 15, descripcion: 'Tus críticos se producen con 18, 19 o 20 en el d20.' },
      { nombre: 'Superviviente', nivel: 18, descripcion: 'Regeneras 5 + CON en puntos de golpe cada turno mientras estés a menos del 50% de PG.' }
    ]
  },
  {
    id: 'guerrero_psionico',
    nombre: 'Guerrero psiónico',
    clase: 'guerrero',
    descripcion: 'Canaliza el poder puro de su mente en dados de energía psiónica para impulsar sus golpes, levantar escudos telequinéticos y levitar.',
    rasgos: [
      { nombre: 'Poder psiónico', nivel: 3, descripcion: 'Reserva de dados psiónicos para Golpe protector, Golpe psiónico y Movimiento telequinético.' },
      { nombre: 'Adepto telequinético', nivel: 7, descripcion: 'Salto psiónico con velocidad de vuelo y empujón telequinético.' },
      { nombre: 'Mente robusta', nivel: 10, descripcion: 'Resistencia al daño psíquico y fin de condiciones de asustado o hechizado.' },
      { nombre: 'Bastión de fuerza', nivel: 15, descripcion: 'Concede media cobertura a aliados cercanos con barreras invisibles.' },
      { nombre: 'Maestro telequinético', nivel: 18, descripcion: 'Lanzas Telequinesis gratis una vez por descanso largo con acción adicional.' }
    ]
  },
  {
    id: 'maestro_del_combate',
    nombre: 'Maestro del combate',
    clase: 'guerrero',
    descripcion: 'Estratega marcial virtuoso que ejecuta maniobras especializadas (Derribo, Desarme, Finta, Parada, Ataque de distracción) usando dados de superioridad.',
    rasgos: [
      { nombre: 'Supremacía en combate (4 dados d8)', nivel: 3, descripcion: 'Aprende 3 maniobras de combate alimentadas por dados de superioridad d8.' },
      { nombre: 'Estudioso de la guerra', nivel: 3, descripcion: 'Competencia con una herramienta de artesano e Historia.' },
      { nombre: 'Conoce a tu enemigo', nivel: 7, descripcion: 'Analiza al enemigo para discernir características y dados d10.' },
      { nombre: 'Supremacía mejorada (d10 / d12)', nivel: 10, descripcion: 'Los dados se convierten en d10 (a Nv.10) y d12 (a Nv.18).' },
      { nombre: 'Incansable', nivel: 15, descripcion: 'Recuperas 1 dado de superioridad al tirar iniciativa si no te queda ninguno.' }
    ]
  },

  // HECHICERO
  {
    id: 'hechiceria_aberrante',
    nombre: 'Hechicería aberrante',
    clase: 'hechicero',
    descripcion: 'Poder nacido de una infección por azotamentes o contacto con el Reino Lejano: telepatía, conjuros psiónicos sutiles y metamorfosis tentacular.',
    rasgos: [
      { nombre: 'Conjuros psiónicos & Habla telepática', nivel: 3, descripcion: 'Conjuros psiónicos adicionales y telepatía mental silenciosa con criaturas a la vista.' },
      { nombre: 'Defensas psíquicas & Hechicería psiónica', nivel: 6, descripcion: 'Resistencia a daño psíquico y lanzas conjuros psiónicos con puntos de hechicería sin componentes.' },
      { nombre: 'Revelación en carne', nivel: 14, descripcion: 'Gastas puntos para volar, nadar, ver invisibilidad y atravesar aberturas angostas.' },
      { nombre: 'Implosión deformadora', nivel: 18, descripcion: 'Creas un agujero negro que arrastra y daña con 3d10 de fuerza a los enemigos.' }
    ]
  },
  {
    id: 'hechiceria_de_magia_salvaje',
    nombre: 'Hechicería de magia salvaje',
    clase: 'hechicero',
    descripcion: 'Manipulador del caos cósmico impredecible que desata tablas de sobrecarga mágica aleatoria, dobla la suerte y controla el azar.',
    rasgos: [
      { nombre: 'Mareas del caos', nivel: 3, descripcion: 'Ventaja voluntaria en un d20; recarga al detonar una Sobrecarga de magia salvaje.' },
      { nombre: 'Sobrecarga de magia salvaje', nivel: 3, descripcion: 'Tira en la tabla de magia salvaje tras usar Mareas o lanzar conjuros de espacio.' },
      { nombre: 'Doblegar la suerte', nivel: 6, descripcion: 'Reacción para sumar o restar 1d4 a la tirada de otra criatura por 2 puntos.' },
      { nombre: 'Caos controlado', nivel: 14, descripcion: 'Tiras dos veces en la tabla de magia salvaje y eliges el efecto que prefieras.' },
      { nombre: 'Sobrecarga domada', nivel: 18, descripcion: 'Canalizas efectos de la tabla de magia salvaje a discreción.' }
    ]
  },
  {
    id: 'hechiceria_draconica',
    nombre: 'Hechicería dracónica',
    clase: 'hechicero',
    descripcion: 'La magia de los dragones antiguos corre por tus venas: piel escamosa como armadura natural, alas de dragón y afinidad elemental devastadora.',
    rasgos: [
      { nombre: 'Resistencia dracónica', nivel: 3, descripcion: 'CA base = 10 + DES + CAR y +1 punto de golpe máximo por cada nivel.' },
      { nombre: 'Conjuros dracónicos', nivel: 3, descripcion: 'Conjuros elementales siempre preparados según tu tipo de dragón ancestral.' },
      { nombre: 'Afinidad elemental', nivel: 6, descripcion: 'Suma CAR al daño del elemento y resistencia al daño gastando 1 punto.' },
      { nombre: 'Alas de dragón', nivel: 14, descripcion: 'Alas que otorgan velocidad de vuelo igual a tu velocidad como acción adicional.' },
      { nombre: 'Compañero dragón', nivel: 18, descripcion: 'Invocas un dragón espiritual legendario sin gastar espacio de conjuro.' }
    ]
  },
  {
    id: 'hechiceria_mecanica',
    nombre: 'Hechicería mecánica',
    clase: 'hechicero',
    descripcion: 'Sintonizado con el plano del orden absoluto (Mechanus) para neutralizar la ventaja/desventaja del caos y rodearse de escudos de engranajes rúnicos.',
    rasgos: [
      { nombre: 'Restablecer equilibrio', nivel: 3, descripcion: 'Reacción para cancelar ventajas o desventajas en una prueba de d20 a 18 m.' },
      { nombre: 'Conjuros mecánicos', nivel: 3, descripcion: 'Conjuros de ley y orden siempre preparados de Mechanus.' },
      { nombre: 'Bastión de la ley', nivel: 6, descripcion: 'Escudo protector que absorbe daño usando dados de hechicería transferibles.' },
      { nombre: 'Trance de orden', nivel: 14, descripcion: 'Modo donde los resultados de d20 menores que 9 se tratan como 10.' },
      { nombre: 'Cabalgata mecánica', nivel: 18, descripcion: 'Invocas espíritus mecánicos que restauran 100 PG y reparan objetos rotos.' }
    ]
  },

  // MAGO
  {
    id: 'abjurador',
    nombre: 'Abjurador',
    clase: 'mago',
    descripcion: 'Especialista en barreras de protección mágica, cancelaciones de conjuros y la legendaria Salvaguarda arcana que absorbe daño.',
    rasgos: [
      { nombre: 'Experto en abjuración', nivel: 3, descripcion: 'Añade dos abjuraciones gratis y reduce a la mitad el coste de transcribirlas.' },
      { nombre: 'Salvaguarda arcana', nivel: 3, descripcion: 'Barrera mágica (2x nivel + INT) que absorbe daño y se recarga al lanzar abjuraciones.' },
      { nombre: 'Salvaguarda proyectada', nivel: 6, descripcion: 'Usa tu salvaguarda para absorber daño que fuera a recibir un aliado cercano.' },
      { nombre: 'Rompeconjuros', nivel: 10, descripcion: 'Contrahechizo y Disipar magia siempre preparados; Disipar magia como acción adicional.' },
      { nombre: 'Resistencia a conjuros', nivel: 14, descripcion: 'Ventaja en salvaciones contra conjuros y resistencia al daño causado por conjuros.' }
    ]
  },
  {
    id: 'adivino',
    nombre: 'Adivino',
    clase: 'mago',
    descripcion: 'Maestro del tiempo y la clarividencia que sustituye tiradas del destino mediante dados de Presagio y abre su Tercer Ojo para ver lo invisible.',
    rasgos: [
      { nombre: 'Presagio (2 dados d20)', nivel: 3, descripcion: 'Tira 2 dados d20 tras descansar; puedes sustituir cualquier tirada propia o ajena por ellos.' },
      { nombre: 'Adivino avezado', nivel: 6, descripcion: 'Al lanzar adivinaciones recuperas espacios de conjuro de nivel inferior.' },
      { nombre: 'El tercer ojo', nivel: 10, descripcion: 'Acción adicional para ver invisibilidad, en la oscuridad o comprender lenguajes.' },
      { nombre: 'Presagio mayor (3 dados d20)', nivel: 14, descripcion: 'Tiras 3 dados de Presagio tras cada descanso largo.' }
    ]
  },
  {
    id: 'evocador',
    nombre: 'Evocador',
    clase: 'mago',
    descripcion: 'Dominador del poder destructivo elemental que esculpe sus bolas de fuego para no dañar a aliados y sobrecanaliza el daño al máximo.',
    rasgos: [
      { nombre: 'Truco potente', nivel: 3, descripcion: 'Tus trucos causan la mitad de daño incluso cuando el objetivo supera la salvación o fallas.' },
      { nombre: 'Esculpir conjuros', nivel: 6, descripcion: 'Crea bolsas de seguridad donde tus aliados no sufren daño de tus áreas de evocación.' },
      { nombre: 'Evocación potenciada', nivel: 10, descripcion: 'Suma tu modificador de Inteligencia a las tiradas de daño de tus conjuros de evocación.' },
      { nombre: 'Sobrecanalizar', nivel: 14, descripcion: 'Maximiza el daño de un conjuro de niveles 1 a 5 automáticamente.' }
    ]
  },
  {
    id: 'ilusionista',
    nombre: 'Ilusionista',
    clase: 'mago',
    descripcion: 'Ilusionista supremo capaz de engañar todos los sentidos, proyectar dobles de escape reactivos y volver tangibles las ilusiones en la realidad.',
    rasgos: [
      { nombre: 'Ilusiones mejoradas', nivel: 3, descripcion: 'Ilusión menor como acción adicional con sonido e imagen combinados.' },
      { nombre: 'Criaturas fantasmas', nivel: 6, descripcion: 'Invocar bestia e Invocar feérico preparados y lanzables como ilusiones sutiles.' },
      { nombre: 'Yo ilusorio', nivel: 10, descripcion: 'Reacción para interponer un doble ilusorio que hace fallar un ataque que te acierte.' },
      { nombre: 'Realidad ilusoria', nivel: 14, descripcion: 'Vuelve real y físico un objeto inanimado de una de tus ilusiones durante 1 minuto.' }
    ]
  },

  // MONJE
  {
    id: 'guerrero_de_la_mano_abierta',
    nombre: 'Guerrero de la mano abierta',
    clase: 'monje',
    descripcion: 'Tradición monástica clásica que domina el control físico del oponente: derribos con ráfagas, empujones, autocuración y la Palma estremecedora.',
    rasgos: [
      { nombre: 'Técnica de la mano abierta', nivel: 3, descripcion: 'Ráfaga de golpes puede derribar, empujar 4,5 m o impedir reacciones del enemigo.' },
      { nombre: 'Plenitud de cuerpo', nivel: 6, descripcion: 'Acción adicional para curarte con tu dado de artes marciales + SAB.' },
      { nombre: 'Paso veloz', nivel: 11, descripcion: 'Paso del viento gratuito inmediatamente después de otra acción adicional.' },
      { nombre: 'Palma estremecedora', nivel: 17, descripcion: 'Vibraciones letales que reducen a 0 PG o causan 10d12 de daño de fuerza.' }
    ]
  },
  {
    id: 'guerrero_de_la_misericordia',
    nombre: 'Guerrero de la misericordia',
    clase: 'monje',
    descripcion: 'Manipuladores del flujo de la vida que sanan a los desvalidos con su Mano de curación y causan aflicciones necróticas a los crueles.',
    rasgos: [
      { nombre: 'Mano de curación & Mano de aflicción', nivel: 3, descripcion: 'Gasta concentración para restaurar PG con tus golpes o causar daño necrótico.' },
      { nombre: 'Toque de galeno', nivel: 6, descripcion: 'Cura envenenamiento, ceguera, sordera o paralización con la Mano de curación.' },
      { nombre: 'Ráfaga de curación y aflicción', nivel: 11, descripcion: 'Combina curación y daño en la misma Ráfaga de golpes sin coste extra.' },
      { nombre: 'Mano de misericordia', nivel: 17, descripcion: 'Devuelve la vida a criaturas muertas recientemente gastando 5 de concentración.' }
    ]
  },
  {
    id: 'guerrero_de_la_sombra',
    nombre: 'Guerrero de la sombra',
    clase: 'monje',
    descripcion: 'Asesinos e infiltradores sigilosos que se funden con la penumbra, se teletransportan de sombra a sombra y se envuelven en oscuridad mágica.',
    rasgos: [
      { nombre: 'Artes sombrías', nivel: 3, descripcion: 'Lanzas Oscuridad que puedes mover y ver a través de ella; visión en la oscuridad 18m.' },
      { nombre: 'Paso sombrío', nivel: 6, descripcion: 'Acción adicional para teletransportarte 18 m de sombra a sombra con ventaja en ataque.' },
      { nombre: 'Manto de sombras', nivel: 11, descripcion: 'Invisibilidad en luz tenue u oscuridad como acción de magia.' },
      { nombre: 'Forma de sombra', nivel: 17, descripcion: 'Gastas concentración para atravesar paredes y volver tus ataques incorpóreos.' }
    ]
  },
  {
    id: 'guerrero_de_los_elementos',
    nombre: 'Guerrero de los elementos',
    clase: 'monje',
    descripcion: 'Monjes que canalizan fuego, frío, trueno y ácido en sus golpes desarmados, extendiendo su alcance y desatando explosiones elementales.',
    rasgos: [
      { nombre: 'Armonía con los elementos', nivel: 3, descripcion: 'Tus ataques sin armas alcanzan 4,5 m y causan daño elemental (fuego, frío, ácido o relámpago).' },
      { nombre: 'Manipular los elementos', nivel: 3, descripcion: 'Conoces el truco Elementalismo.' },
      { nombre: 'Explosión elemental', nivel: 6, descripcion: 'Esfera de 6 m de daño elemental a 36 m gastando concentración.' },
      { nombre: 'Paso de los elementos', nivel: 11, descripcion: 'Velocidad volando y nadando igual a tu velocidad en armonía.' },
      { nombre: 'Paradigma elemental', nivel: 17, descripcion: 'Resistencia elemental y medio daño a quien termine cerca de ti.' }
    ]
  },

  // PALADÍN
  {
    id: 'juramento_de_entrega',
    nombre: 'Juramento de entrega',
    clase: 'paladin',
    descripcion: 'El paladín devoto arquetípico de justicia y honor: su Arma sagrada emite luz y suma Carisma al ataque, y su aura protege contra encantos.',
    rasgos: [
      { nombre: 'Arma sagrada', nivel: 3, descripcion: 'Canalizar para imbuir tu arma con luz brillante y sumar CAR a todas las tiradas de ataque.' },
      { nombre: 'Conjuros del juramento', nivel: 3, descripcion: 'Protección contra el bien y el mal, Santuario, Auxilio, Zona de la verdad, etc.' },
      { nombre: 'Aura de entrega', nivel: 7, descripcion: 'Inmunidad al estado Hechizado para ti y todos los aliados dentro de tu aura.' },
      { nombre: 'Castigo protector', nivel: 15, descripcion: 'Castigo divino otorga media cobertura a tus aliados cercanos.' },
      { nombre: 'Halo sagrado', nivel: 20, descripcion: 'Transformación divina durante 10 minutos con luz solar y daño radiante a enemigos.' }
    ]
  },
  {
    id: 'juramento_de_gloria',
    nombre: 'Juramento de gloria',
    clase: 'paladin',
    descripcion: 'Héroes legendarios motivados por la búsqueda de hazañas épicas, velocidad asombrosa y el vigor atlético que inspira a sus compañeros.',
    rasgos: [
      { nombre: 'Atleta sin parangón & Castigo inspirador', nivel: 3, descripcion: 'Ventaja en atletismo/saltos y reparte PG temporales tras usar Castigo.' },
      { nombre: 'Conjuros del juramento', nivel: 3, descripcion: 'Salto, Saeta guía, Aumentar característica, Acelerar, etc.' },
      { nombre: 'Aura de celeridad', nivel: 7, descripcion: '+3 m de velocidad para ti y todos los aliados en tu aura.' },
      { nombre: 'Defensa gloriosa', nivel: 15, descripcion: 'Reacción para sumar tu CAR a la CA de un aliado y contraatacar si el ataque falla.' },
      { nombre: 'Leyenda viviente', nivel: 20, descripcion: 'Ventaja en pruebas de CAR, repites ataques fallidos y salvaciones como reacción.' }
    ]
  },
  {
    id: 'juramento_de_los_antiguos',
    nombre: 'Juramento de los antiguos',
    clase: 'paladin',
    descripcion: 'Caballeros verdes comprometidos con la belleza, la luz y la naturaleza ancestral, con un aura que protege contra daño mágico elemental.',
    rasgos: [
      { nombre: 'Ira de la naturaleza', nivel: 3, descripcion: 'Canalizar para apresar con enredaderas espectrales a enemigos a 3 m.' },
      { nombre: 'Conjuros del juramento', nivel: 3, descripcion: 'Enmarañar, Golpe apresador, Rayo de luna, Paso brumoso, etc.' },
      { nombre: 'Aura de salvaguarda', nivel: 7, descripcion: 'Resistencia a daño necrótico, psíquico y radiante para ti y aliados en el aura.' },
      { nombre: 'Centinela imperecedero', nivel: 15, descripcion: 'Al caer a 0 PG quedas a 1 PG; inmunidad a envejecimiento mágico.' },
      { nombre: 'Campeón ancestral', nivel: 20, descripcion: 'Regeneras 10 PG por turno y lanzas conjuros como acción adicional.' }
    ]
  },
  {
    id: 'juramento_de_venganza',
    nombre: 'Juramento de venganza',
    clase: 'paladin',
    descripcion: 'Castigadores implacables que juran aniquilar a los malhechores a cualquier precio, persiguiendo a su presa con Voto de enemistad.',
    rasgos: [
      { nombre: 'Voto de enemistad', nivel: 3, descripcion: 'Canalizar como acción adicional: ventaja en todas tus tiradas de ataque contra un enemigo por 1 minuto.' },
      { nombre: 'Conjuros del juramento', nivel: 3, descripcion: 'Perdición, Marca del cazador, Inmovilizar persona, Paso brumoso, etc.' },
      { nombre: 'Vengador implacable', nivel: 7, descripcion: 'Cuando aciertas un ataque de oportunidad, te mueves hasta la mitad de tu velocidad.' },
      { nombre: 'Alma de venganza', nivel: 15, descripcion: 'Atacas con reacción siempre que el objetivo de tu Voto de enemistad realice un ataque.' },
      { nombre: 'Ángel vengador', nivel: 20, descripcion: 'Alas de venganza con velocidad de vuelo 18m y aura de terror paralizante.' }
    ]
  },

  // PÍCARO
  {
    id: 'asesino',
    nombre: 'Asesino',
    clase: 'picaro',
    descripcion: 'Especialista en infiltración y eliminación súbita: ventaja en el primer asalto contra quienes aún no han actuado y letalidad crítica contra presas desprevenidas.',
    rasgos: [
      { nombre: 'Asesinar', nivel: 3, descripcion: 'Ventaja en tiradas de ataque e iniciativa contra criaturas que no hayan actuado en el combate.' },
      { nombre: 'Herramientas de asesino', nivel: 3, descripcion: 'Competencia con útiles de envenenador y de disfraz.' },
      { nombre: 'Pericia en infiltrarse', nivel: 9, descripcion: 'Imitación de voces y caligrafía; Puntería certera no reduce tu velocidad.' },
      { nombre: 'Envenenar armas', nivel: 13, descripcion: 'Añade 2d6 de veneno a tu Golpe astuto ignorando resistencias.' },
      { nombre: 'Golpe mortal', nivel: 17, descripcion: 'Si aciertas un ataque sorpresa en el primer asalto, duplicas todo el daño del ataque.' }
    ]
  },
  {
    id: 'embaucador_arcano',
    nombre: 'Embaucador Arcano',
    clase: 'picaro',
    descripcion: 'Ladrón que combina sigilo con magia de ilusionismo y encantamiento de mago, controlando una Mano de mago invisible para carterear.',
    rasgos: [
      { nombre: 'Lanzamiento de conjuros & Mano de mago diestra', nivel: 3, descripcion: 'Conjuros de mago con INT y Mano de mago invisible como acción adicional para robar.' },
      { nombre: 'Emboscada mágica', nivel: 9, descripcion: 'Si estás escondido al lanzar un conjuro, el objetivo tiene desventaja en la salvación.' },
      { nombre: 'Embaucador versátil', nivel: 13, descripcion: 'Tu Mano de mago puede derribar a un enemigo adyacente con Golpe astuto.' },
      { nombre: 'Ladrón de conjuros', nivel: 17, descripcion: 'Reacción para anular un conjuro que te hagan y poder lanzarlo tú mismo durante 8 horas.' }
    ]
  },
  {
    id: 'ladron',
    nombre: 'Ladrón',
    clase: 'picaro',
    descripcion: 'El maestro del robo clásico: trepa muros con agilidad asombrosa, usa objetos mágicos de cualquier clase y actúa dos veces en el primer asalto.',
    rasgos: [
      { nombre: 'Manos rápidas & Balconero', nivel: 3, descripcion: 'Acción de utilizar objeto o herramientas de ladrón como acción adicional y velocidad de trepar.' },
      { nombre: 'Sigilo supremo', nivel: 9, descripcion: 'Golpe astuto que te mantiene invisible aunque attaques si tienes cobertura.' },
      { nombre: 'Usar objetos mágicos', nivel: 13, descripcion: 'Sintoniza 4 objetos mágicos y puedes usar pergaminos de cualquier clase con INT.' },
      { nombre: 'Reflejos de ladrón', nivel: 17, descripcion: 'Disfrutas de dos turnos completos en el primer asalto de cualquier combate.' }
    ]
  },
  {
    id: 'rebanaalmas',
    nombre: 'Rebanaalmas',
    clase: 'picaro',
    descripcion: 'Asesino psiónico que materializa cuchillas psíquicas luminosas en sus manos desnudas, se teletransporta por el plano astral y desgarra mentes.',
    rasgos: [
      { nombre: 'Cuchillas psíquicas (1d6 / 1d4)', nivel: 3, descripcion: 'Armas psíquicas sutiles arrojadizas que no dejan huellas físicas.' },
      { nombre: 'Poder psiónico', nivel: 3, descripcion: 'Reserva de dados psiónicos para telepatía y bonificaciones a pruebas de habilidad.' },
      { nombre: 'Cuchillas del alma', nivel: 9, descripcion: 'Ataques teledirigidos psíquicos y teletransporte de hasta 18 m con el dado.' },
      { nombre: 'Velo psíquico', nivel: 13, descripcion: 'Invisibilidad total durante 1 hora como acción de magia.' },
      { nombre: 'Desgarro mental', nivel: 17, descripcion: 'Tu Ataque furtivo puede aturdir a la víctima durante 1 minuto tras fallar salvación de SAB.' }
    ]
  }
];
