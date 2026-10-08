import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-transcontinental-railroad',
  names: [
    { text: 'First transcontinental railroad', lang: 'en', role: 'primary' },
    {
      text: 'Pacific Railroad',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-guide-completion-of-the-transcontinental-railroad',
          loc: { section: 'Completion of the Transcontinental Railroad' }
        }
      ]
    },
    {
      text: 'Overland Route',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-guide-completion-of-the-transcontinental-railroad',
          loc: { section: 'Completion of the Transcontinental Railroad' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1863' },
        cites: [
          {
            source: 'loc-guide-completion-of-the-transcontinental-railroad',
            loc: { section: 'Completion of the Transcontinental Railroad' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1869-05-10' },
        cites: [
          {
            source: 'loc-guide-completion-of-the-transcontinental-railroad',
            loc: { section: 'Completion of the Transcontinental Railroad' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:promontory-summit',
      cites: [
        {
          source: 'loc-guide-completion-of-the-transcontinental-railroad',
          loc: { section: 'Completion of the Transcontinental Railroad' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      name: 'Leland Stanford',
      role: 'participant',
      cites: [
        {
          source: 'loc-guide-completion-of-the-transcontinental-railroad',
          loc: { section: 'Completion of the Transcontinental Railroad' }
        }
      ]
    },
    {
      name: 'Central Pacific Railroad',
      role: 'participant',
      cites: [
        {
          source: 'loc-guide-completion-of-the-transcontinental-railroad',
          loc: { section: 'Completion of the Transcontinental Railroad' }
        }
      ]
    },
    {
      name: 'Union Pacific Railroad',
      role: 'participant',
      cites: [
        {
          source: 'loc-guide-completion-of-the-transcontinental-railroad',
          loc: { section: 'Completion of the Transcontinental Railroad' }
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
          text: 'By connecting the existing eastern U.S. rail networks to the west coast, the Transcontinental Railroad (known originally as the "Pacific Railroad") became the first continuous railroad line across the United States. It was constructed between 1863 and 1869.',
          lang: 'en',
          cite: {
            source: 'loc-guide-completion-of-the-transcontinental-railroad',
            loc: { section: 'Completion of the Transcontinental Railroad' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://guides.loc.gov/this-month-in-business-history/may/completion-transcontinental-railroad'
          }
        },
        {
          id: 'q2',
          text: 'The rail line, also called the Great Transcontinental Railroad and later the "Overland Route," was predominantly built by the Central Pacific Railroad Company of California (CPRR) and Union Pacific (with some contribution by the Western Pacific Railroad Company) over public lands provided by extensive US land grants.',
          lang: 'en',
          cite: {
            source: 'loc-guide-completion-of-the-transcontinental-railroad',
            loc: { section: 'Completion of the Transcontinental Railroad' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://guides.loc.gov/this-month-in-business-history/may/completion-transcontinental-railroad'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'One group of people that often get excluded from the discussion, but whom contributed much to the building of railroad were the thousands of Chinese workers. There was resistance to hiring them but eventually CPRR hired many to work on the railroad, but pay and treatment for them was not the same as it was for white workers.',
          lang: 'en',
          cite: {
            source: 'loc-guide-completion-of-the-transcontinental-railroad',
            loc: { section: 'Completion of the Transcontinental Railroad' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://guides.loc.gov/this-month-in-business-history/may/completion-transcontinental-railroad'
          }
        },
        {
          id: 'q4',
          text: 'This protest lasted a week, but work continued and ultimately thousands of Chinese laborers died building the railroad.',
          lang: 'en',
          cite: {
            source: 'loc-guide-completion-of-the-transcontinental-railroad',
            loc: { section: 'Completion of the Transcontinental Railroad' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://guides.loc.gov/this-month-in-business-history/may/completion-transcontinental-railroad'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'The original Union Pacific, entangled in the Crédit Mobilier scandal and hit hard by the financial crisis of 1873, was eventually taken over by the new Union Pacific Railway in 1880 with its major stockholder being Jay Gould.',
          lang: 'en',
          cite: {
            source: 'loc-guide-completion-of-the-transcontinental-railroad',
            loc: { section: 'Completion of the Transcontinental Railroad' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://guides.loc.gov/this-month-in-business-history/may/completion-transcontinental-railroad'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1862-07-01' },
            cites: [
              {
                source: 'loc-guide-completion-of-the-transcontinental-railroad',
                loc: { section: 'Completion of the Transcontinental Railroad' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Congress passed the Pacific Railroad Act of 1862 on July 1, 1862, and the Central Pacific Railroad (CPRR) and the Union Pacific Railroad were authorized by Congress.',
        lang: 'en',
        cite: {
          source: 'loc-guide-completion-of-the-transcontinental-railroad',
          loc: { section: 'Completion of the Transcontinental Railroad' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/this-month-in-business-history/may/completion-transcontinental-railroad'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1867-06-24' },
            cites: [
              {
                source: 'loc-guide-completion-of-the-transcontinental-railroad',
                loc: { section: 'Completion of the Transcontinental Railroad' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On June 24th, 1867 all Chinese railroad workers from Cisco to Truckee stopped work demanding higher wages and reduced work days.',
        lang: 'en',
        cite: {
          source: 'loc-guide-completion-of-the-transcontinental-railroad',
          loc: { section: 'Completion of the Transcontinental Railroad' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/this-month-in-business-history/may/completion-transcontinental-railroad'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1869-05-10' },
            cites: [
              {
                source: 'loc-guide-completion-of-the-transcontinental-railroad',
                loc: { section: 'Completion of the Transcontinental Railroad' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The railroad opened for through traffic on May 10, 1869, when CPRR President Leland Stanford ceremonially drove the gold "Last Spike" (later often referred to as the "Golden Spike") at Promontory Summit in Utah.',
        lang: 'en',
        cite: {
          source: 'loc-guide-completion-of-the-transcontinental-railroad',
          loc: { section: 'Completion of the Transcontinental Railroad' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://guides.loc.gov/this-month-in-business-history/may/completion-transcontinental-railroad'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/East_and_West_Shaking_hands_at_the_laying_of_last_rail_Union_Pacific_Railroad.jpg/1280px-East_and_West_Shaking_hands_at_the_laying_of_last_rail_Union_Pacific_Railroad.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:East_and_West_Shaking_hands_at_the_laying_of_last_rail_Union_Pacific_Railroad.jpg',
    credit: { institution: 'Yale University Libraries', creator: 'Andrew J. Russell' },
    license: { id: 'public-domain' }
  }
})
