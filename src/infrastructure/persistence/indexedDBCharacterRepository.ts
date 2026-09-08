import {
  CharacterBase,
  CharacterState,
  DND2024Character
} from '../../core/domain/character/character.types';
import { recalculateCharacter } from '../../core/domain/character/characterCalculations';
import { ICharacterRepository } from './characterRepository.interface';

const DB_NAME = 'dnd2024_characters_db';
const STORE_NAME = 'characters';
const DB_VERSION = 1;

/**
 * Converte cualquier modelo antiguo o parcial al nuevo modelo canónico D&D 2024 (base, estado, calculado, historial).
 */
export function normalizeToDND2024Character(raw: any): DND2024Character {
  if (raw && raw.base && raw.estado && raw.calculado && Array.isArray(raw.historial)) {
    // Ya es el modelo canónico; asegurar cálculo fresco
    return {
      ...raw,
      calculado: recalculateCharacter(raw.base, raw.estado)
    };
  }

  // Conversión desde formato plano legado (Character anterior)
  const id = raw?.id || `char_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const nombre = raw?.nombre || 'Héroe Desconocido';
  const nivel = raw?.nivel || 1;
  const clase = raw?.clase || 'guerrero';
  const especie = raw?.especie || 'humano';
  const trasfondo = raw?.trasfondo || 'soldado';

  const scores = raw?.caracteristicas || {
    fuerza: 10,
    destreza: 10,
    constitucion: 10,
    inteligencia: 10,
    sabiduria: 10,
    carisma: 10
  };

  const base: CharacterBase = {
    id,
    nombre,
    jugador: raw?.jugador || '',
    nivel,
    clase,
    subclase: raw?.subclase || null,
    especie,
    linaje: raw?.linaje || null,
    trasfondo,
    alineamiento: raw?.alineamiento || 'Neutral',
    puntos_experiencia: raw?.puntos_experiencia || 0,
    caracteristicas_base: scores,
    aumentos_caracteristica: {},
    competencias: {
      habilidades: raw?.habilidades_competentes || [],
      salvaciones: raw?.salvaciones_competentes || [],
      armas: [],
      armaduras: [],
      herramientas: []
    },
    pericias: raw?.habilidades_pericia || [],
    dotes: raw?.dotes || [],
    rasgos: raw?.rasgos || [],
    maestrias_armas: raw?.maestrias_armas || [],
    conjuros_conocidos: raw?.conjuros_conocidos || [],
    conjuros_preparados: raw?.conjuros_preparados || [],
    monedas: raw?.monedas || { pc: 0, pp: 0, pe: 0, po: 10, ppt: 0 },
    notas: raw?.notas || '',
    dado_golpe_tipo: raw?.dados_de_golpe?.tipo_dado || 8,
    creado_en: raw?.creado_en || new Date().toISOString(),
    actualizado_en: raw?.actualizado_en || new Date().toISOString()
  };

  // Convertir items de inventario
  const rawEquipo = Array.isArray(raw?.equipo) ? raw.equipo : [];
  const inventario = rawEquipo.map((itemObj: any, idx: number) => ({
    id: `item_${idx}_${Date.now()}`,
    objeto_id: itemObj.item?.id || `item_${idx}`,
    nombre: itemObj.item?.nombre || 'Objeto',
    categoria: itemObj.item?.categoria || 'equipo_aventuras',
    cantidad: itemObj.cantidad || 1,
    equipado: !!itemObj.equipado,
    peso_kg: itemObj.item?.peso_kg || 0,
    propiedades: itemObj.item?.propiedades || []
  }));

  const maxHP = raw?.puntos_de_golpe?.maximos || 10;
  const currentHP = raw?.puntos_de_golpe?.actuales ?? maxHP;

  const estado: CharacterState = {
    puntos_golpe_actuales: currentHP,
    puntos_golpe_temporales: raw?.puntos_de_golpe?.temporales || 0,
    puntos_golpe_maximos_ajuste: 0,
    dados_golpe_gastados: raw?.dados_de_golpe?.gastados || 0,
    salvaciones_muerte: { exitos: 0, fallos: 0 },
    inspiracion_heroica: !!raw?.inspiracion_heroica,
    condiciones: [],
    recursos: {},
    espacios_conjuro: raw?.espacios_conjuro || {},
    concentracion: null,
    inventario,
    equipamiento: {
      armadura: null,
      escudo: null,
      arma_principal: null,
      arma_secundaria: null
    }
  };

  const calculado = recalculateCharacter(base, estado);

  return {
    id,
    base,
    estado,
    calculado,
    historial: [
      {
        id: `hist_init_${id}`,
        timestamp: new Date().toISOString(),
        tipo: 'creacion',
        descripcion: 'Personaje inicializado en el sistema.'
      }
    ]
  };
}

/**
 * REPOSITORIO PRINCIPAL EN INDEXEDDB
 * Proporciona almacenamiento robusto, transaccional y sin límite estricto de cuota para modo offline PWA.
 */
export class IndexedDBCharacterRepository implements ICharacterRepository {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    if (typeof window === 'undefined' || !window.indexedDB) {
      return Promise.reject(new Error('IndexedDB no está disponible en este entorno.'));
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  async getAll(): Promise<DND2024Character[]> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();

        req.onsuccess = () => {
          const results = req.result || [];
          // Normalizar cada personaje
          resolve(results.map((r: any) => normalizeToDND2024Character(r)));
        };

        req.onerror = () => {
          reject(req.error);
        };
      });
    } catch (err) {
      console.warn('Fallback a localStorage para getAll:', err);
      // Fallback a localStorage si IndexedDB falla
      try {
        const legacy = localStorage.getItem('dnd2024_characters_list');
        if (legacy) {
          const parsed = JSON.parse(legacy);
          if (Array.isArray(parsed)) {
            return parsed.map((p) => normalizeToDND2024Character(p));
          }
        }
      } catch (e) {
        // ignore
      }
      return [];
    }
  }

  async getById(id: string): Promise<DND2024Character | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(id);

        req.onsuccess = () => {
          if (!req.result) {
            resolve(null);
          } else {
            resolve(normalizeToDND2024Character(req.result));
          }
        };

        req.onerror = () => {
          reject(req.error);
        };
      });
    } catch (err) {
      console.warn('Fallback a localStorage para getById:', err);
      const all = await this.getAll();
      return all.find((c) => c.id === id) || null;
    }
  }

  async save(character: DND2024Character): Promise<void> {
    const fresh = {
      ...character,
      base: {
        ...character.base,
        actualizado_en: new Date().toISOString()
      },
      calculado: recalculateCharacter(character.base, character.estado)
    };

    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(fresh);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('Error guardando en IndexedDB, respaldando en localStorage:', err);
    }

    // Mantener sincronizado localStorage como copia de seguridad ligera
    try {
      const all = await this.getAll();
      const existingIdx = all.findIndex((c) => c.id === fresh.id);
      if (existingIdx >= 0) {
        all[existingIdx] = fresh;
      } else {
        all.unshift(fresh);
      }
      localStorage.setItem('dnd2024_characters_list', JSON.stringify(all));
    } catch (e) {
      // ignore
    }
  }

  async saveAll(characters: DND2024Character[]): Promise<void> {
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        characters.forEach((char) => {
          store.put(char);
        });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn('Error guardando lista en IndexedDB:', err);
    }

    try {
      localStorage.setItem('dnd2024_characters_list', JSON.stringify(characters));
    } catch (e) {
      // ignore
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('Error eliminando de IndexedDB:', err);
    }

    try {
      const legacy = localStorage.getItem('dnd2024_characters_list');
      if (legacy) {
        const parsed = JSON.parse(legacy);
        if (Array.isArray(parsed)) {
          const remaining = parsed.filter((c) => c.id !== id);
          localStorage.setItem('dnd2024_characters_list', JSON.stringify(remaining));
        }
      }
    } catch (e) {
      // ignore
    }
  }
}
