import { definePerson } from '../../schema'

export default definePerson({
  id: 'philip-ii',
  names: [
    { text: 'Philip II of Spain', lang: 'en', role: 'primary' },
    {
      text: 'Philip II',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'Charles V and Philip II', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1527-05-21' },
        cites: [
          {
            source: 'britannica-1911-philip-ii-of-spain',
            loc: { section: 'Philip II. of Spain', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1598-09-13' },
        cites: [
          {
            source: 'britannica-1911-philip-ii-of-spain',
            loc: { section: 'Philip II. of Spain', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'latin-america'],
  roles: ['monarch'],
  offices: [
    {
      title: 'King of Spain',
      polity: 'polity:spanish-empire',
      start: {
        alts: [
          {
            value: { d: '1556' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'Charles V and Philip II', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1598' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'Charles V and Philip II', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'Charles V and Philip II', para: '3' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Philip_II_portrait_by_Titian.jpg/1280px-Philip_II_portrait_by_Titian.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Philip_II_portrait_by_Titian.jpg',
    credit: { creator: 'Titian' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Philip II was a Castilian by education and temperament.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q2',
          text: 'He governed his scattered dominions through a system of councils, such as the Council of the Indies, which were staffed by professional civil servants whose activities were coordinated by the Council of State, which was responsible to Philip.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Every decision was Philip\'s; every question required his answer; every document needed his signature.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q4',
          text: 'On the 7th of October was fought the naval battle of Lepanto, which broke for ever the tradition of the invincibility of the Turks at sea.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1376' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q5',
          text: 'Spanish fleets defeated the Turks at Malta (1565) and at Lepanto (1572)--events celebrated even in hostile England.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/spain/8.htm' }
        },
        {
          id: 'q6',
          text: 'But the repulse of the great Spanish armament was an event of the first historical importance.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'He bore the acute agony of the disease which killed him with manly patience, and he died piously at the Escorial on the 13th of September 1598.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-philip-ii-of-spain',
            loc: { section: 'Philip II. of Spain', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Philip_II._of_Spain'
          }
        }
      ]
    }
  ]
})
