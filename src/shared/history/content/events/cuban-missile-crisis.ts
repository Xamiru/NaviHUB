import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'cuban-missile-crisis',
  names: [
    { text: 'Cuban Missile Crisis', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1962-10' },
        cites: [
          {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1962-10-28' },
        cites: [
          {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'north-america', 'global'],
  prominence: 1,
  partOf: [
    {
      ref: 'period:cold-war',
      cites: [
        {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'us',
      name: 'United States',
      cites: [
        {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '1' }
        }
      ]
    },
    {
      key: 'soviet',
      name: 'Soviet Union',
      cites: [
        {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:john-f-kennedy',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '4' }
        }
      ]
    },
    {
      ref: 'person:nikita-khrushchev',
      role: 'head-of-government',
      side: 'soviet',
      cites: [
        {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '3' }
        }
      ]
    },
    {
      ref: 'person:fidel-castro',
      role: 'head-of-government',
      cites: [
        {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '3' }
        }
      ]
    },
    {
      name: 'Robert Kennedy',
      role: 'negotiator',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '10' }
        }
      ]
    },
    {
      name: 'Anatoly Dobrynin',
      role: 'diplomat',
      side: 'soviet',
      cites: [
        {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '10' }
        }
      ]
    },
    {
      name: 'John Scali',
      role: 'journalist',
      cites: [
        {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '8' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:bay-of-pigs-invasion', rel: 'related' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/EXCOMM_meeting%2C_Cuban_Missile_Crisis%2C_29_October_1962.jpg/1280px-EXCOMM_meeting%2C_Cuban_Missile_Crisis%2C_29_October_1962.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:EXCOMM_meeting,_Cuban_Missile_Crisis,_29_October_1962.jpg',
    credit: {
      institution: 'John F. Kennedy Presidential Library and Museum',
      creator: 'Cecil Stoughton'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Cuban Missile Crisis of October 1962 was a direct and dangerous confrontation between the United States and the Soviet Union during the Cold War and was the moment when the two superpowers came closest to nuclear conflict. The crisis was unique in a number of ways, featuring calculations and miscalculations as well as direct and secret communications and miscommunications between the two sides. The dramatic crisis was also characterized by the fact that it was primarily played out at the White House and the Kremlin level with relatively little input from the respective bureaucracies typically involved in the foreign policy process.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'After the failed U.S. attempt to overthrow the Castro regime in Cuba with the Bay of Pigs invasion, and while the Kennedy administration planned Operation Mongoose, in July 1962 Soviet premier Nikita Khrushchev reached a secret agreement with Cuban premier Fidel Castro to place Soviet nuclear missiles in Cuba to deter any future invasion attempt.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Kennedy summoned his closest advisers to consider options and direct a course of action for the United States that would resolve the crisis. Some advisers—including all the Joint Chiefs of Staff—argued for an air strike to destroy the missiles, followed by a U.S. invasion of Cuba; others favored stern warnings to Cuba and the Soviet Union. The President decided upon a middle course.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
          }
        },
        {
          id: 'q4',
          text: 'The tone of the President’s remarks was stern, and the message unmistakable and evocative of the Monroe Doctrine: “It shall be the policy of this nation to regard any nuclear missile launched from Cuba against any nation in the Western Hemisphere as an attack by the Soviet Union on the United States, requiring a full retaliatory response upon the Soviet Union.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
          }
        },
        {
          id: 'q5',
          text: 'With no apparent end to the crisis in sight, U.S. forces were placed at DEFCON 2—meaning war involving the Strategic Air Command was imminent. On October 26, Kennedy told his advisors it appeared that only a U.S. attack on Cuba would remove the missiles, but he insisted on giving the diplomatic channel a little more time. The crisis had reached a virtual stalemate.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
          }
        },
        {
          id: 'q6',
          text: 'ABC News correspondent John Scali reported to the White House that he had been approached by a Soviet agent suggesting that an agreement could be reached in which the Soviets would remove their missiles from Cuba if the United States promised not to invade the island.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
          }
        },
        {
          id: 'q7',
          text: 'It was a risky move to ignore the second Khrushchev message. Attorney General Robert Kennedy then met secretly with Soviet Ambassador to the United States, Anatoly Dobrynin, and indicated that the United States was planning to remove the Jupiter missiles from Turkey anyway, and that it would do so soon, but this could not be part of any public resolution of the missile crisis.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The Cuban missile crisis stands as a singular event during the Cold War and strengthened Kennedy’s image domestically and internationally. It also may have helped mitigate negative world opinion regarding the failed Bay of Pigs invasion. Two other important results of the crisis came in unique forms. First, despite the flurry of direct and indirect communications between the White House and the Kremlin—perhaps because of it—Kennedy and Khrushchev, and their advisers, struggled throughout the crisis to clearly understand each others’ true intentions, while the world hung on the brink of possible nuclear war. In an effort to prevent this from happening again, a direct telephone link between the White House and the Kremlin was established; it became known as the “Hotline.” Second, having approached the brink of nuclear conflict, both superpowers began to reconsider the nuclear arms race and took the first steps in agreeing to a nuclear Test Ban Treaty.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
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
            value: { d: '1962-09-04' },
            cites: [
              {
                source: 'state-dept-milestones-cuban-missile-crisis',
                loc: { section: 'The Cuban Missile Crisis, October 1962', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Construction of several missile sites began in the late summer, but U.S. intelligence discovered evidence of a general Soviet arms build-up on Cuba, including Soviet IL–28 bombers, during routine surveillance flights, and on September 4, 1962, President Kennedy issued a public warning against the introduction of offensive weapons into Cuba.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1962-10-14' },
            cites: [
              {
                source: 'state-dept-milestones-cuban-missile-crisis',
                loc: { section: 'The Cuban Missile Crisis, October 1962', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Despite the warning, on October 14 a U.S. U–2 aircraft took several pictures clearly showing sites for medium-range and intermediate-range ballistic nuclear missiles (MRBMs and IRBMs) under construction in Cuba. These images were processed and presented to the White House the next day, thus precipitating the onset of the Cuban Missile Crisis.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1962-10-22' },
            cites: [
              {
                source: 'state-dept-milestones-cuban-missile-crisis',
                loc: { section: 'The Cuban Missile Crisis, October 1962', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On October 22, he ordered a naval “quarantine” of Cuba. The use of “quarantine” legally distinguished this action from a blockade, which assumed a state of war existed; the use of “quarantine” instead of “blockade” also enabled the United States to receive the support of the Organization of American States.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1962-10-24' },
            cites: [
              {
                source: 'state-dept-milestones-cuban-missile-crisis',
                loc: { section: 'The Cuban Missile Crisis, October 1962', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On October 24, Khrushchev responded to Kennedy’s message with a statement that the U.S. “blockade” was an “act of aggression” and that Soviet ships bound for Cuba would be ordered to proceed. Nevertheless, during October 24 and 25, some ships turned back from the quarantine line; others were stopped by U.S. naval forces, but they contained no offensive weapons and so were allowed to proceed.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1962-10-27' },
            cites: [
              {
                source: 'state-dept-milestones-cuban-missile-crisis',
                loc: { section: 'The Cuban Missile Crisis, October 1962', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The next day, October 27, Khrushchev sent another message indicating that any proposed deal must include the removal of U.S. Jupiter missiles from Turkey. That same day a U.S. U–2 reconnaissance jet was shot down over Cuba.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1962-10-28' },
            cites: [
              {
                source: 'state-dept-milestones-cuban-missile-crisis',
                loc: { section: 'The Cuban Missile Crisis, October 1962', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The next morning, October 28, Khrushchev issued a public statement that Soviet missiles would be dismantled and removed from Cuba.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1962-11-20' },
            cites: [
              {
                source: 'state-dept-milestones-cuban-missile-crisis',
                loc: { section: 'The Cuban Missile Crisis, October 1962', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The crisis was over but the naval quarantine continued until the Soviets agreed to remove their IL–28 bombers from Cuba and, on November 20, 1962, the United States ended its quarantine.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1963-04' },
            cites: [
              {
                source: 'state-dept-milestones-cuban-missile-crisis',
                loc: { section: 'The Cuban Missile Crisis, October 1962', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'U.S. Jupiter missiles were removed from Turkey in April 1963.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-cuban-missile-crisis',
          loc: { section: 'The Cuban Missile Crisis, October 1962', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
        }
      }
    }
  ],
  archive: [
    {
      id: 'the-red-threat-1962-10-22',
      mediaKind: 'video',
      title: 'The Red Threat. President Orders Cuban Blockade, 1962/10/22',
      date: { d: '1962-10-22' },
      url: 'https://archive.org/download/1962-10-22_The_Red_Threat/1962-10-22_The_Red_Threat.mp4',
      page: 'https://archive.org/details/1962-10-22_The_Red_Threat',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 18167538,
      durationSec: 189
    },
    {
      id: 'crisis-eases-1962-10-29',
      mediaKind: 'video',
      title: 'Crisis Eases. Wary U.S. Awaits Missile Removal,  1962/10/29',
      date: { d: '1962-10-29' },
      url: 'https://archive.org/download/1962-10-29_Crisis_Eases/1962-10-29_Crisis_Eases_512kb.mp4',
      page: 'https://archive.org/details/1962-10-29_Crisis_Eases',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 8111461,
      durationSec: 112
    }
  ]
})
