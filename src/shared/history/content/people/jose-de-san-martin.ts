import { definePerson } from '../../schema'

export default definePerson({
  id: 'jose-de-san-martin',
  names: [
    { text: 'José de San Martín', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['latin-america'],
  roles: ['military', 'revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'San Martín, the son of a Spanish army officer stationed in Argentina, had originally served in the Spanish army but returned to his native Argentina to join the rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
        },
        {
          id: 'q2',
          text: 'San Martín considered the liberation of Chile a strategic stepping-stone to the emancipation of Peru, which he saw as the key to hemispheric victory over the Spanish.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Not until both movements converged in Peru during the latter phases of the revolt, specifically the 4,500-man expeditionary force led by General José de San Martín that landed in Pisco in September 1820, was Spanish control of Peru seriously threatened.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'INDEPENDENCE IMPOSED FROM WITHOUT', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/11.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg',
    credit: { institution: 'DIBAM', creator: 'José Gil de Castro' },
    license: { id: 'public-domain' }
  }
})
