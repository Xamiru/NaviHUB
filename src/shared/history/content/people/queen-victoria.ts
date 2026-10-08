import { definePerson } from '../../schema'

export default definePerson({
  id: 'queen-victoria',
  names: [
    { text: 'Queen Victoria', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1819-05-24' },
        cites: [
          { source: 'britannica-1911-victoria-queen', loc: { section: 'VICTORIA', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1901-01-22' },
        cites: [
          {
            source: 'britannica-1911-victoria-queen',
            loc: { section: 'VICTORIA', para: '62' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:london',
    cites: [
      { source: 'britannica-1911-victoria-queen', loc: { section: 'VICTORIA', para: '1' } }
    ]
  },
  regions: ['europe', 'global'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Queen of the United Kingdom of Great Britain and Ireland',
      polity: 'polity:united-kingdom',
      start: {
        alts: [
          {
            value: { d: '1837-06-20' },
            cites: [
              {
                source: 'britannica-1911-victoria-queen',
                loc: { section: 'VICTORIA', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1901-01-22' },
            cites: [
              {
                source: 'britannica-1911-victoria-queen',
                loc: { section: 'VICTORIA', para: '62' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-victoria-queen', loc: { section: 'VICTORIA', para: '1' } },
        { source: 'britannica-1911-victoria-queen', loc: { section: 'VICTORIA', para: '4' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Portrait_photograph_of_Queen_Victoria_dressed_for_the_wedding_of_The_Duke_and_Duchess_of_Albany%2C_1882.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_photograph_of_Queen_Victoria_dressed_for_the_wedding_of_The_Duke_and_Duchess_of_Albany,_1882.jpg',
    credit: { institution: 'Royal Collection', creator: 'Alexander Bassano' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'VICTORIA [ALEXANDRINA VICTORIA], Queen of the United Kingdom of Great Britain and Ireland, Empress of India (1819–1901), only child of Edward, duke of Kent, fourth son of King George III., and of Princess Victoria Mary Louisa of Saxe-Coburg-Gotha (widow of Prince Emich Karl of Leiningen, by whom she already had two children), was born at Kensington Palace on the 24th of May 1819.',
          lang: 'en',
          cite: { source: 'britannica-1911-victoria-queen', loc: { section: 'VICTORIA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Victoria,_Queen'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In the early hours of the 20th of June 1837, William IV. died.',
          lang: 'en',
          cite: { source: 'britannica-1911-victoria-queen', loc: { section: 'VICTORIA', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Victoria,_Queen'
          }
        },
        {
          id: 'q3',
          text: 'The princess was accordingly roused, and quickly came downstairs in a dressing-gown, her fair hair flowing loose over her shoulders.',
          lang: 'en',
          cite: { source: 'britannica-1911-victoria-queen', loc: { section: 'VICTORIA', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Victoria,_Queen'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Before Christmas she made her usual journey to Osborne, and there on the 2nd of January she received Lord Roberts on his return from South Africa and handed to him the insignia of the Garter.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-victoria-queen',
            loc: { section: 'VICTORIA', para: '62' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Victoria,_Queen'
          }
        },
        {
          id: 'q5',
          text: 'On Tuesday, the 22nd of January 1901, she died.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-victoria-queen',
            loc: { section: 'VICTORIA', para: '62' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Victoria,_Queen'
          }
        }
      ]
    }
  ]
})
