import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'liberian-independence',
  names: [
    { text: 'Independence of Liberia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'independence',
  start: {
    alts: [
      {
        value: { d: '1847' },
        cites: [
          {
            source: 'state-dept-milestones-founding-of-liberia',
            loc: { section: 'Founding of Liberia, 1847', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:monrovia',
      cites: [
        {
          source: 'state-dept-milestones-founding-of-liberia',
          loc: { section: 'Founding of Liberia, 1847', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Joseph Jenkins Roberts',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-founding-of-liberia',
          loc: { section: 'Founding of Liberia, 1847', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The U.S. Government had provided Liberia some financial support, but Washington expected Monrovia to move toward self-sufficiency. Commerce was the first economic sector to grow in the colony. However, French and British traders continually encroached upon Liberian territory. As it was not a sovereign state, it was hard-pressed to defend its economic interests. The U.S. Government lent some diplomatic support, but Britain and France had territories in West Africa and were better poised to act. As a result, in 1847, Liberia declared independence from the American Colonization Society in order to establish a sovereign state and create its own laws governing commerce.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-founding-of-liberia',
            loc: { section: 'Founding of Liberia, 1847', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1830-1860/liberia'
          }
        },
        {
          id: 'q2',
          text: 'The resulting state of Liberia would become the second (after Haiti) black republic in the world at that time.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-founding-of-liberia',
            loc: { section: 'Founding of Liberia, 1847', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/liberia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1816, a group of white Americans founded the American Colonization Society (ACS) to deal with the “problem” of the growing number of free blacks in the United States by resettling them in Africa.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-founding-of-liberia',
            loc: { section: 'Founding of Liberia, 1847', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/liberia'
          }
        },
        {
          id: 'q4',
          text: 'In that same year, the settlement was named Liberia and its capital Monrovia, in honor of President James Monroe who had procured more U.S. Government money for the project.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-founding-of-liberia',
            loc: { section: 'Founding of Liberia, 1847', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/liberia'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Because of fears of the impact this might have on the issue of slavery in the United States, Washington did not recognize the nation it had played a role in creating.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-founding-of-liberia',
            loc: { section: 'Founding of Liberia, 1847', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/liberia'
          }
        },
        {
          id: 'q8',
          text: 'The United States finally established diplomatic relations with Liberia in 1862, and continued to maintain strong ties until the 1990s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-founding-of-liberia',
            loc: { section: 'Founding of Liberia, 1847', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/liberia'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1848' },
            cites: [
              {
                source: 'state-dept-milestones-founding-of-liberia',
                loc: { section: 'Founding of Liberia, 1847', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Despite protests by the affected British companies, London was the first to extend recognition to the new republic, signing a treaty of commerce and friendship with Monrovia in 1848.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-founding-of-liberia',
          loc: { section: 'Founding of Liberia, 1847', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1830-1860/liberia'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Joseph_Jenkins_Roberts.jpg/1280px-Joseph_Jenkins_Roberts.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Joseph_Jenkins_Roberts.jpg',
    credit: { institution: 'Library of Congress', creator: 'Augustus Washington' },
    license: { id: 'public-domain' }
  }
})
