import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'triple-alliance-1882',
  names: [
    { text: 'Triple Alliance', lang: 'en', role: 'primary' },
    {
      text: 'Dreibund',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '32' } }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1882-05-20' },
        cites: [
          { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '31' } },
          { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '32' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:vienna',
      cites: [
        { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '32' } }
      ]
    }
  ],
  sides: [
    {
      key: 'germany',
      name: 'Germany',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Eastern Question', para: '3' }
        }
      ]
    },
    {
      key: 'italy',
      name: 'Italy',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Eastern Question', para: '3' }
        }
      ]
    },
    {
      key: 'austria-hungary',
      name: 'Austria-Hungary',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Eastern Question', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:otto-von-bismarck',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Bismarck\'s Foreign Policy', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'With relations strained between Russia and Germany, Austria-Hungary exploited Germany\'s need to strengthen its position against France and obtained an anti-Russian alliance. Under the resulting Dual Alliance, Austria-Hungary and Germany pledged to help defend the other against an attack by Russia. In the event of war between Germany and France, however, Austria-Hungary promised nothing more than neutrality unless Russia were also involved. As favorable as the Dual Alliance appeared, it drew Austria-Hungary into Otto von Bismarck\'s web of alliances and diplomatic maneuverings. Austria-Hungary thus became party to conflicts with France and Britain, countries with which it had no directly conflicting interests. The Triple Alliance signed by Germany, Italy, and Austria-Hungary in 1882, for example, mainly protected Italian and German interests against France and did nothing to resolve outstanding issues between Austria-Hungary and Italy.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Eastern Question', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/austria/28.htm' }
        },
        {
          id: 'q1',
          text: 'In Wien wird zwischen Deutschland, Österreich-Ungarn und Italien ein Dreibund geschlossen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '32' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1882.html'
          }
        },
        {
          id: 'q2',
          text: 'Das geheime Verteidigungsabkommen richtet sich primär gegen Frankreich.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '32' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1882.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Bismarck arranged an alliance with Austria-Hungary in 1879 and one with Italy in 1882.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck\'s Foreign Policy', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/32.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'His triumph, however, was a secret alliance he formed by means of the Reinsurance Treaty with Russia in 1887, although its terms violated the spirit of the treaty with Austria-Hungary.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck\'s Foreign Policy', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/32.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/BASA-600K-1-1866-9-Otto_von_Bismarck%2C_Versailles.jpeg/1280px-BASA-600K-1-1866-9-Otto_von_Bismarck%2C_Versailles.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:BASA-600K-1-1866-9-Otto_von_Bismarck,_Versailles.jpeg',
    credit: { institution: 'Bulgarian Archives State Agency', creator: 'Anton von Werner' },
    license: { id: 'public-domain' }
  }
})
