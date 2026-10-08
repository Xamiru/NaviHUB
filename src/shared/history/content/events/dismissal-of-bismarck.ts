import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'dismissal-of-bismarck',
  names: [
    { text: 'Dismissal of Bismarck', lang: 'en', role: 'primary' },
    { text: 'Entlassung Bismarcks', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
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
  polities: [
    { ref: 'polity:german-empire' }
  ],
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
          id: 'q9',
          text: 'The final division took place on the 25th of February 1890. An amendment had been carried omitting this clause, and the National Liberals therefore voted for the bill in its amended form. The Conservatives were ready to vote as the government wished; if Bismarck was content with the amended bill, they would vote for it, and it would be carried; no instructions were sent to the party; they therefore voted against the bill, and it was lost. The House was immediately dissolved.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-germany-history',
            loc: { section: 'GERMANY: History', para: '362' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
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
          id: 'q10',
          text: 'A few days after the election Bismarck was dismissed from office. The difference of opinion between him and the emperor was not confined to social reform; beyond this was the more serious question as to whether the chancellor or the emperor was to direct the course of the government.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-germany-history',
            loc: { section: 'GERMANY: History', para: '362' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
          }
        },
        {
          id: 'q11',
          text: 'Bismarck’s successor, General von Caprivi, held a similar combination of offices, but the chief control passed now into the hands of the emperor himself.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-germany-history',
            loc: { section: 'GERMANY: History', para: '363' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
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
          id: 'q12',
          text: 'The treaty lapsed in 1890, and owing to Bismarck’s dismissal was not renewed. Caprivi refused to renew it because it was doubtful whether by increasing the number of treaties the value of them was not diminished.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-germany-history',
            loc: { section: 'GERMANY: History', para: '359' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
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
        id: 'q13',
        text: 'The emperor, who, as Bismarck said, intended to be his own chancellor, required Bismarck to draw up a decree reversing a cabinet order of Frederick William IV., which gave the Prussian minister-president the right of being the sole means of communication between the other ministers and the king. This Bismarck refused to do, and he was therefore ordered to send in his resignation.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '362' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
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
  },
  furtherReading: [
    { source: 'gall-1995-bismarck', perspective: 'european' }
  ]
})
