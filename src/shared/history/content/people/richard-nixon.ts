import { definePerson } from '../../schema'

export default definePerson({
  id: 'richard-nixon',
  names: [
    { text: 'Richard Nixon', lang: 'en', role: 'primary' },
    {
      text: 'Richard Milhous Nixon',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '2' } }
      ]
    }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1913-01-09' },
        cites: [
          { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '2' } },
          { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '48' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1994-04-22' },
        cites: [
          { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '49' } }
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
            value: { d: '1969-01-20' },
            cites: [
              { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '196' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1974-08-09' },
            cites: [
              { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '196' } },
              {
                source: 'nixon-library-president-nixon',
                loc: { section: 'The Life', para: '46' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '196' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Richard_Nixon_presidential_portrait_%281%29.jpg/1280px-Richard_Nixon_presidential_portrait_%281%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Richard_Nixon_presidential_portrait_(1).jpg',
    credit: {
      institution: 'U.S. National Archives and Records Administration',
      creator: 'Department of Defense, Department of the Army, Office of the Deputy Chief of Staff for Operations'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Born on January 9, 1913, on his parents\' citrus farm in Yorba, Linda, California, Richard Milhous Nixon\'s life spanned eight decades.',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '2' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Once in office, Nixon and his staff faced the problem of how to end the Vietnam War, which had broken his predecessor\'s administration and threatened to cause major unrest at home. As protesters in America\'s cities called for an immediate withdrawal from Southeast Asia, Nixon made a nationally televised address on November 3, 1969, calling on the "silent majority" of Americans to renew their confidence in the American government and back his policy of seeking a negotiated peace in Vietnam.',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '33' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        },
        {
          id: 'q3',
          text: 'Nixon\'s foreign policy aimed to reduce international tensions by forging new links with old rivals. In February 1972, Nixon traveled to Beijing (Peking), Hangzhou (Hangchow), and Shanghai in China for talks with Chinese leaders Chairman Mao Zedong (Mao Tse Tung) and Premier Zhou Enlai (Chou En-lai). Nixon\'s trip was the first high-level contact between the United States and the People\'s Republic of China in more than twenty years, and it ushered in a new era of relations between Washington and Beijing.',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '34' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        },
        {
          id: 'q4',
          text: 'In his 1972 bid for re-election, Nixon defeated South Dakota Senator George McGovern, the Democratic candidate for president, by one of the widest electoral margins ever, winning 520 electoral college votes to McGovern\'s 17 and nearly 61 percent of the popular vote.',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '41' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'Facing certain impeachment and removal from office, Nixon announced his decision to resign in a national televised address on the evening of August 8, 1974. He resigned effective at noon the next day, August 9, 1974.',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '46' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        }
      ]
    }
  ]
})
