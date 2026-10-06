import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-league-of-nations',
  names: [
    { text: 'Founding of the League of Nations', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1920-01-16' },
        cites: [
          { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '13' } }
        ]
      }
    ]
  },
  regions: ['global', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:geneva',
      cites: [
        { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '146' } }
      ]
    },
    {
      ref: 'place:paris',
      cites: [
        { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '14' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:woodrow-wilson',
      role: 'ideologue',
      cites: [
        {
          source: 'state-dept-milestones-league-of-nations',
          loc: { section: 'The League of Nations, 1920', para: '3' }
        },
        {
          source: 'state-dept-milestones-league-of-nations',
          loc: { section: 'The League of Nations, 1920', para: '6' }
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
          text: 'The League of Nations was an international organization, headquartered in Geneva, Switzerland, created after the First World War to provide a forum for resolving international disputes. Though first proposed by President Woodrow Wilson as part of his Fourteen Points plan for an equitable peace in Europe, the United States never became a member.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-league-of-nations',
            loc: { section: 'The League of Nations, 1920', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/league'
          }
        },
        {
          id: 'q2',
          text: 'The League’s main organs were an Assembly of all members, a Council made up of five permanent members and four rotating members, and an International Court of Justice.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-league-of-nations',
            loc: { section: 'The League of Nations, 1920', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/league'
          }
        },
        {
          id: 'q3',
          text: 'The Members of the League undertake to respect and preserve as against external aggression the territorial integrity and existing political independence of all Members of the League.',
          lang: 'en',
          cite: {
            source: 'avalon-covenant-of-the-league-of-nations',
            loc: { section: 'The Covenant of the League of Nations' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/leagcov.asp'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The idea of the League was grounded in the broad, international revulsion against the unprecedented destruction of the First World War and the contemporary understanding of its origins.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-league-of-nations',
            loc: { section: 'The League of Nations, 1920', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/league'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Persia becomes one of the original members of the League of Nations and immdiately protests the Anglo-Persian Agreement of 1919; the League rules in favor of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1920' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q6',
          text: 'At the 1919 Paris Peace Conference, under Article 22 of the League of Nations Covenant, Iraq was formally made a Class A mandate entrusted to Britain.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iraq/19.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1920-01-16' },
            cites: [
              { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '13' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Konstituierende Sitzung des Völkerbundrats in Paris.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '14' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1920.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-03' },
            cites: [
              {
                source: 'state-dept-milestones-league-of-nations',
                loc: { section: 'The League of Nations, 1920', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Wilson and Lodge’s personal dislike of each other poisoned any hopes for a compromise, and in March 1920, the Treaty and Covenant were defeated by a 49-35 Senate vote.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-league-of-nations',
          loc: { section: 'The League of Nations, 1920', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1914-1920/league'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-05-19' },
            cites: [
              { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '145' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Der Völkerbundrat bestimmt Genf zum Sitz des Völkerbunds.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '146' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1920.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-11-15' },
            cites: [
              { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '261' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In Genf findet die erste Vollversammlung des Völkerbunds mit 42 teilnehmenden Staaten statt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1920', loc: { section: 'Chronik 1920', para: '262' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1920.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1926-09-08' },
            cites: [
              { source: 'lemo-chronik-1926', loc: { section: 'Chronik 1926', para: '170' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Einstimmige Aufnahme Deutschlands in den Völkerbund mit einem ständigen Ratssitz.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1926', loc: { section: 'Chronik 1926', para: '171' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1926.html'
        }
      }
    }
  ],
  archive: [
    {
      id: 'taft-papers-on-league-of-nations-1920',
      mediaKind: 'document',
      title: 'Taft papers on League of nations',
      url: 'https://archive.org/download/taftpapersonlea00taftgoog/taftpapersonlea00taftgoog.pdf',
      page: 'https://archive.org/details/taftpapersonlea00taftgoog',
      credit: {
        institution: 'Internet Archive (Google Books scan)',
        creator: 'Taft, William H. (William Howard), 1857-1930'
      },
      license: { id: 'public-domain' },
      bytes: 18164336,
      date: { d: '1920' }
    }
  ]
})
