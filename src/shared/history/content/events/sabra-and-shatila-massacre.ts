import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sabra-and-shatila-massacre',
  names: [
    { text: 'Sabra and Shatila massacre', lang: 'en', role: 'primary' },
    { text: 'مجزرة صبرا وشاتيلا', lang: 'ar', role: 'native' },
    {
      text: 'Sabra and Shatilla massacre',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
        },
        {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '12' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1982-09-16' },
        cites: [
          {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '12' }
          }
        ]
      },
      {
        value: { d: '1982-09-27' },
        cites: [
          { source: 'loc-lebanon-country-study', loc: { section: 'Israel', para: '5' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1982-09-18' },
        cites: [
          {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '12' }
          }
        ]
      },
      {
        value: { d: '1982-09-28' },
        cites: [
          { source: 'loc-lebanon-country-study', loc: { section: 'Israel', para: '5' } }
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
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
        },
        {
          source: 'reagan-lib-1982-09-18-statement-on-murder-of-palestinian-refugees-in-lebanon',
          loc: { section: 'Statement on the Murder of Palestinian Refugees in Lebanon', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:state-of-israel' }
  ],
  sides: [
    {
      key: 'phalange',
      name: 'Phalange militia',
      cites: [
        {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '13' }
        }
      ]
    },
    {
      key: 'idf',
      name: 'Israel Defense Forces',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Elie Hobeika',
      role: 'perpetrator',
      side: 'phalange',
      cites: [
        {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '10' }
        }
      ]
    },
    {
      name: 'Ariel Sharon',
      role: 'commander',
      side: 'idf',
      cites: [
        {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '16' }
        }
      ]
    },
    {
      name: 'Rafael Eitan',
      role: 'commander',
      side: 'idf',
      cites: [
        {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '16' }
        }
      ]
    },
    {
      ref: 'person:ronald-reagan',
      role: 'head-of-state',
      cites: [
        {
          source: 'reagan-lib-1982-09-18-statement-on-murder-of-palestinian-refugees-in-lebanon',
          loc: { section: 'Statement on the Murder of Palestinian Refugees in Lebanon', para: '1' }
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
            value: { min: 700, max: 800 },
            cites: [
              {
                source: 'hrw-2001-israel-sharon-investigation-urged',
                loc: { section: 'Israel: Sharon Investigation Urged', para: '12' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Israeli military intelligence' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:israeli-invasion-of-lebanon-1982',
      rel: 'caused-by',
      cites: [
        {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
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
          text: 'By September 18, it became clear that the Israelis had allowed Maronite militiamen to enter the Sabra and Shatilla camps and massacre Palestinian civilians.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-reagan-administration-and-lebanon',
            loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/lebanon'
          }
        },
        {
          id: 'q2',
          text: 'On September 17, hundreds of Palestinian men, women, and children had been murdered in the Sabra and Shatila refugee camps, south of Beirut.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1982-09-18-statement-on-murder-of-palestinian-refugees-in-lebanon',
            loc: {
              section: 'Statement on the Murder of Palestinian Refugees in Lebanon',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/statement-murder-palestinian-refugees-lebanon'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Human Rights Watch said that the United States had a substantial interest in the case because the Israeli occupation of West Beirut followed written U.S. assurances that Palestinians remaining there would be safe',
          lang: 'en',
          cite: {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'During the negotiations leading to the PLO withdrawal from Beirut, we were assured that Israeli forces would not enter west Beirut.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1982-09-18-statement-on-murder-of-palestinian-refugees-in-lebanon',
            loc: {
              section: 'Statement on the Murder of Palestinian Refugees in Lebanon',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/statement-murder-palestinian-refugees-lebanon'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'The precise civilian death toll most likely will never be known. Israeli military intelligence estimated that between 700 and 800 people were killed in Sabra and Shatilla during the sixty-two-hour rampage, while Palestinian and other sources have claimed that the dead numbered up to several thousand.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'An international outcry ensued, and Reagan decided to commit Marines to a new MNF.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-reagan-administration-and-lebanon',
            loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/lebanon'
          }
        },
        {
          id: 'q8',
          text: 'In February 1983, the three-member Israeli official independent commission of inquiry charged with investigating the events known as the Kahan Commission named former Defense Minister Sharon as one of the individuals who "bears personal responsibility" for the Sabra and Shatilla massacre.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
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
            value: { d: '1982-09-14' },
            cites: [
              {
                source: 'state-dept-milestones-reagan-administration-and-lebanon',
                loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On September 14, Lebanese President-elect Bashir Gemayel, whose election had been backed by the Israelis, was assassinated.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-reagan-administration-and-lebanon',
          loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
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
            value: { d: '1982-09-16' },
            cites: [
              {
                source: 'hrw-2001-israel-sharon-investigation-urged',
                loc: { section: 'Israel: Sharon Investigation Urged', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The massacre at the Sabra and Shatilla refugee camps occurred between September 16 and 18, 1982',
        lang: 'en',
        cite: {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-09-18' },
            cites: [
              {
                source: 'reagan-lib-1982-09-18-statement-on-murder-of-palestinian-refugees-in-lebanon',
                loc: {
                  section: 'Statement on the Murder of Palestinian Refugees in Lebanon',
                  para: '0'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'I was horrified to learn this morning of the killing of Palestinians which has taken place in Beirut.',
        lang: 'en',
        cite: {
          source: 'reagan-lib-1982-09-18-statement-on-murder-of-palestinian-refugees-in-lebanon',
          loc: { section: 'Statement on the Murder of Palestinian Refugees in Lebanon', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.reaganlibrary.gov/archives/speech/statement-murder-palestinian-refugees-lebanon'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1983-02' },
            cites: [
              {
                source: 'hrw-2001-israel-sharon-investigation-urged',
                loc: { section: 'Israel: Sharon Investigation Urged', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Kahan Commission report detailed the direct role of former Defense Minister Sharon in allowing the Phalangists into the Sabra and Shatilla camps.',
        lang: 'en',
        cite: {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/A_main_street_in_Shatila_camp_during_the_July_ceasefire%2C_Beirut%2C_Lebanon.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_main_street_in_Shatila_camp_during_the_July_ceasefire,_Beirut,_Lebanon.jpg',
    credit: {
      institution: 'UNRWA Archive (United Nations Relief and Works Agency for Palestine Refugees in the Near East)',
      creator: 'H. Haider'
    },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/igo/deed.en'
    }
  }
})
