import { definePerson } from '../../schema'

export default definePerson({
  id: 'chiang-kai-shek',
  names: [
    { text: 'Chiang Kai-shek', lang: 'en', role: 'primary' },
    { text: '蔣介石', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1887' },
        cites: [
          { source: 'lemo-chronik-1926', loc: { section: 'Chronik 1926', para: '143' } },
          { source: 'lemo-chronik-1928', loc: { section: 'Chronik 1928', para: '100' } }
        ]
      },
      {
        value: { d: '1889' },
        cites: [
          { source: 'lemo-chronik-1925', loc: { section: 'Chronik 1925', para: '62' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1975' },
        cites: [
          { source: 'lemo-chronik-1926', loc: { section: 'Chronik 1926', para: '143' } },
          { source: 'lemo-chronik-1925', loc: { section: 'Chronik 1925', para: '62' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['military', 'politician'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'In March 1926, after thwarting a kidnapping attempt against him, Chiang abruptly dismissed his Soviet advisers, imposed restrictions on CCP members\' participation in the top leadership, and emerged as the preeminent Guomindang leader.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q4',
          text: 'But Chiang, whose Northern Expedition was proving successful, set his forces to destroying the Shanghai CCP apparatus and established an anti-Communist government at Nanjing in April 1927.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q3',
          text: 'After Chiang Kai-shek and a few hundred thousand Nationalist troops fled from the mainland to the island of Taiwan, there remained only isolated pockets of resistance. In December 1949 Chiang proclaimed Taipei, Taiwan, the temporary capital of China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Return to Civil War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/23.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Chiang_Kai-shek%2C_Svenska_Mission_0964.a.2007.tiff/lossy-page1-1280px-Chiang_Kai-shek%2C_Svenska_Mission_0964.a.2007.tiff.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Chiang_Kai-shek,_Svenska_Mission_0964.a.2007.tiff',
    credit: { institution: 'Museum of Ethnography, Stockholm' },
    license: { id: 'cc0' }
  }
})
