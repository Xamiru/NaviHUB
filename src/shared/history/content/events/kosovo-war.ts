import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'kosovo-war',
  names: [
    { text: 'Kosovo war', lang: 'en', role: 'primary' },
    { text: 'Lufta e Kosovës', lang: 'sq', role: 'native' },
    { text: 'Косовски рат', lang: 'sr', role: 'native', translit: 'Kosovski rat' }
  ],
  researched: '2026-10-10',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1998-02-28' },
        cites: [
          {
            source: 'hrw-2001-under-orders-the-nato-air-campaign',
            loc: { section: 'The NATO Air Campaign', para: '13' }
          },
          {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '99' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1999-06-12' },
        cites: [
          {
            source: 'hrw-2001-under-orders-executive-summary',
            loc: { section: 'Executive Summary', para: '1' }
          },
          {
            source: 'hrw-2001-under-orders-march-june-1999-an-overview',
            loc: { section: 'March-June 1999: An Overview', para: '106' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:kosovo',
      cites: [
        {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
        }
      ]
    },
    { ref: 'place:pristina' }
  ],
  sides: [
    {
      key: 'fry',
      name: 'Serbian and Yugoslav government forces',
      cites: [
        {
          source: 'hrw-2001-under-orders-executive-summary',
          loc: { section: 'Executive Summary', para: '1' }
        }
      ]
    },
    {
      key: 'kla',
      name: 'Kosovo Liberation Army',
      cites: [
        {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '114' }
        }
      ]
    },
    {
      key: 'nato',
      name: 'NATO',
      cites: [
        {
          source: 'white-house-1999-03-24-statement-to-the-nation-on-kosovo',
          loc: { section: 'Statement by the President to the Nation', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:slobodan-milosevic',
      role: 'leader',
      side: 'fry',
      cites: [
        {
          source: 'hrw-2001-under-orders-executive-summary',
          loc: { section: 'Executive Summary', para: '35' }
        }
      ]
    },
    {
      ref: 'person:bill-clinton',
      role: 'head-of-state',
      side: 'nato',
      cites: [
        {
          source: 'white-house-1999-03-24-statement-to-the-nation-on-kosovo',
          loc: { section: 'Statement by the President to the Nation', para: '1' }
        }
      ]
    },
    {
      name: 'Hashim Thaçi',
      role: 'leader',
      side: 'kla',
      cites: [
        {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '178' }
        }
      ]
    },
    {
      name: 'Ibrahim Rugova',
      role: 'leader',
      cites: [
        {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '102' }
        }
      ]
    },
    {
      name: 'Richard Holbrooke',
      role: 'diplomat',
      side: 'nato',
      cites: [
        {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '184' }
        }
      ]
    },
    {
      name: 'Adem Jashari',
      role: 'victim',
      side: 'kla',
      cites: [
        {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '99' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 862979 },
            cites: [
              {
                source: 'hrw-2001-under-orders-executive-summary',
                loc: { section: 'Executive Summary', para: '7' }
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
      value: {
        alts: [
          {
            value: { min: 3453 },
            cites: [
              {
                source: 'hrw-2001-under-orders-executive-summary',
                loc: { section: 'Executive Summary', para: '16' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          },
          {
            value: { min: 7449, max: 13627 },
            cites: [
              {
                source: 'hrw-2001-under-orders-march-june-1999-an-overview',
                loc: { section: 'March-June 1999: An Overview', para: '58' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'American Bar Association CEELI and American Association for the Advancement of Science'
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:bosnian-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
          loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
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
          text: 'In 1998–1999, violence erupted again in Kosovo, with the province’s majority Albanian population calling for independence from Serbia.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        },
        {
          id: 'q2',
          text: 'A NATO bombing campaign and economic sanctions forced the Milosevic regime to accept a NATO-led international peace keeping force.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1989, when the Serbian government revoked Kosovo\'s status as an autonomous province within the Socialist Federal Republic of Yugoslavia, political analysts and activists in that country and abroad anticipated deterioration.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
          }
        },
        {
          id: 'q4',
          text: 'Riding an ever stronger wave of nationalism, Slobodan Milosevic was elected president of Serbia on May 8, 1989, a post he held for the next eight years, until he was elected president of Yugoslavia on July 23, 1997-the position he held until October 2000.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
          }
        },
        {
          id: 'q5',
          text: 'By late 1997, the central region of Drenica was known among ethnic Albanians as "liberated territory" because of the strong KLA presence.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '88' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
          }
        },
        {
          id: 'q6',
          text: 'These events in Drenica were a watershed in the Kosovo crisis.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '102' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'The massacre in Racak was well documented by the OSCE mission, and immediately condemned by the mission\'s head, U.S. diplomat William Walker.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '175' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
          }
        },
        {
          id: 'q8',
          text: 'The Serbian delegation refused to sign, stating that Kosovo was an integral part of Yugoslavia.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '180' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
          }
        },
        {
          id: 'q9',
          text: 'After two weeks, the negotiators presented both sides with an interim agreement that would have provided for substantial autonomy and self-government for Kosovo inside Yugoslavia, protected by a strong NATO presence on the ground.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '179' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
          }
        },
        {
          id: 'q10',
          text: 'Throughout the conference, Serbian and Yugoslav forces were observed positioning themselves around the Kosovo border with Serbia proper, a clear indication-coupled with the Serbian delegation\'s intransigence-that a military offensive was in preparation.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-background',
            loc: { section: 'Background', para: '181' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
          }
        },
        {
          id: 'q11',
          text: 'Many observers mark the date of the NATO air war as the beginning of the Serbian and Yugoslav campaign.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-march-june-1999-an-overview',
            loc: { section: 'March-June 1999: An Overview', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword-03.htm'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q12',
          text: 'Although reliable figures are beginning to emerge, the final death toll from the Kosovo war remains unknown, and has become the focus of considerable debate.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-executive-summary',
            loc: { section: 'Executive Summary', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword.htm'
          }
        },
        {
          id: 'q13',
          text: 'Human Rights Watch conducted a thorough investigation of civilian deaths as a result of NATO\'s bombing campaign in the Federal Republic of Yugoslavia.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-the-nato-air-campaign',
            loc: { section: 'The NATO Air Campaign', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword2b.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q14',
          text: 'No one predicted the speed and scale of the expulsions.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-executive-summary',
            loc: { section: 'Executive Summary', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword.htm'
          }
        },
        {
          id: 'q15',
          text: 'The destruction of civilian property by government troops in 1999 was widespread.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-executive-summary',
            loc: { section: 'Executive Summary', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword.htm'
          }
        },
        {
          id: 'q16',
          text: 'The province was placed under U.N. administrative mandate.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q17',
          text: 'In 2008, Kosovo declared independence and was recognized by the United States and most European states, despite Russian objections.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-breakup-of-yugoslavia-1990-1992',
            loc: { section: 'The Breakup of Yugoslavia, 1990–1992', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/breakup-yugoslavia'
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
            value: { d: '1998-02-28' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '99' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On February 28 and March 1, responding to KLA ambushes of the police, special forces attacked two adjacent villages, Cirez (Qirez) and Likosane (Likoshane).',
        lang: 'en',
        cite: {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '99' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-01-15' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '174' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'A major turning point took place on January 15, 1999, when forty-five ethnic Albanians were killed in the village of Racak.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '174' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-02-06' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '178' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Kosovar Albanians and Serbs were hastily summoned to a government chateau in Rambouillet, France, for negotiations between February 6 and 22, 1999.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '178' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-03-15' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '180' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'The conference reconvened in Paris on March 15. Three days later, under great pressure from the West, the Kosovar Albanian delegation signed.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '180' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-03-20' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '183' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'In anticipation of the NATO bombing and the deteriorating security situation, the OSCE\'s KVM mission withdrew from Kosovo on March 20.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-under-orders-background',
          loc: { section: 'Background', para: '183' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/2001/kosovo/undword-01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-03-24' },
            cites: [
              {
                source: 'hrw-2001-under-orders-background',
                loc: { section: 'Background', para: '184' }
              },
              {
                source: 'hrw-2001-under-orders-march-june-1999-an-overview',
                loc: { section: 'March-June 1999: An Overview', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'On March 24, 1999, the eyes of the world turned to Kosovo as aircraft from the North Atlantic Treaty Organization began to bomb targets in the Federal Republic of Yugoslavia.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-under-orders-march-june-1999-an-overview',
          loc: { section: 'March-June 1999: An Overview', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/2001/kosovo/undword-03.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/F-117_Operation_Allied_Force.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:F-117_Operation_Allied_Force.jpg',
    credit: { institution: 'United States Air Force' },
    license: { id: 'public-domain' }
  }
})
