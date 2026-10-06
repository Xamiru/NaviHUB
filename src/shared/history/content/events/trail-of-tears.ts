import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'trail-of-tears',
  names: [
    { text: 'Trail of Tears', lang: 'en', role: 'primary' },
    {
      text: 'Cherokee removal',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'nps-trail-of-tears-brief-history',
          loc: { section: 'History & Culture: A Brief History', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'migration',
  start: {
    alts: [
      {
        value: { d: '1838-05' },
        cites: [
          {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1839-03' },
        cites: [
          {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  participants: [
    {
      name: 'John Ross',
      role: 'leader',
      cites: [
        {
          source: 'nps-trail-of-tears-brief-history',
          loc: { section: 'History & Culture: A Brief History', para: '2' }
        }
      ]
    },
    {
      name: 'Winfield Scott',
      role: 'commander',
      cites: [
        {
          source: 'nps-trail-of-tears-brief-history',
          loc: { section: 'History & Culture: A Brief History', para: '2' }
        },
        {
          source: 'nara-milestone-jackson-message-indian-removal',
          loc: {
            section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
            para: '7'
          }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 3000, max: 4000 },
            cites: [
              {
                source: 'state-dept-milestones-indian-treaties',
                loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '11' }
              }
            ]
          },
          {
            value: { min: 4000, qualifier: 'about' },
            cites: [
              {
                source: 'nara-milestone-jackson-message-indian-removal',
                loc: {
                  section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
                  para: '8'
                }
              }
            ]
          },
          {
            value: { min: 1000, qualifier: 'over' },
            cites: [
              {
                source: 'nps-trail-of-tears-brief-history',
                loc: { section: 'History & Culture: A Brief History', para: '3' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 16000, qualifier: 'over' },
            cites: [
              {
                source: 'nps-trail-of-tears-brief-history',
                loc: { section: 'History & Culture: A Brief History', para: '2' }
              }
            ]
          },
          {
            value: { min: 15000, max: 16000 },
            cites: [
              {
                source: 'state-dept-milestones-indian-treaties',
                loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '11' }
              }
            ]
          },
          {
            value: { min: 16000 },
            cites: [
              {
                source: 'nara-milestone-jackson-message-indian-removal',
                loc: {
                  section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
                  para: '8'
                }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The Cherokee were forced to move because a small, rump faction of the tribe signed the Treaty of New Echota in late 1835, a treaty that the U.S. Senate ratified in May 1836.',
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
          id: 'q2',
          text: 'The Cherokee Nation resisted, however, challenging in court the Georgia laws that restricted their freedoms on tribal lands.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        },
        {
          id: 'q3',
          text: 'The treaty was opposed by many members of the Cherokee Nation; and when they refused to leave, Maj. Gen. Winfield Scott was ordered to push them out. He was given 3,000 troops and the authority to raise additional state militia and volunteer troops to force removal.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '7'
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
          text: 'In May 1838, the Cherokee removal process began.',
          lang: 'en',
          cite: {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/trte/learn/historyculture/index.htm'
          }
        },
        {
          id: 'q5',
          text: 'U.S. Army troops, along with various state militia, moved into the tribe’s homelands and forcibly evicted more than 16,000 Cherokee Indian people from their homelands in Tennessee, Alabama, North Carolina, and Georgia.',
          lang: 'en',
          cite: {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/trte/learn/historyculture/index.htm'
          }
        },
        {
          id: 'q6',
          text: 'Ross, honoring that pledge, orchestrated the migration of fourteen detachments, most of which traveled over existing roads, between August and December 1838.',
          lang: 'en',
          cite: {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/trte/learn/historyculture/index.htm'
          }
        },
        {
          id: 'q7',
          text: 'During the fall and winter of 1838-39, the Cherokees were forcibly moved from their homes to the Indian Territory—some having to walk as many as 1,000 miles over a four-month period.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '8'
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
      kind: 'casualties',
      quotes: [
        {
          id: 'q8',
          text: 'More than a thousand Cherokee – particularly the old, the young, and the infirm – died during their trip west, hundreds more deserted from the detachments, and an unknown number – perhaps several thousand – perished from the consequences of the forced migration.',
          lang: 'en',
          cite: {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/trte/learn/historyculture/index.htm'
          }
        },
        {
          id: 'q9',
          text: 'Approximately 4,000 of 16,000 Cherokees died along the way.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        },
        {
          id: 'q10',
          text: 'The best evidence indicates that between three and four thousand out of the fifteen to sixteen thousand Cherokees died en route from the brutal conditions of the “Trail of Tears.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '11' }
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q11',
          text: 'The tragic relocation was completed by the end of March 1839, and resettlement of tribal members in Oklahoma began soon afterward.',
          lang: 'en',
          cite: {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/trte/learn/historyculture/index.htm'
          }
        },
        {
          id: 'q12',
          text: 'The Cherokee, in the years that followed, struggled to reassert themselves in the new, unfamiliar land.',
          lang: 'en',
          cite: {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/trte/learn/historyculture/index.htm'
          }
        }
      ]
    }
  ]
})
