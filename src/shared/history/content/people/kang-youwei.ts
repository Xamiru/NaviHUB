import { definePerson } from '../../schema'

export default definePerson({
  id: 'kang-youwei',
  names: [
    { text: 'Kang Youwei', lang: 'en', role: 'primary' },
    { text: '康有為', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1858' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1927' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['scholar', 'activist'],
  sections: [
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q1',
          text: 'The two principal leaders, Kang Youwei (1858-1927) and Liang Qichao (1873-1929), fled abroad to found the Baohuang Hui (Protect the Emperor Society) and to work, unsuccessfully, for a constitutional monarchy in China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Portrait_of_Kang_Youwei.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Kang_Youwei.jpg',
    credit: { creator: 'Elmer Chickering' },
    license: { id: 'public-domain' }
  }
})
