import { definePerson } from '../../schema'

export default definePerson({
  id: 'jose-maria-morelos',
  names: [
    { text: 'José María Morelos', lang: 'en', role: 'primary' },
    { text: 'José María Morelos y Pavón', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  died: {
    alts: [
      {
        value: { d: '1815' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['cleric', 'revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After the death of Hidalgo, José María Morelos Pavón assumed the leadership of the revolutionary movement.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
        },
        {
          id: 'q2',
          text: 'Morelos took charge of the political and military aspects of the insurrection and further planned a strategic move to encircle Mexico City and to cut communications to the coastal areas.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'In 1815 Morelos was captured and met the same fate as Hidalgo.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
        }
      ]
    }
  ]
})
