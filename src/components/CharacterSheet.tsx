import React, { useState } from 'react';
import { Character, AbilityScores } from '../types';
import {
  calculateModifier,
  formatModifier,
  getProficiencyBonus,
  calculateArmorClass,
  calculateCarryingCapacity,
  SKILL_ABILITY_MAP,
  SKILL_NAMES_ES
} from '../utils/dndCalculations';
import { DND_CLASSES } from '../data/dndClasses';
import { DND_SPECIES } from '../data/dndSpecies';
import { DND_BACKGROUNDS } from '../data/dndBackgrounds';
import { DND_SUBCLASSES } from '../data/dndSubclasses';
import { DND_EQUIPMENT_CATALOG } from '../data/dndEquipment';
import { DND_FEATS } from '../data/dndFeats';
import { DND_SPELLS } from '../data/dndSpells';
import {
  Shield,
  Heart,
  Zap,
  Sword,
  Sparkles,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Circle,
  Award,
  BookOpen,
  Backpack,
  Coins,
  Search,
  Crosshair
} from 'lucide-react';

interface CharacterSheetProps {
  character: Character;
  onUpdateCharacter: (updated: Character) => void;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({
  character,
  onUpdateCharacter
}) => {
  const [activeSheetTab, setActiveSheetTab] = useState<'combat' | 'skills' | 'spells' | 'inventory' | 'features'>('combat');
  const [hpChangeAmount, setHpChangeAmount] = useState<number>(1);
  const [tempHpAmount, setTempHpAmount] = useState<number>(0);
  const [equipmentSearchQuery, setEquipmentSearchQuery] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingSpell, setIsAddingSpell] = useState(false);
  const [spellSearchQuery, setSpellSearchQuery] = useState('');

  const pb = getProficiencyBonus(character.nivel);
  const acInfo = calculateArmorClass(character);
  const dexMod = calculateModifier(character.caracteristicas.destreza);
  const wisMod = calculateModifier(character.caracteristicas.sabiduria);
  const passivePerception = 10 + wisMod + (character.habilidades_competentes.includes('percepcion') ? pb : 0) + (character.habilidades_pericia.includes('percepcion') ? pb : 0);

  const currentClassDef = DND_CLASSES.find((c) => c.id === character.clase);
  const currentSpeciesDef = DND_SPECIES.find((s) => s.id === character.especie);
  const currentBackgroundDef = DND_BACKGROUNDS.find((b) => b.id === character.trasfondo);
  const currentSubclassDef = DND_SUBCLASSES.find((sc) => sc.id === character.subclase);

  // Health helpers
  const handleApplyDamage = () => {
    if (hpChangeAmount <= 0) return;
    let newTemp = character.puntos_de_golpe.temporales;
    let newCurrent = character.puntos_de_golpe.actuales;

    if (newTemp > 0) {
      if (hpChangeAmount <= newTemp) {
        newTemp -= hpChangeAmount;
      } else {
        const remainingDamage = hpChangeAmount - newTemp;
        newTemp = 0;
        newCurrent = Math.max(0, newCurrent - remainingDamage);
      }
    } else {
      newCurrent = Math.max(0, newCurrent - hpChangeAmount);
    }

    onUpdateCharacter({
      ...character,
      puntos_de_golpe: {
        ...character.puntos_de_golpe,
        actuales: newCurrent,
        temporales: newTemp
      }
    });
  };

  const handleApplyHeal = () => {
    if (hpChangeAmount <= 0) return;
    const newCurrent = Math.min(
      character.puntos_de_golpe.maximos,
      character.puntos_de_golpe.actuales + hpChangeAmount
    );
    onUpdateCharacter({
      ...character,
      puntos_de_golpe: {
        ...character.puntos_de_golpe,
        actuales: newCurrent
      }
    });
  };

  const handleSetTempHp = () => {
    onUpdateCharacter({
      ...character,
      puntos_de_golpe: {
        ...character.puntos_de_golpe,
        temporales: Math.max(0, tempHpAmount)
      }
    });
  };

  // Ability score adjustment
  const handleScoreChange = (ability: keyof AbilityScores, delta: number) => {
    const current = character.caracteristicas[ability];
    const updated = Math.min(30, Math.max(1, current + delta));
    onUpdateCharacter({
      ...character,
      caracteristicas: {
        ...character.caracteristicas,
        [ability]: updated
      }
    });
  };

  // Toggle saving throw proficiency
  const handleToggleSavingThrow = (ability: string) => {
    const isComp = character.salvaciones_competentes.includes(ability);
    const updated = isComp
      ? character.salvaciones_competentes.filter((s) => s !== ability)
      : [...character.salvaciones_competentes, ability];
    onUpdateCharacter({
      ...character,
      salvaciones_competentes: updated
    });
  };

