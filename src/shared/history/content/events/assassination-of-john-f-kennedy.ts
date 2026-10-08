import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-john-f-kennedy',
  names: [
    { text: 'Assassination of John F. Kennedy', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1963-11-22' },
        cites: [
          {
            source: 'warren-commission-1964-report',
            loc: { section: 'Chapter 1: Summary and Conclusions', para: '1' }
          },
          {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:dallas',
      cites: [
        {
          source: 'warren-commission-1964-report',
          loc: { section: 'Chapter 1: Summary and Conclusions', para: '3' }
        },
        {
          source: 'hsca-1979-report',
          loc: { section: 'Summary of Findings and Recommendations', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      ref: 'person:john-f-kennedy',
      role: 'victim',
      cites: [
        {
          source: 'warren-commission-1964-report',
          loc: { section: 'Chapter 1: Summary and Conclusions', para: '1' }
        }
      ]
    },
    {
      name: 'Lee Harvey Oswald',
      role: 'perpetrator',
      cites: [
        {
          source: 'warren-commission-1964-report',
          loc: { section: 'Chapter 1: Summary and Conclusions', para: '110' }
        },
        {
          source: 'hsca-1979-report',
          loc: { section: 'Summary of Findings and Recommendations', para: '2' }
        }
      ]
    },
    {
      name: 'John B. Connally, Jr.',
      role: 'victim',
      cites: [
        {
          source: 'warren-commission-1964-report',
          loc: { section: 'Chapter 1: Summary and Conclusions', para: '110' }
        }
      ]
    },
    {
      ref: 'person:lyndon-b-johnson',
      role: 'witness',
      cites: [
        {
          source: 'warren-commission-1964-report',
          loc: { section: 'Chapter 1: Summary and Conclusions', para: '9' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:civil-rights-act-of-1964', rel: 'related' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Lyndon_B._Johnson_taking_the_oath_of_office%2C_November_1963.jpg/1280px-Lyndon_B._Johnson_taking_the_oath_of_office%2C_November_1963.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lyndon_B._Johnson_taking_the_oath_of_office,_November_1963.jpg',
    credit: { institution: 'LBJ Library', creator: 'Cecil W. Stoughton' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'THE ASSASSINATION of John Fitzgerald Kennedy on November 22, 1963, was a cruel and shocking act of violence directed against a man, a family, a nation, and against all mankind.',
          lang: 'en',
          cite: {
            source: 'warren-commission-1964-report',
            loc: { section: 'Chapter 1: Summary and Conclusions', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
          }
        },
        {
          id: 'q2',
          text: 'For two days in late November 1963, President John F. Kennedy lay in state in the Rotunda of the U.S. Capitol, not long after he was shot and killed in Dallas, Texas.',
          lang: 'en',
          cite: {
            source: 'house-history-honoring-president-john-f-kennedy',
            loc: { section: 'Honoring President John F. Kennedy', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.house.gov/Historical-Highlights/1951-2000/Honoring-President-John-F--Kennedy/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At 11:40 a.m.., c.s.t., on Friday, November 22, 1963, President John F. Kennedy, Mrs. Kennedy, and their party arrived at Love Field, Dallas, Tex.',
          lang: 'en',
          cite: {
            source: 'warren-commission-1964-report',
            loc: { section: 'Chapter 1: Summary and Conclusions', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
          }
        },
        {
          id: 'q4',
          text: 'The Dallas motorcade, it was hoped, would evoke a demonstration of the President\'s personal popularity in a city which he had lost in the 1960 election.',
          lang: 'en',
          cite: {
            source: 'warren-commission-1964-report',
            loc: { section: 'Chapter 1: Summary and Conclusions', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'As the President\'s car approached the intersection of Houston and Elm Streets, there loomed directly ahead on the intersection\'s northwest corner a seven-story, orange brick warehouse and office building, the Texas School Book Depository.',
          lang: 'en',
          cite: {
            source: 'warren-commission-1964-report',
            loc: { section: 'Chapter 1: Summary and Conclusions', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'On November 24, an estimated 300,000 mourners had lined the 1.8 miles from the White House to the Capitol to pay their respects as the procession carrying Kennedy’s body traveled slowly down Pennsylvania Avenue.',
          lang: 'en',
          cite: {
            source: 'house-history-honoring-president-john-f-kennedy',
            loc: { section: 'Honoring President John F. Kennedy', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.house.gov/Historical-Highlights/1951-2000/Honoring-President-John-F--Kennedy/'
          }
        },
        {
          id: 'q7',
          text: 'A second procession carried Kennedy’s casket to the Cathedral of St. Matthew in Northwest Washington later that day. Kennedy, a naval officer during World War II, was interred at Arlington National Cemetery that afternoon.',
          lang: 'en',
          cite: {
            source: 'house-history-honoring-president-john-f-kennedy',
            loc: { section: 'Honoring President John F. Kennedy', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.house.gov/Historical-Highlights/1951-2000/Honoring-President-John-F--Kennedy/'
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
            value: { d: '1963-11-22' },
            cites: [
              {
                source: 'warren-commission-1964-report',
                loc: { section: 'Chapter 1: Summary and Conclusions', para: '18' }
              },
              {
                source: 'house-bioguide-kennedy-john-fitzgerald',
                loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'At l p.m., after all heart activity ceased and the Last Rites were administered by a priest, President Kennedy was pronounced dead.',
        lang: 'en',
        cite: {
          source: 'warren-commission-1964-report',
          loc: { section: 'Chapter 1: Summary and Conclusions', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1963-11-22' },
            cites: [
              {
                source: 'warren-commission-1964-report',
                loc: { section: 'Chapter 1: Summary and Conclusions', para: '19' }
              },
              {
                source: 'house-bioguide-johnson-lyndon-baines',
                loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'At 2:38 p.m., in the central compartment of the plane, Lyndon B. Johnson was sworn in as the 36th President of the United States by Federal District Court Judge Sarah T. Hughes.',
        lang: 'en',
        cite: {
          source: 'warren-commission-1964-report',
          loc: { section: 'Chapter 1: Summary and Conclusions', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1963-11-24' },
            cites: [
              {
                source: 'warren-commission-1964-report',
                loc: { section: 'Chapter 1: Summary and Conclusions', para: '130' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The man who killed Oswald was Jack Ruby.',
        lang: 'en',
        cite: {
          source: 'warren-commission-1964-report',
          loc: { section: 'Chapter 1: Summary and Conclusions', para: '92' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1963-11-29' },
            cites: [
              {
                source: 'warren-commission-1964-report',
                loc: { section: 'Chapter 1: Summary and Conclusions', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'This Commission was created on November 29, 1963, in recognition of the right of people everywhere to full and truthful knowledge concerning these events.',
        lang: 'en',
        cite: {
          source: 'warren-commission-1964-report',
          loc: { section: 'Chapter 1: Summary and Conclusions', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
        }
      }
    }
  ],
  archive: [
    {
      id: 'universal-newsreel-1963-11-24',
      mediaKind: 'video',
      title: 'Universal Newsreel Volume 36, Release 96, 11/24/1963',
      date: { d: '1963-11-24' },
      url: 'https://archive.org/download/UniversalNewsreelVolume36Release9611-24-1963/Universal%20Newsreel%20Volume%2036%20Release%2096%2011-24-1963.mp4',
      page: 'https://archive.org/details/UniversalNewsreelVolume36Release9611-24-1963',
      credit: { institution: 'Universal Newsreels (Internet Archive)', creator: 'Universal' },
      license: { id: 'public-domain' },
      bytes: 41937013,
      durationSec: 403
    },
    {
      id: 'hsca-report-1979',
      mediaKind: 'document',
      title: 'Report of the Select Committee on Assassinations, U.S. House of Representatives, Ninety-fifth Congress, second session : findings and recommendations',
      date: { d: '1979' },
      url: 'https://archive.org/download/reportofselectco1979unit/reportofselectco1979unit.pdf',
      page: 'https://archive.org/details/reportofselectco1979unit',
      credit: { institution: 'Boston Public Library (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 54722881
    }
  ]
})
