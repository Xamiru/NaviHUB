import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'spanish-reconquest-of-chile',
  names: [
    { text: 'Spanish Reconquest of Chile', lang: 'en', role: 'primary' },
    { text: 'La Reconquista', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1814' },
        cites: [
          {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1817' },
        cites: [
          {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'During the Reconquest (La Reconquista) of 1814-17, the harsh rule of the Spanish loyalists, who punished suspected rebels, drove more Chileans into the insurrectionary camp.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
        },
        {
          id: 'q2',
          text: 'As the leader of guerrilla raids against the Spaniards, Manuel Rodríguez became a national symbol of resistance.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Batalla-Rancagua.jpg/1280px-Batalla-Rancagua.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Batalla-Rancagua.jpg',
    credit: { institution: 'Museo Histórico Nacional de Chile', creator: 'Giulio Nanetti' },
    license: { id: 'public-domain' }
  }
})
