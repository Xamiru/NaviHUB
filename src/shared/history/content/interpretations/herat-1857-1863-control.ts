import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'herat-1857-1863-control',
  about: ['event:afghan-capture-of-herat-1863', 'place:herat'],
  topic: 'outcome',
  researched: '2026-10-06',
  positions: [
    {
      id: 'persian-control-until-1863',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Daniel Balland' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The last was a difficult task that occupied all the end of his reign, since the city was also coveted by the Persians, who controlled it from 1272/1856 to 1279/1863.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      id: 'ended-by-treaty-of-paris',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'While Article 5 engaged “His Majesty the Shah of Persia” to withdraw from Herat within three months, Article 6 demanded that he “relinquish all claims to sovereignty over the territory and the city of Herat or the countries of Afghanistan, and never to demand from the Chiefs of Herat, or of the countries of Afghanistan, any mark of obedience, such as coinage or ‘Khootbeh’ or tribute.”',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q3',
          text: 'After more than half a century of Persian involvement, Qajar ambitions to retain Herat as a frontier vassalage were brought to an end as a result primarily of British strategic interests in Afghanistan—an early consequence of the Great Game.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q4',
          text: 'Under the Bārakzi dynasty and with British blessing, Herat was incorporated into Afghanistan as a relatively stable province, although it remained culturally distinct from the rest of the new country.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    }
  ]
})
