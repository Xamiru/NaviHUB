import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iran-name-change-of-1935',
  names: [
    { text: 'Persia renamed Iran in international usage', lang: 'en', role: 'primary' },
    { text: 'Iran instead of Persia', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1935-03-20' },
        cites: [
          {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '40' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'global'],
  prominence: 2,
  partOf: [
    { ref: 'period:reign-of-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-bast-germany-diplomatic-relations',
          loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '40' }
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
          text: 'Following a proposal by the Persian ambassador to Germany, foreign governments are requested to use “Iran” instead of Persia and its likes as the official name of the country.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1935' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q2',
          text: 'Persia itself (or Iran, as it would be known from 1935 onward) would emerge into prominence on the world oil stage.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'After some initial resistance on the part of economic experts had been overcome, from late 1934 onwards the German government took measures to revive relations with Persia, which culminated in an important agreement signed in March 1935.',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'In 1935 it was renamed the Anglo-Iranian Oil Company (AIOC) to conform with Reżā Shah’s wish that foreign governments should call the country Iran rather than Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
          }
        }
      ]
    }
  ]
})
