import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-rafik-hariri',
  names: [
    { text: 'Assassination of Rafik Hariri', lang: 'en', role: 'primary' },
    { text: 'Hariri assassination', lang: 'en', role: 'alternative' },
    { text: 'Cedar Revolution', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '2005-02-14' },
        cites: [
          {
            source: 'hrw-2006-world-report-syria',
            loc: { section: 'World Report 2006: Syria' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2005-04-26' },
        cites: [
          {
            source: 'hrw-2006-world-report-syria',
            loc: { section: 'World Report 2006: Syria' }
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
        { source: 'hrw-2006-world-report-syria', loc: { section: 'World Report 2006: Syria' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Rafiq Hariri',
      role: 'victim',
      cites: [
        {
          source: 'hrw-2006-04-30-establishing-the-hariri-tribunal',
          loc: { section: 'Establishing the Hariri Tribunal' }
        }
      ]
    },
    {
      name: 'Detlev Mehlis',
      role: 'participant',
      cites: [
        { source: 'hrw-2006-world-report-syria', loc: { section: 'World Report 2006: Syria' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:2006-lebanon-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2007-world-report-lebanon',
          loc: { section: 'World Report 2007: Lebanon', para: '1' }
        }
      ]
    },
    {
      ref: 'event:taif-agreement',
      rel: 'related',
      cites: [
        {
          source: 'iranica-mervin-shiites-in-lebanon',
          loc: { section: 'SHIʿITES IN LEBANON' }
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
          text: 'Human Rights Watch regards the bombing that killed former Lebanese Prime Minister Rafiq Hariri and 22 other individuals as a grave affront to human rights.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-04-30-establishing-the-hariri-tribunal',
            loc: { section: 'Establishing the Hariri Tribunal' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2006/04/30/establishing-hariri-tribunal'
          }
        },
        {
          id: 'q2',
          text: 'The February 2005 assassination of former Lebanese Prime Minister Rafik Hariri sharply intensified international pressure on the Syrian government.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-syria',
            loc: { section: 'World Report 2006: Syria' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/syria'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The United Nations Security Council passed Resolution 1559 on September 2, 2004, calling for the complete withdrawal of all foreign—i.e. Syrian—troops from Lebanon, and reiterating support for Lebanon’s sovereignty and independence.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-syria',
            loc: { section: 'World Report 2006: Syria' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/syria'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Security Council Resolutions 1644 (2005) and 1664 (2006) imply that the jurisdiction of the Hariri Tribunal may be limited to the bombing on February 14, 2005 that killed former Prime Minister Hariri and 22 others.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-04-30-establishing-the-hariri-tribunal',
            loc: { section: 'Establishing the Hariri Tribunal' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2006/04/30/establishing-hariri-tribunal'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Lebanon\'s tentative steps towards reform and stability following the assassination of former Prime Minister Rafiq Hariri and the subsequent withdrawal of Syrian troops came to a halt after war broke out between Hezbollah and Israel on July 12.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-lebanon',
            loc: { section: 'World Report 2007: Lebanon', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-3'
          }
        },
        {
          id: 'q6',
          text: 'A UN investigation into the Hariri assassination and 14 other cases continues with the likelihood that that the Lebanese government and the UN will establish an international tribunal to try those responsible.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-lebanon',
            loc: { section: 'World Report 2007: Lebanon', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-3'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q7',
          text: '2. Calls upon all remaining foreign forces to withdraw from Lebanon;',
          lang: 'en',
          cite: { source: 'unsc-resolution-1559-2004', loc: { section: 'Resolution 1559 (2004)' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/United_Nations_Security_Council_Resolution_1559'
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
            value: { d: '2005-04-07' },
            cites: [
              {
                source: 'hrw-2006-world-report-syria',
                loc: { section: 'World Report 2006: Syria' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The Security Council on April 7, 2005, adopted Resolution 1595, launching an investigation into the February 14 assassination, in Beirut, of former Lebanese Prime Minister Rafik Hariri.',
        lang: 'en',
        cite: { source: 'hrw-2006-world-report-syria', loc: { section: 'World Report 2006: Syria' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2006/country-chapters/syria'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-04-26' },
            cites: [
              {
                source: 'hrw-2006-world-report-syria',
                loc: { section: 'World Report 2006: Syria' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Bowing to this as well as Lebanese popular pressure, Syria withdrew its troops from Lebanon on April 26.',
        lang: 'en',
        cite: { source: 'hrw-2006-world-report-syria', loc: { section: 'World Report 2006: Syria' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2006/country-chapters/syria'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-10-31' },
            cites: [
              {
                source: 'hrw-2006-world-report-syria',
                loc: { section: 'World Report 2006: Syria' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On October 31, the Security Council unanimously adopted Resolution 1636 threatening “further action” against Syria if it did not fully cooperate with the investigation.',
        lang: 'en',
        cite: { source: 'hrw-2006-world-report-syria', loc: { section: 'World Report 2006: Syria' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2006/country-chapters/syria'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006-03-29' },
            cites: [
              {
                source: 'hrw-2006-04-30-establishing-the-hariri-tribunal',
                loc: { section: 'Establishing the Hariri Tribunal' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'We therefore welcome the Security Council’s adoption on March 29, 2006 of Resolution 1664 (2006), calling on you to negotiate an agreement with the Government of Lebanon to establish a “tribunal of an international character” to try all those responsible for this crime (hereinafter, the “Hariri Tribunal”).',
        lang: 'en',
        cite: {
          source: 'hrw-2006-04-30-establishing-the-hariri-tribunal',
          loc: { section: 'Establishing the Hariri Tribunal' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/news/2006/04/30/establishing-hariri-tribunal'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-03' },
            cites: [
              {
                source: 'hrw-2010-world-report-lebanon',
                loc: { section: 'World Report 2010: Lebanon' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In March 2009 the international tribunal to try those responsible for killing former prime minister Rafik Hariri in 2005 and other politically motivated assassinations officially began its operations.',
        lang: 'en',
        cite: {
          source: 'hrw-2010-world-report-lebanon',
          loc: { section: 'World Report 2010: Lebanon' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2010/country-chapters/lebanon'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Cedar_Revolution_Demonstrators.jpg/1280px-Cedar_Revolution_Demonstrators.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Cedar_Revolution_Demonstrators.jpg',
    credit: { creator: 'Elie Ghobeira' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
