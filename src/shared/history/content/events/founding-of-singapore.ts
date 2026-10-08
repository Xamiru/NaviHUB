import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-singapore',
  names: [
    { text: 'Founding of modern Singapore', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1819-02-06' },
        cites: [
          {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:singapore',
      cites: [
        {
          source: 'loc-singapore-country-study-1989',
          loc: { section: 'Founding and Early Years', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:stamford-raffles',
      role: 'leader',
      cites: [
        {
          source: 'loc-singapore-country-study-1989',
          loc: { section: 'Founding and Early Years', para: '6' }
        }
      ]
    },
    {
      name: 'William Farquhar',
      role: 'participant',
      cites: [
        {
          source: 'loc-singapore-country-study-1989',
          loc: { section: 'Founding and Early Years', para: '6' }
        }
      ]
    },
    {
      name: 'Temenggong Abdu\'r Rahman',
      role: 'signatory',
      cites: [
        {
          source: 'loc-singapore-country-study-1989',
          loc: { section: 'Founding and Early Years', para: '6' }
        }
      ]
    },
    {
      name: 'Hussein',
      role: 'signatory',
      cites: [
        {
          source: 'loc-singapore-country-study-1989',
          loc: { section: 'Founding and Early Years', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'After war in Europe ended in 1814, however, the British agreed to return Java and Malacca to the Dutch.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        },
        {
          id: 'q2',
          text: 'In 1818 Raffles sailed from Bencoolen to India, where he convinced Governor General Lord Hastings of the need for a British post on the southern end of the Strait of Malacca.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Acknowledging Hussein as the rightful sultan of Johore, on February 6 Raffles signed a treaty with him and the temenggong confirming the right of the British East India Company to establish a trading post in return for an annual payment (in Spanish dollars, the common currency of the region at the time) of Sp$5,000 to Hussein and Sp$3,000 to the temenggong.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'The immediate reaction to Raffles\' new venture was mixed.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        },
        {
          id: 'q5',
          text: 'Word of Singapore\'s free trade policy also spread southeastward through the archipelago, and within six weeks more than 100 Indonesian interisland craft were anchored in the harbor, as well as one Siamese and two European ships.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        },
        {
          id: 'q6',
          text: 'Raffles returned in late May to find that the population of the settlement had grown to nearly 5,000, including Malays, Chinese, Bugis, Arabs, Indians, and Europeans.',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1819-01-28' },
            cites: [
              {
                source: 'loc-singapore-country-study-1989',
                loc: { section: 'Founding and Early Years', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On January 28, 1819, Raffles and Farquhar anchored near the mouth of the Singapore River.',
        lang: 'en',
        cite: {
          source: 'loc-singapore-country-study-1989',
          loc: { section: 'Founding and Early Years', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1819-01-29' },
            cites: [
              {
                source: 'loc-singapore-country-study-1989',
                loc: { section: 'Founding and Early Years', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The following day the two men went ashore to meet Temenggong Abdu\'r Rahman, who granted provisional permission for the British East India Company to establish a trading post on the island, subject to the approval of Hussein.',
        lang: 'en',
        cite: {
          source: 'loc-singapore-country-study-1989',
          loc: { section: 'Founding and Early Years', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/John_Michael_Houghton%2C_Drawing_from_the_Houghton_Album_titled_%27Singapore_from_the_Rocky_Point%2C_1819%27%2C_13_x_18_cm%2C_Collection_of_National_Museum_of_Singapore.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:John_Michael_Houghton,_Drawing_from_the_Houghton_Album_titled_%27Singapore_from_the_Rocky_Point,_1819%27,_13_x_18_cm,_Collection_of_National_Museum_of_Singapore.jpg',
    credit: { institution: 'National Museum of Singapore', creator: 'John Michael Houghton' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'kwa-2009-singapore-a-700-year-history', perspective: 'southeast-asian' }
  ]
})
