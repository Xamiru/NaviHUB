import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'great-persian-famine-causes',
  about: ['event:great-persian-famine'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'climate',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Xavier de Planhol' },
        { kind: 'scholar', name: 'Charles Melville' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Drought is obviously the most frequent cause of famine, as was the case in several of the famines mentioned by Melville (p. 130).',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        },
        {
          id: 'q2',
          text: 'Both factors can also combine, with the succession of a dry summer by a harsh winter especially to be feared, as in the great famine of 1869-72 or Sīstān in 1949-50 (Melville, pp. 147-48).',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        }
      ]
    },
    {
      id: 'hoarding-and-speculation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Xavier de Planhol' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Large land owners in the south and west hoarded their grain.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        },
        {
          id: 'q4',
          text: 'In the spring, speculation and hoarding hindered the replenishment of provisions.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        }
      ]
    },
    {
      id: 'government-indifference',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'G. Gilbar' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The fight against famines seems never to have been taken up efficiently; indeed it has been written (Gilbar, p. 136) that until the beginning of the 1960s, the Persian government was completely indifferent to famines and even the establishing of grain reserves in government warehouses was seldom practiced.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        },
        {
          id: 'q6',
          text: 'The embargo on cereal exports, established in 1863, never had any effect since high-ranking government officials did not hesitate to subvert it (Gilbar, p. 136; Chirol, p. 97).',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        }
      ]
    }
  ]
})
