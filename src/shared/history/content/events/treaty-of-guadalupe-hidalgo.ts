import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-guadalupe-hidalgo',
  names: [
    { text: 'Treaty of Guadalupe Hidalgo', lang: 'en', role: 'primary' },
    { text: 'Tratado de Guadalupe Hidalgo', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1848-02-02' },
        cites: [
          {
            source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
            loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '2' }
          },
          {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '11'
            }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:mexico-city',
      cites: [
        {
          source: 'state-dept-milestones-texas-annexation',
          loc: {
            section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
            para: '11'
          }
        }
      ]
    },
    {
      ref: 'place:guadalupe-hidalgo',
      cites: [
        {
          source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
          loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:mexican-american-war' }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:mexico' }
  ],
  participants: [
    {
      name: 'Nicholas Trist',
      role: 'negotiator',
      cites: [
        {
          source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
          loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '3' }
        },
        {
          source: 'state-dept-milestones-texas-annexation',
          loc: {
            section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
            para: '9'
          }
        }
      ]
    },
    {
      name: 'Don Bernardo Couto',
      role: 'negotiator',
      cites: [
        {
          source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
          loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '3' }
        }
      ]
    },
    {
      ref: 'person:james-k-polk',
      role: 'head-of-state',
      cites: [
        {
          source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
          loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '4' }
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
          text: 'The Treaty of Guadalupe Hidalgo, which brought an official end to the Mexican-American War (1846-48), was signed on February 2, 1848, at Guadalupe Hidalgo, a city to which the Mexican government had fled with the advance of U.S. forces.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
            loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo'
          }
        },
        {
          id: 'q2',
          text: 'Under the terms of the treaty, Mexico ceded to the United States approximately 525,000 square miles (55% of its prewar territory) in exchange for a $15 million lump sum payment, and the assumption by the U.S. Government of up to $3.25 million worth of debts owed by Mexico to U.S. citizens.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        },
        {
          id: 'q3',
          text: 'There shall be firm and universal peace between the United States of America and the Mexican Republic, and between their respective countries, territories, cities, towns, and people, without exception of places or persons.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
            loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Trist determined that Washington did not understand the situation in Mexico and negotiated the peace treaty in defiance of the president.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
            loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo'
          }
        },
        {
          id: 'q5',
          text: 'In a December 4, 1847, letter to his wife, Trist wrote, "Knowing it to be the very last chance and impressed with the dreadful consequences to our country which cannot fail to attend the loss of that chance, I decided today at noon to attempt to make a treaty; the decision is altogether my own."',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
            loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo'
          }
        },
        {
          id: 'q6',
          text: 'Although there was substantial opposition to the treaty within the Senate, on March 10, 1848, it passed by a razor-thin margin of 38 to 14.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        },
        {
          id: 'q7',
          text: 'When the Senate reluctantly ratified the treaty (by a vote of 34 to 14) on March 10, 1848, it removed Article X guaranteeing the protection of Mexican land grants.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
            loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'With the annexation of more than 525,000 square miles of land, the Treaty of Guadalupe Hidalgo extended the boundaries of the United States west to the Pacific Ocean.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
            loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo'
          }
        },
        {
          id: 'q9',
          text: 'Other provisions included the protection of property and civil rights of Mexican nationals living within the new boundaries of the United States, the promise of the United States to police its boundaries, and compulsory arbitration of future disputes between the two countries.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
            loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo'
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
            value: { d: '1848-03-10' },
            cites: [
              {
                source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
                loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '6' }
              },
              {
                source: 'state-dept-milestones-texas-annexation',
                loc: {
                  section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
                  para: '12'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Following the ratification, the United States withdrew its troops from the Mexican capital.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
          loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/treaty-of-guadalupe-hidalgo'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Treaty_of_Guadalupe_Hidalgo%2C_last_page.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Treaty_of_Guadalupe_Hidalgo,_last_page.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'vazquez-1997-la-intervencion-norteamericana', perspective: 'latin-american' },
    { source: 'vazquez-1997-mexico-al-tiempo-de-su-guerra', perspective: 'latin-american' }
  ]
})
