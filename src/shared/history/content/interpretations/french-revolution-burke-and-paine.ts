import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'french-revolution-burke-and-paine',
  about: ['event:french-revolution'],
  topic: 'significance',
  framing: {
    id: 'q1',
    text: 'Although the French Revolution seemed to contemporaries a total break in the history of France, it was really far otherwise.',
    lang: 'en',
    cite: {
      source: 'britannica-1911-french-revolution',
      loc: { section: 'French Revolution, The', para: '98' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-13',
      url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
    }
  },
  positions: [
    {
      id: 'burke',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Edmund Burke' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'But the age of chivalry is gone.',
          lang: 'en',
          cite: {
            source: 'burke-1790-reflections-on-the-revolution-in-france',
            loc: { section: 'Reflections on the Revolution in France', para: '136' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/Reflections_on_the_Revolution_in_France'
          }
        },
        {
          id: 'q3',
          text: 'Never, never more shall we behold that generous loyalty to rank and sex, that proud submission, that dignified obedience, that subordination of the heart which kept alive, even in servitude itself, the spirit of an exalted freedom.',
          lang: 'en',
          cite: {
            source: 'burke-1790-reflections-on-the-revolution-in-france',
            loc: { section: 'Reflections on the Revolution in France', para: '136' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/Reflections_on_the_Revolution_in_France'
          }
        }
      ]
    },
    {
      id: 'paine',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Thomas Paine' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Nature has been kinder to Mr. Burke than he is to her. He is not affected by the reality of distress touching his heart, but by the showy resemblance of it striking his imagination. He pities the plumage, but forgets the dying bird.',
          lang: 'en',
          cite: { source: 'paine-1791-rights-of-man', loc: { section: 'Rights of Man', para: '66' } },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://en.wikisource.org/wiki/Rights_of_Man' }
        },
        {
          id: 'q5',
          text: 'Man did not enter into society to become worse than he was before, nor to have fewer rights than he had before, but to have those rights better secured.',
          lang: 'en',
          cite: {
            source: 'paine-1791-rights-of-man',
            loc: { section: 'Rights of Man', para: '113' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://en.wikisource.org/wiki/Rights_of_Man' }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
