import { definePerson } from '../../schema'

export default definePerson({
  id: 'emperor-meiji',
  names: [
    { text: 'Emperor Meiji', lang: 'en', role: 'primary' },
    { text: '明治天皇', lang: 'ja', role: 'native' },
    {
      text: 'Mutsuhito',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '9' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['east-asia'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Japan',
      start: {
        alts: [
          {
            value: { d: '1867' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'Decline of the Tokugawa', para: '9' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1912' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '9' }
        },
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Finally, in 1867, the emperor died and was succeeded by his minor son Mutsuhito; Keiki reluctantly became head of the Tokugawa house and shogun.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q2',
          text: 'The emperor emerged as a national symbol of unity in the midst of reforms that were much more radical than had been envisioned.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        },
        {
          id: 'q3',
          text: 'Mutsuhito, who was to reign until 1912, selected a new reign title- -Meiji, or Enlightened Rule--to mark the beginning of a new era in Japanese history.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Mutsuhito%2C_The_Meiji_Emperor_MET_DT8575.jpg/1280px-Mutsuhito%2C_The_Meiji_Emperor_MET_DT8575.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mutsuhito,_The_Meiji_Emperor_MET_DT8575.jpg',
    credit: { institution: 'Metropolitan Museum of Art', creator: 'Uchida Kuichi' },
    license: { id: 'cc0' }
  }
})
