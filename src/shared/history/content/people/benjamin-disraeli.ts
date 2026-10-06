import { definePerson } from '../../schema'

export default definePerson({
  id: 'benjamin-disraeli',
  names: [
    { text: 'Benjamin Disraeli', lang: 'en', role: 'primary' },
    {
      text: 'Earl of Beaconsfield',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'gov-uk-past-prime-ministers-disraeli',
          loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1804-12-21' },
        cites: [
          {
            source: 'gov-uk-past-prime-ministers-disraeli',
            loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1881-04-19' },
        cites: [
          {
            source: 'gov-uk-past-prime-ministers-disraeli',
            loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:london',
    cites: [
      {
        source: 'gov-uk-past-prime-ministers-disraeli',
        loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
      }
    ]
  },
  diedIn: {
    ref: 'place:london',
    cites: [
      {
        source: 'gov-uk-past-prime-ministers-disraeli',
        loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician', 'writer'],
  offices: [
    {
      title: 'Prime Minister',
      start: {
        alts: [
          {
            value: { d: '1868' },
            cites: [
              {
                source: 'gov-uk-past-prime-ministers-disraeli',
                loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1868' },
            cites: [
              {
                source: 'gov-uk-past-prime-ministers-disraeli',
                loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'gov-uk-past-prime-ministers-disraeli',
          loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
        }
      ]
    },
    {
      title: 'Prime Minister',
      start: {
        alts: [
          {
            value: { d: '1874' },
            cites: [
              {
                source: 'gov-uk-past-prime-ministers-disraeli',
                loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1880' },
            cites: [
              {
                source: 'gov-uk-past-prime-ministers-disraeli',
                loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'gov-uk-past-prime-ministers-disraeli',
          loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Politician, novelist and bon viveur, Benjamin Disraeli was a man with many interests, but it was as a Conservative politician that Disraeli achieved lasting fame. PM for almost 7 years, he initiated a wide range of legislation to improve educational opportunities and the life of working people.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-disraeli',
            loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/benjamin-disraeli-the-earl-of-beaconsfield'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Disraeli became Prime Minister once again in 1874, aged 70.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-disraeli',
            loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/benjamin-disraeli-the-earl-of-beaconsfield'
          }
        },
        {
          id: 'q3',
          text: 'Disraeli now faced Gladstone across the Dispatch Box, and it became Britain’s most famous parliamentary rivalry. The contrast in their physical appearances and their styles was stark, and the hatred was strong.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-disraeli',
            loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/benjamin-disraeli-the-earl-of-beaconsfield'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'The 1880 election was lost to the Liberals, a narrow loss in terms of votes cast. Disraeli threw himself into the job of Opposition, and was active until a month before his death from bronchitis in April 1881.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-disraeli',
            loc: { section: 'Benjamin Disraeli, the Earl of Beaconsfield' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/benjamin-disraeli-the-earl-of-beaconsfield'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Portret_van_Benjamin_Disraeli_The_earl_of_Beaconsfield_%28titel_op_object%29%2C_RP-F-2001-7-235E-1.jpg/1280px-Portret_van_Benjamin_Disraeli_The_earl_of_Beaconsfield_%28titel_op_object%29%2C_RP-F-2001-7-235E-1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portret_van_Benjamin_Disraeli_The_earl_of_Beaconsfield_(titel_op_object),_RP-F-2001-7-235E-1.jpg',
    credit: { institution: 'Rijksmuseum' },
    license: { id: 'cc0' }
  }
})
