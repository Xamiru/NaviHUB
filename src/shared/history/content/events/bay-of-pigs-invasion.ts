import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bay-of-pigs-invasion',
  names: [
    { text: 'Bay of Pigs Invasion', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1961-04-17' },
        cites: [
          {
            source: 'state-dept-milestones-bay-of-pigs',
            loc: {
              section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
              para: '4'
            }
          },
          {
            source: 'nara-text-message-bay-of-pigs-60th-anniversary',
            loc: {
              section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
              para: '7'
            }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'north-america'],
  prominence: 2,
  partOf: [
    {
      ref: 'period:cold-war',
      cites: [
        {
          source: 'state-dept-milestones-bay-of-pigs',
          loc: {
            section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
            para: '3'
          }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'brigade',
      name: 'Brigade 2506',
      cites: [
        {
          source: 'state-dept-milestones-bay-of-pigs',
          loc: {
            section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
            para: '3'
          }
        },
        {
          source: 'nara-text-message-bay-of-pigs-60th-anniversary',
          loc: {
            section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
            para: '4'
          }
        }
      ]
    },
    {
      key: 'cuba',
      name: 'Cuban armed forces',
      cites: [
        {
          source: 'state-dept-milestones-bay-of-pigs',
          loc: {
            section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
            para: '4'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:john-f-kennedy',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-bay-of-pigs',
          loc: {
            section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
            para: '4'
          }
        }
      ]
    },
    {
      ref: 'person:dwight-d-eisenhower',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-bay-of-pigs',
          loc: {
            section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
            para: '3'
          }
        }
      ]
    },
    {
      ref: 'person:fidel-castro',
      role: 'commander',
      side: 'cuba',
      cites: [
        {
          source: 'state-dept-milestones-bay-of-pigs',
          loc: {
            section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
            para: '4'
          }
        }
      ]
    },
    {
      name: 'Robert F. Kennedy',
      role: 'participant',
      cites: [
        {
          source: 'nara-text-message-bay-of-pigs-60th-anniversary',
          loc: {
            section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
            para: '9'
          }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'brigade',
      value: {
        alts: [
          {
            value: { min: 1400, qualifier: 'about' },
            cites: [
              {
                source: 'nara-text-message-bay-of-pigs-60th-anniversary',
                loc: {
                  section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
                  para: '7'
                }
              },
              {
                source: 'nara-pieces-of-history-jfk-cold-war-calculations',
                loc: { section: 'JFK’s Cold War Calculations', para: '1' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      side: 'brigade',
      value: {
        alts: [
          {
            value: { min: 1200, qualifier: 'about' },
            cites: [
              {
                source: 'nara-text-message-bay-of-pigs-60th-anniversary',
                loc: {
                  section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
                  para: '7'
                }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:cuban-revolution', rel: 'related' },
    { ref: 'event:cuban-missile-crisis', rel: 'related' }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/A4D-2_Skyhawks_of_VA-34_in_flight_over_USS_Essex_%28CVS-9%29_during_the_Bay_of_Pigs_Invasion_in_April_1961.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A4D-2_Skyhawks_of_VA-34_in_flight_over_USS_Essex_(CVS-9)_during_the_Bay_of_Pigs_Invasion_in_April_1961.jpg',
    credit: {
      institution: 'Office of the Historian, U.S. Department of State (Robert L. Lawson Photograph Collection)',
      creator: 'Robert L. Lawson'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In April 1961, a short few months into his administration, Kennedy authorized a clandestine invasion of Cuba by a brigade of Cuban exiles. The CIA covert operation had been formulated and approved under President Eisenhower. Relying on faulty intelligence, the operation collapsed in two days with the defeat and capture of anti-Castro forces at the Bay of Pigs.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-1961-1968-foreword',
            loc: {
              section: '1961–1968: The Presidencies of John F. Kennedy and Lyndon B. Johnson',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/foreword'
          }
        },
        {
          id: 'q2',
          text: 'Following his election in November 1960, President John F. Kennedy learned of the invasion plan, concluded that Fidel Castro was a Soviet client posing a threat to all of Latin America and, after consultations with his advisors, gave his consent for the CIA-planned clandestine invasion of Cuba to proceed. Launched from Guatemala, the attack went wrong almost from the start. Components of Brigade 2506 landed at the Bay of Pigs on April 17, 1961 and were defeated within 2 days by Cuban armed forces under the direct command of Castro.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bay-of-pigs',
            loc: {
              section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/bay-of-pigs'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In March 1960, President Dwight D. Eisenhower directed the Central Intelligence Agency (CIA) to develop a plan for the invasion of Cuba and overthrow of the Castro regime. The CIA organized an operation in which it trained and funded a force of exiled counter-revolutionary Cubans serving as the armed wing of the Democratic Revolutionary Front, known as Brigade 2506.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bay-of-pigs',
            loc: {
              section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/bay-of-pigs'
          }
        },
        {
          id: 'q4',
          text: 'The CIA recruited Cuban refugees in 1960 – forming Brigade 2506, and conducted tactical military training in Guatemala for more than 13 weeks.',
          lang: 'en',
          cite: {
            source: 'nara-text-message-bay-of-pigs-60th-anniversary',
            loc: {
              section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://text-message.blogs.archives.gov/2021/04/15/60th-anniversary-of-the-bay-of-pigs/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Castro’s army maintained full control of Cuba’s airspace and destroyed more than half of the invader’s air support. Disguised American B-26 planes, ordered by President Kennedy, were ordered to help the brigade’s invasion but arrived too late and were shot down. Brigade 2506 continued their invasion but with their supplies depleted, two sunken ships, and no reinforcements, they were forced to retreat leading to a failed invasion and capture of about 1,200 brigadiers.',
          lang: 'en',
          cite: {
            source: 'nara-text-message-bay-of-pigs-60th-anniversary',
            loc: {
              section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://text-message.blogs.archives.gov/2021/04/15/60th-anniversary-of-the-bay-of-pigs/'
          }
        },
        {
          id: 'q6',
          text: 'Although planning for the invasion began under the Eisenhower administration, President Kennedy opted to approve the operation upon taking office. But the invasion was doomed as soon as the CIA-trained exiles landed ashore in Cuba. The Soviet-supplied Cuban military was well equipped and had overwhelming resources in terms of manpower.',
          lang: 'en',
          cite: {
            source: 'nara-pieces-of-history-jfk-cold-war-calculations',
            loc: { section: 'JFK’s Cold War Calculations', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://prologue.blogs.archives.gov/2011/04/20/jfks-cold-war-calculations/'
          }
        },
        {
          id: 'q7',
          text: 'Once failure appeared imminent, military personnel and CIA officials scrambled to persuade Kennedy to deploy U.S. air cover in hopes of salvaging the operation. The President, however, refused to approve the direct military intervention sought by the advisors who had fully endorsed the invasion’s initial provisions.',
          lang: 'en',
          cite: {
            source: 'nara-pieces-of-history-jfk-cold-war-calculations',
            loc: { section: 'JFK’s Cold War Calculations', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://prologue.blogs.archives.gov/2011/04/20/jfks-cold-war-calculations/'
          }
        },
        {
          id: 'q8',
          text: 'In the end, Cuban forces easily defeated the undermanned exile brigade within three days.',
          lang: 'en',
          cite: {
            source: 'nara-pieces-of-history-jfk-cold-war-calculations',
            loc: { section: 'JFK’s Cold War Calculations', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://prologue.blogs.archives.gov/2011/04/20/jfks-cold-war-calculations/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'The failed invasion strengthened the position of Castro’s administration, which proceeded to openly proclaim its intention to adopt socialism and pursue closer ties with the Soviet Union. It also led to a reassessment of Cuba policy by the Kennedy administration. The President established a committee under former Army Chief of Staff General Maxwell Taylor and Attorney General Robert Kennedy to examine the causes of the defeat suffered at the Bay of Pigs.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bay-of-pigs',
            loc: {
              section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/bay-of-pigs'
          }
        },
        {
          id: 'q10',
          text: 'The captured brigadiers remained imprisoned for almost two years after the invasion. The prisoners were released after a deal between the United States and Cuba was made: $53 million worth of food and medicine in exchange for the Cuban exiles.',
          lang: 'en',
          cite: {
            source: 'nara-text-message-bay-of-pigs-60th-anniversary',
            loc: {
              section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://text-message.blogs.archives.gov/2021/04/15/60th-anniversary-of-the-bay-of-pigs/'
          }
        },
        {
          id: 'q11',
          text: 'For both President Kennedy and the United States, the Bay of Pigs was an undeniable loss on the battlefield of the Cold War. But history has shown Kennedy’s political sagacity during the invasion’s failure. The president understood that if the U.S. intervened militarily in Cuba, that the Soviet Union was likely to retaliate against Berlin or another high value target.',
          lang: 'en',
          cite: {
            source: 'nara-pieces-of-history-jfk-cold-war-calculations',
            loc: { section: 'JFK’s Cold War Calculations', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://prologue.blogs.archives.gov/2011/04/20/jfks-cold-war-calculations/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'Operation Mongoose was designed to do what the Bay of Pigs invasion failed to do: remove the Communist Castro regime from power in Cuba.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bay-of-pigs',
            loc: {
              section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/bay-of-pigs'
          }
        },
        {
          id: 'q13',
          text: 'After the Bay of Pigs invasion, Cuba’s status in the world changed as they became a known and feared force in the middle of the Cold War, especially with their quickly growing relationship with the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'nara-text-message-bay-of-pigs-60th-anniversary',
            loc: {
              section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://text-message.blogs.archives.gov/2021/04/15/60th-anniversary-of-the-bay-of-pigs/'
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
            value: { d: '1961-04-17' },
            cites: [
              {
                source: 'nara-text-message-bay-of-pigs-60th-anniversary',
                loc: {
                  section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'During the night of April 17, 1961 five combat divers entered the Bay of Pigs (Bahía de los Cochinos) and directed four ships carrying Brigade 2506, composed of about 1,400 Cuban exiles.',
        lang: 'en',
        cite: {
          source: 'nara-text-message-bay-of-pigs-60th-anniversary',
          loc: {
            section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://text-message.blogs.archives.gov/2021/04/15/60th-anniversary-of-the-bay-of-pigs/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1961-04-20' },
            cites: [
              {
                source: 'nara-pieces-of-history-jfk-cold-war-calculations',
                loc: { section: 'JFK’s Cold War Calculations', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On April 20, 1961, exactly three months after his inauguration, President John F. Kennedy addressed the American Society of Newspaper Editors (ASNE) regarding the Bay of Pigs invasion.',
        lang: 'en',
        cite: {
          source: 'nara-pieces-of-history-jfk-cold-war-calculations',
          loc: { section: 'JFK’s Cold War Calculations', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://prologue.blogs.archives.gov/2011/04/20/jfks-cold-war-calculations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1961-11' },
            cites: [
              {
                source: 'state-dept-milestones-bay-of-pigs',
                loc: {
                  section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
                  para: '6'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'This examination and policy assessment, initiated in May 1961, led in November of that year to a decision to implement a new covert program in Cuba, with the codename of Operation Mongoose.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-bay-of-pigs',
          loc: {
            section: 'The Bay of Pigs Invasion and its Aftermath, April 1961–October 1962',
            para: '6'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/bay-of-pigs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1962-12-29' },
            cites: [
              {
                source: 'nara-text-message-bay-of-pigs-60th-anniversary',
                loc: {
                  section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
                  para: '11'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'After the first prisoners arrived in the United States, President Kennedy invited the brigadiers to the Orange Bowl in Miami, Florida on December 29, 1962 expressing appreciation to the Brigade and their flag.',
        lang: 'en',
        cite: {
          source: 'nara-text-message-bay-of-pigs-60th-anniversary',
          loc: {
            section: 'The Ex-Men Did It: 60th Anniversary of the Bay of Pigs Invasion',
            para: '11'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://text-message.blogs.archives.gov/2021/04/15/60th-anniversary-of-the-bay-of-pigs/'
        }
      }
    }
  ],
  archive: [
    {
      id: 'cuba-invaded-1961-04-19',
      mediaKind: 'video',
      title: 'Cuba Invaded. Foes of Castro Open Offensive, 1961/04/19',
      date: { d: '1961-04-19' },
      url: 'https://archive.org/download/1961-04-19_Cuba_Invaded/1961-04-19_Cuba_Invaded.mp4',
      page: 'https://archive.org/details/1961-04-19_Cuba_Invaded',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 12502791,
      durationSec: 129
    }
  ]
})
