import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anschluss',
  names: [
    { text: 'Anschluss', lang: 'en', role: 'primary' },
    { text: 'Anschluss Österreichs', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1938-03-12' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Growing German Pressure on Austria', para: '7' }
          },
          { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '50' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1938-03-13' },
        cites: [
          { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '52' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    { ref: 'place:vienna' }
  ],
  partOf: [
    { ref: 'period:nazi-germany' }
  ],
  participants: [
    {
      ref: 'person:adolf-hitler',
      role: 'leader',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'Growing German Pressure on Austria', para: '7' }
        }
      ]
    },
    {
      name: 'Kurt von Schuschnigg',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'Growing German Pressure on Austria', para: '5' }
        },
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '48' } }
      ]
    },
    {
      name: 'Arthur Seyß-Inquart',
      role: 'participant',
      cites: [
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '48' } },
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '54' } }
      ]
    },
    {
      name: 'Wilhelm Miklas',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '52' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Bereft of external support and in no position to resist German pressure, Schuschnigg agreed to meet Hitler in Berchtesgaden on February 12, 1938.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Growing German Pressure on Austria', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/37.htm' }
        },
        {
          id: 'q2',
          text: 'On his return to Vienna, Schuschnigg began secret plans for one last desperate bid to preserve Austrian sovereignty: a plebiscite designed to secure a yes vote "for a free and German, independent and social, for a Christian and united Austria, for peace and work and equality of all who declare themselves for Nation and Fatherland."',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Growing German Pressure on Austria', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/37.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q12',
          text: 'In March 1938, the German army was permitted to occupy Austria by that country\'s browbeaten political leadership. The annexation (Anschluss) of Austria was welcomed by most Austrians, who wished to become part of a greater Germany, something forbidden by the Treaty of Versailles.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich: Foreign Policy', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/40.htm' }
        },
        {
          id: 'q3',
          text: 'Nonetheless, on March 12, Hitler sent the German army into Austria.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Growing German Pressure on Austria', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/37.htm' }
        },
        {
          id: 'q13',
          text: 'Hitler moved quickly to suppress what little independent identity and national unity Austria had. The name Austria was banned, provinces were freed of central administration from Vienna, and provincial loyalty and identification were cultivated.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'THE ANSCHLUSS AND WORLD WAR II: Absorption of Austria into the Third Reich',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/austria/38.htm' }
        },
        {
          id: 'q5',
          text: 'But, influenced by the tumultuous welcome he received on his arrival, Hitler made an impromptu decision for quick and total absorption of Austria into the Third Reich.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'THE ANSCHLUSS AND WORLD WAR II: Absorption of Austria into the Third Reich',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/38.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The Anschluss violated various international agreements, but the European powers offered only perfunctory opposition.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'THE ANSCHLUSS AND WORLD WAR II: Absorption of Austria into the Third Reich',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/38.htm' }
        },
        {
          id: 'q7',
          text: 'Although the outcome was undoubtedly influenced by Nazi intimidation, the Anschluss enjoyed broad popular support. Nevertheless, the positive vote reflected the Austrians\' desire for change far more than it did widespread support for Hitler and Nazism.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'THE ANSCHLUSS AND WORLD WAR II: Absorption of Austria into the Third Reich',
              para: '4'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/38.htm' }
        },
        {
          id: 'q8',
          text: 'Thus, a disproportionate number of Austrians came to be in charge of the bureaucracy overseeing the implementation of the Nazis\' extermination of the Jews and other peoples and groups deemed undesirable.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'THE ANSCHLUSS AND WORLD WAR II: Absorption of Austria into the Third Reich',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/38.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1938-02-12' },
            cites: [
              {
                source: 'loc-austria-country-study-1994',
                loc: { section: 'Growing German Pressure on Austria', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Hitler used the meeting to intimidate the Austrians with an implicit threat of military invasion, and Schuschnigg accepted a list of demands designed to strengthen the political position of the Austrian Nazis.',
        lang: 'en',
        cite: {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'Growing German Pressure on Austria', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/37.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1938-03-11' },
            cites: [
              { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '48' } },
              {
                source: 'loc-austria-country-study-1994',
                loc: { section: 'Growing German Pressure on Austria', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The German army began preparing for an invasion on March 10, and Nazi sympathizers in the Austrian cabinet demanded that the plebiscite be postponed. Schuschnigg agreed to cancel it altogether and then acceded to demands for his resignation.',
        lang: 'en',
        cite: {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'Growing German Pressure on Austria', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/austria/37.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1938-04-10' },
            cites: [
              {
                source: 'loc-austria-country-study-1994',
                loc: {
                  section: 'THE ANSCHLUSS AND WORLD WAR II: Absorption of Austria into the Third Reich',
                  para: '4'
                }
              },
              { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '71' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'To provide a legal facade for the Anschluss, Hitler arranged a plebiscite for April 10, 1938. The Nazis portrayed the plebiscite as a vote on pan-Germanism and claimed a 99.7 percent vote in favor of the Anschluss.',
        lang: 'en',
        cite: {
          source: 'loc-austria-country-study-1994',
          loc: {
            section: 'THE ANSCHLUSS AND WORLD WAR II: Absorption of Austria into the Third Reich',
            para: '4'
          }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/38.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Anschluss_Heldenplatz1.jpg/1280px-Anschluss_Heldenplatz1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Anschluss_Heldenplatz1.jpg',
    credit: {
      institution: 'U.S. National Archives and Records Administration',
      creator: 'Heinrich Hoffmann'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'botz-1972-die-eingliederung-osterreichs', perspective: 'european' }
  ]
})
