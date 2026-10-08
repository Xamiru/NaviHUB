import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iranian-oil-consortium-agreement-1954',
  names: [
    { text: 'Consortium Agreement of 1954', lang: 'en', role: 'primary' },
    { text: 'قرارداد کنسرسیوم نفت ۱۳۳۳', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1954-09-19' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1954-10-29' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:abadan',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '52' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:ali-amini',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
        }
      ]
    },
    {
      name: 'Howard Page',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
        }
      ]
    },
    {
      name: 'Roger Stevens',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
        }
      ]
    },
    {
      name: 'Herbert Hoover Jr.',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
        }
      ]
    },
    {
      ref: 'person:fazlollah-zahedi',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1953' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:nationalization-of-the-iranian-oil-industry',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-azimi-great-britain-v',
          loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '31' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Consortium Agreement of October 1954 was in essence the reaffirmation of the principle of profit sharing on a fifty-fifty basis and a clear negation of nationalization as advocated by Moṣaddeq; pre-1951 oil arrangements were not, however, revived.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q2',
          text: '1954 The government reaches agreement with a consortium of Western oil companies to resume work in the Iranian oil industry; the agreement is ratified by the Majles.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1954' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Thus the stage was set for the settlement of the Iranian oil crisis, and the conclusion of a new agreement for revival of the Iranian oil industry (Yeganeh, pp. 61-64).',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '48' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q4',
          text: 'With the installment of Zāhedi’s government, the stage was set to bring Iranian oil back into production and onto the world market. But how was this to be done? AIOC, of course, was hamstrung. For it to take the lead would only re-ignite the nationalist fires in Iran. Clearly the US government would have to lead the way to an oil settlement.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q5',
          text: '1953 General Zāhedi’s government announces an agreement to reestablish diplomatic relations with Britain and to reach a negotiated settlement in the oil dispute.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1953' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'In its essential features, the agreement provided for a consortium holding company, Iranian Oil Participants Ltd. (IOP), to be incorporated in England where it would also have its headquarters.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q7',
          text: 'Profits made from the oil operations under the agreement were to be divided equally between the consortium and the Iranian government, preserving the principle of 50/50 profit sharing that had become the norm in the Middle East.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q8',
          text: 'On the matter of compensation, the company was to receive a net sum of 25 million Pounds Sterling ($70 million at prevailing exchange rate) from the Iranian government in ten equal installments starting on 1 January 1957.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'An agreement was reached with a consortium of Western oil companies that gave a greater share of the profit than before to Persia and foresaw the possibility of nationalizing the oil industry altogether.',
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
          id: 'q10',
          text: 'In addition to the fact that the 1954 Agreement failed to achieve the main objective of the 1951 oil nationalization, which was the complete control and management of the oil industry by NIOC, there were many weaknesses and shortcomings in the Agreement, many of which were unavoidable due to severe economic problems in the country, the weak bargaining position of Iran, and the prevailing policies and practices in the international oil business.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
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
            value: { d: '1954-04-09' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The State Department retained Herbert Hoover Jr., as the special representative of Secretary of State Dulles to see if a new consortium of oil companies could be created to take up AIOC’s interests. The American government waived the application of its Anti-Trust laws in the Iranian case, and subsequently the Anglo-American inter-company talks ended with the signing of a memorandum of understanding on 9 April, 1954. The memorandum provided for the formation of a consortium in which the shares would be: 40 per cent for AIOC (changed to British Petroleum Company in December 1954); 14 per cent for Royal Dutch-Shell; 8 per cent each for the five US companies of Standard Oil (NJ), Socony, Socal, Texas and Gulf; and 6 per cent for Compagnie Française des Pétroles (CFP).',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1954-09-19' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'After four months of intensive negotiations, the oil agreement was finally signed in Iran on 19 September 1954 and Dr. Amini submitted the agreement to the Parliament on the 21st.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1954-10-28' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On 28 October, the Iranian Senate followed suit by 41 votes in favor, 4 against and 4 abstentions. On the 29th the Shah signed the royal assent.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Fazlollah_Zahedi_after_resignations_from_government_-_April_1955.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Fazlollah_Zahedi_after_resignations_from_government_-_April_1955.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'fateh-1979-panjah-sal-naft-e-iran', perspective: 'iranian' },
    { source: 'rouhani-1973-tarikh-e-melli-shodan-e-sanat-e-naft', perspective: 'iranian' }
  ]
})
