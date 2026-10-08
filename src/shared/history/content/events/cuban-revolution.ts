import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'cuban-revolution',
  names: [
    { text: 'Cuban Revolution', lang: 'en', role: 'primary' },
    { text: 'Revolución cubana', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1953-07-26' },
        cites: [
          {
            source: 'state-dept-background-note-cuba-2008',
            loc: { section: 'HISTORY', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1959-01-01' },
        cites: [
          {
            source: 'state-dept-background-note-cuba-2008',
            loc: { section: 'HISTORY', para: '5' }
          },
          {
            source: 'eisenhower-library-presidential-years',
            loc: { section: 'Presidential Years' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:santiago-de-cuba',
      cites: [
        {
          source: 'state-dept-background-note-cuba-2008',
          loc: { section: 'HISTORY', para: '4' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:republic-of-cuba' }
  ],
  participants: [
    {
      ref: 'person:fidel-castro',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-background-note-cuba-2008',
          loc: { section: 'HISTORY', para: '4' }
        },
        {
          source: 'eisenhower-library-presidential-years',
          loc: { section: 'Presidential Years' }
        }
      ]
    },
    {
      name: 'Fulgencio Batista',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-background-note-cuba-2008',
          loc: { section: 'HISTORY', para: '3' }
        },
        {
          source: 'state-dept-background-note-cuba-2008',
          loc: { section: 'HISTORY', para: '5' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'executed',
      value: {
        alts: [
          {
            value: { min: 3200, qualifier: 'about' },
            cites: [
              {
                source: 'state-dept-background-note-cuba-2008',
                loc: { section: 'HISTORY', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'United States Department of State' }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'A left-wing revolution in Cuba had ended in 1959 with the ouster of President Fulgencio Batista and the establishment of a new government under Premier Fidel Castro.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bay-of-pigs',
            loc: {
              section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/bay-of-pigs'
          }
        },
        {
          id: 'q2',
          text: 'The United States and Cuba cooperated under the rule of Fulgencio Batista through the 1950s. Following the revolution of 1959 and the rise of Fidel Castro to power, relations steadily deteriorated.',
          lang: 'en',
          cite: { source: 'state-dept-countries-cuba', loc: { section: 'Cuba', para: '1' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://history.state.gov/countries/cuba' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Running for president again in 1952, Batista seized power in a bloodless coup 3 months before the election was to take place, suspended the balloting, and began ruling by decree.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-cuba-2008',
            loc: { section: 'HISTORY', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2009/https://www.state.gov/r/pa/ei/bgn/2886.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'After defending himself in a trial open to national and international media, he was convicted and jailed, and subsequently was freed in an act of clemency, before going into exile in Mexico. There he organized the "26th of July Movement" with the goal of overthrowing Batista, and the group sailed to Cuba on board the yacht Granma, landing in the eastern part of the island in December 1956.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-cuba-2008',
            loc: { section: 'HISTORY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2009/https://www.state.gov/r/pa/ei/bgn/2886.htm'
          }
        },
        {
          id: 'q5',
          text: 'Batista\'s dictatorial rule fueled increasing popular discontent and the rise of many active urban and rural resistance groups, a fertile political environment for Castro\'s 26th of July Movement. Faced with a corrupt and ineffective military--itself dispirited by a U.S. Government embargo on weapons sales to Cuba--and public indignation and revulsion at his brutality toward opponents, Batista fled on January 1, 1959.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-cuba-2008',
            loc: { section: 'HISTORY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2009/https://www.state.gov/r/pa/ei/bgn/2886.htm'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Although he had promised a return to constitutional rule and democratic elections along with social reforms, Castro used his control of the military to consolidate his power by repressing all dissent from his decisions, marginalizing other resistance figures, and imprisoning or executing thousands of opponents. An estimated 3,200 people were executed by the Castro regime between 1959-62 alone. As the revolution became more radical, hundreds of thousands of Cubans fled the island.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-cuba-2008',
            loc: { section: 'HISTORY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2009/https://www.state.gov/r/pa/ei/bgn/2886.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The Castro regime quickly severed the country’s formerly strong ties with the United States by expropriating U.S. economic assets in Cuba and developing close links with the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bay-of-pigs',
            loc: {
              section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/bay-of-pigs'
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
            value: { d: '1953-07-26' },
            cites: [
              {
                source: 'state-dept-background-note-cuba-2008',
                loc: { section: 'HISTORY', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On July 26, 1953, Fidel Castro, who had been involved in increasingly violent political activity before Batista\'s coup, led a failed attack on the Moncada army barracks in Santiago de Cuba in which more than 100 died.',
        lang: 'en',
        cite: {
          source: 'state-dept-background-note-cuba-2008',
          loc: { section: 'HISTORY', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://web.archive.org/web/2009/https://www.state.gov/r/pa/ei/bgn/2886.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1959-01-01' },
            cites: [
              {
                source: 'eisenhower-library-presidential-years',
                loc: { section: 'Presidential Years' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'January 1, 1959: Fidel Castro\'s guerilla forces overthrow the Batista regime in Cuba.',
        lang: 'en',
        cite: {
          source: 'eisenhower-library-presidential-years',
          loc: { section: 'Presidential Years' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.eisenhowerlibrary.gov/eisenhowers/presidential-years'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Fidel_Castro_and_Christian_Herter.jpg/1280px-Fidel_Castro_and_Christian_Herter.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Fidel_Castro_and_Christian_Herter.jpg',
    credit: { institution: 'Library of Congress', creator: 'Warren K. Leffler' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'guevara-2006-pasajes-de-la-guerra-revolucionaria',
      perspective: 'latin-american'
    }
  ]
})
