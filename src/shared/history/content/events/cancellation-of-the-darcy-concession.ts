import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'cancellation-of-the-darcy-concession',
  names: [
    { text: 'Cancellation of the D’Arcy concession', lang: 'en', role: 'primary' },
    { text: 'لغو امتیاز دارسی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1932-11-27' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
          },
          {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '36' }
          }
        ]
      },
      {
        value: { d: '1932-11-22' },
        cites: [
          {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '12' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1933-05-28' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
        }
      ]
    },
    {
      ref: 'place:geneva',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
        }
      ]
    },
    {
      ref: 'person:abdolhossein-teymourtash',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '11' }
        },
        {
          source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
          loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '12' }
        }
      ]
    },
    {
      ref: 'person:ali-akbar-davar',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '14' }
        }
      ]
    },
    {
      name: 'Sayyed Ḥasan Taqizādeh',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
        },
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '14' }
        }
      ]
    },
    {
      name: 'Moḥammad-ʿAli Foruḡi',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '14' }
        }
      ]
    },
    {
      name: 'Sir John Cadman',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '11' }
        },
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
        }
      ]
    },
    {
      name: 'Edvard Beneš',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
        },
        {
          source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
          loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '13' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:darcy-oil-concession', rel: 'related' },
    {
      ref: 'event:iran-name-change-of-1935',
      rel: 'related',
      cites: [
        {
          source: 'iranica-kazemi-anglo-persian-oil-company',
          loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '9' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Anglo-Persian Oil Company (APOC) refuses to cancel or change the oil concession despite government protests and popular demand.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1930' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'The APOC regarded the agreement as valid, but recognized the desirability of revising the concession. To this end discussions were opened in 1928 by Sir John Cadman (q.v.), the chairman of APOC, and ʿAbd-al-Ḥosayn Teymurtāš, the court minister.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q3',
          text: 'The subsequent negotiations dragged on until mid 1932 when, with agreement apparently in sight, the APOC informed the Iranian government that the estimated royalty due for 1931, a year in which profits were badly affected by the worldwide depression, was only 306,872 Pounds Sterling, compared with 1,288,312 Pounds Sterling for the previous year.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q4',
          text: 'Because of the world-wide effects of an excess of oil supply over demand in the late 1920s and the economic destabilization of the Depression in the early 1930s, the total royalties accruing to the Iranian government fell disastrously in 1931.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'Majles abolishes the D’Arcy oil concession. The British government brings the issue before the Council of the League of Nations, which recommends direct negotiations. Dispute over the matter continues between Reżā Shah’s Cabinet and representatives of the Anglo-Persian Oil Company.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1932' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q6',
          text: 'Complaining that the concession was in conflict with national interests, the Iranian government claimed that it was not legally and logically bound by concessionary terms which had been granted before the establishment of constitutional government in Iran, in view of the manner in which such concession was obtained at that time.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q7',
          text: 'This action, ending four years of inconclusive negotiations for its modification, including a proposal for Iranian government participation in the ordinary share capital of APOC, between ʿAbd-al-Ḥosayn Teymūrtāš the Minister of Court, and Sir John Cadman, chairman of the company, touched off a national debate in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The area of the concession was to be reduced from 480,000 square miles to 100,000 square miles by 1938, resulting in the relinquishment of about 80 percent of the area covered by the 1901 concession. The duration of the concession was, however, extended by 32 years to the end of 1993, i.e. it was to last for sixty years.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q9',
          text: 'The APOC began a new phase of vigorous expansion of oil production.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
          }
        },
        {
          id: 'q10',
          text: 'In 1933, the company produced 7,087,000 tons of oil and paid Iran ₤1,785,000. By 1939 AIOC oil production had increased to 11,327,000 tons, and payment to Iran to ₤4,300.000.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
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
            value: { d: '1932-06' },
            cites: [
              {
                source: 'iranica-kazemi-anglo-persian-oil-company',
                loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Matters came to a head when in June 1932 APOC informed the Iranian government that royalties in respect of 1931 would amount to ₤366,782; for the same period APOC’s income tax payment to the British government amounted to nearly ₤1,000,000.',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-anglo-persian-oil-company',
          loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1932-11-26' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On 26 November 1932, while the Council of Ministers was in session, the Shah, accompanied by Sayyed Ḥasan Taqizādeh (Taqi-zāda), the finance minister, arrived and chastised Teymurtāš for failing to reach an agreement with APOC. The Shah then dictated a letter canceling the concession agreement before leaving his surprised ministers. The Prime minister, Mehdi-qolli Hedāyat, recollected that in his anger Reza Shah called for the file on the oil negotiations and had it flung into the stove.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1932-12-19' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The British government, on its part, rejected Iran’s right to cancel the concession and on 19 December 1932 referred the dispute to the League of Nations in Geneva.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1932-12-24' },
            cites: [
              {
                source: 'iranica-bast-germany-diplomatic-relations',
                loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '36' }
              }
            ]
          },
          {
            value: { d: '1933' },
            cites: [
              {
                source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
                loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
              },
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1933' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Following the dismissal of Teymūrtāš early in 1933, there was no real effort on either side to conclude a treaty.',
        lang: 'en',
        cite: {
          source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
          loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1933-04-24' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Five months later, in April 1933, Cadman himself went to Tehran to try to salvage the situation and met with the Shah for the second time on 24 April. It was a decisive event at which Cadman and the Shah, men of thoroughly contrasting backgrounds, came together with the shared knowledge that each had the undisputed authority and the ultimate responsibility to reach agreement. They achieved a breakthrough.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1933-05-28' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'At the end of meeting the APOC representatives and Iranian ministers including Taqizādeh, Moḥammad-ʿAli Foruḡi (q.v.), the minister of foreign affairs, and ʿAli-Akbar Dāvar (q.v.), the minister of justice, went away to hammer out the details of the agreement which was ratified by the Parliament (majles) on May 28th, 1933 and received Royal assent on May 29th, 1933.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    }
  ]
})
