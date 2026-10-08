import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'munich-agreement',
  names: [
    { text: 'Munich Agreement', lang: 'en', role: 'primary' },
    { text: 'Münchner Abkommen', lang: 'de', role: 'native' },
    {
      text: 'Munich Betrayal',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'state', name: 'Russian Federation (President Vladimir Putin)' }
      ],
      cites: [
        {
          source: 'kremlin-2020-06-19-putin-75th-anniversary-great-victory',
          loc: {
            section: '75th Anniversary of the Great Victory: Shared Responsibility to History and our Future',
            para: '23'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1938-09-29' },
        cites: [
          {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '5' }
          },
          {
            source: 'avalon-munich-agreement-1938',
            loc: { section: 'Agreement concluded at Munich, September 29, 1938' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1938-09-30' },
        cites: [
          {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '5' }
          },
          { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '167' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:munich',
      cites: [
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'Munich', para: '5' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:french-third-republic' },
    { ref: 'polity:kingdom-of-italy' }
  ],
  participants: [
    {
      ref: 'person:adolf-hitler',
      role: 'signatory',
      cites: [
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'Munich', para: '5' }
        }
      ]
    },
    {
      ref: 'person:benito-mussolini',
      role: 'signatory',
      cites: [
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'Munich', para: '5' }
        }
      ]
    },
    {
      name: 'Neville Chamberlain',
      role: 'signatory',
      cites: [
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'Munich', para: '2' }
        },
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'Munich', para: '5' }
        }
      ]
    },
    {
      name: 'Édouard Daladier',
      role: 'signatory',
      cites: [
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '167' } }
      ]
    },
    {
      name: 'Eduard Benes',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'Munich', para: '2' }
        },
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'Munich', para: '4' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:anschluss', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'After the Austrian Anchluss, Czechoslovakia was to become Hitler\'s next target. Hitler\'s strategy was to exploit the existing Sudeten German minority problem as a pretext for German penetration into eastern Central Europe.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/czech-republic/28.htm'
          }
        },
        {
          id: 'q2',
          text: 'In 1938 neither Britain nor France desired war.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/czech-republic/28.htm'
          }
        },
        {
          id: 'q3',
          text: 'On September 15, Hitler met with Chamberlain at Berchtesgaden and demanded the swift return of the Sudetenland to the Third Reich under threat of war.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/czech-republic/28.htm'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'The Munich Agreement stipulated that Czechoslovakia must cede Sudeten territory to Germany.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/czech-republic/28.htm'
          }
        },
        {
          id: 'q4',
          text: 'On September 28, Chamberlain appealed to Hitler for a conference. Hitler met the next day, at Munich, with the chiefs of government of France, Italy, and Britain. The Czechoslovak government was neither invited nor consulted.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/czech-republic/28.htm'
          }
        },
        {
          id: 'q5',
          text: 'GERMANY, the United Kingdom, France and Italy, taking into consideration the agreement, which has been already reached in principle for the cession to Germany of the Sudeten German territory, have agreed on the following terms and conditions governing the said cession and the measures consequent thereon',
          lang: 'en',
          cite: {
            source: 'avalon-munich-agreement-1938',
            loc: { section: 'Agreement concluded at Munich, September 29, 1938' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://avalon.law.yale.edu/imt/munich1.asp' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Hungary received 11,882 square kilometers in southern Slovakia and southern Ruthenia; only 53 percent of the population in this territory was Hungarian. Poland acquired Tesin and two minor border areas in northern Slovakia.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'http://countrystudies.us/czech-republic/28.htm'
          }
        },
        {
          id: 'q9',
          text: 'In March 1939, Germany occupied the Czech-populated western provinces of Bohemia and Moravia, and Slovakia was made a German puppet state.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich: Foreign Policy', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/40.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bundesarchiv_Bild_183-1982-1020-502%2C_M%C3%BCnchener_Abkommen%2C_Hitler_und_Daladier.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-1982-1020-502,_M%C3%BCnchener_Abkommen,_Hitler_und_Daladier.jpg',
    credit: { institution: 'Bundesarchiv', creator: 'Heinrich Hoffmann' },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    },
    title: 'Münchener Abkommen, Hitler und Daladier'
  },
  furtherReading: [
    { source: 'lacaze-1992-la-france-et-munich', perspective: 'european' }
  ]
})
