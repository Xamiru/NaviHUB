import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'end-of-apartheid',
  names: [
    { text: 'End of apartheid', lang: 'en', role: 'primary' },
    { text: 'Einde van apartheid', lang: 'af', role: 'native' }
  ],
  researched: '2026-10-10',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1990-02-02' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Dismantling Apartheid, 1990-94', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1994-05-10' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Election of Nelson Mandela', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 1,
  places: [
    {
      ref: 'place:cape-town',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Dismantling Apartheid, 1990-94', para: '3' }
        }
      ]
    },
    {
      ref: 'place:pretoria',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Election of Nelson Mandela', para: '9' }
        }
      ]
    },
    {
      ref: 'place:johannesburg',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Toward Democracy', para: '5' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'nationalparty',
      name: 'National Party government',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Dismantling Apartheid, 1990-94', para: '1' }
        }
      ]
    },
    {
      key: 'anc',
      name: 'African National Congress',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Dismantling Apartheid, 1990-94', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nelson-mandela',
      role: 'leader',
      side: 'anc',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Dismantling Apartheid, 1990-94', para: '3' }
        }
      ]
    },
    {
      name: 'F. W. de Klerk',
      role: 'head-of-state',
      side: 'nationalparty',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Dismantling Apartheid, 1990-94', para: '1' }
        }
      ]
    },
    {
      name: 'P. W. Botha',
      role: 'head-of-state',
      side: 'nationalparty',
      cites: [
        {
          source: 'state-dept-milestones-the-end-of-apartheid',
          loc: { section: 'The End of Apartheid', para: '7' }
        }
      ]
    },
    {
      name: 'Mangosuthu Buthelezi',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Quest for Peace', para: '10' }
        }
      ]
    },
    {
      name: 'Chris Hani',
      role: 'victim',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Toward Democracy', para: '7' }
        }
      ]
    },
    {
      name: 'Thabo Mbeki',
      role: 'leader',
      side: 'anc',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Election of Nelson Mandela', para: '9' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:introduction-of-apartheid',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-the-end-of-apartheid',
          loc: { section: 'The End of Apartheid', para: '1' }
        }
      ]
    },
    {
      ref: 'event:sharpeville-massacre',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-the-end-of-apartheid',
          loc: { section: 'The End of Apartheid', para: '5' }
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
          text: 'Apartheid, the Afrikaans name given by the white-ruled South Africa’s Nationalist Party in 1948 to the country’s harsh, institutionalized system of racial segregation, came to an end in the early 1990s in a series of steps that led to the formation of a democratic government in 1994.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-end-of-apartheid',
            loc: { section: 'The End of Apartheid', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/apartheid'
          }
        },
        {
          id: 'q2',
          text: 'Years of violent internal protest, weakening white commitment, international economic and cultural sanctions, economic struggles, and the end of the Cold War brought down white minority rule in Pretoria.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-end-of-apartheid',
            loc: { section: 'The End of Apartheid', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/apartheid'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Defenders of the Apartheid regime, both inside and outside South Africa, had promoted it as a bulwark against communism.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-end-of-apartheid',
            loc: { section: 'The End of Apartheid', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/apartheid'
          }
        },
        {
          id: 'q4',
          text: 'The international community had begun to take notice of the brutality of the Apartheid regime after white South African police opened fire on unarmed black protesters in the town of Sharpeville in 1960, killing 69 people and wounding 186 others.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-end-of-apartheid',
            loc: { section: 'The End of Apartheid', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/apartheid'
          }
        },
        {
          id: 'q5',
          text: 'However, the end of the Cold War rendered this argument obsolete.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-end-of-apartheid',
            loc: { section: 'The End of Apartheid', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/apartheid'
          }
        },
        {
          id: 'q6',
          text: 'The effects of the internal unrest and international condemnation led to dramatic changes beginning in 1989.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-end-of-apartheid',
            loc: { section: 'The End of Apartheid', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/apartheid'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'In the flurry of receptions and public statements that followed, Mandela enunciated other objectives that were less welcome in political and business circles.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Dismantling Apartheid, 1990-94', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/34.htm' }
        },
        {
          id: 'q8',
          text: 'President de Klerk faced an increasingly divided constituency of his own.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Quest for Peace', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/35.htm' }
        },
        {
          id: 'q9',
          text: 'In mid-1992 escalating violence, allegations of police brutality, and government financial scandals threatened to derail negotiations.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Toward Democracy', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/36.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Mandela\'s inaugural address stressed the need for reconciliation, both within South Africa and with other countries, and once again he quoted his own words at the Rivonia trial that had preceded his long imprisonment, and he reaffirmed his determination to forge a peaceful, nonracial society.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Election of Nelson Mandela', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/37.htm' }
        },
        {
          id: 'q11',
          text: 'After Prime Minister de Klerk agreed to democratic elections for the country, the United States lifted sanctions and increased foreign aid, and many of the U.S. companies who disinvested in the 1980s returned with new investments and joint ventures.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-end-of-apartheid',
            loc: { section: 'The End of Apartheid', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/apartheid'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'The official results, released on May 6, 1994, gave the ANC 62.6 percent of the vote; the NP, 20.4 percent; and the IFP, 10.5 percent.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The Election of Nelson Mandela', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/37.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1990-02-02' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Dismantling Apartheid, 1990-94', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'De Klerk nonetheless surprised some supporters and critics alike when he announced on February 2, 1990, not only the impending release of Mandela, but also the unbanning of the ANC, the PAC, and the SACP, and the removal of restrictions on the UDF and other legal political organizations.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Dismantling Apartheid, 1990-94', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/34.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-02-11' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Dismantling Apartheid, 1990-94', para: '3' }
              },
              {
                source: 'state-dept-milestones-the-end-of-apartheid',
                loc: { section: 'The End of Apartheid', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'As Mandela was released on February 11, 1990, at age seventy-one after twenty-seven years in prison, South Africans poured into the streets in celebration.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Dismantling Apartheid, 1990-94', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/34.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-05' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Quest for Peace', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Amid rising tensions and unrest, representatives of the government and the ANC--with strong misgivings--met in Cape Town in May 1990 to begin planning for constitutional negotiations.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Quest for Peace', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/35.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-06-05' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Quest for Peace', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On June 5, 1991, the government repealed two more legislative pillars of apartheid, the Land Act of 1913 (and 1936) and the Group Areas Act of 1950.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Quest for Peace', para: '12' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/35.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-06-17' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Quest for Peace', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On June 17, 1991, the government repealed the Population Registration Act of 1950, the most infamous pillar of apartheid, which had authorized the registration by race of newborn babies and immigrants.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Quest for Peace', para: '13' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/35.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-09' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Quest for Peace', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'The National Peace Accord of September 1991 was a critical step toward formal negotiations.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Quest for Peace', para: '14' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/35.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-12-20' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Toward Democracy', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'Through dogged perseverance, amid claims and counterclaims of sabotage and brutality, key political leaders began formal constitutional negotiations on December 20, 1991.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Toward Democracy', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/36.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1992-03-17' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Toward Democracy', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'The question posed in the March 17, 1992, referendum was carefully worded: "Do you support continuation of the reform process which the State President began on February 2, 1990, and which is aimed at a new constitution through negotiation?"',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Toward Democracy', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/36.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1992-06-17' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Toward Democracy', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'After a particularly brutal attack on June 17, 1992, by IFP supporters on ANC sympathizers in Boipatong, a township near Johannesburg, the ANC suspended negotiations and threatened to withdraw entirely unless the government made greater efforts to end the violence and to curtail covert police support for the IFP.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Toward Democracy', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/36.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1993-07-26' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Toward Democracy', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'The draft constitution published on July 26, 1993, contained concessions to all sides--a federal system of regional legislatures, equal voting rights regardless of race, and a bicameral legislature.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Toward Democracy', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/36.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1993-11' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Election of Nelson Mandela', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'In November 1993, negotiators endorsed the draft of the interim constitution calling for a five-year transitional government, and the tricameral parliament endorsed the draft in December.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Election of Nelson Mandela', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/37.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1994-04-26' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Election of Nelson Mandela', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'When the elections finally took place on schedule, beginning on April 26, 1994, the government and the ANC had several thousand security forces, with varying degrees of training and authority, in place to prevent serious outbreaks of violence.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Election of Nelson Mandela', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/37.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1994-05-09' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Election of Nelson Mandela', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: 'Mandela was unanimously elected president by the National Assembly on May 9, 1994, in Cape Town.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The Election of Nelson Mandela', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/south-africa/37.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Frederik_de_Klerk_with_Nelson_Mandela_-_World_Economic_Forum_Annual_Meeting_Davos_1992.jpg/1280px-Frederik_de_Klerk_with_Nelson_Mandela_-_World_Economic_Forum_Annual_Meeting_Davos_1992.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Frederik_de_Klerk_with_Nelson_Mandela_-_World_Economic_Forum_Annual_Meeting_Davos_1992.jpg',
    credit: { institution: 'World Economic Forum' },
    license: { id: 'cc-by-sa', version: '2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0' }
  }
})
