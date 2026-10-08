import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'marshall-plan',
  names: [
    { text: 'Marshall Plan', lang: 'en', role: 'primary' },
    {
      text: 'European Recovery Program',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '4' }
        },
        { source: 'lemo-chronik-1947', loc: { section: 'Jahreschronik 1947', para: '74' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1947-06-05' },
        cites: [
          {
            source: 'state-dept-milestones-marshall-plan',
            loc: { section: 'Marshall Plan, 1948', para: '1' }
          },
          { source: 'lemo-chronik-1947', loc: { section: 'Jahreschronik 1947', para: '73' } }
        ]
      }
    ]
  },
  regions: ['europe', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        { source: 'millercenter-truman-key-events', loc: { section: 'Key Events' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      name: 'George C. Marshall',
      role: 'organizer',
      cites: [
        {
          source: 'state-dept-milestones-marshall-plan',
          loc: { section: 'Marshall Plan, 1948', para: '1' }
        },
        { source: 'lemo-chronik-1947', loc: { section: 'Jahreschronik 1947', para: '74' } }
      ]
    },
    {
      ref: 'person:harry-s-truman',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-truman-doctrine',
          loc: { section: 'The Truman Doctrine, 1947', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:truman-doctrine',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '4' }
        }
      ]
    },
    {
      ref: 'event:berlin-blockade',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '5' }
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
          text: 'In a June 5, 1947, speech to the graduating class at Harvard University, Secretary of State George C. Marshall issued a call for a comprehensive program to rebuild Europe. Fanned by the fear of Communist expansion and the rapid deterioration of European economies in the winter of 1946–1947, Congress passed the Economic Cooperation Act in March 1948 and approved funding that would eventually rise to over $12 billion for the rebuilding of Western Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-marshall-plan',
            loc: { section: 'Marshall Plan, 1948', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/marshall-plan'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q2',
          text: 'The Marshall Plan generated a resurgence of European industrialization and brought extensive investment into the region. It was also a stimulant to the U.S. economy by establishing markets for American goods.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-marshall-plan',
            loc: { section: 'Marshall Plan, 1948', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/marshall-plan'
          }
        },
        {
          id: 'q3',
          text: 'Although the participation of the Soviet Union and East European nations was an initial possibility, Soviet concern over potential U.S. economic domination of its Eastern European satellites and Stalin’s unwillingness to open up his secret society to westerners doomed the idea.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-marshall-plan',
            loc: { section: 'Marshall Plan, 1948', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/marshall-plan'
          }
        },
        {
          id: 'q4',
          text: 'To help rebuild the country, the Soviet government obtained limited credits from Britain and Sweden but refused assistance proposed by the United States under the economic aid program known as the Marshall Plan (see Glossary).',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Reconstruction and Cold War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/12.htm' }
        },
        {
          id: 'q5',
          text: 'Economic historians have debated the precise impact of the Marshall Plan on Western Europe, but these differing opinions do not detract from the fact that the Marshall Plan has been recognized as a great humanitarian effort.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-marshall-plan',
            loc: { section: 'Marshall Plan, 1948', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/marshall-plan'
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
            value: { d: '1947-07-12' },
            cites: [
              {
                source: 'lemo-chronik-1947',
                loc: { section: 'Jahreschronik 1947', para: '94' }
              },
              { source: 'millercenter-truman-key-events', loc: { section: 'Key Events' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In July, representatives from sixteen European nations attended a conference in Paris, France, to draw up a proposal for U.S. aid. The Soviets had sent a delegation to an initial meeting, but it soon departed under orders from Moscow.',
        lang: 'en',
        cite: { source: 'millercenter-truman-key-events', loc: { section: 'Key Events' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://millercenter.org/president/truman/key-events'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1948-04-16' },
            cites: [
              {
                source: 'lemo-chronik-1948',
                loc: { section: 'Jahreschronik 1948', para: '50' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: '16 Mitgliedsstaaten des Rates für Wirtschaftliche Zusammenarbeit in Europa einigen sich auf die Inanspruchnahme der Wiederaufbauhilfe durch den Marshallplan und gründen die "Organization for European Economic Cooperation" (OEEC).',
        lang: 'de',
        cite: { source: 'lemo-chronik-1948', loc: { section: 'Jahreschronik 1948', para: '51' } },
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
            value: { d: '1949-01-25' },
            cites: [
              {
                source: 'lemo-chronik-1949',
                loc: { section: 'Jahreschronik 1949', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Gründung des osteuropäischen Rats für gegenseitige Wirtschaftshilfe (RGW/COMECON) als Reaktion auf die Einrichtung der "Organization for European Economic Cooperation" (OEEC) und des European Recovery Program (Marshallplan).',
        lang: 'de',
        cite: { source: 'lemo-chronik-1949', loc: { section: 'Jahreschronik 1949', para: '11' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.hdg.de/lemo/jahreschronik/1949.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Harry_S._Truman_Presidential_Portrait_%283x4_cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Harry_S._Truman_Presidential_Portrait_(3x4_cropped).jpg',
    credit: { institution: 'US National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'bossuat-1992-la-france-laide-americaine', perspective: 'european' }
  ]
})
