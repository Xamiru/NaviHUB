import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'third-anglo-burmese-war',
  names: [
    { text: 'Third Anglo-Burmese War', lang: 'en', role: 'primary' },
    {
      text: 'Third Burma War',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '0' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1885-11-17' },
        cites: [
          { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '28' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1885-11-28' },
        cites: [
          { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '36' } }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:mandalay',
      cites: [
        { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '36' } }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:british-raj' }
  ],
  polities: [
    { ref: 'polity:british-empire' },
    { ref: 'polity:british-raj' }
  ],
  sides: [
    {
      key: 'britain',
      name: 'British',
      polity: 'polity:united-kingdom',
      cites: [
        { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '17' } }
      ]
    },
    {
      key: 'burma',
      name: 'Burmese',
      cites: [
        { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '17' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Thibaw Min',
      role: 'head-of-state',
      side: 'burma',
      cites: [
        { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '8' } }
      ]
    },
    {
      name: 'Major-General Sir Harry Prendergast',
      role: 'commander',
      side: 'britain',
      cites: [
        { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '22' } }
      ]
    },
    {
      name: 'Lord Dufferin',
      role: 'head-of-government',
      side: 'britain',
      cites: [
        { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '42' } }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 10000, qualifier: 'nearly' },
            cites: [
              {
                source: 'nam-third-burma-war',
                loc: { section: 'Third Burma War', para: '23' }
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
          text: 'Following a series of fractious disputes, the British invaded Upper Burma in late 1885 and overthrew its king. While the country was quickly annexed to British India, a guerrilla war ensued that rumbled on for the best part of a decade.',
          lang: 'en',
          cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/third-burma-war'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'During the 1880s, the British grew increasingly concerned about Burmese military and trading links with the French.',
          lang: 'en',
          cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/third-burma-war'
          }
        },
        {
          id: 'q3',
          text: 'In 1885, the Burmese imposed severe fines on the Bombay and Burma Trading Corporation (BBTC) for under-reporting its teak logging and not paying its Burmese employees fully.',
          lang: 'en',
          cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/third-burma-war'
          }
        },
        {
          id: 'q4',
          text: 'The British demanded that any legal action or fines against the BBTC be suspended and that Burma accept a new British Resident in Mandalay.',
          lang: 'en',
          cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '18' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/third-burma-war'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Using around 50 low-draft steamers, many of which towed barges, they advanced at such a speed that the Burmese had little chance to organise effective resistance.',
          lang: 'en',
          cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '27' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/third-burma-war'
          }
        },
        {
          id: 'q6',
          text: 'Burmese military resistance was somewhat half-hearted.',
          lang: 'en',
          cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '33' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/third-burma-war'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Thibaw and his family were exiled to Ratnagiri, near Bombay (Mumbai) in India. The king described those who had deposed him as the ‘bull-faced, earth-swallowing English’.',
          lang: 'en',
          cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '41' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/third-burma-war'
          }
        },
        {
          id: 'q8',
          text: 'When it became clear that the British had no intention of installing a new king, but instead were going to annex Upper Burma, a rebellion began. Various Burmese groups, including irregular tribesmen and soldiers of the former Burmese army, launched an insurrection that rumbled on until the mid-1890s.',
          lang: 'en',
          cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '47' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/third-burma-war'
          }
        },
        {
          id: 'q9',
          text: 'The British called the rebels \'dacoits\', a local term for bandits. Although some criminals took advantage of the unrest to loot and pillage villages, the great majority of the insurgents were motivated by anti-colonial sentiment.',
          lang: 'en',
          cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '48' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/third-burma-war'
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
            value: { d: '1885-10-22' },
            cites: [
              {
                source: 'nam-third-burma-war',
                loc: { section: 'Third Burma War', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'When they refused, the British issued an ultimatum on 22 October 1885.',
        lang: 'en',
        cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '17' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/third-burma-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-11-17' },
            cites: [
              {
                source: 'nam-third-burma-war',
                loc: { section: 'Third Burma War', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 17 November 1885, the river fleet neutralised shore batteries at Minhla.',
        lang: 'en',
        cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '28' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/third-burma-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-11-26' },
            cites: [
              {
                source: 'nam-third-burma-war',
                loc: { section: 'Third Burma War', para: '36' }
              },
              {
                source: 'nam-third-burma-war',
                loc: { section: 'Third Burma War', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'After it threatened to bombard Ava (Inwa), the former royal capital, Thibaw ordered his troops to surrender on 26 November. Two days later, Mandalay was secured by British soldiers.',
        lang: 'en',
        cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '36' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/third-burma-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1886-01-01' },
            cites: [
              {
                source: 'nam-third-burma-war',
                loc: { section: 'Third Burma War', para: '42' }
              },
              { source: 'lemo-chronik-1886', loc: { section: 'Chronik 1886', para: '2' } },
              { source: 'lemo-chronik-1886', loc: { section: 'Chronik 1886', para: '3' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On 1 January 1886, Lord Dufferin, the Viceroy of India, announced that Upper Burma was to be annexed by the British.',
        lang: 'en',
        cite: { source: 'nam-third-burma-war', loc: { section: 'Third Burma War', para: '42' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/third-burma-war' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/King_thibaw_queen_daughter1885.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:King_thibaw_queen_daughter1885.jpg',
    credit: { institution: 'British Library' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'htin-aung-1965-the-stricken-peacock', perspective: 'southeast-asian' },
    { source: 'thant-myint-u-2001-the-making-of-modern-burma', perspective: 'southeast-asian' }
  ]
})
