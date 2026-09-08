import React, { useState } from 'react';
import { DND_CLASSES } from '../data/dndClasses';
import { DND_SUBCLASSES } from '../data/dndSubclasses';
import { DND_SPECIES } from '../data/dndSpecies';
import { DND_BACKGROUNDS } from '../data/dndBackgrounds';
import { DND_FEATS } from '../data/dndFeats';
import { DND_SPELLS } from '../data/dndSpells';
import { DND_EQUIPMENT_CATALOG } from '../data/dndEquipment';
import {
  BookOpen,
  Search,
  Sword,
  Shield,
  Sparkles,
  Award,
  Backpack,
  Scroll,
  Filter,
  Check
} from 'lucide-react';

export const CompendiumView: React.FC = () => {
  const [compendiumTab, setCompendiumTab] = useState<
    'clases' | 'subclases' | 'especies' | 'trasfondos' | 'dotes' | 'conjuros' | 'equipo'
  >('clases');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeatCategory, setSelectedFeatCategory] = useState<string>('Todas');
  const [selectedSpellLevel, setSelectedSpellLevel] = useState<string>('Todos');
  const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState<string>('Todas');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('Todas');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header & Sub-Navigation */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-amber-100">
                Compendio de Reglas D&D 2024
              </h2>
              <p className="text-xs text-stone-400">
                Base de datos completa del SRD 5.2 / PHB 2024 disponible 100% offline.
              </p>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="flex items-center space-x-2 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en el compendio..."
              className="bg-transparent text-sm text-stone-100 placeholder-stone-500 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Compendium Category Tabs */}
        <div className="flex space-x-1.5 border-t border-stone-800/80 pt-3 overflow-x-auto">
          {[
            { id: 'clases', label: '12 Clases', icon: Sword },
            { id: 'subclases', label: '48 Subclases', icon: Shield },
            { id: 'especies', label: '10 Especies', icon: Scroll },
            { id: 'trasfondos', label: '16 Trasfondos', icon: Award },
            { id: 'dotes', label: '75 Dotes', icon: Sparkles },
            { id: 'conjuros', label: 'Conjuros 2024', icon: Sparkles },
            { id: 'equipo', label: 'Catálogo de Equipo (187)', icon: Backpack }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = compendiumTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCompendiumTab(tab.id as any);
                  setSearchQuery('');
                }}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* COMPENDIUM: 12 CLASES */}
      {compendiumTab === 'clases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DND_CLASSES.filter(
            (c) =>
              c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((cls) => (
            <div
              key={cls.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:border-amber-500/50 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-lg text-amber-200">
                    {cls.nombre}
                  </h3>
                  <span className="font-mono text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                    {cls.atributos_basicos?.dado_puntos_golpe || '1d8'} PG
                  </span>
                </div>
                <p className="text-xs text-stone-400 mb-3">{cls.descripcion}</p>

                <div className="space-y-2 text-xs text-stone-300 border-t border-stone-800/70 pt-3">
                  <div>
                    <strong className="text-stone-400">Características Primarias:</strong>{' '}
                    <span className="capitalize">
                      {Array.isArray(cls.caracteristica_principal)
                        ? cls.caracteristica_principal.join(', ')
                        : cls.caracteristica_principal || 'Fuerza'}
                    </span>
                  </div>
                  <div>
                    <strong className="text-stone-400">Tiradas de Salvación:</strong>{' '}
                    <span className="capitalize">
                      {cls.atributos_basicos?.salvaciones?.join(', ') || 'Fuerza, Constitución'}
                    </span>
                  </div>
                  <div>
                    <strong className="text-stone-400">Armaduras & Armas:</strong>{' '}
                    {cls.atributos_basicos?.competencias?.armaduras?.join(', ') || 'Ninguna'};{' '}
                    {cls.atributos_basicos?.competencias?.armas?.join(', ') || 'Armas sencillas'}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/70">
                <span className="text-[11px] font-semibold text-amber-400/80 block mb-1.5">
                  Rasgos de Nivel 1:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(cls.progresion?.[0]?.rasgos || ['Competencias de clase']).map((r, i) => (
                    <span
                      key={i}
                      className="bg-stone-950 border border-stone-800 text-[10px] text-stone-300 px-2 py-0.5 rounded"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMPENDIUM: 48 SUBCLASES */}
      {compendiumTab === 'subclases' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedClassFilter('Todas')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                selectedClassFilter === 'Todas'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-900 text-stone-400 border border-stone-800'
              }`}
            >
              Todas las Clases
            </button>
            {DND_CLASSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedClassFilter(c.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize whitespace-nowrap ${
                  selectedClassFilter === c.id
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-900 text-stone-400 border border-stone-800'
                }`}
              >
                {c.nombre}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DND_SUBCLASSES.filter((sc) => {
              const matchClass = selectedClassFilter === 'Todas' || sc.clase === selectedClassFilter;
              const matchQuery =
                sc.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sc.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sc.rasgos.some((r) => r.nombre.toLowerCase().includes(searchQuery.toLowerCase()));
              return matchClass && matchQuery;
            }).map((sc) => {
              const parentClass = DND_CLASSES.find((c) => c.id === sc.clase);
              return (
                <div
                  key={sc.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-lg text-amber-200">
                      {sc.nombre}
                    </h3>
                    <span className="text-xs font-semibold bg-stone-800 text-stone-300 px-2.5 py-1 rounded-lg capitalize">
                      {parentClass?.nombre || sc.clase}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">{sc.descripcion}</p>

                  <div className="space-y-2 pt-2 border-t border-stone-800/80">
                    <span className="text-xs font-bold text-amber-400">
                      Progresión de Rasgos:
                    </span>
                    {sc.rasgos.map((rasgo, i) => (
                      <div
                        key={i}
                        className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800/80 text-xs space-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-stone-200">{rasgo.nombre}</strong>
                          <span className="text-[10px] text-amber-400 font-mono">
                            Nivel {rasgo.nivel}
                          </span>
                        </div>
                        <p className="text-stone-400 text-[11px]">{rasgo.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* COMPENDIUM: 10 ESPECIES */}
      {compendiumTab === 'especies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DND_SPECIES.filter(
            (s) =>
              s.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((spec) => (
            <div
              key={spec.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-amber-200">
                  {spec.nombre}
                </h3>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-semibold">
                  Velocidad: {spec.velocidad?.base || 9} m
                </span>
              </div>
              <p className="text-xs text-stone-400">{spec.descripcion}</p>

              <div className="space-y-2 pt-2 border-t border-stone-800/80">
                <span className="text-xs font-bold text-amber-400">Rasgos de Especie:</span>
                {Object.values(spec.rasgos || {}).map((r: any, i) => (
                  <div
                    key={i}
                    className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800/80 text-xs"
                  >
                    <strong className="text-stone-200 block mb-0.5">{r.nombre}</strong>
                    <span className="text-stone-400 text-[11px]">{r.descripcion}</span>
                  </div>
                ))}
              </div>

              {spec.detalle?.selecciones && spec.detalle.selecciones.length > 0 && (
                <div className="pt-2 border-t border-stone-800/80">
                  <span className="text-xs font-bold text-stone-300 block mb-1.5">
                    {spec.detalle.selecciones[0].nombre}:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {spec.detalle.selecciones[0].opciones.map((lin: any) => (
                      <div
                        key={lin.id}
                        className="bg-stone-950 p-2 rounded-lg border border-stone-800 text-[11px]"
                      >
                        <strong className="text-amber-300 block">{lin.nombre}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* COMPENDIUM: 16 TRASFONDOS */}
      {compendiumTab === 'trasfondos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DND_BACKGROUNDS.filter(
            (b) =>
              b.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.dote.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((bg) => (
            <div
              key={bg.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-md space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif font-bold text-lg text-amber-200">
                    {bg.nombre}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 mb-3">{bg.descripcion}</p>

                <div className="space-y-1.5 text-xs text-stone-300 pt-2 border-t border-stone-800">
                  <div>
                    <strong className="text-amber-400">Dote de Origen:</strong> {bg.dote}
                  </div>
                  <div>
                    <strong className="text-stone-400">Puntuaciones:</strong>{' '}
                    <span className="capitalize">
                      {bg.detalle.puntuaciones_caracteristica.opciones.join(', ')}
                    </span>
                  </div>
                  <div>
                    <strong className="text-stone-400">Habilidades:</strong>{' '}
                    <span className="capitalize">
                      {bg.detalle.competencias.habilidades.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {bg.equipo?.opciones && (
                <div className="mt-3 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
                  <strong className="text-stone-300 block mb-1">Equipo Inicial:</strong>
                  <span>
                    {bg.equipo.opciones[0].contenido
                      .map((c) => (c.moneda ? `${c.cantidad} ${c.texto}` : c.texto))
                      .join(', ')}{' '}
                    o 50 po.
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* COMPENDIUM: 75 DOTES */}
      {compendiumTab === 'dotes' && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {['Todas', 'Origen', 'Estilo de combate', 'General', 'Don épico'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFeatCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  selectedFeatCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-400 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DND_FEATS.filter((f) => {
              const matchCat = selectedFeatCategory === 'Todas' || f.categoria === selectedFeatCategory;
              const matchQuery =
                f.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                f.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
              return matchCat && matchQuery;
            }).map((feat) => (
              <div
                key={feat.id}
                className="bg-stone-900 border border-stone-800 rounded-xl p-4 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-amber-200">{feat.nombre}</h4>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                      feat.categoria === 'Don épico'
                        ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                        : feat.categoria === 'Origen'
                        ? 'bg-blue-950/60 text-blue-300 border-blue-800'
                        : feat.categoria === 'Estilo de combate'
                        ? 'bg-red-950/60 text-red-300 border-red-800'
                        : 'bg-amber-950/60 text-amber-300 border-amber-800'
                    }`}
                  >
                    {feat.categoria}
                  </span>
                </div>
                <p className="text-xs text-stone-400">{feat.descripcion}</p>
                {feat.repetible && (
                  <span className="text-[10px] text-emerald-400 font-semibold block">
                    (Repetible)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPENDIUM: CONJUROS */}
      {compendiumTab === 'conjuros' && (
        <div className="space-y-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {['Todos', '0', '1', '2', '3', '4', '7', '9'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedSpellLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  selectedSpellLevel === lvl
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-400 border border-stone-800'
                }`}
              >
                {lvl === 'Todos' ? 'Todos los Niveles' : lvl === '0' ? 'Trucos' : `Nivel ${lvl}`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DND_SPELLS.filter((spell) => {
              const matchLvl = selectedSpellLevel === 'Todos' || spell.nivel.toString() === selectedSpellLevel;
              const matchQuery =
                spell.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                spell.escuela.toLowerCase().includes(searchQuery.toLowerCase()) ||
                spell.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                spell.clases.some((c) => c.includes(searchQuery.toLowerCase()));
              return matchLvl && matchQuery;
            }).map((spell) => (
              <div
                key={spell.id}
                className="bg-stone-900 border border-stone-800 rounded-xl p-4 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-sm text-purple-300">{spell.nombre}</h4>
                    <span className="text-xs bg-stone-800 px-2 py-0.5 rounded text-stone-400">
                      {spell.nivel === 0 ? 'Truco' : `Nivel ${spell.nivel}`}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">{spell.escuela}</span>
                </div>

                <div className="flex flex-wrap gap-2 text-[11px] text-stone-500">
                  <span>Tiempo: {spell.tiempo_lanzamiento}</span>
                  <span>·</span>
                  <span>Alcance: {spell.alcance}</span>
                  <span>·</span>
                  <span>Duración: {spell.duracion}</span>
                  {spell.concentracion && (
                    <span className="text-blue-400 font-semibold">[Concentración]</span>
                  )}
                  {spell.ritual && (
                    <span className="text-emerald-400 font-semibold">[Ritual]</span>
                  )}
                </div>

                <p className="text-xs text-stone-300">{spell.descripcion}</p>

                <div className="text-[10px] text-stone-500 capitalize">
                  Clases: {spell.clases.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPENDIUM: EQUIPO (187 OBJETOS) */}
      {compendiumTab === 'equipo' && (
        <div className="space-y-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              'Todas',
              'armas',
              'armaduras',
              'escudo',
              'herramientas',
              'aventurero',
              'municion',
              'paquetes',
              'monturas',
              'arreos'
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedEquipmentCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize whitespace-nowrap ${
                  selectedEquipmentCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-400 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-800 text-xs uppercase text-stone-400 tracking-wider">
                  <th className="pb-3">Nombre</th>
                  <th className="pb-3">Categoría</th>
                  <th className="pb-3">Precio</th>
                  <th className="pb-3">Peso</th>
                  <th className="pb-3">Daño / CA / Efecto</th>
                  <th className="pb-3 text-amber-400">Maestría 2024</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 text-xs">
                {DND_EQUIPMENT_CATALOG.filter((item) => {
                  const matchCat =
                    selectedEquipmentCategory === 'Todas' || item.categoria === selectedEquipmentCategory;
                  const matchQuery =
                    item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (item.maestria && item.maestria.toLowerCase().includes(searchQuery.toLowerCase()));
                  return matchCat && matchQuery;
                }).map((item) => (
                  <tr key={item.id} className="hover:bg-stone-800/40 transition">
                    <td className="py-2.5 font-medium text-stone-200">{item.nombre}</td>
                    <td className="py-2.5 text-stone-400 capitalize">{item.categoria}</td>
                    <td className="py-2.5 font-mono text-amber-300">
                      {item.precio.cantidad} {item.precio.moneda}
                    </td>
                    <td className="py-2.5 text-stone-400 font-mono">
                      {item.peso_kg ? `${item.peso_kg} kg` : '—'}
                    </td>
                    <td className="py-2.5 text-stone-300">
                      {item.dano && (
                        <span>
                          {item.dano} {item.tipo_dano} ({item.propiedades?.join(', ')})
                        </span>
                      )}
                      {item.armadura && (
                        <span>
                          CA {item.armadura.clase_armadura.base} + DES
                          {item.armadura.clase_armadura.limite_destreza ? ` (máx ${item.armadura.clase_armadura.limite_destreza})` : ''}
                          {item.armadura.fuerza_minima ? ` · FUE ${item.armadura.fuerza_minima}` : ''}
                          {item.armadura.desventaja_sigilo ? ' · Desv. Sigilo' : ''}
                        </span>
                      )}
                      {item.escudo && <span>+{item.escudo.bonificador_ca} CA</span>}
                    </td>
                    <td className="py-2.5">
                      {item.maestria ? (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-semibold text-[11px]">
                          {item.maestria}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
