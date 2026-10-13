import { definePerson } from '../../schema'

export default definePerson({
  id: 'catherine-the-great',
  names: [
    { text: 'Catherine the Great', lang: 'en', role: 'primary' },
    { text: 'Екатерина II', lang: 'ru', role: 'native' },
    {
      text: 'Catherine II',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-catherine-ii',
          loc: { section: 'Catherine II.', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1729-05-02' },
        cites: [
          {
            source: 'britannica-1911-catherine-ii',
            loc: { section: 'Catherine II.', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1796-11' },
        cites: [
          {
            source: 'britannica-1911-catherine-ii',
            loc: { section: 'Catherine II.', para: '8' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:stettin',
    cites: [
      { source: 'britannica-1911-catherine-ii', loc: { section: 'Catherine II.', para: '1' } }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'empress of Russia',
      polity: 'polity:russian-empire',
      start: {
        alts: [
          {
            value: { d: '1762' },
            cites: [
              {
                source: 'britannica-1911-catherine-ii',
                loc: { section: 'Catherine II.', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1796-11' },
            cites: [
              {
                source: 'britannica-1911-catherine-ii',
                loc: { section: 'Catherine II.', para: '8' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-catherine-ii',
          loc: { section: 'Catherine II.', para: '4' }
        },
        {
          source: 'britannica-1911-catherine-ii',
          loc: { section: 'Catherine II.', para: '8' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Profile_portrait_of_Catherine_II_by_Fedor_Rokotov_%281763%2C_Tretyakov_gallery%29.jpg/1280px-Profile_portrait_of_Catherine_II_by_Fedor_Rokotov_%281763%2C_Tretyakov_gallery%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Profile_portrait_of_Catherine_II_by_Fedor_Rokotov_(1763,_Tretyakov_gallery).jpg',
    credit: { institution: 'Tretyakov Gallery', creator: 'Fyodor Rokotov' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'CATHERINE II. (1729–1796), empress of Russia, was the daughter of Christian Augustus, prince of Anhalt-Zerbst, and his wife, Johanna Elizabeth of Holstein-Gottorp.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-catherine-ii',
            loc: { section: 'Catherine II.', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Catherine_II.'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'The hatred felt for Peter III. was spontaneous, and Catherine had no need to do more than let it be known that she was prepared to profit by her husband’s downfall.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-catherine-ii',
            loc: { section: 'Catherine II.', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Catherine_II.'
          }
        },
        {
          id: 'q3',
          text: 'The mere fact that Catherine II., a small German princess without hereditary claim to the throne, ruled Russia from 1762 to 1796 amid the loyalty of the great mass of the people, and the respect and admiration of her neighbours, is sufficient proof of the force of her character.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-catherine-ii',
            loc: { section: 'Catherine II.', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Catherine_II.'
          }
        },
        {
          id: 'q4',
          text: 'Poland was incapable of maintaining its independence at the time of the first partition (1772), and the division of the unhappy country was forced on by Austria and Prussia.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-catherine-ii',
            loc: { section: 'Catherine II.', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Catherine_II.'
          }
        },
        {
          id: 'q5',
          text: 'When the Turks declared war in 1768 in order to support Poland, which they looked upon as a necessary buffer state, she retaliated by the great Greek scheme.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-catherine-ii',
            loc: { section: 'Catherine II.', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Catherine_II.'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'On the 9th of November 1796, she was seized by a fit of apoplexy, and died on the evening of the 10th.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-catherine-ii',
            loc: { section: 'Catherine II.', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Catherine_II.'
          }
        }
      ]
    }
  ]
})
