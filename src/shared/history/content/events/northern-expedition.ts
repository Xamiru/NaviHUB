import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'northern-expedition',
  names: [
    { text: 'Northern Expedition', lang: 'en', role: 'primary' },
    { text: '北伐', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1926-07-19' },
        cites: [
          { source: 'lemo-chronik-1926', loc: { section: 'Chronik 1926', para: '142' } }
        ]
      },
      {
        value: { d: '1925' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1928-06-08' },
        cites: [
          { source: 'lemo-chronik-1928', loc: { section: 'Chronik 1928', para: '99' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:guangzhou',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '5' }
        }
      ]
    },
    {
      ref: 'place:shanghai',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '6' }
        }
      ]
    },
    {
      ref: 'place:nanjing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '6' }
        }
      ]
    },
    {
      ref: 'place:beijing',
      cites: [
        { source: 'lemo-chronik-1928', loc: { section: 'Chronik 1928', para: '100' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:chiang-kai-shek',
      role: 'commander',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'During the summer of 1925, Chiang, as commander-in-chief of the National Revolutionary Army, set out on the long-delayed Northern Expedition against the northern warlords. Within nine months, half of China had been conquered.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q2',
          text: 'The Soviet Union, still hoping to prevent a split between Chiang and the CCP, ordered Communist underground activities to facilitate the Northern Expedition, which was finally launched by Chiang from Guangzhou in July 1926.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q3',
          text: 'Truppen der chinesischen Regierung unter Chiang Kai-shek (1887-1975) beginnen zur Einigung Chinas einen Feldzug nach Norden.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1926', loc: { section: 'Chronik 1926', para: '143' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1926.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'In early 1927 the Guomindang-CCP rivalry led to a split in the revolutionary ranks.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q5',
          text: 'But Chiang, whose Northern Expedition was proving successful, set his forces to destroying the Shanghai CCP apparatus and established an anti-Communist government at Nanjing in April 1927.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q6',
          text: 'Although Stalin\'s plan was finally accepted, it came to naught when in 1927 the Guomindang leader Chiang Kai-shek ordered the Chinese communists massacred and Soviet advisers expelled.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'By 1928 all of China was at least nominally under Chiang\'s control, and the Nanjing government received prompt international recognition as the sole legitimate government of China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1927-04' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'Nationalism and Communism', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In China wird das Bündnis zwischen der Nationalchinesischen Volkspartei (Kuomintang) und der Kommunistischen Partei Chinas (KPCh) offiziell aufgekündigt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1927', loc: { section: 'Chronik 1927', para: '100' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1927.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1928-06-08' },
            cites: [
              { source: 'lemo-chronik-1928', loc: { section: 'Chronik 1928', para: '99' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Die nationalrevolutionären Kuomintang-Truppen unter General Chiang Kai-shek (1887-1975) erobern Peking.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1928', loc: { section: 'Chronik 1928', para: '100' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1928.html'
        }
      }
    }
  ]
})