  // Toggle skill proficiency (none -> proficient -> expertise -> none)
  const handleCycleSkill = (skillId: string) => {
    const isProf = character.habilidades_competentes.includes(skillId);
    const isExp = character.habilidades_pericia.includes(skillId);

    let newProf = [...character.habilidades_competentes];
    let newExp = [...character.habilidades_pericia];

    if (!isProf && !isExp) {
      // none -> proficient
      newProf.push(skillId);
    } else if (isProf && !isExp) {
      // proficient -> expertise
      newExp.push(skillId);
    } else {
      // expertise -> none
      newProf = newProf.filter((s) => s !== skillId);
      newExp = newExp.filter((s) => s !== skillId);
    }

    onUpdateCharacter({
      ...character,
      habilidades_competentes: newProf,
      habilidades_pericia: newExp
    });
  };

  // Equipment actions
  const handleToggleEquip = (index: number) => {
    const updatedEq = [...character.equipo];
    updatedEq[index] = {
      ...updatedEq[index],
      equipado: !updatedEq[index].equipado
    };
    onUpdateCharacter({
      ...character,
      equipo: updatedEq
    });
  };

  const handleDeleteItem = (index: number) => {
    const updatedEq = character.equipo.filter((_, i) => i !== index);
    onUpdateCharacter({
      ...character,
      equipo: updatedEq
    });
  };

  const handleAddItemFromCatalog = (catalogItem: any) => {
    const updatedEq = [
      ...character.equipo,
      { item: catalogItem, cantidad: 1, equipado: false }
    ];
    onUpdateCharacter({
      ...character,
      equipo: updatedEq
    });
    setIsAddingItem(false);
  };

  // Spell slot toggle
  const handleToggleSpellSlot = (levelKey: keyof typeof character.espacios_conjuro, slotIndex: number) => {
    const current = character.espacios_conjuro[levelKey];
    let newSpent = current.gastados;
    if (slotIndex < current.gastados) {
      newSpent = slotIndex; // restore slots
    } else {
      newSpent = slotIndex + 1; // expend up to slotIndex
    }
    onUpdateCharacter({
      ...character,
      espacios_conjuro: {
        ...character.espacios_conjuro,
        [levelKey]: {
          ...current,
          gastados: newSpent
        }
      }
    });
  };

  // Calculate total inventory weight
  const totalWeight = character.equipo.reduce(
    (acc, curr) => acc + (curr.item.peso_kg || 0) * curr.cantidad,
    0
  );
  const carryCap = calculateCarryingCapacity(character.caracteristicas.fuerza).capacidadKg;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Hero Header: Basic Info & Vital Stats */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Character Identity */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={character.nombre}
                onChange={(e) =>
                  onUpdateCharacter({ ...character, nombre: e.target.value })
                }
                className="font-serif font-bold text-2xl md:text-3xl text-amber-100 bg-transparent border-b border-stone-700/60 focus:border-amber-500 focus:outline-none w-full"
                placeholder="Nombre del Personaje"
              />
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-stone-300">
              <span className="bg-stone-800 border border-stone-700 px-2.5 py-1 rounded-md font-medium text-amber-300">
                Nivel {character.nivel}
              </span>
              <span className="bg-stone-800 border border-stone-700 px-2.5 py-1 rounded-md capitalize">
                {currentClassDef?.nombre || character.clase}
                {currentSubclassDef ? ` (${currentSubclassDef.nombre})` : ''}
              </span>
              <span className="bg-stone-800 border border-stone-700 px-2.5 py-1 rounded-md capitalize">
                {currentSpeciesDef?.nombre || character.especie}
                {character.linaje ? ` - ${character.linaje}` : ''}
              </span>
              <span className="bg-stone-800 border border-stone-700 px-2.5 py-1 rounded-md capitalize">
                {currentBackgroundDef?.nombre || character.trasfondo}
              </span>
            </div>
          </div>

