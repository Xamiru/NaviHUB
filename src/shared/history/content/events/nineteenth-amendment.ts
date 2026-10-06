import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nineteenth-amendment',
  names: [
    {
      text: 'Nineteenth Amendment to the United States Constitution',
      lang: 'en',
      role: 'primary'
    },
    { text: '19th Amendment', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1920-08-18' },
        cites: [
          {
            source: 'nara-milestone-19th-amendment',
            loc: {
              section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
              para: '1'
            }
          },
          {
            source: 'nara-milestone-19th-amendment',
            loc: {
              section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
              para: '5'
            }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    { ref: 'place:washington-dc' }
  ],
  participants: [
    {
      name: 'Bainbridge Colby',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-19th-amendment',
          loc: {
            section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
            para: '5'
          }
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
          text: 'Passed by Congress June 4, 1919, and ratified on August 18, 1920, the 19th amendment granted women the right to vote.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-19th-amendment',
            loc: {
              section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/19th-amendment'
          }
        },
        {
          id: 'q2',
          text: '"The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-19th-amendment',
            loc: {
              section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
              para: '17'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/19th-amendment'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Achieving this milestone required a lengthy and difficult struggle—victory took decades of agitation and protest.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-19th-amendment',
            loc: {
              section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/19th-amendment'
          }
        },
        {
          id: 'q4',
          text: 'By 1916, almost all of the major suffrage organizations were united behind the goal of a constitutional amendment. When New York adopted woman suffrage in 1917 and President Wilson changed his position to support an amendment in 1918, the political balance began to shift.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-19th-amendment',
            loc: {
              section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/19th-amendment'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The campaign for woman suffrage was long, difficult, and sometimes dramatic; yet ratification did not ensure full enfranchisement. Decades of struggle to include African Americans and other minority women in the promise of voting rights remained. Many women remained unable to vote long into the 20th century because of discriminatory state voting laws.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-19th-amendment',
            loc: {
              section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/19th-amendment'
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
            value: { d: '1919-05-21' },
            cites: [
              {
                source: 'nara-milestone-19th-amendment',
                loc: {
                  section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
                  para: '5'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'On May 21, 1919, the House of Representatives passed the amendment, and 2 weeks later, the Senate followed.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-19th-amendment',
          loc: {
            section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
            para: '5'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/19th-amendment'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-08-26' },
            cites: [
              {
                source: 'nara-milestone-19th-amendment',
                loc: {
                  section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
                  para: '5'
                }
              },
              { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '216' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Secretary of State Bainbridge Colby certified the ratification on August 26, 1920, changing the face of the American electorate forever.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-19th-amendment',
          loc: {
            section: '19th Amendment to the U.S. Constitution: Women\'s Right to Vote (1920)',
            para: '5'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/19th-amendment'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Ratification_of_the_Nineteenth_Amendment_%283693901127%29.jpg/1280px-Ratification_of_the_Nineteenth_Amendment_%283693901127%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ratification_of_the_Nineteenth_Amendment_(3693901127).jpg',
    credit: { institution: 'U.S. National Archives' },
    license: { id: 'public-domain' }
  }
})
