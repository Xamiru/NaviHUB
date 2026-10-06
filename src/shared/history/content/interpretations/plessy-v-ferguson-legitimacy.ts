import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'plessy-v-ferguson-legitimacy',
  about: ['event:plessy-v-ferguson'],
  topic: 'legitimacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'majority-opinion',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Henry Brown' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'We consider the underlying fallacy of the plaintiff’s argument to consist in the assumption that the enforced separation of the two races stamps the colored race with a badge of inferiority.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
          }
        },
        {
          id: 'q2',
          text: 'If the civil and political rights of both races be equal, one cannot be inferior to the other civilly or politically. If one race be inferior to the other socially, the Constitution of the United States cannot put them upon the same plane.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
          }
        }
      ]
    },
    {
      id: 'lone-dissent',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'John Marshall Harlan' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'I am of the opinion that the statute of Louisiana is inconsistent with the personal liberties of citizens, white and black, in that State, and hostile to both the spirit and the letter of the Constitution of the United States.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
          }
        }
      ]
    }
  ]
})
