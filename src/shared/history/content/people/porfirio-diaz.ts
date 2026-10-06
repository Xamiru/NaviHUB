import { definePerson } from '../../schema'

export default definePerson({
  id: 'porfirio-diaz',
  names: [
    { text: 'Porfirio Díaz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1830' },
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
        value: { d: '1915' },
        cites: [
          {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Introduction', para: '1' }
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
          text: 'In the political arena, the Porfiriato was marked by the systematic violation of the principles of the constitution of 1857.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution, 1910-20', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/26.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Porfirio_Diaz_a_caballo.tif/lossy-page1-1280px-Porfirio_Diaz_a_caballo.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Porfirio_Diaz_a_caballo.tif',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  }
})
