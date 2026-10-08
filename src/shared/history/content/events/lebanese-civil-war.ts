import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'lebanese-civil-war',
  names: [
    { text: 'Lebanese Civil War', lang: 'en', role: 'primary' },
    {
      text: 'الحرب الأهلية اللبنانية',
      lang: 'ar',
      role: 'native',
      translit: 'al-Ḥarb al-ahliyya al-Lubnāniyya'
    },
    {
      text: 'Civil War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '-1' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1975-04-13' },
        cites: [
          {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:beirut',
      cites: [
        {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'lebanese-front',
      name: 'Lebanese Front',
      cites: [
        {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '5' }
        }
      ]
    },
    {
      key: 'lnm',
      name: 'Lebanese National Movement',
      cites: [
        {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Pierre Jumayyil',
      role: 'leader',
      side: 'lebanese-front',
      cites: [
        {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '1' }
        }
      ]
    },
    {
      name: 'Kamal Jumblatt',
      role: 'leader',
      side: 'lnm',
      cites: [
        {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '5' }
        }
      ]
    },
    {
      name: 'Sulayman Franjiyah',
      role: 'head-of-state',
      side: 'lebanese-front',
      cites: [
        {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '3' }
        }
      ]
    },
    {
      name: 'Ilyas Sarkis',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '9' }
        }
      ]
    },
    {
      name: 'Hafiz al-Assad',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '9' }
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
            value: { min: 44000, qualifier: 'nearly' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '13' }
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
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 180000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '13' }
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
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Civil_war_Lebanon_map_1976a.gif',
    page: 'https://commons.wikimedia.org/wiki/File:Civil_war_Lebanon_map_1976a.gif',
    credit: {
      institution: 'Map by Oleksii0 (Wikimedia Commons), after warsoflebanon.com',
      creator: 'Oleksii0'
    },
    license: { id: 'cc-by-sa', version: '3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The spark that ignited the war occurred in Beirut on April 13, 1975, when gunmen killed four Phalangists during an attempt on Pierre Jumayyil\'s life. Perhaps believing the assassins to have been Palestinian, the Phalangists retaliated later that day by attacking a bus carrying Palestinian passengers across a Christian neighborhood, killing about twenty-six of the occupants.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
        },
        {
          id: 'q2',
          text: 'Although the two warring factions were often characterized as Christian versus Muslim, their individual composition was far more complex.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The expulsion of large numbers of Palestinian guerrillas from Jordan in late 1970 and 1971, as a result of severe clashes between the Jordanian army and the PLO, had serious repercussions for Lebanon, however. Many of the guerrillas entered Lebanon, seeing it as the most suitable base for launching raids against Israel. The guerrillas tended to ally themselves with existing leftist Lebanese organizations or to form various new leftist groups that received support from the Lebanese Muslim community and caused further splintering in the Lebanese body politic.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Franjiyah Era', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/26.htm' }
        },
        {
          id: 'q4',
          text: 'The inadequacies of the political system, which the 1943 National Pact had only papered over temporarily, reappeared more clearly than ever. For many observers, at the bottom of the conflict was the issue of confessionalism out of balance--of a minority, specifically the Maronites, refusing to share power and economic opportunity with the Muslim majority.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'As various other groups took sides, the fighting spread to other areas of the country, forcing residents in towns with mixed sectarian populations to seek safety in regions where their sect was dominant. Even so, the militias became embroiled in a pattern of attack followed by retaliation, including acts against uninvolved civilians.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
        },
        {
          id: 'q6',
          text: 'Those in favor of maintaining the status quo came to be known as the Lebanese Front. The groups included primarily the Maronite militias of the Jumayyil, Shamun, and Franjiyah clans, often led by the sons of zuama. Also in this camp were various militias of Maronite religious orders. The side seeking change, usually referred to as the Lebanese National Movement, was far less cohesive and organized. For the most part it was led by Kamal Jumblatt and included a variety of militias from leftist organizations and guerrillas from rejectionist Palestinian (nonmainstream PLO) organizations.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
        },
        {
          id: 'q7',
          text: 'That month the Lebanese Front began a siege of Tall Zatar, a densely populated Palestinian refugee camp in East Beirut; the Lebanese Front also overran and leveled Karantina, a Muslim quarter in East Beirut. These actions finally brought the main forces of the PLO, the Palestine Liberation Army (PLA), into the battle.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
        },
        {
          id: 'q8',
          text: 'As Lebanese Front fortunes declined, two outcomes seemed likely: the establishment in Mount Lebanon of an independent Christian state, viewed as a "second Israel" by some; or, if the Lebanese National Movement won the war, the creation of a radical, hostile state on Syria\'s western border. Neither of these possibilities was viewed as acceptable to Assad. To prevent either scenario, at the end of May 1976 Syria intervened militarily against the Lebanese National Movement, hoping to end the fighting swiftly.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Syria\'s presence in Lebanon was legitimated by the establishment of the Arab Deterrent Force (ADF) by the Arab League in October 1976.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
        },
        {
          id: 'q10',
          text: 'Thus, after more than one and one-half years of devastation, relative calm returned to Lebanon. Although the exact cost of the war will never be known, deaths may have approached 44,000, with about 180,000 wounded; many thousands of others were displaced or left homeless, or had migrated.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Civil War', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
        },
        {
          id: 'q11',
          text: 'So strong was their presence that certain areas became known as Fatahland, after the main PLO grouping. Relations with Syria and the problem of the Palestinians in southern Lebanon remained central concerns for Lebanon throughout the period from 1976 to 1982.',
          lang: 'en',
          cite: {
            source: 'loc-lebanon-country-study-1987',
            loc: { section: 'The Sarkis Administration', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/28.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1975-05' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Consequently, in May Prime Minister Rashid as Sulh and his cabinet resigned, and a new government was formed under Rashid Karami.',
        lang: 'en',
        cite: {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-01' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Syrian diplomatic involvement grew during 1976, but it had little success in restoring order in the first half of the year. In January it organized a cease-fire and set up the High Military Committee, through which it negotiated with all sides.',
        lang: 'en',
        cite: {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-02-14' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On February 14, 1976, in what was considered a political breakthrough, Syria helped negotiate a seventeen-point reform program known as the Constitutional Document.',
        lang: 'en',
        cite: {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-03' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In that month dissident Muslim troops, led by Lieutenant Ahmad Khatib, mutinied, creating the Lebanese Arab Army. Joining the Lebanese National Movement, they made significant penetrations into Christian-held Beirut and launched an attack on the presidential palace, forcing Franjiyah to flee to Mount Lebanon.',
        lang: 'en',
        cite: {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-05' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Continuing its search for a domestic political settlement to the war, in May the Chamber of Deputies elected Ilyas Sarkis to take over as president when Franjiyah\'s term expired in September.',
        lang: 'en',
        cite: {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-05' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'To prevent either scenario, at the end of May 1976 Syria intervened militarily against the Lebanese National Movement, hoping to end the fighting swiftly. This decision, however, proved ill conceived, as Syrian forces met heavy resistance and suffered many casualties. Moreover, by entering the conflict on the Christian side Syria provoked outrage from much of the Arab world.',
        lang: 'en',
        cite: {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-10-16' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '11' }
              },
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Civil War', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'Rather than crush the resistance altogether, at this time Syria chose to participate in an Arab peace conference held in Riyadh, Saudi Arabia, on October 16, 1976.',
        lang: 'en',
        cite: {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Civil War', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-03' },
            cites: [
              {
                source: 'loc-lebanon-country-study-1987',
                loc: { section: 'The Sarkis Administration', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The situation in the south was exacerbated by the entry of the Israel Defense Forces (IDF) into southern Lebanon in retaliation for a March 11, 1978, Palestinian guerrilla attack on an Israeli bus near Tel Aviv, in which several people were killed.',
        lang: 'en',
        cite: {
          source: 'loc-lebanon-country-study-1987',
          loc: { section: 'The Sarkis Administration', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/lebanon/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-06-06' },
            cites: [
              {
                source: 'state-dept-milestones-reagan-administration-and-lebanon',
                loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'In London on June 3, 1982, Palestinian assailants shot Shlomo Argov, Israel’s ambassador to the United Kingdom. The Israel Defense Forces (IDF) invaded Lebanon on June 6.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1981-1988/lebanon'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-09-14' },
            cites: [
              {
                source: 'state-dept-milestones-reagan-administration-and-lebanon',
                loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'On September 14, Lebanese President-elect Bashir Gemayel, whose election had been backed by the Israelis, was assassinated. Citing a need to prevent civil disorder, the IDF entered West Beirut. By September 18, it became clear that the Israelis had allowed Maronite militiamen to enter the Sabra and Shatilla camps and massacre Palestinian civilians.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1981-1988/lebanon'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1983-10-23' },
            cites: [
              {
                source: 'state-dept-milestones-reagan-administration-and-lebanon',
                loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'On October 23, suicide bombers attacked the barracks of the U.S. and French contingents of the MNF, killing 241 American servicemen.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1981-1988/lebanon'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1984-02-07' },
            cites: [
              {
                source: 'state-dept-milestones-reagan-administration-and-lebanon',
                loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'Almost immediately afterward, however, pro-Syrian militias overran West Beirut, and on February 7, Reagan announced that the Marines would withdraw offshore.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1981-1988/lebanon'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'traboulsi-2007-history-of-modern-lebanon', perspective: 'arab' }
  ]
})
