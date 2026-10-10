import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'gulf-war',
  names: [
    { text: 'Gulf War', lang: 'en', role: 'primary' },
    {
      text: 'Persian Gulf War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-potter-gulf-war-and-persia',
          loc: { section: 'GULF WAR and PERSIA', para: '1' }
        },
        {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '27' }
        }
      ]
    },
    {
      text: 'Operation Desert Storm',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
        }
      ]
    },
    {
      text: 'جنگ خلیج فارس',
      lang: 'fa',
      role: 'alternative',
      translit: 'jang-e khalij-e fars'
    },
    { text: 'حرب الخليج', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1990-08-02' },
        cites: [
          {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '20' }
          },
          {
            source: 'iranica-potter-gulf-war-and-persia',
            loc: { section: 'GULF WAR and PERSIA', para: '1' }
          },
          {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1991-02-28' },
        cites: [
          {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '7' }
          },
          {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:kuwait',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '7' }
        }
      ]
    },
    {
      ref: 'place:persian-gulf',
      cites: [
        {
          source: 'iranica-potter-gulf-war-and-persia',
          loc: { section: 'GULF WAR and PERSIA', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:saudi-arabia',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '10' }
        }
      ]
    },
    {
      ref: 'polity:soviet-union',
      cites: [
        {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '21' }
        }
      ]
    },
    {
      ref: 'polity:united-kingdom',
      cites: [
        {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '21' }
        }
      ]
    },
    {
      ref: 'polity:state-of-israel',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '13' }
        }
      ]
    },
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-potter-gulf-war-and-persia',
          loc: { section: 'GULF WAR and PERSIA', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '10' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'coalition',
      name: 'International coalition led by the United States',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '11' }
        },
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '13' }
        }
      ]
    },
    {
      key: 'iraq',
      name: 'Iraq',
      polity: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:saddam-hussein',
      role: 'leader',
      side: 'iraq',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '1' }
        },
        {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '20' }
        }
      ]
    },
    {
      ref: 'person:george-h-w-bush',
      role: 'leader',
      side: 'coalition',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '6' }
        },
        {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '22' }
        }
      ]
    },
    {
      name: 'Norman Schwarzkopf',
      role: 'commander',
      side: 'coalition',
      cites: [
        {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
        }
      ]
    },
    {
      name: 'James Baker',
      role: 'diplomat',
      side: 'coalition',
      cites: [
        {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '25' }
        }
      ]
    },
    {
      name: 'Tariq Aziz',
      role: 'diplomat',
      side: 'iraq',
      cites: [
        {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '25' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '1' }
        }
      ]
    },
    {
      ref: 'event:1991-uprisings-in-iraq',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '13' }
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
          text: 'On August 2, 1990, Iraq invaded its neighbor Kuwait.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        },
        {
          id: 'q2',
          text: 'The invasion of Kuwait led to a United Nations Security Council embargo and sanctions on Iraq and a U.S.-led coalition air and ground war, which began on January 16, 1991, and ended with an Iraqi defeat and retreat from Kuwait on February 28, 1991.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At the end of the Iran-Iraq War of 1980–1988, Iraq emerged with its state intact and a reinforced sense of national pride, but laden with massive debts.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q4',
          text: 'Iraq had largely financed the war effort through loans, and owed some $37 billion to Gulf creditors in 1990.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q5',
          text: 'In 1961, when the United Kingdom ended its protectorate over Kuwait, then Iraqi Prime Minister General \'Abd Al-Karim Qasim asserted that Kuwait was an "integral part of Iraq" because it had been part of the former Ottoman province of Al-Basrah.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q6',
          text: 'In July, Saddam accused Kuwait and the United Arab Emirates of breaking with Organization of Petroleum Exporting Countries (OPEC) production quotas and over-producing crude oil for export, which depressed prices, depriving Iraq of critical oil revenues.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q7',
          text: 'During this period, there was a deterioration of relations between the United States and Iraq. Iraq accused the United States and Israel of deliberately weakening Iraq by encouraging Kuwait to reduce oil prices. When Iraq began to threaten Kuwait early in July 1990, the United States staged maneuvers in the Gulf to warn Iraq against taking military action against the United Arab Emirates and Kuwait.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q8',
          text: 'After Kuwait rejected Saddam’s debt-forgiveness demands, he threatened to reignite a conflict over the long-standing question of ownership of the Warbah and Bubiyan Islands, to which Iraq ascribed importance because of the secure access they afforded to its ports on the Khawr \'Abd Allah—the waterway to the Persian Gulf that remained the only viable alternative to the closed Shatt Al-\'Arab, cluttered with debris from the Iran-Iraq War.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q9',
          text: 'Saddam Hussein, the President of Iraq, had long held designs on Kuwait\'s land, wealth, and oil.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q10',
          text: 'The Iraqi Republican Guard units moved toward Kuwait City while Iraqi Special Forces secured key sites, including the islands of Warba and Bubayan, Kuwaiti air fields, and the palaces of the Emir and the Crown Prince.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q11',
          text: 'International condemnation of the Iraqi invasion was widespread and virtually unanimous.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q12',
          text: 'The United States and Saudi Arabia agreed to a deployment of U.S. forces to Saudi Arabia to protect the peninsula.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q13',
          text: 'By October 30, the Bush administration made a decision to push Iraq out of Kuwait by force if necessary.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q14',
          text: '2. Authorizes Member States co-operating with the Government of Kuwait, unless Iraq on or before 15 January 1991 fully implements, as set forth in paragraph 1 above, the above-mentioned resolutions, to use all necessary means to uphold and implement resolution 660 (1990) and all subsequent relevant resolutions and to restore international peace and security in the area;',
          lang: 'en',
          cite: { source: 'unsc-resolution-678-1990', loc: { section: 'Resolution 678 (1990)' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_678'
          }
        },
        {
          id: 'q15',
          text: 'After the deadline for withdrawal passed, the coalition led by the United States attacked Iraq by air.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q16',
          text: 'Saddam Hussein launched missile attacks against Israel and on coalition force bases in Saudi Arabia.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q17',
          text: 'The United States continued to put pressure on Iraq through the United Nations, which passed Security Council Resolution 687 establishing the United Nations Special Commission (UNSCOM) to inspect Iraq’s suspected chemical and biological weapons capabilities. The United States subsequently sought to ensure that the trade embargo imposed on Iraq the previous year through Resolution 661 remained in place and that Iraq was stripped of chemical weapons and missiles and its nuclear research capabilities.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q18',
          text: 'In the chaos following the war, spontaneous Shiite rebellions in the South and Kurdish unrest in northern Iraq broke out but were eventually suppressed by Saddam Hussein and his Revolutionary Guards.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-war',
            loc: { section: 'The Gulf War, 1991', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
          }
        },
        {
          id: 'q19',
          text: 'Iran benefited in a number of ways from the conflict, above all by the reduction of the Iraqi military threat.',
          lang: 'en',
          cite: {
            source: 'iranica-potter-gulf-war-and-persia',
            loc: { section: 'GULF WAR and PERSIA', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/gulf-war-and-persia'
          }
        },
        {
          id: 'q20',
          text: 'Iran resumed exchanging prisoners of war with Iraq; nearly 75,000 prisoners of war from both sides were released between mid-August and mid-September.',
          lang: 'en',
          cite: {
            source: 'iranica-potter-gulf-war-and-persia',
            loc: { section: 'GULF WAR and PERSIA', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/gulf-war-and-persia'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q21',
          text: 'One hundred and forty eight U.S. soldiers were killed in the Persian Gulf War.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        },
        {
          id: 'q22',
          text: 'The largest loss of civilian life in a single incident occurred in the attack on the Ameriyya civil-defense shelter at approximately 4:30 a.m. on February 13, which killed between 200 and 300 civilians',
          lang: 'en',
          cite: {
            source: 'hrw-1991-needless-deaths-in-the-gulf-war-introduction',
            loc: { section: 'Introduction and Summary of Conclusions', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1991/gulfwar/INTRO.htm'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q23',
          text: 'The Persian Gulf War helped restore the morale of the U.S. military and dampened memories of the Vietnam War.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        },
        {
          id: 'q24',
          text: 'Critics argued, however, that the victory was hollow because Saddam Hussein remained in power. They faulted Bush for not pursuing Hussein and his army into Iraq and removing him from power.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        },
        {
          id: 'q25',
          text: 'After the defeat of Iraq, Iran resented continued attempts to exclude it from regional affairs.',
          lang: 'en',
          cite: {
            source: 'iranica-potter-gulf-war-and-persia',
            loc: { section: 'GULF WAR and PERSIA', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/gulf-war-and-persia'
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
            value: { d: '1990-08-02' },
            cites: [
              {
                source: 'millercenter-knott-bush-foreign-affairs',
                loc: { section: 'George H. W. Bush: Foreign Affairs', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q26',
        text: 'On the day of the invasion, the United Nations Security Council passed Resolution 660, which condemned the invasion and demanded that Iraq withdraw "immediately and unconditionally".',
        lang: 'en',
        cite: {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '23' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://millercenter.org/president/bush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-08-28' },
            cites: [
              {
                source: 'state-dept-milestones-gulf-war',
                loc: { section: 'The Gulf War, 1991', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q27',
        text: 'On August 28, Iraq declared that Kuwait had become its nineteenth province.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-11-29' },
            cites: [
              { source: 'unsc-resolution-678-1990', loc: { section: 'Resolution 678 (1990)' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q28',
        text: 'Adopted by the Security Council at its 2963rd meeting on 29 November 1990 by 12 votes to 2 (Cuba and Yemen), with 1 abstention (China).',
        lang: 'en',
        cite: { source: 'unsc-resolution-678-1990', loc: { section: 'Resolution 678 (1990)' } },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_678'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-01-12' },
            cites: [
              {
                source: 'millercenter-knott-bush-foreign-affairs',
                loc: { section: 'George H. W. Bush: Foreign Affairs', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q29',
        text: 'On January 12, Congress narrowly voted to authorize the use of military force against Iraq.',
        lang: 'en',
        cite: {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://millercenter.org/president/bush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-01-17' },
            cites: [
              {
                source: 'millercenter-knott-bush-foreign-affairs',
                loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
              }
            ]
          },
          {
            value: { d: '1991-01-16' },
            cites: [
              {
                source: 'state-dept-milestones-gulf-war',
                loc: { section: 'The Gulf War, 1991', para: '7' }
              },
              {
                source: 'iranica-potter-gulf-war-and-persia',
                loc: { section: 'GULF WAR and PERSIA', para: '3' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Office of the Historian, U.S. Department of State'
              },
              { kind: 'scholar', name: 'Lawrence G. Potter' }
            ]
          }
        ]
      },
      quote: {
        id: 'q30',
        text: '"Operation Desert Storm" began on January 17, 1991, when U.S.-led coalition forces began massive air strikes against Iraq.',
        lang: 'en',
        cite: {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://millercenter.org/president/bush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-02-24' },
            cites: [
              {
                source: 'millercenter-knott-bush-foreign-affairs',
                loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q31',
        text: 'The coalition launched the ground war on February 24 and quickly overwhelmed the Iraqi forces.',
        lang: 'en',
        cite: {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://millercenter.org/president/bush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-02-28' },
            cites: [
              {
                source: 'millercenter-knott-bush-foreign-affairs',
                loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q32',
        text: 'Coalition troops reached Kuwait City by February 27, and a ceasefire was declared the next day.',
        lang: 'en',
        cite: {
          source: 'millercenter-knott-bush-foreign-affairs',
          loc: { section: 'George H. W. Bush: Foreign Affairs', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://millercenter.org/president/bush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-03-02' },
            cites: [
              {
                source: 'state-dept-milestones-gulf-war',
                loc: { section: 'The Gulf War, 1991', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q33',
        text: 'On March 2, the United Nations Security Council passed Resolution 686, which set forth conditions for a cease-fire.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/milestones/1989-1992/gulf-war'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Desert_Shield_901122-A-ME007-671.jpg/1280px-Desert_Shield_901122-A-ME007-671.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Desert_Shield_901122-A-ME007-671.jpg',
    credit: { institution: 'U.S. Department of Defense (DVIDS)', creator: 'Michael Edrington' },
    license: { id: 'public-domain' }
  }
})
