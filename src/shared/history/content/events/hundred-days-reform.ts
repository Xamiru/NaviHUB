import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'hundred-days-reform',
  names: [
    { text: 'Hundred Days\' Reform', lang: 'en', role: 'primary' },
    { text: '戊戌變法', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1898-06-11' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1898-09-21' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '1' }
          },
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  participants: [
    {
      ref: 'person:guangxu-emperor',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '1' }
        }
      ]
    },
    {
      ref: 'person:kang-youwei',
      role: 'ideologue',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
        }
      ]
    },
    {
      name: 'Liang Qichao',
      role: 'ideologue',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
        }
      ]
    },
    {
      ref: 'person:cixi',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
        }
      ]
    },
    {
      name: 'Yuan Shikai',
      role: 'participant',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:boxer-uprising', rel: 'followed-by' },
    { ref: 'event:first-sino-japanese-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the 103 days from June 11 to September 21, 1898, the Qing emperor, Guangxu (1875-1908), ordered a series of reforms aimed at making sweeping social and institutional changes.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        },
        {
          id: 'q2',
          text: 'Influenced by the Japanese success with modernization, the reformers declared that China needed more than "self-strengthening" and that innovation must be accompanied by institutional and ideological change.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The imperial edicts for reform covered a broad range of subjects, including stamping out corruption and remaking, among other things, the academic and civil-service examination systems, legal system, governmental structure, defense establishment, and postal services.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        },
        {
          id: 'q4',
          text: 'All these changes were to be brought about under a de facto constitutional monarchy.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Opposition to the reform was intense among the conservative ruling elite, especially the Manchus, who, in condemning the announced reform as too radical, proposed instead a more moderate and gradualist course of change.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        },
        {
          id: 'q6',
          text: 'The Hundred Days\' Reform ended with the rescindment of the new edicts and the execution of six of the reform\'s chief advocates.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The suddenness and ambitiousness of the reform effort actually hindered its success.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Portrait_of_Kang_Youwei.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Kang_Youwei.jpg',
    credit: { creator: 'Elmer Chickering' },
    license: { id: 'public-domain' }
  }
})
