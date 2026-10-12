import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2009-iranian-presidential-election-protests',
  names: [
    { text: '2009 Iranian presidential election protests', lang: 'en', role: 'primary' },
    { text: 'اعتراضات به نتایج انتخابات ریاست‌جمهوری ۱۳۸۸', lang: 'fa', role: 'native' },
    { text: 'Green Movement', lang: 'en', role: 'alternative' },
    { text: 'جنبش سبز', lang: 'fa', role: 'alternative', translit: 'jonbesh-e sabz' },
    { text: 'Iranian Green Movement', lang: 'en', role: 'alternative' },
    { text: 'Post-election unrest in Iran', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '2009-06-12' },
        cites: [
          {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '19' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'government',
      name: 'The government of the Islamic Republic',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '5' }
        }
      ]
    },
    {
      key: 'protesters',
      name: 'Protesters and supporters of the opposition candidates',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      side: 'government',
      cites: [
        {
          source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
          loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '3' }
        }
      ]
    },
    {
      ref: 'person:mahmoud-ahmadinejad',
      role: 'head-of-government',
      side: 'government',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '4' }
        }
      ]
    },
    {
      ref: 'person:mir-hossein-mousavi',
      role: 'leader',
      side: 'protesters',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '19' }
        }
      ]
    },
    {
      name: 'Mehdi Karroubi',
      role: 'leader',
      side: 'protesters',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '4' }
        }
      ]
    },
    {
      name: 'Mohsen Rezaii',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '4' }
        }
      ]
    },
    {
      name: 'Neda Agha-Soltan',
      role: 'victim',
      cites: [
        {
          source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
          loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '5' }
        }
      ]
    },
    {
      name: 'Saeed Mortazavi',
      role: 'participant',
      side: 'government',
      cites: [
        {
          source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
          loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '1' }
        }
      ]
    },
    {
      name: 'Ali Larijani',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '29' }
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
            value: { min: 30 },
            cites: [
              {
                source: 'hrw-2010-world-report-iran',
                loc: { section: 'World Report 2010: Iran', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Iranian officials' }
            ]
          },
          {
            value: { min: 36 },
            cites: [
              {
                source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
                loc: { section: 'The Islamic Republic at 31', para: '99' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Revolutionary Guards (Abdollah Araghi)' }
            ]
          },
          {
            value: { min: 69 },
            cites: [
              {
                source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
                loc: { section: 'The Islamic Republic at 31', para: '99' }
              }
            ],
            heldBy: [
              { kind: 'party', name: 'Iranian opposition' }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 4000 },
            cites: [
              {
                source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
                loc: { section: 'The Islamic Republic at 31', para: '36' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Judiciary of Iran (spokesman Ali Reza Jamshidi)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'period:presidency-of-mahmoud-ahmadinejad',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '4' }
        }
      ]
    },
    {
      ref: 'event:2005-iranian-presidential-election',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '4' }
        }
      ]
    },
    {
      ref: 'event:iranian-nuclear-program-crisis',
      rel: 'related',
      cites: [
        {
          source: 'iranica-therme-russia-iii-russo-iranian-relations-in-the-post-soviet-era',
          loc: {
            section: 'RUSSIA iii. Russo-Iranian Relations in the Post-Soviet Era (1991-present)',
            para: '19'
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
          text: 'The nearly nine months since Iran\'s presidential election sparked widespread popular demonstrations against alleged vote-rigging have been among the most tumultuous in the history of the Islamic Republic, which marks the 31st anniversary of the revolution that paved the way for its establishment on February 11, 2010.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        },
        {
          id: 'q2',
          text: 'Following the disputed June 12 presidential election and the massive protests it provoked, the government unleashed the most widespread crackdown in a decade.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-iran',
            loc: { section: 'World Report 2010: Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/iran'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Although the one-month campaign period produced some notable transparency, such as live televised presidential debates for the first time, the government mobilized its institutions and media resources to promote President Ahmadinejad and harass his opponents.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        },
        {
          id: 'q4',
          text: 'After the announcement of preliminary results on election day, the three opposition candidates quickly charged that the authorities had rigged the voting in favor of President Ahmadinejad and later filed complaints with the Guardian Council.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        },
        {
          id: 'q5',
          text: 'The announced election results led to complaints and urban unrest as Mousavi and Karroubi accused the government of voter fraud.',
          lang: 'en',
          cite: {
            source: 'iran-data-portal-2009-presidential-election',
            loc: { section: '2009 Presidential Election' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://irandataportal.syr.edu/2009-presidential-election'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'In the two months immediately following the June 12 election, the government carried out a major campaign of repression that included mass detentions of protestors, political reform figures, and rights activists, culminating in public trials in August.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        },
        {
          id: 'q7',
          text: 'In addition to massive detentions of ordinary protestors and peaceful activists, as early as the day after the election, authorities rounded up scores of well-known writers and political figures affiliated with the reform movement.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        },
        {
          id: 'q8',
          text: 'Special riot police officers, Revolutionary Guards, and members of the volunteer Basij paramilitary deployed in overwhelming force throughout the capital Tehran and other Iranian cities, preventing protesters from gathering, and responded with immediate violence to any attempts by protesters to mount further demonstrations.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
            loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2009/06/23/iran-violent-crackdown-protesters-widens'
          }
        },
        {
          id: 'q9',
          text: 'The worst abuses against ordinary protestors have taken place at police stations and detention centers, most notoriously at the Kahrizak detention center outside of Tehran.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        },
        {
          id: 'q10',
          text: 'During the fall and winter of 2009, government harassment of peaceful protestors in response to major demonstrations such as those held on November 4 (the anniversary of the takeover of the US embassy in 1979), December 7 (National Student Day), and in conjunction with the Shia religious holiday of Ashura on December 27 continued unabated.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'Despite widespread repression in the weeks following the election, peaceful demonstrations and expressions of opposition continued.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        },
        {
          id: 'q12',
          text: 'Following the elections, the Obama administration condemned violence against protestors and urged respect for human rights in Iran, while steering clear of language that would imply support for the opposition movement.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-iran',
            loc: { section: 'World Report 2010: Iran', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/iran'
          }
        },
        {
          id: 'q13',
          text: 'Opposition leaders Mir Hossein Mousavi, Zahra Rahnavard, and Mehdi Karroubi remained under house arrest at this writing.',
          lang: 'en',
          cite: { source: 'hrw-2013-world-report-iran', loc: { section: 'World Report 2013: Iran' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2013/country-chapters/iran'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q14',
          text: 'Among the dead was 26-year-old Neda Agha-Soltan, a philosophy student who was a bystander to the protests when she was shot in the chest on Kargar Street.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
            loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2009/06/23/iran-violent-crackdown-protesters-widens'
          }
        },
        {
          id: 'q15',
          text: 'People on the scene implicated individuals in plainclothes, believed to be Basij, in attacks that killed peaceful demonstrators.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        },
        {
          id: 'q16',
          text: 'At least three detainees have died due to injuries sustained in Kahrizak.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
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
            value: { d: '2009-06-12' },
            cites: [
              {
                source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
                loc: { section: 'The Islamic Republic at 31', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On June 12, 2009, Iran\'s incumbent president, Mahmoud Ahmadinejad, stood for re-election against challengers Mehdi Karroubi, Mir Hossein Mousavi, and Mohsen Rezaii.',
        lang: 'en',
        cite: {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-06-13' },
            cites: [
              {
                source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
                loc: { section: 'The Islamic Republic at 31', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On June 13, following the government\'s announcement the previous afternoon that preliminary election results showed Ahmadinejad to be the winner, large numbers of protestors took to the streets.',
        lang: 'en',
        cite: {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-06-14' },
            cites: [
              {
                source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
                loc: { section: 'The Islamic Republic at 31', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On the night of June 14, two days after the election, police and Basij forces attacked Tehran University dormitories, injuring students and damaging buildings.',
        lang: 'en',
        cite: {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-06-15' },
            cites: [
              {
                source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
                loc: { section: 'The Islamic Republic at 31', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'On June 15, three days after the vote, hundreds of thousands of supporters of Mir Hossein Mousavi, the main opposition candidate, turned out for a mass rally at Azadi Square.',
        lang: 'en',
        cite: {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-06-20' },
            cites: [
              {
                source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
                loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'At least 10 people died in clashes between protesters and security forces on June 20, and at least 100 were wounded.',
        lang: 'en',
        cite: {
          source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
          loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/news/2009/06/23/iran-violent-crackdown-protesters-widens'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-08-13' },
            cites: [
              {
                source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
                loc: { section: 'The Islamic Republic at 31', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'On August 13, Judiciary spokesman Ali Reza Jamshidi acknowledged that the authorities detained some 4,000 people in the post-election protests.',
        lang: 'en',
        cite: {
          source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
          loc: { section: 'The Islamic Republic at 31', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/%D8%AA%D8%B8%D8%A7%D9%87%D8%B1%D8%A7%D8%AA_%D8%AA%D9%88%D9%BE%D8%AE%D8%A7%D9%86%D9%87_-_Toopkhaneh_rally_%283910377624%29.jpg/1280px-%D8%AA%D8%B8%D8%A7%D9%87%D8%B1%D8%A7%D8%AA_%D8%AA%D9%88%D9%BE%D8%AE%D8%A7%D9%86%D9%87_-_Toopkhaneh_rally_%283910377624%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D8%AA%D8%B8%D8%A7%D9%87%D8%B1%D8%A7%D8%AA_%D8%AA%D9%88%D9%BE%D8%AE%D8%A7%D9%86%D9%87_-_Toopkhaneh_rally_(3910377624).jpg',
    credit: { creator: 'Ali Nasery' },
    license: { id: 'cc-by-sa', version: '2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0' }
  }
})
