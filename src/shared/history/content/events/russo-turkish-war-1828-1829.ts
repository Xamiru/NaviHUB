import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russo-turkish-war-1828-1829',
  names: [
    { text: 'Russo-Turkish War of 1828–1829', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1828' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Russian Protectorate', para: '4' }
          },
          {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '13' }
          }
        ]
      },
      {
        value: { d: '1827-12' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '23'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Elena Andreeva' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1829' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '13' }
          }
        ]
      },
      {
        value: { d: '1830' },
        cites: [
          {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '43' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Steven W. Sowards' }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:edirne',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-adrianople',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-romania-country-study-1989',
          loc: { section: 'The Russian Protectorate', para: '4' }
        }
      ]
    },
    { ref: 'event:greek-war-of-independence', rel: 'related' }
  ],
  participants: [
    {
      ref: 'person:nicholas-i-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '17' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Russia fought a successful war with the Ottomans in 1828 and 1829.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q2',
          text: 'To end Turkish stalling, the Russians invaded Turkey.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q3',
          text: 'The sultan gave in when the Russian army almost reached Istanbul in 1829.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Nicholas I was following the traditional Russian policy of resolving the so-called Eastern Question by seeking to partition the Ottoman Empire and establish a protectorate over the Orthodox population of the Balkans, still largely under Ottoman control in the 1820s.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q5',
          text: 'During the negotiations, in December of 1827, a war between Russia and the Ottoman empire broke out.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '23'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q6',
          text: 'The Ottomans offered Iran military help against Russia.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '23'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q7',
          text: 'He did not agree to Paskievich’s proposal that he support the Russian campaign against the Turks',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Bulgarian aid to the Russians in the Russo-Turkish wars of 1806-12 and 1828-29 did nothing to loosen Ottoman control.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        },
        {
          id: 'q9',
          text: 'Russia accepted British and French participation in the peace settlement.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        }
      ]
    }
  ]
})
