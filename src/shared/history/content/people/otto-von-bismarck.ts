import { definePerson } from '../../schema'

export default definePerson({
  id: 'otto-von-bismarck',
  names: [
    { text: 'Otto von Bismarck', lang: 'en', role: 'primary' },
    { text: 'Otto Eduard Leopold von Bismarck', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1815-04-01' },
        cites: [
          {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '1' }
          },
          {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1898-07-30' },
        cites: [
          {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '124' }
          },
          {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '125' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Deutsches Historisches Museum' }
        ]
      },
      {
        value: { d: '1898-07-31' },
        cites: [
          {
            source: 'britannica-1911-bismarck',
            loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '16' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica' }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician'],
  offices: [
    {
      title: 'Prussian representative at the restored diet of Frankfort',
      polity: 'polity:kingdom-of-prussia',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1851-07-15' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '47' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-bismarck',
          loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '3' }
        }
      ]
    },
    {
      title: 'ambassador at St Petersburg',
      polity: 'polity:kingdom-of-prussia',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1858' },
            cites: [
              {
                source: 'britannica-1911-bismarck',
                loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica' }
            ]
          },
          {
            value: { d: '1859' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '54' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Deutsches Historisches Museum' }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-bismarck',
          loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '4' }
        }
      ]
    },
    {
      title: 'minister-president and foreign minister',
      polity: 'polity:kingdom-of-prussia',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1862-10-08' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '56' }
              },
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '60' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1890-03-20' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '108' }
              },
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '112' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-bismarck',
          loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '4' }
        },
        {
          source: 'lemo-biografie-otto-von-bismarck',
          loc: { section: 'Otto von Bismarck 1815-1898', para: '60' }
        },
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Bismarck and Unification', para: '2' }
        }
      ]
    },
    {
      title: 'Kanzler des Norddeutschen Bundes',
      lang: 'de',
      start: {
        alts: [
          {
            value: { d: '1867-07-14' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '77' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'lemo-biografie-otto-von-bismarck',
          loc: { section: 'Otto von Bismarck 1815-1898', para: '77' }
        }
      ]
    },
    {
      title: 'chancellor',
      polity: 'polity:german-empire',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1871-03-21' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '81' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1890-03-20' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '111' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-bismarck',
          loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '15' }
        },
        {
          source: 'lemo-biografie-otto-von-bismarck',
          loc: { section: 'Otto von Bismarck 1815-1898', para: '81' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q10',
          text: 'BISMARCK, OTTO EDUARD LEOPOLD VON, Prince, duke of Lauenburg (1815–1898), German statesman, was born on the 1st of April 1815, at the manor-house of Schönhausen, his father’s seat in the mark of Brandenburg.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-bismarck',
            loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bismarck,_Otto_Eduard_Leopold_von'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'An indication of this wider range of support was the change of mind about German nationalism experienced by an obscure Prussian diplomat, Otto von Bismarck.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q2',
          text: 'During the 1850s, however, Bismarck had concluded that Prussia would have to harness German nationalism for its own purposes if it were to thrive.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q13',
          text: 'It was probably his speeches on German policy which induced the king to appoint him Prussian representative at the restored diet of Frankfort in 1851.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-bismarck',
            loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bismarck,_Otto_Eduard_Leopold_von'
          }
        },
        {
          id: 'q14',
          text: 'In September the parliament, by a large majority, threw out the budget, and the king, having nowhere else to turn for help, at Roon’s advice summoned Bismarck to Berlin and appointed him minister-president and foreign minister.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-bismarck',
            loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bismarck,_Otto_Eduard_Leopold_von'
          }
        },
        {
          id: 'q5',
          text: 'Descended from the Junker, Prussia\'s aristocratic landowning class, Bismarck hated parliamentary democracy and championed the dominance of the monarchy and aristocracy.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q11',
          text: 'The indignation which his appointment caused was intense; he was known only by the reputation which in his early years he had won as a violent ultra-Conservative, and the apprehensions were increased by his first speech, in which he said that the German question could not be settled by speeches and parliamentary decrees, but only by blood and iron.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-bismarck',
            loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bismarck,_Otto_Eduard_Leopold_von'
          }
        },
        {
          id: 'q15',
          text: 'In 1878 he presided over the congress of Berlin.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-bismarck',
            loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bismarck,_Otto_Eduard_Leopold_von'
          }
        },
        {
          id: 'q9',
          text: 'Bismarck arranged an alliance with Austria-Hungary in 1879 and one with Italy in 1882.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck\'s Foreign Policy', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/32.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q12',
          text: 'In 1891 he had been elected a member of the Reichstag, but he never took his seat. He died at Friedrichsruh on the 31st of July 1898.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-bismarck',
            loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bismarck,_Otto_Eduard_Leopold_von'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/BASA-600K-1-1866-9-Otto_von_Bismarck%2C_Versailles.jpeg/1280px-BASA-600K-1-1866-9-Otto_von_Bismarck%2C_Versailles.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:BASA-600K-1-1866-9-Otto_von_Bismarck,_Versailles.jpeg',
    credit: { institution: 'Bulgarian Archives State Agency', creator: 'Anton von Werner' },
    license: { id: 'public-domain' }
  },
  bornIn: {
    ref: 'place:schonhausen',
    cites: [
      {
        source: 'britannica-1911-bismarck',
        loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '1' }
      },
      {
        source: 'lemo-biografie-otto-von-bismarck',
        loc: { section: 'Otto von Bismarck 1815-1898', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:friedrichsruh',
    cites: [
      {
        source: 'britannica-1911-bismarck',
        loc: { section: 'BISMARCK, OTTO EDUARD LEOPOLD VON', para: '16' }
      },
      {
        source: 'lemo-biografie-otto-von-bismarck',
        loc: { section: 'Otto von Bismarck 1815-1898', para: '124' }
      }
    ]
  }
})
