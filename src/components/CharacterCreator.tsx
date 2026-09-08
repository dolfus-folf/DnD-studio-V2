import React, { useState } from 'react';
import { Character, AbilityScores, ClassDefinition } from '../types';
import { DND_CLASSES } from '../data/dndClasses';
import { DND_SPECIES } from '../data/dndSpecies';
import { DND_BACKGROUNDS } from '../data/dndBackgrounds';
import { DND_SUBCLASSES } from '../data/dndSubclasses';
import { DND_EQUIPMENT_CATALOG } from '../data/dndEquipment';
import { calculateMaxHP, calculateModifier, formatModifier, parseHitDieNumber } from '../utils/dndCalculations';
import {
  Sparkles,
  Shield,
  ArrowRight,
  ArrowLeft,
  Check,
  Dices,
  BookOpen,
  User,
  Heart,
  Info,
  X,
  Swords,
  Backpack,
  Coins,
  Wand2
} from 'lucide-react';

interface CharacterCreatorProps {
  onCharacterCreated: (newChar: Character) => void;
  onCancel: () => void;
}

export const CharacterCreator: React.FC<CharacterCreatorProps> = ({
  onCharacterCreated,
  onCancel
}) => {
  const [step, setStep] = useState<number>(1);

  // Form states
  const [nombre, setNombre] = useState('Nuevo Héroe');
  const [nivel, setNivel] = useState(1);
  const [alineamiento, setAlineamiento] = useState('Neutral Bueno');
  const [especieId, setEspecieId] = useState('humano');
  const [linaje, setLinaje] = useState<string>('');
  const [claseId, setClaseId] = useState('guerrero');
  const [subclaseId, setSubclaseId] = useState<string>('');
  const [trasfondoId, setTrasfondoId] = useState('soldado');

  // Background stat bonuses (+2/+1 or +1/+1/+1)
  const [bonusMode, setBonusMode] = useState<'2_1' | '1_1_1'>('2_1');
  const [statBonusPlus2, setStatBonusPlus2] = useState<keyof AbilityScores>('fuerza');
  const [statBonusPlus1, setStatBonusPlus1] = useState<keyof AbilityScores>('constitucion');
  const [statBonus1A, setStatBonus1A] = useState<keyof AbilityScores>('fuerza');
  const [statBonus1B, setStatBonus1B] = useState<keyof AbilityScores>('destreza');
  const [statBonus1C, setStatBonus1C] = useState<keyof AbilityScores>('constitucion');

  // Base ability scores (Standard Array by default)
  const [baseScores, setBaseScores] = useState<AbilityScores>({
    fuerza: 15,
    destreza: 14,
    constitucion: 13,
    inteligencia: 12,
    sabiduria: 10,
    carisma: 8
  });

  // Roll history for random 4d6 dice generation
  const [rollHistory, setRollHistory] = useState<number[] | null>(null);

  // Equipment selection options: Class & Background separately (2024 rules)
  const [equipoClaseOption, setEquipoClaseOption] = useState<'a' | 'b'>('a');
  const [equipoTrasfondoOption, setEquipoTrasfondoOption] = useState<'a' | 'b'>('a');

  // Modals for species traits and class details
  const [selectedTraitModal, setSelectedTraitModal] = useState<{
    nombre: string;
    descripcion: string;
    nivel?: number;
  } | null>(null);
  const [selectedClassDetailModal, setSelectedClassDetailModal] = useState<ClassDefinition | null>(null);

  // Selected definitions
  const selectedSpecies = DND_SPECIES.find((s) => s.id === especieId) || DND_SPECIES[0];
  const selectedClass = DND_CLASSES.find((c) => c.id === claseId) || DND_CLASSES[0];
  const selectedBackground = DND_BACKGROUNDS.find((b) => b.id === trasfondoId) || DND_BACKGROUNDS[0];
  const availableSubclasses = DND_SUBCLASSES.filter((sc) => sc.clase === claseId);

  // Calculate bonuses given to each stat by background
  const getStatBonus = (stat: keyof AbilityScores): number => {
    if (bonusMode === '2_1') {
      let b = 0;
      if (statBonusPlus2 === stat) b += 2;
      if (statBonusPlus1 === stat) b += 1;
      return b;
    } else {
      let b = 0;
      if (statBonus1A === stat) b += 1;
      if (statBonus1B === stat) b += 1;
      if (statBonus1C === stat) b += 1;
      return b;
    }
  };

  // Calculate final scores including background
  const getFinalScores = (): AbilityScores => {
    return {
      fuerza: baseScores.fuerza + getStatBonus('fuerza'),
      destreza: baseScores.destreza + getStatBonus('destreza'),
      constitucion: baseScores.constitucion + getStatBonus('constitucion'),
      inteligencia: baseScores.inteligencia + getStatBonus('inteligencia'),
      sabiduria: baseScores.sabiduria + getStatBonus('sabiduria'),
      carisma: baseScores.carisma + getStatBonus('carisma')
    };
  };

  // Official D&D 4d6 drop lowest generator
  const roll4d6DropLowest = (): number => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => a - b);
    return rolls[1] + rolls[2] + rolls[3];
  };

  const handleGenerateRandomScores = () => {
    const rolls = Array.from({ length: 6 }, () => roll4d6DropLowest());
    rolls.sort((a, b) => b - a); // Sort descending
    setRollHistory([...rolls]);

    // Priority ordering by class
    const primary = Array.isArray(selectedClass.caracteristica_principal)
      ? selectedClass.caracteristica_principal[0]
      : (selectedClass.caracteristica_principal || 'fuerza');

    const statPriorities: Record<string, Array<keyof AbilityScores>> = {
      barbaro: ['fuerza', 'constitucion', 'destreza', 'sabiduria', 'carisma', 'inteligencia'],
      bardo: ['carisma', 'destreza', 'constitucion', 'sabiduria', 'inteligencia', 'fuerza'],
      brujo: ['carisma', 'constitucion', 'destreza', 'sabiduria', 'inteligencia', 'fuerza'],
      clerigo: ['sabiduria', 'constitucion', 'fuerza', 'destreza', 'carisma', 'inteligencia'],
      druida: ['sabiduria', 'constitucion', 'destreza', 'inteligencia', 'carisma', 'fuerza'],
      explorador: ['destreza', 'sabiduria', 'constitucion', 'fuerza', 'inteligencia', 'carisma'],
      guerrero: ['fuerza', 'constitucion', 'destreza', 'sabiduria', 'inteligencia', 'carisma'],
      hechicero: ['carisma', 'constitucion', 'destreza', 'sabiduria', 'inteligencia', 'fuerza'],
      mago: ['inteligencia', 'constitucion', 'destreza', 'sabiduria', 'carisma', 'fuerza'],
      monje: ['destreza', 'sabiduria', 'constitucion', 'fuerza', 'inteligencia', 'carisma'],
      paladin: ['fuerza', 'carisma', 'constitucion', 'sabiduria', 'destreza', 'inteligencia'],
      picaro: ['destreza', 'inteligencia', 'constitucion', 'carisma', 'sabiduria', 'fuerza']
    };

    const priority = statPriorities[claseId] || [primary as keyof AbilityScores, 'constitucion', 'destreza', 'sabiduria', 'carisma', 'inteligencia'];
    const newScores: AbilityScores = {
      fuerza: 10,
      destreza: 10,
      constitucion: 10,
      inteligencia: 10,
      sabiduria: 10,
      carisma: 10
    };
    priority.forEach((stat, idx) => {
      newScores[stat] = rolls[idx] || 10;
    });
    setBaseScores(newScores);
  };

  const handleFinish = () => {
    const finalScores = getFinalScores();
    const hitDie = parseHitDieNumber(selectedClass.atributos_basicos?.dado_puntos_golpe || '1d8');
    const maxHP = calculateMaxHP(
      hitDie,
      nivel,
      finalScores.constitucion,
      selectedBackground.dote?.toLowerCase().includes('duro')
    );

    // Collect traits
    const classTraits = selectedClass.progresion?.[0]?.rasgos || [];
    const speciesTraits = Object.values(selectedSpecies.rasgos || {}).map(
      (r: any) => `${r.nombre || 'Rasgo'}: ${r.descripcion || ''}`
    );
    const traits: string[] = [
      ...classTraits,
      ...speciesTraits
    ];

    // Collect feats
    const feats: string[] = [selectedBackground.detalle?.dote || selectedBackground.dote || 'alerta'];
    if (especieId === 'humano') {
      feats.push('habilidoso'); // Extra origin feat for humans
    }

    // Starter inventory items and currencies
    const inventoryItems: Array<{ item: any; cantidad: number; equipado: boolean }> = [];
    let initialGold = 0;

    // 1. Process Class Starting Equipment
    if (equipoClaseOption === 'a' && selectedClass.equipo?.opciones?.[0]?.contenido) {
      for (const itemDef of selectedClass.equipo.opciones[0].contenido) {
        if (itemDef.moneda) {
          initialGold += itemDef.cantidad || 0;
        } else {
          const catalogMatch = DND_EQUIPMENT_CATALOG.find((eq) => eq.id === itemDef.id) || {
            id: itemDef.id || 'objeto_clase',
            nombre: itemDef.texto || 'Objeto de clase',
            categoria: 'aventurero',
            peso_kg: 1,
            precio: { cantidad: 1, moneda: 'po' }
          };
          inventoryItems.push({
            item: catalogMatch,
            cantidad: itemDef.cantidad || 1,
            equipado: catalogMatch.categoria === 'armas' || catalogMatch.categoria === 'armaduras'
          });
        }
      }
    } else if (equipoClaseOption === 'b' && selectedClass.equipo?.opciones?.[1]?.contenido) {
      initialGold += selectedClass.equipo.opciones[1].contenido[0]?.cantidad || 75;
    }

    // 2. Process Background Starting Equipment
    if (equipoTrasfondoOption === 'a' && selectedBackground.equipo?.opciones?.[0]?.contenido) {
      for (const itemDef of selectedBackground.equipo.opciones[0].contenido) {
        if (itemDef.moneda) {
          initialGold += itemDef.cantidad || 0;
        } else {
          const catalogMatch = DND_EQUIPMENT_CATALOG.find((eq) => eq.id === itemDef.id) || {
            id: itemDef.id || 'objeto_trasfondo',
            nombre: itemDef.texto || 'Objeto de trasfondo',
            categoria: 'aventurero',
            peso_kg: 1,
            precio: { cantidad: 1, moneda: 'po' }
          };
          inventoryItems.push({
            item: catalogMatch,
            cantidad: itemDef.cantidad || 1,
            equipado: catalogMatch.categoria === 'armas' || catalogMatch.categoria === 'armaduras'
          });
        }
      }
    } else if (equipoTrasfondoOption === 'b') {
      initialGold += 50;
    }

    // Ensure at least one weapon is available if inventory is empty
    if (!inventoryItems.some((i) => i.item.categoria === 'armas')) {
      const basicDagger = DND_EQUIPMENT_CATALOG.find((eq) => eq.id === 'daga')!;
      inventoryItems.push({ item: basicDagger, cantidad: 1, equipado: true });
    }

    const classSaves = selectedClass.atributos_basicos?.salvaciones || ['fuerza', 'constitucion'];
    const classSkillOptions = Array.isArray(selectedClass.atributos_basicos?.habilidades?.opciones)
      ? selectedClass.atributos_basicos.habilidades.opciones
      : ['atletismo', 'percepcion'];
    const backgroundSkills = selectedBackground.detalle?.competencias?.habilidades || [];
    const isSpellcaster = !!selectedClass.progresion?.[0]?.espacios_conjuro;

    const newChar: Character = {
      id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      nombre,
      nivel,
      clase: claseId,
      subclase: nivel >= 3 ? (subclaseId || availableSubclasses[0]?.id || null) : null,
      especie: especieId,
      linaje: linaje || null,
      trasfondo: trasfondoId,
      alineamiento,
      puntos_experiencia: 0,
      inspiracion_heroica: false,
      caracteristicas: finalScores,
      puntos_de_golpe: {
        actuales: maxHP,
        maximos: maxHP,
        temporales: 0
      },
      dados_de_golpe: {
        total: nivel,
        gastados: 0,
        tipo_dado: hitDie
      },
      salvaciones_competentes: [...classSaves],
      habilidades_competentes: [
        ...backgroundSkills,
        ...classSkillOptions.slice(0, 2)
      ],
      habilidades_pericia: [],
      dotes: feats,
      rasgos: traits,
      maestrias_armas: ['espada_larga', 'hacha_a_dos_manos'],
      equipo: inventoryItems,
      monedas: {
        pc: 0,
        pp: 0,
        pe: 0,
        po: Math.max(initialGold, 10),
        ppt: 0
      },
      espacios_conjuro: {
        nivel1: { total: isSpellcaster ? 2 : 0, gastados: 0 },
        nivel2: { total: 0, gastados: 0 },
        nivel3: { total: 0, gastados: 0 },
        nivel4: { total: 0, gastados: 0 },
        nivel5: { total: 0, gastados: 0 },
        nivel6: { total: 0, gastados: 0 },
        nivel7: { total: 0, gastados: 0 },
        nivel8: { total: 0, gastados: 0 },
        nivel9: { total: 0, gastados: 0 }
      },
      conjuros_conocidos: isSpellcaster ? ['curar_heridas', 'descarga_de_fuego'] : [],
      conjuros_preparados: isSpellcaster ? ['curar_heridas', 'descarga_de_fuego'] : [],
      notas: `Creado como ${nombre}, ${selectedClass.nombre} de nivel ${nivel}.`,
      creado_en: new Date().toISOString(),
      actualizado_en: new Date().toISOString()
    };

    onCharacterCreated(newChar);
  };

  const classSavesList = selectedClass.atributos_basicos?.salvaciones || ['fuerza', 'constitucion'];
  const backgroundSkillsList = selectedBackground.detalle?.competencias?.habilidades || [];
  const classSkillsOptionsList = Array.isArray(selectedClass.atributos_basicos?.habilidades?.opciones)
    ? selectedClass.atributos_basicos.habilidades.opciones
    : ['atletismo', 'percepcion'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Trait Floating Modal */}
      {selectedTraitModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedTraitModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-100 p-1 rounded-lg hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-amber-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Rasgo de Especie</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-100 mb-2">
              {selectedTraitModal.nombre}
            </h3>
            {selectedTraitModal.nivel && (
              <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] px-2.5 py-0.5 rounded font-mono mb-3">
                Desbloqueo: Nivel {selectedTraitModal.nivel}
              </span>
            )}
            <div className="text-xs text-stone-300 leading-relaxed bg-stone-950/70 p-4 rounded-xl border border-stone-800/80 mb-5">
              {selectedTraitModal.descripcion}
            </div>
            <button
              onClick={() => setSelectedTraitModal(null)}
              className="w-full py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition"
            >
              Entendido / Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Class Detail Floating Modal */}
      {selectedClassDetailModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedClassDetailModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-100 p-1 rounded-lg hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-amber-400 mb-1">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Detalles de Clase (2024)</span>
            </div>
            <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-2xl text-amber-100">
                {selectedClassDetailModal.nombre}
              </h3>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3 py-1 rounded-lg font-mono font-bold">
                {selectedClassDetailModal.atributos_basicos?.dado_puntos_golpe || '1d8'} PG
              </span>
            </div>

            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              {selectedClassDetailModal.descripcion}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-stone-400 block font-semibold mb-1">Característica Principal:</span>
                <span className="text-amber-300 font-bold capitalize">
                  {Array.isArray(selectedClassDetailModal.caracteristica_principal)
                    ? selectedClassDetailModal.caracteristica_principal.join(', ')
                    : selectedClassDetailModal.caracteristica_principal || 'Fuerza'}
                </span>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-stone-400 block font-semibold mb-1">Tiradas de Salvación:</span>
                <span className="text-emerald-400 font-bold capitalize">
                  {selectedClassDetailModal.atributos_basicos?.salvaciones?.join(', ') || 'Fuerza, Constitución'}
                </span>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-stone-400 block font-semibold mb-1">Competencia en Armaduras:</span>
                <span className="text-stone-200">
                  {selectedClassDetailModal.atributos_basicos?.competencias?.armaduras?.join(', ') || 'Ninguna'}
                </span>
              </div>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span className="text-stone-400 block font-semibold mb-1">Competencia en Armas:</span>
                <span className="text-stone-200">
                  {selectedClassDetailModal.atributos_basicos?.competencias?.armas?.join(', ') || 'Armas sencillas'}
                </span>
              </div>
            </div>

            {/* Class Level 1 Traits */}
            <div className="mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Rasgos de Nivel 1:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedClassDetailModal.progresion?.[0]?.rasgos || ['Competencias de clase']).map((r, i) => (
                  <span
                    key={i}
                    className="bg-stone-950 border border-stone-800 text-amber-200 text-xs px-3 py-1 rounded-lg"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Subclasses available at level 3 */}
            <div className="mb-5">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
                Subclases Disponibles (Nivel 3+):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {DND_SUBCLASSES.filter((sc) => sc.clase === selectedClassDetailModal.id).map((sc) => (
                  <div key={sc.id} className="bg-stone-950/80 p-2.5 rounded-lg border border-stone-800">
                    <strong className="text-amber-300 block">{sc.nombre}</strong>
                    <p className="text-stone-400 text-[11px] line-clamp-2 mt-0.5">{sc.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setClaseId(selectedClassDetailModal.id);
                const firstSub = DND_SUBCLASSES.find((sc) => sc.clase === selectedClassDetailModal.id);
                setSubclaseId(firstSub?.id || '');
                setSelectedClassDetailModal(null);
              }}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition"
            >
              Seleccionar {selectedClassDetailModal.nombre}
            </button>
          </div>
        </div>
      )}

      {/* Wizard Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/20 text-amber-400 mb-3 border border-amber-500/30">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-amber-100">
          Creador de Personajes D&D 2024
        </h2>
        <p className="text-xs text-stone-400 mt-1 max-w-lg mx-auto">
          Crea tu aventurero paso a paso siguiendo fielmente las reglas del Player's Handbook 2024 (SRD 5.2).
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {[1, 2, 3, 4, 5, 6].map((st) => (
            <div
              key={st}
              onClick={() => setStep(st)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer ${
                step === st
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/30 font-extrabold'
                  : step > st
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-600/40'
                  : 'bg-stone-800 text-stone-500'
              }`}
            >
              {st}
            </div>
          ))}
        </div>
        <div className="text-xs font-medium text-stone-400 mt-2">
          {step === 1 && 'Paso 1: Identidad & Nivel'}
          {step === 2 && 'Paso 2: Especie & Linaje (Rasgos Desplegables)'}
          {step === 3 && 'Paso 3: Clase & Características'}
          {step === 4 && 'Paso 4: Trasfondo & Dote de Origen'}
          {step === 5 && 'Paso 5: Puntuaciones & Competencias (Presets & Bonificadores)'}
          {step === 6 && 'Paso 6: Equipo Inicial (Clase & Trasfondo)'}
        </div>
      </div>

      {/* STEP 1: IDENTITY & LEVEL */}
      {step === 1 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif font-bold text-lg text-amber-100">Identidad del Personaje</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 text-stone-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                  Nivel Inicial (1 a 20)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={nivel}
                  onChange={(e) => setNivel(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full bg-stone-950 border border-stone-800 text-stone-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                  Alineamiento
                </label>
                <select
                  value={alineamiento}
                  onChange={(e) => setAlineamiento(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 text-stone-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Legal Bueno">Legal Bueno</option>
                  <option value="Neutral Bueno">Neutral Bueno</option>
                  <option value="Caótico Bueno">Caótico Bueno</option>
                  <option value="Legal Neutral">Legal Neutral</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Caótico Neutral">Caótico Neutral</option>
                  <option value="Legal Malvado">Legal Malvado</option>
                  <option value="Neutral Malvado">Neutral Malvado</option>
                  <option value="Caótico Malvado">Caótico Malvado</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: SPECIES */}
      {step === 2 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-amber-100">
              Selecciona tu Especie (2024)
            </h3>
            <span className="text-xs text-amber-400/90 font-medium">
              💡 Haz clic en cualquier rasgo para ver su descripción flotante
            </span>
          </div>
          <p className="text-xs text-stone-400">
            En D&D 2024, las especies otorgan rasgos biológicos (visión en la oscuridad, velocidad, dones mágicos, trance élfico, etc.), mientras que los bonificadores de características provienen de tu trasfondo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DND_SPECIES.map((spec) => {
              const allTraits = Object.values(spec.rasgos || {}) as Array<{
                id?: string;
                nombre: string;
                descripcion: string;
                nivel?: number;
              }>;

              return (
                <div
                  key={spec.id}
                  onClick={() => {
                    setEspecieId(spec.id);
                    if (spec.linajes && spec.linajes.length > 0) {
                      setLinaje(spec.linajes[0].nombre);
                    } else {
                      setLinaje('');
                    }
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    especieId === spec.id
                      ? 'bg-amber-500/20 border-amber-500/60 shadow-md'
                      : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-stone-100">{spec.nombre}</span>
                      <span className="text-xs text-stone-400">{spec.velocidad?.base || 9} m</span>
                    </div>
                    <p className="text-xs text-stone-400 line-clamp-2">{spec.descripcion}</p>
                  </div>

                  {/* ALL Species Traits (Interactive Buttons) */}
                  <div className="mt-3 pt-2 border-t border-stone-800/60">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1">
                      Rasgos biológicos:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {allTraits.map((r, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTraitModal({
                              nombre: r.nombre,
                              descripcion: r.descripcion,
                              nivel: r.nivel
                            });
                          }}
                          className="inline-flex items-center space-x-1 bg-stone-900 hover:bg-amber-500/20 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 text-stone-300 px-2 py-0.5 rounded text-[10px] transition cursor-pointer"
                          title="Haz clic para ver descripción completa"
                        >
                          <span>{r.nombre}</span>
                          <Info className="w-2.5 h-2.5 text-amber-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed preview of the selected species traits */}
          <div className="mt-4 pt-4 border-t border-stone-800 space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Rasgos Activos de {selectedSpecies.nombre} (Haz clic para expandir):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {Object.values(selectedSpecies.rasgos || {}).map((r: any, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setSelectedTraitModal({
                      nombre: r.nombre,
                      descripcion: r.descripcion,
                      nivel: r.nivel
                    })
                  }
                  className="bg-stone-950 p-2.5 rounded-xl border border-stone-800 hover:border-amber-500/50 cursor-pointer transition text-xs group"
                >
                  <div className="flex items-center justify-between text-amber-300 font-bold mb-1 group-hover:text-amber-200">
                    <span>{r.nombre}</span>
                    <Info className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400" />
                  </div>
                  <p className="text-stone-400 text-[11px] line-clamp-2">{r.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subraces / Lineages if available */}
          {selectedSpecies.detalle?.selecciones && selectedSpecies.detalle.selecciones.length > 0 && (
            <div className="mt-4 pt-4 border-t border-stone-800 space-y-2">
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                {selectedSpecies.detalle.selecciones[0].nombre}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedSpecies.detalle.selecciones[0].opciones.map((lin: any) => (
                  <div
                    key={lin.id}
                    onClick={() => setLinaje(lin.nombre)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer ${
                      linaje === lin.nombre
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="font-bold block mb-0.5">{lin.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: CLASS & CHARACTERISTICS */}
      {step === 3 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-amber-100">Selecciona tu Clase</h3>
            <button
              onClick={() => setSelectedClassDetailModal(selectedClass)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs font-semibold border border-stone-700 transition"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Ver características de {selectedClass.nombre}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {DND_CLASSES.map((cls) => (
              <div
                key={cls.id}
                onClick={() => {
                  setClaseId(cls.id);
                  const firstSub = DND_SUBCLASSES.find((sc) => sc.clase === cls.id);
                  setSubclaseId(firstSub?.id || '');
                }}
                className={`p-3.5 rounded-xl border text-center cursor-pointer transition relative group ${
                  claseId === cls.id
                    ? 'bg-amber-500/20 border-amber-500/60 shadow-md text-amber-200'
                    : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClassDetailModal(cls);
                  }}
                  className="absolute top-2 right-2 text-stone-500 hover:text-amber-400 p-1"
                  title="Ver detalles de esta clase"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>

                <span className="font-bold text-sm block mb-1">{cls.nombre}</span>
                <span className="text-[11px] text-stone-400 block font-mono">
                  {cls.atributos_basicos?.dado_puntos_golpe || '1d8'} PG
                </span>
                <span className="text-[10px] text-stone-500 block truncate mt-1 uppercase">
                  {Array.isArray(cls.caracteristica_principal)
                    ? cls.caracteristica_principal.join(', ')
                    : cls.caracteristica_principal || 'Fuerza'}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Active Class Feature Summary */}
          <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">
                Características básicas de {selectedClass.nombre}:
              </span>
              <button
                onClick={() => setSelectedClassDetailModal(selectedClass)}
                className="text-amber-400 hover:text-amber-300 font-semibold text-[11px]"
              >
                Abrir ventana completa de clase →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-stone-300 pt-1">
              <div>
                <strong className="text-stone-400">Dado de Golpe:</strong>{' '}
                {selectedClass.atributos_basicos?.dado_puntos_golpe || '1d8'}
              </div>
              <div>
                <strong className="text-stone-400">Salvaciones:</strong>{' '}
                <span className="capitalize">{classSavesList.join(', ')}</span>
              </div>
              <div>
                <strong className="text-stone-400">Armaduras:</strong>{' '}
                {selectedClass.atributos_basicos?.competencias?.armaduras?.join(', ') || 'Ninguna'}
              </div>
            </div>
          </div>

          {/* Subclass Selection if Level >= 3 */}
          {nivel >= 3 && availableSubclasses.length > 0 && (
            <div className="mt-6 pt-6 border-t border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Subclase de {selectedClass.nombre} (Nivel 3+)
                </label>
                <span className="text-xs text-amber-400">4 subclases disponibles</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableSubclasses.map((sc) => (
                  <div
                    key={sc.id}
                    onClick={() => setSubclaseId(sc.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer ${
                      subclaseId === sc.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <span className="font-bold text-sm text-stone-200 block mb-1">
                      {sc.nombre}
                    </span>
                    <p className="text-stone-400 line-clamp-2">{sc.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: BACKGROUND & ORIGIN FEAT */}
      {step === 4 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif font-bold text-lg text-amber-100">
            Selecciona tu Trasfondo & Dote de Origen
          </h3>
          <p className="text-xs text-stone-400">
            En D&D 2024, el trasfondo otorga tus bonificaciones a características (+2 y +1 o +1/+1/+1), competencias de habilidad, de herramientas y tu Dote de Origen.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DND_BACKGROUNDS.map((bg) => (
              <div
                key={bg.id}
                onClick={() => {
                  setTrasfondoId(bg.id);
                  const allowed = bg.detalle.puntuaciones_caracteristica.opciones as Array<keyof AbilityScores>;
                  if (allowed.length >= 2) {
                    setStatBonusPlus2(allowed[0]);
                    setStatBonusPlus1(allowed[1]);
                    setStatBonus1A(allowed[0]);
                    setStatBonus1B(allowed[1]);
                    setStatBonus1C(allowed[2] || allowed[0]);
                  }
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition ${
                  trasfondoId === bg.id
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-200 shadow-md'
                    : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{bg.nombre}</span>
                </div>
                <span className="text-[11px] font-semibold text-amber-400 block mb-1">
                  Dote: {bg.dote}
                </span>
                <p className="text-xs text-stone-400 line-clamp-2 mb-2">{bg.descripcion}</p>
                <div className="text-[10px] text-stone-500">
                  Stats permitidos: {bg.detalle.puntuaciones_caracteristica.opciones.join(', ').toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          {/* Background Stat Bonus Config */}
          <div className="mt-6 pt-6 border-t border-stone-800 space-y-3">
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Asignación de Bonificadores de {selectedBackground.nombre}
            </h4>

            <div className="flex items-center space-x-4 text-xs">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="bonusMode"
                  checked={bonusMode === '2_1'}
                  onChange={() => setBonusMode('2_1')}
                  className="accent-amber-500"
                />
                <span>Opción 1: (+2 a una, +1 a otra)</span>
              </label>
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="bonusMode"
                  checked={bonusMode === '1_1_1'}
                  onChange={() => setBonusMode('1_1_1')}
                  className="accent-amber-500"
                />
                <span>Opción 2: (+1, +1, +1)</span>
              </label>
            </div>

            {bonusMode === '2_1' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-stone-400 block mb-1">+2 a:</label>
                  <select
                    value={statBonusPlus2}
                    onChange={(e) => setStatBonusPlus2(e.target.value as keyof AbilityScores)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200"
                  >
                    {selectedBackground.detalle.puntuaciones_caracteristica.opciones.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt} (+2)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">+1 a:</label>
                  <select
                    value={statBonusPlus1}
                    onChange={(e) => setStatBonusPlus1(e.target.value as keyof AbilityScores)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200"
                  >
                    {selectedBackground.detalle.puntuaciones_caracteristica.opciones
                      .filter((o) => o !== statBonusPlus2)
                      .map((opt) => (
                        <option key={opt} value={opt}>
                          {opt} (+1)
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-stone-400 block mb-1">+1 a:</label>
                  <select
                    value={statBonus1A}
                    onChange={(e) => setStatBonus1A(e.target.value as keyof AbilityScores)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200"
                  >
                    {selectedBackground.detalle.puntuaciones_caracteristica.opciones.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt} (+1)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">+1 a:</label>
                  <select
                    value={statBonus1B}
                    onChange={(e) => setStatBonus1B(e.target.value as keyof AbilityScores)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200"
                  >
                    {selectedBackground.detalle.puntuaciones_caracteristica.opciones.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt} (+1)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">+1 a:</label>
                  <select
                    value={statBonus1C}
                    onChange={(e) => setStatBonus1C(e.target.value as keyof AbilityScores)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200"
                  >
                    {selectedBackground.detalle.puntuaciones_caracteristica.opciones.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt} (+1)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 5: ABILITY SCORES & COMPETENCIES */}
      {step === 5 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
          {/* Competencies summary acquired so far */}
          <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Competencias Adquiridas de Clase & Trasfondo:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block font-semibold mb-1">
                  🛡️ Tiradas de Salvación con Competencia ({selectedClass.nombre}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {classSavesList.map((save) => (
                    <span
                      key={save}
                      className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-semibold capitalize"
                    >
                      {save}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-stone-400 block font-semibold mb-1">
                  🎯 Habilidades con Competencia ({selectedBackground.nombre} & {selectedClass.nombre}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {backgroundSkillsList.map((skill) => (
                    <span
                      key={skill}
                      className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-lg font-semibold capitalize"
                    >
                      {skill.replace('_', ' ')}
                    </span>
                  ))}
                  {classSkillsOptionsList.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2.5 py-1 rounded-lg font-semibold capitalize"
                    >
                      {skill.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Presets and generator buttons */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-serif font-bold text-lg text-amber-100">
                Puntuaciones de Característica
              </h3>

              {/* 3 Preset Modes */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={() => {
                    setRollHistory(null);
                    setBaseScores({
                      fuerza: 15,
                      destreza: 14,
                      constitucion: 13,
                      inteligencia: 12,
                      sabiduria: 10,
                      carisma: 8
                    });
                  }}
                  className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg border border-stone-700 transition"
                  title="Array Estándar oficial de D&D: 15, 14, 13, 12, 10, 8"
                >
                  Array Estándar (15, 14, 13...)
                </button>

                <button
                  onClick={() => {
                    setRollHistory(null);
                    setBaseScores({
                      fuerza: 10,
                      destreza: 10,
                      constitucion: 10,
                      inteligencia: 10,
                      sabiduria: 10,
                      carisma: 10
                    });
                  }}
                  className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg border border-stone-700 transition"
                  title="Valores libres: todas en 10 para ajustar a mano"
                >
                  Valores Libres (Base 10)
                </button>

                <button
                  onClick={handleGenerateRandomScores}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition shadow-md shadow-amber-500/20"
                  title="Genera 6 puntuaciones tirando 4d6 y descartando el menor según reglas oficiales de D&D"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>Tirar 4d6 Aleatorio</span>
                </button>
              </div>
            </div>

            {rollHistory && (
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center justify-between">
                <span>
                  🎲 Tiradas 4d6 oficiales obtenidas: <strong>{rollHistory.join(', ')}</strong> (asignadas por prioridad de clase).
                </span>
                <span className="text-[10px] text-amber-400/80">Puedes modificarlas libremente abajo</span>
              </div>
            )}
          </div>

          {/* Ability Scores Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {(
              [
                ['fuerza', 'Fuerza', 'FUE'],
                ['destreza', 'Destreza', 'DES'],
                ['constitucion', 'Constitución', 'CON'],
                ['inteligencia', 'Inteligencia', 'INT'],
                ['sabiduria', 'Sabiduría', 'SAB'],
                ['carisma', 'Carisma', 'CAR']
              ] as const
            ).map(([key, label, shortLabel]) => {
              const base = baseScores[key];
              const bonus = getStatBonus(key);
              const final = base + bonus;
              const mod = calculateModifier(final);

              return (
                <div
                  key={key}
                  className="bg-stone-950 border border-stone-800 rounded-xl p-3 flex flex-col items-center text-center shadow-inner"
                >
                  <span className="text-xs font-bold text-stone-400">{shortLabel}</span>
                  <span className="text-[10px] text-stone-500 mb-1">{label}</span>

                  <div className="flex items-center space-x-1 my-1">
                    <button
                      onClick={() =>
                        setBaseScores({
                          ...baseScores,
                          [key]: Math.max(3, base - 1)
                        })
                      }
                      className="w-6 h-6 rounded bg-stone-800 text-stone-300 hover:text-stone-100 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono text-lg font-bold text-stone-100 w-7">
                      {base}
                    </span>
                    <button
                      onClick={() =>
                        setBaseScores({
                          ...baseScores,
                          [key]: Math.min(20, base + 1)
                        })
                      }
                      className="w-6 h-6 rounded bg-stone-800 text-stone-300 hover:text-stone-100 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Bonus indication */}
                  <div className="text-[10px] font-medium mt-1">
                    {bonus > 0 ? (
                      <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                        +{bonus} Trasfondo
                      </span>
                    ) : (
                      <span className="text-stone-600">+0 Trasfondo</span>
                    )}
                  </div>

                  {/* Final score and modifier */}
                  <div className="text-xs text-amber-400 font-bold mt-2 pt-1 border-t border-stone-800/80 w-full">
                    {final} ({formatModifier(mod)})
                  </div>
                </div>
              );
            })}
          </div>

          {/* Breakdown explanation panel */}
          <div className="p-4 bg-stone-950/90 rounded-xl border border-stone-800 space-y-2 text-xs">
            <span className="font-bold text-amber-300 block">
              📊 Desglose de Bonificadores Aplicados ({selectedBackground.nombre}):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-stone-300">
              {(
                [
                  ['fuerza', 'Fuerza'],
                  ['destreza', 'Destreza'],
                  ['constitucion', 'Constitución'],
                  ['inteligencia', 'Inteligencia'],
                  ['sabiduria', 'Sabiduría'],
                  ['carisma', 'Carisma']
                ] as const
              ).map(([key, label]) => {
                const base = baseScores[key];
                const bonus = getStatBonus(key);
                const final = base + bonus;
                const mod = calculateModifier(final);
                return (
                  <div key={key} className="bg-stone-900/80 p-2 rounded-lg border border-stone-800/80">
                    <strong className="text-stone-400 block">{label}:</strong>
                    <span>
                      Base {base} {bonus > 0 ? `+ ${bonus}` : '+ 0'} ={' '}
                      <strong className="text-amber-300">{final}</strong> ({formatModifier(mod)})
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              * Los bonificadores proceden de tu elección en el Paso 4 (Trasfondo: {selectedBackground.nombre}).
            </p>
          </div>
        </div>
      )}

      {/* STEP 6: STARTING EQUIPMENT (CLASS + BACKGROUND) */}
      {step === 6 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-serif font-bold text-lg text-amber-100">
            Equipo Inicial & Confirmación (D&D 2024)
          </h3>
          <p className="text-xs text-stone-400">
            En D&D 2024 recibes equipo inicial tanto de tu <strong>Clase</strong> como de tu <strong>Trasfondo</strong> (o puedes optar por riqueza en oro para comprar libremente).
          </p>

          {/* 1. Class Equipment Selection */}
          <div className="space-y-3 p-4 bg-stone-950/80 rounded-xl border border-stone-800">
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm">
              <Swords className="w-4 h-4" />
              <span>1. Equipo Inicial de Clase ({selectedClass.nombre})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setEquipoClaseOption('a')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  equipoClaseOption === 'a'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                    : 'bg-stone-900 border-stone-800 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">Opción A: Paquete de Clase</span>
                  {equipoClaseOption === 'a' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-xs text-stone-300 mb-2">
                  Incluye las armas principales, armaduras y paquetes de aventurero propios de {selectedClass.nombre}:
                </p>
                <div className="space-y-1 text-[11px] text-amber-300/90 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800">
                  {selectedClass.equipo?.opciones?.[0]?.contenido ? (
                    selectedClass.equipo.opciones[0].contenido.map((item, idx) => (
                      <div key={idx}>
                        • {item.cantidad}x {item.texto} {item.moneda && 'PO'}
                      </div>
                    ))
                  ) : (
                    <div>• Armas y armaduras estándar de la clase + 15 PO</div>
                  )}
                </div>
              </div>

              <div
                onClick={() => setEquipoClaseOption('b')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  equipoClaseOption === 'b'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                    : 'bg-stone-900 border-stone-800 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">
                    Opción B: Oro Inicial de Clase ({selectedClass.equipo?.opciones?.[1]?.contenido?.[0]?.cantidad || 75} PO)
                  </span>
                  {equipoClaseOption === 'b' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-xs text-stone-400 mb-2">
                  Compra libre: comienzas sin el equipo predeterminado y con oro suficiente para comprar armas y armaduras a tu gusto en la tienda interactiva.
                </p>
                <div className="text-[11px] text-amber-400 font-mono bg-stone-950/60 p-2.5 rounded-lg border border-stone-800">
                  Total de oro recibido: {selectedClass.equipo?.opciones?.[1]?.contenido?.[0]?.cantidad || 75} Piezas de Oro
                </div>
              </div>
            </div>
          </div>

          {/* 2. Background Equipment Selection */}
          <div className="space-y-3 p-4 bg-stone-950/80 rounded-xl border border-stone-800">
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm">
              <Backpack className="w-4 h-4" />
              <span>2. Equipo Inicial de Trasfondo ({selectedBackground.nombre})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setEquipoTrasfondoOption('a')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  equipoTrasfondoOption === 'a'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                    : 'bg-stone-900 border-stone-800 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">Opción A: Equipo Temático</span>
                  {equipoTrasfondoOption === 'a' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-xs text-stone-300 mb-2">
                  Herramientas, ropas de oficio y oro del trasfondo {selectedBackground.nombre}:
                </p>
                <div className="space-y-1 text-[11px] text-amber-300/90 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800">
                  {selectedBackground.equipo?.opciones?.[0]?.contenido ? (
                    selectedBackground.equipo.opciones[0].contenido.map((item, idx) => (
                      <div key={idx}>
                        • {item.cantidad}x {item.texto} {item.moneda && 'PO'}
                      </div>
                    ))
                  ) : (
                    <div>• Ropas de viaje, herramientas y 10 PO</div>
                  )}
                </div>
              </div>

              <div
                onClick={() => setEquipoTrasfondoOption('b')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  equipoTrasfondoOption === 'b'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                    : 'bg-stone-900 border-stone-800 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">Opción B: 50 Piezas de Oro (PO)</span>
                  {equipoTrasfondoOption === 'b' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-xs text-stone-400 mb-2">
                  Monedas de oro adicionales para adquirir equipo personalizado en lugar del kit de trasfondo predeterminado.
                </p>
                <div className="text-[11px] text-amber-400 font-mono bg-stone-950/60 p-2.5 rounded-lg border border-stone-800">
                  Total de oro recibido: 50 Piezas de Oro
                </div>
              </div>
            </div>
          </div>

          {/* Review Summary Card */}
          <div className="p-4 bg-stone-950/90 rounded-xl border border-stone-800 space-y-2 text-xs">
            <h4 className="font-bold text-amber-300 text-sm">Resumen Final del Aventurero:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-300">
              <div>
                <strong className="text-stone-400">Nombre:</strong> {nombre}
              </div>
              <div>
                <strong className="text-stone-400">Clase:</strong> {selectedClass.nombre} Nv. {nivel}
              </div>
              <div>
                <strong className="text-stone-400">Especie:</strong> {selectedSpecies.nombre}{' '}
                {linaje && `(${linaje})`}
              </div>
              <div>
                <strong className="text-stone-400">Trasfondo:</strong> {selectedBackground.nombre}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-sm font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>
        ) : (
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 rounded-xl text-sm font-medium transition"
          >
            Cancelar
          </button>
        )}

        {step < 6 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center space-x-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-sm transition shadow-lg shadow-amber-500/20"
          >
            <span>Siguiente</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="flex items-center space-x-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20"
          >
            <Check className="w-4 h-4" />
            <span>Crear y Abrir Ficha</span>
          </button>
        )}
      </div>
    </div>
  );
};

