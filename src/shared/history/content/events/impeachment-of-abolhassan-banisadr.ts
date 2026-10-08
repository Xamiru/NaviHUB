import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'impeachment-of-abolhassan-banisadr',
  names: [
    { text: 'Impeachment of Abolhassan Banisadr', lang: 'en', role: 'primary' },
    { text: 'برکناری ابوالحسن بنی‌صدر', lang: 'fa', role: 'native' },
    { text: 'Dismissal of Bani-Sadr', lang: 'en', role: 'alternative' },
    { text: 'عزل بنی‌صدر', lang: 'fa', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1981-06-21' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
          },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '73' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1981-07-29' },
        cites: [
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '75' }
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
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        }
      ]
    },
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '75' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abolhassan-banisadr',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: { section: 'ELECTIONS ii. Under the Islamic Republic, 1979-92', para: '7' }
        }
      ]
    },
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        }
      ]
    },
    {
      ref: 'person:mohammad-beheshti',
      role: 'participant',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '2' }
        }
      ]
    },
    {
      ref: 'person:akbar-hashemi-rafsanjani',
      role: 'participant',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '3' }
        }
      ]
    },
    {
      name: 'Mohammad-Ali Rajai',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '3' }
        }
      ]
    },
    {
      name: 'Masoud Rajavi',
      role: 'participant',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '13' }
        }
      ]
    },
    {
      ref: 'event:algiers-accords-and-release-of-the-us-hostages',
      rel: 'related',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '10' }
        }
      ]
    },
    {
      ref: 'event:hafte-tir-bombing',
      rel: 'followed-by',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '3' }
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
          text: 'Abu’l-Ḥasan Banī-Ṣadr was elected the first president of the Islamic Republic in January 1980, but he was impeached by the Majles in June 1981.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: { section: 'ELECTIONS ii. Under the Islamic Republic, 1979-92', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Bani Sadr\'s program as president was to reestablish central authority, gradually to phase out the Pasdaran and the revolutionary courts and committees and to absorb them into other government organizations, to reduce the influence of the clerical hierarchy, and to launch a program for economic reform and development.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q3',
          text: 'Like Bazargan, Bani Sadr found he was competing for primacy with the clerics and activists of the IRP. The struggle between the president and the IRP dominated the political life of the country during Bani Sadr\'s presidency.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q4',
          text: 'From the very beginning the Majles and President Banī Ṣadr, who had been elected in January, were locked in a political struggle that surfaced in a prolonged disagreement over the choice of prime minister and then of the cabinet. The Majles, exercising its power to approve ministers, forced the choice of Moḥammad-ʿAlī Rajāʾī, the candidate of the Islamic republican party, and Banī Ṣadr sought to block his functioning at every turn. In this struggle the president was at a constitutional disadvantage, for he did not have power to dissolve the Majles. In fact, there had been no provision for dissolution of the Majles, not even by the leader. Nor could the president dismiss the prime minister. The one constitutional prerogative that Banī Ṣadr could and did use was to withhold his signature from laws passed by the Majles',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q5',
          text: 'In May, the Majlis passed measures to permit the prime minister to appoint caretakers to ministries still lacking a minister, to deprive the president of his veto power, and to allow the prime minister rather than the president to appoint the governor of the Central Bank. Within days the Central Bank governor was replaced by a Rajai appointee.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q6',
          text: 'Ayatollah Khomeini removes Baniṣadr from power, allegedly because of his sympathetic attitude towards the Mojāhedin-e ḵalq; Moḥammad-ʿAli Rajāʾi is named President and Baniṣadr flees to Paris where as a figurehead he joins the opposition movement The National Council of Resistance (Šurā-ye melli-e moqāwemat), established by Mojāhedin.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1981' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'By the end of May, Bani Sadr appeared also to be losing Khomeini\'s support.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q8',
          text: 'Meanwhile, gangs roamed the streets calling for Bani Sadr\'s ouster and death and clashed with Bani Sadr supporters.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q9',
          text: 'On June 10, participants in a Mojahedin rally at Revolution Square in Tehran clashed with hezbollahis.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q10',
          text: 'On June 13 or 14, Bani Sadr, fearing for his life, went into hiding.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q11',
          text: 'The next day, the Mojahedin issued a call for "revolutionary resistance in all its forms." The government treated this as a call for rebellion and moved to confront the opposition on the streets. Twenty-three protesters were executed on June 20 and 21, as the Majlis debated the motion for impeachment.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q12',
          text: 'In the debate, several speakers denounced Bani Sadr; only five spoke in his favor.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q13',
          text: 'The revolutionary movement had brought together a coalition of clerics, middle-class liberals, and secular radicals against the shah. The impeachment of Bani Sadr represented the triumph of the clerical party over the other members of this coalition.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q14',
          text: 'Bani Sadr remained in hiding for several weeks. Believing he was illegally impeached, he maintained his claim to the presidency, formed an alliance with Mojahedin leader Masoud Rajavi, and in July 1981 escaped with Rajavi from Iran to France. In Paris, Bani Sadr and Rajavi announced the establishment of the National Council of Resistance (NCR)',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q15',
          text: 'Elections for a new president were held on July 24, and Rajai, the prime minister, was elected to the post.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q16',
          text: 'Amnesty International documented 2,946 executions in the 12 months following Bani Sadr\'s impeachment, a conservative figure because the authorities did not report all executions.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1981-03-16' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On March 16, after meeting with and failing to persuade Bani Sadr, Rajai, and clerical leaders to resolve their differences, he issued a ten-point declaration confirming the president in his post as commander in chief and banning further speeches, newspaper articles, and remarks contributing to factionalism.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '15' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-05-27' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On May 27, Khomeini denounced Bani Sadr, without mentioning him by name, for placing himself above the law and ignoring the dictates of the Majlis.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-07' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On June 7, Mizan and Bani Sadr\'s newspaper, Enqelab-e Eslami, were banned.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-08' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '73' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Bani-Ṣadr had aligned himself with the Mojahedin-e Khalq, and on 8 June 1981, he effectively called for an uprising against what he viewed as dictatorship.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '73' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-10' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
              },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '73' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'Three days later, Khomeini removed Bani Sadr from his post as the acting commander in chief of the military.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-12' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'On June 12, a motion for the impeachment of the president was presented by 120 deputies.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-17' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'The speaker of the Majlis, after initially blocking the motion, allowed it to go forward on June 17.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-21' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
              },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '73' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'On June 21, with 30 deputies absenting themselves from the house or abstaining, the Majlis decided for impeachment on a vote of 177 to 1.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-22' },
            cites: [
              {
                source: 'oral-history-ir-2023-dismissal-of-bani-sadr',
                loc: { section: 'Dismissal of Bani-Sadr', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: 'I removed him from the presidency.',
        lang: 'en',
        cite: {
          source: 'oral-history-ir-2023-dismissal-of-bani-sadr',
          loc: { section: 'Dismissal of Bani-Sadr', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://oral-history.ir/?page=post&id=11289' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-07-29' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '75' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q26',
        text: 'After a period in hiding, he fled Tehran and returned to Paris, arriving there on 29 July.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '75' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Abolhassan_Banisadr_portrait_1980_2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abolhassan_Banisadr_portrait_1980_2.jpg',
    credit: { institution: 'sarshomar.com (source named on the Commons file page)' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'banisadr-2001-dars-e-tajrobeh', perspective: 'iranian' },
    { source: 'saberi-2001-mokatebat-e-shahid-rajai-ba-banisadr', perspective: 'iranian' },
    {
      source: 'banisadr-2006-nameha-az-aqa-ye-banisadr-be-aqa-ye-khomeini',
      perspective: 'iranian'
    }
  ]
})
