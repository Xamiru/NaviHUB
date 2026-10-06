import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'greco-turkish-war-1897',
  names: [
    { text: 'Greco-Turkish War of 1897', lang: 'en', role: 'primary' },
    {
      text: 'türkisch-griechischer Krieg',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '6' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1897-04-07' },
        cites: [
          { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '6' } },
          { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '-1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1897-12-04' },
        cites: [
          { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '52' } }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 3,
  places: [
    {
      ref: 'place:istanbul',
      cites: [
        { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '53' } }
      ]
    }
  ],
  sides: [
    {
      key: 'ottoman',
      name: 'Ottoman Empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '11' }
        }
      ]
    },
    {
      key: 'greece',
      name: 'Greece',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '11' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:hamidian-massacres', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Im Zuge eines erneuten Aufstands gegen die osmanische Herrschaft auf der Insel Kreta landen griechische Truppen bei Platania im Nordwesten der Insel und versuchen die Insel zu annektieren.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1897.html'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Outside support for a rebellion on Crete also caused the Porte to declare war on Greece in 1897.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q3',
          text: 'Although the Ottoman army defeated the Greeks decisively in Thrace, the European powers forced a compromise peace that kept Crete under Ottoman suzerainty while installing the son of the Greek king as its governor.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Griechenland verpflichtet sich zur Zahlung einer Kriegsentschädigung in Höhe von 4 Millionen Osmanischen Pfund, das Osmanische Reich räumt Thessalien.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '53' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1897.html'
          }
        },
        {
          id: 'q5',
          text: 'Die Insel Kreta erhält 1898 den Status einer autonomen osmanischen Provinz.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '53' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1897.html'
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
            value: { d: '1897-04-07' },
            cites: [
              { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '6' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Nach der Weigerung Griechenlands, einem Ultimatum zur Räumung der Insel nachzugeben, beginnt am 7. April der türkisch-griechische Krieg.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1897.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1897-12-04' },
            cites: [
              { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '52' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Nach der griechischen Niederlage im Krieg gegen das Osmanische Reich unterzeichnen beide Parteien in Konstantinopel einen Friedensvertrag, der den im April begonnenen türkisch-griechischen Krieg beendet.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '53' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1897.html'
        }
      }
    }
  ]
})
