import { definePerson } from '../../schema'

export default definePerson({
  id: 'lin-zexu',
  names: [
    { text: 'Lin Zexu', lang: 'en', role: 'primary' },
    { text: '林則徐', lang: 'zh', role: 'native' },
    {
      text: 'Commissioner Lin',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'lin-zexu-1839-letter-to-queen-victoria',
          loc: { section: 'Commissioner Lin: Letter to Queen Victoria, 1839', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1785' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1850' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['politician'],
  offices: [
    {
      title: 'imperial commissioner at Guangzhou',
      start: {
        alts: [
          {
            value: { d: '1839' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Opium War, 1839-42', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Opium War, 1839-42', para: '2' }
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
          text: 'The emperor dispatched a commissioner, Lin Zexu (1785- 1850), to Guangzhou to suppress illicit opium traffic.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q2',
          text: 'Suppose the subject of another country were to come to England to trade, he would certainly be required to comply with the laws of England, then how much more does this apply to us of the celestial empire!',
          lang: 'en',
          cite: {
            source: 'lin-zexu-1839-letter-to-queen-victoria',
            loc: { section: 'Commissioner Lin: Letter to Queen Victoria, 1839', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1839lin2.asp'
          }
        },
        {
          id: 'q3',
          text: 'Our celestial empire rules over ten thousand kingdoms!',
          lang: 'en',
          cite: {
            source: 'lin-zexu-1839-letter-to-queen-victoria',
            loc: { section: 'Commissioner Lin: Letter to Queen Victoria, 1839', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1839lin2.asp'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Portrait_of_Lin_Zexu.jpeg/1280px-Portrait_of_Lin_Zexu.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Lin_Zexu.jpeg',
    credit: { institution: 'Google Arts & Culture', creator: 'Lam Qua' },
    license: { id: 'public-domain' }
  }
})
