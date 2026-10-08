import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mexican-revolution-meaning',
  about: ['event:mexican-revolution'],
  topic: 'nature',
  researched: '2026-10-07',
  positions: [
    {
      id: 'political-restoration',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Francisco I. Madero', ref: 'person:francisco-madero' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'En México, como república democrática, el Poder Público no puede tener otro origen ni otra base que la voluntad nacional y ésta no puede ser supeditada a fórmulas llevadas a cabo de un modo fraudulento.',
          lang: 'es',
          cite: { source: 'madero-1910-plan-de-san-luis', loc: { para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://es.wikisource.org/wiki/Plan_de_San_Luis'
          }
        },
        {
          id: 'q5',
          text: '4.- Además de la Constitución y leyes vigentes, se declara ley suprema de la República el principio de No-Reelección del Presidente y Vice-Presidente de la República, Gobernadores de los Estados y Presidentes Municipales, mientras que se hagan las reformas constitucionales respectivas.',
          lang: 'es',
          cite: { source: 'madero-1910-plan-de-san-luis', loc: { para: '25' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://es.wikisource.org/wiki/Plan_de_San_Luis'
          }
        }
      ]
    },
    {
      id: 'agrarian-social-revolution',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Emiliano Zapata', ref: 'person:emiliano-zapata' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'La nación mexicana es demasiado rica. Su riqueza, aunque virgen, es decir todavía no explotada, consiste en la agricultura y la minería; pero esa riqueza, ese caudal de oro inagotable, perteneciendo a más de quince millones de habitantes, se halla en manos de unos cuantos miles de capitalistas y de ellos una gran parte no son mexicanos. Por un refinado y desastroso egoísmo, el hacendado, el terrateniente y el minero, explotan esa pequeña parte de la tierra, del monte y de la vera, aprovechándose ellos de sus cuantiosos productos y conservando la mayor parte de sus propiedades enteramente vírgenes, mientras un cuadro de indescriptible miseria tiene lugar en toda la República.',
          lang: 'es',
          cite: { source: 'zapata-1912-manifiesto-a-la-nacion', loc: { para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://es.wikisource.org/wiki/Manifiesto_de_Zapata_a_la_Naci%C3%B3n_(1912-10-20)'
          }
        },
        {
          id: 'q7',
          text: 'Semejante organización económica, tal sistema administrativo que venía a ser un asesinato en masa para el pueblo, un suicidio colectivo para la nación y un insulto, una vergüenza para los hombres honrados y conscientes, no pudieron prolongarse por más tiempo y surgió la revolución, engendrada, como todo movimiento de las colectividades, por la necesidad. Aquí tuvo su origen el Plan de Ayala.',
          lang: 'es',
          cite: { source: 'zapata-1912-manifiesto-a-la-nacion', loc: { para: '17' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://es.wikisource.org/wiki/Manifiesto_de_Zapata_a_la_Naci%C3%B3n_(1912-10-20)'
          }
        }
      ]
    },
    {
      id: 'revolution-and-world-war',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Stephan Scheuzger' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Between 1914 and 1918, state actors in Germany, Great Britain and the United States defined their policies towards Mexico and its nationalist revolution with a view not only to improve their respective economic interests but also to influence the course of the world war.',
          lang: 'en',
          cite: {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Mexican Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/mexican-revolution/'
          }
        }
      ]
    }
  ]
})
