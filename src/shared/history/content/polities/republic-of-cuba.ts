import { definePolity } from '../../schema'

export default definePolity({
  id: 'republic-of-cuba',
  names: [
    { text: 'Republic of Cuba', lang: 'en', role: 'primary' },
    { text: 'República de Cuba', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1902-05-20' },
        cites: [
          { source: 'britannica-1911-cuba', loc: { section: 'CUBA', para: '52' } }
        ]
      },
      {
        value: { d: '1902-05-19' },
        cites: [
          { source: 'state-dept-countries-cuba', loc: { section: 'Cuba', para: '5' } }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:havana',
      cites: [
        { source: 'cshapes-2-dataset', loc: { section: 'Cuba (code 40), capital Havana' } }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 40, from: 1902.38 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'CUBA (the aboriginal name), a republic, the largest and most populous of the West India Islands',
          lang: 'en',
          cite: { source: 'britannica-1911-cuba', loc: { section: 'CUBA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cuba'
          }
        },
        {
          id: 'q2',
          text: 'After Spain’s defeat by U.S. and Cuban forces during the War of 1898, Spain relinquished sovereignty over Cuba. Following the war, U.S. forces occupied Cuba until 1902, when the United States allowed a new Cuban government to take full control of the state’s affairs. As a condition of independence, the United States forced Cuba to grant a continuing U.S. right to intervene on the island in accordance with the Platt Amendment.',
          lang: 'en',
          cite: { source: 'state-dept-countries-cuba', loc: { section: 'Cuba', para: '1' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://history.state.gov/countries/cuba' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The first Cuban congress met on the 5th of May 1902, prepared to take over the government from the American military authorities, which it did on the 20th of May. Tomas Estrada Palma (1835–1908) became the first president of the Republic.',
          lang: 'en',
          cite: { source: 'britannica-1911-cuba', loc: { section: 'CUBA', para: '52' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cuba'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The amendment was repealed in 1934 when the United States and Cuba signed a Treaty of Relations. The United States and Cuba cooperated under the rule of Fulgencio Batista through the 1950s.',
          lang: 'en',
          cite: { source: 'state-dept-countries-cuba', loc: { section: 'Cuba', para: '1' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://history.state.gov/countries/cuba' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'guerra-1952-historia-de-la-nacion-cubana', perspective: 'latin-american' },
    { source: 'le-riverend-1974-historia-economica-de-cuba', perspective: 'latin-american' }
  ]
})
