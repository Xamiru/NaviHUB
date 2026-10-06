import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'qajar-dynasty',
  names: [
    { text: 'Qajar dynasty', lang: 'en', role: 'primary' },
    { text: 'دودمان قاجار', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  periodType: 'dynasty',
  start: {
    alts: [
      {
        value: { d: '1786' },
        cites: [
          {
            source: 'iranica-amanat-historiography-qajar',
            loc: { section: 'HISTORIOGRAPHY viii. QAJAR PERIOD', para: '1' }
          }
        ]
      },
      {
        value: { d: '1794' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1925' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'This time Agha Mohammad Qajar defeated the last Zand ruler outside Kerman in 1794 and made himself master of the country, beginning the Qajar dynasty that was to last until 1925.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q2',
          text: 'Under Fath Ali (1797-1834), Mohammad Shah (1834-48), and Naser ad Din Shah (1848-96) a degree of order, stability, and unity returned to the country.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q3',
          text: 'Early in the nineteenth century, the Qajars began to face pressure from two great world powers, Russia and Britain.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    }
  ]
})
