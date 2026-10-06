import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-persian-oil-company-formation',
  names: [
    { text: 'Formation of the Anglo-Persian Oil Company', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1909' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1909' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Formation of the Anglo-Persian Oil Company.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1909' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'The newly incorporated Anglo-Persian Oil Company (q.v.; APOC), or Anglo-Iranian Oil Company, as it would be known from 1935 onwards, went public on April 19, 1909, and the public offering of the stock on the day resulted in the Glasgow branch of the Bank of Scotland being mobbed by customers eager to invest in the shares',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q3',
          text: 'A major new source of oil had been secured under British protection.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    }
  ]
})
