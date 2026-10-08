import { definePerson } from '../../schema'

export default definePerson({
  id: 'james-monroe',
  names: [
    { text: 'James Monroe', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1758-04-28' },
        cites: [
          {
            source: 'britannica-1911-monroe-james',
            loc: { section: 'MONROE, JAMES', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1831-07-04' },
        cites: [
          {
            source: 'britannica-1911-monroe-james',
            loc: { section: 'MONROE, JAMES', para: '4' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:new-york-city',
    cites: [
      { source: 'britannica-1911-monroe-james', loc: { section: 'MONROE, JAMES', para: '4' } }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-monroe-doctrine',
          loc: { section: 'Monroe Doctrine, 1823', para: '1' }
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
          text: 'Monroe and his Secretary of State John Quincy Adams drew upon a foundation of American diplomatic ideals such as disentanglement from European affairs and defense of neutral rights as expressed in Washington’s Farewell Address and Madison’s stated rationale for waging the War of 1812.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        },
        {
          id: 'q2',
          text: 'Monroe’s administration forewarned the imperial European powers against interfering in the affairs of the newly independent Latin American states or potential United States territories.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        },
        {
          id: 'q3',
          text: 'The European powers, according to Monroe, were obligated to respect the Western Hemisphere as the United States\' sphere of interest.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-monroe-doctrine',
            loc: { section: 'Monroe Doctrine (1823)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/monroe-doctrine'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/James_Monroe_White_House_portrait_1819.jpg/1280px-James_Monroe_White_House_portrait_1819.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:James_Monroe_White_House_portrait_1819.jpg',
    credit: {
      institution: 'White House Historical Association',
      creator: 'Samuel Finley Breese Morse'
    },
    license: { id: 'public-domain' }
  }
})
