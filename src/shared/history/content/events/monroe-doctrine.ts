import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'monroe-doctrine',
  names: [
    { text: 'Monroe Doctrine', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1823-12-02' },
        cites: [
          {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '1' }
          },
          {
            source: 'nara-milestone-monroe-doctrine',
            loc: { section: 'Monroe Doctrine (1823)', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'latin-america'],
  prominence: 2,
  participants: [
    {
      ref: 'person:james-monroe',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-monroe-doctrine',
          loc: { section: 'Monroe Doctrine, 1823', para: '1' }
        }
      ]
    },
    {
      name: 'John Quincy Adams',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-monroe-doctrine',
          loc: { section: 'Monroe Doctrine, 1823', para: '4' }
        }
      ]
    },
    {
      name: 'George Canning',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-monroe-doctrine',
          loc: { section: 'Monroe Doctrine, 1823', para: '4' }
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
          text: 'In his December 2, 1823, address to Congress, President James Monroe articulated United States’ policy on the new political order developing in the rest of the Americas and the role of Europe in the Western Hemisphere.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        },
        {
          id: 'q2',
          text: 'Buried in a routine annual message delivered to Congress by President James Monroe in December 1823, the doctrine warns European nations that the United States would not tolerate further colonization or puppet monarchs.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-monroe-doctrine',
            loc: { section: 'Monroe Doctrine (1823)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/monroe-doctrine'
          }
        },
        {
          id: 'q3',
          text: 'Monroe outlined two separate spheres of influence: the Americas and Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        },
        {
          id: 'q4',
          text: 'In exchange, the United States pledged to avoid involvement in the political affairs of Europe, such as the ongoing Greek struggle for independence from the Ottoman Empire, and not to interfere in the existing European colonies already in the Americas.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: 'As Monroe stated: “The American continents … are henceforth not to be considered as subjects for future colonization by any European powers.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'The statement, known as the Monroe Doctrine, was little noted by the Great Powers of Europe, but eventually became a longstanding tenet of U.S. foreign policy.',
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
          id: 'q7',
          text: 'The doctrine was conceived to meet major concerns of the moment, but it soon became a watchword of U.S. policy in the Western Hemisphere.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-monroe-doctrine',
            loc: { section: 'Monroe Doctrine (1823)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/monroe-doctrine'
          }
        },
        {
          id: 'q8',
          text: 'By the mid-1800s, Monroe’s declaration, combined with ideas of Manifest Destiny, provided precedent and support for U.S. expansion on the American continent.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        },
        {
          id: 'q9',
          text: 'The doctrine’s greatest extension came with Theodore Roosevelt’s Corollary, which inverted the original meaning of the doctrine and came to justify unilateral U.S. intervention in Latin America.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        },
        {
          id: 'q10',
          text: 'Other Latin American nations viewed these interventions with misgiving, and relations between the “great Colossus of the North” and its southern neighbors remained strained for many years.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-monroe-doctrine',
            loc: { section: 'Monroe Doctrine (1823)', para: '7' }
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
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/James_Monroe_White_House_portrait_1819.jpg/1280px-James_Monroe_White_House_portrait_1819.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:James_Monroe_White_House_portrait_1819.jpg',
    credit: {
      institution: 'White House Historical Association',
      creator: 'Samuel Finley Breese Morse'
    },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'tucker-1885',
      mediaKind: 'document',
      title: 'The Monroe Doctrine : a concise history of its origin and growth',
      date: { d: '1885' },
      url: 'https://archive.org/download/cu31924007473030/cu31924007473030.pdf',
      page: 'https://archive.org/details/cu31924007473030',
      credit: {
        institution: 'Cornell University Library (Internet Archive)',
        creator: 'George Fox Tucker'
      },
      license: { id: 'public-domain' },
      bytes: 2835193
    }
  ]
})
