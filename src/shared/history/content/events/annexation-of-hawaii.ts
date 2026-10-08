import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'annexation-of-hawaii',
  names: [
    { text: 'Annexation of Hawaii', lang: 'en', role: 'primary' },
    {
      text: 'Newlands Resolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '14'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1898-07-07' },
        cites: [
          {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '1'
            }
          },
          {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '14'
            }
          },
          { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '36' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'National Archives and Records Administration' },
          { kind: 'organization', name: 'Deutsches Historisches Museum' }
        ]
      },
      {
        value: { d: '1898-08-12' },
        cites: [
          {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '9' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
        ]
      }
    ]
  },
  regions: ['oceania', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:hawaiian-islands',
      cites: [
        {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '2'
          }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      ref: 'person:liliuokalani',
      role: 'victim',
      cites: [
        {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '8'
          }
        }
      ]
    },
    {
      name: 'Sanford Dole',
      role: 'leader',
      cites: [
        {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '7'
          }
        },
        {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '14'
          }
        }
      ]
    },
    {
      ref: 'person:william-mckinley',
      role: 'head-of-state',
      cites: [
        {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '11'
          }
        },
        {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '14'
          }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:spanish-american-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Supported by John Stevens, the U.S. Minister to Hawaii, and a contingent of Marines from the warship, U.S.S. Boston, the Committee overthrew Queen Lili\'uokalani in a bloodless coup on January 17, 1893.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        },
        {
          id: 'q2',
          text: 'The overthrow of Lili\'uokalani and imposition of the Republic of Hawaii was contrary to the will of the native Hawaiians.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'When the Hawaiian islands were formally annexed by the United States in 1898, the event marked the end of a lengthy internal struggle between native Hawaiians and non-native American businessmen for control of the Hawaiian government.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        },
        {
          id: 'q4',
          text: 'The McKinley Administration also used the war as a pretext to annex the independent state of Hawaii.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The pro-annexation forces in Congress submitted a proposal to annex the Hawaiian Islands by joint resolution, which required only a simple majority vote in both houses. This controversial approach eliminated the 2/3 majority needed to ratify a treaty; as a result, the necessary support for annexation was in place.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '14'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'As a territory, Hawaii had little power in the U.S. government, holding only one, non-voting representative in the House of Representatives.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '16'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
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
            value: { d: '1893-01-17' },
            cites: [
              {
                source: 'nara-milestone-joint-resolution-annexing-hawaii',
                loc: {
                  section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
                  para: '8'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The Committee of Safety proclaimed itself to be the Provisional Government.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '8'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1897-06-16' },
            cites: [
              {
                source: 'nara-milestone-joint-resolution-annexing-hawaii',
                loc: {
                  section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
                  para: '11'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On June 16, 1897, McKinley and three representatives of the government of the Republic of Hawaii – Lorrin Thurston, Francis Hatch, and William Kinney – signed a treaty of annexation.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '11'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1897' },
            cites: [
              {
                source: 'nara-milestone-joint-resolution-annexing-hawaii',
                loc: {
                  section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
                  para: '12'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In the fall of 1897, a Petition Against Annexation was signed by 21,269 native Hawaiian people – more than half of the 39,000 native Hawaiians and mixed-blood persons reported by the Hawaiian Commission census that year.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '12'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-07-07' },
            cites: [
              {
                source: 'nara-milestone-joint-resolution-annexing-hawaii',
                loc: {
                  section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
                  para: '14'
                }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'National Archives and Records Administration' }
            ]
          },
          {
            value: { d: '1898-08-12' },
            cites: [
              {
                source: 'state-dept-milestones-spanish-american-war',
                loc: { section: 'The Spanish-American War, 1898', para: '9' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Office of the Historian, U.S. Department of State'
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'House Joint Resolution 259, 55th Congress, 2nd session, known as the "Newlands Resolution," passed Congress and was signed into law by President McKinley on July 7, 1898 — the Hawaiian islands were officially annexed by the United States.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-joint-resolution-annexing-hawaii',
          loc: {
            section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
            para: '14'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Lowering_the_Hawaiian_flag_at_Annexation_ceremony_%28PPWD-8-3-006%29.jpg/1280px-Lowering_the_Hawaiian_flag_at_Annexation_ceremony_%28PPWD-8-3-006%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lowering_the_Hawaiian_flag_at_Annexation_ceremony_(PPWD-8-3-006).jpg',
    credit: { institution: 'Hawaii State Archives', creator: 'Frank Davey' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'hawaiis-story-1898',
      mediaKind: 'document',
      title: 'Hawaii\'s story by Hawaii\'s queen, Liliuokalani',
      date: { d: '1898' },
      url: 'https://archive.org/download/hawaiisstorybyh00lili/hawaiisstorybyh00lili.pdf',
      page: 'https://archive.org/details/hawaiisstorybyh00lili',
      credit: {
        institution: 'Smithsonian Libraries (Internet Archive)',
        creator: 'Liliuokalani, Queen of Hawaii, 1838-1917'
      },
      license: { id: 'public-domain' },
      bytes: 35327203
    }
  ],
  furtherReading: [
    { source: 'silva-2004-aloha-betrayed', perspective: 'pacific' },
    { source: 'liliuokalani-1898-hawaiis-story', perspective: 'pacific' }
  ]
})
