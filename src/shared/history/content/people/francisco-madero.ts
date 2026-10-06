import { definePerson } from '../../schema'

export default definePerson({
  id: 'francisco-madero',
  names: [
    { text: 'Francisco I. Madero', lang: 'en', role: 'primary' },
    { text: 'Francisco Ignacio Madero', lang: 'es', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1873' },
        cites: [
          {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Introduction', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1913-02-21' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Madero\'s Government', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['head-of-state', 'politician'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Liberals and dissident intellectuals immediately seized the opportunity and nominated Francisco I. Madero, the scion of a wealthy family in Coahuila, to run in the upcoming election.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution, 1910-20', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/26.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Francisco_I_Madero.jpg/1280px-Francisco_I_Madero.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Francisco_I_Madero.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
