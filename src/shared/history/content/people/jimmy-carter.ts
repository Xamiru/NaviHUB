import { definePerson } from '../../schema'

export default definePerson({
  id: 'jimmy-carter',
  names: [
    { text: 'Jimmy Carter', lang: 'en', role: 'primary' },
    {
      text: 'James Earl Carter, Jr.',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'carter-library-jimmy-carter', loc: { section: 'Jimmy Carter', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1924-10-01' },
        cites: [
          {
            source: 'carter-library-jimmy-carter',
            loc: { section: 'Jimmy Carter', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2024-12-29' },
        cites: [
          {
            source: 'carter-library-jimmy-carter',
            loc: { section: 'Jimmy Carter', para: '15' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'president of the United States',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1977-01-20' },
            cites: [
              {
                source: 'carter-library-jimmy-carter',
                loc: { section: 'Jimmy Carter', para: '6' }
              },
              { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '44' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1981-01-20' },
            cites: [
              {
                source: 'carter-library-jimmy-carter',
                loc: { section: 'Jimmy Carter', para: '6' }
              },
              { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '44' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'carter-library-jimmy-carter', loc: { section: 'Jimmy Carter', para: '6' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Jimmy_Carter%2C_official_portrait.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jimmy_Carter,_official_portrait.jpg',
    credit: {
      institution: 'Library of Congress, Prints and Photographs Division',
      creator: 'White House'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Jimmy Carter (James Earl Carter, Jr.), thirty-ninth president of the United States, was born October 1, 1924, in the small farming town of Plains, Georgia, and grew up in the nearby community of Archery.',
          lang: 'en',
          cite: {
            source: 'carter-library-jimmy-carter',
            loc: { section: 'Jimmy Carter', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.jimmycarterlibrary.gov/the-carters/jimmy-carter'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Jimmy Carter served as president from January 20, 1977 to January 20, 1981. Significant foreign policy accomplishments of his administration included the Panama Canal treaties, the Camp David Accords, the treaty of peace between Egypt and Israel, the SALT II treaty with the Soviet Union, and the establishment of U.S. diplomatic relations with the People’s Republic of China.',
          lang: 'en',
          cite: {
            source: 'carter-library-jimmy-carter',
            loc: { section: 'Jimmy Carter', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.jimmycarterlibrary.gov/the-carters/jimmy-carter'
          }
        },
        {
          id: 'q3',
          text: 'President Carter and the U.S. Government played leading roles in creating the opportunity for this agreement to occur.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-camp-david',
            loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/camp-david'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'On December 10, 2002, the Norwegian Nobel Committee awarded the Nobel Peace Prize for 2002 to Mr. Carter “for his decades of untiring effort to find peaceful solutions to international conflicts, to advance democracy and human rights, and to promote economic and social development”.',
          lang: 'en',
          cite: {
            source: 'carter-library-jimmy-carter',
            loc: { section: 'Jimmy Carter', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.jimmycarterlibrary.gov/the-carters/jimmy-carter'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'Jimmy Carter died peacefully in his home in Plains, Georgia December 29, 2024.',
          lang: 'en',
          cite: {
            source: 'carter-library-jimmy-carter',
            loc: { section: 'Jimmy Carter', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.jimmycarterlibrary.gov/the-carters/jimmy-carter'
          }
        }
      ]
    }
  ]
})
