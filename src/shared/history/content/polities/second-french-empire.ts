import { definePolity } from '../../schema'

export default definePolity({
  id: 'second-french-empire',
  names: [
    { text: 'Second French Empire', lang: 'en', role: 'primary' },
    { text: 'Second Empire', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1852-12-02' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1870-09-04' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'France (code 220), 1816–1861 and 1861–1871, capital Paris' }
        }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:french-second-republic' }
  ],
  cshapes: [
    { set: 'europe', code: 220, from: 1852.92, to: 1870.68 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Franz_Xavier_Winterhalter_-_Napoleon_III_in_Coronation_Robes.jpg/1280px-Franz_Xavier_Winterhalter_-_Napoleon_III_in_Coronation_Robes.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Franz_Xavier_Winterhalter_-_Napoleon_III_in_Coronation_Robes.jpg',
    credit: { institution: 'Musée du Louvre' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Un sénatus-consulte rétablit le régime impérial qui est confirmé par un plébiscite.',
          lang: 'fr',
          cite: {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/louis-napoleon-bonaparte'
          }
        },
        {
          id: 'q2',
          text: 'Sous l\'Empire, la France connaît des années de progrès économiques, grâce à la création d\'un système bancaire, au développement des chemins de fer, à l\'amélioration de l\'urbanisme. Mais l\'échec de l\'établissement d\'un empire catholique au Mexique (1861-1867) et l\'attitude de neutralité monnayéen surnommée "politique des "pourboires", face aux conflits entre l\'Autriche et la Prusse, affaiblit le régime.',
          lang: 'fr',
          cite: {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/louis-napoleon-bonaparte'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'À Paris, des députés (dont Léon Gambetta) proclament la République',
          lang: 'fr',
          cite: {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/louis-napoleon-bonaparte'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'girard-1986-napoleon-iii', perspective: 'european' },
    { source: 'plessis-1973-de-la-fete-imperiale-au-mur-des-federes', perspective: 'european' }
  ]
})
