import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-conquest-of-madagascar',
  names: [
    { text: 'French conquest of Madagascar (1895)', lang: 'en', role: 'primary' },
    { text: 'Expédition de Madagascar', lang: 'fr', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1895' },
        cites: [
          {
            source: 'loc-madagascar-country-study-1994',
            loc: { section: 'Colonial Era, 1894-1960', para: '1' }
          },
          { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1895-09-30' },
        cites: [
          { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:antananarivo',
      cites: [
        { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
        {
          source: 'loc-madagascar-country-study-1994',
          loc: { section: 'Colonial Era, 1894-1960', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:french-third-republic' }
  ],
  participants: [
    {
      name: 'General Duchesne',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } }
      ]
    },
    {
      name: 'Queen Ranavalona III',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
        {
          source: 'loc-madagascar-country-study-1994',
          loc: { section: 'Colonial Era, 1894-1960', para: '1' }
        }
      ]
    },
    {
      name: 'Rainilaiarivony',
      role: 'head-of-government',
      cites: [
        { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
        {
          source: 'loc-madagascar-country-study-1994',
          loc: { section: 'Precolonial Era, Prior to 1894', para: '9' }
        }
      ]
    },
    {
      name: 'General Gallieni',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '80' } },
        { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '81' } }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Madagascar_Expedition_-_Petit_Journal.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Madagascar_Expedition_-_Petit_Journal.jpeg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Henri Meyer' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The French largely ended the attempts of Malagasy rulers to stymie foreign influence by declaring a protectorate over the entire island in 1894.',
          lang: 'en',
          cite: {
            source: 'loc-madagascar-country-study-1994',
            loc: { section: 'Colonial Era, 1894-1960', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/madagascar/3.htm' }
        },
        {
          id: 'q2',
          text: 'But Queen Ranavalona III refused to recognize the 1894 effort to subordinate her kingdom to French rule.',
          lang: 'en',
          cite: {
            source: 'loc-madagascar-country-study-1994',
            loc: { section: 'Colonial Era, 1894-1960', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/madagascar/3.htm' }
        },
        {
          id: 'q3',
          text: 'As a result, a French expeditionary force occupied Antananarivo in September 1895.',
          lang: 'en',
          cite: {
            source: 'loc-madagascar-country-study-1994',
            loc: { section: 'Colonial Era, 1894-1960', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/madagascar/3.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'To avoid giving either the French or the British a pretext for intervention, Rainilaiarivony emphasized modernization of the society and tried to curry British favor without giving offense to the French.',
          lang: 'en',
          cite: {
            source: 'loc-madagascar-country-study-1994',
            loc: { section: 'Precolonial Era, Prior to 1894', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/madagascar/2.htm' }
        },
        {
          id: 'q5',
          text: 'The word “protectorate” was carefully excluded from the treaty, although doubtless the French envoys intended that this should be its practical issue.',
          lang: 'en',
          cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
          }
        },
        {
          id: 'q6',
          text: 'Although the British government, in return for concessions in Zanzibar, had consented, in 1890, to recognize a French protectorate over Madagascar, the Malagasy prime minister, Ràinilaiàrivòny, was not disposed to give any advantage to France and continued to arm and train, by the help of British officers, a large body of native soldiers.',
          lang: 'en',
          cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'Owing to the necessity of making a road for the passage of artillery and military stores, many months were spent on the march into the interior, and there was considerable loss of life by fever and other disease among the invading troops.',
          lang: 'en',
          cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The result was that the protectorate of France was re-established in the central provinces, but the queen was allowed to retain her position.',
          lang: 'en',
          cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '80' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
          }
        },
        {
          id: 'q9',
          text: 'A wave of antiforeign, anti-Christian rioting ensued.',
          lang: 'en',
          cite: {
            source: 'loc-madagascar-country-study-1994',
            loc: { section: 'Colonial Era, 1894-1960', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/madagascar/3.htm' }
        },
        {
          id: 'q10',
          text: 'In 1896 France declared Madagascar a French colony and deported the queen and the prime minister--first to Reunion, then to Algeria.',
          lang: 'en',
          cite: {
            source: 'loc-madagascar-country-study-1994',
            loc: { section: 'Colonial Era, 1894-1960', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/madagascar/3.htm' }
        },
        {
          id: 'q11',
          text: 'Since the French occupation the Malagasy have conformed pretty readily to the new order of things, although many of the most intelligent Hòva deeply regret that their country did not retain its independence.',
          lang: 'en',
          cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '81' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
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
            value: { d: '1883-05' },
            cites: [
              {
                source: 'britannica-1911-madagascar',
                loc: { section: 'MADAGASCAR', para: '79' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In May 1883 an ultimatum was sent to the Malagasy queen, requiring immediate compliance with the demands of France; and as these were refused by the Hòva government, Tamatàve was bombarded by a French squadron and then occupied by the marines.',
        lang: 'en',
        cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-12-17' },
            cites: [
              {
                source: 'britannica-1911-madagascar',
                loc: { section: 'MADAGASCAR', para: '79' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'By a treaty signed on the 17th of December it was agreed that the foreign relations of Madagascar should be directed by France; that a resident should live at the capital, with a small guard of French soldiers; and that the Bay of Diégo-Suarez, together with surrounding territory, should be ceded to France.',
        lang: 'en',
        cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1894' },
            cites: [
              {
                source: 'britannica-1911-madagascar',
                loc: { section: 'MADAGASCAR', para: '79' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'This state of tension and irritation could not last, and at length, towards the close of 1894, the French government sent an ultimatum to the Malagasy sovereign, demanding such powers as would have made French authority supreme in the island.',
        lang: 'en',
        cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1895' },
            cites: [
              {
                source: 'britannica-1911-madagascar',
                loc: { section: 'MADAGASCAR', para: '79' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'As soon as these had left the island, the chief ports were occupied by French troops, and an expeditionary force under General Duchesne was afterwards landed on the north-west coast at Mòjangà—commonly, but incorrectly, written Majunga—with the object of breaking the Hòva authority.',
        lang: 'en',
        cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1895-09-30' },
            cites: [
              {
                source: 'britannica-1911-madagascar',
                loc: { section: 'MADAGASCAR', para: '79' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'But no effectual resistance was made by the Malagasy, and at length, on the 30th of September 1895, the French forces appeared on the heights north and east of Antanànarìvo, bombarded the city, which surrendered in the afternoon, and on the evening of the same day the French entered the capital.',
        lang: 'en',
        cite: { source: 'britannica-1911-madagascar', loc: { section: 'MADAGASCAR', para: '79' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Madagascar'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'poirier-1902-conquete-de-madagascar', perspective: 'european' }
  ]
})
