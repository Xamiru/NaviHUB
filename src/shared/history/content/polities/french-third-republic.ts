import { definePolity } from '../../schema'

export default definePolity({
  id: 'french-third-republic',
  names: [
    { text: 'French Third Republic', lang: 'en', role: 'primary' },
    { text: 'Troisième République', lang: 'fr', role: 'native' },
    {
      text: 'Dritte Republik',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '38' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1870-09-04' },
        cites: [
          { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '37' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1940-07-10' },
        cites: [
          {
            source: 'elysee-albert-lebrun',
            loc: { section: 'Albert Lebrun: 10 juillet 1940' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:versailles',
      start: {
        alts: [
          {
            value: { d: '1871' },
            cites: [
              {
                source: 'cshapes-2-dataset',
                loc: { section: 'France (code 220), 1871–1880, capital Versailles' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1880' },
            cites: [
              {
                source: 'cshapes-2-dataset',
                loc: { section: 'France (code 220), 1871–1880, capital Versailles' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'France (code 220), 1871–1880, capital Versailles' }
        }
      ]
    },
    {
      ref: 'place:paris',
      start: {
        alts: [
          {
            value: { d: '1880' },
            cites: [
              {
                source: 'cshapes-2-dataset',
                loc: { section: 'France (code 220), 1880–1886, capital Paris' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'France (code 220), 1880–1886, capital Paris' }
        }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:second-french-empire' }
  ],
  cshapes: [
    { set: 'europe', code: 220, from: 1870.68, to: 1886 },
    { set: 'world', code: 220, to: 1940.53 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Le_Palais_du_Corps_L%C3%A9gislatif_apr%C3%A8s_sa_derni%C3%A8re_s%C3%A9ance%2C_et_la_proclamation_de_la_R%C3%A9publique_le_4_septembre_1870.jpg/1280px-Le_Palais_du_Corps_L%C3%A9gislatif_apr%C3%A8s_sa_derni%C3%A8re_s%C3%A9ance%2C_et_la_proclamation_de_la_R%C3%A9publique_le_4_septembre_1870.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Le_Palais_du_Corps_L%C3%A9gislatif_apr%C3%A8s_sa_derni%C3%A8re_s%C3%A9ance,_et_la_proclamation_de_la_R%C3%A9publique_le_4_septembre_1870.jpg',
    credit: { institution: 'Musée Carnavalet', creator: 'Jules Didier; Jacques Guiaud' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Mit der Ausrufung der Dritten Republik in Frankreich durch Léon Gambetta (1838-1882) endet das napoleonische Kaiserreich.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '38' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
          }
        },
        {
          id: 'q2',
          text: 'Le chef du pouvoir exécutif prend le titre de Président de la République.',
          lang: 'fr',
          cite: { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/adolphe-thiers'
          }
        },
        {
          id: 'q3',
          text: 'Die Verfassung der III. Republik in Frankreich tritt in Kraft.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1876.html'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'reberioux-1975-la-republique-radicale', perspective: 'european' }
  ]
})
