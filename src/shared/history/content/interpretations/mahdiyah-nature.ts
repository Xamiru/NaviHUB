import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mahdiyah-nature',
  about: ['period:mahdiyah', 'person:muhammad-ahmad-al-mahdi'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'first-nationalist-government',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Mahdiyah has become known as the first genuine Sudanese nationalist government.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        }
      ]
    },
    {
      id: 'imposture',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (1911)' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The belief in the appearance of the mahdi readily lent itself to imposture.',
          lang: 'en',
          cite: { source: 'britannica-1911-mahdi', loc: { section: 'MAHDI', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mahdi'
          }
        }
      ]
    },
    {
      id: 'religious-fanatic',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'Egyptian administration in Khartoum' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Even after the Mahdi proclaimed a jihad, or holy war, against the Turkiyah, Khartoum dismissed him as a religious fanatic.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        }
      ]
    }
  ]
})
