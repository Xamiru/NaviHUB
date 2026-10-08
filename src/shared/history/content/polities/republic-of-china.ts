import { definePolity } from '../../schema'

export default definePolity({
  id: 'republic-of-china',
  names: [
    { text: 'Republic of China', lang: 'en', role: 'primary' },
    { text: '中華民國', lang: 'zh', role: 'native', translit: 'Zhonghua Minguo' }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1912-01-01' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:nanjing',
      start: {
        alts: [
          {
            value: { d: '1912-01-01' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Republican Revolution of 1911', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        }
      ]
    },
    {
      ref: 'place:nanjing',
      start: {
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
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '6' }
        }
      ]
    },
    {
      ref: 'place:taipei',
      start: {
        alts: [
          {
            value: { d: '1949-12' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'Return to Civil War', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Return to Civil War', para: '4' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:qing-empire',
      cites: [
        { source: 'state-dept-countries-china', loc: { section: 'China', para: '18' } }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 710, from: 1912.12, to: 1949.75 },
    { set: 'world', code: 713, from: 1949.94 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Yat-Sen_Sun_1866-1925_LCCN2004672775_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Yat-Sen_Sun_1866-1925_LCCN2004672775_(cropped).jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On January 1, 1912, Sun was inaugurated in Nanjing as the provisional president of the new Chinese republic.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/19.htm' }
        },
        {
          id: 'q2',
          text: 'The republic that Sun Yat-sen and his associates envisioned evolved slowly.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'REPUBLICAN CHINA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/20.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In October 1913 an intimidated parliament formally elected Yuan president of the Republic of China, and the major powers extended recognition to his government.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'REPUBLICAN CHINA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/20.htm' }
        },
        {
          id: 'q4',
          text: 'By 1928 all of China was at least nominally under Chiang\'s control, and the Nanjing government received prompt international recognition as the sole legitimate government of China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q5',
          text: 'The decade of 1928-37 was one of consolidation and accomplishment by the Guomindang.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'After Chiang Kai-shek and a few hundred thousand Nationalist troops fled from the mainland to the island of Taiwan, there remained only isolated pockets of resistance. In December 1949 Chiang proclaimed Taipei, Taiwan, the temporary capital of China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Return to Civil War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/23.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'zhang-1985-zhonghua-minguo-shigang', perspective: 'chinese' },
    { source: 'chang-1998-zhonghua-minguo-shigao', perspective: 'chinese' }
  ]
})
