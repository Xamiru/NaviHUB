import { definePerson } from '../../schema'

export default definePerson({
  id: 'john-quincy-adams',
  names: [
    { text: 'John Quincy Adams', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1767-07-11' },
        cites: [
          {
            source: 'britannica-1911-adams-john-quincy',
            loc: { section: 'ADAMS, JOHN QUINCY', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1848-02-23' },
        cites: [
          {
            source: 'britannica-1911-adams-john-quincy',
            loc: { section: 'ADAMS, JOHN QUINCY', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'diplomat'],
  offices: [
    {
      title: 'Secretary of State of the United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'britannica-1911-adams-john-quincy',
          loc: { section: 'ADAMS, JOHN QUINCY', para: '3' }
        },
        {
          source: 'britannica-1911-adams-john-quincy',
          loc: { section: 'ADAMS, JOHN QUINCY', para: '4' }
        }
      ]
    },
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'britannica-1911-adams-john-quincy',
          loc: { section: 'ADAMS, JOHN QUINCY', para: '1' }
        },
        {
          source: 'britannica-1911-adams-john-quincy',
          loc: { section: 'ADAMS, JOHN QUINCY', para: '5' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/John_Quincy_Adams_-_copy_of_1843_Philip_Haas_Daguerreotype.jpg/1280px-John_Quincy_Adams_-_copy_of_1843_Philip_Haas_Daguerreotype.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:John_Quincy_Adams_-_copy_of_1843_Philip_Haas_Daguerreotype.jpg',
    credit: {
      institution: 'The Metropolitan Museum of Art',
      creator: 'Southworth & Hawes after Philip Haas'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ADAMS, JOHN QUINCY (1767–1848), eldest son of President John Adams, sixth president of the United States, was born on the 11th of July 1767, in that part of Braintree that is now Quincy, Massachusetts, and was named after John Quincy (1689–1767), his mother’s grandfather, who was for many years a prominent member of the Massachusetts legislature.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-adams-john-quincy',
            loc: { section: 'ADAMS, JOHN QUINCY', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Adams,_John_Quincy'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'After accomplishing little in London, he returned to the United States in the summer of 1817 to become secretary of state in the cabinet of President Monroe.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-adams-john-quincy',
            loc: { section: 'ADAMS, JOHN QUINCY', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Adams,_John_Quincy'
          }
        },
        {
          id: 'q3',
          text: 'As secretary of state, Adams played the leading part in two most important episodes—the acquisition of Florida and the promulgation of the Monroe Doctrine.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-adams-john-quincy',
            loc: { section: 'ADAMS, JOHN QUINCY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Adams,_John_Quincy'
          }
        },
        {
          id: 'q4',
          text: 'Up to this point Adams’s career had been almost uniformly successful, but his presidency (1825–1829) was in most respects a failure, owing to the virulent opposition of the Jacksonians;',
          lang: 'en',
          cite: {
            source: 'britannica-1911-adams-john-quincy',
            loc: { section: 'ADAMS, JOHN QUINCY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Adams,_John_Quincy'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'On the 21st of February 1848, after having suffered a previous stroke of apoplexy, he fell insensible on the floor of the Representatives’ chamber, and two days later died.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-adams-john-quincy',
            loc: { section: 'ADAMS, JOHN QUINCY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Adams,_John_Quincy'
          }
        }
      ]
    }
  ]
})
