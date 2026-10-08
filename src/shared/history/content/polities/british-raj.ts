import { definePolity } from '../../schema'

export default definePolity({
  id: 'british-raj',
  names: [
    { text: 'British Raj', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  polityType: 'colony',
  start: {
    alts: [
      {
        value: { d: '1858' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1947-08-15' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:kolkata',
      end: {
        alts: [
          {
            value: { d: '1911' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'The Independence Movement', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'The Independence Movement', para: '4' }
        }
      ]
    },
    {
      ref: 'place:delhi',
      start: {
        alts: [
          {
            value: { d: '1911' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'The Independence Movement', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'The Independence Movement', para: '6' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:mughal-empire',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'After the Sepoy Rebellion', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'polity:british-empire',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'After the Sepoy Rebellion', para: '1' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 129286 },
    { set: 'world', code: 750, to: 1947.62 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/British_Indian_Empire_1909_Imperial_Gazetteer_of_India.jpg/1280px-British_Indian_Empire_1909_Imperial_Gazetteer_of_India.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:British_Indian_Empire_1909_Imperial_Gazetteer_of_India.jpg',
    credit: {
      institution: 'Imperial Gazetteer of India (Oxford University Press, 1909)',
      creator: 'Edinburgh Geographical Institute; J. G. Bartholomew and Sons'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'At the same time, they abolished the British East India Company and replaced it with direct rule under the British crown.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        },
        {
          id: 'q2',
          text: 'In proclaiming the new direct-rule policy to "the Princes, Chiefs, and Peoples of India," Queen Victoria (who was given the title Empress of India in 1877) promised equal treatment under British law, but Indian mistrust of British rule had become a legacy of the 1857 rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        },
        {
          id: 'q3',
          text: 'The viceroy announced in 1858 that the government would honor former treaties with princely states and renounced the "doctrine of lapse," whereby the East India Company had annexed territories of rulers who died without male heirs.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        },
        {
          id: 'q4',
          text: 'About 40 percent of Indian territory and between 20 and 25 percent of the population remained under the control of 562 princes notable for their religious (Islamic, Sikh, Hindu, and other) and ethnic diversity.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In what the British saw as an additional goodwill gesture, in 1911 King-Emperor George V (r. 1910-36) visited India for a durbar (a traditional court held for subjects to express fealty to their ruler), during which he announced the reversal of the partition of Bengal and the transfer of the capital from Calcutta to a newly planned city to be built immediately south of Delhi, which became New Delhi.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/19.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'On June 3, 1947, Viscount Louis Mountbatten, the viceroy (1947) and governor-general (1947-48), announced plans for partition of the British Indian Empire into the nations of India and Pakistan, which itself was divided into east and west wings on either side of India',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/21.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'sarkar-1983-modern-india', perspective: 'south-asian' },
    { source: 'chandra-1989-indias-struggle-for-independence', perspective: 'south-asian' },
    { source: 'tharoor-2016-an-era-of-darkness', perspective: 'south-asian' }
  ]
})
