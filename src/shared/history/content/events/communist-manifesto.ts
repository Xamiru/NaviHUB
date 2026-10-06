import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'communist-manifesto',
  names: [
    { text: 'Publication of the Communist Manifesto', lang: 'en', role: 'primary' },
    { text: 'Manifest der Kommunistischen Partei', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1848-02' },
        cites: [
          { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '9' } },
          {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '35' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:london',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '9' } },
        {
          source: 'lemo-biografie-karl-marx',
          loc: { section: 'Karl Marx 1818-1883', para: '35' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:karl-marx',
      role: 'ideologue',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '9' } }
      ]
    },
    {
      name: 'Friedrich Engels',
      role: 'ideologue',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '9' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Februar: In London wird das von Marx und Engels gemeinsam verfasste "Manifest der Kommunistischen Partei" veröffentlicht, das mit den Worten "Ein Gespenst geht um in Europa - das Gespenst des Kommunismus" beginnt und mit dem Aufruf "Proletarier aller Länder vereinigt euch!" schließt.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '35' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/karl-marx' }
        },
        {
          id: 'q2',
          text: 'Ende Februar veröffentlichen Karl Marx und Friedrich Engels das „Manifest der kommunistischen Partei“ in London.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Im Sommer unternehmen Marx und Engels eine Studienreise nach England, wo sie Kontakt zum "Bund der Gerechten" knüpfen, Industriebezirke besuchen und die Schriften verschiedener Nationalökonomen lesen.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '30' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/karl-marx' }
        },
        {
          id: 'q4',
          text: 'Marx und Engels erhalten von dem mittlerweile in "Bund der Kommunisten" umbenannten "Bund der Gerechten" den Auftrag, eine programmatische Schrift für die Reorganisation des Bundes zu verfassen.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '32' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/karl-marx' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'Bis heute sind rund 1.200 Nachdrucke in nahezu allen Schriftsprachen der Welt erschienen.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '35' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/karl-marx' }
        }
      ]
    }
  ]
})
