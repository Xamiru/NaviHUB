import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1988-executions-of-iranian-political-prisoners',
  names: [
    { text: '1988 executions of Iranian political prisoners', lang: 'en', role: 'primary' },
    { text: 'اعدام‌های دسته‌جمعی زندانیان سیاسی در سال ۱۳۶۷', lang: 'fa', role: 'native' },
    { text: 'کشتار زندانیان سیاسی ۱۳۶۷', lang: 'fa', role: 'alternative' },
    {
      text: '1988 prison massacres',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      cites: [
        {
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '-1' }
        }
      ]
    },
    {
      text: 'Death Committees',
      lang: 'en',
      role: 'alternative',
      translit: 'Heya’t Marg',
      cites: [
        {
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1988-07' },
        cites: [
          {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '20' }
          },
          {
            source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
            loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '3' }
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
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '5' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '14' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'state',
      name: 'Iranian authorities',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '14' }
        }
      ]
    },
    {
      key: 'prisoners',
      name: 'Political prisoners',
      cites: [
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '14' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      side: 'state',
      cites: [
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '42' }
        },
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '54' }
        }
      ]
    },
    {
      ref: 'person:hossein-ali-montazeri',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '4' }
        },
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '41' }
        }
      ]
    },
    {
      name: 'Mostafa Pourmohammadi',
      role: 'participant',
      side: 'state',
      cites: [
        {
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '5' }
        },
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '54' }
        }
      ]
    },
    {
      name: 'Hossein-Ali Nayyeri',
      role: 'participant',
      side: 'state',
      cites: [
        {
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '13' }
        }
      ]
    },
    {
      name: 'Morteza Eshraghi',
      role: 'participant',
      side: 'state',
      cites: [
        {
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '13' }
        }
      ]
    },
    {
      name: 'Ebrahim Raeesi',
      role: 'participant',
      side: 'state',
      cites: [
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '55' }
        }
      ]
    },
    {
      name: 'Political prisoners, most of them affiliated with the Mojahedin-e Khalq',
      role: 'victim',
      side: 'prisoners',
      cites: [
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '14' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'executed',
      value: {
        alts: [
          {
            value: { min: 2800, max: 3800 },
            cites: [
              {
                source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
                loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '18' }
              }
            ],
            heldBy: [
              {
                kind: 'participant',
                name: 'Hossein-Ali Montazeri',
                ref: 'person:hossein-ali-montazeri'
              }
            ]
          },
          {
            value: { min: 4481 },
            cites: [
              {
                source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
                loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '18' }
              }
            ],
            heldBy: [
              { kind: 'public', name: 'Iranian activists (published list of names)' }
            ]
          },
          {
            value: { min: 2800, max: 5000 },
            cites: [
              {
                source: 'hrw-2022-06-08-irans-1988-mass-executions',
                loc: { section: 'Iran’s 1988 Mass Executions', para: '14' }
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
      ref: 'event:iran-iraq-war',
      rel: 'followed-by',
      cites: [
        {
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '3' }
        }
      ]
    },
    {
      ref: 'event:death-of-ruhollah-khomeini',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '50' }
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
          text: 'In 1988, Iranian authorities, acting on the orders of Supreme Leader Ayatollah Khomeini, summarily and extrajudicially executed thousands of political prisoners across the country.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q2',
          text: 'There is overwhelming evidence and consensus among Iran historians, human rights researchers, and policy analysts that these mass executions occurred, and Human Rights Watch believes these heinous acts amount to crimes against humanity.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The executions of political opponents started immediately after the 1979 revolution.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q4',
          text: 'Although this offensive was easily repelled by Iranian forces, it provided a pretext for the authorities to physically eliminate many political opponents then in prison, including many MKO members captured and sentenced years earlier.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
            loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'Montazeri’s memoir revealed a copy of the secret fatwa (religious order) that Ayatollah Khomeini had issued in late July 1988, designating a committee to review the cases of MKO prisoners and execute all prisoners who remained “steadfast” in their support of the group',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'During that period, authorities interrogated prisoners about their political beliefs and categorized them according to the degree of their perceived loyalty to Iran’s rulers.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q7',
          text: 'According to Ayatollah Montazeri, the government formed a three-person committee to oversee the purge in each prison.6 The authorities told these committees to interview all political prisoners and to order the execution of those deemed “unrepentant.”',
          lang: 'en',
          cite: {
            source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
            loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
          }
        },
        {
          id: 'q8',
          text: 'According to prisoners\' testimonies and some historians, in late August the authorities expanded the executions to prisoners from leftist parties.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q9',
          text: 'In late October 1988, when authorities began to restore prison visits, they also started to inform families that their loved ones had been executed.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q10',
          text: 'The number of executions is not definitively known, but according to estimates from former Iranian officials and lists compiled by human rights and opposition groups, Iranian authorities executed between 2,800 and 5,000 prisoners in at least 32 cities in the country.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q11',
          text: 'Ayatollah Montazeri, citing officials in charge of carrying out the executions, puts the number of executed prisoners between 2,800 and 3,800, but he acknowledges that his recollection is not exact.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
            loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
          }
        },
        {
          id: 'q12',
          text: 'Iranian activists have published the names of 4,481 executed prisoners.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
            loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q13',
          text: 'The places of burial for most of the victims remain unknown.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q14',
          text: 'In response to the special representative’s inclusion of more 1,000 names of those allegedly executed during the months of July, August, and September 1988 in his January 1989 report, Iranian government officials disputed the sources of the allegations as affiliated with MKO and refused to provide any explanation into the allegations.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q15',
          text: 'None of the officials credibly implicated in the executions have ever been investigated in Iran.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '64' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
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
            value: { d: '1988-07-18' },
            cites: [
              {
                source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
                loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On July 18, 1988, Iran accepted the United Nations Security Council Resolution 598, calling for a cease-fire in the eight-year war between Iran and Iraq.',
        lang: 'en',
        cite: {
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-07-24' },
            cites: [
              {
                source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
                loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '3' }
              }
            ]
          },
          {
            value: { d: '1988-07-25' },
            cites: [
              {
                source: 'hrw-2022-06-08-irans-1988-mass-executions',
                loc: { section: 'Iran’s 1988 Mass Executions', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On July 25, the largest Iranian armed opposition group, the Mojahedin-e Khalq Organization (MKO or MEK), based in Iraq since 1986, launched an incursion named “Eternal Light” into Iran in an attempt to topple the government.',
        lang: 'en',
        cite: {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-08-04' },
            cites: [
              {
                source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
                loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In a letter of protest addressed to Ayatollah Khomeini, dated August 4, 1988, Ayatollah Montazeri wrote: “The principal role [in determining which prisoners to execute] is played by the representative of the Ministry of Information everywhere and others are effectively under his direct influence.”',
        lang: 'en',
        cite: {
          source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
          loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-08-15' },
            cites: [
              {
                source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
                loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '13' }
              },
              {
                source: 'hrw-2022-06-08-irans-1988-mass-executions',
                loc: { section: 'Iran’s 1988 Mass Executions', para: '45' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'In his memoirs, Montazeri published two letters he had written to Ayatollah Khomeini, as well as the transcript of a meeting Montazeri had with Nayyeri, Mostafa Pourmohammadi, who was the representative of Ministry of Intelligence in the committee, Eshraghi, and his deputy Ebrahim Raeesi to protest the ongoing prison executions.',
        lang: 'en',
        cite: {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '44' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-01' },
            cites: [
              {
                source: 'hrw-2022-06-08-irans-1988-mass-executions',
                loc: { section: 'Iran’s 1988 Mass Executions', para: '52' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'The allegations of mass executions of prisoners were mentioned in reports prepared by UN independent experts, in particular reports of the Special Representative of the Commission on Human Rights in Iran, Reynaldo Galindo Pohl, as early as 1989.',
        lang: 'en',
        cite: {
          source: 'hrw-2022-06-08-irans-1988-mass-executions',
          loc: { section: 'Iran’s 1988 Mass Executions', para: '52' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Khavaran.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Khavaran.jpg',
    credit: { institution: 'Wikimedia Commons', creator: 'مانفی' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  furtherReading: [
    { source: 'montazeri-2001-matn-e-kamel-e-khaterat', perspective: 'iranian' },
    { source: 'abrahamian-1999-tortured-confessions', perspective: 'american' }
  ]
})
