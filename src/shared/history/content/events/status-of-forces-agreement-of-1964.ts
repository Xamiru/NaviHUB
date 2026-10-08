import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'status-of-forces-agreement-of-1964',
  names: [
    { text: 'Status of Forces Agreement of 1964', lang: 'en', role: 'primary' },
    { text: 'لایحه کاپیتولاسیون', lang: 'fa', role: 'native' },
    {
      text: 'Capitulations Agreement',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '30'
          }
        }
      ]
    },
    {
      text: 'Status of Forces bill',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'State and Society, 1964-74', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1964-10-13' },
        cites: [
          {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '30'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'north-america'],
  prominence: 3,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:hassan-ali-mansur',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'State and Society, 1964-74', para: '1' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'State and Society, 1964-74', para: '4' }
        }
      ]
    },
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '38' }
        },
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '32'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:exile-of-ruhollah-khomeini',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '38' }
        },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '39' }
        }
      ]
    },
    {
      ref: 'event:abolition-of-capitulations-in-iran',
      rel: 'related',
      cites: [
        {
          source: 'iranica-milani-hoveyda',
          loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Hassan_Ali_Mansur_2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hassan_Ali_Mansur_2.jpg',
    credit: { institution: 'Political Studies and Research Institute (ir-psri.com)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Status of Forces Agreement, known to Iranians as the Capitulations Agreement “provided American military personnel and their dependents stationed in Iran with full diplomatic immunity” (Bill, p. 156).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '30'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        },
        {
          id: 'q2',
          text: 'In effect, the bill would allow these Americans to be tried by United States rather than Iranian courts for crimes committed on Iranian soil. For Iranians the bill recalled the humiliating capitulatory concessions extracted from Iran by the imperial powers in the nineteenth century.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'On 13 October 1964, the Iranian parliament ratified a highly controversial and sensitive extraterritorial agreement by a narrow margin of 74-61. Given the handpicked parliament, the relatively high votes against a government Bill demonstrated the unpopularity of the Bill.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '30'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        },
        {
          id: 'q4',
          text: 'Feeling against the bill was sufficiently strong that sixty-five deputies absented themselves from the legislature, and sixty-one opposed the bill when it was put to a vote in October 1964.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        },
        {
          id: 'q5',
          text: 'Once the Majles ratified the Agreement, Khomeini waited for 13 days and then on the birthday of the Shah, which was officially celebrated, he explicitly lashed out against the Capitulations Agreement, the US, Britain, the Soviet Union, Israel, the Majles, the government and the Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '31'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q6',
          text: 'In a highly charged and moving speech, Khomeini said, “They have sold out all of us and our independence and still celebrate by illuminating and adorning the streets [reference to the official festivities on the Shah’s birthday] the Majles and the government have shamelessly reduced the Iranian people to a status lower than American dogs. This Agreement has made us a colonized country, it has presented the Muslim people of Iran to the world as lower than savages. If the clergy had any influence they would not allow a puppet of the Americans to commit such foulness, they would kick him out. If our country is occupied by the Americans, tell us and deport us from this country. All our problems are because of this USA. All our problems are because of Israel. Israel belongs to the US, these members of the parliament belong to the US, these ministers [in the government] belong to the US and are appointed by them, if they are not why do they not stand up and shout down the Agreement? . . . May God destroy all those who betray this land, this country and betray Islam and the Qurʾān” (Moqaddam, pp. 200-207).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '32'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'As the agreement was reminiscent of the infamous capitulation rights granted to colonial powers, and as Iran had, with full fanfare, ended all such rights under the reign of Reẓā Shah, even an appearance of their revival was a political powder keg, and the Ayatollah had just the right temperament and rhetoric to turn the issue into a national crisis.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        }
      ]
    }
  ]
})
