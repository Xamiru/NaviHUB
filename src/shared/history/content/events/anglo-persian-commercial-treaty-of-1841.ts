import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-persian-commercial-treaty-of-1841',
  names: [
    { text: 'Anglo-Persian Commercial Treaty of 1841', lang: 'en', role: 'primary' },
    {
      text: '1841 Treaty of Commerce',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '12'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1841-10-28' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '18' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '18' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-mohammad-shah-qajar' }
  ],
  participants: [
    {
      ref: 'person:john-mcneill',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '18' }
        }
      ]
    },
    {
      ref: 'person:mohammad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '18' }
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
          text: 'Soon after John McNeill’s return to Tehran as minister, a commercial treaty was signed on 28 October 1841 (Lambton, 1988, pp. 127-28).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q2',
          text: 'Soon after, the terms of the 1841 Treaty of Commerce gave Britain capitulatory advantages in custom duties and other areas on a par with those enjoyed by Russia after 27 years of Persian resistance (Hurewitz, II, p. 280).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q3',
          text: 'After this conflict, London too obtained “most-favored nation” status in trade with Persia when normalizing relations with that country in 1841; thus Britain was placed on equal footing with Russia, which had enjoyed a preferential trade status in Persia since 1828.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-relations-qajar-19th-century',
            loc: { section: 'INDIA viii. Relations: Qajar Period, the 19th Century', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/india-viii-relations-qajar-period-the-19th-century'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The conclusion of this treaty was the first serious step in opening the Persian markets to British manufactured goods, which contributed to the further decline of the traditional Persian workshops and a shift in foreign trade to exportable cash crops (Issawi, pp. 70-82; Abbott, pp. xiv-xxv).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q5',
          text: 'The imposition of a 5 percent tariff ceiling on British goods imported into Persia was a boon for Indian trade, which accounted for the bulk of “British” trade with Persia at the time (see xiii. below).',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-relations-qajar-19th-century',
            loc: { section: 'INDIA viii. Relations: Qajar Period, the 19th Century', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/india-viii-relations-qajar-period-the-19th-century'
          }
        },
        {
          id: 'q6',
          text: 'British cheap goods then flooded the Persian market and this led to bankruptcies in Tabriz in 1843 (Lambton, 1988, pp. 133-34; Issawi, pp. 92 ff.).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    }
  ]
})
