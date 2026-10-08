import { definePolity } from '../../schema'

export default definePolity({
  id: 'federal-republic-of-germany',
  names: [
    { text: 'Federal Republic of Germany', lang: 'en', role: 'primary' },
    { text: 'Bundesrepublik Deutschland', lang: 'de', role: 'native' },
    {
      text: 'West Germany',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Federal Republic of Germany', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1949-05-23' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Federal Republic of Germany', para: '5' }
          },
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Introduction', para: '2' }
          }
        ]
      },
      {
        value: { d: '1949-09-21' },
        cites: [
          {
            source: 'state-dept-countries-german-democratic-republic',
            loc: { section: 'East Germany (German Democratic Republic): Summary', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:bonn',
      start: {
        alts: [
          {
            value: { d: '1949' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'The German Democratic Republic', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The German Democratic Republic', para: '3' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 260, from: 1949.39 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Bundesarchiv_B_145_Bild-F002450-0005%2C_Bonn%2C_Bundestag%2C_Pariser_Vertr%C3%A4ge%2C_Adenauer.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_B_145_Bild-F002450-0005,_Bonn,_Bundestag,_Pariser_Vertr%C3%A4ge,_Adenauer.jpg',
    credit: { institution: 'Bundesarchiv', creator: 'Rolf Unterberg' },
    license: {
      id: 'cc-by-sa',
      version: '3.0 de',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The three Western occupation zones became the Federal Republic of Germany (FRG, or West Germany), and the Soviet zone became the German Democratic Republic (GDR, or East Germany).',
          lang: 'en',
          cite: { source: 'loc-germany-country-study-1995', loc: { section: 'History', para: '14' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/3.htm' }
        },
        {
          id: 'q2',
          text: 'The name Federal Republic of Germany refers to West Germany from its founding on May 23, 1949, until German unification on October 3, 1990. After this date, it refers to united Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Introduction', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/2.htm' }
        },
        {
          id: 'q3',
          text: 'In West Germany, by the early 1950s a system of parliamentary democracy with free and contending political parties was firmly established.',
          lang: 'en',
          cite: { source: 'loc-germany-country-study-1995', loc: { section: 'History', para: '16' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/3.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'After approval by the Western military governors, the Basic Law was promulgated on May 23, 1949. A new state, the Federal Republic of Germany (FRG, or West Germany), had come into existence',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Federal Republic of Germany', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/48.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'On October 3, 1990, the GDR ceased to exist, and its territory and people were joined to the FRG.',
          lang: 'en',
          cite: { source: 'loc-germany-country-study-1995', loc: { section: 'History', para: '20' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/3.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'winkler-2000-der-lange-weg-nach-westen', perspective: 'european' },
    { source: 'wolfrum-2007-die-gegluckte-demokratie', perspective: 'european' }
  ]
})
