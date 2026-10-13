import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'orange-revolution',
  names: [
    { text: 'Orange Revolution', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-12',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '2004-11-21' },
        cites: [
          {
            source: 'state-dept-background-note-ukraine-2008',
            loc: { section: 'Background Note: Ukraine', para: '57' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2005-01-23' },
        cites: [
          {
            source: 'state-dept-background-note-ukraine-2008',
            loc: { section: 'Background Note: Ukraine', para: '59' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:kyiv',
      cites: [
        {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '57' }
        }
      ]
    },
    {
      ref: 'place:ukraine',
      cites: [
        {
          source: 'hrw-2005-world-report-ukraine',
          loc: { section: 'World Report 2005: Ukraine', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'yushchenko-camp',
      name: 'Opposition supporting Viktor Yushchenko',
      cites: [
        {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '57' }
        }
      ]
    },
    {
      key: 'yanukovych-camp',
      name: 'Government supporting Viktor Yanukovych',
      cites: [
        {
          source: 'hrw-2005-world-report-ukraine',
          loc: { section: 'World Report 2005: Ukraine', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Viktor Yushchenko',
      role: 'leader',
      side: 'yushchenko-camp',
      cites: [
        {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '57' }
        }
      ]
    },
    {
      name: 'Viktor Yanukovych',
      role: 'leader',
      side: 'yanukovych-camp',
      cites: [
        {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '57' }
        }
      ]
    },
    {
      name: 'Leonid Kuchma',
      role: 'head-of-state',
      side: 'yanukovych-camp',
      cites: [
        {
          source: 'hrw-2005-world-report-ukraine',
          loc: { section: 'World Report 2005: Ukraine', para: '2' }
        }
      ]
    },
    {
      name: 'Yulia Tymoshenko',
      role: 'participant',
      side: 'yushchenko-camp',
      cites: [
        {
          source: 'hrw-2006-world-report-ukraine',
          loc: { section: 'World Report 2006: Ukraine', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:dissolution-of-the-soviet-union',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2005-world-report-ukraine',
          loc: { section: 'World Report 2005: Ukraine', para: '1' }
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
          text: 'Presidential elections in November 2004, which were neither free nor fair, sparked a popular uprising in support of presidential candidate Viktor Yushchenko.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-ukraine',
            loc: { section: 'World Report 2006: Ukraine', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240219184434/https://www.hrw.org/world-report/2006/country-chapters/ukraine'
          }
        },
        {
          id: 'q2',
          text: 'In what became known as the Orange Revolution, thousands of Ukrainian citizens took to the streets to peacefully protest the government’s manipulation of the elections in favor of Prime Minister Viktor Yanukovich.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-ukraine',
            loc: { section: 'World Report 2006: Ukraine', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240219184434/https://www.hrw.org/world-report/2006/country-chapters/ukraine'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'For years, under the leadership of President Kuchma, the government imposed ever stricter controls on media coverage, repeatedly sought to manipulate electoral processes, and ignored widespread popular discontent.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-ukraine',
            loc: { section: 'World Report 2005: Ukraine', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240229204326/https://www.hrw.org/world-report/2005/country-chapters/ukraine'
          }
        },
        {
          id: 'q4',
          text: 'In the run-up to the presidential elections, the authorities made extensive use of their administrative resources and the media under their control to promote their favored candidate, Viktor Yanukovich.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-ukraine',
            loc: { section: 'World Report 2005: Ukraine', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240229204326/https://www.hrw.org/world-report/2005/country-chapters/ukraine'
          }
        },
        {
          id: 'q5',
          text: 'The campaign leading to the October 31, 2004 presidential election was characterized by widespread violations of democratic norms, including government intimidation of the opposition and of independent media, abuse of state administrative resources, highly skewed media coverage, and numerous provocations.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-ukraine-2008',
            loc: { section: 'Background Note: Ukraine', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The November 21 runoff election was marred by credible reports of widespread and significant violations, including illegal expulsion of opposition representatives from election commissions, multiple voting by busloads of people, abuse of absentee ballots, reports of coercion of votes in schools and prisons, and an abnormally high number of (easily manipulated) mobile ballot box votes.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-ukraine-2008',
            loc: { section: 'Background Note: Ukraine', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
          }
        },
        {
          id: 'q7',
          text: 'A November presidential election that was neither free nor fair plummeted Ukraine into its deepest political crisis since gaining independence in 1991.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-ukraine',
            loc: { section: 'World Report 2005: Ukraine', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240229204326/https://www.hrw.org/world-report/2005/country-chapters/ukraine'
          }
        },
        {
          id: 'q8',
          text: 'The international community has closely monitored the presidential elections.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-ukraine',
            loc: { section: 'World Report 2005: Ukraine', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240229204326/https://www.hrw.org/world-report/2005/country-chapters/ukraine'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'While the new government enjoyed relative stability for the first nine months of 2005, many government agencies remained unformed and economic indicators deteriorated.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-ukraine',
            loc: { section: 'World Report 2006: Ukraine', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240219184434/https://www.hrw.org/world-report/2006/country-chapters/ukraine'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'The popular uprising that helped sweep Yushchenko to the presidency was rooted in the belief among many Ukrainians that a Yushchenko administration would improve the government’s record in economic, social, and political spheres and demonstrate greater respect for human rights and political liberties.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-ukraine',
            loc: { section: 'World Report 2006: Ukraine', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240219184434/https://www.hrw.org/world-report/2006/country-chapters/ukraine'
          }
        },
        {
          id: 'q11',
          text: 'The constitution was amended to transfer power, especially with respect to appointment of ministers, from the president to the prime minister.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-ukraine-2008',
            loc: { section: 'Background Note: Ukraine', para: '58' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
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
            value: { d: '2004-10-31' },
            cites: [
              {
                source: 'state-dept-background-note-ukraine-2008',
                loc: { section: 'Background Note: Ukraine', para: '57' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The two major candidates--Prime Minister Viktor Yanukovych and opposition leader (and former Prime Minister) Viktor Yushchenko--each garnered between 39% and 40% of the vote and proceeded to a winner-take-all second round.',
        lang: 'en',
        cite: {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '57' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-11-24' },
            cites: [
              {
                source: 'state-dept-background-note-ukraine-2008',
                loc: { section: 'Background Note: Ukraine', para: '58' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On November 24, the CEC declared Yanukovych the winner with 49.46% compared to 46.61% for Yushchenko.',
        lang: 'en',
        cite: {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '58' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-12-03' },
            cites: [
              {
                source: 'state-dept-background-note-ukraine-2008',
                loc: { section: 'Background Note: Ukraine', para: '58' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On December 3, Ukraine\'s Supreme Court invalidated the CEC\'s announced results and mandated a repeat of the second round vote to take place on December 26.',
        lang: 'en',
        cite: {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '58' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-12-08' },
            cites: [
              {
                source: 'state-dept-background-note-ukraine-2008',
                loc: { section: 'Background Note: Ukraine', para: '58' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'An agreement mediated by European leaders resulted in new legislation being passed by the Rada and signed by the President December 8.',
        lang: 'en',
        cite: {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '58' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-12-26' },
            cites: [
              {
                source: 'state-dept-background-note-ukraine-2008',
                loc: { section: 'Background Note: Ukraine', para: '59' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The December 26 re-vote took place in an atmosphere of calm.',
        lang: 'en',
        cite: {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '59' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-01-10' },
            cites: [
              {
                source: 'state-dept-background-note-ukraine-2008',
                loc: { section: 'Background Note: Ukraine', para: '59' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On January 10, 2005, after the CEC and the Supreme Court had considered and rejected numerous complaints and appeals filed by the Yanukovych campaign, the CEC certified the results: Yushchenko had won 51.99% of the votes, with 44.20% for Yanukovych.',
        lang: 'en',
        cite: {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '59' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-01-23' },
            cites: [
              {
                source: 'state-dept-background-note-ukraine-2008',
                loc: { section: 'Background Note: Ukraine', para: '59' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'President Yushchenko was inaugurated January 23, 2005.',
        lang: 'en',
        cite: {
          source: 'state-dept-background-note-ukraine-2008',
          loc: { section: 'Background Note: Ukraine', para: '59' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240309163649/https://2001-2009.state.gov/r/pa/ei/bgn/3211.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Kiev_Independence_Square_Orange_Revolution_22-11-2004.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kiev_Independence_Square_Orange_Revolution_22-11-2004.jpg',
    credit: { institution: 'maidan.org.ua' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
