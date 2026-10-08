import { definePerson } from '../../schema'

export default definePerson({
  id: 'henry-kissinger',
  names: [
    { text: 'Henry Kissinger', lang: 'en', role: 'primary' },
    {
      text: 'Heinz Alfred Kissinger',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'state-dept-people-kissinger-henry-a',
          loc: { section: 'Introduction', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1923' },
        cites: [
          {
            source: 'state-dept-people-kissinger-henry-a',
            loc: { section: 'Introduction', para: '14' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2023' },
        cites: [
          {
            source: 'state-dept-people-kissinger-henry-a',
            loc: { section: 'Introduction', para: '15' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['diplomat', 'scholar'],
  offices: [
    {
      title: 'secretary of state',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1973-09-21' },
            cites: [
              {
                source: 'state-dept-people-kissinger-henry-a',
                loc: { section: 'Introduction', para: '19' }
              },
              { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '154' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1977-01-20' },
            cites: [
              {
                source: 'state-dept-people-kissinger-henry-a',
                loc: { section: 'Introduction', para: '21' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'state-dept-people-kissinger-henry-a',
          loc: { section: 'Introduction', para: '1' }
        }
      ]
    },
    {
      title: 'national security advisor',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1969-01-20' },
            cites: [
              {
                source: 'state-dept-people-kissinger-henry-a',
                loc: { section: 'Introduction', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1975-11-03' },
            cites: [
              {
                source: 'state-dept-people-kissinger-henry-a',
                loc: { section: 'Introduction', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'state-dept-people-kissinger-henry-a',
          loc: { section: 'Introduction', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Photograph_of_Secretary_of_State_Henry_A._Kissinger_Using_the_Telephone_in_Deputy_National_Security_Advisor_Brent..._-_NARA_-_186804.tif/lossy-page1-1280px-Photograph_of_Secretary_of_State_Henry_A._Kissinger_Using_the_Telephone_in_Deputy_National_Security_Advisor_Brent..._-_NARA_-_186804.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Photograph_of_Secretary_of_State_Henry_A._Kissinger_Using_the_Telephone_in_Deputy_National_Security_Advisor_Brent..._-_NARA_-_186804.tif',
    credit: {
      institution: 'Gerald R. Ford Presidential Library and Museum',
      creator: 'David Hume Kennerly'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Henry Alfred Kissinger was appointed Secretary of State on September 21 by President Richard M. Nixon and served in the position from September 23, 1973 to January 20, 1977. With his appointment, he became the first person ever to serve as both Secretary of State and National Security Adviser, a position he had held since President Nixon was sworn into office on January 20, 1969.',
          lang: 'en',
          cite: {
            source: 'state-dept-people-kissinger-henry-a',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/departmenthistory/people/kissinger-henry-a'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Kissinger was born as Heinz Alfred Kissinger in Germany. After the Nazis seized power, state sanctioned anti-Semitism made life for the Kissinger family, which was Jewish, very difficult. In 1938, Kissinger’s family immigrated to the United States and settled in New York, and Kissinger’s name was changed to Henry.',
          lang: 'en',
          cite: {
            source: 'state-dept-people-kissinger-henry-a',
            loc: { section: 'Introduction', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/departmenthistory/people/kissinger-henry-a'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Kissinger entered the State Department just two weeks before Egypt and Syria launched a surprise attack on Israel. The October War of 1973 played a major role in shaping Kissinger’s tenure as Secretary. First, he worked to ensure Israel received an airlift of U.S. military supplies. This airlift helped Israel turn the war in Israel’s favor, and it also led members of the Organization of Petroleum Exporting Countries (OPEC) to initiate an oil embargo against the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-people-kissinger-henry-a',
            loc: { section: 'Introduction', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/departmenthistory/people/kissinger-henry-a'
          }
        },
        {
          id: 'q4',
          text: 'Kissinger also played a major role in the negotiations leading to the August 1975 Helsinki Accord, an agreement signed by 35 countries and addressing many issues that promised to improve relations between East and West.',
          lang: 'en',
          cite: {
            source: 'state-dept-people-kissinger-henry-a',
            loc: { section: 'Introduction', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/departmenthistory/people/kissinger-henry-a'
          }
        },
        {
          id: 'q5',
          text: 'Kissinger’s tenure as Secretary comprised many controversial issues, including his role in influencing U.S. policies towards countries such as Chile and Angola.',
          lang: 'en',
          cite: {
            source: 'state-dept-people-kissinger-henry-a',
            loc: { section: 'Introduction', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/departmenthistory/people/kissinger-henry-a'
          }
        }
      ]
    }
  ]
})
