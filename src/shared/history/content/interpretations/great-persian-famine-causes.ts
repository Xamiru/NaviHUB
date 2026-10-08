import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'great-persian-famine-causes',
  about: ['event:great-persian-famine'],
  topic: 'causes',
  researched: '2026-10-08',
  positions: [
    {
      id: 'drought-hoarding-and-neglect',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Xavier de Planhol' }
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
        },
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
        },
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
    },
    {
      id: 'a-man-made-famine',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Oliver St. John' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Scarcity and high prices must naturally occur from time to time, but famine should be impossible under the present conditions of commerce.',
          lang: 'en',
          cite: {
            source: 'st-john-1876-journey-through-baluchistan-and-southern-persia',
            loc: {
              section: 'Narrative of a Journey through Baluchistan and Southern Persia, 1872',
              page: '95'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/easternpersiaan00commgoog/easternpersiaan00commgoog_djvu.txt'
          }
        },
        {
          id: 'q8',
          text: 'Still there was plenty of food in the country, the harvests in the south and west having been fairly good: but the great land-owners, who are also the great corn-dealers, instigated by love of filthy lucre, or perhaps, as they declared themselves, by fear of a third year of famine, held for a rise, utterly indifferent to the sufferings around them.',
          lang: 'en',
          cite: {
            source: 'st-john-1876-journey-through-baluchistan-and-southern-persia',
            loc: {
              section: 'Narrative of a Journey through Baluchistan and Southern Persia, 1872',
              page: '96'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/easternpersiaan00commgoog/easternpersiaan00commgoog_djvu.txt'
          }
        }
      ]
    }
  ]
})
