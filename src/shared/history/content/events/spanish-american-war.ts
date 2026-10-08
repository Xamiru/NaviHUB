import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'spanish-american-war',
  names: [
    { text: 'Spanish–American War', lang: 'en', role: 'primary' },
    { text: 'Guerra hispano-estadounidense', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1898-04-25' },
        cites: [
          {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '5' }
          },
          {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'Outbreak of War, 1898', para: '1' }
          },
          { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '6' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1898-12-10' },
        cites: [
          {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '8' }
          },
          { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '58' } },
          {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'latin-america', 'southeast-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:havana',
      cites: [
        {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '3' }
        }
      ]
    },
    {
      ref: 'place:manila',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'us',
      name: 'United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '1' }
        }
      ]
    },
    {
      key: 'spain',
      name: 'Spain',
      polity: 'polity:kingdom-of-spain',
      cites: [
        {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:william-mckinley',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '4' }
        }
      ]
    },
    {
      ref: 'person:theodore-roosevelt',
      role: 'participant',
      side: 'us',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '1' }
        }
      ]
    },
    {
      name: 'George Dewey',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '1' }
        },
        {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '6' }
        }
      ]
    },
    {
      ref: 'person:emilio-aguinaldo',
      role: 'combatant',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '2' }
        }
      ]
    },
    {
      name: 'Fermín Jaudenes',
      role: 'commander',
      side: 'spain',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:philippine-american-war',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '7' }
        },
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '5' }
        }
      ]
    },
    { ref: 'event:annexation-of-hawaii', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Spanish-American War of 1898 ended Spain’s colonial empire in the Western Hemisphere and secured the position of the United States as a Pacific power.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        },
        {
          id: 'q2',
          text: 'U.S. victory in the war produced a peace treaty that compelled the Spanish to relinquish claims on Cuba, and to cede sovereignty over Guam, Puerto Rico, and the Philippines to the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '1' }
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
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'By early 1898, tensions between the United States and Spain had been mounting for months.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        },
        {
          id: 'q4',
          text: 'Sober observers and an initial report by the colonial government of Cuba concluded that the explosion had occurred on board, but Hearst and Pulitzer, who had for several years been selling papers by fanning anti-Spanish public opinion in the United States, published rumors of plots to sink the ship.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-yellow-journalism',
            loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/yellow-journalism'
          }
        },
        {
          id: 'q5',
          text: 'When a U.S. naval investigation later stated that the explosion had come from a mine in the harbor, the proponents of yellow journalism seized upon it and called for war.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-yellow-journalism',
            loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/yellow-journalism'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The future Secretary of State John Hay described the ensuing conflict as a “splendid little war.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        },
        {
          id: 'q7',
          text: 'The agreement between Jaudenes and Dewey marked a curious reversal of roles. At the beginning of the war, Americans and Filipinos had been allies against Spain in all but name; now Spanish and Americans were in a partnership that excluded the insurgents.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'Outbreak of War, 1898', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/13.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Apart from guaranteeing the independence of Cuba, the treaty also forced Spain to cede Guam and Puerto Rico to the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        },
        {
          id: 'q9',
          text: 'The U.S. Senate ratified the treaty on February 6, 1899, by a margin of only one vote.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
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
            value: { d: '1898-02-15' },
            cites: [
              {
                source: 'state-dept-milestones-spanish-american-war',
                loc: { section: 'The Spanish-American War, 1898', para: '3' }
              },
              {
                source: 'state-dept-milestones-yellow-journalism',
                loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'After the U.S. battleship Maine exploded and sank in Havana harbor under mysterious circumstances on February 15, 1898, U.S. military intervention in Cuba became likely.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-04-20' },
            cites: [
              {
                source: 'state-dept-milestones-spanish-american-war',
                loc: { section: 'The Spanish-American War, 1898', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On April 20, the U.S. Congress passed a joint resolution that acknowledged Cuban independence, demanded that the Spanish government give up control of the island, foreswore any intention on the part of the United States to annex Cuba, and authorized McKinley to use whatever military measures he deemed necessary to guarantee Cuba’s independence.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-04-25' },
            cites: [
              {
                source: 'state-dept-milestones-spanish-american-war',
                loc: { section: 'The Spanish-American War, 1898', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'That same day, Spain declared war on the United States, and the U.S. Congress voted to go to war against Spain on April 25.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-05-01' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'Outbreak of War, 1898', para: '1' }
              },
              {
                source: 'state-dept-milestones-spanish-american-war',
                loc: { section: 'The Spanish-American War, 1898', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The Spanish navy, which had seen its apogee in the support of a global empire in the sixteenth century, suffered an inglorious defeat on May 1, 1898, as Spain\'s antiquated fleet, including ships with wooden hulls, was sunk by the guns of Dewey\'s flagship, the Olympia, and other United States warships.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-07-03' },
            cites: [
              {
                source: 'state-dept-milestones-spanish-american-war',
                loc: { section: 'The Spanish-American War, 1898', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'After isolating and defeating the Spanish Army garrisons in Cuba, the U.S. Navy destroyed the Spanish Caribbean squadron on July 3 as it attempted to escape the U.S. naval blockade of Santiago.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-08-12' },
            cites: [
              {
                source: 'state-dept-milestones-spanish-american-war',
                loc: { section: 'The Spanish-American War, 1898', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On July 26, at the behest of the Spanish government, the French ambassador in Washington, Jules Cambon, approached the McKinley Administration to discuss peace terms, and a cease-fire was signed on August 12.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-08-13' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'Outbreak of War, 1898', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The mock battle was staged on August 13.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-12-10' },
            cites: [
              {
                source: 'state-dept-milestones-spanish-american-war',
                loc: { section: 'The Spanish-American War, 1898', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'The war officially ended four months later, when the U.S. and Spanish governments signed the Treaty of Paris on December 10, 1898.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/San_Juan_Hill_by_Kurz_and_Allison.JPG/1280px-San_Juan_Hill_by_Kurz_and_Allison.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:San_Juan_Hill_by_Kurz_and_Allison.JPG',
    credit: { creator: 'Kurz and Allison' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'roig-de-leuchsenring-1975-cuba-no-debe-su-independencia',
      perspective: 'latin-american'
    },
    {
      source: 'gomez-nunez-1900-la-guerra-hispano-americana-la-habana',
      perspective: 'european'
    }
  ]
})
