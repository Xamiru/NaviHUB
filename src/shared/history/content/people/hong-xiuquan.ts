import { definePerson } from '../../schema'

export default definePerson({
  id: 'hong-xiuquan',
  names: [
    { text: 'Hong Xiuquan', lang: 'en', role: 'primary' },
    { text: '洪秀全', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1814' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1864' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['revolutionary', 'other'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Taiping rebels were led by Hong Xiuquan (1814-64), a village teacher and unsuccessful imperial examination candidate.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        },
        {
          id: 'q2',
          text: 'Hong formulated an eclectic ideology combining the ideals of preConfucian utopianism with Protestant beliefs.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        }
      ]
    }
  ]
})
