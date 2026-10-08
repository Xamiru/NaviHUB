import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'vietnam-war',
  names: [
    { text: 'Vietnam War', lang: 'en', role: 'primary' },
    {
      text: 'Second Indochina War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-guide-wolfson-ford-vietnam-war-1959-1975',
          loc: { section: 'Introduction', para: '13' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1959' },
        cites: [
          {
            source: 'loc-guide-wolfson-ford-vietnam-war-1959-1975',
            loc: { section: 'Introduction', para: '13' }
          },
          {
            source: 'state-dept-milestones-gulf-of-tonkin',
            loc: {
              section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
              para: '3'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1975-04-30' },
        cites: [
          {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'The Final Campaign', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'north-america', 'global'],
  prominence: 1,
  places: [
    {
      ref: 'place:ho-chi-minh-city',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'The Final Campaign', para: '2' }
        }
      ]
    },
    {
      ref: 'place:hanoi',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Escalation of the War', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'north',
      name: 'North Vietnam',
      cites: [
        {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '1'
          }
        }
      ]
    },
    {
      key: 'south',
      name: 'South Vietnam',
      cites: [
        {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '4'
          }
        }
      ]
    },
    {
      key: 'us',
      name: 'United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '1'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:lyndon-b-johnson',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '1'
          }
        },
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Escalation of the War', para: '3' }
        }
      ]
    },
    {
      ref: 'person:john-f-kennedy',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '4'
          }
        }
      ]
    },
    {
      ref: 'person:ho-chi-minh',
      role: 'leader',
      side: 'north',
      cites: [
        {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '4'
          }
        }
      ]
    },
    {
      name: 'Ngo Dinh Diem',
      role: 'leader',
      side: 'south',
      cites: [
        {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '3'
          }
        },
        {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '4'
          }
        }
      ]
    },
    {
      name: 'William C. Westmoreland',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Escalation of the War', para: '4' }
        }
      ]
    },
    {
      name: 'Richard M. Nixon',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Peace Negotiations', para: '1' }
        }
      ]
    },
    {
      name: 'Van Tien Dung',
      role: 'commander',
      side: 'north',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'The Final Campaign', para: '2' }
        }
      ]
    },
    {
      name: 'Duong Van Minh',
      role: 'head-of-state',
      side: 'south',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'The Final Campaign', para: '2' }
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
            value: { min: 3600000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-guide-wolfson-ford-vietnam-war-1959-1975',
                loc: { section: 'Introduction', para: '13' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Asian Division' }
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
            value: { min: 58220 },
            cites: [
              {
                source: 'nara-vietnam-war-us-military-fatal-casualty-statistics',
                loc: { section: 'Vietnam War U.S. Military Fatal Casualty Statistics', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'National Archives and Records Administration' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:sino-soviet-split',
      rel: 'related',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Escalation of the War', para: '1' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Da_Nang%2C_Vietnam._A_young_Marine_private_waits_on_the_beach_during_the_Marine_landing._-_NARA_-_532432_%28restored%29.jpg/1280px-Da_Nang%2C_Vietnam._A_young_Marine_private_waits_on_the_beach_during_the_Marine_landing._-_NARA_-_532432_%28restored%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Da_Nang,_Vietnam._A_young_Marine_private_waits_on_the_beach_during_the_Marine_landing._-_NARA_-_532432_(restored).jpg',
    credit: {
      institution: 'U.S. National Archives and Records Administration (NARA, ARC identifier 532432)'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Vietnam War, also known more recently among scholars as the Second Indochina War, came as the conclusion of the First Indochina War (1945-1954) failed to resolve the basic conflicts between Vietnam (partitioned at the 17th parallel), Cambodia and Laos (left with regroupment areas in 2 provinces). In 1959, fighting resumed in Laos and Vietnam marking the start of the war. The U.S. which had been France\'s main backer became embroiled in the conflict sending ground troops in 1965; while China, Russia and other countries also intervened or were involved. It was an Indochina-wide conflict engulfing all the former colonies of France: Vietnam, Laos and Cambodia. While recent scholarship understands the war as a war to reunify Vietnam or as a Vietnamese internationalized civil war, Laos and Cambodia had different experiences as countries trying to remain neutral to avoid being dragged into the wider conflict amid their own internationalized civil wars. In 1975, new revolutionary governments came to power in all three countries marking the end of the Second Indochina War. In total, an estimated 3.6 million people died in the conflict across Vietnam, Laos and Cambodia.',
          lang: 'en',
          cite: {
            source: 'loc-guide-wolfson-ford-vietnam-war-1959-1975',
            loc: { section: 'Introduction', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://guides.loc.gov/vietnam-war/introduction'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'After the end of the First Indochina War and the Viet Minh defeat of the French at Dien Bien Phu in 1954, the countries meeting at the Geneva Conference divided Vietnam into northern and southern halves, ruled by separate regimes, and scheduled elections to reunite the country under a unified government. The communists seemed likely to win those elections, thanks mostly to their superior organization and greater appeal in the countryside. The United States, however, was dedicated to containing the spread of communist regimes and, invoking the charter of the Southeast Asia Treaty Organization (1954), supported the South Vietnamese leader, Ngo Dinh Diem, when he refused to hold the elections. Diem held control of the South Vietnamese Government, but he could not halt the communist infiltration of the South. By 1959, the Viet Cong, South Vietnamese communist guerillas, and the Viet Minh, began a large scale insurgency in the South that marked the opening of the Second Indochina War.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-of-tonkin',
            loc: {
              section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/gulf-of-tonkin'
          }
        },
        {
          id: 'q3',
          text: 'By 1963, Diem’s rule had so deteriorated that he was overthrown and assassinated by several of his generals with the tacit approval of the Kennedy Administration. Three weeks later, U.S. President John F. Kennedy was also assassinated, and the war continued under new leadership in both countries.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-gulf-of-tonkin',
            loc: {
              section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/gulf-of-tonkin'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q8',
          text: 'The Vietnam Conflict Extract Data File of the Defense Casualty Analysis System (DCAS) Extract Files contains records of 58,220 U.S. military fatal casualties of the Vietnam War.',
          lang: 'en',
          cite: {
            source: 'nara-vietnam-war-us-military-fatal-casualty-statistics',
            loc: { section: 'Vietnam War U.S. Military Fatal Casualty Statistics', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/military/vietnam-war/casualty-statistics'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q14',
          text: 'The events of April 1975 not only abruptly concluded the war but also prepared the way for the official reunification of the country the following year, when the Vietnamese people were brought together under one independent government for the first time in more than a century.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'The Final Campaign', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/31.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1964-08' },
            cites: [
              {
                source: 'state-dept-milestones-gulf-of-tonkin',
                loc: {
                  section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'In early August 1964, two U.S. destroyers stationed in the Gulf of Tonkin in Vietnam radioed that they had been fired upon by North Vietnamese forces. In response to these reported incidents, President Lyndon B. Johnson requested permission from the U.S. Congress to increase the U.S. military presence in Indochina. On August 7, 1964, Congress passed the Gulf of Tonkin Resolution, authorizing President Johnson to take any measures he believed were necessary to retaliate and to promote the maintenance of international peace and security in southeast Asia. This resolution became the legal basis for the Johnson and Nixon Administrations prosecution of the Vietnam War.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '1'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/gulf-of-tonkin'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1964-08-07' },
            cites: [
              {
                source: 'state-dept-milestones-gulf-of-tonkin',
                loc: {
                  section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The Gulf of Tonkin incident and the subsequent Gulf of Tonkin resolution provided the justification for further U.S. escalation of the conflict in Vietnam.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/gulf-of-tonkin'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1965-02-13' },
            cites: [
              {
                source: 'state-dept-milestones-gulf-of-tonkin',
                loc: {
                  section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Operation Rolling Thunder commenced on February 13, 1965 and continued through the spring of 1967.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-gulf-of-tonkin',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: the Gulf of Tonkin and Escalation, 1964',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/gulf-of-tonkin'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1965-03' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'Escalation of the War', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'The first two battalions of U.S. Marines (3,500 men) arrived in Vietnam in March 1965 to protect the U.S. airbase at Da Nang. The following month, Westmoreland convinced the administration to commit sufficient combat troops to secure base areas and mount a series of search and destroy missions. By late 1965, the United States expeditionary force in South Vietnam numbered 180,000, and the military situation had stabilized somewhat.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Escalation of the War', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/vietnam/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1968-01' },
            cites: [
              {
                source: 'state-dept-milestones-tet',
                loc: {
                  section: 'U.S. Involvement in the Vietnam War: The Tet Offensive, 1968',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'In late January, 1968, during the lunar new year (or “Tet”) holiday, North Vietnamese and communist Viet Cong forces launched a coordinated attack against a number of targets in South Vietnam. The U.S. and South Vietnamese militaries sustained heavy losses before finally repelling the communist assault. The Tet Offensive played an important role in weakening U.S. public support for the war in Vietnam.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-tet',
          loc: {
            section: 'U.S. Involvement in the Vietnam War: The Tet Offensive, 1968',
            para: '1'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/tet'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1968-03-31' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'The Tet Offensive', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On March 31, 1968, Johnson announced that he would not seek his party\'s nomination for another term of office, declared a halt to the bombing of North Vietnam (except for a narrow strip above the DMZ), and urged Hanoi to agree to peace talks.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'The Tet Offensive', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/29.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1970-04' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'Peace Negotiations', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In April, Nixon authorized the invasion of Cambodia by a joint United States-ARVN force of 30,000 troops for the purpose of destroying Communist bases across the border.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Peace Negotiations', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/30.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-01-27' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'Peace Negotiations', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Thieu\'s objections to the failure to require the removal of North Vietnamese forces was in the end ignored, and the Agreement on Ending the War and Restoring Peace in Vietnam was signed in Paris on January 27, 1973.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Peace Negotiations', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/30.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1975-04-30' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'The Final Campaign', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On April 30, communist forces entered the capital, and Duong Van Minh ordered ARVN troops to lay down their arms.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'The Final Campaign', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/vietnam/31.htm' }
      }
    }
  ],
  furtherReading: [
    {
      source: 'nguyen-1996-lich-su-khang-chien-chong-my-cuu-nuoc',
      perspective: 'southeast-asian'
    },
    {
      source: 'gaiduk-1996-the-soviet-union-and-the-vietnam-war',
      perspective: 'russian-soviet'
    }
  ]
})
