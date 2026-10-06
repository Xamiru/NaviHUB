import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'egyptian-ottoman-war-1831-1833',
  names: [
    { text: 'Egyptian–Ottoman War (1831–1833)', lang: 'en', role: 'primary' },
    {
      text: 'Egyptian invasion of Syria',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1831' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '4' }
          },
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:istanbul',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Muhammad Ali, 1805-48', para: '9' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'egypt',
      name: 'Egyptian forces',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Muhammad Ali, 1805-48', para: '9' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'the Ottoman army',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:muhammad-ali-of-egypt',
      role: 'leader',
      side: 'egypt',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '4' }
        }
      ]
    },
    {
      name: 'Ibrahim Pasha',
      role: 'commander',
      side: 'egypt',
      cites: [
        {
          source: 'loc-syria-country-study-1987',
          loc: { section: 'Ottoman Empire', para: '10' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:greek-war-of-independence',
      rel: 'caused-by',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '4' }
        },
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
        }
      ]
    },
    {
      ref: 'event:treaty-of-hunkar-iskelesi',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '4' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'Muhammad Ali, an Ottoman officer who had been designated pasha of Egypt by the sultan in 1805, had given substantial aid to the Ottoman cause in the Greek war.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q2',
          text: 'The Egyptian invasion of Syria was provoked ostensibly by the sultan\'s refusal to give Syria and Morea (Peloponnesus) to Muhammad Ali in return for his assistance in opposing the Greek war for independence in the late 1820s.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'When he was not rewarded as promised for his assistance, he invaded Syria in 1831 and pursued the retreating Ottoman army deep into Anatolia.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q4',
          text: 'In desperation, the Porte appealed to Russia for support.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q5',
          text: 'Britain then intervened, constraining Muhammad Ali to withdraw from Anatolia to Syria.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The Egyptian occupation of Syria from 1831 to 1839 under the nominal authority of the sultan brought a centralized government, judicial reform, and regular taxation.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'Ottoman Empire', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/7.htm' }
        },
        {
          id: 'q7',
          text: 'War with Muhammad Ali resumed in 1839, and Ottoman forces were again defeated.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q8',
          text: 'Under the London Convention of 1840, Muhammad Ali was forced to abandon his claim to Syria, but he was recognized as hereditary ruler of Egypt under nominal Ottoman suzerainty.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    }
  ]
})
