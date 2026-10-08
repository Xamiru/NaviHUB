import { definePerson } from '../../schema'

export default definePerson({
  id: 'lyndon-b-johnson',
  names: [
    { text: 'Lyndon B. Johnson', lang: 'en', role: 'primary' },
    { text: 'Lyndon Baines Johnson', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1908-08-27' },
        cites: [
          {
            source: 'house-bioguide-johnson-lyndon-baines',
            loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
          },
          {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1973-01-22' },
        cites: [
          {
            source: 'house-bioguide-johnson-lyndon-baines',
            loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
          },
          {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '104' }
          }
        ]
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
            value: { d: '1963-11-22' },
            cites: [
              {
                source: 'house-bioguide-johnson-lyndon-baines',
                loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1969-01-20' },
            cites: [
              {
                source: 'house-bioguide-johnson-lyndon-baines',
                loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'house-bioguide-johnson-lyndon-baines',
          loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
        }
      ]
    },
    {
      title: 'Vice President of the United States',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1961-01-20' },
            cites: [
              {
                source: 'house-bioguide-johnson-lyndon-baines',
                loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
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
                source: 'house-bioguide-johnson-lyndon-baines',
                loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'house-bioguide-johnson-lyndon-baines',
          loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
        }
      ]
    },
    {
      title: 'United States Senator from Texas',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1949-01-03' },
            cites: [
              {
                source: 'house-bioguide-johnson-lyndon-baines',
                loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1961-01-03' },
            cites: [
              {
                source: 'house-bioguide-johnson-lyndon-baines',
                loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'house-bioguide-johnson-lyndon-baines',
          loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/37_Lyndon_Johnson_3x4.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:37_Lyndon_Johnson_3x4.jpg',
    credit: {
      institution: 'Lyndon Baines Johnson Presidential Library and Museum',
      creator: 'Arnold Newman'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Lyndon Baines Johnson was born just after the turn of the 20th century in the rugged and isolated Hill Country of Texas. It was a character-building, hardscrabble land where he learned the lessons of loyalty, the arts of persuasion and power, and the insecurity of lean times.',
          lang: 'en',
          cite: {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.lbjlibrary.org/life-and-legacy/the-man-himself/biography'
          }
        },
        {
          id: 'q2',
          text: 'A Representative and a Senator from Texas and a Vice President and 36th President of the United States',
          lang: 'en',
          cite: {
            source: 'house-bioguide-johnson-lyndon-baines',
            loc: { section: 'JOHNSON, Lyndon Baines', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.house.gov/People/Listing/J/JOHNSON,-Lyndon-Baines-(J000160)/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'On August 27, 1908, the future president was born the first child of Sam Ealy Johnson, Jr. and Rebekah Baines Johnson, former teachers turned farmers. The family\'s small farmhouse on the Pedernales River near Stonewall had no electricity or running water.',
          lang: 'en',
          cite: {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.lbjlibrary.org/life-and-legacy/the-man-himself/biography'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'LBJ\'s political ambition and deal-making prowess were on full display in the Senate, where he served for 12 years. Within three years, he was elected Democratic whip, and in 1953 became Democratic minority leader. In 1954, as Democrats won a majority, LBJ was re-elected to the Senate by a three-to-one margin. He made his mark for the next six years as majority leader, the most powerful Senate post.',
          lang: 'en',
          cite: {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '62' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.lbjlibrary.org/life-and-legacy/the-man-himself/biography'
          }
        },
        {
          id: 'q5',
          text: 'Kennedy then asked LBJ to be his vice-presidential running mate, a strategic move to garner support in the South. Kennedy and LBJ defeated the Richard Nixon-Henry Cabot Lodge, Jr. GOP ticket in one of the closest elections in American history.',
          lang: 'en',
          cite: {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '73' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.lbjlibrary.org/life-and-legacy/the-man-himself/biography'
          }
        },
        {
          id: 'q6',
          text: 'Shortly after assuming the Presidency, Johnson used his legislative prowess to pass two bills that Kennedy had endorsed but was unable to get through Congress at the time of his death: a tax cut and a civil rights act. The latter, which would become the Civil Rights Act of 1964, became the first effective civil rights law since Reconstruction, outlawing segregation and discrimination throughout American society.',
          lang: 'en',
          cite: {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '81' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.lbjlibrary.org/life-and-legacy/the-man-himself/biography'
          }
        },
        {
          id: 'q7',
          text: 'Johnson\'s Great Society also included the continued advancement of civil rights. He realized the passage of the Voting Rights Act of 1965, which removed poll taxes and tests that represented an obstacle to the ballot among many Americans of color, and the Civil Rights Act of 1968, preventing discrimination in housing sales and rentals.',
          lang: 'en',
          cite: {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '88' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.lbjlibrary.org/life-and-legacy/the-man-himself/biography'
          }
        },
        {
          id: 'q8',
          text: 'Controversy and protests over the war—and Johnson—had become acute by the end of March 1968, when Johnson limited the bombing of North Vietnam in order to initiate peace negotiations. At the same time, he startled the world by withdrawing as a candidate for re-election so that he might devote his full efforts, unimpeded by politics, to the quest to strike an honorable peace.',
          lang: 'en',
          cite: {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '97' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.lbjlibrary.org/life-and-legacy/the-man-himself/biography'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'When Johnson left office, peace talks were underway. He died suddenly of a heart attack at his Texas ranch on January 22, 1973.',
          lang: 'en',
          cite: {
            source: 'lbj-library-biography-lyndon-b-johnson',
            loc: { section: 'Biography', para: '104' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.lbjlibrary.org/life-and-legacy/the-man-himself/biography'
          }
        }
      ]
    }
  ]
})
