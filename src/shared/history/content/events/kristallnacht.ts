import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'kristallnacht',
  names: [
    { text: 'Kristallnacht', lang: 'en', role: 'primary' },
    { text: 'Novemberpogrom', lang: 'de', role: 'native' },
    {
      text: 'Crystal Night',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1938-11-09' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
          },
          { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '188' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  partOf: [
    { ref: 'period:nazi-germany' }
  ],
  participants: [
    {
      name: 'Sturmabteilung (SA) and SS',
      role: 'perpetrator',
      cites: [
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '189' } }
      ]
    },
    {
      name: 'Herschel Grynszpan',
      role: 'participant',
      cites: [
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '187' } }
      ]
    },
    {
      name: 'Ernst vom Rath',
      role: 'victim',
      cites: [
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '187' } },
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '189' } }
      ]
    }
  ],
  figures: [
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 25000, qualifier: 'over' },
            cites: [
              { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '189' } }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:the-holocaust', rel: 'related' },
    { ref: 'event:nuremberg-laws', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In Paris verübt der 17jährige Herschel Grynszpan ein Attentat auf den deutschen Legationssekretär Ernst vom Rath und verletzt ihn schwer. Er reagiert damit auf die Ausweisung seiner Eltern aus Deutschland nach Polen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '187' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1938.html'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Ernst vom Rath erliegt seinen Verletzungen. Kampftruppen der Sturmabteilung (SA) und der SS veranstalten ein Pogrom gegen die jüdische Bevölkerung in ganz Deutschland. Mit systematischen Misshandlungen und Morden werden Juden terrorisiert, über 25.000 werden in Konzentrationslager gebracht. Zahlreiche Synagogen, Friedhöfe und jüdische Geschäfte werden zerstört.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '189' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1938.html'
          }
        },
        {
          id: 'q3',
          text: 'After the Kristallnacht (Crystal Night) of November 9, 1938, an organized act of violence perpetrated by Nazis against Jews in all parts of Germany, the persecution of Jews entered a new phase.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Die Reichsregierung beschließt die vollständige Verdrängung der Juden aus dem Wirtschaftsleben und weitere Beschränkungen ihres Alltagslebens.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '191' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1938.html'
          }
        },
        {
          id: 'q5',
          text: 'Random acts of violence, by then commonplace, were replaced by the systematic isolation of the Jewish population in Germany, which had numbered about 600,000 in the early 1930s.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1938-11-12' },
            cites: [
              { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '190' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Außerdem werden sie zu einer sogenannten Entschädigungszahlung in Höhe von 1 Milliarde Reichsmark für die Judenpogrome drei Tage zuvor verurteilt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '191' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1938.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Bundesarchiv_Bild_146-1970-083-44%2C_Magdeburg%2C_zerst%C3%B6rtes_j%C3%BCdisches_Gesch%C3%A4ft.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_146-1970-083-44,_Magdeburg,_zerst%C3%B6rtes_j%C3%BCdisches_Gesch%C3%A4ft.jpg',
    credit: { institution: 'Bundesarchiv', creator: 'H. Friedrich' },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    },
    title: 'Magdeburg, zerstörtes jüdisches Geschäft'
  }
})
