import { describe, expect, it } from 'vitest';
import { DND_SPECIES } from '../src/data/dndSpecies';
import { DND_CLASSES } from '../src/data/dndClasses';
import { DND_FEATS } from '../src/data/dndFeats';
import { DND_BACKGROUNDS } from '../src/data/dndBackgrounds';
import { getClassFeatureInfo } from '../src/data/dndClassFeatures';

describe('Correcciones del Creador de Personaje (D&D 2024 / SRD 5.2)', () => {
  it('Aasimar debe incluir Revelación celestial como rasgo biológico y NO como subespecie/linaje', () => {
    const aasimar = DND_SPECIES.find((s) => s.id === 'aasimar');
    expect(aasimar).toBeDefined();
    // No debe tener linajes definidos
    expect(aasimar?.linajes).toBeUndefined();
    // Debe tener el rasgo revelacion_celestial
    expect(aasimar?.rasgos.revelacion_celestial).toBeDefined();
    expect(aasimar?.rasgos.revelacion_celestial.nombre).toContain('Revelación celestial');
    expect(aasimar?.rasgos.revelacion_celestial.descripcion).toContain('Alas celestiales');
    expect(aasimar?.rasgos.revelacion_celestial.descripcion).toContain('Fulgor interior');
    expect(aasimar?.rasgos.revelacion_celestial.descripcion).toContain('Mortaja necrótica');
  });

  it('Especies como Elfo y Gnomo deben conservar sus linajes para el sistema desplegable', () => {
    const elfo = DND_SPECIES.find((s) => s.id === 'elfo');
    expect(elfo?.linajes).toBeDefined();
    expect(Object.keys(elfo!.linajes!)).toContain('alto_elfo');
    expect(Object.keys(elfo!.linajes!)).toContain('elfo_bosques');
    expect(Object.keys(elfo!.linajes!)).toContain('drow');

    const gnomo = DND_SPECIES.find((s) => s.id === 'gnomo');
    expect(gnomo?.linajes).toBeDefined();
    expect(Object.keys(gnomo!.linajes!)).toContain('gnomo_bosques');
    expect(Object.keys(gnomo!.linajes!)).toContain('gnomo_rocas');
  });

  it('Dotes de Origen deben estar disponibles para selección funcional (Humano y Trasfondos)', () => {
    const originFeats = DND_FEATS.filter((f) => f.categoria === 'Origen');
    expect(originFeats.length).toBeGreaterThan(5);

    const featIds = originFeats.map((f) => f.id);
    expect(featIds).toContain('alerta');
    expect(featIds).toContain('habilidoso');
    expect(featIds).toContain('duro');
    expect(featIds).toContain('atacantesalvaje');

    // Cada trasfondo debe enlazar a una dote de origen
    DND_BACKGROUNDS.forEach((bg) => {
      expect(bg.dote).toBeDefined();
      expect(bg.detalle.dote).toBeDefined();
    });
  });

  it('Los rasgos de clase deben tener información detallada accesible mediante getClassFeatureInfo (!)', () => {
    const furiaInfo = getClassFeatureInfo('Furia');
    expect(furiaInfo.nombre).toBe('Furia');
    expect(furiaInfo.descripcion).toContain('acción adicional');
    expect(furiaInfo.descripcion).toContain('resistencia');

    const defBarbaro = getClassFeatureInfo('Defensa sin armadura');
    expect(defBarbaro.descripcion).toContain('Constitución');

    const ataqueFurtivo = getClassFeatureInfo('Ataque furtivo');
    expect(ataqueFurtivo.descripcion).toContain('1d6');
  });

  it('Todas las clases deben poseer información base y progresión de nivel 1', () => {
    expect(DND_CLASSES.length).toBe(12);
    DND_CLASSES.forEach((cls) => {
      expect(cls.atributos_basicos?.dado_puntos_golpe).toBeDefined();
      expect(cls.atributos_basicos?.salvaciones.length).toBe(2);
      expect(cls.progresion[0].nivel).toBe(1);
    });
  });
});
