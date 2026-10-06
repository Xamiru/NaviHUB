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
  researched: '2026-10-06',
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
  ]
})
