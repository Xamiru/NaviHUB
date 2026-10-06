import { definePerson } from '../../schema'

export default definePerson({
  id: 'pancho-villa',
  names: [
    { text: 'Pancho Villa', lang: 'en', role: 'primary' },
    { text: 'Francisco Villa', lang: 'es', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1878' },
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
        value: { d: '1923' },
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
          text: 'Villa was a former outlaw, small businessman and colonel in the insurrection of 1910.',
          lang: 'en',
          cite: {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Introduction', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/mexican-revolution/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Pancho_Villa_Portrait_1910.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Pancho_Villa_Portrait_1910.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
