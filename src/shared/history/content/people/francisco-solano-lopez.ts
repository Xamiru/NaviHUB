import { definePerson } from '../../schema'

export default definePerson({
  id: 'francisco-solano-lopez',
  names: [
    { text: 'Francisco Solano López', lang: 'en', role: 'primary' },
    { text: 'Francisco Solano López', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1826' },
        cites: [
          {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1870' },
        cites: [
          {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['head-of-state', 'military'],
  offices: [
    {
      title: 'President of Paraguay',
      start: {
        alts: [
          {
            value: { d: '1862' },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Second Empire, 1840-89', para: '9' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1870' },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Second Empire, 1840-89', para: '9' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Second Empire, 1840-89', para: '9' }
        },
        {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'Francisco Solano Lopez', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Born in 1826, Francisco Solano Lopez became the second and final ruler of the Lopez dynasty.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        },
        {
          id: 'q2',
          text: 'His 1853 trip to Europe to buy arms was undoubtedly the most important experience of his life; his stay in Paris proved to be a turning point for him.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Solano Lopez consolidated his power after his father\'s death in 1862 by silencing several hundred critics and would-be reformers through imprisonment. Another Paraguayan congress then unanimously elected him president.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'She buried Solano Lopez with her own hands after the last battle in 1870 and died penniless some years later in Europe.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Solano_Lopez_1866_by_Garcia.jpg/1280px-Solano_Lopez_1866_by_Garcia.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Solano_Lopez_1866_by_Garcia.jpg',
    credit: { creator: 'Aurelio García' },
    license: { id: 'public-domain' }
  }
})
