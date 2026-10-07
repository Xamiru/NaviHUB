import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'march-on-washington',
  names: [
    { text: 'March on Washington', lang: 'en', role: 'primary' },
    {
      text: 'March on Washington for Jobs and Freedom',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'nara-milestone-march-on-washington-program',
          loc: { section: 'Official Program for the March on Washington (1963)', para: '3' }
        },
        {
          source: 'nps-march-on-washington-for-jobs-and-freedom',
          loc: { section: 'March on Washington for Jobs and Freedom', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1963-08-28' },
        cites: [
          {
            source: 'nara-milestone-march-on-washington-program',
            loc: { section: 'Official Program for the March on Washington (1963)', para: '3' }
          },
          {
            source: 'nps-march-on-washington-for-jobs-and-freedom',
            loc: { section: 'March on Washington for Jobs and Freedom', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 3,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'nps-march-on-washington-for-jobs-and-freedom',
          loc: { section: 'March on Washington for Jobs and Freedom', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'A. Philip Randolph',
      role: 'organizer',
      cites: [
        {
          source: 'nara-milestone-march-on-washington-program',
          loc: { section: 'Official Program for the March on Washington (1963)', para: '4' }
        }
      ]
    },
    {
      name: 'Bayard Rustin',
      role: 'organizer',
      cites: [
        {
          source: 'nara-milestone-march-on-washington-program',
          loc: { section: 'Official Program for the March on Washington (1963)', para: '5' }
        }
      ]
    },
    {
      ref: 'person:martin-luther-king-jr',
      role: 'organizer',
      cites: [
        {
          source: 'nara-milestone-march-on-washington-program',
          loc: { section: 'Official Program for the March on Washington (1963)', para: '4' }
        },
        {
          source: 'nps-march-on-washington-for-jobs-and-freedom',
          loc: { section: 'March on Washington for Jobs and Freedom', para: '10' }
        }
      ]
    },
    {
      name: 'John Lewis',
      role: 'participant',
      cites: [
        {
          source: 'nps-march-on-washington-for-jobs-and-freedom',
          loc: { section: 'March on Washington for Jobs and Freedom', para: '17' }
        }
      ]
    },
    {
      ref: 'person:john-f-kennedy',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-march-on-washington-program',
          loc: { section: 'Official Program for the March on Washington (1963)', para: '3' }
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
            value: { min: 250000, qualifier: 'about' },
            cites: [
              {
                source: 'nps-march-on-washington-for-jobs-and-freedom',
                loc: { section: 'March on Washington for Jobs and Freedom', para: '1' }
              },
              {
                source: 'nps-march-on-washington-for-jobs-and-freedom',
                loc: { section: 'March on Washington for Jobs and Freedom', para: '12' }
              },
              {
                source: 'nara-milestone-march-on-washington-program',
                loc: { section: 'Official Program for the March on Washington (1963)', para: '1' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:civil-rights-act-of-1964',
      rel: 'contributed-to',
      cites: [
        {
          source: 'nps-civil-rights-act-of-1964',
          loc: { section: 'Civil Rights Act of 1964', para: '9' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/March_on_Washington_-_Reflecting_Pool.jpg/1280px-March_on_Washington_-_Reflecting_Pool.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:March_on_Washington_-_Reflecting_Pool.jpg',
    credit: {
      institution: 'Library of Congress Prints and Photographs Division',
      creator: 'Warren K. Leffler'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'An estimated 250,000 people attended the March on Washington for Jobs and Freedom on August 28, 1963, arriving in Washington, D.C. by planes, trains, cars, and buses from all over the country.',
          lang: 'en',
          cite: {
            source: 'nps-march-on-washington-for-jobs-and-freedom',
            loc: { section: 'March on Washington for Jobs and Freedom', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/march-on-washington.htm'
          }
        },
        {
          id: 'q2',
          text: 'Not only was it the largest demonstration for human rights in United States history, but it also occasioned a rare display of unity among the various civil rights organizations.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-march-on-washington-program',
            loc: { section: 'Official Program for the March on Washington (1963)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/official-program-for-the-march-on-washington'
          }
        },
        {
          id: 'q3',
          text: 'The highlight of the march, which attracted 250,000 people, was Martin Luther King\'s "I Have a Dream" speech.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-march-on-washington-program',
            loc: { section: 'Official Program for the March on Washington (1963)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/official-program-for-the-march-on-washington'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The event focused on employment discrimination, civil rights abuses against African Americans, Latinos, and other disenfranchised groups, and support for the Civil Rights Act that the Kennedy Administration was attempting to pass through Congress.',
          lang: 'en',
          cite: {
            source: 'nps-march-on-washington-for-jobs-and-freedom',
            loc: { section: 'March on Washington for Jobs and Freedom', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/march-on-washington.htm'
          }
        },
        {
          id: 'q5',
          text: 'The idea for the 1963 March on Washington was envisioned by A. Philip Randolph, a long-time civil rights activist dedicated to improving the economic condition of Black Americans.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-march-on-washington-program',
            loc: { section: 'Official Program for the March on Washington (1963)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/official-program-for-the-march-on-washington'
          }
        },
        {
          id: 'q6',
          text: 'The details and organization of the march were handled by Bayard Rustin, Randolph’s trusted associate.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-march-on-washington-program',
            loc: { section: 'Official Program for the March on Washington (1963)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/official-program-for-the-march-on-washington'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'The event began with a rally at the Washington Monument featuring several celebrities and musicians. Participants then marched the mile-long National Mall to the Memorial. The three-hour long program at the Lincoln Memorial included speeches from prominent civil rights and religious leaders. The day ended with a meeting between the march leaders and President John F. Kennedy at the White House.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-march-on-washington-program',
            loc: { section: 'Official Program for the March on Washington (1963)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/official-program-for-the-march-on-washington'
          }
        },
        {
          id: 'q8',
          text: 'With that many people converging on the city, there were concerns about violence. The Washington, D.C. police force mobilized 5,900 officers for the march and the government mustered 6,000 soldiers and National Guardsmen as additional protection. President Kennedy thought that if there were any problems, the negative perceptions could undo the civil rights bill making its way through Congress. In the end, the crowds were calm and there were no incidents reported by police.',
          lang: 'en',
          cite: {
            source: 'nps-march-on-washington-for-jobs-and-freedom',
            loc: { section: 'March on Washington for Jobs and Freedom', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/march-on-washington.htm'
          }
        },
        {
          id: 'q9',
          text: 'John Lewis in his speech said that "we do not want our freedom gradually but we want to be free now" and that Congress needed to pass "meaningful legislation" or people would march through the South.',
          lang: 'en',
          cite: {
            source: 'nps-march-on-washington-for-jobs-and-freedom',
            loc: { section: 'March on Washington for Jobs and Freedom', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/march-on-washington.htm'
          }
        }
      ]
    }
  ]
})
