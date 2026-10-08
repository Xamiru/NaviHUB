import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'camp-david-accords',
  names: [
    { text: 'Camp David Accords', lang: 'en', role: 'primary' },
    { text: 'اتفاقيات كامب ديفيد', lang: 'ar', role: 'alternative' },
    { text: 'הסכמי קמפ דייוויד', lang: 'he', role: 'alternative' }
  ],
  researched: '2026-10-09',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1978-09-05' },
        cites: [
          {
            source: 'state-dept-milestones-camp-david',
            loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '7' }
          },
          {
            source: 'avalon-camp-david-accords-1978',
            loc: { section: 'The Framework for Peace in the Middle East', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1978-09-17' },
        cites: [
          {
            source: 'state-dept-milestones-camp-david',
            loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '7' }
          },
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Peace with Israel', para: '3' }
          },
          {
            source: 'avalon-camp-david-accords-1978',
            loc: { section: 'The Framework for Peace in the Middle East', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:camp-david',
      cites: [
        {
          source: 'avalon-camp-david-accords-1978',
          loc: { section: 'The Framework for Peace in the Middle East', para: '3' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'egypt',
      name: 'Egypt',
      cites: [
        {
          source: 'avalon-camp-david-accords-1978',
          loc: { section: 'The Framework for Peace in the Middle East', para: '3' }
        }
      ],
      polity: 'polity:republic-of-egypt'
    },
    {
      key: 'israel',
      name: 'Israel',
      cites: [
        {
          source: 'avalon-camp-david-accords-1978',
          loc: { section: 'The Framework for Peace in the Middle East', para: '3' }
        }
      ],
      polity: 'polity:state-of-israel'
    }
  ],
  participants: [
    {
      ref: 'person:anwar-sadat',
      role: 'signatory',
      side: 'egypt',
      cites: [
        {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      ref: 'person:menachem-begin',
      role: 'signatory',
      side: 'israel',
      cites: [
        {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      ref: 'person:jimmy-carter',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      name: 'Cyrus Vance',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:yom-kippur-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '1' }
        }
      ]
    },
    {
      ref: 'event:iranian-revolution',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '9' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Menahem_Begin_and_Anwar_Sadat_greet_each_other_at_Camp_David._-_NARA_-_181090.tif/lossy-page1-1280px-Menahem_Begin_and_Anwar_Sadat_greet_each_other_at_Camp_David._-_NARA_-_181090.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Menahem_Begin_and_Anwar_Sadat_greet_each_other_at_Camp_David._-_NARA_-_181090.tif',
    credit: { institution: 'U.S. National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q7',
          text: 'The Camp David Accords, signed by President Jimmy Carter, Egyptian President Anwar Sadat, and Israeli Prime Minister Menachem Begin in September 1978, established a framework for a historic peace treaty concluded between Israel and Egypt in March 1979.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-camp-david',
            loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/camp-david'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q8',
          text: 'By early November, Egyptian President Sadat found himself frustrated by the lack of movement and made a dramatic move, announcing on November 9 that he would be willing to go to Jerusalem. This move stunned the world. Sadat would attempt to break the deadlock and to engage the Israelis directly for a Middle East settlement, eschewing any talk of returning to the Geneva Conference.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-camp-david',
            loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/camp-david'
          }
        },
        {
          id: 'q9',
          text: 'The international climate at the time of Begin\'s rise to power in May 1977 leaned strongly toward some type of superpowersanctioned settlement to the Arab-Israeli dispute.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Peace Process', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/31.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q10',
          text: 'The talks proved extremely challenging, especially when the trilateral format became impossible to sustain. Instead, Carter and Vance met with the Egyptian and Israeli delegations individually over the course of the next twelve days.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-camp-david',
            loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/camp-david'
          }
        },
        {
          id: 'q11',
          text: 'In the end, while the Summit did not produce a formal peace agreement, it successfully produced the basis for an Egyptian-Israeli peace, in the form of two “Framework” documents, which laid out the principles of a bilateral peace agreement as well as a formula for Palestinian self-government in Gaza and the West Bank.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-camp-david',
            loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/camp-david'
          }
        },
        {
          id: 'q12',
          text: 'Muhammad Anwar al-Sadat, President of the Arab Republic of Egypt, and Menachem Begin, Prime Minister of Israel, met with Jimmy Carter, President of the United States of America, at Camp David from September 5 to September 17, 1978, and have agreed on the following framework for peace in the Middle East.',
          lang: 'en',
          cite: {
            source: 'avalon-camp-david-accords-1978',
            loc: { section: 'The Framework for Peace in the Middle East', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://avalon.law.yale.edu/20th_century/campdav.asp'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q13',
          text: 'The Camp David Accords made Sadat a hero in Europe and the United States. The reaction in Egypt was generally favorable, but there was opposition from the left and from the Muslim Brotherhood. In the Arab world, Sadat was almost universally condemned. Only Sudan issued an ambivalent statement of support. The Arab states suspended all official aid and severed diplomatic relations. Egypt was expelled from the Arab League, which it was instrumental in founding, and from other Arab institutions.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Peace with Israel', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/44.htm' }
        },
        {
          id: 'q14',
          text: 'Begin\'s limited view of Palestinian autonomy in the West Bank became apparent almost immediately after the agreement known as the Treaty of Peace Between Egypt and Israel was signed in March 1979. The following month his government approved two new settlements between Ram Allah and Nabulus. The military government established civilian regional councils for the Jewish settlements. Finally, and most provocative, autonomy plans were prepared in which Israel would keep exclusive control over the West Bank\'s water, communications, roads, public order, and immigration.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Peace Process', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/31.htm' }
        },
        {
          id: 'q15',
          text: 'The Camp David Accords brought peace to Egypt but not prosperity.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/45.htm' }
        },
        {
          id: 'q16',
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
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1977-05-17' },
            cites: [
              {
                source: 'state-dept-milestones-camp-david',
                loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q1',
        text: 'On May 17, 1977, an Israeli election upset stunned the Carter administration as the moderate Israeli Labor Party lost for the first time in Israel’s history. Menachem Begin, the leader of the conservative Likud Party and the new Israeli Prime Minister, appeared intractable on the issue of exchanging land for peace.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1977-1980/camp-david'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1977-11-19' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Peace with Israel', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q2',
        text: 'After the food riots of January 1977, Sadat decided that something dramatic had to be done, and so on November 19, 1977, in response to an invitation from Begin, Sadat journeyed to Jerusalem.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Peace with Israel', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/44.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-07-30' },
            cites: [
              {
                source: 'state-dept-milestones-camp-david',
                loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'By July 30, as Sadat expressed disappointment over the progress of negotiations and a desire to cut direct contacts off with the Israelis, Carter decided to call for a summit meeting. This meeting would bring Sadat, Begin, and Carter together at the presidential retreat in Maryland at Camp David.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1977-1980/camp-david'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-09-05' },
            cites: [
              {
                source: 'state-dept-milestones-camp-david',
                loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'The Camp David Summit, held from September 5–17, 1978, was a pivotal moment both in the history of the Arab-Israeli dispute and U.S. diplomacy.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1977-1980/camp-david'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-09-17' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Peace with Israel', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'On September 17, however, Carter announced that the Camp David Accords had been reached. They consisted of two parts, the Framework for Peace in the Middle East and the Framework for the Conclusion of a Peace Treaty between Israel and Egypt.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Peace with Israel', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/44.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-03-26' },
            cites: [
              {
                source: 'state-dept-milestones-camp-david',
                loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'the U.S. and Israeli delegations agreed to a treaty text on March 13. Sadat quickly assented to the agreement and the Egyptian-Israeli Peace Treaty was formally signed on March 26.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-camp-david',
          loc: { section: 'Camp David Accords and the Arab-Israeli Peace Process', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1977-1980/camp-david'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'sadat-1978-in-search-of-identity', perspective: 'arab' },
    { source: 'said-1980-the-question-of-palestine', perspective: 'palestinian' },
    { source: 'dayan-1981-breakthrough', perspective: 'israeli' }
  ]
})
