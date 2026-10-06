import { definePerson } from '../../schema'

export default definePerson({
  id: 'menelik-ii',
  names: [
    { text: 'Menelik II', lang: 'en', role: 'primary' },
    { text: 'ምኒልክ ፪ኛ', lang: 'am', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1844' },
        cites: [
          { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '21' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1913' },
        cites: [
          { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '21' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor',
      start: {
        alts: [
          {
            value: { d: '1889' },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'Diplomacy and State Building in Imperial Ethiopia', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1913' },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'The Reign of Menelik II, 1889-1913' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Diplomacy and State Building in Imperial Ethiopia', para: '1' }
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
          text: 'Menelik II, who succeeded Yohannis in 1889, failed to find a peaceful solution to Italy\'s encroachments.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Diplomacy and State Building in Imperial Ethiopia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/135.htm' }
        },
        {
          id: 'q2',
          text: 'By 1900 Menelik had succeeded in establishing control over much of present-day Ethiopia and had, in part at least, gained recognition from the European colonial powers of the boundaries of his empire.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/15.htm' }
        },
        {
          id: 'q3',
          text: 'But, showing a great capacity to play one power off against another, the emperor was able to avoid making any substantial concessions.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/15.htm' }
        }
      ]
    }
  ]
})
