import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1991-uprisings-in-iraq',
  names: [
    { text: '1991 uprisings in Iraq', lang: 'en', role: 'primary' },
    { text: 'الانتفاضة الشعبانية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1991-03' },
        cites: [
          {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '1'
            }
          },
          {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '66'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1991-04' },
        cites: [
          {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '66'
            }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:kirkuk',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '7'
          }
        }
      ]
    },
    {
      ref: 'place:basra',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '26'
          }
        }
      ]
    },
    {
      ref: 'place:karbala',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '6'
          }
        }
      ]
    },
    {
      ref: 'place:najaf',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '6'
          }
        }
      ]
    },
    {
      ref: 'place:baghdad',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '58'
          }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '27'
          }
        }
      ]
    },
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '5'
          }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'government',
      name: 'Iraqi government',
      polity: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '1'
          }
        }
      ]
    },
    {
      key: 'rebels',
      name: 'Kurdish and Shi\'a rebels',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '4'
          }
        },
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '5'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:saddam-hussein',
      role: 'leader',
      side: 'government',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '1'
          }
        }
      ]
    },
    {
      name: 'Mojahedin-i-Khalq (People\'s Mojahedin of Iran)',
      role: 'combatant',
      side: 'government',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '36'
          }
        }
      ]
    },
    {
      name: 'Ali Hassan al-Majid',
      role: 'commander',
      side: 'government',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '35'
          }
        }
      ]
    },
    {
      name: 'Abu al-Qassem al-Khoei',
      role: 'victim',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '58'
          }
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
            value: { min: 100000, qualifier: 'over' },
            cites: [
              {
                source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
                loc: {
                  section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
                  para: '5'
                }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Middle East Watch (Human Rights Watch)' }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      side: 'rebels',
      value: {
        alts: [
          {
            value: { min: 70000 },
            cites: [
              {
                source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
                loc: {
                  section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
                  para: '5'
                }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Middle East Watch (Human Rights Watch)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:gulf-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-gulf-war',
          loc: { section: 'The Gulf War, 1991', para: '13' }
        }
      ]
    },
    {
      ref: 'event:anfal-campaign',
      rel: 'related',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '41'
          }
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
          text: 'When the March 1991 uprising confronted his regime with the most serious internal challenge it had ever faced, government forces responded with atrocities on a predictably massive scale.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        },
        {
          id: 'q2',
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
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In their attempts to retake cities, and after consolidating control, loyalist forces killed thousands of unarmed civilians by firing indiscriminately into residential areas; executing young people on the streets, in homes and in hospitals; rounding up suspects, especially young men, during house-to-house searches, and arresting them without charge or shooting them en masse; and using helicopters to attack unarmed civilians as they fled the cities.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        },
        {
          id: 'q4',
          text: 'The rebels also committed gross abuses during the uprising, summarily executing suspected members of the security forces, including many who were in custody.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '4'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        },
        {
          id: 'q5',
          text: 'Witnesses also accused fighters from the Iranian opposition organization Mojahedin-i-Khalq (People\'s Mojahedin of Iran) and Jordanian, Sudanese, Palestinian and Yemeni mercenaries of helping to suppress the uprising. They claimed to recognize the fighters\' nationalities from their appearance or accents. While the testimony collected was persuasive that the Mojahedin-i-Khalq and foreign mercenaries helped Iraqi soldiers to crush the uprising, it was not possible to assess how important a role these various groups played.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '36'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        },
        {
          id: 'q6',
          text: 'To the relief of the United States, Iran refrained from providing much assistance to the Shiʿite revolts which broke out in southern Iraq in March 1991.',
          lang: 'en',
          cite: {
            source: 'iranica-potter-gulf-war-and-persia',
            loc: { section: 'GULF WAR and PERSIA', para: '8' }
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Over 100,000 Kurds and Shi\'a who fled cities where the conflicts were particularly fierce remain displaced inside Iraq, and another 70,000 civilians are in refugee camps in Saudi Arabia, Turkey and Iran.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        },
        {
          id: 'q8',
          text: 'The establishment of a rebel-held zone in northeast Iraq under some measure of Allied protection has put most of Iraq\'s Kurdish population temporarily beyond the reach of the Baath regime.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '9'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        },
        {
          id: 'q9',
          text: 'Many observers believe that attacks by Baghdad on the Kurdish-held zone have been restrained to some extent by Saddam\'s fear that they would provoke the intervention of Allied forces.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '27'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q10',
          text: 'Such obstacles have complicated the task of gathering accurate human rights information. For example, it is not possible to verify estimates of the numbers of persons who were killed, injured or detained during the uprising, how many were deliberately executed, how many were caught in cross-fire, or how many were unarmed civilians.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '33'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        },
        {
          id: 'q11',
          text: 'In the weeks that followed, tens of thousands of civilians were killed as security forces crushed the most serious internal threat of Saddam\'s 12-year rule, and thousands more subsequently perished during one of the largest and most precipitous flights of refugees in modern times.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '21'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1991-03-19', notAfter: '1991-03-23' },
            cites: [
              {
                source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
                loc: {
                  section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
                  para: '58'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Between March 19 and 23, 1991, authorities in al-Najaf arrested the 95-year-old Shi\'a spiritual leader Grand Ayatollah Sayyid abu al-Qassem al-Khoei, and 105 persons from his family and his associates and their families, according to Yousif al-Khoei of the al-Khoei Foundation, a Shi\'a benevolent society based in London.',
        lang: 'en',
        cite: {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '58'
          }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-04-05' },
            cites: [
              { source: 'unsc-resolution-688-1991', loc: { section: 'Resolution 688 (1991)' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Gravely concerned by the repression of the Iraqi civilian population in many parts of Iraq, including most recently in Kurdish populated areas, which led to a massive flow of refugees towards and across international frontiers and to cross-border incursions, which threaten international peace and security in the region,',
        lang: 'en',
        cite: { source: 'unsc-resolution-688-1991', loc: { section: 'Resolution 688 (1991)' } },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_688'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-04' },
            cites: [
              {
                source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
                loc: {
                  section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
                  para: '27'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Since April 1991, the U.S. has publicly warned Iraqi troops not to fly any aircraft, including helicopters, north of the 36th parallel, to keep security forces from entering the Allies\' self-declared security zone, and to refrain from attacking Kurdish civilians.',
        lang: 'en',
        cite: {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '27'
          }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Kurdish_refugees_in_camp_sites_along_the_Turkey-Iraq_border%2C_1991.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kurdish_refugees_in_camp_sites_along_the_Turkey-Iraq_border,_1991.jpg',
    credit: { institution: 'Institute for National Strategic Studies (National Defense University)' },
    license: { id: 'public-domain' }
  }
})
