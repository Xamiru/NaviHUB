import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'peterloo-massacre',
  names: [
    { text: 'Peterloo Massacre', lang: 'en', role: 'primary' },
    {
      text: 'Peterloo',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'tna-peterloo-massacre-collection',
          loc: { section: 'Engraving showing ‘the slaughter at Manchester’' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1819-08-16' },
        cites: [
          {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:manchester',
      cites: [
        {
          source: 'tna-peterloo-massacre-collection',
          loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Henry Hunt',
      role: 'organizer',
      cites: [
        {
          source: 'tna-peterloo-massacre-collection',
          loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
        }
      ]
    },
    {
      name: 'Manchester and Salford Yeomanry',
      role: 'perpetrator',
      cites: [
        {
          source: 'tna-peterloo-massacre-collection',
          loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 60000 },
            cites: [
              {
                source: 'tna-peterloo-massacre-collection',
                loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 18 },
            cites: [
              {
                source: 'tna-peterloo-massacre-collection',
                loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 700, qualifier: 'up-to' },
            cites: [
              {
                source: 'tna-peterloo-massacre-collection',
                loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1819, Manchester was the second most populous city in Britain, with around 130,000 inhabitants. Many had migrated there to work in the mills that fired the Industrial Revolution. Yet it elected no MPs to Parliament. The whole county of Lancashire only elected two, and few inhabitants could vote.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'The Manchester Female Reformers’ address' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In summer 1819, reformers decided to hold a mass meeting in Manchester, inviting the famed radical orator Henry Hunt to speak. The meeting was delayed, as magistrates attempted to declare it illegal. It finally took place on Monday 16 August. 60,000 people arrived on St. Peter’s Field in orderly fashion.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        },
        {
          id: 'q3',
          text: 'The Manchester and Salford Yeomanry and 15th Hussars were called in to arrest Hunt and others.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        },
        {
          id: 'q4',
          text: 'It is estimated that 18 people were killed, including a child, and up to 700 were injured.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'An annotated plan of St. Peter’s Field, Manchester' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Peterloo did not bring universal male suffrage any closer. The Home Secretary had Hunt and other arrested on suspicion of treason (they were eventually imprisoned on lesser charges), and quickly passed the ‘Six Acts’ to restrict public meetings, publishing, newspapers, and other activities.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'Pro-government pamphlet about the Peterloo Massacre' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/The_Massacre_of_Peterloo.jpg/1280px-The_Massacre_of_Peterloo.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Massacre_of_Peterloo.jpg',
    credit: { creator: 'George Cruikshank' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'shelley-1887',
      mediaKind: 'document',
      title: 'Shelley, "Peterloo" and "The Mask of Anarchy"',
      date: { d: '1887' },
      url: 'https://archive.org/download/shelleypeterloo00socigoog/shelleypeterloo00socigoog.pdf',
      page: 'https://archive.org/details/shelleypeterloo00socigoog',
      credit: {
        institution: 'New York Public Library (Internet Archive)',
        creator: 'Harry Buxton Forman'
      },
      license: { id: 'public-domain' },
      bytes: 697281
    }
  ]
})
