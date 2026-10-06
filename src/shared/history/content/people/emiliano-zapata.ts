import { definePerson } from '../../schema'

export default definePerson({
  id: 'emiliano-zapata',
  names: [
    { text: 'Emiliano Zapata', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1879' },
        cites: [
          {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Introduction', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1919' },
        cites: [
          {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Introduction', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['revolutionary', 'military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'As early as 1909 in Morelos, the peasant leader, Emiliano Zapata, had recruited thousands of hacienda laborers and landless peasants to attack the haciendas and reclaim lost lands.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution, 1910-20', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/26.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Emiliano_Zapata.tiff/lossy-page1-1280px-Emiliano_Zapata.tiff.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Emiliano_Zapata.tiff',
    credit: { institution: 'Center for the Study of Mexican History' },
    license: { id: 'public-domain' }
  }
})
