import { definePerson } from '../../schema'

export default definePerson({
  id: 'william-mckinley',
  names: [
    { text: 'William McKinley', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1843-01-29' },
        cites: [
          {
            source: 'britannica-1911-mckinley-william',
            loc: { section: 'McKINLEY, WILLIAM', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1901-09-14' },
        cites: [
          {
            source: 'britannica-1911-mckinley-william',
            loc: { section: 'McKINLEY, WILLIAM', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1897-03-04' },
            cites: [
              {
                source: 'britannica-1911-mckinley-william',
                loc: { section: 'McKINLEY, WILLIAM', para: '5' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1901-09-14' },
            cites: [
              {
                source: 'britannica-1911-mckinley-william',
                loc: { section: 'McKINLEY, WILLIAM', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-mckinley-william',
          loc: { section: 'McKINLEY, WILLIAM', para: '1' }
        },
        {
          source: 'britannica-1911-mckinley-william',
          loc: { section: 'McKINLEY, WILLIAM', para: '5' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Adolfo_M%C3%BCller-Ury_-_William_McKinley_-_NPG.97.157_-_National_Portrait_Gallery.jpg/1280px-Adolfo_M%C3%BCller-Ury_-_William_McKinley_-_NPG.97.157_-_National_Portrait_Gallery.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Adolfo_M%C3%BCller-Ury_-_William_McKinley_-_NPG.97.157_-_National_Portrait_Gallery.jpg',
    credit: {
      institution: 'National Portrait Gallery, Smithsonian Institution',
      creator: 'Adolfo Müller-Ury'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'McKINLEY, WILLIAM (1843–1901), twenty-fifth president of the United States, was born in Niles, Trumbull county, Ohio, on the 29th of January 1843.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-mckinley-william',
            loc: { section: 'McKINLEY, WILLIAM', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/McKinley,_William'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'McKinley was inaugurated president of the United States on the 4th of March 1897.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-mckinley-william',
            loc: { section: 'McKINLEY, WILLIAM', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/McKinley,_William'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'Advantage of this opportunity was taken by a young man of Polish parentage, by name Leon Czolgosz, to shoot at the president with a revolver at close range.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-mckinley-william',
            loc: { section: 'McKINLEY, WILLIAM', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/McKinley,_William'
          }
        },
        {
          id: 'q4',
          text: 'After the world had been assured that the patient was doing well and would recover, he collapsed and died on the 14th.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-mckinley-william',
            loc: { section: 'McKINLEY, WILLIAM', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/McKinley,_William'
          }
        }
      ]
    }
  ]
})
