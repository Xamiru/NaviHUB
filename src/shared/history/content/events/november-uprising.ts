import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'november-uprising',
  names: [
    { text: 'November Uprising', lang: 'en', role: 'primary' },
    { text: 'Powstanie listopadowe', lang: 'pl', role: 'native' },
    {
      text: 'November Revolt',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'PARTITIONED POLAND', para: '13' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1830-11' },
        cites: [
          {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '12' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1831-09' },
        cites: [
          {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:warsaw',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'PARTITIONED POLAND', para: '12' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-nicholas-i' }
  ],
  sides: [
    {
      key: 'poland',
      name: 'Polish troops in Warsaw',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'PARTITIONED POLAND', para: '12' }
        }
      ]
    },
    {
      key: 'russia',
      name: 'the Russians',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'PARTITIONED POLAND', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Adam Czartoryski',
      role: 'leader',
      side: 'poland',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'PARTITIONED POLAND', para: '13' }
        }
      ]
    },
    {
      ref: 'person:nicholas-i-of-russia',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '16' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'displaced',
      side: 'poland',
      value: {
        alts: [
          {
            value: { min: 6000 },
            cites: [
              {
                source: 'loc-poland-country-study-1992',
                loc: { section: 'PARTITIONED POLAND', para: '12' }
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
          text: 'For several decades, the Polish national movement gave priority to the immediate restoration of independence, a drive that found expression in a series of armed rebellions.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        },
        {
          id: 'q2',
          text: 'In the 1820s, however, Russian rule grew more arbitrary, and secret societies were formed by intellectuals in several cities to plot an overthrow.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'In November 1830, Polish troops in Warsaw rose in revolt.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        },
        {
          id: 'q4',
          text: 'When the government of Congress Poland proclaimed solidarity with the insurrectionists shortly thereafter, a new Polish-Russian war began.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        },
        {
          id: 'q5',
          text: 'The rebels\' requests for aid from France were ignored, and their reluctance to abolish serfdom cost them the support of the peasantry.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'By September 1831, the Russians had subdued Polish resistance and forced 6,000 resistance fighters into exile in France, beginning a time of harsh repression of intellectual and religious activity throughout Poland.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        },
        {
          id: 'q7',
          text: 'Nicholas crushed the rebellion, abrogated the Polish constitution, and reduced Poland to the status of a Russian province.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q8',
          text: 'After the failure of the November Revolt, clandestine conspiratorial activity continued on Polish territory.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        },
        {
          id: 'q9',
          text: 'An exiled Polish political and intellectual elite established a base of operations in Paris.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q10',
          text: 'In the history of the Polish nation, which suffered three partitions of its territory and the failure of multiple national insurrections, Polonia became a tragic figure.',
          lang: 'en',
          cite: {
            source: 'ehne-koch-female-allegories-nation',
            loc: { section: 'Female allegories of the nation' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/gender-and-europe/gender-and-revolution-in-europe-19th-20th-century/female-allegories-nation'
          }
        }
      ]
    }
  ]
})
