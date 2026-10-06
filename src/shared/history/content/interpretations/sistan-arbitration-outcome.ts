import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'sistan-arbitration-outcome',
  about: ['event:sistan-arbitration-1872'],
  topic: 'outcome',
  researched: '2026-10-06',
  positions: [
    {
      id: 'persian-favour',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In the meantime, after the British arbitration of the Perso-Afghan frontier in Sistān in 1872, at the joint request of Tehran and Kabul (and in Persia’s favor), Britain had engaged in earnest negotiations for settling the boundaries of Persia’s southeastern frontier with India.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-relations-qajar-19th-century',
            loc: { section: 'INDIA viii. Relations: Qajar Period, the 19th Century', para: '19' }
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
      id: 'satisfied-neither',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Daniel Balland' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'A British mission dealt with the Perso-Afghan territorial dispute in the Sīstān region by marking boundaries that did not satisfy either of the two parties (1288-89/1872).',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    }
  ]
})
