import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'cambodian-genocide',
  names: [
    { text: 'Cambodian genocide', lang: 'en', role: 'primary' },
    {
      text: 'ការប្រល័យពូជសាសន៍នៅកម្ពុជា',
      lang: 'km',
      role: 'native',
      translit: 'Kar Pralay Pich Sas nov Kampuchea'
    },
    {
      text: 'Democratic Kampuchea',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '-1' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'genocide',
  start: {
    alts: [
      {
        value: { d: '1975-04-17' },
        cites: [
          {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Fall of Phnom Penh', para: '2' }
          },
          {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1979-01-07' },
        cites: [
          {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Fall of Democratic Kampuchea', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:phnom-penh',
      cites: [
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  participants: [
    {
      ref: 'person:pol-pot',
      role: 'leader',
      cites: [
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '5' }
        },
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'The Fall of Democratic Kampuchea', para: '1' }
        }
      ]
    },
    {
      name: 'Khieu Samphan',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'Establishing Democratic Kampuchea', para: '1' }
        },
        { source: 'eccc-profile-khieu-samphan', loc: { section: 'Khieu Samphan' } }
      ]
    },
    {
      name: 'Nuon Chea',
      role: 'leader',
      cites: [
        { source: 'eccc-profile-nuon-chea', loc: { section: 'Nuon Chea' } }
      ]
    },
    {
      name: 'Ieng Sary',
      role: 'leader',
      cites: [
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'The Fall of Democratic Kampuchea', para: '1' }
        }
      ]
    },
    {
      name: 'Lon Nol',
      role: 'victim',
      cites: [
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'The Fall of Phnom Penh', para: '2' }
        }
      ]
    },
    {
      name: 'Norodom Sihanouk',
      role: 'victim',
      cites: [
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'Establishing Democratic Kampuchea', para: '1' }
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
            value: { min: 3000000 },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'Revolutionary Terror', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'People’s Republic of Kampuchea' }
            ]
          },
          {
            value: { min: 2300000 },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'Revolutionary Terror', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'François Ponchaud' }
            ]
          },
          {
            value: { min: 1400000 },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'Revolutionary Terror', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Amnesty International' }
            ]
          },
          {
            value: { min: 1200000 },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'Revolutionary Terror', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'United States Department of State' }
            ]
          },
          {
            value: { min: 1000000 },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'Revolutionary Terror', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'participant', name: 'Khieu Samphan' }
            ]
          },
          {
            value: { min: 800000 },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'Revolutionary Terror', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'participant', name: 'Pol Pot' }
            ]
          }
        ]
      }
    },
    {
      key: 'executed',
      value: {
        alts: [
          {
            value: { min: 1000000, qualifier: 'up-to' },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'Revolutionary Terror', para: '2' }
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
  related: [
    {
      ref: 'event:vietnam-war',
      rel: 'related',
      cites: [
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'The Widening War', para: '1' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/2016_Phnom_Penh%2C_Muzeum_Ludob%C3%B3jstwa_Tuol_Sleng_%2801%29.jpg/1280px-2016_Phnom_Penh%2C_Muzeum_Ludob%C3%B3jstwa_Tuol_Sleng_%2801%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:2016_Phnom_Penh,_Muzeum_Ludob%C3%B3jstwa_Tuol_Sleng_(01).jpg',
    credit: { institution: 'Marcin Konsek (Wikimedia Commons)', creator: 'Marcin Konsek' },
    license: { id: 'cc-by-sa', version: '4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The social transformation wrought by the Khmer Rouge, first, in the areas that they occupied during the war with Lon Nol and, then, in varying degrees, throughout the country, was far more radical than anything attempted by the Russian, Chinese, or Vietnamese revolutions.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Society under the Angkar', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/29.htm' }
        },
        {
          id: 'q2',
          text: 'The troops who entered the capital on April 17 were mostly grim-faced youths clad in black with the checkered scarves that had become the uniform of the movement. Their unsmiling demeanor quickly dispelled popular enthusiasm. People began to realize that, in the eyes of the victors, the war was not over; it was just beginning, and the people were the new enemy.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/27.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The 1970 coup d\'état that toppled Sihanouk dragged Cambodia into the vortex of a wider war.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Widening War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/24.htm' }
        },
        {
          id: 'q4',
          text: 'The Khmer Rouge initiated their dry-season offensive to capture the beleaguered Cambodian capital on January 1, 1975. Their troops controlled the banks of the Mekong River, and they were able to rig ingenious mines to sink convoys bringing relief supplies of food, fuel, and ammunition to the slowly starving city.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Fall of Phnom Penh', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/26.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Promises that urban residents forced into the countryside would be allowed to return home were never kept. Instead, the town dwellers, regarded as politically unreliable "new people," were put to work in forced labor battalions throughout the country.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/27.htm' }
        },
        {
          id: 'q6',
          text: 'The regime immediately seized and executed as many Khmer Republic civil servants, police, and military officers as it could find.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/27.htm' }
        },
        {
          id: 'q7',
          text: 'During the entire Democratic Kampuchea period from 1975 to 1978, cadres exercised the power of life and death, especially over "new people," for whom threats of being struck with a pickax or an ax handle and of being "put in a plastic bag" were a part of everyday life. In order to save ammunition, firearms were rarely used. People were murdered for not working hard, for complaining about living conditions, for collecting or stealing food for their own use, for wearing jewelry, for having sexual relations, for grieving over the loss of relatives or friends, or for expressing religious sentiments. Sick people were often eliminated.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/27.htm' }
        },
        {
          id: 'q8',
          text: 'The country\'s 40,000 to 60,000 Buddhist monks, regarded by the regime as social parasites, were defrocked and forced into labor brigades. Many monks were executed; temples and pagodas were destroyed or turned into storehouses or jails. Images of the Buddha were defaced and dumped into rivers and lakes. People who were discovered praying or expressing religious sentiments in other ways were often killed.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Society under the Angkar', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/29.htm' }
        },
        {
          id: 'q9',
          text: 'The Khmer Rouge\'s treatment of minorities seems to have varied from group to group. The Vietnamese endured the greatest suffering. Tens of thousands were murdered in regime-organized massacres. Most of the survivors fled to Vietnam. The Cham, a Muslim minority who are the descendants of migrants from the old state of Champa, were forced to adopt the Khmer language and customs. Their communities, which traditionally had existed apart from Khmer villages, were broken up. Forty thousand Cham were killed in two districts of Kampong Cham Province alone.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Society under the Angkar', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/29.htm' }
        },
        {
          id: 'q10',
          text: 'In 1977 and 1978 the violence reached a climax as the revolutionaries turned against each other in bloody purges.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/27.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q11',
          text: 'Estimates of the number of people who perished under the Khmer Rouge vary tremendously.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Revolutionary Terror', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/28.htm' }
        },
        {
          id: 'q12',
          text: 'As is evident from the accounts of refugees, the greatest causes of death were hunger, disease, and exposure. Many city people could not survive the rigors of life in the countryside, the forced marches, and the hard physical labor. People died from the bites of venomous snakes, drowned in flooded areas during the rainy season, and were killed by wild beasts in jungle areas.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Revolutionary Terror', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/28.htm' }
        },
        {
          id: 'q13',
          text: 'Nonetheless, executions accounted for hundreds of thousands of victims and perhaps for as many as 1 million.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Revolutionary Terror', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/28.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q21',
          text: 'Faced with growing Khmer Rouge belligerence, the Vietnamese leadership decided in early 1978 to support internal resistance to the Pol Pot regime, with the result that the Eastern Zone became a focus of insurrection.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Fall of Democratic Kampuchea', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/33.htm' }
        },
        {
          id: 'q14',
          text: 'In the meantime, as 1978 wore on, Cambodian bellicosity in the border areas surpassed Hanoi\'s threshold of tolerance. Vietnamese policy makers opted for a military solution and, on December 22, Vietnam launched its offensive with the intent of overthrowing Democratic Kampuchea.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Fall of Democratic Kampuchea', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/33.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q15',
          text: 'Considering the aspirations of the whole people of Kampuchea and of the whole Revolutionary Army of Kampuchea who wish to have an independent, united, peaceful, neutral, non-aligned, sovereign Kampuchea in her territorial integrity, in a society where happiness, equality, justice and genuine democracy reign, without rich nor poor people, without oppressive nor oppressed classes, a society in which the whole people live in harmony, in the great national unity and join their efforts in productive labour, to edify and defend the country together;',
          lang: 'en',
          cite: {
            source: 'dk-1976-constitution',
            loc: { section: 'Constitution of Democratic Kampuchea' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/Constitution_of_Democratic_Kampuchea'
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
            value: { d: '1975-04-17' },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'The Fall of Phnom Penh', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Phnom Penh--the population of which, numbering 2.5 million people, included as many as 1.5 million wartime refugees living with relatives or in shantytowns around the urban center--was soon emptied.',
        lang: 'en',
        cite: {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-01-05' },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'Establishing Democratic Kampuchea', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'It remained formally in control of the country until the proclamation of the Constitution of Democratic Kampuchea on January 5, 1976.',
        lang: 'en',
        cite: {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'Establishing Democratic Kampuchea', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/31.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-04-02' },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'Establishing Democratic Kampuchea', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'Three months later, on April 2, Sihanouk resigned as head of state.',
        lang: 'en',
        cite: {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'Establishing Democratic Kampuchea', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/31.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-05' },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'The Fall of Democratic Kampuchea', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'War hysteria reached bizarre levels within Democratic Kampuchea. In May 1978, on the eve of So Phim\'s Eastern Zone uprising, Radio Phnom Penh declared that if each Cambodian soldier killed thirty Vietnamese, only 2 million troops would be needed to eliminate the entire Vietnamese population of 50 million.',
        lang: 'en',
        cite: {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'The Fall of Democratic Kampuchea', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/33.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-12-22' },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'The Fall of Democratic Kampuchea', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'An invasion force of 120,000, consisting of combined armor and infantry units with strong artillery support, drove west into the level countryside of Cambodia\'s southeastern provinces.',
        lang: 'en',
        cite: {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'The Fall of Democratic Kampuchea', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/33.htm' }
      }
    }
  ],
  furtherReading: [
    { source: 'yathay-2014-stay-alive-my-son', perspective: 'southeast-asian' },
    { source: 'kiernan-2002-the-pol-pot-regime', perspective: 'other' }
  ]
})
