import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'trans-iranian-railway-motives',
  about: ['event:trans-iranian-railway'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'british-design',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Widely held belief in Persia' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'It is widely believed in Persia that Reżā Shah was commissioned by British intelligence to implement its schemes, including construction of the trans-Persian railway, which is said to have been designed by the British in anticipation of World War II.',
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
      id: 'national-self-financed-development',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The crowning achievement in this respect was the building of the trans-Iranian railroad, which connected Khuzestan in the southwest to Gorgān in the northeast, a remarkable feat of determination and efficiency when we consider that it was all done with domestic capital obtained from taxing sugar and tea imports between 1925 and 1938.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    }
  ]
})
