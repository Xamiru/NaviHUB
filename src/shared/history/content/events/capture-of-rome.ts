import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'capture-of-rome',
  names: [
    { text: 'Capture of Rome', lang: 'en', role: 'primary' },
    { text: 'Presa di Roma', lang: 'it', role: 'native' },
    {
      text: 'Besetzung Roms',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '42' } }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1870-09-20' },
        cites: [
          { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '41' } },
          { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '7' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:rome',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '42' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Pius IX',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '38' } }
      ]
    },
    {
      name: 'Viktor Emanuel II',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '45' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:franco-prussian-war',
      rel: 'related',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '33' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Die seit 1849 zum Schutz des Kirchenstaates in Rom stationierten französischen Truppen werden abgezogen, um die Armee im Krieg gegen Deutschland zu verstärken.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '33' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q7',
          text: 'Italy incorporated Venetia and the former Papal States (including Rome) by 1871 following the Franco-Prussian War (1870-71).',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-italy',
            loc: {
              section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://history.state.gov/countries/italy' }
        },
        {
          id: 'q2',
          text: 'Besetzung Roms durch italienische Truppen. Die weltliche Herrschaft des Papstes in Rom ist damit beendet.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '42' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Die Garantiegesetze des neuen italienischen Staates sichern dem Papst Souveränität und eine Jahresrente sowie die uneingeschränkte Herrschaft über die apostolischen Paläste Vatikan, Lateran und Castel Gandolfo zu. Papst Pius IX. (1792-1878) akzeptiert dies jedoch nicht - wie alle seine Nachfolger bis zu den Lateranverträgen von 1929.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '38' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
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
            value: { d: '1870-10-02' },
            cites: [
              { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '46' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'Bei einer Volksabstimmung im Kirchenstaat sprechen sich 167.000 Stimmberechtigte für die Eingliederung des Kirchenstaats in das Königreich Italien aus; nur 1.507 stimmen dagegen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '47' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-01-26' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '6' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Das italienische Parlament beschließt nach der Eroberung des Kirchenstaates durch italienische Truppen am 20. September 1870 die Verlegung der Hauptstadt und des Regierungssitzes von Florenz nach Rom.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-06-02' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '44' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'König Viktor Emanuel II. (1820-1878) zieht feierlich in die neue italienische Hauptstadt Rom ein.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '45' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/La_Breccia_di_Porta_Pia_%E2%80%93_20_settembre_1870.jpg/1280px-La_Breccia_di_Porta_Pia_%E2%80%93_20_settembre_1870.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:La_Breccia_di_Porta_Pia_%E2%80%93_20_settembre_1870.jpg',
    credit: { creator: 'Edoardo Matania' },
    license: { id: 'public-domain' }
  }
})
