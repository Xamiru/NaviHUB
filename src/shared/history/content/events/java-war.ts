import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'java-war',
  names: [
    { text: 'Java War', lang: 'en', role: 'primary' },
    { text: 'Perang Jawa', lang: 'id', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1825' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1830' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:yogyakarta',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The Java War and Cultivation System', para: '3' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:dutch-east-indies' }
  ],
  participants: [
    {
      ref: 'person:diponegoro',
      role: 'leader',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The Java War and Cultivation System', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 200000, qualifier: 'up-to' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'The Java War and Cultivation System', para: '3' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Variations on this pattern were found throughout Java, with local adaptations. But the reforms of Daendels and Raffles threatened this arrangement.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/indonesia/11.htm' }
        },
        {
          id: 'q2',
          text: 'Many of the elite found themselves short of funds and indebted as Dutch demands for tax revenues expanded after 1816.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'The immediate cause of Diponegoro\'s revolt in 1825 was the Dutch decision to build a road across a piece of his property that contained a sacred tomb.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'The Java War of 1825-30 constituted the last resistance of the Javanese aristocracy to Dutch rule.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        },
        {
          id: 'q5',
          text: 'Thereupon ensued the Java War, a bitter guerrilla conflict in which as many as 200,000 Javanese died in fighting or from indirect causes (the population of Java at the end of the eighteenth century was only 3 million).',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        },
        {
          id: 'q6',
          text: 'Insurgency was suppressed only after the Dutch adopted the "fortress system": the posting of small units of mobile troops in forts scattered through the contested territory.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'The territories of Yogyakarta and Surakarta were substantially reduced, although the sultans were paid compensation.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'The Java War was not a modern anticolonial movement.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        },
        {
          id: 'q9',
          text: 'Diponegoro and his followers probably did not want to restore an idealized, precolonial past.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        },
        {
          id: 'q10',
          text: 'Nor did they envision an independent, modern nation.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        },
        {
          id: 'q11',
          text: 'Rather they sought a Javanese heartland free of Dutch rule.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Raden_Saleh_-_Diponegoro_arrest.jpg/1280px-Raden_Saleh_-_Diponegoro_arrest.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Raden_Saleh_-_Diponegoro_arrest.jpg',
    credit: { institution: 'Istana Negara, Jakarta', creator: 'Raden Saleh' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'louw-1904-de-java-oorlog-van-1825-30', perspective: 'european' }
  ]
})
