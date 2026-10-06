import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'turkiyah',
  names: [
    { text: 'Turkiyah', lang: 'en', role: 'primary' },
    { text: 'التركية', lang: 'ar', role: 'native' },
    {
      text: 'Turkish regime',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE TURKIYAH, 1821-85', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1821' },
        cites: [
          {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1885' },
        cites: [
          { source: 'loc-sudan-country-study-1991', loc: { section: 'THE TURKIYAH, 1821-85' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'mena'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Under the new government established in 1821, which was known as the Turkiyah or Turkish regime, soldiers lived off the land and exacted exorbitant taxes from the population.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        },
        {
          id: 'q2',
          text: 'They also destroyed many ancient Meroitic pyramids searching for hidden gold.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        },
        {
          id: 'q3',
          text: 'Furthermore, slave trading increased, causing many of the inhabitants of the fertile Al Jazirah, heartland of Funj, to flee to escape the slave traders.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        }
      ]
    }
  ]
})
