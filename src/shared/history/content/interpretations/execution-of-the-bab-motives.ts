import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'execution-of-the-bab-motives',
  about: ['event:execution-of-the-bab'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'reason-of-state',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'It is probable that his motives were purely political, and that he acted for the preservation of the state, not Shiʿite Islam.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      id: 'urban-violence',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Denis M. MacEoin' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'When, however, violence broke out in the urban centers of Neyrīz and Zanjān in May, 1850, Mīrzā Taqī Khan Amīr Neẓām decided to take the extreme step of having the Bāb put to death.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    }
  ]
})
