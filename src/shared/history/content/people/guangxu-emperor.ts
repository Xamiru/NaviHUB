import { definePerson } from '../../schema'

export default definePerson({
  id: 'guangxu-emperor',
  names: [
    { text: 'Guangxu Emperor', lang: 'en', role: 'primary' },
    { text: '光緒帝', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  regions: ['east-asia'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Qing emperor',
      start: {
        alts: [
          {
            value: { d: '1875' },
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
            value: { d: '1908' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '1' }
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
          text: 'Supported by ultraconservatives and with the tacit support of the political opportunist Yuan Shikai (1859-1916), Empress Dowager Ci Xi engineered a coup d\'etat on September 21, 1898, forcing the young reform-minded Guangxu into seclusion. Ci Xi took over the government as regent.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        }
      ]
    }
  ]
})
