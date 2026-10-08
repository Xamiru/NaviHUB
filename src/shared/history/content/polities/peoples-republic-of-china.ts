import { definePolity } from '../../schema'

export default definePolity({
  id: 'peoples-republic-of-china',
  names: [
    { text: 'People\'s Republic of China', lang: 'en', role: 'primary' },
    { text: '中华人民共和国', lang: 'zh', role: 'native', translit: 'Zhonghua Renmin Gongheguo' }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1949-10-01' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:republic-of-china',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Return to Civil War', para: '4' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 710, from: 1949.75 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Mao_Zedong_1950_Portrait_%283x4_cropped%29%282%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mao_Zedong_1950_Portrait_(3x4_cropped)(2).jpg',
    credit: { institution: 'Associated Press', creator: 'Chen Zhengqing' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On October 1, 1949, the People\'s Republic of China was formally established, with its national capital at Beijing.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/24.htm' }
        },
        {
          id: 'q2',
          text: 'The people were defined as a coalition of four social classes: the workers, the peasants, the petite bourgeoisie, and the national-capitalists.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/24.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The four classes were to be led by the CCP, as the vanguard of the working class.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/24.htm' }
        },
        {
          id: 'q4',
          text: 'The Soviet Union recognized the People\'s Republic on October 2, 1949.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/24.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q5',
          text: '"The Chinese people have stood up!" declared Mao as he announced the creation of a "people\'s democratic dictatorship."',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/24.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'ccp-2011-zhongguo-gongchandang-lishi-di-er-juan', perspective: 'chinese' },
    { source: 'amako-1999-chuka-jinmin-kyowakokushi', perspective: 'japanese' }
  ]
})
