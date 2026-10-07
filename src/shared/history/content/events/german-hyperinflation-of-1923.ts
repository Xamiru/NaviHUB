import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'german-hyperinflation-of-1923',
  names: [
    { text: 'German hyperinflation of 1923', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1923' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Problems of Parliamentary Politics', para: '8' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1923-11-15' },
        cites: [
          {
            source: 'lemo-kapitel-inflation-1923',
            loc: { section: 'Die Inflation', para: '20' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    { ref: 'place:berlin' },
    {
      ref: 'place:munich',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Hitler and the Rise of National Socialism', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Gustav Stresemann',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Stresemann Era', para: '2' }
        }
      ]
    },
    {
      ref: 'person:adolf-hitler',
      role: 'participant',
      cites: [
        {
          source: 'lemo-kapitel-inflation-1923',
          loc: { section: 'Die Inflation', para: '23' }
        },
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Hitler and the Rise of National Socialism', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In 1914 US$1 had equaled 4 marks. By mid-1920, US$1 was worth 40 marks, by early 1922 about 200 marks, a year later 18,000 marks, and by November 1923 4.2 trillion marks.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Problems of Parliamentary Politics', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/36.htm' }
        },
        {
          id: 'q1',
          text: 'The government also began printing money at such a rate that it soon became virtually worthless; by the fall of 1923, wheelbarrows were needed to carry enough currency for simple purchases as inflation reached rates beyond comprehension.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Problems of Parliamentary Politics', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/36.htm' }
        },
        {
          id: 'q3',
          text: 'Der Reallohn sank auf ca. 40 Prozent seines Vorkriegsniveaus, weite Teile der deutschen Bevölkerung verarmten.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-inflation-1923',
            loc: { section: 'Die Inflation', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/inflation-1923.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Inflation ruined many middle-class Germans, who saw their savings and pensions wiped out.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Problems of Parliamentary Politics', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/36.htm' }
        },
        {
          id: 'q5',
          text: 'Vor allem die völlige Entwertung der als mündelsicher angesehenen Kriegsanleihen führte zu einem immensen Vertrauensverlust in den Staat und erwies sich als äußerst schwere Hypothek der Weimarer Republik.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-inflation-1923',
            loc: { section: 'Die Inflation', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/inflation-1923.html'
          }
        },
        {
          id: 'q6',
          text: 'Ein noch größerer Profiteur war jedoch der Staat. Seine gesamten Kriegsschulden in Höhe von 164 Milliarden Mark beliefen sich bei der Währungsumstellung am 15. November 1923 auf gerade einmal 16,4 Pfennige.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-inflation-1923',
            loc: { section: 'Die Inflation', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/inflation-1923.html'
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
            value: { d: '1923-01' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Problems of Parliamentary Politics', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In January French and Belgian troops occupied the highly industrialized Ruhr area because of German defaults on reparations payments. The Weimar government responded by calling upon the Ruhr population to stop all industrial activity.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Problems of Parliamentary Politics', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/36.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1923-08' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Problems of Parliamentary Politics', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Chancellor only from August to November 1923, Stresemann headed the "great coalition," an alliance that included the SPD, the Center Party, the DDP, and the DVP. In this brief period, he ended passive resistance in the Ruhr area and introduced measures to bring the currency situation under control.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Stresemann Era', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/37.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1923-11-08', notAfter: '1923-11-09' },
            cites: [
              {
                source: 'lemo-kapitel-inflation-1923',
                loc: { section: 'Die Inflation', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'General Ludendorff supported the former corporal in the Beer Hall Putsch of November 1923 in Munich, an attempt to overthrow the Bavarian government. The putsch failed, and Hitler received a light sentence of five years, of which he served less than one. Incarcerated in relative comfort, he wrote Mein Kampf (My Struggle), in which he set out his long-term political aims.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Hitler and the Rise of National Socialism', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1923-11-15' },
            cites: [
              {
                source: 'lemo-kapitel-inflation-1923',
                loc: { section: 'Die Inflation', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Mit der Währungsreform trat am 15. November eine neue Währungsordnung in Kraft, welche die Inflation schlagartig beendete.',
        lang: 'de',
        cite: {
          source: 'lemo-kapitel-inflation-1923',
          loc: { section: 'Die Inflation', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/inflation-1923.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bundesarchiv_Bild_119-1426%2C_Hitler-Putsch%2C_M%C3%BCnchen%2C_Odeonsplatz.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_119-1426,_Hitler-Putsch,_M%C3%BCnchen,_Odeonsplatz.jpg',
    credit: { institution: 'Bundesarchiv' },
    license: { id: 'cc-by-sa', version: '3.0' }
  }
})
