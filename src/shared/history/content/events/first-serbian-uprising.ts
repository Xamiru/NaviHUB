import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-serbian-uprising',
  names: [
    { text: 'First Serbian Uprising', lang: 'en', role: 'primary' },
    { text: 'Први српски устанак', lang: 'sr', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1804-01' },
        cites: [
          { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1813-09-20' },
        cites: [
          { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '3' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:belgrade',
      cites: [
        { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
        { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '2' } }
      ]
    },
    {
      ref: 'place:orasac',
      cites: [
        { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
        { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '2' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-adrianople',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:karageorge',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
        { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '2' } }
      ]
    },
    {
      name: 'Milosh Obrenovich',
      role: 'participant',
      cites: [
        { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Sin%C4%91eli%C4%87_at_%C4%8Cegar_Hill.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sin%C4%91eli%C4%87_at_%C4%8Cegar_Hill.jpg',
    credit: { institution: 'Museum of Matica Srpska', creator: 'Pavle Čortanović' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The disorganization and anarchy in the Turkish empire at the beginning of the 19th century gave the Serbs their opportunity, and the people rose en masse against its oppressors (January 1804).',
          lang: 'en',
          cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
          }
        },
        {
          id: 'q2',
          text: 'From 1804 till the autumn of 1813 the Serbs governed themselves as an independent nation.',
          lang: 'en',
          cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Under his command the Serbs quickly succeeded in breaking the power of the Dahias, as the four chieftains of the Janissaries of Belgrade were called, who, having rebelled against the sultan, took possession of Servia, became its political and military masters, and exploited the country as their own private property.',
          lang: 'en',
          cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
          }
        },
        {
          id: 'q4',
          text: 'Under his command the Servians speedily cleared their country not only of the janissaries disloyal to the Sultan, but of all other Turks, who withdrew from the open country to the fortified places.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        },
        {
          id: 'q5',
          text: 'While the hattisherif granting the rights demanded by the Servians was on the way to Servia, Karageorge attacked the Turks in Belgrade and Shabats, captured the towns first and then also the citadels, and allowed the Turkish population of Belgrade to be massacred.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        },
        {
          id: 'q6',
          text: 'On the advice of the Russians, who were just going to war with Turkey, the Serbs refused that offer, preferring to fight against the Turks as Russian allies.',
          lang: 'en',
          cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Not quite two years later Milosh began the second insurrection of the Serbs against the Turks (on Palm Sunday 1815, near the little wooden church of Takovo).',
          lang: 'en',
          cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
          }
        },
        {
          id: 'q8',
          text: 'He was successful not only in the field but in his diplomacy, and by 1817 Servia had regained autonomy under the suzerainty of the sultan.',
          lang: 'en',
          cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
          }
        },
        {
          id: 'q9',
          text: 'The Servians consider him one of their greatest men.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
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
            value: { d: '1804-02' },
            cites: [
              { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
              {
                source: 'britannica-1911-karageorge',
                loc: { section: 'KARAGEORGE', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'A national assembly met in February 1804 in the village of Orashats, and elected George Petrovich—more generally known under the name of “Tsrni Gyorgye” or “Karageorge” (q.v.)—both meaning “Black George”—as commander-in-chief of all the nation’s armed forces and the leader of the nation (Vozhd naroda).',
        lang: 'en',
        cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1807' },
            cites: [
              { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1807 the sultan offered to grant the Serbs self-government, and to acknowledge Karageorge as the chief of the nation with the title of prince.',
        lang: 'en',
        cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1808-12-26' },
            cites: [
              {
                source: 'britannica-1911-karageorge',
                loc: { section: 'KARAGEORGE', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The national assembly proclaimed Karageorge the hereditary chief and gospodar of the Servians (Dec. 26, 1808), he on his part promising under oath to govern the country “through and by the national council” (senate).',
        lang: 'en',
        cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1812' },
            cites: [
              { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'But when in 1812 Russia, attacked by Napoleon, had in great haste to conclude at Bucharest a treaty of peace with Turkey, and omitted to make sufficient provision for the security of her allies the Serbs, the Turkish army invaded and reconquered Servia, occupying all its fortresses.',
        lang: 'en',
        cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1813-09-20' },
            cites: [
              {
                source: 'britannica-1911-karageorge',
                loc: { section: 'KARAGEORGE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'After a few inefficient attempts to stem the invasion, Karageorge gave up the struggle, and with most of the voyvodes and chiefs of the nation left the country, and crossed to Hungary as a refugee (Sept. 20, 1813).',
        lang: 'en',
        cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
        }
      }
    }
  ],
  furtherReading: [
    {
      source: 'nikitin-1980-pervoe-serbskoe-vosstanie-i-rossiya',
      perspective: 'russian-soviet'
    }
  ]
})
