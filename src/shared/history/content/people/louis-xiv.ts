import { definePerson } from '../../schema'

export default definePerson({
  id: 'louis-xiv',
  names: [
    { text: 'Louis XIV', lang: 'en', role: 'primary' },
    { text: 'Louis XIV de France', lang: 'fr', role: 'native' },
    { text: 'the Sun King', lang: 'en', role: 'alternative' },
    { text: 'Louis le Grand', lang: 'fr', role: 'alternative' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1638-09-05' },
        cites: [
          {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1715-09-01' },
        cites: [
          {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '6' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:saint-germain-en-laye',
    cites: [
      {
        source: 'britannica-1911-louis-xiv-of-france',
        loc: { section: 'Louis XIV. of France', para: '1' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'king of France',
      polity: 'polity:kingdom-of-france',
      start: {
        alts: [
          {
            value: { d: '1643-05-14' },
            cites: [
              {
                source: 'britannica-1911-louis-xiv-of-france',
                loc: { section: 'Louis XIV. of France', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1715-09-01' },
            cites: [
              {
                source: 'britannica-1911-louis-xiv-of-france',
                loc: { section: 'Louis XIV. of France', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-louis-xiv-of-france',
          loc: { section: 'Louis XIV. of France', para: '1' }
        },
        {
          source: 'britannica-1911-louis-xiv-of-france',
          loc: { section: 'Louis XIV. of France', para: '6' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Portrait_of_Louis_XIV_of_France_in_Coronation_Robes_%28by_Hyacinthe_Rigaud%29_-_Louvre_Museum.jpg/1280px-Portrait_of_Louis_XIV_of_France_in_Coronation_Robes_%28by_Hyacinthe_Rigaud%29_-_Louvre_Museum.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Louis_XIV_of_France_in_Coronation_Robes_(by_Hyacinthe_Rigaud)_-_Louvre_Museum.jpg',
    credit: { institution: 'Louvre Museum', creator: 'Hyacinthe Rigaud' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'LOUIS XIV. (1638–1715), king of France, was born at Saint-Germain-en-Laye on the 5th of September 1638.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'The birth of the prince who was destined to reign as Louis XIV. was therefore hailed as a triumph, not less important than any of those won by diplomacy or arms.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'The death of his father made Louis XIV. king on the 14th of May 1643, but he had to wait sixteen years before he began to rule.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        },
        {
          id: 'q4',
          text: 'The king, however, at once announced his intention of being his own first minister; and from this resolution he never swerved.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        },
        {
          id: 'q5',
          text: 'The first years of the king’s rule were marked by the great schemes of Colbert for the financial, commercial, industrial and naval reorganization of France, and in these schemes Louis took a deep interest.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        },
        {
          id: 'q6',
          text: 'Now the new religious zeal and the autocratic temper of Louis XIV. came to the support of the church.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        },
        {
          id: 'q7',
          text: 'The astute diplomacy of Louis succeeded in winning the inheritance for his grandson Philip.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'The king died on the 1st of September 1715, after the longest recorded reign in European history.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        },
        {
          id: 'q9',
          text: 'The judgment of posterity has not repeated the flattering verdict of his contemporaries; but he remains the model of a great king in all that concerns the externals of kingship.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        }
      ]
    }
  ]
})
