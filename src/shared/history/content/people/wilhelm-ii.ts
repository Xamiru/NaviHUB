import { definePerson } from '../../schema'

export default definePerson({
  id: 'wilhelm-ii',
  names: [
    { text: 'Wilhelm II', lang: 'en', role: 'primary' },
    { text: 'Wilhelm II.', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1859-01-27' },
        cites: [
          {
            source: 'lemo-biografie-wilhelm-ii',
            loc: { section: 'Wilhelm II. 1859-1941', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1941-06-04' },
        cites: [
          {
            source: 'lemo-biografie-wilhelm-ii',
            loc: { section: 'Wilhelm II. 1859-1941', para: '52' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Deutscher Kaiser und König von Preußen',
      lang: 'de',
      start: {
        alts: [
          {
            value: { d: '1888-06-15' },
            cites: [
              {
                source: 'lemo-biografie-wilhelm-ii',
                loc: { section: 'Wilhelm II. 1859-1941', para: '11' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1918-11-28' },
            cites: [
              {
                source: 'lemo-biografie-wilhelm-ii',
                loc: { section: 'Wilhelm II. 1859-1941', para: '38' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'lemo-biografie-wilhelm-ii',
          loc: { section: 'Wilhelm II. 1859-1941', para: '11' }
        },
        {
          source: 'lemo-biografie-wilhelm-ii',
          loc: { section: 'Wilhelm II. 1859-1941', para: '38' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Durch den Tod des Vaters, Kaiser Friedrichs III., wird der Kronprinz als Wilhelm II. Deutscher Kaiser und König von Preußen.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-ii',
            loc: { section: 'Wilhelm II. 1859-1941', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/wilhelm-ii' }
        },
        {
          id: 'q2',
          text: 'Beginn des Schlachtflottenbaus unter dem Staatssekretär im Reichsmarineamt Alfred von Tirpitz.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-ii',
            loc: { section: 'Wilhelm II. 1859-1941', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/wilhelm-ii' }
        },
        {
          id: 'q3',
          text: 'Foreign policy in the Wilhelmine Era (1890-1914) turned away from Bismarck\'s cautious diplomacy of the 1871-90 period. It was also marked by a shrill aggressiveness.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Foreign Policy in the Wilhelmine Era', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/33.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'Wilhelm II. flieht aus dem Hauptquartier in Spa in die Niederlande.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-ii',
            loc: { section: 'Wilhelm II. 1859-1941', para: '36' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/wilhelm-ii' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Kaiser_Wilhelm_II_of_Germany_-_1902.jpg/1280px-Kaiser_Wilhelm_II_of_Germany_-_1902.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kaiser_Wilhelm_II_of_Germany_-_1902.jpg',
    credit: { institution: 'Imperial War Museums', creator: 'Studio of Thomas Heinrich Voigt' },
    license: { id: 'public-domain' }
  }
})
