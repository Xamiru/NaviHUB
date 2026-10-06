import { definePerson } from '../../schema'

export default definePerson({
  id: 'bernardo-ohiggins',
  names: [
    { text: 'Bernardo O’Higgins', lang: 'en', role: 'primary' },
    {
      text: 'Bernardo O\'Higgins Riquelme',
      lang: 'es',
      role: 'alternative',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['latin-america'],
  roles: ['revolutionary', 'military', 'head-of-state'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'One of the earliest advocates of full independence, Bernardo O\'Higgins Riquelme, captained a rival faction that plunged the criollos into civil war.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
        },
        {
          id: 'q2',
          text: 'O\'Higgins and many of the Chilean rebels escaped to Argentina.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
        }
      ]
    }
  ]
})
