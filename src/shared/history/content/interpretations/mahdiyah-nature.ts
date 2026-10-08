import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mahdiyah-nature',
  about: ['period:mahdiyah', 'person:muhammad-ahmad-al-mahdi'],
  topic: 'nature',
  researched: '2026-10-08',
  positions: [
    {
      id: 'divinely-appointed-mahdi',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Muhammad Ahmad, the Mahdi',
          ref: 'person:muhammad-ahmad-al-mahdi'
        }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The changes (disturbances) of the times are not hidden from you, nor the forsaking of the Sunnas; and he who has the (true) faith and understanding will not be pleased thereat, but will leave all he needs and his native place (house and home) in defence of religion and the Sunnas; and therefore jealousy for Islam will not delay to possess in full strength (the heart of) the believer.',
          lang: 'en',
          cite: {
            source: 'gordon-1885-journals-at-kartoum',
            loc: { section: 'Appendix V. Manifesto of the Mahdi to the Inhabitants of Kartoum' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gutenberg.org/cache/epub/49224/pg49224.txt'
          }
        },
        {
          id: 'q6',
          text: 'All that I have told you about my succession to the office of Mahdi was told to me by the eminent Lord (Mohammed), on whom be blessing and peace, when I was awake and in perfect health, free from all transgressions of the law, not in sleep nor in (a state of) hallucination, or drunkenness or madness, but accounted to be of sound mind, following the traditions of the prophet, on whom be blessing and peace, in ordering what he ordered and forbidding what he forbade.',
          lang: 'en',
          cite: {
            source: 'gordon-1885-journals-at-kartoum',
            loc: { section: 'Appendix V. Manifesto of the Mahdi to the Inhabitants of Kartoum' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gutenberg.org/cache/epub/49224/pg49224.txt'
          }
        }
      ]
    },
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
      id: 'revolt-and-religious-crusade',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord Cromer (Evelyn Baring)' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The Mahdist movement was not only a revolt against misgovernment. It was also, in the eyes of its followers, a religious move- ment having for its object the forced conversion of the whole world to Mahdiism.',
          lang: 'en',
          cite: {
            source: 'cromer-1908-modern-egypt-vol-1',
            loc: { section: 'Part II, Chapter XXVII', page: '589' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/modernegypt0001crom_z1y4/modernegypt0001crom_z1y4_djvu.txt'
          }
        }
      ]
    }
  ]
})
