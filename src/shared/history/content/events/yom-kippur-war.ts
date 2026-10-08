import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'yom-kippur-war',
  names: [
    { text: 'Yom Kippur War', lang: 'en', role: 'primary' },
    {
      text: 'October 1973 War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The October 1973 War', para: '1' }
        },
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'October 1973 War', para: '1' }
        }
      ]
    },
    {
      text: '1973 Arab-Israeli War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '1' }
        }
      ]
    },
    {
      text: 'מלחמת יום הכיפורים',
      lang: 'he',
      role: 'native',
      translit: 'Milḥemet Yom HaKippurim'
    },
    { text: 'حرب أكتوبر', lang: 'ar', role: 'alternative', translit: 'Ḥarb Uktūbar' }
  ],
  researched: '2026-10-09',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1973-10-06' },
        cites: [
          {
            source: 'state-dept-milestones-arab-israeli-war-1973',
            loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
          },
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The October 1973 War', para: '1' }
          },
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1973-10-25' },
        cites: [
          {
            source: 'state-dept-milestones-arab-israeli-war-1973',
            loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:sinai-peninsula',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
        }
      ]
    },
    {
      ref: 'place:golan-heights',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
        }
      ]
    },
    {
      ref: 'place:suez-canal',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'October 1973 War', para: '4' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'egypt-syria',
      name: 'Egypt and Syria',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
        }
      ],
      polity: 'polity:republic-of-egypt'
    },
    {
      key: 'israel',
      name: 'Israel',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
        }
      ],
      polity: 'polity:state-of-israel'
    }
  ],
  participants: [
    {
      ref: 'person:anwar-sadat',
      role: 'leader',
      side: 'egypt-syria',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'October 1973 War', para: '1' }
        }
      ]
    },
    {
      name: 'Hafiz al-Assad',
      role: 'leader',
      side: 'egypt-syria',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'October 1973 War', para: '8' }
        }
      ]
    },
    {
      name: 'Golda Meir',
      role: 'leader',
      side: 'israel',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The October 1973 War', para: '1' }
        }
      ]
    },
    {
      ref: 'person:henry-kissinger',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
        }
      ]
    },
    {
      ref: 'person:richard-nixon',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
        }
      ]
    },
    {
      ref: 'person:leonid-brezhnev',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      side: 'egypt-syria',
      value: {
        alts: [
          {
            value: { min: 8000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'October 1973 War', para: '11' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'israel',
      value: {
        alts: [
          {
            value: { min: 6000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'The October 1973 War', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:1973-oil-crisis',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '1' }
        }
      ]
    },
    {
      ref: 'event:camp-david-accords',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
        }
      ]
    },
    {
      ref: 'polity:soviet-union',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
        }
      ]
    },
    {
      ref: 'polity:saudi-arabia',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'The Reigns of Saud and Faisal', para: '27' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Israeli_Forces_in_the_Sinai%2C_Moving_Towards_Suez_Canal%2C_Yom_Kippur_War_1973.jpg/1280px-Israeli_Forces_in_the_Sinai%2C_Moving_Towards_Suez_Canal%2C_Yom_Kippur_War_1973.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Israeli_Forces_in_the_Sinai,_Moving_Towards_Suez_Canal,_Yom_Kippur_War_1973.jpg',
    credit: {
      institution: 'National Library of Israel',
      creator: 'Israel Press and Photo Agency (I.P.P.A.) photographer'
    },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q8',
          text: 'On Yom Kippur, the Jewish Day of Atonement, October 6, 1973, Syria and Egypt launched a surprise attack against Israel.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The October 1973 War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/27.htm' }
        },
        {
          id: 'q9',
          text: 'For the Arabs, it was the fasting month of Ramadan, and for Israel it was Yom Kippur.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q10',
          text: 'The June 1967 War had been a humiliating defeat for the Arabs. Without a military victory, any Arab leader who agreed to negotiate directly with Israel would do so from a position of extreme weakness.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
        },
        {
          id: 'q11',
          text: 'In retrospect, there were indications that Egypt was preparing for war. On July 17, 1972, Sadat expelled the 15,000 Soviet advisers from Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
        },
        {
          id: 'q12',
          text: 'Despite Sadat’s public displays of frustration, as well as warnings from Jordan’s King Hussein and Soviet Secretary-General Leonid Brezhnev, Nixon and Kissinger believed that given the military balance, Egypt and Syria would not attack Israel, a view supported by much of the U.S. intelligence community.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1973',
            loc: { section: 'The 1973 Arab-Israeli War', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q19',
          text: 'On March 26, 1973, Sadat assumed the additional title of prime minister and formed a new government designed to continue preparations for a confrontation with Israel.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
        },
        {
          id: 'q13',
          text: 'Then on October 6, 1973, Egyptian forces launched a successful surprise attack across the Suez Canal.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
        },
        {
          id: 'q14',
          text: 'On October 24, Brezhnev sent Nixon a hotline message suggesting that the United States and the Soviet Union send troops to Egypt to “implement” the ceasefire. If Nixon chose not to do so, Brezhnev threatened, “We should be faced with the necessity urgently to consider the question of taking appropriate steps unilaterally.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1973',
            loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q15',
          text: 'The loss of equipment and the decline of production and exports as a consequence of mobilization came to nearly US$7 billion, the equivalent of Israel\'s gross national product (GNP) for an entire year.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The October 1973 War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/27.htm' }
        },
        {
          id: 'q16',
          text: 'The effect of the war on the morale of the Egyptian population, however, was immense.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
        },
        {
          id: 'q17',
          text: 'On June 5, 1975, the Suez Canal was reopened.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q18',
          text: 'The 1973 Arab-Israeli War was a watershed for U.S. foreign policy toward the Middle East. It forced the Nixon administration to realize that Arab frustration over Israel’s unwillingness to withdraw from the territories it had occupied in 1967 could have major strategic consequences for the United States. The war thus paved the way for Secretary of State Henry Kissinger’s “shuttle diplomacy” and ultimately, the Israeli-Egyptian peace treaty of 1979.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1973',
            loc: { section: 'The 1973 Arab-Israeli War', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973'
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
            value: { d: '1973-10-06' },
            cites: [
              {
                source: 'state-dept-milestones-arab-israeli-war-1973',
                loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q1',
        text: 'On October 6, 1973, Egypt and Syria attacked Israel’s forces in the Sinai Peninsula and the Golan Heights. Despite initial Israeli setbacks, Kissinger, now both Secretary of State and National Security Advisor, believed that Israel would win quickly.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-10-10' },
            cites: [
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'The October 1973 War', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q2',
        text: 'Finally, on October 10 the tide of the war turned; the Syrians were driven out of all territories conquered by them at the beginning of the war and on the following day Israeli forces advanced into Syria proper, about twenty kilometers from the outskirts of Damascus.',
        lang: 'en',
        cite: {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The October 1973 War', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-10-14' },
            cites: [
              {
                source: 'state-dept-milestones-arab-israeli-war-1973',
                loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'Not wanting to see Israel defeated, Nixon agreed, and American planes carrying weapons began arriving in Israel on October 14.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-10-16' },
            cites: [
              {
                source: 'state-dept-milestones-arab-israeli-war-1973',
                loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'With the American airlift underway, the fighting turned against the Arabs. On October 16, IDF units crossed the Suez Canal.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-10-17' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'October 1973 War', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'On October 17 the Arab oil producers announced a program of reprisals against the Western backers of Israel: a 5 percent cutback in output, followed by further such reductions every month until Israel had withdrawn from all the occupied territories and the rights of the Palestinians had been restored.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'October 1973 War', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-10-22' },
            cites: [
              {
                source: 'state-dept-milestones-arab-israeli-war-1973',
                loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'A U.S.-Soviet proposal for a ceasefire followed by peace talks was adopted by the UN Security Council as Resolution 338 on October 22.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-10-25' },
            cites: [
              {
                source: 'state-dept-milestones-arab-israeli-war-1973',
                loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The United States responded by putting its nuclear forces on worldwide alert on October 25. By the end of the day, the crisis abated when the Security Council adopted Resolution 340, which called for a ceasefire, the withdrawal of all forces to their October 22 positions, and U.N. observers and peacekeepers to monitor the ceasefire. This time, the Israelis accepted the resolution.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-arab-israeli-war-1973',
          loc: { section: 'The 1973 Arab-Israeli War', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973'
        }
      }
    }
  ],
  archive: [
    {
      id: 'a1',
      mediaKind: 'audio',
      title: 'Israel Radio During 73 War',
      date: { d: '1973-10' },
      url: 'https://archive.org/download/RadioCairoDuring73War/Israel%20Radio%20During%2073%20War.mp3',
      page: 'https://archive.org/details/sraa-spj3t7kszqt0ql8nepvyw5psvcvrgr',
      credit: { institution: 'Shortwave Radio Audio Archive', creator: 'Dan Robinson' },
      license: {
        id: 'cc-by-nc',
        version: '3.0',
        url: 'https://creativecommons.org/licenses/by-nc/3.0/deed.en_US'
      },
      bytes: 6446183,
      durationSec: 403
    },
    {
      id: 'a2',
      mediaKind: 'audio',
      title: 'Radio Cairo During 73 war',
      date: { d: '1973-10' },
      url: 'https://archive.org/download/RadioCairoDuring73War/Radio%20Cairo%20During%2073%20war.mp3',
      page: 'https://archive.org/details/sraa-spj3t7kszqt0ql8nepvyw5psvcvrgr',
      credit: { institution: 'Shortwave Radio Audio Archive', creator: 'Dan Robinson' },
      license: {
        id: 'cc-by-nc',
        version: '3.0',
        url: 'https://creativecommons.org/licenses/by-nc/3.0/deed.en_US'
      },
      bytes: 3801337,
      durationSec: 238
    }
  ],
  furtherReading: [
    { source: 'heikal-1975-road-to-ramadan', perspective: 'arab' },
    { source: 'el-shazly-1980-the-crossing-of-the-suez', perspective: 'arab' }
  ]
})
