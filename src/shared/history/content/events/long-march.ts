import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'long-march',
  names: [
    { text: 'Long March', lang: 'en', role: 'primary' },
    { text: '长征', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1934-10' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '15' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1935-10' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '15' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:ruijin',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '14' }
        }
      ]
    },
    {
      ref: 'place:yanan',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '15' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mao-zedong',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '15' }
        }
      ]
    },
    {
      ref: 'person:chiang-kai-shek',
      role: 'commander',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '15' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 100000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'Nationalism and Communism', para: '15' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In the early 1930s, amid continued Political Bureau opposition to his military and agrarian policies and the deadly annihilation campaigns being waged against the Red Army by Chiang Kai-shek\'s forces, Mao\'s control of the Chinese Communist movement increased.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The epic Long March of his Red Army and its supporters, which began in October 1934, would ensure his place in history.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q3',
          text: 'Forced to evacuate their camps and homes, Communist soldiers and government and party leaders and functionaries numbering about 100,000 (including only 35 women, the spouses of high leaders) set out on a circuitous retreat of some 12,500 kilometers through 11 provinces, 18 mountain ranges, and 24 rivers in southwest and northwest China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'During the Long March, Mao finally gained unchallenged command of the CCP, ousting his rivals and reasserting guerrilla strategy.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q5',
          text: 'As a final destination, he selected southern Shaanxi Province, where some 8,000 survivors of the original group from Jiangxi Province (joined by some 22,000 from other areas) arrived in October 1935.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q6',
          text: 'The Communists set up their headquarters at Yan\'an, where the movement would grow rapidly for the next ten years.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    }
  ]
})
