import React, { useRef } from 'react';
import { Character } from '../types';
import { createNewDefaultCharacter } from '../utils/dndCalculations';
import {
  Users,
  Plus,
  Copy,
  Download,
  Upload,
  Trash2,
  Printer,
  Shield,
  Heart,
  Check
} from 'lucide-react';

interface CharacterManagerProps {
  characters: Character[];
  activeCharacterId: string;
  onSelectCharacter: (id: string) => void;
  onCreateNew: () => void;
  onDuplicateCharacter: (id: string) => void;
  onDeleteCharacter: (id: string) => void;
  onImportCharacter: (character: Character) => void;
  onExportAll: () => void;
  onExportSingle: (char: Character) => void;
  onPrintCharacter: () => void;
}

export const CharacterManager: React.FC<CharacterManagerProps> = ({
  characters,
  activeCharacterId,
  onSelectCharacter,
  onCreateNew,
  onDuplicateCharacter,
  onDeleteCharacter,
  onImportCharacter,
  onExportAll,
  onExportSingle,
  onPrintCharacter
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.nombre && parsed.caracteristicas) {
          // Generate fresh id if already exists
          const importedChar: Character = {
            ...parsed,
            id: `char_imported_${Date.now()}`
          };
          onImportCharacter(importedChar);
        } else {
          alert('El archivo JSON no tiene un formato de personaje válido de D&D 2024.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Top Banner with Actions */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-amber-400" />
            <h2 className="font-serif font-bold text-2xl text-amber-100">
              Gestor de Personajes
            </h2>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Tus personajes se guardan localmente en el navegador y funcionan sin conexión. Puedes exportar copias de seguridad en JSON o imprimir tu hoja.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onCreateNew}
            className="flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-sm transition shadow-md shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Personaje</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-medium transition"
            title="Importar un archivo JSON de personaje"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Importar JSON</span>
          </button>

          <button
            onClick={onExportAll}
            className="flex items-center space-x-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-medium transition"
            title="Exportar todos los personajes en un único backup JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Copia Total</span>
          </button>

          <button
            onClick={onPrintCharacter}
            className="flex items-center space-x-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-medium transition"
            title="Imprimir o guardar en PDF la ficha de personaje activa"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Imprimir Ficha</span>
          </button>
        </div>
      </div>

      {/* Characters List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((char) => {
          const isActive = char.id === activeCharacterId;
          return (
            <div
              key={char.id}
              className={`bg-stone-900 rounded-2xl p-5 border transition flex flex-col justify-between shadow-lg relative ${
                isActive
                  ? 'border-amber-500/80 ring-1 ring-amber-500/40'
                  : 'border-stone-800 hover:border-stone-700'
              }`}
            >
              {isActive && (
                <span className="absolute top-4 right-4 bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow">
                  Activo
                </span>
              )}

              <div className="space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-amber-100 line-clamp-1">
                    {char.nombre}
                  </h3>
                  <div className="flex flex-wrap gap-1 text-xs text-stone-400 mt-1">
                    <span className="bg-stone-800 px-2 py-0.5 rounded font-medium text-amber-300">
                      Nivel {char.nivel}
                    </span>
                    <span className="bg-stone-800 px-2 py-0.5 rounded capitalize">
                      {char.clase}
                    </span>
                    <span className="bg-stone-800 px-2 py-0.5 rounded capitalize">
                      {char.especie}
                    </span>
                  </div>
                </div>

                {/* Stat pills */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-800/80 text-center">
                  <div className="bg-stone-950/70 p-2 rounded-xl">
                    <span className="text-[10px] text-stone-400 block uppercase">Salud</span>
                    <span className="font-serif font-bold text-red-400 text-sm">
                      {char.puntos_de_golpe.actuales}/{char.puntos_de_golpe.maximos}
                    </span>
                  </div>
                  <div className="bg-stone-950/70 p-2 rounded-xl">
                    <span className="text-[10px] text-stone-400 block uppercase">Fuerza</span>
                    <span className="font-serif font-bold text-amber-200 text-sm">
                      {char.caracteristicas.fuerza}
                    </span>
                  </div>
                  <div className="bg-stone-950/70 p-2 rounded-xl">
                    <span className="text-[10px] text-stone-400 block uppercase">Oro</span>
                    <span className="font-serif font-bold text-amber-400 text-sm">
                      {char.monedas.po} po
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-400 line-clamp-2 italic">
                  "{char.notas || 'Sin notas registradas aún...'}"
                </p>
              </div>

              {/* Card Actions */}
              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectCharacter(char.id)}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                  }`}
                >
                  {isActive ? 'Ficha Abierta ✓' : 'Abrir Ficha'}
                </button>

                <button
                  onClick={() => onDuplicateCharacter(char.id)}
                  className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-200"
                  title="Duplicar personaje"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onExportSingle(char)}
                  className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-200"
                  title="Descargar este personaje en .json"
                >
                  <Download className="w-4 h-4" />
                </button>

                {characters.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm(`¿Estás seguro de eliminar a ${char.nombre}?`)) {
                        onDeleteCharacter(char.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-red-400"
                    title="Eliminar personaje"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
