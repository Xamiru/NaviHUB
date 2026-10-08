import { definePerson } from '../../schema'

export default definePerson({
  id: 'pedro-ii-of-brazil',
  names: [
    { text: 'Pedro II of Brazil', lang: 'en', role: 'primary' },
    { text: 'Dom Pedro II', lang: 'pt', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1825-12-02' },
        cites: [
          { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1891-12-05' },
        cites: [
          { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:paris',
    cites: [
      { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } }
    ]
  },
  regions: ['latin-america'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Brazil',
      polity: 'polity:empire-of-brazil',
      start: {
        alts: [
          {
            value: { d: '1831-04' },
            cites: [
              { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1889-11' },
            cites: [
              { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'PEDRO II. (1825–1891), emperor of Brazil, came to the throne in childhood, having been born on the 2nd of December 1825, and proclaimed emperor in April 1831, upon the abdication of his father.',
          lang: 'en',
          cite: { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pedro_II.'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'The chief events of his reign had been the emancipation of the slaves, and the war with Paraguay in 1864-70.',
          lang: 'en',
          cite: { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pedro_II.'
          }
        },
        {
          id: 'q3',
          text: 'Pedro II favored abolition, and during the Paraguayan War slaves serving in the military were emancipated.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q4',
          text: 'Dom Pedro was a model constitutional sovereign, and a munificent patron of science and letters.',
          lang: 'en',
          cite: { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pedro_II.'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'Dom Pedro retired to Europe, and died in Paris on the 5th of December 1891.',
          lang: 'en',
          cite: { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pedro_II.'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Pedro_II_of_Brazil_-_Brady-Handy.jpg/1280px-Pedro_II_of_Brazil_-_Brady-Handy.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Pedro_II_of_Brazil_-_Brady-Handy.jpg',
    credit: { institution: 'Library of Congress', creator: 'Mathew Brady' },
    license: { id: 'public-domain' }
  }
})
