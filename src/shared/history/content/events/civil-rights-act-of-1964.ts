import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'civil-rights-act-of-1964',
  names: [
    { text: 'Civil Rights Act of 1964', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1964-07-02' },
        cites: [
          {
            source: 'nara-milestone-civil-rights-act',
            loc: { section: 'Civil Rights Act (1964)', para: '1' }
          },
          {
            source: 'nps-civil-rights-act-of-1964',
            loc: { section: 'Civil Rights Act of 1964', para: '20' }
          },
          {
            source: 'house-history-civil-rights-act-of-1964',
            loc: { section: 'The Civil Rights Act of 1964', para: '3' }
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
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      ref: 'person:lyndon-b-johnson',
      role: 'signatory',
      cites: [
        {
          source: 'nara-milestone-civil-rights-act',
          loc: { section: 'Civil Rights Act (1964)', para: '1' }
        },
        {
          source: 'house-history-civil-rights-act-of-1964',
          loc: { section: 'The Civil Rights Act of 1964', para: '3' }
        }
      ]
    },
    {
      ref: 'person:john-f-kennedy',
      role: 'participant',
      cites: [
        {
          source: 'nps-civil-rights-act-of-1964',
          loc: { section: 'Civil Rights Act of 1964', para: '12' }
        }
      ]
    },
    {
      ref: 'person:martin-luther-king-jr',
      role: 'witness',
      cites: [
        {
          source: 'nps-civil-rights-act-of-1964',
          loc: { section: 'Civil Rights Act of 1964', para: '20' }
        },
        {
          source: 'house-history-civil-rights-act-of-1964',
          loc: { section: 'The Civil Rights Act of 1964', para: '3' }
        }
      ]
    },
    {
      name: 'Everett Dirksen',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-civil-rights-act',
          loc: { section: 'Civil Rights Act (1964)', para: '5' }
        },
        {
          source: 'nps-civil-rights-act-of-1964',
          loc: { section: 'Civil Rights Act of 1964', para: '19' }
        }
      ]
    },
    {
      name: 'Hubert Humphrey',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-civil-rights-act',
          loc: { section: 'Civil Rights Act (1964)', para: '5' }
        }
      ]
    },
    {
      name: 'Emanuel Celler',
      role: 'participant',
      cites: [
        {
          source: 'house-history-civil-rights-act-of-1964',
          loc: { section: 'The Civil Rights Act of 1964', para: '4' }
        }
      ]
    },
    {
      name: 'William McCulloch',
      role: 'participant',
      cites: [
        {
          source: 'house-history-civil-rights-act-of-1964',
          loc: { section: 'The Civil Rights Act of 1964', para: '4' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:march-on-washington', rel: 'related' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Lyndon_Johnson_signing_Civil_Rights_Act%2C_July_2%2C_1964.jpg/1280px-Lyndon_Johnson_signing_Civil_Rights_Act%2C_July_2%2C_1964.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lyndon_Johnson_signing_Civil_Rights_Act,_July_2,_1964.jpg',
    credit: { institution: 'LBJ Library', creator: 'Cecil Stoughton' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Civil Rights Act of 1964 was the nation\'s premier civil rights legislation. The Act outlawed discrimination on the basis of race, color, religion, sex, or national origin, required equal access to public places and employment, and enforced desegregation of schools and the right to vote.',
          lang: 'en',
          cite: {
            source: 'nps-civil-rights-act-of-1964',
            loc: { section: 'Civil Rights Act of 1964', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/civil-rights-act.htm'
          }
        },
        {
          id: 'q2',
          text: 'It was the most sweeping civil rights legislation since Reconstruction.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-civil-rights-act',
            loc: { section: 'Civil Rights Act (1964)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/civil-rights-act'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In response to the report of the United States Commission on Civil Rights, President John F. Kennedy proposed, in a nationally televised address, a Civil Rights Act of 1963. A week after his speech, Kennedy submitted a bill to Congress addressing civil rights (H.R. 7152).',
          lang: 'en',
          cite: {
            source: 'nps-civil-rights-act-of-1964',
            loc: { section: 'Civil Rights Act of 1964', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/civil-rights-act.htm'
          }
        },
        {
          id: 'q4',
          text: '1963 was a crucial year for the Civil Rights Movement. Social pressures continued to build with events such as the Birmingham Campaign, televised clashes between peaceful protesters and authorities, the murders of civil rights workers Medgar Evers and William L. Moore, the March on Washington, and the deaths of four young girls in the bombing of Birmingham\'s 16th Street Baptist Church. There was no turning back. Civil rights were firmly on the national agenda and the federal government was forced to respond.',
          lang: 'en',
          cite: {
            source: 'nps-civil-rights-act-of-1964',
            loc: { section: 'Civil Rights Act of 1964', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/civil-rights-act.htm'
          }
        },
        {
          id: 'q5',
          text: 'Following Kennedy\'s assassination in November 1963, both Martin Luther King, Jr. and newly inaugurated President Lyndon B. Johnson continued to press for passage of the bill',
          lang: 'en',
          cite: {
            source: 'nps-civil-rights-act-of-1964',
            loc: { section: 'Civil Rights Act of 1964', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/civil-rights-act.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Passage of the act was not easy, however. Opposition in the House of Representatives bottled up the bill in the House Rules Committee. In the Senate, Southern Democratic opponents attempted to talk the bill to death in a filibuster. In early 1964, House supporters overcame the Rules Committee obstacle by threatening to send the bill to the floor without committee approval. The Senate filibuster was overcome through the floor leadership of Senator Hubert Humphrey of Minnesota, the considerable support of President Lyndon Johnson, and the efforts of Senate Minority Leader Everett Dirksen of Illinois, who convinced enough Republicans to support the bill over Democratic opposition. When the compromise bill was finally put to a vote in the Senate, it passed 73 to 27.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-civil-rights-act',
            loc: { section: 'Civil Rights Act (1964)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/civil-rights-act'
          }
        },
        {
          id: 'q7',
          text: 'Opponents launched the longest filibuster in American history, which lasted 57 days and brought the Senate to a virtual standstill.',
          lang: 'en',
          cite: {
            source: 'nps-civil-rights-act-of-1964',
            loc: { section: 'Civil Rights Act of 1964', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/civil-rights-act.htm'
          }
        },
        {
          id: 'q8',
          text: 'President Lyndon B. Johnson signed P.L. 88–352 only a few hours after its overwhelming approval in the House, 289 to 126. “Let us close the springs of racial poison,” the President urged with much fanfare during the nationally televised signing of the historic legislation.',
          lang: 'en',
          cite: {
            source: 'house-history-civil-rights-act-of-1964',
            loc: { section: 'The Civil Rights Act of 1964', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.house.gov/Historical-Highlights/1951-2000/The-Civil-Rights-Act-of-1964/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The act outlawed segregation in businesses such as theaters, restaurants, and hotels. It banned discriminatory practices in employment and ended segregation in public places such as swimming pools, libraries, and public schools.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-civil-rights-act',
            loc: { section: 'Civil Rights Act (1964)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/civil-rights-act'
          }
        },
        {
          id: 'q10',
          text: 'Title VII of the act created the Equal Employment Opportunity Commission (EEOC) to implement the law.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-civil-rights-act',
            loc: { section: 'Civil Rights Act (1964)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/civil-rights-act'
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
            value: { d: '1964-02-10' },
            cites: [
              {
                source: 'nps-civil-rights-act-of-1964',
                loc: { section: 'Civil Rights Act of 1964', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The House of Representatives debated H.R. 7152 for nine days, rejecting nearly 100 amendments designed to weaken the bill. It passed the House on February 10, 1964 after 70 days of public hearings, appearances by 275 witnesses, and 5,792 pages of published testimony.',
        lang: 'en',
        cite: {
          source: 'nps-civil-rights-act-of-1964',
          loc: { section: 'Civil Rights Act of 1964', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.nps.gov/articles/civil-rights-act.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1964-07-02' },
            cites: [
              {
                source: 'nps-civil-rights-act-of-1964',
                loc: { section: 'Civil Rights Act of 1964', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Within hours of its passage on July 2, 1964, on what would have been the 39th birthday of civil rights activist Medgar Evers and with Martin Luther King, Jr., Dorothy Height, Roy Wilkins, John Lewis, and other civil rights leaders in attendance, President Lyndon B. Johnson signed the bill into law, declaring once and for all that discrimination for any reason on the basis of race, color, religion, sex, or national origin was illegal in the United States of America.',
        lang: 'en',
        cite: {
          source: 'nps-civil-rights-act-of-1964',
          loc: { section: 'Civil Rights Act of 1964', para: '20' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.nps.gov/articles/civil-rights-act.htm'
        }
      }
    }
  ],
  archive: [
    {
      id: 'civil-rights-act-of-1964-enrolled',
      mediaKind: 'document',
      title: 'Civil Rights Act of 1964',
      date: { d: '1964-07-02' },
      url: 'https://www.archives.gov/files/milestone-documents/images/doc-097-big.jpg',
      page: 'https://catalog.archives.gov/id/299891',
      credit: { institution: 'National Archives and Records Administration' },
      license: { id: 'public-domain' },
      bytes: 57418
    }
  ]
})
