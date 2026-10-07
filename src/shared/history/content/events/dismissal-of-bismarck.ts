import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'dismissal-of-bismarck',
  names: [
    { text: 'Dismissal of Bismarck', lang: 'en', role: 'primary' },
    { text: 'Entlassung Bismarcks', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1890-03-20' },
        cites: [
          { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '22' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  participants: [
    {
      ref: 'person:otto-von-bismarck',
      role: 'head-of-government',
      cites: [
        { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '23' } }
      ]
    },
    {
      ref: 'person:wilhelm-ii',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '21' } }
      ]
    },
    {
      name: 'Leo von Caprivi',
      role: 'head-of-government',
      cites: [
        { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '23' } }
      ]
    }
  ],
  related: [
    { ref: 'period:wilhelmine-era', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Januar: Reichskanzler Otto von Bismarck scheitert im Reichstag mit seinem Wunsch, das gegen die Sozialdemokratie und die Arbeiterbewegung gerichtete Sozialistengesetz auf unbestimmte Zeit zu verlängern. Er löst daraufhin den Reichstag auf.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1890.html'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q8',
          text: 'When Kaiser Wilhelm II dismissed Bismarck in 1890, the loose Russo-Prussian entente collapsed after having lasted for more than twenty-five years.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q2',
          text: 'Entlassung Bismarcks als Reichskanzler und preußischer Ministerpräsident.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '23' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1890.html'
          }
        },
        {
          id: 'q3',
          text: 'Er erhält den Titel eines Herzogs von Lauenburg. Zum Nachfolger in beiden Ämtern ernennt der Kaiser General Leo von Caprivi.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '23' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1890.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Bismarck\'s antisocialist campaign, which continued until his dismissal in 1890 by Wilhelm II, severely restricted the activities of the SPD.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Political Parties', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/29.htm' }
        },
        {
          id: 'q5',
          text: 'Die neue deutsche Regierung lehnt die von russischer Seite gewünschte Verlängerung des 1887 von Bismarck ausgehandelten Rückversicherungsvertrags mit Russland ab. Die Regierung kehrt damit bewusst von Bismarcks Bündnissystem ab.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '25' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1890.html'
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
            value: { d: '1890-03-15' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '109' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Deutsches Historisches Museum' }
            ]
          },
          {
            value: { d: '1890-03-17' },
            cites: [
              { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '20' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Deutsches Historisches Museum' }
            ]
          },
          {
            value: { d: '1890-03-18' },
            cites: [
              {
                source: 'lemo-biografie-wilhelm-ii',
                loc: { section: 'Wilhelm II. 1859-1941', para: '13' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Deutsches Historisches Museum' }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Wilhelm II. fordert Bismarck zum Rücktritt auf.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '21' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1890.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1890-03-18' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '110' }
              },
              { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '21' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Deutsches Historisches Museum' }
            ]
          },
          {
            value: { d: '1890-03-19' },
            cites: [
              {
                source: 'lemo-biografie-wilhelm-ii',
                loc: { section: 'Wilhelm II. 1859-1941', para: '13' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Deutsches Historisches Museum' }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Bismarck reicht sein Abschiedsgesuch ein, das so geschickt formuliert ist, dass dem Kaiser die ganze Verantwortung für das Zerwürfnis zufällt.',
        lang: 'de',
        cite: {
          source: 'lemo-biografie-otto-von-bismarck',
          loc: { section: 'Otto von Bismarck 1815-1898', para: '110' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/biografie/otto-von-bismarck'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Dropping_the_Pilot.jpg/1280px-Dropping_the_Pilot.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Dropping_the_Pilot.jpg',
    credit: { creator: 'John Tenniel' },
    license: { id: 'public-domain' }
  }
})
