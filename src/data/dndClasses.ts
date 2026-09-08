import { ClassDefinition } from '../types';

export const DND_CLASSES: ClassDefinition[] = [
  {
    id: 'barbaro',
    nombre: 'Bárbaro',
    caracteristica_principal: 'fuerza',
    descripcion: 'Combatiente poderoso que canaliza fuerzas primigenias mediante la furia, aumentando su resistencia, fuerza y capacidad de combate.',
    atributos_basicos: {
      caracteristica_principal: 'fuerza',
      dado_puntos_golpe: '1d12',
      salvaciones: ['fuerza', 'constitucion'],
      habilidades: {
        cantidad: 2,
        opciones: ['atletismo', 'intimidacion', 'naturaleza', 'percepcion', 'supervivencia', 'trato_con_animales']
      },
      competencias: {
        armas: ['armas_sencillas', 'armas_marciales'],
        armaduras: ['armaduras_ligeras', 'armaduras_medias', 'escudos']
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'hacha_a_dos_manos', texto: 'Hacha a dos manos', cantidad: 1 },
            { id: 'hacha_de_mano', texto: 'Hacha de mano', cantidad: 4 },
            { id: 'paquete_explorador', texto: 'Paquete de explorador', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 15, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 75, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, numero_furias: 2, bonificador_furia: 2, maestria_armas: 2, rasgos: ['Defensa sin armadura', 'Furia', 'Maestría con armas'] },
      { nivel: 2, bonificador_competencia: 2, numero_furias: 2, bonificador_furia: 2, maestria_armas: 2, rasgos: ['Ataque temerario', 'Sentir el peligro'] },
      { nivel: 3, bonificador_competencia: 2, numero_furias: 3, bonificador_furia: 2, maestria_armas: 2, rasgos: ['Conocimiento primigenio', 'Subclase de bárbaro'] },
      { nivel: 4, bonificador_competencia: 2, numero_furias: 3, bonificador_furia: 2, maestria_armas: 3, rasgos: ['Mejora de característica'] },
      { nivel: 5, bonificador_competencia: 3, numero_furias: 3, bonificador_furia: 2, maestria_armas: 3, rasgos: ['Ataque adicional', 'Movimiento rápido'] },
      { nivel: 6, bonificador_competencia: 3, numero_furias: 4, bonificador_furia: 2, maestria_armas: 3, rasgos: ['Rasgo de subclase'] },
      { nivel: 7, bonificador_competencia: 3, numero_furias: 4, bonificador_furia: 2, maestria_armas: 3, rasgos: ['Instinto salvaje', 'Salto instintivo'] },
      { nivel: 8, bonificador_competencia: 3, numero_furias: 4, bonificador_furia: 2, maestria_armas: 3, rasgos: ['Mejora de característica'] },
      { nivel: 9, bonificador_competencia: 4, numero_furias: 4, bonificador_furia: 3, maestria_armas: 3, rasgos: ['Golpe brutal'] },
      { nivel: 10, bonificador_competencia: 4, numero_furias: 4, bonificador_furia: 3, maestria_armas: 4, rasgos: ['Rasgo de subclase'] },
      { nivel: 11, bonificador_competencia: 4, numero_furias: 4, bonificador_furia: 3, maestria_armas: 4, rasgos: ['Furia implacable'] },
      { nivel: 12, bonificador_competencia: 4, numero_furias: 5, bonificador_furia: 3, maestria_armas: 4, rasgos: ['Mejora de característica'] },
      { nivel: 13, bonificador_competencia: 5, numero_furias: 5, bonificador_furia: 3, maestria_armas: 4, rasgos: ['Golpe brutal mejorado'] },
      { nivel: 14, bonificador_competencia: 5, numero_furias: 5, bonificador_furia: 3, maestria_armas: 4, rasgos: ['Rasgo de subclase'] },
      { nivel: 15, bonificador_competencia: 5, numero_furias: 5, bonificador_furia: 3, maestria_armas: 4, rasgos: ['Furia persistente'] },
      { nivel: 16, bonificador_competencia: 5, numero_furias: 5, bonificador_furia: 4, maestria_armas: 4, rasgos: ['Mejora de característica'] },
      { nivel: 17, bonificador_competencia: 6, numero_furias: 6, bonificador_furia: 4, maestria_armas: 4, rasgos: ['Golpe brutal mejorado'] },
      { nivel: 18, bonificador_competencia: 6, numero_furias: 6, bonificador_furia: 4, maestria_armas: 4, rasgos: ['Poderío indómito'] },
      { nivel: 19, bonificador_competencia: 6, numero_furias: 6, bonificador_furia: 4, maestria_armas: 4, rasgos: ['Don épico'] },
      { nivel: 20, bonificador_competencia: 6, numero_furias: 6, bonificador_furia: 4, maestria_armas: 4, rasgos: ['Campeón primordial'] }
    ]
  },
  {
    id: 'bardo',
    nombre: 'Bardo',
    caracteristica_principal: 'carisma',
    descripcion: 'Lanza conjuros que inspiran y curan a sus aliados o engatusan a sus enemigos con el poder de la creación.',
    atributos_basicos: {
      caracteristica_principal: 'carisma',
      dado_puntos_golpe: '1d8',
      salvaciones: ['destreza', 'carisma'],
      habilidades: {
        cantidad: 3,
        opciones: 'cualquiera'
      },
      competencias: {
        armas: ['armas_sencillas'],
        armaduras: ['armaduras_ligeras'],
        instrumentos_musicales: {
          cantidad: 3,
          opciones: 'cualquiera'
        }
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'armadura_de_cuero', texto: 'Armadura de cuero', cantidad: 1 },
            { id: 'daga', texto: 'Daga', cantidad: 2 },
            { id: 'instrumento_musical', texto: 'Instrumento musical (a elegir)', cantidad: 1, seleccion: true },
            { id: 'paquete_artista', texto: 'Paquete de artista', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 19, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 90, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Inspiración bárdica (d6)', 'Lanzamiento de conjuros'], espacios_conjuro: { '1': 2 } },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Aprendiz de mucho', 'Pericia'], espacios_conjuro: { '1': 3 } },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Subclase de bardo'], espacios_conjuro: { '1': 4, '2': 2 } },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3 } },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Fuente de inspiración (d8)'], espacios_conjuro: { '1': 4, '2': 3, '3': 2 } },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3 } },
      { nivel: 7, bonificador_competencia: 3, rasgos: ['Contraencantamiento'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 1 } },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 2 } },
      { nivel: 9, bonificador_competencia: 4, rasgos: ['Pericia'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 1 } },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Secretos mágicos (d10)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2 } },
      { nivel: 11, bonificador_competencia: 4, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 13, bonificador_competencia: 5, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 15, bonificador_competencia: 5, rasgos: ['Inspiración (d12)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 17, bonificador_competencia: 6, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Inspiración superior'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 2, '7': 1, '8': 1, '9': 1 } },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Palabras de creación'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 2, '7': 2, '8': 1, '9': 1 } }
    ]
  },
  {
    id: 'brujo',
    nombre: 'Brujo',
    caracteristica_principal: 'carisma',
    descripcion: 'Rastrea conocimiento oculto y forja un pacto con un poderoso patrón de otros planos para desatar magia sobrenatural.',
    atributos_basicos: {
      caracteristica_principal: 'carisma',
      dado_puntos_golpe: '1d8',
      salvaciones: ['sabiduria', 'carisma'],
      habilidades: {
        cantidad: 2,
        opciones: ['arcano', 'engano', 'historia', 'intimidacion', 'investigacion', 'naturaleza', 'religion']
      },
      competencias: {
        armas: ['armas_sencillas'],
        armaduras: ['armaduras_ligeras']
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'armadura_de_cuero', texto: 'Armadura de cuero', cantidad: 1 },
            { id: 'hoz', texto: 'Hoz', cantidad: 1 },
            { id: 'daga', texto: 'Daga', cantidad: 2 },
            { id: 'canalizador_arcano', texto: 'Canalizador arcano (orbe)', cantidad: 1 },
            { id: 'libro', texto: 'Libro de conocimiento oculto', cantidad: 1 },
            { id: 'paquete_erudito', texto: 'Paquete de erudito', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 15, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 100, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Invocaciones sobrenaturales', 'Magia del pacto (1 slot Nv.1)'], invocaciones: 2, espacios_conjuro: { '1': 1 } },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Astucia mágica'], invocaciones: 3, espacios_conjuro: { '1': 2 } },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Subclase de brujo'], invocaciones: 3, espacios_conjuro: { '2': 2 } },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], invocaciones: 3, espacios_conjuro: { '2': 2 } },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Rasgo de subclase'], invocaciones: 5, espacios_conjuro: { '3': 2 } },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Rasgo de subclase'], invocaciones: 5, espacios_conjuro: { '3': 2 } },
      { nivel: 7, bonificador_competencia: 3, rasgos: [], invocaciones: 6, espacios_conjuro: { '4': 2 } },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], invocaciones: 6, espacios_conjuro: { '4': 2 } },
      { nivel: 9, bonificador_competencia: 4, rasgos: ['Contactar patrón'], invocaciones: 7, espacios_conjuro: { '5': 2 } },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Rasgo de subclase'], invocaciones: 7, espacios_conjuro: { '5': 2 } },
      { nivel: 11, bonificador_competencia: 4, rasgos: ['Arcanum místico (nivel 6)'], invocaciones: 7, espacios_conjuro: { '5': 3 } },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], invocaciones: 8, espacios_conjuro: { '5': 3 } },
      { nivel: 13, bonificador_competencia: 5, rasgos: ['Arcanum místico (nivel 7)'], invocaciones: 8, espacios_conjuro: { '5': 3 } },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Rasgo de subclase'], invocaciones: 8, espacios_conjuro: { '5': 3 } },
      { nivel: 15, bonificador_competencia: 5, rasgos: ['Arcanum místico (nivel 8)'], invocaciones: 9, espacios_conjuro: { '5': 3 } },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], invocaciones: 9, espacios_conjuro: { '5': 3 } },
      { nivel: 17, bonificador_competencia: 6, rasgos: ['Arcanum místico (nivel 9)'], invocaciones: 9, espacios_conjuro: { '5': 4 } },
      { nivel: 18, bonificador_competencia: 6, rasgos: [], invocaciones: 10, espacios_conjuro: { '5': 4 } },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], invocaciones: 10, espacios_conjuro: { '5': 4 } },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Maestro sobrenatural'], invocaciones: 10, espacios_conjuro: { '5': 4 } }
    ]
  },
  {
    id: 'clerigo',
    nombre: 'Clérigo',
    caracteristica_principal: 'sabiduria',
    descripcion: 'Canaliza el poder sagrado divino de los dioses y panteones para proteger a sus aliados y aniquilar las sombras.',
    atributos_basicos: {
      caracteristica_principal: 'sabiduria',
      dado_puntos_golpe: '1d8',
      salvaciones: ['sabiduria', 'carisma'],
      habilidades: {
        cantidad: 2,
        opciones: ['historia', 'medicina', 'perspicacia', 'persuasion', 'religion']
      },
      competencias: {
        armas: ['armas_sencillas'],
        armaduras: ['armaduras_ligeras', 'armaduras_medias', 'escudos']
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'camisa_de_malla', texto: 'Camisa de malla', cantidad: 1 },
            { id: 'escudo', texto: 'Escudo', cantidad: 1 },
            { id: 'maza', texto: 'Maza', cantidad: 1 },
            { id: 'paquete_sacerdote', texto: 'Paquete de sacerdote', cantidad: 1 },
            { id: 'simbolo_sagrado', texto: 'Símbolo sagrado', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 7, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 110, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Lanzamiento de conjuros', 'Orden divina (Protector o Taumaturgo)'], espacios_conjuro: { '1': 2 } },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Canalizar divinidad (2 usos)', 'Chispa divina', 'Expulsar muertos vivientes'], espacios_conjuro: { '1': 3 } },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Subclase de clérigo'], espacios_conjuro: { '1': 4, '2': 2 } },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3 } },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Abrasar muertos vivientes'], espacios_conjuro: { '1': 4, '2': 3, '3': 2 } },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Rasgo de subclase', 'Canalizar divinidad (3 usos)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3 } },
      { nivel: 7, bonificador_competencia: 3, rasgos: ['Golpes benditos (Golpe divino o Lanzamiento potente)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 1 } },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 2 } },
      { nivel: 9, bonificador_competencia: 4, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 1 } },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Intercesión divina'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2 } },
      { nivel: 11, bonificador_competencia: 4, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 13, bonificador_competencia: 5, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Golpes benditos mejorados'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 15, bonificador_competencia: 5, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 17, bonificador_competencia: 6, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Canalizar divinidad (4 usos)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 2, '7': 1, '8': 1, '9': 1 } },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Intercesión divina mayor'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 2, '7': 2, '8': 1, '9': 1 } }
    ]
  },
  {
    id: 'druida',
    nombre: 'Druida',
    caracteristica_principal: 'sabiduria',
    descripcion: 'Canaliza las fuerzas elementales y de la naturaleza para sanar, transformarse en bestias y desatar cataclismos primigenios.',
    atributos_basicos: {
      caracteristica_principal: 'sabiduria',
      dado_puntos_golpe: '1d8',
      salvaciones: ['inteligencia', 'sabiduria'],
      habilidades: {
        cantidad: 2,
        opciones: ['arcano', 'medicina', 'naturaleza', 'percepcion', 'perspicacia', 'religion', 'supervivencia', 'trato_con_animales']
      },
      competencias: {
        armas: ['armas_sencillas'],
        armaduras: ['armaduras_ligeras', 'escudos']
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'armadura_de_cuero', texto: 'Armadura de cuero', cantidad: 1 },
            { id: 'escudo', texto: 'Escudo', cantidad: 1 },
            { id: 'hoz', texto: 'Hoz', cantidad: 1 },
            { id: 'canalizador_druidico', texto: 'Canalizador druídico (bastón)', cantidad: 1 },
            { id: 'paquete_explorador', texto: 'Paquete de explorador', cantidad: 1 },
            { id: 'utiles_herborista', texto: 'Útiles de herborista', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 9, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 50, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Druídico', 'Orden primigenia (Guardián o Naturalista)', 'Lanzamiento de conjuros'], espacios_conjuro: { '1': 2 } },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Forma salvaje (2 usos)', 'Compañero salvaje'], espacios_conjuro: { '1': 3 } },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Subclase de druida'], espacios_conjuro: { '1': 4, '2': 2 } },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3 } },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Resurgimiento salvaje'], espacios_conjuro: { '1': 4, '2': 3, '3': 2 } },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Rasgo de subclase', 'Forma salvaje (3 usos)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3 } },
      { nivel: 7, bonificador_competencia: 3, rasgos: ['Furia elemental (Golpe primordial o Lanzamiento potente)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 1 } },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 2 } },
      { nivel: 9, bonificador_competencia: 4, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 1 } },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2 } },
      { nivel: 11, bonificador_competencia: 4, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 13, bonificador_competencia: 5, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 15, bonificador_competencia: 5, rasgos: ['Furia elemental mejorada'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 17, bonificador_competencia: 6, rasgos: ['Forma salvaje (4 usos)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Conjurar como bestia'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 2, '7': 1, '8': 1, '9': 1 } },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Archidruida'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 2, '7': 2, '8': 1, '9': 1 } }
    ]
  },
  {
    id: 'explorador',
    nombre: 'Explorador',
    caracteristica_principal: ['destreza', 'sabiduria'],
    descripcion: 'Cazador y rastreador indomable que combina destreza marcial, magia primigenia y adaptación al entorno.',
    atributos_basicos: {
      caracteristica_principal: ['destreza', 'sabiduria'],
      dado_puntos_golpe: '1d10',
      salvaciones: ['fuerza', 'destreza'],
      habilidades: {
        cantidad: 3,
        opciones: ['atletismo', 'investigacion', 'naturaleza', 'percepcion', 'perspicacia', 'sigilo', 'supervivencia', 'trato_con_animales']
      },
      competencias: {
        armas: ['armas_sencillas', 'armas_marciales'],
        armaduras: ['armaduras_ligeras', 'armaduras_medias', 'escudos']
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'armadura_de_cuero_tachonado', texto: 'Armadura de cuero tachonado', cantidad: 1 },
            { id: 'cimitarra', texto: 'Cimitarra', cantidad: 1 },
            { id: 'espada_corta', texto: 'Espada corta', cantidad: 1 },
            { id: 'arco_largo', texto: 'Arco largo', cantidad: 1 },
            { id: 'flechas', texto: 'Flechas (20)', cantidad: 20 },
            { id: 'aljaba', texto: 'Aljaba', cantidad: 1 },
            { id: 'canalizador_druidico', texto: 'Canalizador druídico', cantidad: 1 },
            { id: 'paquete_explorador', texto: 'Paquete de explorador', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 7, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 150, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Enemigo predilecto (Marca del cazador)', 'Lanzamiento de conjuros', 'Maestría con armas (2)'], espacios_conjuro: { '1': 2 } },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Estilo de combate', 'Explorador hábil'], espacios_conjuro: { '1': 2 } },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Subclase de explorador'], espacios_conjuro: { '1': 3 } },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 3 } },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Ataque adicional'], espacios_conjuro: { '1': 4, '2': 2 } },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Errante (+3m y trepar/nadar)'], espacios_conjuro: { '1': 4, '2': 2 } },
      { nivel: 7, bonificador_competencia: 3, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3 } },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3 } },
      { nivel: 9, bonificador_competencia: 4, rasgos: ['Pericia'], espacios_conjuro: { '1': 4, '2': 3, '3': 2 } },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Infatigable'], espacios_conjuro: { '1': 4, '2': 3, '3': 2 } },
      { nivel: 11, bonificador_competencia: 4, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3 } },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3 } },
      { nivel: 13, bonificador_competencia: 5, rasgos: ['Cazador persistente'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 1 } },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Velo de la naturaleza'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 1 } },
      { nivel: 15, bonificador_competencia: 5, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 2 } },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 2 } },
      { nivel: 17, bonificador_competencia: 6, rasgos: ['Cazador preciso'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 1 } },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Sentidos salvajes'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 1 } },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2 } },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Azote de enemigos'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2 } }
    ]
  },
  {
    id: 'guerrero',
    nombre: 'Guerrero',
    caracteristica_principal: ['fuerza', 'destreza'],
    descripcion: 'Maestro indiscutible de las armas y armaduras, con una versatilidad táctica y poder ofensivo devastador.',
    atributos_basicos: {
      caracteristica_principal: ['fuerza', 'destreza'],
      dado_puntos_golpe: '1d10',
      salvaciones: ['fuerza', 'constitucion'],
      habilidades: {
        cantidad: 2,
        opciones: ['acrobacias', 'atletismo', 'historia', 'intimidacion', 'percepcion', 'perspicacia', 'persuasion', 'supervivencia', 'trato_con_animales']
      },
      competencias: {
        armas: ['armas_sencillas', 'armas_marciales'],
        armaduras: ['armaduras_ligeras', 'armaduras_medias', 'armaduras_pesadas', 'escudos']
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'cota_de_malla', texto: 'Cota de malla', cantidad: 1 },
            { id: 'espadon', texto: 'Espadón', cantidad: 1 },
            { id: 'mangual', texto: 'Mangual', cantidad: 1 },
            { id: 'jabalina', texto: 'Jabalina', cantidad: 3 },
            { id: 'paquete_explorador_mazmorras', texto: 'Paquete de explorador de mazmorras', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 4, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'armadura_de_cuero_tachonado', texto: 'Armadura de cuero tachonado', cantidad: 1 },
            { id: 'cimitarra', texto: 'Cimitarra', cantidad: 1 },
            { id: 'espada_corta', texto: 'Espada corta', cantidad: 1 },
            { id: 'arco_largo', texto: 'Arco largo', cantidad: 1 },
            { id: 'flechas', texto: 'Flechas (20)', cantidad: 20 },
            { id: 'aljaba', texto: 'Aljaba', cantidad: 1 },
            { id: 'paquete_explorador_mazmorras', texto: 'Paquete de explorador de mazmorras', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 1, moneda: true }
          ]
        },
        {
          id: 'c',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 155, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Estilo de combate', 'Maestría con armas (3)', 'Tomar aliento (2 usos)'], tomar_aliento: 2, maestria_armas: 3 },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Acción súbita (1)', 'Mente táctica'], tomar_aliento: 2, maestria_armas: 3 },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Subclase de guerrero'], tomar_aliento: 2, maestria_armas: 3 },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], tomar_aliento: 2, maestria_armas: 4 },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Ataque adicional (2)', 'Desplazamiento táctico'], tomar_aliento: 2, maestria_armas: 4 },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Mejora de característica'], tomar_aliento: 2, maestria_armas: 4 },
      { nivel: 7, bonificador_competencia: 3, rasgos: ['Rasgo de subclase'], tomar_aliento: 2, maestria_armas: 4 },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], tomar_aliento: 2, maestria_armas: 4 },
      { nivel: 9, bonificador_competencia: 4, rasgos: ['Indómito (1)', 'Maestro táctico'], tomar_aliento: 2, maestria_armas: 4 },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Rasgo de subclase'], tomar_aliento: 3, maestria_armas: 5 },
      { nivel: 11, bonificador_competencia: 4, rasgos: ['Dos ataques adicionales (3 ataques)'], tomar_aliento: 3, maestria_armas: 5 },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], tomar_aliento: 3, maestria_armas: 5 },
      { nivel: 13, bonificador_competencia: 5, rasgos: ['Ataques estudiados', 'Indómito (2)'], tomar_aliento: 3, maestria_armas: 5 },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Mejora de característica'], tomar_aliento: 3, maestria_armas: 5 },
      { nivel: 15, bonificador_competencia: 5, rasgos: ['Rasgo de subclase'], tomar_aliento: 3, maestria_armas: 5 },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], tomar_aliento: 3, maestria_armas: 6 },
      { nivel: 17, bonificador_competencia: 6, rasgos: ['Acción súbita (2)', 'Indómito (3)'], tomar_aliento: 4, maestria_armas: 6 },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Rasgo de subclase'], tomar_aliento: 4, maestria_armas: 6 },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], tomar_aliento: 4, maestria_armas: 6 },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Tres ataques adicionales (4 ataques)'], tomar_aliento: 4, maestria_armas: 6 }
    ]
  },
  {
    id: 'hechicero',
    nombre: 'Hechicero',
    caracteristica_principal: 'carisma',
    descripcion: 'Canaliza la magia pura que late en su propia sangre, transformando la realidad mediante metamagia.',
    atributos_basicos: {
      caracteristica_principal: 'carisma',
      dado_puntos_golpe: '1d6',
      salvaciones: ['constitucion', 'carisma'],
      habilidades: {
        cantidad: 2,
        opciones: ['arcano', 'engano', 'intimidacion', 'perspicacia', 'persuasion', 'religion']
      },
      competencias: {
        armas: ['armas_sencillas'],
        armaduras: []
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'lanza', texto: 'Lanza', cantidad: 1 },
            { id: 'daga', texto: 'Daga', cantidad: 2 },
            { id: 'canalizador_arcano', texto: 'Canalizador arcano', cantidad: 1 },
            { id: 'paquete_explorador_mazmorras', texto: 'Paquete de explorador de mazmorras', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 28, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 50, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Lanzamiento de conjuros', 'Hechicería innata'], puntos_hechiceria: 0, espacios_conjuro: { '1': 2 } },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Fuente de magia', 'Metamagia (2 opciones)'], puntos_hechiceria: 2, espacios_conjuro: { '1': 3 } },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Subclase de hechicero'], puntos_hechiceria: 3, espacios_conjuro: { '1': 4, '2': 2 } },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], puntos_hechiceria: 4, espacios_conjuro: { '1': 4, '2': 3 } },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Recuperación mágica'], puntos_hechiceria: 5, espacios_conjuro: { '1': 4, '2': 3, '3': 2 } },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Rasgo de subclase'], puntos_hechiceria: 6, espacios_conjuro: { '1': 4, '2': 3, '3': 3 } },
      { nivel: 7, bonificador_competencia: 3, rasgos: ['Encarnación mágica'], puntos_hechiceria: 7, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 1 } },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], puntos_hechiceria: 8, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 2 } },
      { nivel: 9, bonificador_competencia: 4, rasgos: [], puntos_hechiceria: 9, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 1 } },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Metamagia adicional'], puntos_hechiceria: 10, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2 } },
      { nivel: 11, bonificador_competencia: 4, rasgos: [], puntos_hechiceria: 11, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], puntos_hechiceria: 12, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 13, bonificador_competencia: 5, rasgos: [], puntos_hechiceria: 13, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Rasgo de subclase'], puntos_hechiceria: 14, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 15, bonificador_competencia: 5, rasgos: [], puntos_hechiceria: 15, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], puntos_hechiceria: 16, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 17, bonificador_competencia: 6, rasgos: ['Metamagia adicional'], puntos_hechiceria: 17, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Rasgo de subclase'], puntos_hechiceria: 18, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], puntos_hechiceria: 19, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Apoteosis arcana'], puntos_hechiceria: 20, espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1, '9': 1 } }
    ]
  },
  {
    id: 'mago',
    nombre: 'Mago',
    caracteristica_principal: 'inteligencia',
    descripcion: 'Erudito de las artes arcanas que domina el multiverso mediante el estudio metódico, su libro de conjuros y rituales.',
    atributos_basicos: {
      caracteristica_principal: 'inteligencia',
      dado_puntos_golpe: '1d6',
      salvaciones: ['inteligencia', 'sabiduria'],
      habilidades: {
        cantidad: 2,
        opciones: ['arcano', 'historia', 'investigacion', 'medicina', 'naturaleza', 'perspicacia', 'religion']
      },
      competencias: {
        armas: ['armas_sencillas'],
        armaduras: []
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'daga', texto: 'Daga', cantidad: 2 },
            { id: 'canalizador_arcano', texto: 'Canalizador arcano (bastón)', cantidad: 1 },
            { id: 'libro', texto: 'Libro de conjuros', cantidad: 1 },
            { id: 'paquete_erudito', texto: 'Paquete de erudito', cantidad: 1 },
            { id: 'tunica', texto: 'Túnica', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 5, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 55, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Lanzamiento de conjuros', 'Adepto en rituales', 'Recuperación arcana'], espacios_conjuro: { '1': 2 } },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Académico (Pericia en saber)'], espacios_conjuro: { '1': 3 } },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Subclase de mago'], espacios_conjuro: { '1': 4, '2': 2 } },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3 } },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Memorizar conjuro'], espacios_conjuro: { '1': 4, '2': 3, '3': 2 } },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3 } },
      { nivel: 7, bonificador_competencia: 3, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 1 } },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 2 } },
      { nivel: 9, bonificador_competencia: 4, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 1 } },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2 } },
      { nivel: 11, bonificador_competencia: 4, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1 } },
      { nivel: 13, bonificador_competencia: 5, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1 } },
      { nivel: 15, bonificador_competencia: 5, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1 } },
      { nivel: 17, bonificador_competencia: 6, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Maestría sobre conjuros'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 1, '7': 1, '8': 1, '9': 1 } },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 2, '7': 1, '8': 1, '9': 1 } },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Conjuros característicos'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 3, '6': 2, '7': 2, '8': 1, '9': 1 } }
    ]
  },
  {
    id: 'monje',
    nombre: 'Monje',
    caracteristica_principal: ['destreza', 'sabiduria'],
    descripcion: 'Canaliza la energía mística del cuerpo y la mente para lograr hazañas de combate veloz, acrobático y letal.',
    atributos_basicos: {
      caracteristica_principal: ['destreza', 'sabiduria'],
      dado_puntos_golpe: '1d8',
      salvaciones: ['fuerza', 'destreza'],
      habilidades: {
        cantidad: 2,
        opciones: ['acrobacias', 'atletismo', 'historia', 'perspicacia', 'religion', 'sigilo']
      },
      competencias: {
        armas: ['armas_sencillas', 'armas_marciales_ligeras'],
        armaduras: []
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'lanza', texto: 'Lanza', cantidad: 1 },
            { id: 'daga', texto: 'Daga', cantidad: 5 },
            { id: 'herramientas_artesano', texto: 'Herramienta de artesano o instrumento musical', cantidad: 1, seleccion: true },
            { id: 'paquete_explorador', texto: 'Paquete de explorador', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 11, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 50, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Artes marciales (d6)', 'Defensa sin armadura (10+DES+SAB)'], puntos_concentracion: 0 },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Concentración de monje (2)', 'Metabolismo asombroso', 'Movimiento sin armadura (+3m)'], puntos_concentracion: 2 },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Desviar ataques', 'Subclase de monje'], puntos_concentracion: 3 },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Caída lenta', 'Mejora de característica'], puntos_concentracion: 4 },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Ataque adicional', 'Golpe aturdidor'], puntos_concentracion: 5 },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Golpes potenciados (daño de fuerza)', 'Rasgo de subclase', 'Movimiento (+4.5m)'], dado_marcial: 'd8', puntos_concentracion: 6 },
      { nivel: 7, bonificador_competencia: 3, rasgos: ['Evasión'], puntos_concentracion: 7 },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], puntos_concentracion: 8 },
      { nivel: 9, bonificador_competencia: 4, rasgos: ['Movimiento acrobático (paredes y líquidos)'], puntos_concentracion: 9 },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Autorrestablecimiento', 'Concentración agudizada', 'Movimiento (+6m)'], puntos_concentracion: 10 },
      { nivel: 11, bonificador_competencia: 4, rasgos: ['Rasgo de subclase'], dado_marcial: 'd10', puntos_concentracion: 11 },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], puntos_concentracion: 12 },
      { nivel: 13, bonificador_competencia: 5, rasgos: ['Desviar energía (cualquier daño)'], puntos_concentracion: 13 },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Superviviente disciplinado (todas las salvaciones)', 'Movimiento (+7.5m)'], puntos_concentracion: 14 },
      { nivel: 15, bonificador_competencia: 5, rasgos: ['Concentración perfecta'], puntos_concentracion: 15 },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], puntos_concentracion: 16 },
      { nivel: 17, bonificador_competencia: 6, rasgos: ['Rasgo de subclase'], dado_marcial: 'd12', puntos_concentracion: 17 },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Defensa superior', 'Movimiento (+9m)'], puntos_concentracion: 18 },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], puntos_concentracion: 19 },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Cuerpo y mente (+4 DES y SAB)'], puntos_concentracion: 20 }
    ]
  },
  {
    id: 'paladin',
    nombre: 'Paladín',
    caracteristica_principal: ['fuerza', 'carisma'],
    descripcion: 'Guerrero sagrado atado a un juramento divino que blande armas marciales imbuidas con la llama radiante de la justicia.',
    atributos_basicos: {
      caracteristica_principal: ['fuerza', 'carisma'],
      dado_puntos_golpe: '1d10',
      salvaciones: ['sabiduria', 'carisma'],
      habilidades: {
        cantidad: 2,
        opciones: ['atletismo', 'intimidacion', 'medicina', 'perspicacia', 'persuasion', 'religion']
      },
      competencias: {
        armas: ['armas_sencillas', 'armas_marciales'],
        armaduras: ['armaduras_ligeras', 'armaduras_medias', 'armaduras_pesadas', 'escudos']
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'cota_de_malla', texto: 'Cota de malla', cantidad: 1 },
            { id: 'escudo', texto: 'Escudo', cantidad: 1 },
            { id: 'espada_larga', texto: 'Espada larga', cantidad: 1 },
            { id: 'jabalina', texto: 'Jabalina', cantidad: 6 },
            { id: 'simbolo_sagrado', texto: 'Símbolo sagrado', cantidad: 1 },
            { id: 'paquete_sacerdote', texto: 'Paquete de sacerdote', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 9, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 150, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Imponer las manos (5x nivel)', 'Lanzamiento de conjuros', 'Maestría con armas (2)'], espacios_conjuro: {} },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Castigo de paladín (Castigo divino gratis)', 'Estilo de combate'], espacios_conjuro: { '1': 2 } },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Canalizar divinidad', 'Subclase de paladín'], espacios_conjuro: { '1': 3 } },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 3 } },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Ataque adicional', 'Corcel fiel (Hallar corcel gratis)'], espacios_conjuro: { '1': 4, '2': 2 } },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Aura de protección (+CAR a salvaciones)'], espacios_conjuro: { '1': 4, '2': 2 } },
      { nivel: 7, bonificador_competencia: 3, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3 } },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3 } },
      { nivel: 9, bonificador_competencia: 4, rasgos: ['Abjurar de los enemigos'], espacios_conjuro: { '1': 4, '2': 3, '3': 2 } },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Aura de coraje (Inmunidad a asustado)'], espacios_conjuro: { '1': 4, '2': 3, '3': 2 } },
      { nivel: 11, bonificador_competencia: 4, rasgos: ['Golpes radiantes (+1d8 radiante)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3 } },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3 } },
      { nivel: 13, bonificador_competencia: 5, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 1 } },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Toque reparador'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 1 } },
      { nivel: 15, bonificador_competencia: 5, rasgos: ['Rasgo de subclase'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 2 } },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 2 } },
      { nivel: 17, bonificador_competencia: 6, rasgos: [], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 1 } },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Expansión de aura (9m)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 1 } },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2 } },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Rasgo de subclase (Campeón del juramento)'], espacios_conjuro: { '1': 4, '2': 3, '3': 3, '4': 3, '5': 2 } }
    ]
  },
  {
    id: 'picaro',
    nombre: 'Pícaro',
    caracteristica_principal: 'destreza',
    descripcion: 'Especialista en sigilo, trampas, engaño y ataques quirúrgicos mortales contra puntos vulnerables.',
    atributos_basicos: {
      caracteristica_principal: 'destreza',
      dado_puntos_golpe: '1d8',
      salvaciones: ['destreza', 'inteligencia'],
      habilidades: {
        cantidad: 4,
        opciones: ['acrobacias', 'atletismo', 'engano', 'intimidacion', 'investigacion', 'juego_de_manos', 'percepcion', 'perspicacia', 'persuasion', 'sigilo']
      },
      competencias: {
        armas: ['armas_sencillas', 'armas_marciales_ligeras_o_sutiles'],
        armaduras: ['armaduras_ligeras']
      }
    },
    equipo: {
      tipo: 'seleccion',
      opciones: [
        {
          id: 'a',
          contenido: [
            { id: 'armadura_de_cuero', texto: 'Armadura de cuero', cantidad: 1 },
            { id: 'daga', texto: 'Daga', cantidad: 2 },
            { id: 'espada_corta', texto: 'Espada corta', cantidad: 1 },
            { id: 'arco_corto', texto: 'Arco corto', cantidad: 1 },
            { id: 'flechas', texto: 'Flechas (20)', cantidad: 20 },
            { id: 'aljaba', texto: 'Aljaba', cantidad: 1 },
            { id: 'herramientas_ladron', texto: 'Herramientas de ladrón', cantidad: 1 },
            { id: 'paquete_ladron', texto: 'Paquete de ladrón', cantidad: 1 },
            { id: 'po', texto: 'po', cantidad: 3, moneda: true }
          ]
        },
        {
          id: 'b',
          contenido: [
            { id: 'po', texto: 'po', cantidad: 100, moneda: true }
          ]
        }
      ]
    },
    progresion: [
      { nivel: 1, bonificador_competencia: 2, rasgos: ['Ataque furtivo (1d6)', 'Jerga de ladrones', 'Maestría con armas (2)', 'Pericia (2 habilidades)'], ataque_furtivo: '1d6' },
      { nivel: 2, bonificador_competencia: 2, rasgos: ['Acción astuta (Correr, Destrabarse, Esconderse)'], ataque_furtivo: '1d6' },
      { nivel: 3, bonificador_competencia: 2, rasgos: ['Puntería certera', 'Subclase de pícaro'], ataque_furtivo: '2d6' },
      { nivel: 4, bonificador_competencia: 2, rasgos: ['Mejora de característica'], ataque_furtivo: '2d6' },
      { nivel: 5, bonificador_competencia: 3, rasgos: ['Esquiva asombrosa', 'Golpe astuto (Retirada, Tropiezo, Veneno)'], ataque_furtivo: '3d6' },
      { nivel: 6, bonificador_competencia: 3, rasgos: ['Pericia (2 adicionales)'], ataque_furtivo: '3d6' },
      { nivel: 7, bonificador_competencia: 3, rasgos: ['Evasión', 'Talentos fiables (d20 min 10 en competencias)'], ataque_furtivo: '4d6' },
      { nivel: 8, bonificador_competencia: 3, rasgos: ['Mejora de característica'], ataque_furtivo: '4d6' },
      { nivel: 9, bonificador_competencia: 4, rasgos: ['Rasgo de subclase'], ataque_furtivo: '5d6' },
      { nivel: 10, bonificador_competencia: 4, rasgos: ['Mejora de característica'], ataque_furtivo: '5d6' },
      { nivel: 11, bonificador_competencia: 4, rasgos: ['Golpe astuto mejorado (2 efectos)'], ataque_furtivo: '6d6' },
      { nivel: 12, bonificador_competencia: 4, rasgos: ['Mejora de característica'], ataque_furtivo: '6d6' },
      { nivel: 13, bonificador_competencia: 5, rasgos: ['Rasgo de subclase'], ataque_furtivo: '7d6' },
      { nivel: 14, bonificador_competencia: 5, rasgos: ['Golpes taimados (Confundir, Noquear, Ofuscar)'], ataque_furtivo: '7d6' },
      { nivel: 15, bonificador_competencia: 5, rasgos: ['Mente escurridiza (Salvaciones de SAB y CAR)'], ataque_furtivo: '8d6' },
      { nivel: 16, bonificador_competencia: 5, rasgos: ['Mejora de característica'], ataque_furtivo: '8d6' },
      { nivel: 17, bonificador_competencia: 6, rasgos: ['Rasgo de subclase'], ataque_furtivo: '9d6' },
      { nivel: 18, bonificador_competencia: 6, rasgos: ['Elusivo (los enemigos no tienen ventaja contra ti)'], ataque_furtivo: '9d6' },
      { nivel: 19, bonificador_competencia: 6, rasgos: ['Don épico'], ataque_furtivo: '10d6' },
      { nivel: 20, bonificador_competencia: 6, rasgos: ['Golpe de suerte'], ataque_furtivo: '10d6' }
    ]
  }
];
