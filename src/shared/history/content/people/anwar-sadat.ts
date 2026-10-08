import { definePerson } from '../../schema'

export default definePerson({
  id: 'anwar-sadat',
  names: [
    { text: 'Anwar Sadat', lang: 'en', role: 'primary' },
    { text: 'أنور السادات', lang: 'ar', role: 'native', translit: 'Anwar al-Sādāt' },
    {
      text: 'Anwar as Sadat',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Anwar as Sadat, 1970-73', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  died: {
    alts: [
      {
        value: { d: '1981-10-06' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '5'
            }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  roles: ['head-of-state', 'politician', 'military'],
  offices: [
    {
      title: 'president of Egypt',
      polity: 'polity:republic-of-egypt',
      start: {
        alts: [
          {
            value: { d: '1970-10' },
            cites: [
              { source: 'frus-1977-80-v08-persons', loc: { section: 'Persons', para: '166' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1981-10-06' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: {
                  section: 'The Aftermath of Camp David and the Assassination of Sadat',
                  para: '5'
                }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'frus-1977-80-v08-persons', loc: { section: 'Persons', para: '166' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Carter_and_Sadat_White_House2.jpg/1280px-Carter_and_Sadat_White_House2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Carter_and_Sadat_White_House2.jpg',
    credit: {
      institution: 'Library of Congress, Prints and Photographs Division',
      creator: 'Warren K. Leffler'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Sadat was a Free Officer who had served as secretary of the Islamic Congress and of the National Union and as speaker of the National Assembly. In 1969 he was appointed vice president and so became acting president on Nasser\'s death. On October 3, 1970, the ASU recommended that Sadat be nominated to succeed Nasser as president. An election was held on October 15, and Sadat won more than 90 percent of the vote. Almost no one expected that Sadat would be able to hold power for long. Sadat was considered a rather weak and colorless figure who would last only as long as it would take for the political maneuvering to result in the emergence of Nasser\'s true successor. Sadat surprised everyone with a series of astute political moves by which he was able to retain the presidency and emerge as a leader in his own right.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Anwar as Sadat, 1970-73', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/40.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Sadat moved very cautiously at first and pledged to continue Nasser\'s policies. On May 2, 1971, however, Sadat dismissed Ali Sabri, the vice president and head of the ASU. On May 15, Sadat announced that Sabri and more than 100 others had been arrested and charged with plotting a coup against the government. Also charged in the plot were Sharawy Jumaa, minister of interior and head of internal security, and Muhammad Fawzi, minister of war. These men were considered to be left-leaning and pro-Soviet. They were arrested with other important figures of the Nasser era. They had all resigned their positions on May 13, apparently in preparation for a takeover. But anticipating their moves, Sadat outflanked them and was then able to assert himself',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Anwar as Sadat, 1970-73', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/40.htm' }
        },
        {
          id: 'q3',
          text: 'On July 17, 1972, Sadat expelled the 15,000 Soviet advisers from Egypt. Sadat later explained that the expulsion freed him to pursue his preparations for war.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
        },
        {
          id: 'q4',
          text: 'After the food riots of January 1977, Sadat decided that something dramatic had to be done, and so on November 19, 1977, in response to an invitation from Begin, Sadat journeyed to Jerusalem.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Peace with Israel', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/44.htm' }
        },
        {
          id: 'q5',
          text: 'The Camp David Accords made Sadat a hero in Europe and the United States. The reaction in Egypt was generally favorable, but there was opposition from the left and from the Muslim Brotherhood. In the Arab world, Sadat was almost universally condemned. Only Sudan issued an ambivalent statement of support. The Arab states suspended all official aid and severed diplomatic relations. Egypt was expelled from the Arab League, which it was instrumental in founding, and from other Arab institutions.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Peace with Israel', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/44.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'On October 6, while observing a military parade commemorating the eighth anniversary of the October 1973 War, Sadat was assassinated by members of Al Jihad movement, a group of religious extremists. Sadat\'s assassin was Lieutenant Colonel Khalid al Islambuli.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/45.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'sadat-1978-in-search-of-identity', perspective: 'arab' }
  ],
  born: {
    alts: [
      {
        value: { d: '1918' },
        cites: [
          { source: 'lc-names-n79068664', loc: { section: 'Sadat, Anwar, 1918-1981' } }
        ]
      }
    ]
  }
})
