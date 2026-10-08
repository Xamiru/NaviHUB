import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'israeli-invasion-of-lebanon-1982',
  names: [
    { text: 'Israeli invasion of Lebanon, 1982', lang: 'en', role: 'primary' },
    {
      text: 'Operation Peace for Galilee',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Israel in Lebanon', para: '8' }
        }
      ]
    },
    { text: 'מלחמת לבנון הראשונה', lang: 'he', role: 'native' },
    { text: 'الاجتياح الإسرائيلي للبنان', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1982-06-06' },
        cites: [
          {
            source: 'state-dept-milestones-reagan-administration-and-lebanon',
            loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '4' }
          },
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '8' }
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
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:state-of-israel' },
    { ref: 'polity:united-states' }
  ],
  sides: [
    {
      key: 'israel',
      name: 'Israel Defense Forces',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '4' }
        }
      ]
    },
    {
      key: 'plo',
      name: 'Palestine Liberation Organization',
      cites: [
        {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:menachem-begin',
      role: 'head-of-government',
      side: 'israel',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Israel in Lebanon', para: '5' }
        }
      ]
    },
    {
      name: 'Ariel Sharon',
      role: 'commander',
      side: 'israel',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Israel in Lebanon', para: '5' }
        }
      ]
    },
    {
      name: 'Rafael Eitan',
      role: 'commander',
      side: 'israel',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Israel in Lebanon', para: '9' }
        }
      ]
    },
    {
      name: 'Philip Habib',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '3' }
        }
      ]
    },
    {
      ref: 'person:ronald-reagan',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '5' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:sabra-and-shatila-massacre',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
        }
      ]
    },
    {
      ref: 'event:1948-arab-israeli-war',
      rel: 'related',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Israel in Lebanon', para: '2' }
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
          text: 'Israel\'s incursion into Lebanon, called Operation Peace for Galilee, was launched in early June 1982.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/33.htm' }
        },
        {
          id: 'q2',
          text: 'From 1981 onward, the Reagan administration feared that conflict between Lebanese factions backed by Syria and Israel, along with clashes between Israel and the Palestine Liberation Organization (PLO), could escalate into an Arab-Israeli war. Yet American policymakers differed over how to prevent such a conflict, especially over whether to commit troops for that purpose. Following Israel’s 1982 invasion of Lebanon, the advocates of military intervention won out. But by 1984, terrorist attacks, a lack of diplomatic progress, and congressional opposition led President Ronald Reagan to withdraw U.S. forces from Lebanon.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-reagan-administration-and-lebanon',
            loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/lebanon'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The instability of Lebanon\'s sectarian balance, however, enabled hostile states or groups to use Lebanon as a staging ground for attacks against Israel. The PLO, following its expulsion from Jordan in September 1970, set up its major base of operations in southern Lebanon from which it attacked northern Israel.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/33.htm' }
        },
        {
          id: 'q4',
          text: 'In April 1981, the Israeli Air Force attacked Syrian forces in Lebanon to prevent them from seizing the strategic Sannin ridge. Syria responded by deploying surface-to-air missiles into the Biqa‘ Valley, threatening Israel’s ability to monitor PLO forces in Lebanon. To avert war, Reagan sent emissary Philip Habib to the Middle East, but he failed to persuade the Syrians to withdraw the missiles. When fighting escalated between Israel and the PLO that July, the Reagan administration feared that Israel would invade Lebanon. Ultimately, Habib managed to negotiate a de facto ceasefire between Israel and the PLO.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-reagan-administration-and-lebanon',
            loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/lebanon'
          }
        },
        {
          id: 'q5',
          text: 'His new minister of defense, Ariel Sharon, was unquestionably an Israeli war hero of longstanding; he had played an important role in the 1956, 1967, and 1973 wars and was widely respected as a brilliant military tactician.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/33.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q6',
          text: 'The stated goals of the operation were to free northern Israel from PLO rocket attacks by creating a forty-kilometer-wide security zone in southern Lebanon and by signing a peace treaty with Lebanon.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/33.htm' }
        },
        {
          id: 'q7',
          text: 'The architects of the 1982 invasion, Ariel Sharon and Rafael Eitan, sought to use Israel\'s military strength to create a more favorable regional political setting. This strategy included weakening the PLO and supporting the rise to power in Lebanon of Israel\'s Christian allies.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/33.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q8',
          text: 'The Reagan administration was divided over how to respond to Israel’s invasion. Secretary of State Alexander Haig argued that the United States should not pressure Israel to withdraw without demanding that the PLO and Syria do likewise. Secretary of Defense Caspar Weinberger, Vice President George Bush, and National Security Advisor William Clark wanted the IDF to withdraw immediately and to sanction Israel if they did not.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-reagan-administration-and-lebanon',
            loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/lebanon'
          }
        },
        {
          id: 'q9',
          text: 'By July, the PLO informed Habib that they would leave Beirut if an international force deployed to protect Palestinian civilians. Against Weinberger’s advice, Reagan agreed to contribute Marines to a multinational force (MNF), alongside French and Italian troops. However, the Palestinian withdrawal did not begin until August 21. The United States could not convince any Arab country to receive all PLO fighters from Beirut; they were ultimately dispersed to several states.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-reagan-administration-and-lebanon',
            loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/lebanon'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'The attempt to impose a military solution to the intractable Palestinian problem and to force political change in Lebanon failed. The PLO, although defeated militarily, remained an important political force, and Bashir Jumayyil, Israel\'s major ally in Lebanon, was killed shortly after becoming president.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/33.htm' }
        },
        {
          id: 'q11',
          text: 'On October 23, suicide bombers attacked the barracks of the U.S. and French contingents of the MNF, killing 241 American servicemen. The administration believed that the bombings, like the attack on the U.S. Embassy in Beirut that April, were perpetrated by Shi‘i militants linked to Syria’s ally Iran.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-reagan-administration-and-lebanon',
            loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/lebanon'
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
            value: { d: '1982-06-03' },
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
        id: 'q12',
        text: 'In London on June 3, 1982, Palestinian assailants shot Shlomo Argov, Israel’s ambassador to the United Kingdom.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1981-1988/lebanon'
        }
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
        id: 'q13',
        text: 'The Israel Defense Forces (IDF) invaded Lebanon on June 6.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1981-1988/lebanon'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-06-09' },
            cites: [
              {
                source: 'state-dept-milestones-reagan-administration-and-lebanon',
                loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The debate sharpened when the IDF destroyed Syria’s missiles in the Biqa‘ on June 9, raising the specter of a wider war.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1981-1988/lebanon'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-09-01' },
            cites: [
              {
                source: 'state-dept-milestones-reagan-administration-and-lebanon',
                loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The PLO completed its withdrawal by September 1.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1981-1988/lebanon'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/1982_Lebanon_War_XXXVIII.png/1280px-1982_Lebanon_War_XXXVIII.png',
    page: 'https://commons.wikimedia.org/wiki/File:1982_Lebanon_War_XXXVIII.png',
    credit: { institution: 'IDF Spokesperson\'s Unit' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
