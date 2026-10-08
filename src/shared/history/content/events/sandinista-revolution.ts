import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sandinista-revolution',
  names: [
    { text: 'Sandinista Revolution', lang: 'en', role: 'primary' },
    { text: 'Revolución Sandinista', lang: 'es', role: 'native' },
    {
      text: 'Nicaraguan revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'The Sandinista Revolution', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1978-01-10' },
        cites: [
          {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1979-07-19' },
        cites: [
          {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'The Sandinista Revolution', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:managua',
      cites: [
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'The Sandinista Revolution', para: '4' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'fsln',
      name: 'Sandinista National Liberation Front (FSLN)',
      cites: [
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'The Sandinista Revolution', para: '2' }
        },
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '7' }
        }
      ]
    },
    {
      key: 'somoza',
      name: 'Somoza government and National Guard',
      cites: [
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '3' }
        },
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Anastasio Somoza Debayle',
      role: 'head-of-state',
      side: 'somoza',
      cites: [
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '1' }
        },
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'The Sandinista Revolution', para: '4' }
        }
      ]
    },
    {
      name: 'Pedro Joaquín Chamorro',
      role: 'victim',
      side: 'somoza',
      cites: [
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '3' }
        }
      ]
    },
    {
      name: 'Edén Pastora',
      role: 'commander',
      side: 'fsln',
      cites: [
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '6' }
        }
      ]
    },
    {
      name: 'Daniel Ortega',
      role: 'leader',
      side: 'fsln',
      cites: [
        {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'The Sandinista Revolution', para: '3' }
        }
      ]
    },
    {
      ref: 'person:jimmy-carter',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-central-america-1977-1980',
          loc: { section: 'Central America, 1977–1980', para: '3' }
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
            value: { min: 50000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-nicaragua-country-study-1993',
                loc: { section: 'The Sandinista Revolution', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 150000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-nicaragua-country-study-1993',
                loc: { section: 'The Sandinista Revolution', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Le%C3%B3n_victoria_1979_%2827014838724%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Le%C3%B3n_victoria_1979_(27014838724).jpg',
    credit: {
      institution: 'Dora María Téllez photograph archive (Flickr album Imágenes de los días inmediatos posteriores al triunfo de la revolución sandinista)',
      creator: 'Dora María Téllez'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In July 1979 the revolutionary Sandinista movement prevailed over Nicaraguan President Anastasio Somoza who had been a close U.S. ally.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-central-america-1977-1980',
            loc: { section: 'Central America, 1977–1980', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/central-america-carter'
          }
        },
        {
          id: 'q2',
          text: 'On July 19, the FSLN army entered Managua, culminating the Nicaraguan revolution.',
          lang: 'en',
          cite: {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'The Sandinista Revolution', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/14.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Widespread poverty, a growing reform movement, and a corrupt and violent military dictatorship made Nicaragua a clear focus for Carter’s new approach. Somoza controlled Nicaragua’s politics, military, and much of its economy. Following his brother Luis Somoza’s direct and indirect rule of the country from 1956 to 1966, Somoza re-established a military dictatorship in the mold of his father Anastasio Somoza García’s two-decades of control from 1936 to 1956. Public outcry over Somoza’s abuses exploded after a devastating earthquake hit the capital city of Managua in 1972 and Somoza’s businesses, political cronies, and military subordinates embezzled most of the international relief donations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-central-america-1977-1980',
            loc: { section: 'Central America, 1977–1980', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/central-america-carter'
          }
        },
        {
          id: 'q4',
          text: 'While the middle-class, the business community, and the local Catholic leadership became increasingly critical of Somoza in the mid-1970s, a committed group of revolutionaries had already been fighting for decades to overthrow him. Inspired by the 1959 Cuban revolution and advised by the new Cuban leader Fidel Castro, Nicaraguan revolutionaries joined efforts to found the Sandinista National Liberation Front (FSLN). The name honored Augusto Sandino, who had fought against the U.S. Marines in the 1920s and opposed the creation of the Nicaraguan National Guard. In fact the Guard, headed by Somoza’s father, executed Sandino despite a surrender agreement in 1934.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-central-america-1977-1980',
            loc: { section: 'Central America, 1977–1980', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/central-america-carter'
          }
        },
        {
          id: 'q5',
          text: 'United States support for President Somoza waned after 1977, when the administration of United States President Jimmy Carter made United States military assistance conditional on improvements in human rights. International pressure, especially from the Carter administration, forced President Somoza to lift the state of siege in September 1977.',
          lang: 'en',
          cite: {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/13.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The opposition held the president and his guards responsible for Chamorro\'s murder, thus provoking mass demonstrations against the regime. The Episcopate of the Nicaraguan Roman Catholic Church issued a pastoral letter highly critical of the government, and opposition parties called for Anastasio Somoza Debayle\'s resignation. On January 23, a nationwide strike began, including the public and private sectors; supporters of the stride demanded an end to the dictatorship.',
          lang: 'en',
          cite: {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/13.htm' }
        },
        {
          id: 'q7',
          text: 'The FSLN strengthened its position on August 22, 1978, when a group of the Third Way faction, led by Edén Pastora Gómez (also known as Commander Zero--Comandante Cero), took over the National Palace and held almost 2,000 government officials and members of Congress hostage for two days. With mediation from Archbishop Miguel Obando y Bravo, as well as from the Costa Rican and Panamanian ambassadors, the crisis was solved in two days. The results of the negotiations favored the insurrection and further tarnished the government\'s image. President Somoza had no alternative but to meet most of the rebels\' demands, including the release of sixty FSLN guerrillas from prison, media dissemination of an FSLN declaration, a US$500,000 ransom, and safe passage for the hostage takers to Panama and Venezuela.',
          lang: 'en',
          cite: {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/13.htm' }
        },
        {
          id: 'q8',
          text: 'In December 1978, the FSLN was further strengthened when Cuban mediation led to an agreement among the three FSLN factions for a united Sandinista front. Formal unification of the FSLN occurred in March 1979.',
          lang: 'en',
          cite: {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/13.htm' }
        },
        {
          id: 'q9',
          text: 'The FSLN launched its final offensive during May, just as the National Guard began to lose control of many areas of the country. In a year\'s time, bold military and political moves had changed the FSLN from one of many opposition groups to a leadership role in the anti-Somoza revolt.',
          lang: 'en',
          cite: {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'The Sandinista Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/14.htm' }
        },
        {
          id: 'q10',
          text: 'By the end of June, most of Nicaragua was under FSLN control, with the exception of the capital. President Somoza\'s political and military isolation finally forced him to consider resignation. The provisional government in exile released a government program on July 9 in which it pledged to organize an effective democratic regime, promote political pluralism and universal suffrage, and ban ideological discrimination--except for those promoting the "return of Somoza\'s rule." By the second week of July, President Somoza had agreed to resign and hand over power to Francisco Maliano Urcuyo, who would in turn transfer the government to the Revolutionary Junta.',
          lang: 'en',
          cite: {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'The Sandinista Revolution', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/14.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The insurrection left approximately 50,000 dead and 150,000 Nicaraguans in exile. The five-member junta entered the Nicaraguan capital the next day and assumed power, reiterating its pledge to work for political pluralism, a mixed economic system, and a nonaligned foreign policy.',
          lang: 'en',
          cite: {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'The Sandinista Revolution', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/14.htm' }
        },
        {
          id: 'q12',
          text: 'The new government inherited a country in ruins, with a stagnant economy and a debt of about US$1.6 billion. An estimated 50,000 Nicaraguans were dead, 120,000 were exiles in neighboring countries, and 600,000 were homeless.',
          lang: 'en',
          cite: {
            source: 'loc-nicaragua-country-study-1993',
            loc: { section: 'THE SANDINISTA YEARS, 1979-90', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/15.htm' }
        },
        {
          id: 'q13',
          text: 'Still aiming for influence, President Carter met with members of the GNR in the White House in September 1979 and encouraged moderation and respect for democratic values and human rights.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-central-america-1977-1980',
            loc: { section: 'Central America, 1977–1980', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/central-america-carter'
          }
        },
        {
          id: 'q14',
          text: 'The Nicaraguan revolution threatened to worsen an already unstable and violent situation in neighboring El Salvador.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-central-america-1977-1980',
            loc: { section: 'Central America, 1977–1980', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/central-america-carter'
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
            value: { d: '1978-01-10' },
            cites: [
              {
                source: 'loc-nicaragua-country-study-1993',
                loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The final act in the downfall of the Somoza era began on January 10, 1978, when Chamorro was assassinated. Although his assassins were not identified at the time, evidence implicated President Somoza\'s son and other members of the National Guard.',
        lang: 'en',
        cite: {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-08-22' },
            cites: [
              {
                source: 'loc-nicaragua-country-study-1993',
                loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The attack electrified the opposition. The humiliation of the dictatorship also affected morale within the National Guard, forcing Anastasio Somoza Debayle to replace many of its officers to forestall a coup and to launch a recruitment campaign to strengthen its rank and file.',
        lang: 'en',
        cite: {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'End of the Anastasio Somoza Debayle Era', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-06-18' },
            cites: [
              {
                source: 'loc-nicaragua-country-study-1993',
                loc: { section: 'The Sandinista Revolution', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On June 18, a provisional Nicaraguan government in exile, consisting of a five-member junta, was organized in Costa Rica. Known as the Puntarenas Pact, an agreement reached by the new government in exile called for the establishment of a mixed economy, political pluralism, and a nonaligned foreign policy.',
        lang: 'en',
        cite: {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'The Sandinista Revolution', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/14.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-07-17' },
            cites: [
              {
                source: 'loc-nicaragua-country-study-1993',
                loc: { section: 'The Sandinista Revolution', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On July 17, 1979, Anastasio Somoza Debayle resigned, handed over power to Urcuyo, and fled to Miami.',
        lang: 'en',
        cite: {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'The Sandinista Revolution', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/14.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-07-19' },
            cites: [
              {
                source: 'loc-nicaragua-country-study-1993',
                loc: { section: 'The Sandinista Revolution', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The five-member junta arrived in the city of León a day after Somoza\'s departure, on July 18. Urcuyo tried to ignore the agreement transferring power, but in less than two days, domestic and international pressure drove him to exile in Guatemala.',
        lang: 'en',
        cite: {
          source: 'loc-nicaragua-country-study-1993',
          loc: { section: 'The Sandinista Revolution', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/nicaragua/14.htm' }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-central-america-1977-1980',
          loc: { section: 'Central America, 1977–1980', para: '1' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'ramirez-2018-adios-muchachos', perspective: 'latin-american' },
    { source: 'kinzer-1992-blood-of-brothers', perspective: 'american' }
  ]
})
