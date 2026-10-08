import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bells-telephone-patent',
  names: [
    { text: 'Bell’s telephone patent', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'invention',
  start: {
    alts: [
      {
        value: { d: '1876-03-07' },
        cites: [
          { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '17' } }
        ]
      }
    ]
  },
  regions: ['north-america', 'global'],
  prominence: 3,
  participants: [
    {
      name: 'Alexander Graham Bell',
      role: 'participant',
      cites: [
        { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '18' } }
      ]
    },
    {
      name: 'Heinrich von Stephan',
      role: 'organizer',
      cites: [
        { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '51' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'On March 7, 1876, Alexander Graham Bell successfully received a patent for the telephone and secured the rights to the discovery.',
          lang: 'en',
          cite: {
            source: 'loc-guide-invention-of-the-telephone',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://guides.loc.gov/chronicling-america-telephone-invention'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Patent_Drawing_of_Telegraphy_by_Alexander_Graham_Bell_-_NARA_-_6120306_%28page_1%29.jpg/1280px-Patent_Drawing_of_Telegraphy_by_Alexander_Graham_Bell_-_NARA_-_6120306_%28page_1%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Patent_Drawing_of_Telegraphy_by_Alexander_Graham_Bell_-_NARA_-_6120306_(page_1).jpg',
    credit: { institution: 'National Archives and Records Administration' },
    license: { id: 'public-domain' }
  }
})
