import React, { useState, useEffect } from 'react';
import { Character } from './types';
import { createNewDefaultCharacter } from './utils/dndCalculations';
import { Navigation } from './components/Navigation';
import { CharacterSheet } from './components/CharacterSheet';
import { CharacterCreator } from './components/CharacterCreator';
import { CompendiumView } from './components/CompendiumView';
import { CharacterManager } from './components/CharacterManager';
import { OfflineIndicator } from './infrastructure/pwa/OfflineIndicator';

const STORAGE_KEY_CHARACTERS = 'dnd2024_characters_list';
const STORAGE_KEY_ACTIVE_ID = 'dnd2024_active_char_id';

export default function App() {
  const [characters, setCharacters] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHARACTERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error loading characters from localStorage:', e);
    }
    return [createNewDefaultCharacter()];
  });

  const [activeCharacterId, setActiveCharacterId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      if (savedId) return savedId;
    } catch (e) {
      console.warn('Error loading activeCharacterId:', e);
    }
    return characters[0]?.id || 'char_default_1';
  });

  const [activeTab, setActiveTab] = useState<'sheet' | 'creator' | 'compendium' | 'manager'>('sheet');

  // Persist characters on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHARACTERS, JSON.stringify(characters));
    } catch (e) {
      console.error('Error saving characters to localStorage:', e);
    }
  }, [characters]);

  // Persist active character ID on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeCharacterId);
    } catch (e) {
      console.error('Error saving activeCharacterId:', e);
    }
  }, [activeCharacterId]);

  // Active character reference
  const activeCharacter =
    characters.find((c) => c.id === activeCharacterId) || characters[0];

  // Updates current character in collection
  const handleUpdateCharacter = (updated: Character) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...updated, actualizado_en: new Date().toISOString() } : c))
    );
  };

  // Toggle Heroic Inspiration
  const handleToggleInspiration = () => {
    if (!activeCharacter) return;
    handleUpdateCharacter({
      ...activeCharacter,
      inspiracion_heroica: !activeCharacter.inspiracion_heroica
    });
  };

  // Descanso Corto (SRD 5.2): Gastar dado de golpe y recuperar recursos
  const handleShortRest = () => {
    if (!activeCharacter) return;
    const remainingDice = activeCharacter.nivel - activeCharacter.dados_de_golpe.gastados;
    if (remainingDice <= 0) {
      alert('No te quedan dados de golpe disponibles para gastar en el descanso corto.');
      return;
    }
    const conMod = Math.floor((activeCharacter.caracteristicas.constitucion - 10) / 2);
    const dieType = activeCharacter.dados_de_golpe.tipo_dado || 8;
    const roll = Math.floor(Math.random() * dieType) + 1;
    const recovered = Math.max(1, roll + conMod);
    const maxHP = activeCharacter.puntos_de_golpe.maximos;
    const newHP = Math.min(maxHP, activeCharacter.puntos_de_golpe.actuales + recovered);

    const updated: Character = {
      ...activeCharacter,
      puntos_de_golpe: {
        ...activeCharacter.puntos_de_golpe,
        actuales: newHP
      },
      dados_de_golpe: {
        ...activeCharacter.dados_de_golpe,
        gastados: activeCharacter.dados_de_golpe.gastados + 1
      }
    };
    handleUpdateCharacter(updated);
  };

  // Descanso Largo (SRD 5.2): Restaura todos los PG, dados de golpe (hasta nivel/2) y espacios de conjuro
  const handleLongRest = () => {
    if (!activeCharacter) return;
    const maxHP = activeCharacter.puntos_de_golpe.maximos;
    const halfDice = Math.max(1, Math.floor(activeCharacter.nivel / 2));
    const newDiceSpent = Math.max(0, activeCharacter.dados_de_golpe.gastados - halfDice);

    const restoredSlots = { ...activeCharacter.espacios_conjuro };
    Object.keys(restoredSlots).forEach((lvl) => {
      restoredSlots[lvl] = { ...restoredSlots[lvl], gastados: 0 };
    });

    const updated: Character = {
      ...activeCharacter,
      puntos_de_golpe: {
        ...activeCharacter.puntos_de_golpe,
        actuales: maxHP,
        temporales: 0
      },
      dados_de_golpe: {
        ...activeCharacter.dados_de_golpe,
        gastados: newDiceSpent
      },
      espacios_conjuro: restoredSlots,
      salvaciones_muerte: { exitos: 0, fallos: 0 }
    };
    handleUpdateCharacter(updated);
  };

  // Character created in wizard
  const handleCharacterCreated = (newChar: Character) => {
    setCharacters((prev) => [newChar, ...prev]);
    setActiveCharacterId(newChar.id);
    setActiveTab('sheet');
  };

  // Duplicate character
  const handleDuplicateCharacter = (charId: string) => {
    const original = characters.find((c) => c.id === charId);
    if (!original) return;
    const duplicated: Character = {
      ...original,
      id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      nombre: `${original.nombre} (Copia)`,
      creado_en: new Date().toISOString(),
      actualizado_en: new Date().toISOString()
    };
    setCharacters((prev) => [duplicated, ...prev]);
    setActiveCharacterId(duplicated.id);
  };

  // Delete character
  const handleDeleteCharacter = (charId: string) => {
    if (characters.length <= 1) {
      alert('Debes mantener al menos un personaje.');
      return;
    }
    const remaining = characters.filter((c) => c.id !== charId);
    setCharacters(remaining);
    if (activeCharacterId === charId) {
      setActiveCharacterId(remaining[0].id);
    }
  };

  // Import character
  const handleImportCharacter = (importedChar: Character) => {
    setCharacters((prev) => [importedChar, ...prev]);
    setActiveCharacterId(importedChar.id);
    setActiveTab('sheet');
  };

  // Export all characters as JSON
  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(characters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `dnd2024_characters_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export single character as JSON
  const handleExportSingle = (char: Character) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(char, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${char.nombre.replace(/\s+/g, '_')}_dnd2024.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Print active character sheet
  const handlePrintCharacter = () => {
    setActiveTab('sheet');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Persistent Navigation Header */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        characters={characters}
        activeCharacterId={activeCharacterId}
        setActiveCharacterId={setActiveCharacterId}
        onShortRest={handleShortRest}
        onLongRest={handleLongRest}
        onToggleHeroicInspiration={handleToggleInspiration}
        activeCharacter={activeCharacter}
      />

      <OfflineIndicator />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'sheet' && activeCharacter && (
          <CharacterSheet
            character={activeCharacter}
            onUpdateCharacter={handleUpdateCharacter}
          />
        )}

        {activeTab === 'creator' && (
          <CharacterCreator
            onCharacterCreated={handleCharacterCreated}
            onCancel={() => setActiveTab('sheet')}
          />
        )}

        {activeTab === 'compendium' && <CompendiumView />}

        {activeTab === 'manager' && (
          <CharacterManager
            characters={characters}
            activeCharacterId={activeCharacterId}
            onSelectCharacter={(id) => {
              setActiveCharacterId(id);
              setActiveTab('sheet');
            }}
            onCreateNew={() => setActiveTab('creator')}
            onDuplicateCharacter={handleDuplicateCharacter}
            onDeleteCharacter={handleDeleteCharacter}
            onImportCharacter={handleImportCharacter}
            onExportAll={handleExportAll}
            onExportSingle={handleExportSingle}
            onPrintCharacter={handlePrintCharacter}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950/90 py-4 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Gestor de Personajes D&D 2024 (SRD 5.2) · Compatible con GitHub Pages y PWA Offline
          </span>
          <span className="text-stone-600">
            Los datos se almacenan exclusivamente en tu navegador de forma privada.
          </span>
        </div>
      </footer>
    </div>
  );
}
