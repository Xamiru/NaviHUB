import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'falklands-war',
  names: [
    { text: 'Falklands War', lang: 'en', role: 'primary' },
    { text: 'Guerra de las Malvinas', lang: 'es', role: 'native' },
    {
      text: 'Anglo-Argentine War of 1982',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '0'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1982-04-02' },
        cites: [
          {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '1'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1982-06-14' },
        cites: [
          {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '8'
            }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:falkland-islands',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'place:port-stanley',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '8'
          }
        },
        {
          source: 'hansard-commons-1982-06-15-falkland-islands',
          loc: { section: 'Falkland Islands (15 June 1982)', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:argentina' }
  ],
  sides: [
    {
      key: 'uk',
      name: 'United Kingdom',
      polity: 'polity:united-kingdom',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '1'
          }
        }
      ]
    },
    {
      key: 'argentina',
      name: 'Argentina',
      polity: 'polity:argentina',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '1'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:margaret-thatcher',
      role: 'head-of-government',
      side: 'uk',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '1'
          }
        }
      ]
    },
    {
      name: 'Leopoldo Galtieri',
      role: 'leader',
      side: 'argentina',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '1'
          }
        }
      ]
    },
    {
      name: 'Alexander M. Haig, Jr.',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '4'
          }
        }
      ]
    },
    {
      ref: 'person:ronald-reagan',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '3'
          }
        }
      ]
    },
    {
      name: 'General Menendez',
      role: 'commander',
      side: 'argentina',
      cites: [
        {
          source: 'hansard-commons-1982-06-15-falkland-islands',
          loc: { section: 'Falkland Islands (15 June 1982)', para: '3' }
        }
      ]
    },
    {
      name: 'General Moore',
      role: 'commander',
      side: 'uk',
      cites: [
        {
          source: 'hansard-commons-1982-06-15-falkland-islands',
          loc: { section: 'Falkland Islands (15 June 1982)', para: '3' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'prisoners',
      side: 'argentina',
      value: {
        alts: [
          {
            value: { min: 15000, qualifier: 'about' },
            cites: [
              {
                source: 'hansard-commons-1982-06-15-falkland-islands',
                loc: { section: 'Falkland Islands (15 June 1982)', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'United Kingdom government' }
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
          text: 'Early on the morning of April 2, 1982, Argentine military forces landed on the Falkland Islands (Spanish: Islas Malvinas) in the southern Atlantic Ocean.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
          }
        },
        {
          id: 'q2',
          text: 'British victory in the field brought an end to the 1982 Falklands/Malvinas crisis.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Argentina had maintained a claim to the islands dating to its independence from Spain in 1816; beginning in 1833, however, the United Kingdom had established a presence on the islands and developed them as a British colony.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
          }
        },
        {
          id: 'q4',
          text: 'Over the past 15 years, successive British Governments have held a series of meetings with the Argentine Government to discuss the dispute. In many of these meetings elected representatives of the islanders have taken part. We have always made it clear that their wishes were paramount and that there would be no change in sovereignty without their consent and without the approval of the House.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1982-04-03-falkland-islands',
            loc: { section: 'Falkland Islands (3 April 1982)', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1982/apr/03/falkland-islands'
          }
        },
        {
          id: 'q5',
          text: 'Two weeks ago—on 19 March—the latest in this series of incidents affecting sovereignty occurred; and the deterioration in relations between the British and Argentine Governments which culminated in yesterday\'s Argentine invasion began. The incident appeared at the start to be relatively minor. But we now know it was the beginning of much more.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1982-04-03-falkland-islands',
            loc: { section: 'Falkland Islands (3 April 1982)', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1982/apr/03/falkland-islands'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Within hours of the invasion, the Argentines overwhelmed the small British garrison, forcing its surrender. In subsequent days, the military junta led by General Leopoldo Galtieri formalized Argentine control over the territory (as well as over other British South Atlantic possessions in South Georgia and the South Sandwich Islands) and expelled the British administration. British Prime Minister Margaret Thatcher condemned the landings as an act of aggression against the wishes of the islands’ inhabitants who, she argued, favored overwhelmingly continued association with the United Kingdom. She ordered the deployment of a naval task force to the region.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
          }
        },
        {
          id: 'q7',
          text: 'Haig shuttled between London and Buenos Aires for two rounds of intensive discussions over the next fortnight, but failed to broker a peaceful solution.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
          }
        },
        {
          id: 'q8',
          text: 'It must be a matter of deep concern to the House that there has been loss of life from these engagements including the sinking of the "General Belgrano", but our first duty must be the protection of our own ships and men.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1982-05-04-falkland-islands',
            loc: { section: 'Falkland Islands (4 May 1982)', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1982/may/04/falkland-islands-2'
          }
        },
        {
          id: 'q9',
          text: 'Early this morning in Port Stanley, 74 days after the Falkland Islands were invaded, General Moore accepted from General Menendez the surrender of all the Argentine forces in East and West Falkland together with their arms and equipment. In a message to the Commander-in-Chief Fleet, General Moore reported: The Falkland Islands are once more under the Government desired by their inhabitants. God Save the Queen.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1982-06-15-falkland-islands',
            loc: { section: 'Falkland Islands (15 June 1982)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1982/jun/15/falkland-islands'
          }
        },
        {
          id: 'q10',
          text: 'Initial contact was made with the enemy by radio. By midnight General Moore and General Menendez were talking. The surrender of all the Argentine forces of East and West Falkland was agreed at 1 am today London time.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1982-06-15-falkland-islands',
            loc: { section: 'Falkland Islands (15 June 1982)', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1982/jun/15/falkland-islands'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q11',
          text: 'Galtieri resigned as Argentine president, the first step in the eventual return of civilian government to Argentina.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
          }
        },
        {
          id: 'q12',
          text: 'After all that has been suffered it is too early to look much beyond the beginning of the return to normal life. In due course the islanders will be able to consider and express their views about the future. When the time is right we can discuss with them ways of giving their elected representatives an expanded role in the government of the islands.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1982-06-15-falkland-islands',
            loc: { section: 'Falkland Islands (15 June 1982)', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1982/jun/15/falkland-islands'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q13',
          text: 'Indeed, most Latin American countries viewed U.S. support for Britain as a betrayal of the hemispheric solidarity embodied in the 1947 Inter-American Treaty of Reciprocal Assistance (the Rio Treaty).',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
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
            value: { d: '1982-04-02' },
            cites: [
              {
                source: 'state-dept-milestones-crisis-in-the-south-atlantic',
                loc: {
                  section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'He told me that the Argentines had landed at approximately 6 am Falkland\'s time, 10 am our time. One party attacked the capital from the landward side and another from the seaward side.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1982-04-03-falkland-islands',
          loc: { section: 'Falkland Islands (3 April 1982)', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://api.parliament.uk/historic-hansard/commons/1982/apr/03/falkland-islands'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-04-29' },
            cites: [
              {
                source: 'state-dept-milestones-crisis-in-the-south-atlantic',
                loc: {
                  section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
                  para: '5'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Following a successful British operation to retake South Georgia and with growing indications of the Thatcher government’s readiness to seek a military solution, Argentina officially rejected Haig’s final peace proposal on April 29.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '5'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-05-02' },
            cites: [
              {
                source: 'hansard-commons-1982-05-04-falkland-islands',
                loc: { section: 'Falkland Islands (4 May 1982)', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The next day, 2 May, at 8 pm London time, one of our submarines detected the Argentine cruiser, "General Belgrano", escorted by two destroyers.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1982-05-04-falkland-islands',
          loc: { section: 'Falkland Islands (4 May 1982)', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://api.parliament.uk/historic-hansard/commons/1982/may/04/falkland-islands-2'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-06-14' },
            cites: [
              {
                source: 'state-dept-milestones-crisis-in-the-south-atlantic',
                loc: {
                  section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
                  para: '8'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'British forces re-captured the islands’ capital, Port Stanley, on June 14, forcing the surrender of all Argentine troops.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '8'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Etendard_en_1982.jpg/1280px-Etendard_en_1982.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Etendard_en_1982.jpg',
    credit: { institution: 'Revista Radiolandia 2000 (Argentine magazine), 1982' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'cardoso-1992-malvinas-la-trama-secreta', perspective: 'latin-american' }
  ]
})
