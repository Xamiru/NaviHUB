import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'berlin-blockade',
  names: [
    { text: 'Berlin Blockade', lang: 'en', role: 'primary' },
    {
      text: 'Berlin Airlift',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '0' }
        }
      ]
    },
    {
      text: 'Berlin-Blockade',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1949', loc: { section: 'Jahreschronik 1949', para: '47' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1948-06-24' },
        cites: [
          {
            source: 'state-dept-milestones-berlin-airlift',
            loc: { section: 'The Berlin Airlift, 1948–1949', para: '1' }
          },
          { source: 'lemo-chronik-1948', loc: { section: 'Jahreschronik 1948', para: '80' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1949-05-12' },
        cites: [
          {
            source: 'state-dept-milestones-berlin-airlift',
            loc: { section: 'The Berlin Airlift, 1948–1949', para: '1' }
          },
          { source: 'lemo-chronik-1949', loc: { section: 'Jahreschronik 1949', para: '46' } }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'west',
      name: 'Western Allies',
      cites: [
        {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '1' }
        }
      ]
    },
    {
      key: 'soviet',
      name: 'Soviet Union',
      cites: [
        {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:harry-s-truman',
      role: 'head-of-state',
      side: 'west',
      cites: [
        {
          source: 'lemo-biografie-harry-s-truman',
          loc: { section: 'Harry S. Truman 1884 - 1972', para: '26' }
        }
      ]
    },
    {
      ref: 'person:joseph-stalin',
      role: 'head-of-government',
      side: 'soviet',
      cites: [
        {
          source: 'state-dept-milestones-nato',
          loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '4' }
        }
      ]
    },
    {
      name: 'Lucius Clay',
      role: 'commander',
      side: 'west',
      cites: [
        {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-nato',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-nato',
          loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '4' }
        }
      ]
    },
    { ref: 'event:marshall-plan', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The crisis started on June 24, 1948, when Soviet forces blockaded rail, road, and water access to Allied-controlled areas of Berlin. The United States and United Kingdom responded by airlifting food and fuel to Berlin from Allied airbases in western Germany. The crisis ended on May 12, 1949, when Soviet forces lifted the blockade on land access to western Berlin.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-airlift',
            loc: { section: 'The Berlin Airlift, 1948–1949', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/berlin-airlift'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'In June, without informing the Soviets, U.S. and British policymakers introduced the new Deutschmark to Bizonia and West Berlin. The purpose of the currency reform was to wrest economic control of the city from the Soviets, enable the introduction of Marshall Plan aid, and curb the city’s black market.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-airlift',
            loc: { section: 'The Berlin Airlift, 1948–1949', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/berlin-airlift'
          }
        },
        {
          id: 'q3',
          text: 'Die Sowjetische Militäradministration in Deutschland (SMAD) beginnt die Großblockade der Berliner Westsektoren zu Lande und zu Wasser als Reaktion auf den gescheiterten Versuch, ihre Währungsreform auf Gesamtberlin auszudehnen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1948', loc: { section: 'Jahreschronik 1948', para: '81' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.hdg.de/lemo/jahreschronik/1948.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'We are convinced that our remaining in Berlin is essential to our prestige in Germany and in Europe. Whether for good or bad, it has become a symbol of the American intent.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-airlift',
            loc: { section: 'The Berlin Airlift, 1948–1949', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/berlin-airlift'
          }
        },
        {
          id: 'q5',
          text: 'Fearing that the Western Allies might halt the airlift and cede West Berlin to the Soviets, 300,000 West Berliners gathered at the Reichstag to show their opposition to Soviet domination.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-airlift',
            loc: { section: 'The Berlin Airlift, 1948–1949', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/berlin-airlift'
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
            value: { d: '1948-04-01' },
            cites: [
              {
                source: 'lemo-chronik-1948',
                loc: { section: 'Jahreschronik 1948', para: '42' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Beginn der "kleinen" Berlin-Blockade: Die sowjetische Besatzungsmacht verhindert westalliierte Militärtransporte nach Berlin. Später werden auch zivile Personen und Güter nicht mehr durchgelassen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1948', loc: { section: 'Jahreschronik 1948', para: '43' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.hdg.de/lemo/jahreschronik/1948.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1948-06-26' },
            cites: [
              {
                source: 'state-dept-milestones-berlin-airlift',
                loc: { section: 'The Berlin Airlift, 1948–1949', para: '7' }
              },
              {
                source: 'lemo-chronik-1948',
                loc: { section: 'Jahreschronik 1948', para: '82' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The United States launched “Operation Vittles” on June 26, with the United Kingdom following suit two days later with “Operation Plainfare.”',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1945-1952/berlin-airlift'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1949-09-30' },
            cites: [
              {
                source: 'lemo-chronik-1949',
                loc: { section: 'Jahreschronik 1949', para: '130' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Die Alliierten stellen nach über 277.000 Hilfsflügen die Luftbrücke nach West-Berlin ein.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1949', loc: { section: 'Jahreschronik 1949', para: '131' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.hdg.de/lemo/jahreschronik/1949.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/92/C-54_landing_at_Tempelhof.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:C-54_landing_at_Tempelhof.jpg',
    credit: { institution: 'Library of Congress', creator: 'Henry Ries' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'clay-speaks-berlin-airlift-1948',
      mediaKind: 'video',
      title: 'Clay speaks on Berlin Airlift,1948/10/21',
      url: 'https://archive.org/download/1948-10-21_Clay_speaks_on_Berlin_Airlift/1948-10-21_Clay_speaks_on_Berlin_Airlift.mp4',
      page: 'https://archive.org/details/1948-10-21_Clay_speaks_on_Berlin_Airlift',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 10680246,
      date: { d: '1948-10-21' },
      durationSec: 110
    }
  ]
})
