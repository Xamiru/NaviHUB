import { definePerson } from '../../schema'

export default definePerson({
  id: 'ulysses-s-grant',
  names: [
    { text: 'Ulysses S. Grant', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1822-04-27' },
        cites: [
          {
            source: 'britannica-1911-grant-ulysses-simpson',
            loc: { section: 'GRANT, ULYSSES SIMPSON', para: '1' }
          },
          { source: 'nps-people-ulysses-s-grant', loc: { section: 'Ulysses S. Grant' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1885-07-23' },
        cites: [
          { source: 'nps-people-ulysses-s-grant', loc: { section: 'Ulysses S. Grant' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:point-pleasant-ohio',
    cites: [
      {
        source: 'britannica-1911-grant-ulysses-simpson',
        loc: { section: 'GRANT, ULYSSES SIMPSON', para: '1' }
      },
      { source: 'nps-people-ulysses-s-grant', loc: { section: 'Ulysses S. Grant' } }
    ]
  },
  regions: ['north-america'],
  roles: ['military', 'head-of-state'],
  offices: [
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      cites: [
        { source: 'nps-people-ulysses-s-grant', loc: { section: 'Ulysses S. Grant' } },
        {
          source: 'britannica-1911-grant-ulysses-simpson',
          loc: { section: 'GRANT, ULYSSES SIMPSON', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Ulysses_S_Grant_by_Brady_c1870-restored.jpg/1280px-Ulysses_S_Grant_by_Brady_c1870-restored.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ulysses_S_Grant_by_Brady_c1870-restored.jpg',
    credit: { institution: 'Library of Congress', creator: 'Mathew Brady' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'GRANT, ULYSSES SIMPSON (1822–1885), American soldier, and eighteenth president of the United States, was born at Point Pleasant, Ohio, on the 27th of April 1822.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-grant-ulysses-simpson',
            loc: { section: 'GRANT, ULYSSES SIMPSON', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Grant,_Ulysses_Simpson'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'With the outbreak of the Civil War in April 1861, Grant offered his services to the U.S. military and quickly rose to fame following his victories at Forts Henry and Donelson, where he earned the nickname "Unconditional Surrender" Grant. He rose through the ranks and was appointed by President Lincoln to become commanding general of all Union armies in March 1864.',
          lang: 'en',
          cite: { source: 'nps-people-ulysses-s-grant', loc: { section: 'Ulysses S. Grant' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nps.gov/people/ulysses-s-grant.htm'
          }
        },
        {
          id: 'q3',
          text: 'After the Civil War Grant was elected the 18th President of the United States in 1868.',
          lang: 'en',
          cite: { source: 'nps-people-ulysses-s-grant', loc: { section: 'Ulysses S. Grant' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nps.gov/people/ulysses-s-grant.htm'
          }
        },
        {
          id: 'q4',
          text: 'During his two terms, Grant supported and signed the 15th Amendment to the Constitution, giving African American men the right to vote.',
          lang: 'en',
          cite: { source: 'nps-people-ulysses-s-grant', loc: { section: 'Ulysses S. Grant' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nps.gov/people/ulysses-s-grant.htm'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'To offset the loss of his personal fortune to a Wall Street scam, Grant wrote his memoirs of the Civil War, which were completed just a few days before his death from throat cancer on July 23, 1885.',
          lang: 'en',
          cite: { source: 'nps-people-ulysses-s-grant', loc: { section: 'Ulysses S. Grant' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nps.gov/people/ulysses-s-grant.htm'
          }
        }
      ]
    }
  ]
})
