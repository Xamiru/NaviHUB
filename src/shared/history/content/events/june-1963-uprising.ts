import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'june-1963-uprising',
  names: [
    { text: 'June 1963 uprising', lang: 'en', role: 'primary' },
    {
      text: '15 Khordad uprising',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'khamenei-ir-2013-06-04-speech-24th-demise-anniversary',
          loc: { section: 'Leader’s Speech on 24th Demise Anniversary of Imam Khomeini', para: '7' }
        }
      ]
    },
    { text: 'قیام ۱۵ خرداد', lang: 'fa', role: 'native', translit: 'Qiām-e 15 Ḵordād' }
  ],
  researched: '2026-10-07',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1963-06-05' },
        cites: [
          {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '21'
            }
          },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '37' }
          },
          {
            source: 'khamenei-ir-imam-khomeini-biography',
            loc: { section: 'Imam Khomeini’s Biography', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '21'
          }
        }
      ]
    },
    {
      ref: 'place:qom',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '37' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '36' }
        },
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '19'
          }
        }
      ]
    },
    {
      ref: 'person:asadollah-alam',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1963' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '6' }
        }
      ]
    },
    {
      name: 'Islamic Coalition of Mourning Groups',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '17'
          }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 400, qualifier: 'nearly' },
            cites: [
              {
                source: 'khamenei-ir-imam-khomeini-biography',
                loc: { section: 'Imam Khomeini’s Biography', para: '16' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Khamenei.ir' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:white-revolution',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-sedghi-feminist-movements-pahlavi',
          loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '16' }
        },
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
        }
      ]
    },
    { ref: 'event:exile-of-ruhollah-khomeini', rel: 'followed-by' }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/15khordad1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:15khordad1.jpg',
    credit: { institution: '15khordad42.net (15 Khordad uprising memorial/historical archive site)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The popular uprising after Khomeini’s arrest on 5 June 1963 rapidly spread from Tehran’s bazaar area, the focal point of the Coalition’s power base across Iran and took the Shah’s regime by surprise.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '21'
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
          text: 'In June 1963, Ayatollah Sayyid Ruhollah Musavi Khomeini, a religious leader in Qom, was arrested after a fiery speech in which he directly attacked the shah. The arrest sparked three days of the most violent riots the country had witnessed since the overthrow of Mossadeq a decade earlier. The shah severely suppressed these riots, and, for the moment, the government appeared to have triumphed over its opponents.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/18.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'On 22 March, paratroopers were sent to the Fayżiya in Qom, the site where Khomeini delivered his public speeches. They killed a number of students, beat and arrested a number of others, and ransacked the building (for more on these events, see Moin, pp. 92-106).',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q4',
          text: 'On the afternoon of ʿĀšurāʾ, 3 June 1963, Khomeini delivered a speech at the Fayżiya in which he drew parallels between Yazid the Omayyad caliph and the shah, denounced the shah again for his close ties to Israel, and warned him that if he did not change his ways the day would come when the people would offer up thanks for his departure from the country (Ṣaḥifa-ye Emām, I, pp. 243-48). Two days later, Khomeini was arrested at 3 a.m, by a group of commandos, who hastily transferred him to the Qaṣr prison in Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The spectacular show of force of the mourning groups in Tehran on 3 June 1963, the day of āšurā, started at 8 in the morning. Soon the religious procession of the mourning groups turned into a political demonstration. The crowd chanted anti-Shah and pro-Khomeini slogans, formulated by Ṣādeq Amāni, one of the Coalition leaders (Moqaddam, pp. 95-96). Around noon, ʿErāqi, another one of the leaders of the Coalition, addressed the large rally in front of Tehran University. Subsequently, the demonstrators/mourning groups moved to the vicinity of Marmar Palace, the Shah’s residence, ending their march at the bazaar around three in the afternoon (Moqaddam, p. 96).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '19'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        },
        {
          id: 'q6',
          text: 'When news of Khomeini’s arrest spread through Qom, Tehran, and other cities, masses of angry demonstrators were confronted by tanks and many slaughtered; not until six days later was order restored.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q7',
          text: 'Shocked by the magnitude of opposition and the intensity of the protest movement, the regime was temporarily destabilized and was forced to impose Martial Law.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '21'
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'After nineteen days in the Qaṣr prison, Khomeini was moved first to the ʿEšratābād military base and then to a house in the Dāwudiya section of Tehran; it was there that he first learned of the bloodshed that had taken place on 15 Ḵordād. He was moved in succession to two houses in Qayṭariya, a location less accessible to would-be visitors, staying there for a total of roughly two months. Demonstrations continued calling for his release, and, on 7 April 1964, he was allowed to return to Qom, forthwith declaring that the movement begun on 15 Ḵordād would continue.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    }
  ]
})
