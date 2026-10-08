import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'great-leap-forward',
  names: [
    { text: 'Great Leap Forward', lang: 'en', role: 'primary' },
    { text: '大跃进', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1958' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '1' }
          },
          {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'Ten Years of Initially Building Socialism in All Spheres' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1960' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:peoples-republic-of-china' }
  ],
  participants: [
    {
      ref: 'person:mao-zedong',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Great Leap Forward, 1958-60', para: '4' }
        }
      ]
    },
    {
      name: 'Peng Dehuai',
      role: 'participant',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Great Leap Forward, 1958-60', para: '4' }
        }
      ]
    },
    {
      name: 'Liu Shaoqi',
      role: 'participant',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Great Leap Forward, 1958-60', para: '4' }
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
            value: { min: 14000000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Great Leap Forward, 1958-60', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
            ]
          },
          {
            value: { min: 30000000, qualifier: 'about' },
            cites: [
              {
                source: 'afe-columbia-china-1950-to-the-present',
                loc: { section: 'Land Reform, Socialized Agriculture, The Great Leap Forward' }
              }
            ],
            heldBy: [
              { kind: 'media', name: 'Education About Asia' }
            ]
          },
          {
            value: { min: 45000000, qualifier: 'over' },
            cites: [
              {
                source: 'hoover-2025-goodfellows-dikotter-caveman-marxists',
                loc: { section: 'Caveman Marxists' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Frank Dikötter' }
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
          text: 'In 1958 the CCP launched the Great Leap Forward campaign under the new "General Line for Socialist Construction." The Great Leap Forward was aimed at accomplishing the economic and technical development of the country at a vastly faster pace and with greater results.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        },
        {
          id: 'q2',
          text: 'The Great Leap Forward was an economic failure.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'Although the party leaders appeared generally satisfied with the accomplishments of the First Five-Year Plan, they--Mao and his fellow radicals in particular-- believed that more could be achieved in the Second Five-Year Plan (1958-62) if the people could be ideologically aroused and if domestic resources could be utilized more efficiently for the simultaneous development of industry and agriculture.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The Great Leap Forward centered on a new socioeconomic and political system created in the countryside and in a few urban areas--the people\'s communes. By the fall of 1958, some 750,000 agricultural producers\' cooperatives, now designated as production brigades, had been amalgamated into about 23,500 communes, each averaging 5,000 households, or 22,000 people.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        },
        {
          id: 'q5',
          text: 'Each commune was planned as a self-supporting community for agriculture, small-scale local industry (for example, the famous backyard pig-iron furnaces), schooling, marketing, administration, and local security (maintained by militia organizations).',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        },
        {
          id: 'q6',
          text: 'In 1958 industrial output did in fact "leap" by 55 percent, and the agricultural sector gathered in a good harvest.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/88.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'Widespread famine occurred, especially in rural areas, according to 1982 census figures, and the death rate climbed from 1.2 percent in 1958 to 1.5 percent in 1959, 2.5 percent in 1960, and then dropped back to 1.4 percent in 1961. From 1958 to 1961, over 14 million people apparently died of starvation, and the number of reported births was about 23 million fewer than under normal conditions.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/88.htm' }
        },
        {
          id: 'q8',
          text: 'From 1960-1962, an estimated thirty million people died of starvation in China, more than any other single famine in recorded human history.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-china-1950-to-the-present',
            loc: { section: 'Land Reform, Socialized Agriculture, The Great Leap Forward' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://afe.easia.columbia.edu/tps/1950_cn.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'In early 1959, amid signs of rising popular restiveness, the CCP admitted that the favorable production report for 1958 had been exaggerated. Among the Great Leap Forward\'s economic consequences were a shortage of food (in which natural disasters also played a part); shortages of raw materials for industry; overproduction of poor-quality goods; deterioration of industrial plants through mismanagement; and exhaustion and demoralization of the peasantry and of the intellectuals, not to mention the party and government cadres at all levels.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        },
        {
          id: 'q10',
          text: 'Moreover, Mao\'s Great Leap Forward policy came under open criticism at a party conference at Lushan, Jiangxi Province.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Soil_blast_furnaces.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Soil_blast_furnaces.jpg',
    credit: { institution: 'Selected Works of Chinese Photographic Art', creator: 'Zhang Qingyun' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'ccp-2011-zhongguo-gongchandang-lishi-di-er-juan', perspective: 'chinese' },
    { source: 'yang-2008-mubei', perspective: 'chinese' },
    { source: 'lin-2008-wutuobang-yundong', perspective: 'chinese' }
  ]
})
