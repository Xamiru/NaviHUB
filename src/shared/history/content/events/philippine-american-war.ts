import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'philippine-american-war',
  names: [
    { text: 'Philippine-American War', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1899-02-04' },
        cites: [
          {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '2' }
          },
          {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'War of Resistance', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1902-07-04' },
        cites: [
          {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '7' }
          }
        ]
      },
      {
        value: { d: '1903' },
        cites: [
          {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'War of Resistance', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'north-america'],
  prominence: 1,
  places: [
    { ref: 'place:manila' }
  ],
  sides: [
    {
      key: 'us',
      name: 'American forces',
      cites: [
        {
          source: 'state-dept-milestones-philippine-american-war',
          loc: { section: 'The Philippine-American War, 1899–1902', para: '2' }
        }
      ]
    },
    {
      key: 'filipino',
      name: 'Filipino nationalists',
      cites: [
        {
          source: 'state-dept-milestones-philippine-american-war',
          loc: { section: 'The Philippine-American War, 1899–1902', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:emilio-aguinaldo',
      role: 'leader',
      side: 'filipino',
      cites: [
        {
          source: 'state-dept-milestones-philippine-american-war',
          loc: { section: 'The Philippine-American War, 1899–1902', para: '2' }
        }
      ]
    },
    {
      ref: 'person:theodore-roosevelt',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-philippine-american-war',
          loc: { section: 'The Philippine-American War, 1899–1902', para: '7' }
        }
      ]
    },
    {
      name: 'William McKinley',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-philippine-american-war',
          loc: { section: 'The Philippine-American War, 1899–1902', para: '4' }
        }
      ]
    },
    {
      name: 'William Howard Taft',
      role: 'leader',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-philippine-american-war',
          loc: { section: 'The Philippine-American War, 1899–1902', para: '11' }
        }
      ]
    },
    {
      name: 'Ewell S. Otis',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'War of Resistance', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'us',
      value: {
        alts: [
          {
            value: { min: 126000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'War of Resistance', para: '1' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'us',
      value: {
        alts: [
          {
            value: { min: 4200, qualifier: 'over' },
            cites: [
              {
                source: 'state-dept-milestones-philippine-american-war',
                loc: { section: 'The Philippine-American War, 1899–1902', para: '2' }
              }
            ]
          },
          {
            value: { min: 4234 },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'War of Resistance', para: '1' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'filipino',
      value: {
        alts: [
          {
            value: { min: 20000, qualifier: 'over' },
            cites: [
              {
                source: 'state-dept-milestones-philippine-american-war',
                loc: { section: 'The Philippine-American War, 1899–1902', para: '2' }
              }
            ]
          },
          {
            value: { min: 16000 },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'War of Resistance', para: '1' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'civilian-deaths',
      value: {
        alts: [
          {
            value: { min: 200000, qualifier: 'up-to' },
            cites: [
              {
                source: 'state-dept-milestones-philippine-american-war',
                loc: { section: 'The Philippine-American War, 1899–1902', para: '2' }
              },
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'War of Resistance', para: '4' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After its defeat in the Spanish-American War of 1898, Spain ceded its longstanding colony of the Philippines to the United States in the Treaty of Paris. On February 4, 1899, just two days before the U.S. Senate ratified the treaty, fighting broke out between American forces and Filipino nationalists led by Emilio Aguinaldo who sought independence rather than a change in colonial rulers.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
          }
        },
        {
          id: 'q2',
          text: 'Americans tended to refer to the ensuing conflict as an “insurrection” rather than acknowledge the Filipinos’ contention that they were fighting to ward off a foreign invader.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'There were two phases to the Philippine-American War. The first phase, from February to November of 1899, was dominated by Aguinaldo’s ill-fated attempts to fight a conventional war against the better-trained and equipped American troops. The second phase was marked by the Filipinos’ shift to guerrilla-style warfare. It began in November of 1899, lasted through the capture of Aguinaldo in 1901 and into the spring of 1902, by which time most organized Filipino resistance had dissipated.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
          }
        },
        {
          id: 'q4',
          text: 'The war was brutal on both sides. U.S. forces at times burned villages, implemented civilian reconcentration policies, and employed torture on suspected guerrillas, while Filipino fighters also tortured captured soldiers and terrorized civilians who cooperated with American forces.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
          }
        },
        {
          id: 'q5',
          text: 'Even as the fighting went on, the colonial government that the United States established in the Philippines in 1900 under future President William Howard Taft launched a pacification campaign that became known as the “policy of attraction.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'The ensuing Philippine-American War lasted three years and resulted in the death of over 4,200 American and over 20,000 Filipino combatants. As many as 200,000 Filipino civilians died from violence, famine, and disease.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
          }
        },
        {
          id: 'q7',
          text: 'Some 126,000 American soldiers would be committed to the conflict; 4,234 American and 16,000 Filipino soldiers, part of a nationwide guerrilla movement of indeterminate numbers, died.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'War of Resistance', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/15.htm' }
        },
        {
          id: 'q8',
          text: 'According to historian Gregorio Zaide, as many as 200,000 civilians died, largely because of famine and disease, by the end of the war. Atrocities were committed on both sides.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'War of Resistance', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/15.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'In 1907, the Philippines convened its first elected assembly, and in 1916, the Jones Act promised the nation eventual independence. The archipelago became an autonomous commonwealth in 1935, and the U.S. granted independence in 1946.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
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
            value: { d: '1899-02-04' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'War of Resistance', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Hostilities broke out on the night of February 4, 1899, after two American privates on patrol killed three Filipino soldiers in a suburb of Manila.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'War of Resistance', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/15.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1899-11' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'War of Resistance', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Aguinaldo dissolved the regular army in November 1899 and ordered the establishment of decentralized guerrilla commands in each of several military zones.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'War of Resistance', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/15.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1901-03-23' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'War of Resistance', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Aguinaldo was captured at Palanan on March 23, 1901, by a force of Philippine Scouts loyal to the United States and was brought back to Manila.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'War of Resistance', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/15.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1902-07-04' },
            cites: [
              {
                source: 'state-dept-milestones-philippine-american-war',
                loc: { section: 'The Philippine-American War, 1899–1902', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'President Theodore Roosevelt proclaimed a general amnesty and declared the conflict over on July 4, 1902, although minor uprisings and insurrections against American rule periodically occurred in the years that followed.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-philippine-american-war',
          loc: { section: 'The Philippine-American War, 1899–1902', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1899-1913/war'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/The_Philippine_insurrection%2C_1899_LCCN2002736713.jpg/1280px-The_Philippine_insurrection%2C_1899_LCCN2002736713.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Philippine_insurrection,_1899_LCCN2002736713.jpg',
    title: 'The Philippine insurrection, 1899',
    credit: { institution: 'Library of Congress', creator: 'Perley Fremont Rockett' },
    license: { id: 'public-domain' }
  }
})
