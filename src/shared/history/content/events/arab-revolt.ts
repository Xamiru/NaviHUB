import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'arab-revolt',
  names: [
    { text: 'Arab Revolt', lang: 'en', role: 'primary' },
    { text: 'الثورة العربية الكبرى', lang: 'ar', role: 'native' },
    {
      text: 'Great Arab Revolt',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-tell-husayn-mcmahon-correspondence',
          loc: { section: 'Husayn-McMahon Correspondence' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1916-06-05' },
        cites: [
          {
            source: 'eo1418-el-bakri-arab-revolt',
            loc: { section: 'Course of the Revolt', para: '1' }
          },
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'World War I', para: '5' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Alia El Bakri' },
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1916-07' },
        cites: [
          {
            source: 'eo1418-tell-husayn-mcmahon-correspondence',
            loc: { section: 'Husayn-McMahon Correspondence' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Tariq Tell' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1918-10' },
        cites: [
          {
            source: 'eo1418-tell-husayn-mcmahon-correspondence',
            loc: { section: 'Husayn-McMahon Correspondence' }
          },
          {
            source: 'eo1418-el-bakri-arab-revolt',
            loc: { section: 'Course of the Revolt', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:mecca',
      cites: [
        {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'arab',
      name: 'Arab rebels',
      cites: [
        {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '2' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'Ottoman troops',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:hussein-bin-ali',
      role: 'leader',
      side: 'arab',
      cites: [
        {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Revolutions and Rebellions: Arab Revolt (Ottoman Empire/Middle East)' }
        }
      ]
    },
    {
      name: 'Faysal',
      role: 'commander',
      side: 'arab',
      cites: [
        {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '1' }
        }
      ]
    },
    {
      name: '‘Abdullah ibn Husayn',
      role: 'commander',
      side: 'arab',
      cites: [
        {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '2' }
        }
      ]
    },
    {
      ref: 'person:t-e-lawrence',
      role: 'participant',
      side: 'arab',
      cites: [
        {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '3' }
        }
      ]
    },
    {
      name: 'Sir Arthur Henry McMahon',
      role: 'diplomat',
      cites: [
        { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Introduction', para: '4' } }
      ]
    },
    {
      name: 'Ömer Fahreddin Pasha',
      role: 'commander',
      side: 'ottoman',
      cites: [
        {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:first-world-war', rel: 'related' },
    { ref: 'event:sykes-picot-agreement', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'This article provides an overview of the 1916-1918 Arab Revolt against the Ottoman government during World War I, led by Sharif Husayn bin ‘Ali of Mecca in conjunction with British support. The main aim of the revolt was to establish an independent Arab state with Husayn as king.',
          lang: 'en',
          cite: {
            source: 'eo1418-el-bakri-arab-revolt',
            loc: { section: 'Revolutions and Rebellions: Arab Revolt (Ottoman Empire/Middle East)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'Whatever his real view of Arabism, Husayn’s decision to revolt against Ottoman rule was rooted in the material realities of the wartime Hejaz.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-ibn-ali',
            loc: { section: 'Husayn and the Great Arab Revolt', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-ibn-ali-king-of-hejaz/'
          }
        },
        {
          id: 'q3',
          text: 'The Husayn-McMahon Correspondence refers to the ten letters exchanged between Husayn ibn Ali, King of Hejaz (-1931) Sharif of Mecca and the newly appointed British High Commissioner in Egypt, Sir Henry McMahon (1862-1949), from July 1915 to March 1916.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-mcmahon-correspondence',
            loc: { section: 'Overview', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-mcmahon-correspondence/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Contrary to the terms discussed by Husayn and McMahon, Greater Syria was not given to the Arabs. Instead, it became a French mandate, while Britain was given mandates for Mesopotamia (Iraq) and Palestine.',
          lang: 'en',
          cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Aftermath', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'The Arab Revolt came to serve as a key event referenced repeatedly in Arab nationalist rhetoric after World War I.',
          lang: 'en',
          cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Legacy', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
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
            value: { d: '1915-10-25' },
            cites: [
              {
                source: 'eo1418-tell-husayn-mcmahon-correspondence',
                loc: { section: 'Negotiating an Anglo-Arab Alliance during WWI', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Tariq Tell' }
            ]
          },
          {
            value: { d: '1915-10-24' },
            cites: [
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'World War I', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'The contradictions that resulted from this strategy appear most clearly in the famous letter dispatched to Husayn on 25 October 1915.',
        lang: 'en',
        cite: {
          source: 'eo1418-tell-husayn-mcmahon-correspondence',
          loc: { section: 'Negotiating an Anglo-Arab Alliance during WWI', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/husayn-mcmahon-correspondence/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916-06-05' },
            cites: [
              {
                source: 'eo1418-el-bakri-arab-revolt',
                loc: { section: 'Course of the Revolt', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On 5 June 1916 at a camp in Medina of around 1,500 recruits, Husayn’s sons ‘Ali bin Husayn (1879-1935) and Faysal declared in the Sharif’s name their independence from Turkish rule.',
        lang: 'en',
        cite: {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916-06-10' },
            cites: [
              {
                source: 'eo1418-el-bakri-arab-revolt',
                loc: { section: 'Course of the Revolt', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The revolt was then officially announced on 10 June 1916 in Mecca with Husayn’s symbolic rifle shot, followed by attacks on the city’s Ottoman units and its water supply.',
        lang: 'en',
        cite: {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917-07' },
            cites: [
              {
                source: 'eo1418-tell-lawrence',
                loc: { section: 'Into Battle: The Arab Campaign', para: '2' }
              },
              {
                source: 'eo1418-tell-husayn-ibn-ali',
                loc: { section: 'Husayn and the Great Arab Revolt', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In 1917, Lawrence and Faysal coordinated a victorious attack on the port of ‘Aqabah, although they did encounter strong and sometimes successful resistance from residents in the region, who remained firmly on the side of the Ottomans.',
        lang: 'en',
        cite: {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-10' },
            cites: [
              {
                source: 'eo1418-el-bakri-arab-revolt',
                loc: { section: 'Course of the Revolt', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Rebel forces finally captured Damascus at the beginning of October 1918, and on 30 October 1918, the Armistice of Mudros was signed, officially ending hostilities between the Ottoman Empire and the Allies.',
        lang: 'en',
        cite: {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Course of the Revolt', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/T_E_LAWRENCE_AND_THE_ARAB_REVOLT_1916_-_1918_-_IWM_Q_58817.jpg/1280px-T_E_LAWRENCE_AND_THE_ARAB_REVOLT_1916_-_1918_-_IWM_Q_58817.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:T_E_LAWRENCE_AND_THE_ARAB_REVOLT_1916_-_1918_-_IWM_Q_58817.jpg',
    credit: { institution: 'Imperial War Museums', creator: 'S. F. Newcombe' },
    license: { id: 'public-domain' }
  }
})
