import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'mukden-incident',
  names: [
    { text: 'Mukden Incident', lang: 'en', role: 'primary' },
    { text: '九一八事变', lang: 'zh', role: 'native' },
    {
      text: 'Manchurian Incident',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Rise of the Militarists', para: '5' }
        }
      ]
    },
    { text: '満州事変', lang: 'ja', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1931-09-18' },
        cites: [
          {
            source: 'state-dept-milestones-mukden-incident',
            loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1932' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '1' }
          },
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Rise of the Militarists', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:shenyang',
      cites: [
        {
          source: 'state-dept-milestones-mukden-incident',
          loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '5' }
        },
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Rise of the Militarists', para: '5' }
        }
      ]
    },
    {
      ref: 'place:manchuria',
      cites: [
        {
          source: 'state-dept-milestones-mukden-incident',
          loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '5' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:empire-of-japan' },
    { ref: 'polity:republic-of-china' }
  ],
  participants: [
    {
      name: 'Guandong Army',
      role: 'perpetrator',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Rise of the Militarists', para: '5' }
        }
      ]
    },
    {
      name: 'Henry Stimson',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-mukden-incident',
          loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '1' }
        }
      ]
    },
    {
      name: 'Puyi',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Anti-Japanese War', para: '1' }
        },
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Rise of the Militarists', para: '5' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:second-sino-japanese-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1931, a dispute near the Chinese city of Mukden (Shenyang) precipitated events that led to the Japanese conquest of Manchuria.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mukden-incident',
            loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/mukden-incident'
          }
        },
        {
          id: 'q2',
          text: 'Hungry for raw materials and pressed by a growing population, Japan initiated the seizure of Manchuria in September 1931 and established ex-Qing emperor Puyi as head of the puppet regime of Manchukuo in 1932.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/22.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Within a few short months, the Japanese Army had overrun the region, having encountered next to no resistance from an untrained Chinese Army, and it went about consolidating its control on the resource-rich area. The Japanese declared the area to be the new autonomous state of Manchukuo, though the new nation was in fact under the control of the local Japanese Army.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mukden-incident',
            loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/mukden-incident'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The civilian government in Tokyo was powerless to prevent these military happenings. Instead of being condemned, the Guandong Army\'s actions enjoyed popular support back home. International reactions were extremely negative, however. Japan withdrew from the League of Nations, and the United States became increasingly hostile.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Rise of the Militarists', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/32.htm' }
        },
        {
          id: 'q5',
          text: 'In response, U.S. Secretary of State Henry Stimson issued what would become known as the Stimson Doctrine, stating that the United States would not recognize any agreements between the Japanese and Chinese that limited free commercial intercourse in the region.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mukden-incident',
            loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/mukden-incident'
          }
        },
        {
          id: 'q6',
          text: 'The League of Nations, established at the end of World War I, was unable to act in the face of the Japanese defiance.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/22.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1931-09-18' },
            cites: [
              {
                source: 'state-dept-milestones-mukden-incident',
                loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On September 18, 1931, an explosion destroyed a section of railway track near the city of Mukden.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-mukden-incident',
          loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1921-1936/mukden-incident'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1932-01' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'The Rise of the Militarists', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Japanese forces attacked Shanghai in January 1932 on the pretext of Chinese resistance in Manchuria.',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Rise of the Militarists', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/32.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1932' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'The Rise of the Militarists', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Manchukuo was a Japanese puppet state headed by the last Chinese emperor, Puyi, as chief executive and later emperor.',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Rise of the Militarists', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/32.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Japanese_soldiers_near_Mukden%2C_October_1931.jpg/1280px-Japanese_soldiers_near_Mukden%2C_October_1931.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Japanese_soldiers_near_Mukden,_October_1931.jpg',
    credit: {
      institution: 'Bibliothèque nationale de France (Gallica)',
      creator: 'Agence de presse Meurisse'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'ogata-1966-manshu-jihen-to-seisaku-no-keisei-katei', perspective: 'japanese' },
    { source: 'usui-2020-manshu-jihen', perspective: 'japanese' },
    { source: 'yi-1981-jiuyiba-shibian-shi', perspective: 'chinese' }
  ]
})
