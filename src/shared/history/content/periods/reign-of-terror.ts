import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-terror',
  names: [
    { text: 'Reign of Terror', lang: 'en', role: 'primary' },
    {
      text: 'the Terror',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-french-revolution',
          loc: { section: 'The United States and the French Revolution, 1789–1799', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1793' },
        cites: [
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '63' }
          },
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '62' }
          }
        ]
      },
      {
        value: { d: '1794' },
        cites: [
          {
            source: 'state-dept-milestones-french-revolution',
            loc: { section: 'The United States and the French Revolution, 1789–1799', para: '6' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1794-07-27' },
        cites: [
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '72' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/F%C3%AAte_de_l%27Etre_supr%C3%AAme_2.jpg/1280px-F%C3%AAte_de_l%27Etre_supr%C3%AAme_2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:F%C3%AAte_de_l%27Etre_supr%C3%AAme_2.jpg',
    credit: { institution: 'Musée Carnavalet (Paris Musées)', creator: 'Pierre-Antoine Demachy' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Royalist and Girondin insurrections and the critical aspect of the war favoured the establishment of what is known as the reign of terror.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '63' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'Two new laws placed almost everybody at the mercy of the government.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '64' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q3',
          text: 'Two days after the festival his friend Couthon presented the crowning law of the Terror, known as the Law of 22 Prairial.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '70' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q4',
          text: 'Such was the revolution of the 9th Thermidor (27th of July 1794) which ended the Reign of Terror.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '72' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q5',
          text: 'In a period of fifteen months, it has been calculated, about 17,000 persons had been executed in France under form of law.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '73' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'By imbuing Frenchmen with such a mutual hatred as nothing but the arm of despotic power could control the Reign of Terror rendered political liberty impossible for many years.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '73' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q7',
          text: 'The Reign of Terror was the expedient of a party which knew its weakness and unpopularity.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '100' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    }
  ]
})
