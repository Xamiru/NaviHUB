import { definePerson } from '../../schema'

export default definePerson({
  id: 'mao-zedong',
  names: [
    { text: 'Mao Zedong', lang: 'en', role: 'primary' },
    { text: '毛泽东', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1893' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '7' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1976' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['revolutionary', 'politician'],
  offices: [
    {
      title: 'chairman of the Chinese Soviet Republic',
      start: {
        alts: [
          {
            value: { d: '1931' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'Nationalism and Communism', para: '14' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '14' }
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
          text: 'The insurrection was led by Mao Zedong (1893-1976), who would later become chairman of the CCP and head of state of the People\'s Republic of China. Mao was of peasant origins and was one of the founders of the CCP.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'Mao Zedong, who had become a Marxist at the time of the emergence of the May Fourth Movement (he was working as a librarian at Beijing University), had boundless faith in the revolutionary potential of the peasantry. He advocated that revolution in China focus on them rather than on the urban proletariat, as prescribed by orthodox Marxist-Leninist theoreticians.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q3',
          text: 'At Yan\'an and elsewhere in the "liberated areas," Mao was able to adapt Marxism-Leninism to Chinese conditions.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/22.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Mao\'s prestige rose steadily after the failure of the Comintern-directed urban insurrections. In late 1931 he was able to proclaim the establishment of the Chinese Soviet Republic under his chairmanship in Ruijin, Jiangxi Province.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q5',
          text: 'His teachings became the central tenets of the CCP doctrine that came to be formalized as Mao Zedong Thought.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/22.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Mao_Zedong_1950_Portrait_%283x4_cropped%29%282%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mao_Zedong_1950_Portrait_(3x4_cropped)(2).jpg',
    credit: { institution: 'Associated Press', creator: 'Chen Zhengqing' },
    license: { id: 'public-domain' }
  }
})
