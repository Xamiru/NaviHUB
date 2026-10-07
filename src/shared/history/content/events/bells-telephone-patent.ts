import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bells-telephone-patent',
  names: [
    { text: 'Bell’s telephone patent', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'invention',
  start: {
    alts: [
      {
        value: { d: '1876-03-07' },
        cites: [
          { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '17' } }
        ]
      }
    ]
  },
  regions: ['north-america', 'global'],
  prominence: 3,
  participants: [
    {
      name: 'Alexander Graham Bell',
      role: 'participant',
      cites: [
        { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '18' } }
      ]
    },
    {
      name: 'Heinrich von Stephan',
      role: 'organizer',
      cites: [
        { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '51' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'On March 7, 1876, Alexander Graham Bell successfully received a patent for the telephone and secured the rights to the discovery.',
          lang: 'en',
          cite: {
            source: 'loc-guide-invention-of-the-telephone',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://guides.loc.gov/chronicling-america-telephone-invention'
          }
        },
        {
          id: 'q1',
          text: 'Alexander Graham Bell (1847-1922) erhält das Patent auf den ersten für den praktischen Telefonverkehr brauchbaren Fernsprechapparat.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '18' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1876.html'
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
            value: { d: '1877-10-26' },
            cites: [
              { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '50' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q2',
        text: 'Auf Initiative des deutschen Generalpostmeisters Heinrich von Stephan (1831-1897) wird mit dem von Alexander Graham Bell (1847-1922) entwickelten Telefon die erste Telefonverbindung Deutschlands (und zugleich Europas) in Berlin für Versuchszwecke in Betrieb genommen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '51' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1877.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1877-11-12' },
            cites: [
              { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '53' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'In Friedrichsberg bei Berlin wird das erste deutsche Telegraphenamt mit Fernsprechbetrieb eingerichtet.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '54' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1877.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Patent_Drawing_of_Telegraphy_by_Alexander_Graham_Bell_-_NARA_-_6120306_%28page_1%29.jpg/1280px-Patent_Drawing_of_Telegraphy_by_Alexander_Graham_Bell_-_NARA_-_6120306_%28page_1%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Patent_Drawing_of_Telegraphy_by_Alexander_Graham_Bell_-_NARA_-_6120306_(page_1).jpg',
    credit: { institution: 'National Archives and Records Administration' },
    license: { id: 'public-domain' }
  }
})
