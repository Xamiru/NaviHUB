import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'cisplatine-war',
  names: [
    { text: 'Cisplatine War', lang: 'en', role: 'primary' },
    { text: 'Guerra da Cisplatina', lang: 'pt', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1825-12' },
        cites: [
          {
            source: 'loc-uruguay-country-study-1990',
            loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1828-08' },
        cites: [
          {
            source: 'loc-uruguay-country-study-1990',
            loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  sides: [
    {
      key: 'brazil',
      name: 'Brazil',
      cites: [
        {
          source: 'loc-uruguay-country-study-1990',
          loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
        }
      ]
    },
    {
      key: 'river-plate',
      name: 'United Provinces of Río de la Plata',
      cites: [
        {
          source: 'loc-uruguay-country-study-1990',
          loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:pedro-i-of-brazil',
      role: 'head-of-state',
      side: 'brazil',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '12' }
        }
      ]
    },
    {
      name: 'Juan Antonio Lavalleja',
      role: 'leader',
      side: 'river-plate',
      cites: [
        {
          source: 'loc-uruguay-country-study-1990',
          loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
        }
      ]
    },
    {
      name: 'John Ponsonby',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-uruguay-country-study-1990',
          loc: { section: 'From Insurrection to State Organization, 1820-30', para: '2' }
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
          text: 'The region was incorporated into the United Kingdom as the Cisplatine Province in 1821.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Kingdom of Portugal and Brazil, 1815-21', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/10.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Brazil declared war on them.',
          lang: 'en',
          cite: {
            source: 'loc-uruguay-country-study-1990',
            loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uruguay/4.htm' }
        },
        {
          id: 'q3',
          text: 'The ensuing conflict lasted from December 1825 to August 1828.',
          lang: 'en',
          cite: {
            source: 'loc-uruguay-country-study-1990',
            loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uruguay/4.htm' }
        },
        {
          id: 'q4',
          text: 'The empire could little afford the troops, some of whom were recruited in Ireland and Germany, or the sixty warships needed to blockade the Río de la Plata.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'In 1828 Lord John Ponsonby, envoy of the British Foreign Office, proposed making the Banda Oriental an independent state.',
          lang: 'en',
          cite: {
            source: 'loc-uruguay-country-study-1990',
            loc: { section: 'From Insurrection to State Organization, 1820-30', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uruguay/4.htm' }
        },
        {
          id: 'q6',
          text: 'Britain was anxious to create a buffer state between Argentina and Brazil to ensure its trade interests in the region.',
          lang: 'en',
          cite: {
            source: 'loc-uruguay-country-study-1990',
            loc: { section: 'From Insurrection to State Organization, 1820-30', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uruguay/4.htm' }
        },
        {
          id: 'q7',
          text: 'The war at least left Uruguay independent instead of an Argentine province.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1825-04-19' },
            cites: [
              {
                source: 'loc-uruguay-country-study-1990',
                loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On April 19, 1825, a group of Uruguayan revolutionaries (the famous Thirty-Three Heroes) led by Juan Antonio Lavalleja, reinforced by Argentine troops, crossed the Río de la Plata from Buenos Aires and organized an insurrection that succeeded in gaining control over the countryside.',
        lang: 'en',
        cite: {
          source: 'loc-uruguay-country-study-1990',
          loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uruguay/4.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1825-08-25' },
            cites: [
              {
                source: 'loc-uruguay-country-study-1990',
                loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On August 25, 1825, in a town in the liberated area, representatives from the Banda Oriental declared the territory\'s independence from Brazil and its incorporation into the United Provinces of Río de la Plata.',
        lang: 'en',
        cite: {
          source: 'loc-uruguay-country-study-1990',
          loc: { section: 'From Insurrection to State Organization, 1820-30', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uruguay/4.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1828-08-27' },
            cites: [
              {
                source: 'loc-uruguay-country-study-1990',
                loc: { section: 'From Insurrection to State Organization, 1820-30', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'With British mediation, Brazil and Argentina signed the Treaty of Montevideo at Rio de Janeiro on August 27, 1828, whereby Argentina and Brazil renounced their claims to the territories that would become integral parts of the newly independent state on October 3.',
        lang: 'en',
        cite: {
          source: 'loc-uruguay-country-study-1990',
          loc: { section: 'From Insurrection to State Organization, 1820-30', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uruguay/4.htm' }
      }
    }
  ]
})
