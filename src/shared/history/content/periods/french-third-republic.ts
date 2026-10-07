import { definePeriod } from '../../schema'

export default definePeriod({
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
  researched: '2026-10-07',
  periodType: 'regime',
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
  regions: ['europe'],
  prominence: 2,
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
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Le_Palais_du_Corps_L%C3%A9gislatif_apr%C3%A8s_sa_derni%C3%A8re_s%C3%A9ance%2C_et_la_proclamation_de_la_R%C3%A9publique_le_4_septembre_1870.jpg/1280px-Le_Palais_du_Corps_L%C3%A9gislatif_apr%C3%A8s_sa_derni%C3%A8re_s%C3%A9ance%2C_et_la_proclamation_de_la_R%C3%A9publique_le_4_septembre_1870.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Le_Palais_du_Corps_L%C3%A9gislatif_apr%C3%A8s_sa_derni%C3%A8re_s%C3%A9ance,_et_la_proclamation_de_la_R%C3%A9publique_le_4_septembre_1870.jpg',
    credit: { institution: 'Musée Carnavalet', creator: 'Jules Didier; Jacques Guiaud' },
    license: { id: 'public-domain' }
  }
})
