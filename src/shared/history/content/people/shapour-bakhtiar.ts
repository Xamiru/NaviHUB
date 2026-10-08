import { definePerson } from '../../schema'

export default definePerson({
  id: 'shapour-bakhtiar',
  names: [
    { text: 'Shapour Bakhtiar', lang: 'en', role: 'primary' },
    { text: 'شاپور بختیار', lang: 'fa', role: 'native', translit: 'Šāpur Baḵtiār' },
    {
      text: 'Shahpour Bakhtiar',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-iran-country-study-1987', loc: { section: 'Monarchists', para: '3' } }
      ]
    }
  ],
  researched: '2026-10-09',
  died: {
    alts: [
      {
        value: { d: '1991' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1991' }
          }
        ]
      }
    ]
  },
  born: {
    alts: [
      {
        value: { d: '1915', notAfter: '1916' },
        cites: [
          {
            source: 'lc-names-n83005415',
            loc: { section: '670: Asnādī az dawlatʹhā-yi Azhārī va Bakhtiyār, 2013 (Iranian CIP data: 1294-1371)' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1978-12-29' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' }
            ]
          },
          {
            value: { d: '1979-01-04' },
            cites: [
              { source: 'frus-1977-80-v11p1-persons', loc: { section: 'Persons', para: '16' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Office of the Historian, U.S. Department of State'
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1979-02-11' },
            cites: [
              { source: 'frus-1977-80-v11p1-persons', loc: { section: 'Persons', para: '16' } }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4' }
        }
      ]
    },
    {
      title: 'head of the National Resistance Movement of Iran',
      cites: [
        { source: 'frus-1977-80-v11p1-persons', loc: { section: 'Persons', para: '16' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Shapour_Bakhtiar_portrait_1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shapour_Bakhtiar_portrait_1.jpg',
    credit: { institution: 'iranchamber.com' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Bakhtiar, Shahpur, Iranian Prime Minister from January 4, 1979, until February 11, 1979; head of the National Resistance Movement of Iran in Paris',
          lang: 'en',
          cite: { source: 'frus-1977-80-v11p1-persons', loc: { section: 'Persons', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v11p1/persons'
          }
        },
        {
          id: 'q2',
          text: 'At the end of December another National Front leader, Shapour Bakhtiar, agreed to form a government on condition the shah leave the country.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Revolution', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Once installed as prime minister, Bakhtiar took several measures designed to appeal to elements in the opposition movement. He lifted restrictions on the press; the newspapers, on strike since November, resumed publication. He set free remaining political prisoners and promised the dissolution of SAVAK, the lifting of martial law, and free elections. He announced Iran\'s withdrawal from CENTO, canceled US$7 billion worth of arms orders from the United States, and announced Iran would no longer sell oil to South Africa or Israel. Although Bakhtiar won the qualified support of moderate clerics like Shariatmadari, his measures did not win him the support of Khomeini and the main opposition elements, who were now committed to the overthrow of the monarchy and the establishment of a new political order.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/22.htm' }
        },
        {
          id: 'q4',
          text: 'Khomeini arrived in Tehran from Paris on February 1, 1979, received a rapturous welcome from millions of Iranians, and announced he would "smash in the mouth of the Bakhtiar government." He labeled the government illegal and called for the strikes and demonstrations to continue.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/22.htm' }
        },
        {
          id: 'q5',
          text: 'By late afternoon on February 12, Bakhtiar was in hiding, and key points throughout the capital were in rebel hands. The Pahlavi monarchy had collapsed.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/22.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'The National Resistance Movement\'s official position was to restore the 1906 constitution as its original drafters intended, with a shah that reigns rather than rules. In 1983 Bakhtiar\'s group agreed to cooperate with another Paris-based party, the Iran Liberation Front, which was led by elder statesman and former royalist prime minister Ali Amini.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'Monarchists', para: '3' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/96.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Šāpur Baḵtiār, last prime minister of Iran prior to the 1979 Revolution, is assassinated in Paris, allegedly by agents of the Islamic Republic.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1991' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    }
  ]
})
