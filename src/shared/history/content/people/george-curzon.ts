import { definePerson } from '../../schema'

export default definePerson({
  id: 'george-curzon',
  names: [
    { text: 'George Curzon', lang: 'en', role: 'primary' },
    {
      text: 'George Nathaniel Curzon, 1st Marquess Curzon of Kedleston',
      lang: 'en',
      role: 'alternative'
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1859-01-11' },
        cites: [
          {
            source: 'iranica-wright-curzon',
            loc: { section: 'CURZON, GEORGE NATHANIEL', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1925-03-30' },
        cites: [
          {
            source: 'iranica-wright-curzon',
            loc: { section: 'CURZON, GEORGE NATHANIEL', para: '1' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:london',
    cites: [
      {
        source: 'iranica-wright-curzon',
        loc: { section: 'CURZON, GEORGE NATHANIEL', para: '1' }
      }
    ]
  },
  regions: ['europe', 'south-asia', 'iran'],
  roles: ['politician', 'diplomat', 'writer'],
  offices: [
    {
      title: 'Viceroy of India',
      polity: 'polity:british-raj',
      start: {
        alts: [
          {
            value: { d: '1899' },
            cites: [
              {
                source: 'gov-uk-past-foreign-secretaries-george-curzon',
                loc: { section: 'George Nathaniel Curzon' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1905' },
            cites: [
              {
                source: 'gov-uk-past-foreign-secretaries-george-curzon',
                loc: { section: 'George Nathaniel Curzon' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'gov-uk-past-foreign-secretaries-george-curzon',
          loc: { section: 'George Nathaniel Curzon' }
        },
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'The Independence Movement', para: '4' }
        }
      ]
    },
    {
      title: 'Foreign Secretary',
      polity: 'polity:united-kingdom',
      start: {
        alts: [
          {
            value: { d: '1919-10' },
            cites: [
              {
                source: 'gov-uk-past-foreign-secretaries-george-curzon',
                loc: { section: 'George Nathaniel Curzon' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1924-01' },
            cites: [
              {
                source: 'gov-uk-past-foreign-secretaries-george-curzon',
                loc: { section: 'George Nathaniel Curzon' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'gov-uk-past-foreign-secretaries-george-curzon',
          loc: { section: 'George Nathaniel Curzon' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Lord_Curzon_LCCN2014696090_%28cropped%29.jpg/1280px-Lord_Curzon_LCCN2014696090_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lord_Curzon_LCCN2014696090_(cropped).jpg',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Curzon is best known for his illustrious career as Viceroy of India (1899 to 1905), and his expertise in Asian affairs was an important influence on his time as Foreign Secretary.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-foreign-secretaries-george-curzon',
            loc: { section: 'George Nathaniel Curzon' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-foreign-secretaries/george-curzon'
          }
        },
        {
          id: 'q2',
          text: 'CURZON, GEORGE NATHANIEL, 1st Marquess of Kedleston (b. Kedleston, Darbyshire, England, 11 January 1859, d. London, 30 March 1925), statesman, traveler, and writer.',
          lang: 'en',
          cite: {
            source: 'iranica-wright-curzon',
            loc: { section: 'CURZON, GEORGE NATHANIEL', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/curzon-george-nathaniel/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'It was an interest that never left him and was reflected in his lifelong concern for Persia as an outer bastion in the defense of India.',
          lang: 'en',
          cite: {
            source: 'iranica-wright-curzon',
            loc: { section: 'CURZON, GEORGE NATHANIEL', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/curzon-george-nathaniel/'
          }
        },
        {
          id: 'q4',
          text: 'Sir George Curzon, the governor-general (1899-1905), ordered the partition of Bengal in 1905.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/19.htm' }
        },
        {
          id: 'q5',
          text: 'By the time Curzon left India in 1905 Britain’s position in the Persian Gulf was stronger than ever before',
          lang: 'en',
          cite: {
            source: 'iranica-wright-curzon',
            loc: { section: 'CURZON, GEORGE NATHANIEL', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/curzon-george-nathaniel/'
          }
        },
        {
          id: 'q6',
          text: 'Curzon personally negotiated an Anglo-Persian Agreement in August 1919 (only to see it fail to be ratified by the Iranians in 1921)',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-foreign-secretaries-george-curzon',
            loc: { section: 'George Nathaniel Curzon' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-foreign-secretaries/george-curzon'
          }
        },
        {
          id: 'q7',
          text: 'Peace was finally sealed with the Treaty of Lausanne in 1923, the negotiation of which was arguably Curzon’s finest hour as Foreign Secretary.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-foreign-secretaries-george-curzon',
            loc: { section: 'George Nathaniel Curzon' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-foreign-secretaries/george-curzon'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q8',
          text: 'Curzon never set foot in Persia again, but the impressions formed during his journey and recorded in his book never left him and were reflected in his policies as viceroy and foreign secretary.',
          lang: 'en',
          cite: {
            source: 'iranica-wright-curzon',
            loc: { section: 'CURZON, GEORGE NATHANIEL', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/curzon-george-nathaniel/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q9',
          text: 'After Bonar Law’s resignation in May 1923, Curzon was passed over for the job of Prime Minister in favour of Stanley Baldwin. Curzon remained as Foreign Secretary until January 1924, when the Conservative administration left office.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-foreign-secretaries-george-curzon',
            loc: { section: 'George Nathaniel Curzon' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-foreign-secretaries/george-curzon'
          }
        }
      ]
    }
  ]
})
