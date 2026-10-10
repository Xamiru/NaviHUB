import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'taif-agreement',
  names: [
    { text: 'Taif Agreement', lang: 'en', role: 'primary' },
    { text: 'اتفاق الطائف', lang: 'ar', role: 'native' },
    {
      text: 'Ta\'if Accord',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
          loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '42' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1989-09-30' },
        cites: [
          {
            source: 'crs-2001-lebanon-issue-brief-ib89118',
            loc: { section: 'Lebanon: The “Taif” Reforms, 1989' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1989-10-22' },
        cites: [
          {
            source: 'crs-2001-lebanon-issue-brief-ib89118',
            loc: { section: 'Lebanon: The “Taif” Reforms, 1989' }
          },
          {
            source: 'crs-2001-lebanon-issue-brief-ib89118',
            loc: { section: 'Lebanon: The “Taif” Reforms, 1989' }
          },
          {
            source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
            loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '42' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:taif',
      cites: [
        {
          source: 'crs-2001-lebanon-issue-brief-ib89118',
          loc: { section: 'Lebanon: The “Taif” Reforms, 1989' }
        }
      ]
    },
    {
      ref: 'place:beirut',
      cites: [
        {
          source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
          loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '38' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:saudi-arabia',
      cites: [
        {
          source: 'crs-2001-lebanon-issue-brief-ib89118',
          loc: { section: 'Lebanon: The “Taif” Reforms, 1989' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Elias el-Hrawi',
      role: 'participant',
      cites: [
        {
          source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
          loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '38' }
        }
      ]
    },
    {
      name: 'Michel Aoun',
      role: 'participant',
      cites: [
        {
          source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
          loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '38' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:lebanese-civil-war',
      rel: 'related',
      cites: [
        {
          source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
          loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '38' }
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
          text: 'Although the Lebanese government has yet to re-establish effective control outside the perimeter of Beirut, it has sanctioned Syria\'s close involvement in Lebanese affairs through three major documents: the October 1989 Ta\'if Accord, the May 1991 Lebanese-Syrian Brotherhood, Cooperation and Coordination Treaty, and the September 1991 Lebanese-Syrian Security Agreement.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
            loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1992/WR92/MEW2-03.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In June 1976, with at least tacit encouragement from the United States, Syria sent its army into Lebanon as part of Arab League efforts to stop the fighting and preserve the Maronite-dominated status quo.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
            loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1992/WR92/MEW2-03.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The rivalry between the two feeble governments in West and East Beirut marked the nadir of the long Lebanese descent into near anarchy that began with the outbreak of civil war in April 1975.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
            loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1992/WR92/MEW2-03.htm'
          }
        },
        {
          id: 'q4',
          text: 'During 1991, Lebanon took significant steps toward restoring normal life.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
            loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1992/WR92/MEW2-03.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Syrian forces in Lebanon have detained without trial thousands of Lebanese and Palestinian opponents, close to 1,500 of whom are believed to remain in prison.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
            loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1992/WR92/MEW2-03.htm'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q6',
          text: 'The number of members of the Chamber of Deputies shall be increased to 128, shared equally between Christians and Muslims.',
          lang: 'en',
          cite: { source: 'unsc-taif-agreement-1989', loc: { section: 'Taif Agreement' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/Taif_Agreement'
          }
        },
        {
          id: 'q7',
          text: 'Abolishing political sectarianism is a fundamental national objective.',
          lang: 'en',
          cite: { source: 'unsc-taif-agreement-1989', loc: { section: 'Taif Agreement' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/Taif_Agreement'
          }
        },
        {
          id: 'q8',
          text: 'Disbanding of all Lebanese and non-Lebanese militias shall be announced.',
          lang: 'en',
          cite: { source: 'unsc-taif-agreement-1989', loc: { section: 'Taif Agreement' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/Taif_Agreement'
          }
        },
        {
          id: 'q9',
          text: 'Lebanon, with its Arab identity, is bound to all the Arab countries by true fraternal relations. Between Lebanon and Syria there is a special relationship that derives its strength from the roots of blood relationships, history, and joint fraternal interests.',
          lang: 'en',
          cite: { source: 'unsc-taif-agreement-1989', loc: { section: 'Taif Agreement' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/Taif_Agreement'
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
            value: { d: '1989-11' },
            cites: [
              {
                source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
                loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '38' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The Lebanese government, headed by President Elias el-Hrawi, was installed in November 1989.',
        lang: 'en',
        cite: {
          source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
          loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/1992/WR92/MEW2-03.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-10' },
            cites: [
              {
                source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
                loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '38' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Until October 1990, however, it was forced to coexist with the rival government of General Michel Aoun, the Maronite army leader appointed prime minister by former President Amin Gemayel in the last hours of his administration.',
        lang: 'en',
        cite: {
          source: 'hrw-1992-world-report-syria-and-syrian-controlled-lebanon',
          loc: { section: 'Syria and Syrian-Controlled Lebanon', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/1992/WR92/MEW2-03.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Taif%2C_Saudi_Arabia_%281985%29_-_51155988058.jpg/1280px-Taif%2C_Saudi_Arabia_%281985%29_-_51155988058.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Taif,_Saudi_Arabia_(1985)_-_51155988058.jpg',
    credit: { creator: 'Dennis Sylvester Hurd' },
    license: { id: 'cc0' }
  }
})
