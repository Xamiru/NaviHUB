import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'american-civil-war',
  names: [
    { text: 'American Civil War', lang: 'en', role: 'primary' },
    { text: 'Civil War', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1861-04-12' },
        cites: [
          {
            source: 'nps-gett-civil-war-timeline',
            loc: { section: 'Civil War Timeline', para: '13' }
          },
          {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1865-04-09' },
        cites: [
          {
            source: 'nps-gett-civil-war-timeline',
            loc: { section: 'Civil War Timeline', para: '143' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 1,
  places: [
    {
      ref: 'place:fort-sumter',
      cites: [
        {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '13' }
        }
      ]
    },
    {
      ref: 'place:appomattox-court-house',
      cites: [
        {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '143' }
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
          source: 'nps-reardon-the-military-experience',
          loc: { section: 'The Military Experience', para: '4' }
        }
      ]
    },
    {
      key: 'csa',
      name: 'Confederate States of America',
      polity: 'polity:confederate-states-of-america',
      cites: [
        {
          source: 'nps-reardon-the-military-experience',
          loc: { section: 'The Military Experience', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abraham-lincoln',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'nps-reardon-the-military-experience',
          loc: { section: 'The Military Experience', para: '9' }
        }
      ]
    },
    {
      ref: 'person:jefferson-davis',
      role: 'head-of-state',
      side: 'csa',
      cites: [
        {
          source: 'nps-reardon-the-military-experience',
          loc: { section: 'The Military Experience', para: '10' }
        }
      ]
    },
    {
      ref: 'person:ulysses-s-grant',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'nps-reardon-the-military-experience',
          loc: { section: 'The Military Experience', para: '21' }
        }
      ]
    },
    {
      name: 'William T. Sherman',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'nps-reardon-the-military-experience',
          loc: { section: 'The Military Experience', para: '22' }
        }
      ]
    },
    {
      ref: 'person:robert-e-lee',
      role: 'commander',
      side: 'csa',
      cites: [
        {
          source: 'nps-reardon-the-military-experience',
          loc: { section: 'The Military Experience', para: '16' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'military-deaths',
      value: {
        alts: [
          {
            value: { min: 620000, qualifier: 'over' },
            cites: [
              {
                source: 'nps-reardon-the-military-experience',
                loc: { section: 'The Military Experience', para: '27' }
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
          text: 'In 1861, eleven states seceded from the United States to form the Confederate States of America and, over the course of the next four years, the U.S. fought to bring the Confederate States back under control.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-civil-war-and-international-diplomacy',
            loc: { section: '1861–1865: The Civil War and International Diplomacy', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/foreword'
          }
        },
        {
          id: 'q2',
          text: 'When the bombardment of Fort Sumter began on April 12, 1861, neither the United States nor the new Confederate States of America foresaw a prolonged war. Each side confidently predicted a short conflict and inevitable victory.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Theoretically, at least, the North held insurmountable advantages.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        },
        {
          id: 'q4',
          text: 'Jefferson Davis and the nine million residents in the new Confederacy - including four million slaves - could not match that.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Growing disillusionment, long casualty lists, and homefront sacrifices spawned bread riots in the South, anti-draft riots in the North, and desertions from both armies.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        },
        {
          id: 'q6',
          text: 'In March 1864, however, Lincoln promoted General Grant - fresh from a November victory at Chattanooga - to command the entire Union Army. The two men completely redesigned the Union war plan.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'With these two surrenders, the military operations all but ended.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        },
        {
          id: 'q8',
          text: 'The Union was preserved, but at great cost in blood and treasure.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        },
        {
          id: 'q9',
          text: 'The Civil War cost over 620,000 military deaths from all causes.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        },
        {
          id: 'q10',
          text: 'The outcome of the Civil War resulted in a strengthening of U.S. foreign power and influence, as the definitive Union defeat of the Confederacy firmly demonstrated the strength of the United States Government and restored its legitimacy to handle the sectional tensions that had complicated U.S. external relations in the years before the Civil War. The renewed strength of the U.S. Government led to the defeat of French intervention in Mexico, and hastened the confederation of Canada in 1867.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-consequences-of-union-victory',
            loc: { section: 'The Consequences of Union Victory, 1865', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/victory'
          }
        },
        {
          id: 'q11',
          text: 'Union victory also ensured continuing support for the international abolishment of racial slavery.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-consequences-of-union-victory',
            loc: { section: 'The Consequences of Union Victory, 1865', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/victory'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q12',
          text: 'Northerners responded with a Union victory narrative, arguing that Federal troops and ingenuity, as well as Lincoln\'s astute leadership, had saved the country from division and ruin, and at least in some circles for a long time, they also argued that they had freed the slaves and expanded the possibilities of American freedom forever.',
          lang: 'en',
          cite: {
            source: 'nps-blight-civil-war-in-american-memory',
            loc: { section: 'The Civil War in American Memory', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-civil-war-in-american-memory.htm'
          }
        },
        {
          id: 'q13',
          text: 'What Americans know about the Civil War, and what they believe about the Civil War, are sometimes uncomfortably far apart.',
          lang: 'en',
          cite: {
            source: 'nps-cw150-legacy-of-the-civil-war',
            loc: { section: 'The Legacy of the Civil War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/features/waso/cw150th/reflections/legacy/page5.html'
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
            value: { d: '1861-04-12' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'April 12, 1861- Confederate forces fire upon Fort Sumter, South Carolina. The Civil War formally begins.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1861-07-21' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'July 21, 1861- The Battle of Bull Run (or First Manassas), is fought near Manassas, Virginia.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '20' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1862-09-17' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '46' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'September 17, 1862- The Battle of Antietam (or Sharpsburg), Maryland, the bloodiest single day of the Civil War. The result of the battle ends Confederate General Lee\'s first invasion of the North.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '46' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1863-07-01' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '65' }
              },
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '54' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'July 1-3- Battle of Gettysburg, Pennsylvania. The bloodiest battle of the Civil War dashes Robert E. Lee\'s hopes for a successful invasion of the North.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '65' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1863-11-19' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '78' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'November 19, 1863- Dedication of the Soldiers\' National Cemetery at Gettysburg. President Abraham Lincoln delivers the Gettysburg Address.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '78' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1864-05-07' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '97' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'May 7, 1864- Beginning of the Atlanta Campaign.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '97' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-04-09' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '143' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'April 9, 1865- Battle of Appomattox Court House and Surrender, Appomattox Court House, Virginia. After an early morning attempt to break through Federal forces blocking the route west to Danville, Virginia, Lee seeks an audience with General Grant to discuss terms. That afternoon in the parlor of Wilmer McLean, Lee signs the document of surrender. On April 12, the Army of Northern Virginia formally surrenders and is disbanded.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '143' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-04-26' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '146' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'April 26, 1865- General Joseph Johnston signs the surrender document for the Confederate Army of the Tennessee and miscellaneous Confederate troops attached to his command at Bennett\'s Place near Durham, North Carolina.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '146' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/The_battle_of_Gettysburg%2C_Pa._July_3d._1863_LCCN90709061.jpg/1280px-The_battle_of_Gettysburg%2C_Pa._July_3d._1863_LCCN90709061.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_battle_of_Gettysburg,_Pa._July_3d._1863_LCCN90709061.jpg',
    credit: { institution: 'Library of Congress', creator: 'Currier & Ives' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'ameur-2004-la-guerre-de-secession', perspective: 'european' },
    { source: 'ivanov-1960-grazhdanskaya-voina-v-ssha', perspective: 'russian-soviet' },
    {
      source: 'malkin-1939-grazhdanskaya-voina-v-ssha-i-tsarskaya-rossiya',
      perspective: 'russian-soviet'
    }
  ]
})
