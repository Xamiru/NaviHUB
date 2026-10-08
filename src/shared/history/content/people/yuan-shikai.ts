import { definePerson } from '../../schema'

export default definePerson({
  id: 'yuan-shikai',
  names: [
    { text: 'Yuan Shikai', lang: 'en', role: 'primary' },
    { text: '袁世凱', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  died: {
    alts: [
      {
        value: { d: '1916-06' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'REPUBLICAN CHINA', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['military', 'head-of-state'],
  offices: [
    {
      title: 'provisional president of the Republic of China',
      polity: 'polity:republic-of-china',
      start: {
        alts: [
          {
            value: { d: '1912-03-10' },
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
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'The revolutionists lacked an army, and the power of Yuan Shikai began to outstrip that of parliament. Yuan revised the constitution at will and became dictatorial.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'REPUBLICAN CHINA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/20.htm' }
        },
        {
          id: 'q2',
          text: 'Yuan\'s ambitions still were not satisfied, and, by the end of 1915, it was announced that he would reestablish the monarchy. Widespread rebellions ensued, and numerous provinces declared independence.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'REPUBLICAN CHINA', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/20.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Hubert_Vos%27s_painting_of_Yuan_Shikai.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hubert_Vos%27s_painting_of_Yuan_Shikai.jpg',
    credit: { creator: 'Hubert Vos' },
    license: { id: 'public-domain' }
  }
})
