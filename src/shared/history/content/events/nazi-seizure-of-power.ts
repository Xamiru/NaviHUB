import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nazi-seizure-of-power',
  names: [
    { text: 'Nazi seizure of power', lang: 'en', role: 'primary' },
    { text: 'Machtergreifung', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1933-01-30' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '10' }
          },
          { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '20' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1934-08-02' },
        cites: [
          { source: 'lemo-chronik-1934', loc: { section: 'Chronik 1934', para: '145' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    { ref: 'place:berlin' }
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
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Hitler and the Rise of National Socialism', para: '10' }
        }
      ]
    },
    {
      name: 'Paul von Hindenburg',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Hitler and the Rise of National Socialism', para: '8' }
        },
        { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '20' } }
      ]
    },
    {
      name: 'Franz von Papen',
      role: 'participant',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Hitler and the Rise of National Socialism', para: '10' }
        }
      ]
    },
    {
      name: 'Hermann Göring',
      role: 'participant',
      cites: [
        { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '20' } },
        { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '51' } }
      ]
    },
    {
      name: 'Joseph Goebbels',
      role: 'participant',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Hitler and the Rise of National Socialism', para: '6' }
        }
      ]
    }
  ],
  related: [
    { ref: 'period:weimar-republic', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q15',
          text: 'Hitler rapidly transformed the Weimar Republic into a dictatorship. The National Socialists accomplished their "revolution" within months, using a combination of legal procedure, persuasion, and terror.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/39.htm' }
        },
        {
          id: 'q1',
          text: 'On January 30, 1933, Papen again put together a cabinet, this time with Hitler as chancellor.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        },
        {
          id: 'q2',
          text: 'Hindenburg ernennt Hitler zum Reichskanzler. Im neugebildeten Kabinett wird Papen Vizekanzler und Reichskommissar für Preußen, Hugenberg erhält das Wirtschaftsministerium. Von der NSDAP treten Hermann Göring und Wilhelm Frick in die Regierung ein.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1933.html'
          }
        },
        {
          id: 'q3',
          text: 'Within two months, Hitler had dictatorial control over Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Three elections--in September 1930, in July 1932, and in November 1932--were held between the onset of the Depression and Hitler\'s appointment as chancellor in January 1933.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        },
        {
          id: 'q5',
          text: 'The NSDAP\'s success was even greater. Beginning with twelve seats in 1928, the Nazis increased their delegation seats nearly tenfold, to 107 seats in 1930. They doubled their holdings to 230 in the summer of 1932. This made the NSDAP the largest party in the Reichstag, far surpassing the SPD with its 133 seats.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Hitler used the Enabling Act to implement Gleichschaltung (synchronization), that is, the policy of subordinating all institutions and organizations to Nazi control.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/39.htm' }
        },
        {
          id: 'q7',
          text: 'After Hindenburg\'s death in early August 1934, Hitler combined the offices of the president and the chancellor.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/39.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1933-02-27' },
            cites: [
              { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '51' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Abends bricht im Reichstagsgebäude ein Brand aus, der fast den gesamten Mittelteil des Gebäudes und den Plenarsaal zerstört. Direkt nach dem Brand erklärt Göring, der festgenommene Niederländer Marinus van der Lubbe habe im Auftrag der KPD das Feuer gelegt. Es folgen zahlreiche politisch motivierte Verhaftungen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '52' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1933.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1933-02-28' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The Nazis blamed the fire on the Communists, and on February 28 the president, invoking Article 48 of the constitution, signed a decree that granted the Nazis the right to quash the political opposition.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/39.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1933-03-05' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '3' }
              },
              { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '59' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The election of March 5 was the last held in Germany until after World War II. Although opposition parties were severely harassed, the NSDAP won only 43.9 percent of the vote.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/39.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1933-03-23' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '3' }
              },
              { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '77' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Der Reichstag billigt in namentlicher Abstimmung mit 441 Stimmen das Ermächtigungsgesetz und verzichtet damit auf seine Gesetzgebungskompetenz. Nur 94 Abgeordnete der SPD stimmen dagegen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '78' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1933.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1933-07' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'First, left-wing political parties were banned; then, in July 1933, Germany was declared a one-party state.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/39.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1934-06-30' },
            cites: [
              { source: 'lemo-chronik-1934', loc: { section: 'Chronik 1934', para: '123' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Hitler lässt seinen SA-Stabschef und langjährigen Freund Ernst Röhm sowie andere hochstehende SA-Führer in einer vorbereiteten Aktion verhaften und ermorden.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1934', loc: { section: 'Chronik 1934', para: '124' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1934.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1934-08-02' },
            cites: [
              { source: 'lemo-chronik-1934', loc: { section: 'Chronik 1934', para: '145' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Hindenburg stirbt mit 86 Jahren auf seinem Gut Neudeck. Hitler übernimmt nun auch das Amt des Reichspräsidenten. Er nennt sich fortan "Führer und Reichskanzler". Die Reichswehr wird von nun an nicht mehr auf die Verfassung, sondern auf die Person Hitlers vereidigt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1934', loc: { section: 'Chronik 1934', para: '146' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1934.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Bundesarchiv_Bild_146-1972-026-11%2C_Macht%C3%BCbernahme_Hitlers.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_146-1972-026-11,_Macht%C3%BCbernahme_Hitlers.jpg',
    credit: { institution: 'Bundesarchiv', creator: 'Robert Sennecke' },
    license: { id: 'public-domain' },
    title: 'Machtübernahme Hitlers'
  },
  archive: [
    {
      id: 'hitlerites-parade-in-rain-1933-03-16',
      mediaKind: 'video',
      title: 'Hitlerites Parade In Rain To Demonstrate Great Nazi Strength 1933/03/16',
      url: 'https://archive.org/download/1933-03-16_Hitlerites_Parade_In_Rain/1933-03-16_Hitlerites_Parade_In_Rain.mp4',
      page: 'https://archive.org/details/1933-03-16_Hitlerites_Parade_In_Rain',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 4691321,
      date: { d: '1933-03-16' },
      durationSec: 55
    }
  ]
})
