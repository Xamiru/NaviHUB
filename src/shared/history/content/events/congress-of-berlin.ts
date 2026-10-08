import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'congress-of-berlin',
  names: [
    { text: 'Congress of Berlin', lang: 'en', role: 'primary' },
    { text: 'Berliner Kongress', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
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
  polities: [
    { ref: 'polity:german-empire' },
    { ref: 'polity:austria-hungary' },
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:french-third-republic' },
    { ref: 'polity:kingdom-of-italy' },
    { ref: 'polity:ottoman-empire' },
    { ref: 'polity:russian-empire' }
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
          id: 'q9',
          text: 'When Britain threatened to declare war over the terms of the Treaty of San Stefano, an exhausted Russia backed down. At the Congress of Berlin in July 1878, Russia agreed to the creation of a smaller Bulgaria.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
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
        },
        {
          id: 'q11',
          text: 'At this high point of its influence on Balkan affairs, Russia dictated the Treaty of San Stefano in March 1878.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/bulgaria/10.htm' }
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
          id: 'q10',
          text: 'With relations strained between Russia and Germany, Austria-Hungary exploited Germany\'s need to strengthen its position against France and obtained an anti-Russian alliance. Under the resulting Dual Alliance, Austria-Hungary and Germany pledged to help defend the other against an attack by Russia.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Eastern Question', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/austria/28.htm' }
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
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1878-07' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Whereas the Treaty of San Stefano called for two years of Russian occupation of Bulgaria, the Treaty of Berlin reduced the time to nine months.',
        lang: 'en',
        cite: {
          source: 'loc-bulgaria-country-study-1992',
          loc: { section: 'BULGARIAN INDEPENDENCE', para: '24' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/bulgaria/10.htm' }
      }
    }
  ],
  furtherReading: [
    { source: 'kurat-1970-turkiye-ve-rusya', perspective: 'turkish' },
    { source: 'uzuncarsili-1947-osmanli-tarihi', perspective: 'turkish' }
  ]
})
