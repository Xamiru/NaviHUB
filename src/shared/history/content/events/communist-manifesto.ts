import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'communist-manifesto',
  names: [
    { text: 'Publication of the Communist Manifesto', lang: 'en', role: 'primary' },
    { text: 'Manifest der Kommunistischen Partei', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-07',
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
          id: 'q6',
          text: 'The Manifesto was published as the platform of the Communist League, a working men’ s association, first exclusively German, later on international, and under the political conditions of the Continent before 1848, unavoidably a secret society. At a Congress of the League, held in November 1847, Marx and Engels were commissioned to prepare a complete theoretical and practical party programme.',
          lang: 'en',
          cite: {
            source: 'engels-1888-preface-communist-manifesto',
            loc: { section: 'The 1888 English Edition', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.marxists.org/archive/marx/works/1848/communist-manifesto/preface.htm'
          }
        },
        {
          id: 'q7',
          text: 'Drawn up in German, in January 1848, the manuscript was sent to the printer in London a few weeks before the French Revolution of February 24.',
          lang: 'en',
          cite: {
            source: 'engels-1888-preface-communist-manifesto',
            loc: { section: 'The 1888 English Edition', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.marxists.org/archive/marx/works/1848/communist-manifesto/preface.htm'
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
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Manifest_der_kommunistischen_Partei_%28Marx%29_001.jpg/1280px-Manifest_der_kommunistischen_Partei_%28Marx%29_001.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Manifest_der_kommunistischen_Partei_(Marx)_001.jpg',
    credit: { institution: 'Gale, The Making of the Modern World' },
    license: { id: 'public-domain' }
  }
})
