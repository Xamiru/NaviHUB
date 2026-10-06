import { definePerson } from '../../schema'

export default definePerson({
  id: 'harry-s-truman',
  names: [
    { text: 'Harry S. Truman', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1884-05-08' },
        cites: [
          {
            source: 'lemo-biografie-harry-s-truman',
            loc: { section: 'Harry S. Truman 1884 - 1972', para: '3' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1972-12-26' },
        cites: [
          {
            source: 'lemo-biografie-harry-s-truman',
            loc: { section: 'Harry S. Truman 1884 - 1972', para: '46' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of the United States',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1945' },
            cites: [
              {
                source: 'lemo-biografie-harry-s-truman',
                loc: { section: 'Harry S. Truman 1884 - 1972', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1953' },
            cites: [
              {
                source: 'lemo-biografie-harry-s-truman',
                loc: { section: 'Harry S. Truman 1884 - 1972', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'lemo-biografie-harry-s-truman',
          loc: { section: 'Harry S. Truman 1884 - 1972', para: '1' }
        },
        {
          source: 'lemo-biografie-harry-s-truman',
          loc: { section: 'Harry S. Truman 1884 - 1972', para: '20' }
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
          text: 'Harry S. Truman ist ein US-amerikanischer Politiker der Demokratischen Partei und von 1945 bis 1953 der 33. Präsident der Vereinigten Staaten von Amerika. In seine Amtszeit fallen die Atombombenabwürfe auf Japan und der Beginn des Kalten Krieges mit der Sowjetunion.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-harry-s-truman',
            loc: { section: 'Harry S. Truman 1884 - 1972', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/harry-s-truman'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Nach dem plötzlichen Tod Präsident Roosevelts wird Truman verfassungsgemäß dessen Nachfolger.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-harry-s-truman',
            loc: { section: 'Harry S. Truman 1884 - 1972', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/harry-s-truman'
          }
        },
        {
          id: 'q3',
          text: 'August: Truman gibt den Befehl zum Abwurf der Atombomben über Hiroshima und Nagasaki in Japan.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-harry-s-truman',
            loc: { section: 'Harry S. Truman 1884 - 1972', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/harry-s-truman'
          }
        },
        {
          id: 'q4',
          text: '26. Juni: Zwei Tage nach Beginn der sowjetischen Berlin-Blockade erteilt Truman den Befehl zur Errichtung einer Luftbrücke, die der Versorgung der Berliner Bevölkerung dient und 1949 die Sowjetunion zur Aufgabe der Blockade zwingt.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-harry-s-truman',
            loc: { section: 'Harry S. Truman 1884 - 1972', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/harry-s-truman'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Harry_S._Truman_Presidential_Portrait_%283x4_cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Harry_S._Truman_Presidential_Portrait_(3x4_cropped).jpg',
    credit: { institution: 'US National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'truman-first-address-to-congress-1945',
      mediaKind: 'audio',
      title: 'Address Of Harry S. Truman At His First Official Appearance Before Congress As President, 04-16-1945',
      url: 'https://archive.org/download/TrumanFirstOfficialAppearance/Address%20of%20Harry%20S%20Truman%20at%20His%20First%20Official%20Appearance%20Before%20Congress%20as%20President,%2004-16-1945.mp3',
      page: 'https://archive.org/details/TrumanFirstOfficialAppearance',
      credit: {
        institution: 'wwIIarchive-audio collection (Internet Archive)',
        creator: 'National Broadcasting Company, Inc.'
      },
      license: { id: 'public-domain' },
      bytes: 14567259,
      date: { d: '1945-04-16' },
      durationSec: 1821
    }
  ]
})
