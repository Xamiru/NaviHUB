import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'oslo-accords',
  names: [
    { text: 'Oslo Accords', lang: 'en', role: 'primary' },
    { text: 'اتفاقية أوسلو', lang: 'ar', role: 'native' },
    { text: 'הסכמי אוסלו', lang: 'he', role: 'native' },
    {
      text: 'Declaration of Principles on Interim Self-Government Arrangements',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      text: 'Oslo Accord',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1993-09-13' },
        cites: [
          {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 1,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      ref: 'place:oslo',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '4' }
        }
      ]
    },
    {
      ref: 'place:west-bank',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      ref: 'place:gaza-strip',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      ref: 'place:jerusalem',
      cites: [
        {
          source: 'avalon-israel-plo-declaration-of-principles-1993',
          loc: { section: 'Israel-Palestine Liberation Organization Agreement : 1993', para: '16' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:state-of-israel',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '4' }
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
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      key: 'plo',
      name: 'Palestine Liberation Organization (PLO)',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:yitzhak-rabin',
      role: 'signatory',
      side: 'israel',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      ref: 'person:yasser-arafat',
      role: 'leader',
      side: 'plo',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      name: 'Mahmoud Abbas',
      role: 'signatory',
      side: 'plo',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    },
    {
      name: 'Shimon Peres',
      role: 'diplomat',
      side: 'israel',
      cites: [
        {
          source: 'clinton-1993-09-13-remarks-at-the-signing-of-the-israel-palestinian-agreement',
          loc: { section: 'Remarks at the signing of the Israel-Palestinian agreement' }
        }
      ]
    },
    {
      ref: 'person:bill-clinton',
      role: 'organizer',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:first-intifada', rel: 'preceded-by' },
    { ref: 'event:camp-david-accords', rel: 'related' },
    {
      ref: 'event:assassination-of-yitzhak-rabin',
      rel: 'followed-by',
      cites: [
        {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '8' }
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
          text: 'On September 13, 1993, Israeli Prime Minister Yitzhak Rabin and Palestine Liberation Organization (PLO) Negotiator Mahmoud Abbas signed a Declaration of Principles on Interim Self-Government Arrangements, commonly referred to as the “Oslo Accord,” at the White House.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q2',
          text: 'Israel accepted the PLO as the representative of the Palestinians, and the PLO renounced terrorism and recognized Israel’s right to exist in peace.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Clinton administration did not initially make Israeli-Palestinian peace a priority.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q4',
          text: 'Clinton and his advisors believed that a diplomatic breakthrough on the Israeli-Syrian track would be more likely, and that Israel’s leaders would find it politically easier to pull back from the Golan Heights than to withdraw from the West Bank.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
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
          text: 'The aim of the Israeli Palestinian negotiations within the current Middle East peace process is, among other things, to establish a Palestinian Interim Self-Government Authority, the elected Council, (the "Council") for the Palestinian people in the West Bank and the Gaza Strip, for a transitional period not exceeding five years, leading to a permanent settlement based on Security Council Resolutions 242 and 338.',
          lang: 'en',
          cite: {
            source: 'avalon-israel-plo-declaration-of-principles-1993',
            loc: { section: 'Israel-Palestine Liberation Organization Agreement : 1993', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://avalon.law.yale.edu/20th_century/isrplo.asp'
          }
        },
        {
          id: 'q6',
          text: '1. The five-year transitional period will begin upon the withdrawal from the Gaza strip and Jericho area.',
          lang: 'en',
          cite: {
            source: 'avalon-israel-plo-declaration-of-principles-1993',
            loc: {
              section: 'Israel-Palestine Liberation Organization Agreement : 1993',
              para: '14'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://avalon.law.yale.edu/20th_century/isrplo.asp'
          }
        },
        {
          id: 'q7',
          text: '3. It is understood that these negotiations shall cover remaining issues, including: Jerusalem, refugees, settlements, security arrangements, border, relations and cooperation with their neighbors, and other issues of common interest.',
          lang: 'en',
          cite: {
            source: 'avalon-israel-plo-declaration-of-principles-1993',
            loc: {
              section: 'Israel-Palestine Liberation Organization Agreement : 1993',
              para: '16'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://avalon.law.yale.edu/20th_century/isrplo.asp'
          }
        },
        {
          id: 'q8',
          text: 'Both sides agreed that a Palestinian Authority (PA) would be established and assume governing responsibilities in the West Bank and Gaza Strip over a five-year period.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Worried that the peace process might collapse, the Clinton administration involved itself more actively in Israeli-Palestinian negotiations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q10',
          text: 'In Israel’s May 1999 elections, the Labor Party’s Ehud Barak decisively defeated Netanyahu.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q11',
          text: 'Tension remained high throughout the year. In March, the PA suspended talks with Israel in protest over Israeli settlement construction in annexed East Jerusalem. A series of deadly bombings were carried out inside Israel and claimed by the Islamic Resistance Movement (Hamas). Israel, in a crippling act of collective punishment against more than 1.5 million Palestinians, imposed the tightest restrictions since the Gulf War on the movement of people and goods in the West Bank and Gaza Strip.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-israel-and-the-occupied-territories',
            loc: { section: 'World Report 1998: Israel and the Occupied Territories', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-07.htm'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'The Clinton administration had helped facilitate Israeli-Jordanian peace and lay the foundations for Palestinian self-rule.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q13',
          text: 'Thus, by the end of 2000, the prospect of ending the Arab-Israeli conflict looked more distant than it had eight years earlier.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
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
            value: { d: '1992-12' },
            cites: [
              {
                source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
                loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'U.S. officials were briefed on secret negotiations that the Israelis and Palestinians had begun in Oslo in December 1992, but made little effort to get involved in them.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/milestones/1993-2000/oslo'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1993-09-13' },
            cites: [
              {
                source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
                loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The Government of the State of Israel and the Palestinian team representing the Palestinian people agree that it is time to put an end to decades of confrontation and conflict, recognize their mutual legitimate and political rights, and strive to live in peaceful coexistence and mutual dignity and security to achieve a just, lasting and comprehensive peace settlement and historic reconciliation through the agreed political process.',
        lang: 'en',
        cite: {
          source: 'avalon-israel-plo-declaration-of-principles-1993',
          loc: { section: 'Israel-Palestine Liberation Organization Agreement : 1993', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://avalon.law.yale.edu/20th_century/isrplo.asp'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1994-05' },
            cites: [
              {
                source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
                loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '5' }
              }
            ]
          },
          {
            value: { d: '1995-09' },
            cites: [
              {
                source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
                loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Nor did the United States play a critical part in the negotiations leading up to the May 1994 Cairo Agreement, which finalized Israel’s withdrawal from most of Gaza and Jericho, or the Taba (or "Oslo II") Agreement of September 1995.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/milestones/1993-2000/oslo'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1997-01' },
            cites: [
              {
                source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
                loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In January 1997, following intensive U.S. mediation, Israel and the PA signed the Hebron Protocol, which provided for the transfer of most of Hebron to Palestinian control.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/milestones/1993-2000/oslo'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-10' },
            cites: [
              {
                source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
                loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In October 1998, Clinton hosted Netanyahu and Arafat at the Wye River Plantation, where they negotiated an agreement calling for further Israeli withdrawals from the West Bank.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
          loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/milestones/1993-2000/oslo'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Bill_Clinton%2C_Yitzhak_Rabin%2C_Yasser_Arafat_at_the_White_House_1993-09-13.jpg/1280px-Bill_Clinton%2C_Yitzhak_Rabin%2C_Yasser_Arafat_at_the_White_House_1993-09-13.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bill_Clinton,_Yitzhak_Rabin,_Yasser_Arafat_at_the_White_House_1993-09-13.jpg',
    credit: { institution: 'The White House', creator: 'Vince Musi' },
    license: { id: 'public-domain' }
  }
})
