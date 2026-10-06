import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'deposition-of-the-qajar-dynasty-foreign-role',
  about: ['event:deposition-of-the-qajar-dynasty', 'person:ahmad-shah-qajar'],
  topic: 'foreign-role',
  researched: '2026-10-06',
  positions: [
    {
      id: 'british-overthrew-the-qajars',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Popular legend in Persia' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'It has become part of the legend of his deposition from the throne that his “patriotic gesture” so annoyed his British hosts that they decided to overthrow the Qajar dynasty and assisted Reżā Khan in doing so in 1925;',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q2',
          text: 'The next step was to force Aḥmad Shah to abdicate, a move often attributed to his supposed refusal to support the Anglo-Persian agreement of 1337/1919',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'circumstances-unrelated-to-britain',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mohammad Javad Sheikh-ol-Islami' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'but British Foreign Office documents provide ample proof that this was not the case and that his fall from power was due to circumstances unrelated to the London banquet.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    }
  ]
})
