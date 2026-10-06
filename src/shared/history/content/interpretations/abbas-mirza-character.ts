import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'abbas-mirza-character',
  about: ['person:abbas-mirza'],
  topic: 'character',
  researched: '2026-10-06',
  positions: [
    {
      id: 'visitors-admiration',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Burnes' },
        { kind: 'participant', name: 'Ker Porter' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'His visitors expressed admiration for his intelligence, breadth of knowledge, benevolence, and liberal attitudes on religion; they perceived him as the future ruler who would restore his land to its former glory.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q2',
          text: '“In every sense a perfect gentleman” was Burnes’s verdict',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      id: 'later-british-critics',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'James Baillie Fraser' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'When British policy toward Iran changed, so too did the opinions of British travelers. His love of reform was held to be infantile; he was said to lack perseverance, to be miserly, and to enjoy flattery',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      id: 'busse-most-capable',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Heribert Busse' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Even though ʿAbbās Mīrzā’s character may not have been blameless (in which respect his chronic illness should be borne in mind), he was nonetheless the most capable of the Qajar rulers. He, his advisers, and his officials laid foundations on which the later reformers could build',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    }
  ]
})
