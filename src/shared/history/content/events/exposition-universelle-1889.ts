import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'exposition-universelle-1889',
  names: [
    { text: 'Exposition Universelle of 1889', lang: 'en', role: 'primary' },
    {
      text: 'Paris Exhibition of 1889',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-exhibition', loc: { section: 'EXHIBITION', para: '10' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1889' },
        cites: [
          { source: 'britannica-1911-exhibition', loc: { section: 'EXHIBITION', para: '10' } },
          {
            source: 'britannica-1911-eiffel-tower',
            loc: { section: 'EIFFEL TOWER', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        { source: 'britannica-1911-exhibition', loc: { section: 'EXHIBITION', para: '10' } }
      ]
    },
    {
      ref: 'place:eiffel-tower',
      cites: [
        { source: 'britannica-1911-eiffel-tower', loc: { section: 'EIFFEL TOWER', para: '1' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:french-third-republic' }
  ],
  participants: [
    {
      name: 'Alexandre Gustave Eiffel',
      role: 'organizer',
      cites: [
        { source: 'britannica-1911-eiffel-tower', loc: { section: 'EIFFEL TOWER', para: '1' } }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 32350297 },
            cites: [
              {
                source: 'britannica-1911-exhibition',
                loc: { section: 'EXHIBITION', para: '10' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Paris Exhibition of 1889 marked an important change in the policy which had previously characterized the management of these gatherings.',
          lang: 'en',
          cite: { source: 'britannica-1911-exhibition', loc: { section: 'EXHIBITION', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Exhibition'
          }
        },
        {
          id: 'q2',
          text: 'The attendances reached the then unprecedented number of 32,350,297,',
          lang: 'en',
          cite: { source: 'britannica-1911-exhibition', loc: { section: 'EXHIBITION', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Exhibition'
          }
        },
        {
          id: 'q3',
          text: 'Amongst the novelties was the Eiffel Tower, 1000 ft. in height, and a faithful reproduction of a street in Cairo.',
          lang: 'en',
          cite: { source: 'britannica-1911-exhibition', loc: { section: 'EXHIBITION', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Exhibition'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'EIFFEL TOWER. Erected for the exposition of 1889, the Eiffel Tower, in the Champ de Mars, Paris, is by far the highest artificial structure in the world, and its height of 300 metres (984 ft.) surpasses that of the obelisk at Washington by 429 ft., and that of St Paul’s cathedral by 580 ft.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-eiffel-tower',
            loc: { section: 'EIFFEL TOWER', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Eiffel_Tower'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q5',
          text: 'The funds were contributed partly by the state, which voted 17,000,000 francs, and by the municipality of Paris, which gave 8,000,000.',
          lang: 'en',
          cite: { source: 'britannica-1911-exhibition', loc: { section: 'EXHIBITION', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Exhibition'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1887-01-28' },
            cites: [
              {
                source: 'britannica-1911-eiffel-tower',
                loc: { section: 'EIFFEL TOWER', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'The work of building this structure, which is mainly composed of iron lattice-work, was begun on the 28th of January 1887, and the full height was reached on the 13th of March 1889.',
        lang: 'en',
        cite: { source: 'britannica-1911-eiffel-tower', loc: { section: 'EIFFEL TOWER', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Eiffel_Tower'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1887-02-14' },
            cites: [
              { source: 'lemo-chronik-1887', loc: { section: 'Chronik 1887', para: '11' } },
              { source: 'lemo-chronik-1887', loc: { section: 'Chronik 1887', para: '12' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In einem Manifest protestieren namhafte französische Künstler gegen das Projekt des Ingenieurs Gustave Eiffel (1832-1923), für die Weltausstellung 1889 in Paris einen Eisenskelettturm zu errichten.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1887', loc: { section: 'Chronik 1887', para: '12' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1887.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1889-05-15' },
            cites: [
              { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '29' } },
              { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '30' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Sadi Carnot, who had succeeded M. Jules Grévy as President of the Republic on the 3rd of December 1887, officially opened the exhibition on the 6th of May 1889. Numerous fêtes were held in the grounds while the exhibition lasted. The Eiffel Tower and the illuminated fountains enraptured the crowd of visitors,',
        lang: 'en',
        cite: { source: 'britannica-1911-paris', loc: { section: 'PARIS', para: '373' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Paris'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Eiffel_tower_at_Exposition_Universelle%2C_Paris%2C_1889.jpg/1280px-Eiffel_tower_at_Exposition_Universelle%2C_Paris%2C_1889.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Eiffel_tower_at_Exposition_Universelle,_Paris,_1889.jpg',
    credit: { institution: 'Library of Congress', creator: 'Neurdein' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'ory-1989-lexpo-universelle-1889', perspective: 'european' }
  ]
})
