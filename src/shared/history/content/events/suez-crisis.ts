import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'suez-crisis',
  names: [
    { text: 'Suez Crisis', lang: 'en', role: 'primary' },
    { text: 'العدوان الثلاثي', lang: 'ar', role: 'native' },
    {
      text: 'Tripartite Invasion',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '29'
          }
        }
      ]
    },
    {
      text: '1956 War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '29'
          }
        }
      ]
    },
    {
      text: 'Operation Musketeer',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'nam-suez-crisis', loc: { section: 'Suez Crisis', para: '36' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1956-07-26' },
        cites: [
          {
            source: 'state-dept-milestones-suez-crisis',
            loc: { section: 'The Suez Crisis, 1956', para: '1' }
          },
          {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '26'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1956-12-22' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '32'
            }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe', 'north-america'],
  prominence: 1,
  places: [
    {
      ref: 'place:suez-canal',
      cites: [
        {
          source: 'state-dept-milestones-suez-crisis',
          loc: { section: 'The Suez Crisis, 1956', para: '1' }
        }
      ]
    },
    {
      ref: 'place:port-said',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '31'
          }
        },
        { source: 'nam-suez-crisis', loc: { section: 'Suez Crisis', para: '29' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:french-fourth-republic' },
    { ref: 'polity:united-states' }
  ],
  sides: [
    {
      key: 'egypt',
      name: 'Egypt',
      polity: 'polity:republic-of-egypt',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '29'
          }
        }
      ]
    },
    {
      key: 'tripartite',
      name: 'Britain, France, and Israel',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '29'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:gamal-abdel-nasser',
      role: 'head-of-state',
      side: 'egypt',
      cites: [
        {
          source: 'state-dept-milestones-suez-crisis',
          loc: { section: 'The Suez Crisis, 1956', para: '1' }
        }
      ]
    },
    {
      name: 'Anthony Eden',
      role: 'head-of-government',
      side: 'tripartite',
      cites: [
        {
          source: 'state-dept-milestones-suez-crisis',
          loc: { section: 'The Suez Crisis, 1956', para: '5' }
        },
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '29'
          }
        }
      ]
    },
    {
      ref: 'person:david-ben-gurion',
      role: 'head-of-government',
      side: 'tripartite',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '30'
          }
        }
      ]
    },
    {
      ref: 'person:dwight-d-eisenhower',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-suez-crisis',
          loc: { section: 'The Suez Crisis, 1956', para: '3' }
        },
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '33'
          }
        }
      ]
    },
    {
      name: 'John Foster Dulles',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-suez-crisis',
          loc: { section: 'The Suez Crisis, 1956', para: '3' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'casualties',
      side: 'egypt',
      value: {
        alts: [
          {
            value: { min: 2700, qualifier: 'about' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: {
                  section: 'The Revolution and the Early Years of the New Government: 1952-56',
                  para: '31'
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
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1956, British and French forces invaded Egypt in collaboration with Israel. Although the military operation was initially a success, the resulting political storm led to a humiliating withdrawal that dealt Britain\'s global prestige a severe blow.',
          lang: 'en',
          cite: { source: 'nam-suez-crisis', loc: { section: 'Suez Crisis', para: '1' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/suez-crisis' }
        },
        {
          id: 'q2',
          text: 'On July 26, 1956, Egyptian President Gamal Abdel Nasser announced the nationalization of the Suez Canal Company, the joint British-French enterprise which had owned and operated the Suez Canal since its construction in 1869.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-suez-crisis',
            loc: { section: 'The Suez Crisis, 1956', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/suez'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'This was seen as a means of funding his Aswan Dam project, a key element of Egypt\'s planned industrialisation, which the Americans had refused to back.',
          lang: 'en',
          cite: { source: 'nam-suez-crisis', loc: { section: 'Suez Crisis', para: '7' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/suez-crisis' }
        },
        {
          id: 'q4',
          text: 'The canal\'s owner was the Suez Canal Company, an international company with headquarters in Paris. Anthony Eden, then British prime minister, called the nationalization of the canal "theft," and United States secretary of state Dulles said Nasser would have to be made to "disgorge" it.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '27'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/32.htm' }
        },
        {
          id: 'q5',
          text: 'On September 9, U.S. Secretary of State John Foster Dulles proposed the creation of a Suez Canal Users’ Association (SCUA), an international consortium of 18 of the world’s leading maritime nations, to operate the Canal.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-suez-crisis',
            loc: { section: 'The Suez Crisis, 1956', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/suez'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The plan, which was supposed to enable Britain and France to gain physical control of the canal, called for Israel to attack across the Sinai Desert. When Israel neared the canal, Britain and France would issue an ultimatum for an Egyptian and Israeli withdrawal from both sides of the canal. An Anglo-French force would then occupy the canal to prevent further fighting and to keep it open to shipping.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '30'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/32.htm' }
        },
        {
          id: 'q7',
          text: 'British bombing destroyed the Egyptian air force, and British and French paratroopers were dropped over Port Said and Port Fuad. The Egyptians put up fierce resistance. Ships were sunk in the canal to prevent transit. In the battle for Port Said, about 2,700 Egyptian civilians and soldiers were killed or wounded.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '31'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/32.htm' }
        },
        {
          id: 'q8',
          text: 'International pressure - especially from the United States, who feared an escalation of the conflict and Soviet intervention - brought the operation to a premature end.',
          lang: 'en',
          cite: { source: 'nam-suez-crisis', loc: { section: 'Suez Crisis', para: '53' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/suez-crisis' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Although it was invaded and occupied for a time, Egypt can claim to have emerged the victor.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '32'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/32.htm' }
        },
        {
          id: 'q10',
          text: 'The Suez crisis also made Nasser the hero of the Arab world, a man who had stood up to Western imperialism and had prevailed.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '36'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/32.htm' }
        },
        {
          id: 'q11',
          text: 'Washington’s public censure of two of its most important allies temporarily soured relations with London and Paris and helped contribute to the resignation of British Prime Minister Anthony Eden in January 1957.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-suez-crisis',
            loc: { section: 'The Suez Crisis, 1956', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/suez'
          }
        },
        {
          id: 'q12',
          text: '4. The one overriding lesson of the Suez operations is that world opinion is now an absolute principle of war and must be treated as such.',
          lang: 'en',
          cite: { source: 'tna-education-lessons-from-suez', loc: { section: 'Lessons from Suez' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2023/https://www.nationalarchives.gov.uk/education/resources/fifties-britain/lessons-suez/'
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
            value: { d: '1956-10-29' },
            cites: [
              {
                source: 'state-dept-milestones-suez-crisis',
                loc: { section: 'The Suez Crisis, 1956', para: '4' }
              },
              { source: 'nam-suez-crisis', loc: { section: 'Suez Crisis', para: '37' } }
            ]
          },
          {
            value: { d: '1956-10-28' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: {
                  section: 'The Revolution and the Early Years of the New Government: 1952-56',
                  para: '31'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In keeping with these plans, Israeli forces attacked across Egypt’s Sinai Peninsula on October 29, 1956, advancing to within 10 miles of the Suez Canal.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-suez-crisis',
          loc: { section: 'The Suez Crisis, 1956', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1953-1960/suez'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1956-10-31' },
            cites: [
              {
                source: 'eisenhower-library-presidential-years',
                loc: { section: 'Presidential Years' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'October 31, 1956: President Eisenhower, deploring Anglo-French-Israeli attack on Egypt, promised that United States would not support this action.',
        lang: 'en',
        cite: {
          source: 'eisenhower-library-presidential-years',
          loc: { section: 'Presidential Years' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.eisenhowerlibrary.gov/eisenhowers/presidential-years'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1956-11-05' },
            cites: [
              { source: 'nam-suez-crisis', loc: { section: 'Suez Crisis', para: '39' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On 5 November, 3rd Battalion The Parachute Regiment seized the airfield at El Gamil, while French paratroopers took Port Fuad.',
        lang: 'en',
        cite: { source: 'nam-suez-crisis', loc: { section: 'Suez Crisis', para: '39' } },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/suez-crisis' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1956-11-06' },
            cites: [
              {
                source: 'state-dept-milestones-suez-crisis',
                loc: { section: 'The Suez Crisis, 1956', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In response, the Eisenhower administration, concerned about dissociating the United States from European colonialism—especially in light of its strident condemnation of the Soviet intervention in Hungary the same week—as well as the possibility that the Soviets would intervene to assist Nasser, pressured Britain and France to accept a United Nations ceasefire on November 6.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-suez-crisis',
          loc: { section: 'The Suez Crisis, 1956', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1953-1960/suez'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/British_carriers_during_Suez_Crisis_1956.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:British_carriers_during_Suez_Crisis_1956.jpg',
    credit: { institution: 'Imperial War Museums' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'suez-canal-seized-by-egyptians-1956',
      mediaKind: 'video',
      title: 'Suez Canal Seized By Egyptians,  1956/07/30',
      date: { d: '1956-07-30' },
      url: 'https://archive.org/download/1956-07-30_Suez_Canal_Seized/1956-07-30_Suez_Canal_Seized.mp4',
      page: 'https://archive.org/details/1956-07-30_Suez_Canal_Seized',
      credit: { institution: 'Internet Archive' },
      license: { id: 'public-domain', url: 'https://creativecommons.org/licenses/publicdomain/' },
      bytes: 3946877,
      durationSec: 41
    }
  ],
  furtherReading: [
    { source: 'heikal-1986-milaffat-al-suways', perspective: 'arab' },
    { source: 'heikal-1986-cutting-the-lions-tail', perspective: 'arab' },
    { source: 'dayan-1966-diary-of-the-sinai-campaign', perspective: 'israeli' }
  ]
})