          {/* Quick Combat Badges: AC, Initiative, Speed, PB, Passive Perception */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* Clase de Armadura */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 flex flex-col items-center text-center shadow-inner relative group">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-500" /> CA
              </span>
              <span className="font-serif text-3xl font-bold text-amber-200 mt-0.5">
                {acInfo.ac}
              </span>
              <span className="text-[10px] text-stone-500 truncate max-w-full" title={acInfo.breakdown}>
                {acInfo.breakdown}
              </span>
            </div>

            {/* Iniciativa */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 flex flex-col items-center text-center shadow-inner">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-blue-400" /> Iniciativa
              </span>
              <span className="font-serif text-3xl font-bold text-blue-200 mt-0.5">
                {formatModifier(dexMod + (character.dotes.includes('alerta') ? pb : 0))}
              </span>
              <span className="text-[10px] text-stone-500">
                {character.dotes.includes('alerta') ? `DES (${dexMod}) + PB (${pb})` : `DES (${dexMod})`}
              </span>
            </div>

            {/* Velocidad */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 flex flex-col items-center text-center shadow-inner">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Velocidad
              </span>
              <span className="font-serif text-3xl font-bold text-emerald-200 mt-0.5">
                {currentSpeciesDef?.velocidad?.base || 9}m
              </span>
              <span className="text-[10px] text-stone-500">
                {Math.round(((currentSpeciesDef?.velocidad?.base || 9) / 0.3))} pies
              </span>
            </div>

            {/* Bonificador Competencia */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 flex flex-col items-center text-center shadow-inner">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Competencia
              </span>
              <span className="font-serif text-3xl font-bold text-purple-200 mt-0.5">
                +{pb}
              </span>
              <span className="text-[10px] text-stone-500">Nivel {character.nivel}</span>
            </div>

            {/* Percepción Pasiva */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 flex flex-col items-center text-center shadow-inner col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Perc. Pasiva
              </span>
              <span className="font-serif text-3xl font-bold text-amber-100 mt-0.5">
                {passivePerception}
              </span>
              <span className="text-[10px] text-stone-500">10 + Sabiduría</span>
            </div>
          </div>
        </div>

        {/* Health, Temp HP & Hit Dice Section */}
        <div className="mt-6 pt-6 border-t border-stone-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Main HP Display & Interactive Bar */}
          <div className="md:col-span-7 bg-stone-950/90 border border-stone-800/90 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500/30" />
                <span className="font-medium text-stone-200 text-sm">Puntos de Golpe (PG)</span>
              </div>
              <div className="flex items-center space-x-1 text-sm font-semibold">
                <span className="text-2xl font-serif text-red-400 font-bold">
                  {character.puntos_de_golpe.actuales}
                </span>
                <span className="text-stone-500">/</span>
                <input
                  type="number"
                  min="1"
                  value={character.puntos_de_golpe.maximos}
                  onChange={(e) =>
                    onUpdateCharacter({
                      ...character,
                      puntos_de_golpe: {
                        ...character.puntos_de_golpe,
                        maximos: Math.max(1, parseInt(e.target.value) || 1)
                      }
                    })
                  }
                  className="w-14 bg-stone-800 border border-stone-700 text-stone-300 text-center rounded px-1 text-sm focus:outline-none focus:border-amber-500"
                  title="Puntos de Golpe Máximos"
                />
                {character.puntos_de_golpe.temporales > 0 && (
                  <span className="bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs px-2 py-0.5 rounded-full ml-2">
                    +{character.puntos_de_golpe.temporales} temp
                  </span>
                )}
              </div>
            </div>

            {/* Health Progress Bar */}
            <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    (character.puntos_de_golpe.actuales /
                      character.puntos_de_golpe.maximos) *
                      100
                  )}%`
                }}
              />
              {character.puntos_de_golpe.temporales > 0 && (
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      50,
                      (character.puntos_de_golpe.temporales /
                        character.puntos_de_golpe.maximos) *
                        50
                    )}%`
                  }}
                />
              )}
            </div>

            {/* Damage & Heal Controls */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                type="number"
                min="1"
                value={hpChangeAmount}
                onChange={(e) => setHpChangeAmount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 bg-stone-800 border border-stone-700 text-stone-100 text-center rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleApplyDamage}
                className="flex items-center space-x-1 bg-red-950/70 hover:bg-red-900/90 text-red-300 border border-red-800/80 px-3 py-1 rounded-lg text-xs font-semibold transition"
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Daño</span>
              </button>
              <button
                onClick={handleApplyHeal}
                className="flex items-center space-x-1 bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-800/80 px-3 py-1 rounded-lg text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Curar</span>
              </button>

              <div className="ml-auto flex items-center space-x-1">
                <input
                  type="number"
                  min="0"
                  placeholder="Temp"
                  value={tempHpAmount || ''}
                  onChange={(e) => setTempHpAmount(parseInt(e.target.value) || 0)}
                  className="w-16 bg-stone-800 border border-stone-700 text-blue-300 text-center rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSetTempHp}
                  className="bg-blue-950/70 hover:bg-blue-900/90 text-blue-300 border border-blue-800/80 px-2.5 py-1 rounded-lg text-xs font-semibold transition"
                >
                  Fijar Temp
                </button>
              </div>
            </div>
          </div>

          {/* Hit Dice Tracker */}
          <div className="md:col-span-5 bg-stone-950/90 border border-stone-800/90 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-stone-200">Dados de Golpe</span>
                <span className="font-mono text-amber-300 font-semibold">
                  1d{character.dados_de_golpe.tipo_dado}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Disponibles: {character.dados_de_golpe.total - character.dados_de_golpe.gastados} de {character.dados_de_golpe.total}
              </p>
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <button
                onClick={() =>
                  onUpdateCharacter({
                    ...character,
                    dados_de_golpe: {
                      ...character.dados_de_golpe,
                      gastados: Math.min(
                        character.dados_de_golpe.total,
                        character.dados_de_golpe.gastados + 1
                      )
                    }
                  })
                }
                disabled={character.dados_de_golpe.gastados >= character.dados_de_golpe.total}
                className="flex-1 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 border border-stone-700 py-1.5 rounded-lg text-xs font-medium transition text-center"
              >
                Gastar 1 Dado
              </button>
              <button
                onClick={() =>
                  onUpdateCharacter({
                    ...character,
                    dados_de_golpe: {
                      ...character.dados_de_golpe,
                      gastados: Math.max(0, character.dados_de_golpe.gastados - 1)
                    }
                  })
                }
                disabled={character.dados_de_golpe.gastados <= 0}
                className="flex-1 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 border border-stone-700 py-1.5 rounded-lg text-xs font-medium transition text-center"
              >
                Recuperar 1
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Primary Ability Scores Grid */}
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
          const score = character.caracteristicas[key];
          const mod = calculateModifier(score);
          const isSaveProf = character.salvaciones_competentes.includes(key);
          const saveBonus = mod + (isSaveProf ? pb : 0);

          return (
            <div
              key={key}
              className="bg-stone-900 border border-stone-800 rounded-xl p-3 flex flex-col items-center text-center relative group shadow-md hover:border-amber-500/40 transition"
            >
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                {shortLabel}
              </span>
              <span className="text-xs text-stone-500 truncate">{label}</span>

              {/* Modifier */}
              <span className="font-serif text-3xl font-extrabold text-amber-100 my-1">
                {formatModifier(mod)}
              </span>

              {/* Base Score & Controls */}
              <div className="flex items-center space-x-1.5 my-1 bg-stone-950/80 px-2 py-0.5 rounded-lg border border-stone-800">
                <button
                  onClick={() => handleScoreChange(key, -1)}
                  className="text-stone-500 hover:text-amber-400 text-xs px-1"
                  title="Reducir puntuación"
                >
                  -
                </button>
                <span className="text-xs font-semibold text-stone-300 w-5 text-center">
                  {score}
                </span>
                <button
                  onClick={() => handleScoreChange(key, 1)}
                  className="text-stone-500 hover:text-amber-400 text-xs px-1"
                  title="Aumentar puntuación"
                >
                  +
                </button>
              </div>

              {/* Saving Throw Indicator */}
              <div
                onClick={() => handleToggleSavingThrow(key)}
                className={`w-full mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] cursor-pointer hover:text-amber-300 transition ${
                  isSaveProf ? 'text-amber-400 font-semibold' : 'text-stone-400'
                }`}
                title={`Tirada de Salvación: ${isSaveProf ? 'Competente (+PB)' : 'No competente'}`}
              >
                <span>Salvación:</span>
                <span className="font-mono">{formatModifier(saveBonus)}</span>
                {isSaveProf ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-stone-600" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-Navigation for Sheet Details */}
      <div className="flex space-x-2 border-b border-stone-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSheetTab('combat')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
            activeSheetTab === 'combat'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
          }`}
        >
          <Sword className="w-4 h-4" />
          <span>Combate & Armas</span>
        </button>

        <button
          onClick={() => setActiveSheetTab('skills')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
            activeSheetTab === 'skills'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Habilidades (18)</span>
        </button>

        <button
          onClick={() => setActiveSheetTab('spells')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
            activeSheetTab === 'spells'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Conjuros & Espacios</span>
        </button>

        <button
          onClick={() => setActiveSheetTab('inventory')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
            activeSheetTab === 'inventory'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
          }`}
        >
          <Backpack className="w-4 h-4" />
          <span>Inventario & Oro</span>
        </button>

        <button
          onClick={() => setActiveSheetTab('features')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
            activeSheetTab === 'features'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Rasgos & Dotes</span>
        </button>
      </div>

      {/* TAB CONTENT: COMBAT & WEAPONS */}
      {activeSheetTab === 'combat' && (
        <div className="space-y-6">
          {/* Equipped Weapons Table */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sword className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-amber-100">
                  Armas & Ataques
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveSheetTab('inventory');
                  setIsAddingItem(true);
                }}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Arma del Catálogo</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-800 text-xs uppercase text-stone-400 tracking-wider">
                    <th className="pb-3">Arma</th>
                    <th className="pb-3">Ataque</th>
                    <th className="pb-3">Daño / Tipo</th>
                    <th className="pb-3">Propiedades</th>
                    <th className="pb-3 text-amber-400">Maestría 2024</th>
                    <th className="pb-3 text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {character.equipo
                    .filter((e) => e.item.categoria === 'armas')
                    .map((itemObj, idx) => {
                      const weapon = itemObj.item;
                      const isFinesse = weapon.propiedades?.some((p) => p.includes('sutil'));
                      const isRanged = weapon.categoria_arma === 'sencilla' && weapon.nombre.includes('Arco') || weapon.categoria_arma === 'marcial' && (weapon.nombre.includes('Arco') || weapon.nombre.includes('Ballesta'));
                      const bestStatMod = isRanged
                        ? dexMod
                        : isFinesse
                        ? Math.max(calculateModifier(character.caracteristicas.fuerza), dexMod)
                        : calculateModifier(character.caracteristicas.fuerza);
                      const attackBonus = bestStatMod + pb;
                      const hasMastery = character.maestrias_armas.includes(weapon.id);

                      return (
                        <tr key={idx} className="hover:bg-stone-800/40 transition">
                          <td className="py-3 font-medium text-stone-200">
                            {weapon.nombre}
                          </td>
                          <td className="py-3 font-mono font-bold text-amber-300">
                            {formatModifier(attackBonus)}
                          </td>
                          <td className="py-3">
                            <span className="font-mono text-stone-200">
                              {weapon.dano} {formatModifier(bestStatMod)}
                            </span>{' '}
                            <span className="text-xs text-stone-400">
                              {weapon.tipo_dano}
                            </span>
                          </td>
                          <td className="py-3 text-xs text-stone-400">
                            {weapon.propiedades?.join(', ') || '—'}
                          </td>
                          <td className="py-3">
                            {weapon.maestria ? (
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                                  hasMastery
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                    : 'bg-stone-800 text-stone-500'
                                }`}
                                title={hasMastery ? 'Maestría desbloqueada y activa' : 'Requiere maestría activa'}
                              >
                                {weapon.maestria} {hasMastery && '✓'}
                              </span>
                            ) : (
                              '—'
                            )}
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                const originalIdx = character.equipo.indexOf(itemObj);
                                handleToggleEquip(originalIdx);
                              }}
                              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                                itemObj.equipado
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                              }`}
                            >
                              {itemObj.equipado ? 'Empuñada' : 'Guardada'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  {character.equipo.filter((e) => e.item.categoria === 'armas').length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-stone-500">
                        No tienes armas en tu inventario. ¡Añade armas desde el catálogo!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* D&D 2024 Rules Quick Reference (Acciones de Combate 2024) */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
            <h3 className="font-serif font-bold text-lg text-amber-100 mb-3 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-amber-400" />
              Acciones de Combate (Reglas D&D 2024)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-stone-300">
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <span className="font-bold text-amber-300 block mb-1">Atacar (Attack)</span>
                Ataque cuerpo a cuerpo o a distancia. Activa la propiedad de maestría de tu arma si la tienes aprendida.
              </div>
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <span className="font-bold text-amber-300 block mb-1">Destrabarse (Disengage)</span>
                Tu movimiento no provoca ataques de oportunidad por el resto del turno.
              </div>
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <span className="font-bold text-amber-300 block mb-1">Esquivar (Dodge)</span>
                Los ataques contra ti tienen desventaja y tienes ventaja en salvaciones de Destreza.
              </div>
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <span className="font-bold text-amber-300 block mb-1">Ayudar (Help)</span>
                Otorga ventaja a un aliado en una prueba o en su siguiente tirada de ataque contra un enemigo a 1,5 m.
              </div>
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <span className="font-bold text-amber-300 block mb-1">Esconderse (Hide)</span>
                Prueba de Sigilo (CD 15) mientras tengas cobertura o estés en penumbra para volverte invisible.
              </div>
              <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <span className="font-bold text-amber-300 block mb-1">Inspiración Heroica</span>
                Permite repetir cualquier tirada de d20 (ataque, salvación o prueba de habilidad). ¡Usa el interruptor de la barra superior!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SKILLS */}
      {activeSheetTab === 'skills' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-amber-100">
                Habilidades & Competencias
              </h3>
              <p className="text-xs text-stone-400">
                Haz clic en cualquier habilidad para alternar: <strong>Sin competencia</strong> → <strong>Competente (+PB)</strong> → <strong>Pericia (+2xPB)</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {Object.entries(SKILL_ABILITY_MAP).map(([skillKey, abilityKey]) => {
              const label = SKILL_NAMES_ES[skillKey] || skillKey;
              const isProf = character.habilidades_competentes.includes(skillKey);
              const isExp = character.habilidades_pericia.includes(skillKey);

              const mod = calculateModifier(character.caracteristicas[abilityKey]);
              let totalBonus = mod;
              if (isExp) totalBonus += pb * 2;
              else if (isProf) totalBonus += pb;

              return (
                <div
                  key={skillKey}
                  onClick={() => handleCycleSkill(skillKey)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer select-none ${
                    isExp
                      ? 'bg-purple-950/30 border-purple-500/50 text-purple-200 shadow-sm'
                      : isProf
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-5 text-center text-xs font-bold text-stone-500 uppercase">
                      {abilityKey.substring(0, 3)}
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-sm">
                      {formatModifier(totalBonus)}
                    </span>
                    <span className="text-xs">
                      {isExp ? (
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-[10px]">
                          Pericia
                        </span>
                      ) : isProf ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium text-[10px]">
                          ✓
                        </span>
                      ) : (
                        <span className="text-stone-600 text-xs">○</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SPELLS */}
      {activeSheetTab === 'spells' && (
        <div className="space-y-6">
          {/* Spell Slots Tracker */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
            <h3 className="font-serif font-bold text-lg text-amber-100 mb-4 flex items-center justify-between">
              <span>Espacios de Conjuro</span>
              <span className="text-xs text-stone-400 font-normal">
                Haz clic en una casilla para gastar o recuperar espacios
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {(
                [
                  ['nivel1', 'Nivel 1'],
                  ['nivel2', 'Nivel 2'],
                  ['nivel3', 'Nivel 3'],
                  ['nivel4', 'Nivel 4'],
                  ['nivel5', 'Nivel 5'],
                  ['nivel6', 'Nivel 6'],
                  ['nivel7', 'Nivel 7'],
                  ['nivel8', 'Nivel 8'],
                  ['nivel9', 'Nivel 9']
                ] as const
              ).map(([lvlKey, lvlName]) => {
                const slotData = character.espacios_conjuro[lvlKey] || { total: 0, gastados: 0 };
                return (
                  <div
                    key={lvlKey}
                    className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-stone-300">{lvlName}</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-stone-500">Total:</span>
                        <input
                          type="number"
                          min="0"
                          max="9"
                          value={slotData.total}
                          onChange={(e) => {
                            const newTot = Math.max(0, parseInt(e.target.value) || 0);
                            onUpdateCharacter({
                              ...character,
                              espacios_conjuro: {
                                ...character.espacios_conjuro,
                                [lvlKey]: {
                                  total: newTot,
                                  gastados: Math.min(slotData.gastados, newTot)
                                }
                              }
                            });
                          }}
                          className="w-8 bg-stone-800 border border-stone-700 text-stone-200 text-center rounded text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Slot check bubbles */}
                    <div className="flex flex-wrap gap-1.5 min-h-[26px] items-center">
                      {Array.from({ length: slotData.total }).map((_, i) => {
                        const isSpent = i < slotData.gastados;
                        return (
                          <button
                            key={i}
                            onClick={() => handleToggleSpellSlot(lvlKey, i)}
                            className={`w-6 h-6 rounded-md border text-xs font-mono font-bold flex items-center justify-center transition ${
                              isSpent
                                ? 'bg-stone-900 border-stone-700 text-stone-600 line-through'
                                : 'bg-purple-600/30 border-purple-500 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.3)]'
                            }`}
                            title={isSpent ? 'Espacio gastado (clic para recuperar)' : 'Espacio disponible (clic para gastar)'}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                      {slotData.total === 0 && (
                        <span className="text-[11px] text-stone-600 italic">Sin espacios</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prepared / Known Spells List */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-amber-100">
                  Conjuros Preparados & Conocidos
                </h3>
                <p className="text-xs text-stone-400">
                  Añade conjuros desde el compendio de conjuros D&D 2024
                </p>
              </div>
              <button
                onClick={() => setIsAddingSpell(!isAddingSpell)}
                className="flex items-center space-x-1 bg-purple-950/50 hover:bg-purple-900/80 text-purple-300 border border-purple-700/60 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingSpell ? 'Cerrar Buscador' : 'Añadir Conjuro'}</span>
              </button>
            </div>

            {/* In-Sheet Spell Selector Modal / Panel */}
            {isAddingSpell && (
              <div className="mb-6 p-4 bg-stone-950 border border-purple-500/40 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5">
                  <Search className="w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={spellSearchQuery}
                    onChange={(e) => setSpellSearchQuery(e.target.value)}
                    placeholder="Buscar conjuro por nombre, escuela o clase..."
                    className="bg-transparent text-sm text-stone-100 placeholder-stone-500 focus:outline-none w-full"
                  />
                </div>

                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {DND_SPELLS.filter(
                    (s) =>
                      s.nombre.toLowerCase().includes(spellSearchQuery.toLowerCase()) ||
                      s.escuela.toLowerCase().includes(spellSearchQuery.toLowerCase()) ||
                      s.clases.some((c) => c.includes(spellSearchQuery.toLowerCase()))
                  ).map((spell) => {
                    const alreadyKnown = character.conjuros_conocidos.includes(spell.id);
                    return (
                      <div
                        key={spell.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/70 border border-stone-800 text-xs"
                      >
                        <div>
                          <span className="font-bold text-purple-300">{spell.nombre}</span>{' '}
                          <span className="text-stone-400">
                            ({spell.nivel === 0 ? 'Truco' : `Nivel ${spell.nivel}`}, {spell.escuela})
                          </span>
                          <p className="text-stone-500 line-clamp-1">{spell.descripcion}</p>
                        </div>
                        <button
                          onClick={() => {
                            if (alreadyKnown) {
                              onUpdateCharacter({
                                ...character,
                                conjuros_conocidos: character.conjuros_conocidos.filter((id) => id !== spell.id),
                                conjuros_preparados: character.conjuros_preparados.filter((id) => id !== spell.id)
                              });
                            } else {
                              onUpdateCharacter({
                                ...character,
                                conjuros_conocidos: [...character.conjuros_conocidos, spell.id],
                                conjuros_preparados: [...character.conjuros_preparados, spell.id]
                              });
                            }
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-medium ${
                            alreadyKnown
                              ? 'bg-red-950/40 text-red-300 border border-red-800'
                              : 'bg-purple-900/60 text-purple-200 border border-purple-600'
                          }`}
                        >
                          {alreadyKnown ? 'Eliminar' : 'Añadir'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* List of spells the character has */}
            <div className="space-y-2">
              {character.conjuros_conocidos.map((spellId) => {
                const spell = DND_SPELLS.find((s) => s.id === spellId);
                if (!spell) return null;
                const isPrep = character.conjuros_preparados.includes(spell.id);

                return (
                  <div
                    key={spell.id}
                    className="p-3 bg-stone-950/70 border border-stone-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-purple-200">
                          {spell.nombre}
                        </span>
                        <span className="text-xs bg-stone-800 px-2 py-0.5 rounded text-stone-400">
                          {spell.nivel === 0 ? 'Truco' : `Nv. ${spell.nivel}`}
                        </span>
                        <span className="text-xs text-stone-500">{spell.escuela}</span>
                        {spell.concentracion && (
                          <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.5 rounded font-bold">
                            Concentración
                          </span>
                        )}
                        {spell.ritual && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">
                            Ritual
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400">{spell.descripcion}</p>
                      <div className="text-[11px] text-stone-500">
                        Tiempo: {spell.tiempo_lanzamiento} | Alcance: {spell.alcance} | Duración: {spell.duracion}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {spell.nivel > 0 && (
                        <button
                          onClick={() => {
                            const updated = isPrep
                              ? character.conjuros_preparados.filter((id) => id !== spell.id)
                              : [...character.conjuros_preparados, spell.id];
                            onUpdateCharacter({
                              ...character,
                              conjuros_preparados: updated
                            });
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                            isPrep
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          {isPrep ? 'Preparado ✓' : 'En el libro'}
                        </button>
                      )}
                      <button
                        onClick={() => {
                          onUpdateCharacter({
                            ...character,
                            conjuros_conocidos: character.conjuros_conocidos.filter((id) => id !== spell.id),
                            conjuros_preparados: character.conjuros_preparados.filter((id) => id !== spell.id)
                          });
                        }}
                        className="text-stone-500 hover:text-red-400 p-1"
                        title="Eliminar conjuro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {character.conjuros_conocidos.length === 0 && (
                <div className="text-center py-6 text-stone-500 text-sm">
                  Aún no tienes conjuros añadidos. Haz clic en "Añadir Conjuro" para seleccionarlos del compendio.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: INVENTORY & CURRENCY */}
      {activeSheetTab === 'inventory' && (
        <div className="space-y-6">
          {/* Money Pouch */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
            <div className="flex items-center space-x-2 mb-3">
              <Coins className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif font-bold text-lg text-amber-100">Bolsa de Monedas</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {(
                [
                  ['po', 'Piezas de Oro (PO)', 'text-amber-400'],
                  ['pp', 'Piezas de Plata (PP)', 'text-stone-300'],
                  ['pc', 'Piezas de Cobre (PC)', 'text-amber-700'],
                  ['pe', 'Piezas de Electro (PE)', 'text-blue-300'],
                  ['ppt', 'Piezas de Platino (PPT)', 'text-cyan-200']
                ] as const
              ).map(([monedaKey, label, colorClass]) => (
                <div
                  key={monedaKey}
                  className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 flex flex-col items-center"
                >
                  <span className={`font-mono text-xl font-bold ${colorClass}`}>
                    {character.monedas[monedaKey] || 0}
                  </span>
                  <span className="text-[11px] text-stone-400 mb-2 uppercase tracking-wide">
                    {monedaKey}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          ...character,
                          monedas: {
                            ...character.monedas,
                            [monedaKey]: Math.max(0, (character.monedas[monedaKey] || 0) - 1)
                          }
                        })
                      }
                      className="w-6 h-6 rounded bg-stone-800 text-stone-400 hover:text-stone-200 text-xs flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={character.monedas[monedaKey] || 0}
                      onChange={(e) =>
                        onUpdateCharacter({
                          ...character,
                          monedas: {
                            ...character.monedas,
                            [monedaKey]: Math.max(0, parseInt(e.target.value) || 0)
                          }
                        })
                      }
                      className="w-14 bg-stone-800 border border-stone-700 text-center rounded text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() =>
                        onUpdateCharacter({
                          ...character,
                          monedas: {
                            ...character.monedas,
                            [monedaKey]: (character.monedas[monedaKey] || 0) + 1
                          }
                        })
                      }
                      className="w-6 h-6 rounded bg-stone-800 text-stone-400 hover:text-stone-200 text-xs flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Items & Weight Capacity */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-amber-100">
                  Equipo & Objetos ({character.equipo.length})
                </h3>
                <p className="text-xs text-stone-400">
                  Peso total: <strong className="text-stone-200">{totalWeight.toFixed(1)} kg</strong> / Capacidad de carga: <strong className="text-amber-300">{carryCap} kg</strong>
                </p>
              </div>

              <button
                onClick={() => setIsAddingItem(!isAddingItem)}
                className="flex items-center space-x-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingItem ? 'Cerrar Buscador' : 'Añadir Objeto'}</span>
              </button>
            </div>

            {/* Equipment Search Modal / Panel */}
            {isAddingItem && (
              <div className="mb-6 p-4 bg-stone-950 border border-amber-500/40 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5">
                  <Search className="w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={equipmentSearchQuery}
                    onChange={(e) => setEquipmentSearchQuery(e.target.value)}
                    placeholder="Buscar en el catálogo de 187 objetos (armas, armaduras, útiles, pociones...)"
                    className="bg-transparent text-sm text-stone-100 placeholder-stone-500 focus:outline-none w-full"
                  />
                </div>

                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {DND_EQUIPMENT_CATALOG.filter((item) =>
                    item.nombre.toLowerCase().includes(equipmentSearchQuery.toLowerCase()) ||
                    item.categoria.toLowerCase().includes(equipmentSearchQuery.toLowerCase())
                  ).slice(0, 30).map((catItem) => (
                    <div
                      key={catItem.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-stone-200">{catItem.nombre}</span>{' '}
                        <span className="text-stone-500">({catItem.categoria})</span>
                        <span className="text-amber-400/80 ml-2">
                          {catItem.precio.cantidad} {catItem.precio.moneda}
                        </span>
                        {catItem.peso_kg && (
                          <span className="text-stone-500 ml-2">· {catItem.peso_kg} kg</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddItemFromCatalog(catItem)}
                        className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-2.5 py-1 rounded text-xs transition"
                      >
                        + Añadir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-800 text-xs uppercase text-stone-400 tracking-wider">
                    <th className="pb-3">Objeto</th>
                    <th className="pb-3">Categoría</th>
                    <th className="pb-3 text-center">Cantidad</th>
                    <th className="pb-3 text-right">Peso Unit.</th>
                    <th className="pb-3 text-center">Equipado</th>
                    <th className="pb-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {character.equipo.map((eqItem, idx) => (
                    <tr key={idx} className="hover:bg-stone-800/40 transition">
                      <td className="py-2.5 font-medium text-stone-200">
                        {eqItem.item.nombre}
                      </td>
                      <td className="py-2.5 text-xs text-stone-400 capitalize">
                        {eqItem.item.categoria}
                      </td>
                      <td className="py-2.5 text-center">
                        <div className="inline-flex items-center space-x-1">
                          <button
                            onClick={() => {
                              const updatedEq = [...character.equipo];
                              if (updatedEq[idx].cantidad > 1) {
                                updatedEq[idx].cantidad -= 1;
                                onUpdateCharacter({ ...character, equipo: updatedEq });
                              }
                            }}
                            className="w-5 h-5 rounded bg-stone-800 text-stone-400 hover:text-stone-200 text-xs"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-semibold">
                            {eqItem.cantidad}
                          </span>
                          <button
                            onClick={() => {
                              const updatedEq = [...character.equipo];
                              updatedEq[idx].cantidad += 1;
                              onUpdateCharacter({ ...character, equipo: updatedEq });
                            }}
                            className="w-5 h-5 rounded bg-stone-800 text-stone-400 hover:text-stone-200 text-xs"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-mono text-xs text-stone-400">
                        {eqItem.item.peso_kg ? `${eqItem.item.peso_kg} kg` : '—'}
                      </td>
                      <td className="py-2.5 text-center">
                        {(eqItem.item.categoria === 'armas' ||
                          eqItem.item.categoria === 'armaduras' ||
                          eqItem.item.categoria === 'escudo') && (
                          <button
                            onClick={() => handleToggleEquip(idx)}
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              eqItem.equipado
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-stone-800 text-stone-500 hover:text-stone-300'
                            }`}
                          >
                            {eqItem.equipado ? 'Sí ✓' : 'No'}
                          </button>
                        )}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => handleDeleteItem(idx)}
                          className="text-stone-500 hover:text-red-400 p-1 transition"
                          title="Eliminar objeto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {character.equipo.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-stone-500">
                        El inventario está vacío. Haz clic en "Añadir Objeto" para cargar armas, armaduras o suministros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: FEATURES & FEATS */}
      {activeSheetTab === 'features' && (
        <div className="space-y-6">
          {/* Active Feats (Dotes) */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
            <h3 className="font-serif font-bold text-lg text-amber-100 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Dotes Adquiridas ({character.dotes.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {character.dotes.map((featId) => {
                const feat = DND_FEATS.find((f) => f.id === featId || f.nombre.toLowerCase() === featId.toLowerCase());
                return (
                  <div
                    key={featId}
                    className="p-3 bg-stone-950/80 border border-stone-800 rounded-xl space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-amber-200">
                        {feat?.nombre || featId}
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-semibold uppercase">
                        {feat?.categoria || 'Dote'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400">
                      {feat?.descripcion || 'Dote activa en el personaje.'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Traits (Rasgos) */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
            <h3 className="font-serif font-bold text-lg text-amber-100 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Rasgos de Clase, Especie & Linaje
            </h3>
            <div className="space-y-2">
              {character.rasgos.map((trait, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-stone-950/80 border border-stone-800 rounded-xl text-xs text-stone-300 flex items-start space-x-2"
                >
                  <span className="text-amber-500 mt-0.5 font-bold">◆</span>
                  <span>{trait}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Character Notes */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md">
            <h3 className="font-serif font-bold text-lg text-amber-100 mb-2">
              Biografía, Aliados & Notas de Campaña
            </h3>
            <textarea
              value={character.notas}
              onChange={(e) => onUpdateCharacter({ ...character, notas: e.target.value })}
              rows={4}
              placeholder="Escribe aquí el trasfondo, aliados, enemigos o notas importantes..."
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
