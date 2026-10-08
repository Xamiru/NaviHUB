import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nanjing-massacre',
  names: [
    { text: 'Nanjing Massacre', lang: 'en', role: 'primary' },
    { text: '南京大屠杀', lang: 'zh', role: 'native' },
    {
      text: 'Rape of Nanjing',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'askew-2002-nanjing-incident-recent-research',
          loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '3' }
        }
      ]
    },
    {
      text: 'Nanjing Incident',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'state', name: 'Japan (Ministry of Foreign Affairs)' },
        { kind: 'scholar', name: 'David Askew' }
      ],
      cites: [
        { source: 'mofa-japan-history-issues-qa', loc: { section: 'Q6' } },
        {
          source: 'askew-2002-nanjing-incident-recent-research',
          loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '60' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1937-12-13' },
        cites: [
          {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '3' }
          },
          {
            source: 'govcn-2024-12-13-nanjing-massacre-commemoration',
            loc: {
              section: 'China holds national commemoration for Nanjing Massacre victims',
              para: '6'
            }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:nanjing',
      cites: [
        {
          source: 'askew-2002-nanjing-incident-recent-research',
          loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:second-sino-japanese-war' }
  ],
  polities: [
    { ref: 'polity:empire-of-japan' },
    { ref: 'polity:republic-of-china' }
  ],
  participants: [
    {
      name: 'Japanese military',
      role: 'perpetrator',
      cites: [
        {
          source: 'askew-2002-nanjing-incident-recent-research',
          loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '3' }
        }
      ]
    },
    {
      name: 'John Rabe',
      role: 'witness',
      cites: [
        {
          source: 'askew-2002-nanjing-incident-recent-research',
          loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '45' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 300000, qualifier: 'about' },
            cites: [
              {
                source: 'govcn-2024-12-13-nanjing-massacre-commemoration',
                loc: {
                  section: 'China holds national commemoration for Nanjing Massacre victims',
                  para: '6'
                }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'People’s Republic of China' }
            ]
          },
          {
            value: { min: 100000, max: 200000 },
            cites: [
              {
                source: 'askew-2002-nanjing-incident-recent-research',
                loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '24' }
              }
            ],
            heldBy: [
              { kind: 'school', name: 'Great Massacre School (daigyakusatsu-ha)' }
            ]
          },
          {
            value: { min: 13000, max: 42000 },
            cites: [
              {
                source: 'askew-2002-nanjing-incident-recent-research',
                loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '21' }
              }
            ],
            heldBy: [
              { kind: 'school', name: 'Middle-of-the-Road School (chūkan-ha)' }
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
          id: 'q5',
          text: 'The Nanjing Incident refers to the killing and raping of large numbers of Chinese over a relatively short period of time by the Japanese military after the city of Nanjing was captured on 13 December 1937.',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        },
        {
          id: 'q1',
          text: 'The Nanjing (or Nanking) Incident (also known as the Rape of Nanjing, the Nanjing Massacre and the Nanjing Atrocities) remains a highly controversial episode in Sino-Japanese relations.',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q2',
          text: 'Nanjing forms one of the core historical issues on which Japan and China cannot agree, and continues to bedevil the bilateral relationship.',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        },
        {
          id: 'q3',
          text: 'Sadly for the historian, however, the Nanjing Incident is not only an important episode in Sino-Japanese relations, but is also emerging as a fundamental keystone in the construction of the modern Chinese national identity.',
          lang: 'en',
          cite: {
            source: 'askew-2002-nanjing-incident-recent-research',
            loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
          }
        },
        {
          id: 'q4',
          text: 'NANJING, Dec. 13 -- In a solemn display of remembrance, the people of Nanjing observed a moment of silence as sirens resonated throughout the city on Friday, marking China\'s national memorial ceremony to mourn the 300,000 victims of the Nanjing Massacre.',
          lang: 'en',
          cite: {
            source: 'govcn-2024-12-13-nanjing-massacre-commemoration',
            loc: {
              section: 'China holds national commemoration for Nanjing Massacre victims',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://english.www.gov.cn/news/202412/13/content_WS675bd237c6d0868f4e8edeb6.html'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'sun-2005-chengqing-lishi', perspective: 'chinese' },
    { source: 'hata-2007-nankin-jiken', perspective: 'japanese' },
    { source: 'kasahara-2017-nitchu-senso-zenshi', perspective: 'japanese' }
  ]
})
