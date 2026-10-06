import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'indian-removal-act',
  names: [
    { text: 'Indian Removal Act', lang: 'en', role: 'primary' },
    {
      text: 'Removal Act of 1830',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-indian-treaties',
          loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1830-05-28' },
        cites: [
          {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '2'
            }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 1,
  participants: [
    {
      ref: 'person:andrew-jackson',
      role: 'head-of-state',
      cites: [
        {
          source: 'nara-milestone-jackson-message-indian-removal',
          loc: {
            section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
            para: '2'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:trail-of-tears',
      rel: 'led-to',
      cites: [
        {
          source: 'nps-trail-of-tears-brief-history',
          loc: { section: 'History & Culture: A Brief History', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'As the 19th century began, land-hungry Americans poured into the backcountry of the coastal South and began moving toward and into what would later become the states of Alabama and Mississippi.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        },
        {
          id: 'q2',
          text: 'Since Indian tribes living there appeared to be the main obstacle to westward expansion, white settlers petitioned the federal government to remove them.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        },
        {
          id: 'q3',
          text: 'In the early 1800s, American demand for Indian nations\' land increased, and momentum grew to force American Indians further west.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'The first major step to relocate American Indians came when Congress passed, and President Andrew Jackson signed, the Indian Removal Act of May 28, 1830.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        },
        {
          id: 'q5',
          text: 'The Act established a process whereby the President could grant land west of the Mississippi River to Indian tribes that agreed to give up their homelands.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        },
        {
          id: 'q6',
          text: 'As incentives, the law allowed the Indians financial and material assistance to travel to their new locations and start new lives and guaranteed that the Indians would live on their new property under the protection of the United States Government forever.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'In general terms, Jackson’s government succeeded.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        },
        {
          id: 'q8',
          text: 'By the end of Jackson’s Presidency, his administration had negotiated almost 70 removal treaties.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        },
        {
          id: 'q9',
          text: 'Most Indians fiercely resisted this policy, but as the 1830s wore on, most of the major tribes – the Choctaws, Muscogee Creeks, Seminoles, and Chickasaws – agreed to be relocated to Indian Territory (in present-day Oklahoma).',
          lang: 'en',
          cite: {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/trte/learn/historyculture/index.htm'
          }
        },
        {
          id: 'q10',
          text: 'The Seminole tribe in Florida resisted, in the Second Seminole War (1835–1842) and the Third Seminole War (1855–1858), however, neither appeasement nor resistance worked.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q11',
          text: 'By the 1840s, nearly all Indian tribes had been driven west, which is exactly what the Indian Removal Act intended to accomplish.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Ralph_Eleaser_Whiteside_Earl_-_Andrew_Jackson_-_Smithsonian.jpg/1280px-Ralph_Eleaser_Whiteside_Earl_-_Andrew_Jackson_-_Smithsonian.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ralph_Eleaser_Whiteside_Earl_-_Andrew_Jackson_-_Smithsonian.jpg',
    credit: { institution: 'Smithsonian American Art Museum', creator: 'Ralph Eleaser Whiteside Earl' },
    license: { id: 'public-domain' }
  }
})
