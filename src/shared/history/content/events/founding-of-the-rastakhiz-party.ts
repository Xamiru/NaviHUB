import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-rastakhiz-party',
  names: [
    { text: 'Founding of the Rastakhiz Party', lang: 'en', role: 'primary' },
    {
      text: 'حزب رستاخیز ملت ایران',
      lang: 'fa',
      role: 'native',
      translit: 'Ḥezb-e Rastāḵiz-e Mellat-e Irān'
    },
    {
      text: 'Resurgence Party',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-milani-hoveyda',
          loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '26' }
        },
        { source: 'pahlavi-1980-answer-to-history', loc: { section: 'The White Revolution' } }
      ]
    },
    {
      text: 'Resurrection Party',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1975' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1975-03-02' },
        cites: [
          {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '25' }
          }
        ]
      },
      {
        value: { d: '1974-03-04' },
        cites: [
          {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The White Revolution' }
          }
        ],
        heldBy: [
          {
            kind: 'participant',
            name: 'Mohammad Reza Pahlavi',
            ref: 'person:mohammad-reza-pahlavi'
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
          source: 'iranica-milani-hoveyda',
          loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '25' }
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
      role: 'leader',
      cites: [
        {
          source: 'iranica-milani-hoveyda',
          loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '25' }
        },
        { source: 'pahlavi-1980-answer-to-history', loc: { section: 'The White Revolution' } }
      ]
    },
    {
      ref: 'person:amir-abbas-hoveyda',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-milani-hoveyda',
          loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '26' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iranian-revolution',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '3' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '8' }
        }
      ]
    },
    {
      ref: 'event:white-revolution',
      rel: 'related',
      cites: [
        { source: 'pahlavi-1980-answer-to-history', loc: { section: 'The White Revolution' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Civil_flag_of_Iran_in_Rastakhiz_Party_gathering.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Civil_flag_of_Iran_in_Rastakhiz_Party_gathering.jpg',
    credit: {
      institution: 'Tebyan, article on the Rastakhiz Party (article.tebyan.net/337353); photographer unknown'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q13',
          text: 'During the final years of the Pahlavi monarchy, only a single, government-sponsored political party, the Rastakhiz, operated legally.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'POLITICAL PARTIES', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/94.htm' }
        },
        {
          id: 'q1',
          text: '1975 Establishment of Ḥezb-e Rastāḵiz (Resurrection Party) by the Shah, reducing the country to a single party system, membership in which was viewed as every citizen’s civic duty.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1975' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1969 and again in 1972, the shah appeared ready to permit the Mardom Party, under new leadership, to function as a genuine opposition, i.e., to criticize the government openly and to contest elections more energetically, but these developments did not occur.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/19.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Though in private Hoveyda was harshly critical of the new party, Rastāḵiz (Resurgence), he nevertheless accepted the role of the party’s first Secretary.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        },
        {
          id: 'q6',
          text: 'Elections were preceded by the discarding of the experiment with “multi-party” politics and by the formation of the Ḥezb-e rastāḵīz-e mellat-e Īrān. There were multiple candidates for all seats, pre-approved by the party committees and the security forces. More than 10,000 candidates nominated themselves for the 268 seats in the Majles and 30 seats in the Senate, among which 841 were approved, all equally acceptable to the shah and to the government (Mohammadi-Nejad, p. 111). The candidates were allowed to campaign for the popular vote but were not permitted to broach the issues of royal powers and programs, oil, or foreign policy. The electorate now faced the prospect of largely free elections devoid of real choice.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The protesters used a form of calculated violence to achieve their ends, attacking and destroying carefully selected targets that represented objectionable features of the regime: nightclubs and cinemas as symbols of moral corruption and the influence of Western culture; banks as symbols of economic exploitation; Rastakhiz (the party created by the shah in 1975 to run a one-party state) offices; and police stations as symbols of political repression.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q16',
          text: 'With the exception of the monarchist Rastakhiz, which had dissolved, the prerevolutionary parties were reactivated, including the Mojahedin and Fadayan.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'POLITICAL PARTIES', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/94.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1975-03-02' },
            cites: [
              {
                source: 'iranica-milani-hoveyda',
                loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'His world unexpectedly changed on 2 March 1975/ 11 Esfand 1353, when the shah suddenly announced his decision to turn Iran into a one-party system. The Irān Novin Party that had been, more than anything else, Hoveyda’s own creation, was dismissed by the same royal fiat that had created it.',
        lang: 'en',
        cite: {
          source: 'iranica-milani-hoveyda',
          loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1975-03', notAfter: '1975-04' },
            cites: [
              { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '20' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'More squarely aimed against the Pahlavi regime was a fatwā issued in Farvardīn 1354 Š./March-April 1975 prohibiting membership in the Resurrection party (Ḥezb-e rastāḵīz), which was intended to monopolize all legal party political activity in Persia',
        lang: 'en',
        cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '20' } },
        provenance: { via: 'web', at: '2026-10-09', url: 'https://www.iranicaonline.org/articles/fatwa' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1975-06-20' },
            cites: [
              {
                source: 'iranica-azimi-bakhash-kakar-elections',
                loc: {
                  section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
                  para: '25'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'With the elections for the twenty-fourth Majles and the seventh Senate, conducted on 30 Ḵordād 1354/20 June 1975, however, the shah attempted to change the situation. Elections were preceded by the discarding of the experiment with “multi-party” politics and by the formation of the Ḥezb-e rastāḵīz-e mellat-e Īrān.',
        lang: 'en',
        cite: {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: {
            section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
            para: '25'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/elections/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1975' },
            cites: [
              {
                source: 'iranica-cole-bahaism-i',
                loc: { section: 'BAHAISM i. The Faith', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In 1975 Bahais feared for their safety when Moḥammad-Reżā Shah insisted that all Iranians join his Rastāḵīz party.',
        lang: 'en',
        cite: {
          source: 'iranica-cole-bahaism-i',
          loc: { section: 'BAHAISM i. The Faith', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
        }
      }
    }
  ]
})
