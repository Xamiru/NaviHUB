import { definePerson } from '../../schema'

export default definePerson({
  id: 'napoleon-iii',
  names: [
    { text: 'Napoleon III', lang: 'en', role: 'primary' },
    { text: 'Napoléon III', lang: 'fr', role: 'native' },
    {
      text: 'Louis-Napoléon Bonaparte',
      lang: 'fr',
      role: 'alternative',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    },
    {
      text: 'Louis Napoleon',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '15' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1808-04-20' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1873-01-09' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:paris',
    cites: [
      {
        source: 'elysee-louis-napoleon-bonaparte',
        loc: { section: 'Louis-Napoléon Bonaparte' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch', 'head-of-state'],
  offices: [
    {
      title: 'Président de la République',
      lang: 'fr',
      start: {
        alts: [
          {
            value: { d: '1848-12-10' },
            cites: [
              {
                source: 'elysee-louis-napoleon-bonaparte',
                loc: { section: 'Louis-Napoléon Bonaparte' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    },
    {
      title: 'Empereur des Français',
      lang: 'fr',
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
            value: { d: '1871-03-01' },
            cites: [
              {
                source: 'elysee-louis-napoleon-bonaparte',
                loc: { section: 'Louis-Napoléon Bonaparte' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        },
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Naissance à Paris de Charles-Louis-Napoléon Bonaparte, troisième fils de Louis Bonaparte, frère de l\'Empereur et roi de Hollande, et d\'Hortense de Beauharnais, née d\'un premier mariage de l\'impératrice Joséphine.',
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
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Après la promulgation, le 4 novembre 1848, de la constitution de la IIe République, il se présente à l\'élection présidentielle, et est élu pour quatre ans au suffrage universel, le 10 décembre 1848, avec près de 75% des voix.',
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
          id: 'q3',
          text: 'La politique italienne de l\'Empereur - en faveur de l\'unification et au détriment de l\'Autriche - permet à la France d\'annexer, après plébiscite, Nice et la Savoie.',
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
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'Lors de la capitulation de Sedan, l\'Empereur est fait prisonnier.',
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
          id: 'q5',
          text: 'Il meurt à l\'âge de 64 ans, dans sa résidence de Camden Place.',
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
          id: 'q6',
          text: 'By his own admission, the 1860s were a “black spot” that darkened the horizon, for which he was partly responsible.',
          lang: 'en',
          cite: {
            source: 'ehne-anceau-napoleon-iii-and-europe',
            loc: { section: 'Napoleon III and Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/arbiters-and-arbitration-in-europe-beginning-modern-times/napoleon-iii-and-europe'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Franz_Xavier_Winterhalter_-_Napoleon_III_in_Coronation_Robes.jpg/1280px-Franz_Xavier_Winterhalter_-_Napoleon_III_in_Coronation_Robes.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Franz_Xavier_Winterhalter_-_Napoleon_III_in_Coronation_Robes.jpg',
    credit: { institution: 'Musée du Louvre' },
    license: { id: 'public-domain' }
  }
})
