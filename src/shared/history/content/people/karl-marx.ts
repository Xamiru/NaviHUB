import { definePerson } from '../../schema'

export default definePerson({
  id: 'karl-marx',
  names: [
    { text: 'Karl Marx', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1818-05-05' },
        cites: [
          {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '2' }
          },
          {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1883-03-14' },
        cites: [
          {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '81' }
          },
          {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '80' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:london',
    cites: [
      {
        source: 'lemo-biografie-karl-marx',
        loc: { section: 'Karl Marx 1818-1883', para: '81' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['scholar', 'journalist', 'revolutionary'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Fortan bilden Klassenverhältnisse und politische Ökonomie die zentralen Elemente in Marxʼ Theorie.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '30' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/karl-marx' }
        },
        {
          id: 'q2',
          text: 'Während der Revolutionsjahre nach Köln zurückgekehrt, gibt er dort die "Neue Rheinische Zeitung" heraus, die dem linken Flügel der Demokraten nahe steht und in der er eine einheitliche deutsche Republik und den gemeinsamen Kampf der deutschen Staaten gegen das reaktionäre Russland fordert.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '37' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/karl-marx' }
        },
        {
          id: 'q3',
          text: '24. August: Ankunft in London, wo er bis zu seinem Tod seinen Wohnsitz behält.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '40' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/karl-marx' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: '14. März: Karl Marx stirbt in London.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '81' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/karl-marx' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/1280px-Karl_Marx_001.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Karl_Marx_001.jpg',
    credit: {
      institution: 'International Institute of Social History',
      creator: 'John Jabez Edwin Mayall'
    },
    license: { id: 'public-domain' }
  }
})
