import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-sighting-of-land-in-1492',
  about: ['person:christopher-columbus'],
  topic: 'other',
  positions: [
    {
      id: 'the-journal-credits-the-pinta',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Christopher Columbus',
          ref: 'person:christopher-columbus'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'After sunset steered their original course west and sailed twelve miles an hour till two hours after midnight, going ninety miles, which are twenty-two leagues and a half; and as the Pinta was the swiftest sailer, and kept ahead of the Admiral, she discovered land and made the signals which had been ordered. The land was first seen by a sailor called Rodrigo de Triana, although the Admiral at ten o\'clock that evening standing on the quarter-deck saw a light, but so small a body that he could not affirm it to be land;',
          lang: 'en',
          cite: {
            source: 'fordham-columbus-journal-1492',
            loc: { section: 'Extracts from Journal' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/columbus1.asp'
          }
        }
      ]
    },
    {
      id: 'britannica-1911-account-of-the-signs-of-land',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'On the 25th Martin Alonso Pinzon raised the cry of land, but it proved false, as did the rumour to the same effect on the 7th of October, from the “Niña.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
