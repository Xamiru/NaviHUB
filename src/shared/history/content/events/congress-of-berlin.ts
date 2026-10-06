import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'congress-of-berlin',
  names: [
    { text: 'Congress of Berlin', lang: 'en', role: 'primary' },
    { text: 'Berliner Kongress', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1878-06-13' },
        cites: [
          { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '42' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1878-07-13' },
        cites: [
          { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '42' } }
        ]
      }
    ]
  },
  regions: ['europe', 'mena', 'russia-central-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '43' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:benjamin-disraeli',
      role: 'negotiator',
      cites: [
        {
          source: 'hansard-lords-1878-07-18-congress-of-berlin',
          loc: { section: 'HL Deb 18 July 1878 vol 241 cc1753-843', para: '2' }
        }
      ]
    },
    {
      name: 'the Marquess of Salisbury',
      role: 'negotiator',
      cites: [
        {
          source: 'hansard-lords-1878-07-18-congress-of-berlin',
          loc: { section: 'HL Deb 18 July 1878 vol 241 cc1753-843', para: '15' }
        }
      ]
    },
    {
      name: 'Mehemet Ali Pasha',
      role: 'negotiator',
      cites: [
        {
          source: 'hansard-lords-1878-07-18-congress-of-berlin',
          loc: { section: 'HL Deb 18 July 1878 vol 241 cc1753-843', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:russo-turkish-war-1877-1878',
      rel: 'response-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '7' }
        }
      ]
    },
    {
      ref: 'event:second-anglo-afghan-war',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Second Anglo-Afghan War', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'But Britain and Austria-Hungary, believing that the new state would extend Russian influence too far into the Balkans, exerted strong diplomatic pressure that reshaped the Treaty of San Stefano four months later into the Treaty of Berlin.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Refusing to accept the dominant position of Russia in the Balkans, the other European powers called the Congress of Berlin in 1878. At this conclave, the Europeans agreed to a much smaller autonomous Bulgarian state under nominal Ottoman suzerainty. Serbia and Romania were recognized as fully independent states, and the Ottoman provinces of Bosnia and Herzegovina were placed under Austrian administration. Cyprus, although remaining technically part of the Ottoman Empire, became a British protectorate.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q3',
          text: 'For all its wartime exertions, Russia received only minor territorial concessions in Bessarabia and the Caucasus.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q4',
          text: 'Auf dem Berliner Kongress werden die Friedensregelungen von San Stefano, die den achten Russisch-türkischen Krieg (1877/78) beendet hatten, revidiert.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '43' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1878.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The new Bulgaria would be about onethird the size of that prescribed by the Treaty of San Stefano; Macedonia and Thrace, south of the Balkans, would revert to complete Ottoman control. The province of Eastern Rumelia would remain under Turkish rule, but with a Christian governor.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        },
        {
          id: 'q6',
          text: 'After tension between Russia and Britain in Europe ended with the June 1878 Congress of Berlin, Russia turned its attention to Central Asia.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
        },
        {
          id: 'q7',
          text: 'In Reaktion auf die russische Verstimmung bezüglich der Ergebnisse des Berliner Kongresses schließen sich Österreich-Ungarn und Deutschland in Wien zum Zweibund zusammen, einem geheimen Verteidigungsbündnis gegen Russland, das bis 1918 bestand hat.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1879', loc: { section: 'Chronik 1879', para: '51' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1879.html'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q8',
          text: '(Bulgarians still celebrate the signing of the Treaty of San Stefano rather than the Treaty of Berlin as their national independence day.)',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '25' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/BASA-600K-1-1866-10-Der_Berliner_Congress%2C_1878.jpeg/1280px-BASA-600K-1-1866-10-Der_Berliner_Congress%2C_1878.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:BASA-600K-1-1866-10-Der_Berliner_Congress,_1878.jpeg',
    credit: { institution: 'Bulgarian Archives State Agency', creator: 'Anton von Werner' },
    license: { id: 'public-domain' }
  }
})
