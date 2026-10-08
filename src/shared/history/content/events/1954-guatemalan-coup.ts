import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1954-guatemalan-coup',
  names: [
    { text: '1954 Guatemalan coup', lang: 'en', role: 'primary' },
    { text: 'Golpe de Estado en Guatemala de 1954', lang: 'es', role: 'native' },
    {
      text: 'Operation PBSUCCESS',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
          loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1954-06-18' },
        cites: [
          {
            source: 'frus-1952-1954-v04-american-republics',
            loc: { section: 'Document 473. Editorial Note', para: '1' }
          },
          {
            source: 'frus-1952-1954-guatemala',
            loc: { section: 'Document 202. Editorial Note', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1954-06-27' },
        cites: [
          {
            source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
            loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'north-america'],
  prominence: 2,
  places: [
    { ref: 'place:guatemala-city' }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      name: 'Jacobo Arbenz Guzmán',
      role: 'victim',
      cites: [
        { source: 'frus-1952-1954-guatemala', loc: { section: 'Preface', para: '5' } }
      ]
    },
    {
      name: 'Carlos Castillo Armas',
      role: 'leader',
      cites: [
        {
          source: 'frus-1952-1954-v04-american-republics',
          loc: { section: 'Document 473. Editorial Note', para: '1' }
        }
      ]
    },
    {
      ref: 'person:dwight-d-eisenhower',
      role: 'head-of-state',
      cites: [
        {
          source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
          loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '4' }
        }
      ]
    },
    {
      name: 'Allen W. Dulles',
      role: 'organizer',
      cites: [
        {
          source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
          loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '23' }
        }
      ]
    },
    {
      name: 'Anastasio Somoza',
      role: 'participant',
      cites: [
        {
          source: 'frus-1952-1954-guatemala',
          loc: { section: 'Document 1. Editorial Note', para: '1' }
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
          text: 'A narrative history of the CIA\'s role in planning, organizing and executing the coup that toppled Jacobo Arbenz Guzmán on June 27, 1954.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
            loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB4/' }
        },
        {
          id: 'q2',
          text: 'The role of the Central Intelligence Agency in the ouster of Guatemala’s elected president, Jacobo Arbenz Guzmán, was not documented in the volume.',
          lang: 'en',
          cite: { source: 'frus-1952-1954-guatemala', loc: { section: 'Preface', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1952-54Guat/preface'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Arbenz was elected President of Guatemala in 1950 to continue a process of socio- economic reforms',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
            loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB4/' }
        },
        {
          id: 'q4',
          text: 'In April 1952 Nicaraguan President Anastasio Somoza visited Washington unofficially and told aides to President Harry Truman that he and Carlos Castillo Armas would be able to take care of the Guatemalan problem if they were furnished with military weapons. The prospective rebels had financial backing from Nicaragua and the Dominican Republic, as well as the United Fruit Company.',
          lang: 'en',
          cite: {
            source: 'frus-1952-1954-guatemala',
            loc: { section: 'Document 1. Editorial Note', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1952-54Guat/d1'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'PBSUCCESS, authorized by President Eisenhower in August 1953, carried a $2.7 million budget for "pychological warfare and political action" and "subversion," among the other components of a small paramilitary war.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
            loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB4/' }
        },
        {
          id: 'q6',
          text: 'On June 18, 1954, the forces of Lieutenant Colonel Carlos Castillo Armas, a Guatemalan army officer in exile, crossed the Guatemalan border from Honduras at three points in a movement aimed at overthrowing the government of President Arbenz.',
          lang: 'en',
          cite: {
            source: 'frus-1952-1954-v04-american-republics',
            loc: { section: 'Document 473. Editorial Note', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1952-54v04/d473'
          }
        },
        {
          id: 'q7',
          text: 'The attack, however, did not surprise the Guatemalan Government.',
          lang: 'en',
          cite: {
            source: 'frus-1952-1954-guatemala',
            loc: { section: 'Document 202. Editorial Note', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1952-54Guat/d202'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Although Arbenz and his top aides were able to flee the country, after the CIA installed Castillo Armas in power, hundreds of Guatemalans were rounded up and killed.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
            loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB4/' }
        },
        {
          id: 'q9',
          text: 'In the early 1990s, Directors of Central Intelligence officially acknowledged eleven covert actions during the early cold war years, including Guatemala.',
          lang: 'en',
          cite: { source: 'frus-1952-1954-guatemala', loc: { section: 'Preface', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1952-54Guat/preface'
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
            value: { d: '1954-06-18' },
            cites: [
              {
                source: 'frus-1952-1954-guatemala',
                loc: { section: 'Document 202. Editorial Note', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Castillo Armas launched his attack on June 18, 1954, at 8:20 p.m. after the “National Liberation Committee” had consulted with the “Assembly of the People” the previous evening',
        lang: 'en',
        cite: {
          source: 'frus-1952-1954-guatemala',
          loc: { section: 'Document 202. Editorial Note', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/historicaldocuments/frus1952-54Guat/d202'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1954-06-27' },
            cites: [
              {
                source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
                loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'up until the day Arbenz resigned on June 27, 1954, "the option of assassination was still being considered."',
        lang: 'en',
        cite: {
          source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
          loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB4/' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Carlos_Castillo_Armas_%28LOC_98512008%2C_low-res%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Carlos_Castillo_Armas_(LOC_98512008,_low-res).jpg',
    credit: { institution: 'Library of Congress', creator: 'Associated Press for LIFE' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'toriello-1997-la-batalla-de-guatemala', perspective: 'latin-american' },
    {
      source: 'arevalo-1954-guatemala-la-democracia-y-el-imperio',
      perspective: 'latin-american'
    }
  ]
})
