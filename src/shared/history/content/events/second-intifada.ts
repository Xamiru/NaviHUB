import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-intifada',
  names: [
    { text: 'Second Intifada', lang: 'en', role: 'primary' },
    {
      text: 'Al-Aqsa Intifada',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '13' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '2000-09-28' },
        cites: [
          {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '13' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2005-02-08' },
        cites: [
          {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:jerusalem',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '13' }
        }
      ]
    },
    {
      ref: 'place:west-bank',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    },
    {
      ref: 'place:gaza-strip',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'israel',
      name: 'Israel',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    },
    {
      key: 'palestinians',
      name: 'Palestinians',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ariel-sharon',
      role: 'head-of-government',
      side: 'israel',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    },
    {
      ref: 'person:yasser-arafat',
      role: 'leader',
      side: 'palestinians',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    },
    {
      ref: 'person:mahmoud-abbas',
      role: 'leader',
      side: 'palestinians',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    },
    {
      ref: 'person:bill-clinton',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '12' }
        }
      ]
    },
    {
      name: 'Ehud Barak',
      role: 'head-of-government',
      side: 'israel',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '12' }
        }
      ]
    },
    {
      name: 'Hamas',
      role: 'combatant',
      side: 'palestinians',
      cites: [
        {
          source: 'hrw-2002-10-erased-in-a-moment-suicide-bombing-attacks-against-israeli-civilians',
          loc: { section: 'Erased in a Moment' }
        }
      ]
    },
    {
      name: 'Islamic Jihad',
      role: 'combatant',
      side: 'palestinians',
      cites: [
        {
          source: 'hrw-2002-10-erased-in-a-moment-suicide-bombing-attacks-against-israeli-civilians',
          loc: { section: 'Erased in a Moment' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      side: 'palestinians',
      value: {
        alts: [
          {
            value: { min: 3000, qualifier: 'nearly' },
            cites: [
              {
                source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'israel',
      value: {
        alts: [
          {
            value: { min: 900, qualifier: 'over' },
            cites: [
              {
                source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:oslo-accords',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '12' }
        }
      ]
    },
    {
      ref: 'event:israeli-disengagement-from-gaza',
      rel: 'led-to',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    },
    {
      ref: 'person:ariel-sharon',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '13' }
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
          text: 'On September 28, riots erupted following a visit of Likud Party leader Ariel Sharon to the Temple Mount, and soon escalated into a wave of Israeli-Palestinian violence that became known as the al-Aqsa Intifada.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q2',
          text: 'Many civilians were among the over seven hundred Palestinians and over two hundred Israelis who, by November 2001, had been killed in the violence that followed the eruption of clashes between Israelis and Palestinians in September 2000.',
          lang: 'en',
          cite: {
            source: 'hrw-2002-world-report-israel-and-the-occupied-territories',
            loc: {
              section: 'World Report 2002: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/legacy/wr2k2/mena5.html' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At the prime minister’s insistence, Clinton convened a summit at Camp David in July 2000, where he, Barak, and Arafat attempted to reach a final agreement on the West Bank and the Gaza Strip.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q4',
          text: 'Accounts differ as to why Camp David failed, but it is clear that despite additional concessions by Barak, the Israelis and Palestinians remained strongly at odds over borders, Jerusalem, and whether Israel would recognize Palestinian refugees’ “right of return.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Israeli security forces were responsible for extensive abuses, including indiscriminate and excessive use of lethal force against unarmed Palestinian demonstrators; unlawful or suspicious killings by Israel Defense Forces (IDF) soldiers; disproportionate IDF gunfire in response to Palestinian attacks; inadequate IDF response to abuses by Israeli settlers against Palestinian civilians; and "closure" measures on Palestinian communities that amounted to collective punishment.',
          lang: 'en',
          cite: {
            source: 'hrw-2002-world-report-israel-and-the-occupied-territories',
            loc: {
              section: 'World Report 2002: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/legacy/wr2k2/mena5.html' }
        },
        {
          id: 'q6',
          text: 'More than 415 Israeli and other civilians have been killed, and more than two thousand injured, as a result of attacks by armed Palestinians between September 30, 2000 and August 31, 2002.',
          lang: 'en',
          cite: {
            source: 'hrw-2002-10-erased-in-a-moment-suicide-bombing-attacks-against-israeli-civilians',
            loc: { section: 'Erased in a Moment' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2002/10/15/erased-moment/suicide-bombing-attacks-against-israeli-civilians'
          }
        },
        {
          id: 'q7',
          text: 'During the operation, Israeli soldiers repeatedly used indiscriminate and excessive force, killed civilians willfully and unlawfully, and used Palestinian civilians as human shields.',
          lang: 'en',
          cite: {
            source: 'hrw-2003-world-report-israel-and-the-occupied-territories',
            loc: {
              section: 'World Report 2003: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k3/mideast5.html'
          }
        },
        {
          id: 'q8',
          text: 'Israeli troops re-occupied all major population centers except Jericho, and instituted the heaviest restrictions on civilian movement in the Occupied Territories to date.',
          lang: 'en',
          cite: {
            source: 'hrw-2003-world-report-israel-and-the-occupied-territories',
            loc: {
              section: 'World Report 2003: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k3/mideast5.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'While the total number of Israeli and Palestinian casualties fell in 2005 following the February ceasefire, the overall human rights situation in Israel and the OPT remained grave.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q10',
          text: 'The Israeli authorities continue a policy of closure, imposing severe and frequently arbitrary restrictions on freedom of movement in the West Bank, Gaza Strip, and East Jerusalem, contributing to a serious humanitarian crisis marked by extreme poverty, unemployment, and food insecurity.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q11',
          text: 'During 2005, Israel continued with its construction of the wall, notwithstanding the International Court of Justice’s Advisory Opinion declaring the construction of the wall inside the OPT a violation of IHL, and demanding that Israel cease further construction inside the OPT.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q12',
          text: 'At least 1,949 Palestinians and 637 Israelis were killed between September 2000 and late October 2002, the majority civilians, including 292 Palestinian and seventy-nine Israeli children.',
          lang: 'en',
          cite: {
            source: 'hrw-2003-world-report-israel-and-the-occupied-territories',
            loc: {
              section: 'World Report 2003: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k3/mideast5.html'
          }
        },
        {
          id: 'q13',
          text: 'Since the beginning of the current intifada in September 2000, Israel has killed nearly three thousand Palestinians in the West Bank and Gaza, including more than six hundred children.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
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
            value: { d: '2000-07' },
            cites: [
              {
                source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
                loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The summit ended without a settlement; Clinton would blame Arafat for its failure.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1993-2000/oslo'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2000-12' },
            cites: [
              {
                source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
                loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In December 2000, Clinton put forward his own proposals for an Israeli-Palestinian agreement.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1993-2000/oslo'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2001-01-01' },
            cites: [
              {
                source: 'hrw-2002-10-erased-in-a-moment-suicide-bombing-attacks-against-israeli-civilians',
                loc: { section: 'Erased in a Moment' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The first suicide bomb attack against civilians after the resumption of clashes between Palestinians and Israelis in September 2000 occurred at a bus stop in Netanya on January 1, 2001.',
        lang: 'en',
        cite: {
          source: 'hrw-2002-10-erased-in-a-moment-suicide-bombing-attacks-against-israeli-civilians',
          loc: { section: 'Erased in a Moment' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2002/10/15/erased-moment/suicide-bombing-attacks-against-israeli-civilians'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2002-03' },
            cites: [
              {
                source: 'hrw-2003-world-report-israel-and-the-occupied-territories',
                loc: {
                  section: 'World Report 2003: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
                  para: '5'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Repeated militarized "arrest raids" into PA-controlled areas in late 2001 grew in size and intensity until, in March 2002, the IDF mobilized some thirty thousand troops for Operation Defensive Shield, reportedly Israel\'s largest military operation since the 1982 invasion of Lebanon.',
        lang: 'en',
        cite: {
          source: 'hrw-2003-world-report-israel-and-the-occupied-territories',
          loc: {
            section: 'World Report 2003: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
            para: '5'
          }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/legacy/wr2k3/mideast5.html' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2002-04' },
            cites: [
              {
                source: 'hrw-2003-world-report-israel-and-the-occupied-territories',
                loc: {
                  section: 'World Report 2003: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In Jenin, Human Rights Watch documented twenty-two civilian killings during the IDF military operations in April.',
        lang: 'en',
        cite: {
          source: 'hrw-2003-world-report-israel-and-the-occupied-territories',
          loc: {
            section: 'World Report 2003: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
            para: '7'
          }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/legacy/wr2k3/mideast5.html' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-01-09' },
            cites: [
              {
                source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'Following the death of Palestinian leader Yasser Arafat in November 2004, Palestinians held their second-ever national elections on January 9, 2005.',
        lang: 'en',
        cite: {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-02-08' },
            cites: [
              {
                source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'On February 8, 2005 Mahmoud Abbas and Israeli Prime Minister Ariel Sharon met in Sharm el-Sheikh for the first Israeli-Palestinian summit in four years.',
        lang: 'en',
        cite: {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Israeli_West_Bank_Barrier.jpg/1280px-Israeli_West_Bank_Barrier.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Israeli_West_Bank_Barrier.jpg',
    credit: { creator: 'Justin McIntosh' },
    license: { id: 'cc-by', version: '2.0', url: 'https://creativecommons.org/licenses/by/2.0' }
  }
})
