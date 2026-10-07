import { definePerson } from '../../schema'

export default definePerson({
  id: 'saigo-takamori',
  names: [
    { text: 'Saigo Takamori', lang: 'en', role: 'primary' },
    { text: '西郷隆盛', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1827' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN', para: '5' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1877' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['military', 'politician'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Two of the major figures of this group were Okubo Toshimichi (1832-78), son of a Satsuma retainer, and Satsuma samurai Saigo Takamori (1827-77), who had joined forces with Choshu, Tosa, and Hizen to overthrow the Tokugawa.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        },
        {
          id: 'q2',
          text: 'Okubo became minister of finance and Saigo a field marshal; both were imperial councillors.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        },
        {
          id: 'q3',
          text: 'The 1873 Korean crisis resulted in the resignation of militaryexpedition proponents Saigo and Councillor of State Eto Shimpei (1834-74).',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Opposition to the Meiji Oligarchy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/24.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Although he was defeated and committed suicide, Saigo was not branded a traitor and became a heroic figure in Japanese history.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Opposition to the Meiji Oligarchy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/24.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Saigo_Takamori_%28b%29.jpg/1280px-Saigo_Takamori_%28b%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Saigo_Takamori_(b).jpg',
    credit: { institution: 'National Diet Library', creator: 'C. Nakagawa' },
    license: { id: 'public-domain' }
  }
})
