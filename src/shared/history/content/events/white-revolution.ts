import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'white-revolution',
  names: [
    { text: 'White Revolution', lang: 'en', role: 'primary' },
    {
      text: 'انقلاب سفید',
      lang: 'fa',
      role: 'native',
      translit: 'Enqelāb-e safid',
      cites: [
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '5'
          }
        }
      ]
    },
    {
      text: 'White Revolution of the Shah and the People',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1963' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1963-01-26' },
        cites: [
          {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '22'
            }
          },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '35' }
          },
          {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1963' }
        }
      ]
    },
    {
      ref: 'place:qom',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '35' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '5' }
        }
      ]
    },
    {
      ref: 'person:asadollah-alam',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: {
            section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
            para: '22'
          }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '5' }
        }
      ]
    },
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '35' }
        },
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '5'
          }
        }
      ]
    },
    {
      ref: 'person:hasan-arsanjani',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iranian-land-reform',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
        }
      ]
    },
    {
      ref: 'event:june-1963-uprising',
      rel: 'led-to',
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
    { ref: 'event:womens-suffrage-in-iran', rel: 'related' }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Iranian_women_voting_during_White_Revolution.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Iranian_women_voting_during_White_Revolution.jpg',
    credit: { institution: 'Ettelaat newspaper (No. 11008, 6 Bahman 1341/26 Jan 1963, p.13)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In January 1963 the shah launched his “White Revolution,” which called for giving over the farmlands to the possession of the peasants, organizing farm cooperatives and banks, granting the right to vote to women, nationalizing the forests, and mobilizing young men and women into the Education Corps, Health Corps, and Agricultural Corps. Dividing the farmlands among the peasants naturally did not please the landlords, and the clergy objected particularly to women’s franchise; they did not favor impinging on property rights either.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        },
        {
          id: 'q2',
          text: 'Building on the credit earned in the countryside and in urban areas by the land distribution program, the shah in January 1963 submitted six measures to a national referendum. In addition to land reform, these measures included profit-sharing for industrial workers in private sector enterprises, nationalization of forests and pastureland, sale of government factories to finance land reform, amendment of the electoral law to give more representation on supervisory councils to workers and farmers, and establishment of a Literacy Corps to allow young men to satisfy their military service requirement by working as village literacy teachers. The shah described the package as his White Revolution, and when the referendum votes were counted, the government announced a 99-percent majority in favor of the program.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '5' }
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
          text: 'The Shah’s response to the deteriorating socioeconomic conditions was a six-point reform program, known as the “White Revolution” (Enqelāb-e safīd) and the suppression of opposition groups by force. The reform process had already started with the program of land redistribution, largely masterminded by Ḥasan Arsanjanī, the minister of agriculture in ʿAlī Amīnī’s cabinet (Zonis, chap. 3; Abrahamian, chap. 9).',
          lang: 'en',
          cite: {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/economy-ix/'
          }
        },
        {
          id: 'q4',
          text: 'On 9 January 1963 the Shah announced the Six Principles of his “White Revolution” (Enqelāb-e safid). He also announced that to stave off the false accusations and denunciations of the “black reactionary agents” and “destructive red forces” against his reforms, he would put the Six Principles to a national referendum.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '5'
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
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'On 6 Bahman 1341/26 January 1963 the shah’s program of reform, the so-called “White Revolution,” which included the revision of the electoral law, was put to a referendum, a move previously decried as unconstitutional. In early summer 1342/1963 the government announced new measures governing the conduct of elections. The government had also extended the franchise to women. The overall significance of this measure was, however, eclipsed by the eroding credibility of the electoral process.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        },
        {
          id: 'q6',
          text: 'When the shah refused any form of compromise and planned a referendum to obtain the appearance of popular support for his “White Revolution,” Khomeini headed a group of his colleagues calling for a boycott of the referendum, and on 22 January, he issued a strongly worded declaration denouncing the shah and his plans (Ṣaḥifa-ye Emām, I, p. 133). Two days later, the shah came to Qom, only to be shunned by all the dignitaries of the city. The referendum was held on 26 January, predictably endorsing the shah’s plans.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '35' }
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The announcement of these reform programs, particularly those concerning land redistribution and female suffrage, aggravated the prevailing political and economic uncertainties instead of relieving social tensions and led to a revival of old alliances between the clergy, bāzār merchants, and intelligentsia in opposition to the Shah (Pesaran, 1985).',
          lang: 'en',
          cite: {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/economy-ix/'
          }
        },
        {
          id: 'q8',
          text: 'Stung by the provisions of the White Revolution, a clandestine protest movement began to take shape among the clergy. The banishment of its most forceful leader, Ruḥ-Allāh Khomeini, to Iraq did not weaken the movement, contrary to the Persian government’s expectations.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        },
        {
          id: 'q9',
          text: 'According to two government decrees issued on 26 October and 3 December 1962, and approved by the parliament on 26 January 1963, young men holding the diploma of secondary education—mainly urban middle-class youth—were given the option of serving in the Literacy Corps as their two-year army service. Dispatched to rural areas, 166,949 corpsmen (FIGURE 1) and 33,642 corpswomen (from 1969 on; FIGURE 2) taught over 2.2 million children between the ages of six and twelve years who had not yet attended school up to the second grade, plus a million adults',
          lang: 'en',
          cite: {
            source: 'iranica-sabahi-literacy-corps',
            loc: { section: 'LITERACY CORPS', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260907212738/https://www.iranicaonline.org/articles/literacy-corps-1/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1963-01-09' },
            cites: [
              {
                source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
                loc: {
                  section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
                  para: '5'
                }
              },
              {
                source: 'iranica-sedghi-feminist-movements-pahlavi',
                loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The six-point program of the White Revolution, announced on 9 January 1963, included land redistribution and women’s enfranchisement.',
        lang: 'en',
        cite: {
          source: 'iranica-sedghi-feminist-movements-pahlavi',
          loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1963' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1963' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'A Grand Congress of 3,500 peasants is convened in Tehran to approve the Shah’s six programs of reform, which are later labeled “the White Revolution of the Shah and the People.” It includes land reform and other programs such as women’s right to vote, nationalization of the forests, sale of shares in state-owned industries as a financial resource for land reforms, granting a share of the profits of industrial establishments to workers, and the formation of Literacy Corps for compulsory education in rural areas.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1963' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
        }
      }
    }
  ]
})
