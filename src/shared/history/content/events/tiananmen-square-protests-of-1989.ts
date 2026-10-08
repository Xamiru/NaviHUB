import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'tiananmen-square-protests-of-1989',
  names: [
    { text: 'Tiananmen Square protests of 1989', lang: 'en', role: 'primary' },
    { text: '六四事件', lang: 'zh', role: 'native' },
    {
      text: 'Tiananmen Square, 1989',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '0' }
        }
      ]
    },
    {
      text: 'turmoil',
      lang: 'en',
      role: 'contested',
      cites: [
        {
          source: 'deng-1989-address-to-officers-enforcing-martial-law-in-beijing',
          loc: {
            section: 'Address to Officers at the Rank of General and Above in Command of the Troops Enforcing Martial Law in Beijing',
            para: '6'
          }
        }
      ],
      usedBy: [
        { kind: 'party', name: 'Chinese Communist Party' }
      ]
    },
    {
      text: 'counter-revolutionary rebellion',
      lang: 'en',
      role: 'contested',
      cites: [
        {
          source: 'deng-1989-address-to-officers-enforcing-martial-law-in-beijing',
          loc: {
            section: 'Address to Officers at the Rank of General and Above in Command of the Troops Enforcing Martial Law in Beijing',
            para: '6'
          }
        }
      ],
      usedBy: [
        { kind: 'party', name: 'Chinese Communist Party' }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1989-04-15' },
        cites: [
          {
            source: 'state-dept-milestones-tiananmen-square-1989',
            loc: { section: 'Tiananmen Square, 1989', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1989-06-04' },
        cites: [
          {
            source: 'state-dept-milestones-tiananmen-square-1989',
            loc: { section: 'Tiananmen Square, 1989', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:tiananmen-square',
      cites: [
        {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '3' }
        }
      ]
    },
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:peoples-republic-of-china' }
  ],
  sides: [
    {
      key: 'protesters',
      name: 'Protesters in Tiananmen Square',
      cites: [
        {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '5' }
        }
      ]
    },
    {
      key: 'government',
      name: 'Chinese government and the People’s Liberation Army',
      polity: 'polity:peoples-republic-of-china',
      cites: [
        {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:deng-xiaoping',
      role: 'leader',
      side: 'government',
      cites: [
        {
          source: 'deng-1989-address-to-officers-enforcing-martial-law-in-beijing',
          loc: {
            section: 'Address to Officers at the Rank of General and Above in Command of the Troops Enforcing Martial Law in Beijing',
            para: '2'
          }
        }
      ]
    },
    {
      name: 'Zhao Ziyang',
      role: 'head-of-government',
      side: 'government',
      cites: [
        {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '4' }
        }
      ]
    },
    {
      name: 'Hu Yaobang',
      role: 'participant',
      cites: [
        {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '3' }
        }
      ]
    },
    {
      ref: 'person:mikhail-gorbachev',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '5' }
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
            value: { min: 200, qualifier: 'over' },
            cites: [
              {
                source: 'state-dept-milestones-tiananmen-square-1989',
                loc: { section: 'Tiananmen Square, 1989', para: '6' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'People’s Republic of China (Chinese government)' }
            ]
          },
          {
            value: { min: 180, max: 500 },
            cites: [
              {
                source: 'nsarchive-ebb16-tiananmen-square-1989-the-declassified-history-documents',
                loc: {
                  section: 'Tiananmen Square, 1989: The Declassified History: Documents',
                  para: '22'
                }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'United States Department of State' }
            ]
          },
          {
            value: { min: 500, max: 2600 },
            cites: [
              {
                source: 'nsarchive-ebb16-tiananmen-square-1989-the-declassified-history-documents',
                loc: {
                  section: 'Tiananmen Square, 1989: The Declassified History: Documents',
                  para: '70'
                }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'United States Department of State' }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 3000, qualifier: 'over' },
            cites: [
              {
                source: 'state-dept-milestones-tiananmen-square-1989',
                loc: { section: 'Tiananmen Square, 1989', para: '6' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'People’s Republic of China (Chinese government)' }
            ]
          },
          {
            value: { min: 10000, qualifier: 'up-to' },
            cites: [
              {
                source: 'nsarchive-ebb16-tiananmen-square-1989-the-declassified-history-documents',
                loc: {
                  section: 'Tiananmen Square, 1989: The Declassified History: Documents',
                  para: '70'
                }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'United States Department of State' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:revolutions-of-1989',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
        }
      ]
    },
    {
      ref: 'event:perestroika-and-glasnost',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '5' }
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
          text: 'The Chinese army crackdown in and around Tiananmen Square on June 4, 1989 had an enormous effect on the course of U.S.-China relations.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb16-tiananmen-square-1989-the-declassified-history-documents',
            loc: {
              section: 'Tiananmen Square, 1989: The Declassified History: Documents',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB16/documents/index.html'
          }
        },
        {
          id: 'q2',
          text: 'The demonstration became a forum to protest corruption and inflation, and call for broader political and economic reforms to build on the reforms that had already transformed China considerably in the post-Mao era.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tiananmen-square-1989',
            loc: { section: 'Tiananmen Square, 1989', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The establishment of formal diplomatic relations between the United States and the People’s Republic of China in 1979, together with Chinese Vice Premier Deng Xiaoping’s economic reforms, inaugurated a decade of vibrant cultural exchange and expanding economic ties between the two countries.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tiananmen-square-1989',
            loc: { section: 'Tiananmen Square, 1989', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The Chinese leadership was divided on how to handle the demonstrations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tiananmen-square-1989',
            loc: { section: 'Tiananmen Square, 1989', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
          }
        },
        {
          id: 'q5',
          text: 'Some protestors initiated hunger strikes to increase pressure on the government. Foreign media that arrived to cover the visit turned their attention to the protests and heightened international—especially Western—awareness of the protesters and their demands. The crowds in the Square grew beyond students to include a broad segment of Chinese society, from workers to ordinary citizens from Beijing and beyond, and reportedly exceeded one million in number.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tiananmen-square-1989',
            loc: { section: 'Tiananmen Square, 1989', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Similar protests that had taken place in other Chinese cities were soon suppressed and their leaders imprisoned.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tiananmen-square-1989',
            loc: { section: 'Tiananmen Square, 1989', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
          }
        },
        {
          id: 'q7',
          text: 'In the aftermath, President George H.W. Bush denounced the actions in Tiananmen Square and suspended military sales as well as high level exchanges with Chinese officials. Many members of the U.S. Congress, the American public, and international leaders advocated broader economic sanctions, some of which were implemented.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tiananmen-square-1989',
            loc: { section: 'Tiananmen Square, 1989', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q9',
          text: 'The April 26th editorial in People’s Daily described the disturbance as turmoil. The word “turmoil” is quite appropriate. It is this word that some people object to and are trying to change. But facts show that the assessment is accurate. It was also inevitable that the turmoil should grow into a counter-revolutionary rebellion.',
          lang: 'en',
          cite: {
            source: 'deng-1989-address-to-officers-enforcing-martial-law-in-beijing',
            loc: {
              section: 'Address to Officers at the Rank of General and Above in Command of the Troops Enforcing Martial Law in Beijing',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/reference/archive/deng-xiaoping/1989/5.htm'
          }
        },
        {
          id: 'q8',
          text: 'This disturbance would have occurred sooner or later. It was determined by both the international environment and the domestic environment. It was bound to occur, whether one wished it or not; the only question was the time and the scale.',
          lang: 'en',
          cite: {
            source: 'deng-1989-address-to-officers-enforcing-martial-law-in-beijing',
            loc: {
              section: 'Address to Officers at the Rank of General and Above in Command of the Troops Enforcing Martial Law in Beijing',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/reference/archive/deng-xiaoping/1989/5.htm'
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
            value: { d: '1989-04-15' },
            cites: [
              {
                source: 'state-dept-milestones-tiananmen-square-1989',
                loc: { section: 'Tiananmen Square, 1989', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The demonstrations began on April 15, when Chinese students gathered in Beijing’s Tiananmen Square, where so many student and mass demonstrations had taken place since the early 20th century, to mark the death of the popular pro-reform Chinese leader Hu Yaobang.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-04-26' },
            cites: [
              {
                source: 'state-dept-milestones-tiananmen-square-1989',
                loc: { section: 'Tiananmen Square, 1989', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'As the numbers of protesters swelled to the tens of thousands, some leaders who saw the protests as a direct challenge to Communist Party rule labeled the demonstrators “counter-revolutionary” in an April 26 editorial in the government-run People’s Daily newspaper.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-05-04' },
            cites: [
              {
                source: 'state-dept-milestones-tiananmen-square-1989',
                loc: { section: 'Tiananmen Square, 1989', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Other officials sympathetic to the protestors’ demands for political reform favored a conciliatory approach, as represented by General Secretary of the Communist Party Zhao Ziyang’s visit with protestors on May 4 to hear and acknowledge their concerns.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-05-20' },
            cites: [
              {
                source: 'state-dept-milestones-tiananmen-square-1989',
                loc: { section: 'Tiananmen Square, 1989', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The Chinese leadership imposed martial law in Beijing on May 20.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-06-04' },
            cites: [
              {
                source: 'state-dept-milestones-tiananmen-square-1989',
                loc: { section: 'Tiananmen Square, 1989', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On the night of June 3 and 4, the People’s Liberation Army stormed the Square with tanks, crushing the protests with terrible human costs.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-tiananmen-square-1989',
          loc: { section: 'Tiananmen Square, 1989', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Tiananmen_Square%2C_Beijing%2C_China_1988_%281%29.jpg/1280px-Tiananmen_Square%2C_Beijing%2C_China_1988_%281%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tiananmen_Square,_Beijing,_China_1988_(1).jpg',
    credit: { creator: 'Derzsi Elekes Andor' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  furtherReading: [
    { source: 'zhao-2009-prisoner-of-the-state', perspective: 'chinese' }
  ]
})
