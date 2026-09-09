import React, { useState } from 'react';
import { Character, AbilityScores, ClassDefinition, FeatDefinition } from '../types';
import { DND_CLASSES } from '../data/dndClasses';
import { DND_SPECIES } from '../data/dndSpecies';
import { DND_BACKGROUNDS } from '../data/dndBackgrounds';
import { DND_SUBCLASSES } from '../data/dndSubclasses';
import { DND_EQUIPMENT_CATALOG } from '../data/dndEquipment';
import { DND_FEATS } from '../data/dndFeats';
import { getClassFeatureInfo } from '../data/dndClassFeatures';
import { calculateMaxHP, calculateModifier, formatModifier, parseHitDieNumber } from '../utils/dndCalculations';
import {
  Sparkles,
  Shield,
  ArrowRight,
  ArrowLeft,
  Check,
  Dices,
  Info,
  X,
  Swords,
  Backpack,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen
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

  // Step 1: Identity & Fixed Level 1
  const [nombre, setNombre] = useState('Nuevo Héroe');
  const nivel = 1; // Nivel 1 obligatorio e informativo en la creación
  const [alineamiento, setAlineamiento] = useState('Neutral Bueno');

  // Step 2: Species, Lineages & Traits
  const [especieId, setEspecieId] = useState('humano');
  const [linaje, setLinaje] = useState<string>('');
  const [humanExtraSkill, setHumanExtraSkill] = useState<string>('persuasion');
  const [humanOriginFeat, setHumanOriginFeat] = useState<string>('alerta');
  const [elfSkillChoice, setElfSkillChoice] = useState<string>('percepcion');

  // Step 3: Class
  const [claseId, setClaseId] = useState('guerrero');

  // Step 4: Background & Ability Score bonuses
  const [trasfondoId, setTrasfondoId] = useState('soldado');
  const [bonusMode, setBonusMode] = useState<'2_1' | '1_1_1'>('2_1');
  const [statBonusPlus2, setStatBonusPlus2] = useState<keyof AbilityScores>('fuerza');
  const [statBonusPlus1, setStatBonusPlus1] = useState<keyof AbilityScores>('constitucion');
  const [statBonus1A, setStatBonus1A] = useState<keyof AbilityScores>('fuerza');
  const [statBonus1B, setStatBonus1B] = useState<keyof AbilityScores>('destreza');
  const [statBonus1C, setStatBonus1C] = useState<keyof AbilityScores>('constitucion');

  // Step 5: Base ability scores (Standard Array by default)
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

  // Class chosen skill proficiencies
  const [selectedClassSkills, setSelectedClassSkills] = useState<string[]>(['atletismo', 'supervivencia']);

  // Step 6: Equipment
  const [equipoClaseOption, setEquipoClaseOption] = useState<'a' | 'b'>('a');
  const [equipoTrasfondoOption, setEquipoTrasfondoOption] = useState<'a' | 'b'>('a');

  // Accordion toggle states
  const [expandedSubclasses, setExpandedSubclasses] = useState<Record<string, boolean>>({});
  const [expandedBackgrounds, setExpandedBackgrounds] = useState<Record<string, boolean>>({});
  const [expandedLineages, setExpandedLineages] = useState<Record<string, boolean>>({});

  // Unified Floating Info Modal (Rules, traits, feats, class features)
  const [infoModal, setInfoModal] = useState<{
    titulo: string;
    subtitulo?: string;
    badge?: string;
    descripcion: string;
  } | null>(null);

  // Class detailed modal
  const [selectedClassDetailModal, setSelectedClassDetailModal] = useState<ClassDefinition | null>(null);

  // Selected definitions
  const selectedSpecies = DND_SPECIES.find((s) => s.id === especieId) || DND_SPECIES[0];
  const selectedClass = DND_CLASSES.find((c) => c.id === claseId) || DND_CLASSES[0];
  const selectedBackground = DND_BACKGROUNDS.find((b) => b.id === trasfondoId) || DND_BACKGROUNDS[0];
  const availableSubclasses = DND_SUBCLASSES.filter((sc) => sc.clase === claseId);

  // Origin feats catalog for selection & lookup
  const originFeatsList = DND_FEATS.filter((f) => f.categoria === 'Origen');
  const backgroundFeatDef = DND_FEATS.find((f) => f.id === selectedBackground.detalle?.dote) || {
    id: selectedBackground.detalle?.dote || 'dote_origen',
    nombre: selectedBackground.dote || 'Dote de Origen',
    categoria: 'Origen',
    descripcion: 'Dote otorgada por tu trasfondo según las reglas de D&D 2024 (SRD 5.2).'
  };

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
    rolls.sort((a, b) => b - a);
    setRollHistory([...rolls]);

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
      newScores[stat] = rolls[idx];
    });

    setBaseScores(newScores);
  };

  // Toggle helper for accordions
  const toggleSubclassAccordion = (id: string) => {
    setExpandedSubclasses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBackgroundAccordion = (id: string) => {
    setExpandedBackgrounds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLineageAccordion = (id: string) => {
    setExpandedLineages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFinish = () => {
    const finalScores = getFinalScores();
    const hitDie = parseHitDieNumber(selectedClass.atributos_basicos?.dado_puntos_golpe || '1d8');
    const hasTough = selectedBackground.dote?.toLowerCase().includes('duro') || (especieId === 'humano' && humanOriginFeat === 'duro');
    const maxHP = calculateMaxHP(
      hitDie,
      nivel,
      finalScores.constitucion,
      hasTough
    );

    // Traits collection
    const classTraits = selectedClass.progresion?.[0]?.rasgos || [];
    const speciesTraits = Object.values(selectedSpecies.rasgos || {}).map(
      (r: any) => `${r.nombre || 'Rasgo'}: ${r.descripcion || ''}`
    );
    const traits: string[] = [...classTraits, ...speciesTraits];

    // Feats collection: Background feat + Human Versatile feat
    const feats: string[] = [selectedBackground.detalle?.dote || selectedBackground.dote || 'alerta'];
    if (especieId === 'humano' && humanOriginFeat) {
      if (!feats.includes(humanOriginFeat)) {
        feats.push(humanOriginFeat);
      }
    }

    // Starting inventory items and coins
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

    // Ensure at least one weapon is present
    if (!inventoryItems.some((i) => i.item.categoria === 'armas')) {
      const basicDagger = DND_EQUIPMENT_CATALOG.find((eq) => eq.id === 'daga')!;
      inventoryItems.push({ item: basicDagger, cantidad: 1, equipado: true });
    }

    const classSaves = selectedClass.atributos_basicos?.salvaciones || ['fuerza', 'constitucion'];
    const backgroundSkills = selectedBackground.detalle?.competencias?.habilidades || [];
    const isSpellcaster = !!selectedClass.progresion?.[0]?.espacios_conjuro;

    // Build skill competencies list
    const finalSkills = [...backgroundSkills];
    selectedClassSkills.forEach((s) => {
      if (!finalSkills.includes(s)) finalSkills.push(s);
    });
    if (especieId === 'humano' && humanExtraSkill && !finalSkills.includes(humanExtraSkill)) {
      finalSkills.push(humanExtraSkill);
    }
    if (especieId === 'elfo' && elfSkillChoice && !finalSkills.includes(elfSkillChoice)) {
      finalSkills.push(elfSkillChoice);
    }

    const newChar: Character = {
      id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      nombre,
      nivel: 1,
      clase: claseId,
      subclase: null, // Las subclases se eligen a nivel 3 en la hoja de personaje
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
        total: 1,
        gastados: 0,
        tipo_dado: hitDie
      },
      salvaciones_competentes: [...classSaves],
      habilidades_competentes: finalSkills,
      habilidades_pericia: [],
      dotes: feats,
      rasgos: traits,
      maestrias_armas: ['espada_larga', 'hacha_a_dos_manos'],
      equipo: inventoryItems,
      monedas: {
        pc: 0,
        pp: 0,
        pe: 0,
        po: Math.max(initialGold, 15),
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
      notas: `Creado como ${nombre}, ${selectedClass.nombre} de nivel 1.`,
      creado_en: new Date().toISOString(),
      actualizado_en: new Date().toISOString()
    };

    onCharacterCreated(newChar);
  };

  const classSavesList = selectedClass.atributos_basicos?.salvaciones || ['fuerza', 'constitucion'];
  const backgroundSkillsList = selectedBackground.detalle?.competencias?.habilidades || [];
  const classSkillsOptionsList = Array.isArray(selectedClass.atributos_basicos?.habilidades?.opciones)
    ? selectedClass.atributos_basicos.habilidades.opciones
    : ['atletismo', 'percepcion', 'supervivencia', 'intimidacion'];

  // All 18 skills for Diestro (Human)
  const allSkillsList = [
    'acrobacias', 'arcanos', 'atletismo', 'engano', 'historia',
    'interpretacion', 'intimidacion', 'investigacion', 'juego_de_manos',
    'medicina', 'naturaleza', 'percepcion', 'perspicacia', 'persuasion',
    'religion', 'sigilo', 'supervivencia', 'trato_con_animales'
  ];

  // Helper to open floating info modal for feats
  const openFeatModal = (featDef: FeatDefinition) => {
    setInfoModal({
      titulo: featDef.nombre,
      subtitulo: `Dote (${featDef.categoria})`,
      badge: featDef.categoria === 'Origen' ? 'Dote de Origen (Nivel 1)' : featDef.categoria,
      descripcion: featDef.descripcion
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Universal Floating Info Modal */}
      {infoModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto animate-in fade-in duration-200">
            <button
              onClick={() => setInfoModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-100 p-1.5 rounded-lg hover:bg-stone-800 transition"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {infoModal.subtitulo || 'Detalles de Regla'}
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-100 mb-2">
              {infoModal.titulo}
            </h3>
            {infoModal.badge && (
              <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] px-2.5 py-0.5 rounded font-mono mb-3">
                {infoModal.badge}
              </span>
            )}
            <div className="text-xs text-stone-300 leading-relaxed bg-stone-950/70 p-4 rounded-xl border border-stone-800/80 mb-5 whitespace-pre-line">
              {infoModal.descripcion}
            </div>
            <button
              onClick={() => setInfoModal(null)}
              className="w-full py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition"
            >
              Entendido / Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Class Detail Modal with interactive '!' feature buttons */}
      {selectedClassDetailModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedClassDetailModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-100 p-1.5 rounded-lg hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-amber-400 mb-1">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Información de Clase (SRD 5.2)</span>
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

            {/* Class Level 1 Features with '!' info buttons */}
            <div className="mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Rasgos de Clase (Nivel 1):
              </span>
              <div className="flex flex-wrap gap-2">
                {(selectedClassDetailModal.progresion?.[0]?.rasgos || ['Competencias de clase']).map((r, i) => {
                  const featInfo = getClassFeatureInfo(r);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setInfoModal({
                          titulo: featInfo.nombre,
                          subtitulo: `Rasgo de ${selectedClassDetailModal.nombre}`,
                          badge: `Nivel ${featInfo.nivel}`,
                          descripcion: featInfo.descripcion
                        })
                      }
                      className="inline-flex items-center space-x-1.5 bg-stone-950 hover:bg-amber-500/20 text-amber-200 hover:text-amber-300 border border-stone-800 hover:border-amber-500/50 text-xs px-3 py-1.5 rounded-lg transition cursor-pointer"
                      title="Haz clic para ver las reglas completas del rasgo"
                    >
                      <span>{r}</span>
                      <Info className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  );
                })}
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
                    <p className="text-stone-400 text-[11px] mt-0.5">{sc.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setClaseId(selectedClassDetailModal.id);
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
          Creador de Personaje
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
          {step === 1 && 'Paso 1: Identidad (Nivel 1)'}
          {step === 2 && 'Paso 2: Especie & Linaje'}
          {step === 3 && 'Paso 3: Clase'}
          {step === 4 && 'Paso 4: Trasfondo'}
          {step === 5 && 'Paso 5: Puntuaciones & Competencias'}
          {step === 6 && 'Paso 6: Equipo Inicial'}
        </div>
      </div>

      {/* STEP 1: IDENTITY */}
      {step === 1 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-lg text-amber-100">Datos Iniciales del Personaje</h3>
            <span className="text-xs text-stone-400">Paso 1 de 6</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                Nombre del Personaje
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Valeros, Miriel, Korgan..."
                className="w-full bg-stone-950 border border-stone-800 text-stone-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nivel Inicial: Informativo, No editable */}
              <div className="bg-stone-950/80 border border-stone-800/90 rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    Nivel Inicial
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold font-mono text-amber-400">Nivel 1</span>
                    <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
                      Fijo en creación
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-500 mt-2">
                  Todos los aventureros comienzan en Nivel 1. El avance de nivel se realiza posteriormente en la Hoja de Personaje.
                </p>
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
                <p className="text-[11px] text-stone-500 mt-2">
                  Perspectiva moral y ética de tu personaje ante el mundo y la ley.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: SPECIES & LINEAGES */}
      {step === 2 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-amber-100">
              Selecciona tu Especie
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Las especies otorgan rasgos biológicos como velocidad, visión y sentidos especiales. Las tarjetas de selección son limpias; consulta la información completa pulsando el icono <strong>!</strong>.
            </p>
          </div>

          {/* Clean species grid: No duplicated trait clutter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DND_SPECIES.map((spec) => {
              const isSelected = especieId === spec.id;
              return (
                <div
                  key={spec.id}
                  onClick={() => {
                    setEspecieId(spec.id);
                    if (spec.linajes && Object.keys(spec.linajes).length > 0) {
                      const firstKey = Object.keys(spec.linajes)[0];
                      setLinaje((spec.linajes as any)[firstKey]?.nombre || firstKey);
                    } else if (spec.detalle?.selecciones?.[0]?.opciones?.length) {
                      setLinaje(spec.detalle.selecciones[0].opciones[0].nombre);
                    } else {
                      setLinaje('');
                    }
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                      : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-bold text-sm ${isSelected ? 'text-amber-200 font-extrabold' : 'text-stone-100'}`}>
                        {spec.nombre}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const traitsSummary = Object.values(spec.rasgos || {})
                            .map((r: any) => `• ${r.nombre}: ${r.descripcion}`)
                            .join('\n\n');
                          setInfoModal({
                            titulo: spec.nombre,
                            subtitulo: 'Especie (SRD 5.2)',
                            badge: `Velocidad ${spec.velocidad?.base || 9} m`,
                            descripcion: `${spec.descripcion}\n\nRasgos biológicos:\n${traitsSummary}`
                          });
                        }}
                        className="p-1 rounded text-stone-500 hover:text-amber-400 hover:bg-stone-800/80 transition"
                        title="Ver información completa de especie"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {spec.descripcion}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Velocidad: <strong>{spec.velocidad?.base || 9} m</strong></span>
                    <span className="capitalize text-stone-500">
                      {spec.tamano?.tipo === 'fijo' ? spec.tamano.valor : 'Mediano/Pequeño'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section: Traits & Choices of the Selected Species */}
          <div className="p-5 bg-stone-950/80 rounded-xl border border-amber-500/30 space-y-5">
            <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Rasgos y Elecciones de {selectedSpecies.nombre}
              </h4>
            </div>

            {/* Biological Traits List with '!' Button */}
            <div>
              <span className="text-xs font-semibold text-stone-300 block mb-2">
                Rasgos biológicos concedidos:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.values(selectedSpecies.rasgos || {}).map((r: any, idx) => (
                  <div
                    key={idx}
                    className="bg-stone-900/80 p-3 rounded-xl border border-stone-800/80 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-amber-200">{r.nombre}</span>
                        {r.nivel && r.nivel > 1 && (
                          <span className="text-[10px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded font-mono">
                            Nv. {r.nivel}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">{r.descripcion}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setInfoModal({
                          titulo: r.nombre,
                          subtitulo: `Rasgo de ${selectedSpecies.nombre}`,
                          badge: r.nivel ? `Desbloqueo Nivel ${r.nivel}` : 'Rasgo permanente',
                          descripcion: r.descripcion
                        })
                      }
                      className="p-1 rounded text-stone-500 hover:text-amber-400 hover:bg-stone-800 transition shrink-0"
                      title="Consultar descripción completa"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Subspecies / Lineages Accordion (Elf, Gnome, Goliath, Dragonborn, Tiefling) */}
            {selectedSpecies.linajes && Object.keys(selectedSpecies.linajes).length > 0 && (
              <div className="pt-4 border-t border-stone-800/80 space-y-2">
                <label className="block text-xs font-semibold text-stone-200 uppercase tracking-wider">
                  Linaje de {selectedSpecies.nombre} (Selección obligatoria):
                </label>
                <div className="space-y-2">
                  {Object.entries(selectedSpecies.linajes).map(([key, linDef]: [string, any]) => {
                    const isLinSelected = linaje === linDef.nombre || linaje === key;
                    const isExpanded = !!expandedLineages[key];
                    return (
                      <div
                        key={key}
                        className={`rounded-xl border transition ${
                          isLinSelected
                            ? 'bg-amber-500/10 border-amber-500/50'
                            : 'bg-stone-900/60 border-stone-800'
                        }`}
                      >
                        <div
                          onClick={() => setLinaje(linDef.nombre)}
                          className="p-3 flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="lineageChoice"
                              checked={isLinSelected}
                              onChange={() => setLinaje(linDef.nombre)}
                              className="accent-amber-500"
                            />
                            <span className={`text-xs font-bold ${isLinSelected ? 'text-amber-300' : 'text-stone-200'}`}>
                              {linDef.nombre}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLineageAccordion(key);
                            }}
                            className="inline-flex items-center space-x-1 text-[11px] text-amber-400 hover:text-amber-300 py-0.5 px-2 rounded hover:bg-stone-800 transition"
                          >
                            <span>{isExpanded ? 'Ocultar' : 'Ver detalles'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="px-4 pb-3 pt-1 text-xs text-stone-300 border-t border-stone-800/60 bg-stone-950/40 leading-relaxed">
                            {linDef.descripcion}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Other Species with options in detalle.selecciones (e.g. Elf Sentidos Agudos, Goliath, Dragonborn) */}
            {selectedSpecies.detalle?.selecciones && selectedSpecies.detalle.selecciones.length > 0 && (
              <div className="pt-4 border-t border-stone-800/80 space-y-4">
                {selectedSpecies.detalle.selecciones.map((sel: any) => {
                  // If it's a skill selection like Elf Sentidos Agudos
                  if (sel.id === 'sentidos_agudos' && especieId === 'elfo') {
                    return (
                      <div key={sel.id} className="space-y-1.5">
                        <label className="block text-xs font-semibold text-stone-200 uppercase tracking-wider">
                          {sel.nombre} (Habilidad a elegir):
                        </label>
                        <select
                          value={elfSkillChoice}
                          onChange={(e) => setElfSkillChoice(e.target.value)}
                          className="w-full sm:w-72 bg-stone-900 border border-stone-800 text-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 capitalize"
                        >
                          {sel.opciones.map((opt: any) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  // Non-human lineage options (Draconic, Goliath, Tiefling) if linajes wasn't used
                  if (!selectedSpecies.linajes && (sel.id === 'linaje_draconico' || sel.id === 'linaje_gigante' || sel.id === 'legado_infernal')) {
                    return (
                      <div key={sel.id} className="space-y-2">
                        <label className="block text-xs font-semibold text-stone-200 uppercase tracking-wider">
                          {sel.nombre} (Selección obligatoria):
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sel.opciones.map((opt: any) => {
                            const isOptSelected = linaje === opt.nombre || linaje === opt.id;
                            return (
                              <div
                                key={opt.id}
                                onClick={() => setLinaje(opt.nombre)}
                                className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition ${
                                  isOptSelected
                                    ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                                }`}
                              >
                                <span>{opt.nombre}</span>
                                {isOptSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            )}

            {/* Human Specific Choices (Requirement 5: Diestro Skill + Versátil Origin Feat) */}
            {especieId === 'humano' && (
              <div className="pt-4 border-t border-stone-800/80 space-y-4">
                <div className="flex items-center space-x-2 text-amber-300">
                  <Award className="w-4 h-4" />
                  <h5 className="text-xs font-bold uppercase tracking-wider">
                    Elecciones Especiales del Humano (2024)
                  </h5>
                </div>

                {/* 1. Diestro: Competencia de Habilidad Extra */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-200">
                      1. Rasgo Diestro: Habilidad adicional
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setInfoModal({
                          titulo: 'Diestro (Humano)',
                          subtitulo: 'Rasgo de Especie',
                          badge: 'Competencia adicional',
                          descripcion: 'Ganas competencia en una habilidad adicional de tu elección a nivel 1.'
                        })
                      }
                      className="text-stone-400 hover:text-amber-400 text-[11px] inline-flex items-center space-x-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Info</span>
                    </button>
                  </div>
                  <select
                    value={humanExtraSkill}
                    onChange={(e) => setHumanExtraSkill(e.target.value)}
                    className="w-full sm:w-80 bg-stone-900 border border-stone-800 text-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 capitalize"
                  >
                    {allSkillsList.map((sk) => (
                      <option key={sk} value={sk}>
                        {sk.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Versátil: Selección funcional de Dote de Origen con icono '!' */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-200">
                      2. Rasgo Versátil: Dote de Origen adicional
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const currentFeat = originFeatsList.find((f) => f.id === humanOriginFeat);
                        if (currentFeat) openFeatModal(currentFeat);
                      }}
                      className="text-amber-400 hover:text-amber-300 text-[11px] inline-flex items-center space-x-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Consultar dote elegida</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={humanOriginFeat}
                      onChange={(e) => setHumanOriginFeat(e.target.value)}
                      className="flex-1 bg-stone-900 border border-stone-800 text-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                    >
                      {originFeatsList.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.nombre} ({f.categoria})
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        const currentFeat = originFeatsList.find((f) => f.id === humanOriginFeat);
                        if (currentFeat) openFeatModal(currentFeat);
                      }}
                      className="p-2 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl border border-stone-700 transition"
                      title="Ver información de esta dote"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-400 italic">
                    * Esta dote se suma funcionalmente a tu personaje junto a la dote proporcionada por tu trasfondo.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: CLASS & LEVEL 3 SUBCLASSES PREVIEW */}
      {step === 3 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-amber-100">Selecciona tu Clase</h3>
              <p className="text-xs text-stone-400 mt-0.5">
                La clase define tu vocación y tus capacidades en combate y magia. Pulsa el icono <strong>!</strong> para ver todos sus detalles.
              </p>
            </div>
            <button
              onClick={() => setSelectedClassDetailModal(selectedClass)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl text-xs font-semibold border border-stone-700 transition"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Ver detalles de {selectedClass.nombre}</span>
            </button>
          </div>

          {/* Clean Class Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {DND_CLASSES.map((cls) => {
              const isSelected = claseId === cls.id;
              return (
                <div
                  key={cls.id}
                  onClick={() => setClaseId(cls.id)}
                  className={`p-3.5 rounded-xl border text-center cursor-pointer transition relative group ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 shadow-md text-amber-200 ring-1 ring-amber-500/30'
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
                    title={`Ver información detallada de ${cls.nombre}`}
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
              );
            })}
          </div>

          {/* Preview of Level 3 Subclasses with Accordion (Requirement 10: No truncated text) */}
          {availableSubclasses.length > 0 && (
            <div className="p-5 bg-stone-950/80 rounded-xl border border-stone-800 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Subclases de {selectedClass.nombre} (Disponibles a Nivel 3)
                  </span>
                </div>
                <span className="text-[11px] text-stone-400">
                  {availableSubclasses.length} opciones oficiales
                </span>
              </div>
              <p className="text-xs text-stone-400">
                En D&D 2024, todas las clases eligen su especialización de subclase al alcanzar el Nivel 3. A continuación puedes consultar sus descripciones completas sin cortes de texto:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableSubclasses.map((sc) => {
                  const isExpanded = !!expandedSubclasses[sc.id];
                  return (
                    <div
                      key={sc.id}
                      className="bg-stone-900/90 rounded-xl border border-stone-800/80 p-3.5 flex flex-col justify-between"
                    >
                      <div>
                        <strong className="text-amber-200 text-sm block mb-1">{sc.nombre}</strong>
                        <p className={`text-xs text-stone-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                          {sc.descripcion}
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-stone-800/60 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => toggleSubclassAccordion(sc.id)}
                          className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition cursor-pointer"
                        >
                          <span>{isExpanded ? 'Ocultar descripción' : 'Ver descripción'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-[10px] text-stone-500 font-mono">Desbloqueo Nv. 3</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: BACKGROUND & ORIGIN FEAT */}
      {step === 4 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-amber-100">
              Selecciona tu Trasfondo
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              En D&D 2024, tu trasfondo concede tus bonificadores a características (+2 y +1 o +1/+1/+1), competencias y tu Dote de Origen.
            </p>
          </div>

          {/* Backgrounds Selection Grid with Accordion 'Ver más' (Requirement 12) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DND_BACKGROUNDS.map((bg) => {
              const isSelected = trasfondoId === bg.id;
              const isExpanded = !!expandedBackgrounds[bg.id];
              return (
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
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{bg.nombre}</span>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </div>

                    <div className="inline-block bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded font-semibold mb-2">
                      Dote: {bg.dote}
                    </div>

                    <p className={`text-xs text-stone-400 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {bg.descripcion}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBackgroundAccordion(bg.id);
                      }}
                      className="inline-flex items-center space-x-1 text-[11px] text-amber-400 hover:text-amber-300 py-0.5 px-1.5 rounded hover:bg-stone-800 transition"
                    >
                      <span>{isExpanded ? 'Ver menos' : 'Ver más'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {bg.detalle.puntuaciones_caracteristica.opciones.slice(0, 2).join(', ').toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Origin Feat Automatically Granted by Selected Background (Requirement 11) */}
          <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Dote de Origen otorgada por {selectedBackground.nombre}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => openFeatModal(backgroundFeatDef)}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs font-semibold border border-stone-700 transition"
                title="Ver descripción de la dote"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Consultar dote (!)</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <strong className="text-stone-100 text-sm block">{backgroundFeatDef.nombre}</strong>
                <p className="text-stone-400 text-xs mt-0.5 leading-relaxed max-w-2xl">
                  {backgroundFeatDef.descripcion}
                </p>
              </div>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] px-2.5 py-1 rounded font-semibold whitespace-nowrap self-start sm:self-center">
                Dote de Origen
              </span>
            </div>
          </div>

          {/* Background Stat Bonus Config */}
          <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-3">
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
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200 focus:outline-none focus:border-amber-500"
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
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200 focus:outline-none focus:border-amber-500"
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
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200 focus:outline-none focus:border-amber-500"
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
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200 focus:outline-none focus:border-amber-500"
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
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs capitalize text-stone-200 focus:outline-none focus:border-amber-500"
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

      {/* STEP 5: ABILITY SCORES & COMPETENCIES (ORIGIN BADGES & NO REDUNDANT BREAKDOWN) */}
      {step === 5 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
          {/* Competencies summary with clear ORIGIN (Requirement 14) */}
          <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Competencias Adquiridas y sus Orígenes:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block font-semibold mb-1">
                  🛡️ Tiradas de Salvación con Competencia:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {classSavesList.map((save) => (
                    <span
                      key={save}
                      className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-semibold capitalize flex items-center space-x-1"
                    >
                      <span>{save}</span>
                      <span className="text-[10px] text-emerald-400/80 font-normal">({selectedClass.nombre})</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-stone-400 block font-semibold mb-1">
                  🎯 Habilidades con Competencia:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {/* Background Skills */}
                  {backgroundSkillsList.map((skill) => (
                    <span
                      key={`bg_${skill}`}
                      className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-lg font-semibold capitalize flex items-center space-x-1"
                    >
                      <span>{skill.replace('_', ' ')}</span>
                      <span className="text-[10px] text-amber-400/80 font-normal">({selectedBackground.nombre})</span>
                    </span>
                  ))}

                  {/* Class Skills */}
                  {classSkillsOptionsList.slice(0, 2).map((skill) => (
                    <span
                      key={`cls_${skill}`}
                      className="bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2.5 py-1 rounded-lg font-semibold capitalize flex items-center space-x-1"
                    >
                      <span>{skill.replace('_', ' ')}</span>
                      <span className="text-[10px] text-sky-400/80 font-normal">({selectedClass.nombre})</span>
                    </span>
                  ))}

                  {/* Species Skills (Human / Elf) */}
                  {especieId === 'humano' && humanExtraSkill && (
                    <span
                      key={`sp_${humanExtraSkill}`}
                      className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-lg font-semibold capitalize flex items-center space-x-1"
                    >
                      <span>{humanExtraSkill.replace('_', ' ')}</span>
                      <span className="text-[10px] text-purple-400/80 font-normal">(Humano: Diestro)</span>
                    </span>
                  )}

                  {especieId === 'elfo' && elfSkillChoice && (
                    <span
                      key={`sp_${elfSkillChoice}`}
                      className="bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2.5 py-1 rounded-lg font-semibold capitalize flex items-center space-x-1"
                    >
                      <span>{elfSkillChoice.replace('_', ' ')}</span>
                      <span className="text-[10px] text-teal-400/80 font-normal">(Elfo: Sentidos)</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Presets and generator buttons (Requirement 13: "Estándar") */}
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
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg border border-stone-700 transition font-medium"
                  title="Valores estándar oficiales de D&D 2024: 15, 14, 13, 12, 10, 8"
                >
                  Estándar
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
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg border border-stone-700 transition font-medium"
                  title="Valores libres: base 10 para ajustar a mano"
                >
                  Libre
                </button>

                <button
                  onClick={handleGenerateRandomScores}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition shadow-md shadow-amber-500/20"
                  title="Genera 6 puntuaciones tirando 4d6 y descartando el menor"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>Aleatoria (4d6)</span>
                </button>
              </div>
            </div>

            {rollHistory && (
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center justify-between">
                <span>
                  🎲 Tiradas 4d6 obtenidas: <strong>{rollHistory.join(', ')}</strong> (asignadas por prioridad de clase).
                </span>
                <span className="text-[10px] text-amber-400/80">Modificables libremente con los botones + / -</span>
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

          {/* (Requirement 15: Removed redundant 'Desglose de bonificadores aplicados' box) */}
        </div>
      )}

      {/* STEP 6: STARTING EQUIPMENT */}
      {step === 6 && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-amber-100">
              Equipo Inicial & Confirmación (D&D 2024)
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              En D&D 2024 recibes equipo inicial tanto de tu <strong>Clase</strong> como de tu <strong>Trasfondo</strong> (o puedes optar por riqueza en oro para comprar libremente).
            </p>
          </div>

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
                  Armas principales, armaduras y paquetes de aventurero de {selectedClass.nombre}:
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
                  Comienzas sin equipo predeterminado y con oro suficiente para comprar armas y armaduras a tu gusto.
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
                  Herramientas, ropas de oficio y pertenencias del trasfondo {selectedBackground.nombre}:
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
                  Monedas de oro adicionales para adquirir equipo personalizado en lugar del kit predeterminado.
                </p>
                <div className="text-[11px] text-amber-400 font-mono bg-stone-950/60 p-2.5 rounded-lg border border-stone-800">
                  Total de oro recibido: 50 Piezas de Oro
                </div>
              </div>
            </div>
          </div>

          {/* Final Summary Card */}
          <div className="p-4 bg-stone-950/90 rounded-xl border border-stone-800 space-y-2 text-xs">
            <h4 className="font-bold text-amber-300 text-sm">Resumen Final del Aventurero:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-300">
              <div>
                <strong className="text-stone-400">Nombre:</strong> {nombre}
              </div>
              <div>
                <strong className="text-stone-400">Clase:</strong> {selectedClass.nombre} (Nv. 1)
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
