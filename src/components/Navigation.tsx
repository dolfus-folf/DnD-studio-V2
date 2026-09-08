import React from 'react';
import { Character } from '../types';
import { Shield, Sparkles, BookOpen, Users, Moon, Sun, Download, Heart, Zap } from 'lucide-react';
import { PWAInstallButton } from '../infrastructure/pwa/PWAInstallButton';

interface NavigationProps {
  activeTab: 'sheet' | 'creator' | 'compendium' | 'manager';
  setActiveTab: (tab: 'sheet' | 'creator' | 'compendium' | 'manager') => void;
  characters: Character[];
  activeCharacterId: string;
  setActiveCharacterId: (id: string) => void;
  onShortRest: () => void;
  onLongRest: () => void;
  onToggleHeroicInspiration: () => void;
  activeCharacter?: Character;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  characters,
  activeCharacterId,
  setActiveCharacterId,
  onShortRest,
  onLongRest,
  onToggleHeroicInspiration,
  activeCharacter
}) => {
  return (
    <header className="bg-stone-900 border-b border-stone-800 text-stone-100 sticky top-0 z-40 shadow-lg">
      {/* Top Banner with branding and character quick selector */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-500 shadow-inner">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif font-bold text-lg text-amber-100 tracking-wide">
                D&D 2024
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Oficial SRD 5.2
              </span>
            </div>
            <p className="text-xs text-stone-400">Gestor de Personajes & Compendio Offline</p>
          </div>
        </div>

        {/* Character Selector & Quick In-Game Rest / Inspiration Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <PWAInstallButton />

          {activeCharacter && (
            <>
              <select
              value={activeCharacterId}
              onChange={(e) => setActiveCharacterId(e.target.value)}
              className="bg-stone-800 border border-stone-700 text-stone-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500"
            >
              {characters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} (Nv. {c.nivel} {c.clase})
                </option>
              ))}
            </select>

            {/* Inspiración Heroica 2024 Toggle */}
            <button
              onClick={onToggleHeroicInspiration}
              title={activeCharacter.inspiracion_heroica ? 'Inspiración Heroica activa (puedes repetir una tirada de d20)' : 'Activar Inspiración Heroica'}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                activeCharacter.inspiracion_heroica
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
                  : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${activeCharacter.inspiracion_heroica ? 'text-amber-400 fill-amber-400' : ''}`} />
              <span className="hidden sm:inline">Inspiración</span>
            </button>

            {/* Descanso Corto */}
            <button
              onClick={onShortRest}
              title="Descanso Corto (Gastar dados de golpe y recuperar recursos de descanso corto)"
              className="flex items-center space-x-1 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 px-2.5 py-1.5 rounded-lg text-xs font-medium transition"
            >
              <Moon className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Descanso Corto</span>
            </button>

            {/* Descanso Largo */}
            <button
              onClick={onLongRest}
              title="Descanso Largo (Recupera todos los PG, la mitad de dados de golpe y todos los espacios de conjuro)"
              className="flex items-center space-x-1 bg-stone-800 hover:bg-amber-900/40 text-amber-200 border border-amber-700/50 px-2.5 py-1.5 rounded-lg text-xs font-medium transition"
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Descanso Largo</span>
            </button>
            </>
          )}
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 flex space-x-1 border-t border-stone-800/80 overflow-x-auto">
        <button
          onClick={() => setActiveTab('sheet')}
          className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'sheet'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Hoja de Personaje</span>
        </button>

        <button
          onClick={() => setActiveTab('creator')}
          className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'creator'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Creador & Nivel</span>
        </button>

        <button
          onClick={() => setActiveTab('compendium')}
          className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'compendium'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Compendio 2024</span>
        </button>

        <button
          onClick={() => setActiveTab('manager')}
          className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === 'manager'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Mis Personajes ({characters.length})</span>
        </button>
      </div>
    </header>
  );
};
