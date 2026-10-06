import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'egyptian-rule-in-syria',
  names: [
    { text: 'Egyptian rule in Syria', lang: 'en', role: 'primary' },
    {
      text: 'Egyptian occupation of Syria',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-syria-country-study-1987',
          loc: { section: 'Ottoman Empire', para: '10' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1831' },
        cites: [
          {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'Ottoman Empire', para: '10' }
          },
          {
            source: 'loc-jordan-country-study-1989',
            loc: { section: 'OTTOMAN RULE', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1839' },
        cites: [
          {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'Ottoman Empire', para: '10' }
          },
          {
            source: 'loc-jordan-country-study-1989',
            loc: { section: 'OTTOMAN RULE', para: '3' }
          }
        ]
      },
      {
        value: { d: '1840' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'From 1831 until 1839, Ottoman rule was displaced by that of Muhammad Ali--pasha of Egypt and nominally subject to the sultan-- when his troops occupied the region during a revolt against the Sublime Porte, as the Ottoman government came to be known.',
          lang: 'en',
          cite: {
            source: 'loc-jordan-country-study-1989',
            loc: { section: 'OTTOMAN RULE', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/jordan/6.htm' }
        },
        {
          id: 'q2',
          text: 'But Ibrahim Pasha, son of the Egyptian ruler, became unpopular with the landowners because he limited their influence, and with the peasants because he imposed conscription and taxation.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'Ottoman Empire', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/7.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'He was eventually driven from Syria by the sultan\'s forces.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'Ottoman Empire', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/7.htm' }
        },
        {
          id: 'q4',
          text: 'Britain and Russia compelled Muhammad Ali to withdraw and they restored the Ottoman governors.',
          lang: 'en',
          cite: {
            source: 'loc-jordan-country-study-1989',
            loc: { section: 'OTTOMAN RULE', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/jordan/6.htm' }
        },
        {
          id: 'q5',
          text: 'A British fleet bombarded Beirut in September 1840, and an Anglo-Turkish force landed, causing uprisings against the Egyptian forces.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    }
  ]
})
