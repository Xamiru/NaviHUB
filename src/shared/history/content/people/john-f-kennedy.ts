import { definePerson } from '../../schema'

export default definePerson({
  id: 'john-f-kennedy',
  names: [
    { text: 'John F. Kennedy', lang: 'en', role: 'primary' },
    { text: 'John Fitzgerald Kennedy', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1917-05-29' },
        cites: [
          {
            source: 'house-bioguide-kennedy-john-fitzgerald',
            loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1963-11-22' },
        cites: [
          {
            source: 'house-bioguide-kennedy-john-fitzgerald',
            loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
          },
          {
            source: 'warren-commission-1964-report',
            loc: { section: 'Chapter 1: Summary and Conclusions', para: '1' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:dallas',
    cites: [
      {
        source: 'house-bioguide-kennedy-john-fitzgerald',
        loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1961-01-20' },
            cites: [
              {
                source: 'house-bioguide-kennedy-john-fitzgerald',
                loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1963-11-22' },
            cites: [
              {
                source: 'house-bioguide-kennedy-john-fitzgerald',
                loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'house-bioguide-kennedy-john-fitzgerald',
          loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
        }
      ]
    },
    {
      title: 'United States Senator from Massachusetts',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1953-01-03' },
            cites: [
              {
                source: 'house-bioguide-kennedy-john-fitzgerald',
                loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1960-12-22' },
            cites: [
              {
                source: 'house-bioguide-kennedy-john-fitzgerald',
                loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'house-bioguide-kennedy-john-fitzgerald',
          loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
        }
      ]
    },
    {
      title: 'United States Representative from Massachusetts',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1947-01-03' },
            cites: [
              {
                source: 'house-bioguide-kennedy-john-fitzgerald',
                loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1953-01-03' },
            cites: [
              {
                source: 'house-bioguide-kennedy-john-fitzgerald',
                loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'house-bioguide-kennedy-john-fitzgerald',
          loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Portrait_Photograph%2C_President_John_F._Kennedy._White_House%2C_07-11-1963_-_NARA_-_194255.tif/lossy-page1-1280px-Portrait_Photograph%2C_President_John_F._Kennedy._White_House%2C_07-11-1963_-_NARA_-_194255.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_Photograph,_President_John_F._Kennedy._White_House,_07-11-1963_-_NARA_-_194255.tif',
    credit: {
      institution: 'U.S. National Archives and Records Administration',
      creator: 'Cecil Stoughton'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'President John F. Kennedy assumed office on January 20, 1961, following an eight-year career in the Senate. The first Catholic president, Kennedy was also the second youngest to ever serve in the office.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-1961-1968-foreword',
            loc: {
              section: '1961–1968: The Presidencies of John F. Kennedy and Lyndon B. Johnson',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/foreword'
          }
        },
        {
          id: 'q2',
          text: 'A Representative and a Senator from Massachusetts and 35th President of the United States',
          lang: 'en',
          cite: {
            source: 'house-bioguide-kennedy-john-fitzgerald',
            loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://history.house.gov/People/Detail/7707' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'during the Second World War served as a lieutenant in the United States Navy 1941-1945; PT boat commander in the South Pacific',
          lang: 'en',
          cite: {
            source: 'house-bioguide-kennedy-john-fitzgerald',
            loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://history.house.gov/People/Detail/7707' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'elected thirty-fifth President of the United States in 1960, and was inaugurated on January 20, 1961',
          lang: 'en',
          cite: {
            source: 'house-bioguide-kennedy-john-fitzgerald',
            loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://history.house.gov/People/Detail/7707' }
        },
        {
          id: 'q5',
          text: 'One month later, on May 25, 1961, Kennedy addressed a joint session of Congress to announce the goal of putting an American on the moon by 1970.',
          lang: 'en',
          cite: {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.lbjlibrary.org/life-and-legacy/the-man-himself/biography'
          }
        },
        {
          id: 'q6',
          text: 'A week after his speech, Kennedy submitted a bill to Congress addressing civil rights (H.R. 7152).',
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
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'died in Dallas, Tex., November 22, 1963, from the effects of an assassin\'s bullet',
          lang: 'en',
          cite: {
            source: 'house-bioguide-kennedy-john-fitzgerald',
            loc: { section: 'KENNEDY, John Fitzgerald', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://history.house.gov/People/Detail/7707' }
        },
        {
          id: 'q8',
          text: 'Kennedy’s wife, Jacqueline, their two children Caroline and John, the President’s brother, Attorney General Robert Kennedy, and other family members, alongside President Lyndon B. Johnson and the First Lady, Lady Bird Johnson, listened as Senate Majority Leader Mike Mansfield, House Speaker John McCormack, and Chief Justice Earl Warren eulogized the 46-year-old Commander in Chief.',
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
  ]
})
