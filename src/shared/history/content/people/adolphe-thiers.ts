import { definePerson } from '../../schema'

export default definePerson({
  id: 'adolphe-thiers',
  names: [
    { text: 'Adolphe Thiers', lang: 'en', role: 'primary' },
    {
      text: 'Adolphe Marie Joseph Louis Thiers',
      lang: 'fr',
      role: 'alternative',
      cites: [
        { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1797-04-14' },
        cites: [
          { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1877-09-03' },
        cites: [
          { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician', 'head-of-state', 'writer'],
  offices: [
    {
      title: 'chef du pouvoir exécutif',
      lang: 'fr',
      start: {
        alts: [
          {
            value: { d: '1871-02-17' },
            cites: [
              { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '15' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1871-08-31' },
            cites: [
              { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
      ]
    },
    {
      title: 'Président de la République',
      lang: 'fr',
      start: {
        alts: [
          {
            value: { d: '1871-08-31' },
            cites: [
              { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '54' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1873-05' },
            cites: [
              { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Après des études au lycée de Marseille puis à Aix, où il obtient une licence en droit, il devient avocat.',
          lang: 'fr',
          cite: { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/adolphe-thiers'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Hostile à la guerre contre la Prusse, il milite pour la paix.',
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
          text: 'L\'Assemblée nationale, réunie à Bordeaux, le nomme « chef du pouvoir exécutif ».',
          lang: 'fr',
          cite: { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/adolphe-thiers'
          }
        },
        {
          id: 'q4',
          text: 'Après les troubles des années 1870-1871, il s\'emploie à redresser le pays : il met fin à l\'occupation allemande en finançant le paiement de l\'indemnité par deux emprunts, augmente les impôts et réorganise le service militaire.',
          lang: 'fr',
          cite: { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/adolphe-thiers'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'Il quitte le pouvoir, renversé par une Assemblée à majorité monarchique, hostile à sa conception de la République conservatrice.',
          lang: 'fr',
          cite: { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/adolphe-thiers'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Adolphe_Thiers_C.Dolard.jpg/1280px-Adolphe_Thiers_C.Dolard.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Adolphe_Thiers_C.Dolard.jpg',
    credit: { creator: 'Camille Dolard' },
    license: { id: 'cc0' }
  }
})
