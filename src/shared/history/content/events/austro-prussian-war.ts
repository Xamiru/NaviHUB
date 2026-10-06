import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'austro-prussian-war',
  names: [
    { text: 'Austro-Prussian War', lang: 'en', role: 'primary' },
    {
      text: 'Seven Weeks\' War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    },
    {
      text: 'Deutscher Krieg',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '28' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1866-06-21' },
        cites: [
          { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '27' } },
          { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '28' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1866-08-23' },
        cites: [
          { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '50' } },
          { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '51' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:hradec-kralove',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'prussia',
      name: 'Prussia',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    },
    {
      key: 'austria',
      name: 'Austria',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    },
    {
      key: 'italy',
      name: 'Italy',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:otto-von-bismarck',
      role: 'head-of-government',
      side: 'prussia',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Bismarck and Unification', para: '3' }
        }
      ]
    },
    {
      name: 'Helmuth Graf von Moltke',
      role: 'commander',
      side: 'prussia',
      cites: [
        { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '28' } }
      ]
    },
    {
      name: 'Franz Joseph',
      role: 'head-of-state',
      side: 'austria',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '1' }
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
          text: 'Against expectations, Prussia quickly won the Seven Weeks\' War (also known as the Austro-Prussian War) against Austria and its south German allies.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'Although Austria tried to keep Italy out of the war through a last-minute offer to surrender Venetia to it, Italy joined the war with Prussia.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q3',
          text: 'Austria won key victories over Italy but lost the decisive Battle of Königgrätz (Hradec Králové in the presentday Czech Republic) to Prussia in July 1866.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q4',
          text: 'Luck had played a part in the decisive victory at the Battle of Königgrätz (Hradec Králóve in the present-day Czech Republic); otherwise, the war might have lasted much longer than it did.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Defeated, Austria agreed to the dissolution of the German Confederation and accepted the formation of a Prussian-dominated North German Confederation, which became the basis of the German Empire in 1871.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q6',
          text: 'The province of Venetia, Austria\'s last Italian possession, was transferred to Italy.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q7',
          text: 'But he dealt harshly with the other German states that had resisted Prussia and expanded Prussian territory by annexing Hanover, Schleswig-Holstein, some smaller states, and the city of Frankfurt.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q8',
          text: 'Austria was excluded from Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q9',
          text: 'Im Frieden von Prag zwischen Preußen und Österreich wird der Deutsche Bund aufgelöst.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '51' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1866.html'
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
            value: { d: '1866-06-20' },
            cites: [
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '25' } },
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '26' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Italien erklärt Österreich den Krieg.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '26' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1866.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-06-21' },
            cites: [
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '27' } },
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '28' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Mit der Bekanntmachung der preußischen Kriegserklärung an Österreich beginnt der Deutsche Krieg.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '28' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1866.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-07-03' },
            cites: [
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '36' } },
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '37' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Mit der Schlacht bei Königgrätz gelingt Preußen der kriegsentscheidende Sieg über die österreichisch-sächsische Armee.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '37' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1866.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-08-23' },
            cites: [
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '50' } },
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '51' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Damit ist der Weg frei für die von Preußen angestrebte Neuordnung Deutschlands ohne Österreich.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '51' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1866.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Georg_Bleibtreu_-_Die_Schlacht_von_K%C3%B6niggr%C3%A4tz_am_3._Juli_1866.jpg/1280px-Georg_Bleibtreu_-_Die_Schlacht_von_K%C3%B6niggr%C3%A4tz_am_3._Juli_1866.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Georg_Bleibtreu_-_Die_Schlacht_von_K%C3%B6niggr%C3%A4tz_am_3._Juli_1866.jpg',
    credit: { creator: 'Georg Bleibtreu' },
    license: { id: 'public-domain' }
  }
})
