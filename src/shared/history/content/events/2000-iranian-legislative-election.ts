import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2000-iranian-legislative-election',
  names: [
    { text: '2000 Iranian legislative election', lang: 'en', role: 'primary' },
    { text: 'Sixth Majles election', lang: 'en', role: 'alternative' },
    { text: 'Election of the Sixth Majles', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'election',
  start: {
    alts: [
      {
        value: { d: '2000-02-18' },
        cites: [
          {
            source: 'iran-data-portal-2000-parliamentary-election',
            loc: { section: '2000 Parliamentary Election' }
          },
          {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2000-05' },
        cites: [
          {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      cites: [
        {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '13' }
        }
      ]
    },
    {
      ref: 'person:mohammad-khatami',
      role: 'head-of-government',
      cites: [
        {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '1' }
        }
      ]
    },
    {
      name: 'Mehdi Karroubi',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '16' }
        }
      ]
    },
    {
      ref: 'person:akbar-hashemi-rafsanjani',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '15' }
        }
      ]
    },
    {
      name: 'Saeid Hajjarian',
      role: 'victim',
      cites: [
        {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '7' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'period:presidency-of-mohammad-khatami',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '1' }
        }
      ]
    },
    {
      ref: 'event:18-tir-student-protests',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '8' }
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
          text: 'Reformist candidates supporting President Khatami won a significant victory in February\'s parliamentary elections, hailed as the fairest in Iran\'s history, but hopes that this would lead quickly to institutionalized gains for the legal protection of human rights proved misplaced.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        },
        {
          id: 'q2',
          text: 'The early part of the year was dominated by elections for the sixth Majles (Islamic Consultative Assembly).',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        },
        {
          id: 'q3',
          text: 'Khatami’s election victory in 1997 was followed by the triumphant performance of reformist candidates in both the municipal elections of 1999 and the Majles elections of 2000.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '39'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In July 1999, the conservative-dominated Fifth Majles voted to amend the 1986 Press Law, in spite of strong criticism inside and outside the chamber.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q5',
          text: 'Parliamentary elections in 1996 had been marred when the Council of Guardians vetoed more than 44 percent of the candidates.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Conservatives maneuvered, however, to limit the extent of the reformist victory, and blocked high-profile reformists from running as candidates in a variety of ways.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        },
        {
          id: 'q7',
          text: 'Of 6,083 candidates who stood for election to the 290 seats, 576 were disqualified.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        },
        {
          id: 'q8',
          text: 'March and April 2000 witnessed a series of events that led to increased tensions in the country, along with the biggest round of newspaper closures in nearly twenty years.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'In Tehran alone, the Guardian Council declared 534 ballot boxes, totaling 726,266 votes, to be invalid.',
          lang: 'en',
          cite: {
            source: 'iran-data-portal-2000-parliamentary-election',
            loc: { section: '2000 Parliamentary Election' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://irandataportal.syr.edu/2000-parliamentary-election'
          }
        },
        {
          id: 'q10',
          text: 'The new parliament promised to amend the repressive press law passed in the closing months of the previous parliament.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        },
        {
          id: 'q11',
          text: 'On the one hand, during President Khatami’s first term (1997-2001) many newspapers were closed down, mostly by the judiciary, and sometimes by the Ministry of Culture and Islamic Guidance.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q12',
          text: 'On August 6, Ayatollah Khamenei ordered the parliament to drop its consideration of a new press law.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
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
            value: { d: '2000-01' },
            cites: [
              {
                source: 'hrw-2001-world-report-iran',
                loc: { section: 'World Report 2001: Iran', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In January, the Council of Guardians removed other prominent reformists from the list of candidates, including Abbas Abdi, a leader of the 1989 seizure of the U.S. embassy in Tehran, which occasioned the hostage crisis, who had since then taken public steps to reconcile with his former captives.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2000-03-12' },
            cites: [
              {
                source: 'hrw-2001-world-report-iran',
                loc: { section: 'World Report 2001: Iran', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On March 12, a gunman shot and severely wounded Saeid Hajjarian, a director of Sobh-e Emrouz, the reformist newspaper that had taken the lead in exposing the involvement of state officials in extrajudicial executions of dissident intellectuals.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2000-04' },
            cites: [
              {
                source: 'hrw-2001-world-report-iran',
                loc: { section: 'World Report 2001: Iran', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In April, conservative elements within the judiciary began to close down independent newspapers and magazines, and to imprison leading journalists and editors.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2000-05' },
            cites: [
              {
                source: 'hrw-2001-world-report-iran',
                loc: { section: 'World Report 2001: Iran', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In May, the Council of Guardians nullified the results in eleven constituencies and canceled 726,000 of the more than three million votes cast in the Tehran constituency, without explanation.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2000-05' },
            cites: [
              {
                source: 'hrw-2001-world-report-iran',
                loc: { section: 'World Report 2001: Iran', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'When the new Majles convened in late May the reformists controlled some 150 of the 290 seats, but it was unclear whether the diverse factions of the reformist bloc would be able to operate as a unified voting group.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-world-report-iran',
          loc: { section: 'World Report 2001: Iran', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/National_Consultative_Majlis.JPG/1280px-National_Consultative_Majlis.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:National_Consultative_Majlis.JPG',
    credit: { creator: 'Mahdifa33' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-ashraf-islamic-political-movements',
          loc: {
            section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
            para: '17'
          }
        }
      ]
    }
  ]
})
