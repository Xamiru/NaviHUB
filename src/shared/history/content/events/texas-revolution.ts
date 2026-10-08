import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'texas-revolution',
  names: [
    { text: 'Texas Revolution', lang: 'en', role: 'primary' },
    {
      text: 'Texan war of independence',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-texas-annexation',
          loc: {
            section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
            para: '4'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'independence',
  start: {
    alts: [
      {
        value: { d: '1835-11-07' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1836-04-21' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:san-antonio',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Loss of Texas', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'texas',
      name: 'the Texans',
      polity: 'polity:republic-of-texas',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Loss of Texas', para: '2' }
        }
      ]
    },
    {
      key: 'mexico',
      name: 'Mexican forces',
      polity: 'polity:mexico',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Loss of Texas', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:antonio-lopez-de-santa-anna',
      role: 'commander',
      side: 'mexico',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Loss of Texas', para: '2' }
        }
      ]
    },
    {
      name: 'Sam Houston',
      role: 'commander',
      side: 'texas',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Loss of Texas', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'mexico',
      value: {
        alts: [
          {
            value: { min: 3000 },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Loss of Texas', para: '2' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'executed',
      side: 'texas',
      value: {
        alts: [
          {
            value: { min: 365 },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Loss of Texas', para: '2' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'polity:republic-of-texas',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-texas-annexation',
          loc: {
            section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
            para: '4'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Texas (known as Tejas) had been part of New Spain since the early colonial period.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        },
        {
          id: 'q2',
          text: 'Land could be acquired for a nominal charge of US$0.25 per hectare, and soon colonists from the United States started to pour into the area.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        },
        {
          id: 'q3',
          text: 'Under the constitution of 1836, Mexico became a centralist regime in which power was concentrated in the president and his immediate subordinates.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Centralism and the Caudillo State, 1836-55', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/16.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'Santa Anna\'s move to bring Texas under the political domination of Mexico City pushed the Texans to secede from Mexico on November 7, 1835, and to declare their independence in March 1836.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        },
        {
          id: 'q5',
          text: 'He reached San Antonio in March 1836 and learned that about 150 armed Texans had taken refuge at an old Franciscan mission, called the Alamo.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        },
        {
          id: 'q6',
          text: 'The Mexican force took the mission the next day, killing all but five of the defenders in battle (the five prisoners were later executed).',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        },
        {
          id: 'q7',
          text: 'The events at the Alamo and at Goliad stirred strong anti-Mexican sentiment in the United States.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        },
        {
          id: 'q8',
          text: 'Volunteer fighters poured into Texas to stage a decisive blow against Santa Anna.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'While under custody of the Texans, Santa Anna signed two treaties with the Texas government: one ended hostilities by pledging the withdrawal of Mexican troops to positions south of the Río Bravo del Norte (Rio Grande), and the other, a secret treaty, recognized Texan independence from Mexico.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Loss of Texas', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
        },
        {
          id: 'q10',
          text: 'Following Texas’ successful war of independence against Mexico in 1836, President Martin van Buren refrained from annexing Texas after the Mexicans threatened war.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
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
            value: { d: '1836-03-02' },
            cites: [
              {
                source: 'tslac-texas-declaration-of-independence-1836',
                loc: { section: 'Declaration of Independence of Texas, 1836', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'We, therefore, the delegates with plenary powers of the people of Texas, in solemn convention assembled, appealing to a candid world for the necessities of our condition, do hereby resolve and declare, that our political connection with the Mexican nation has forever ended, and that the people of Texas do now constitute a free, Sovereign, and independent republic, and are fully invested with all the rights and attributes which properly belong to independent nations; and, conscious of the rectitude of our intentions, we fearlessly and confidently commit the issue to the decision of the Supreme arbiter of the destinies of nations.',
        lang: 'en',
        cite: {
          source: 'tslac-texas-declaration-of-independence-1836',
          loc: { section: 'Declaration of Independence of Texas, 1836', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.tsl.texas.gov/treasures/republic/declaration.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1836-03-06' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Loss of Texas', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'He laid siege to the mission for several days before the final attack on March 6, 1836.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Loss of Texas', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1836-03-23' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Loss of Texas', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On March 23, the Texan town of Goliad was surrounded by Mexican forces, who compelled the Texan commander in charge to surrender.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Loss of Texas', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1836-04-21' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Loss of Texas', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The Mexican commander in chief and his army were ambushed and roundly defeated near the San Jacinto River by a force commanded by Sam Houston on April 21.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Loss of Texas', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/17.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/FalloftheAlamo.jpg/1280px-FalloftheAlamo.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:FalloftheAlamo.jpg',
    credit: { institution: 'Texas State Archives', creator: 'Robert Jenkins Onderdonk' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'filisola-1849-memorias-para-la-historia-de-la-guerra-de-tejas',
      perspective: 'latin-american'
    }
  ]
})
