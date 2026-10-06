import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'mexican-revolution',
  names: [
    { text: 'Mexican Revolution', lang: 'en', role: 'primary' },
    { text: 'Revolución mexicana', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1910-11-20' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution, 1910-20', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1920' },
        cites: [
          {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: {
              section: 'Carranza’s Foreign Policy and German, British, and U.S. Policies towards Mexico (1917–1918)',
              para: '5'
            }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:mexico-city',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Revolution, 1910-20', para: '7' }
        }
      ]
    },
    {
      ref: 'place:veracruz',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Huerta Dictatorship', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:francisco-madero',
      role: 'leader',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Revolution, 1910-20', para: '5' }
        },
        {
          source: 'eo1418-scheuzger-mexican-revolution',
          loc: { section: 'Introduction', para: '1' }
        }
      ]
    },
    {
      ref: 'person:porfirio-diaz',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Revolution, 1910-20', para: '7' }
        }
      ]
    },
    {
      ref: 'person:emiliano-zapata',
      role: 'leader',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Revolution, 1910-20', para: '6' }
        }
      ]
    },
    {
      ref: 'person:pancho-villa',
      role: 'leader',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Revolution, 1910-20', para: '6' }
        }
      ]
    },
    {
      name: 'Victoriano Huerta',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Madero\'s Government', para: '4' }
        }
      ]
    },
    {
      name: 'Venustiano Carranza',
      role: 'leader',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Huerta Dictatorship', para: '1' }
        }
      ]
    },
    {
      name: 'Álvaro Obregón',
      role: 'leader',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Huerta Dictatorship', para: '1' }
        }
      ]
    },
    {
      ref: 'person:woodrow-wilson',
      role: 'head-of-state',
      cites: [
        {
          source: 'eo1418-scheuzger-mexican-revolution',
          loc: { section: 'Civil War (1914–1917)', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:first-world-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'It was the complex and far-reaching transformation of the Mexican Revolution rather than the First World War that left its mark on Mexican history in the second decade of the 20th century. Nevertheless, although the country maintained its neutrality in the international conflict, it was a hidden theatre of war.',
          lang: 'en',
          cite: {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Mexican Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/mexican-revolution/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'At the roots of the Mexican Revolution were two fundamental contradictions produced by the process of modernization during the reign of Porfirio Díaz (1830-1915) from 1876 to 1910/11. In the economic sphere, the upper classes and foreign investors benefitted from export-led development while peasants and rural workers suffered its regressive effects. In the political sphere, the autocratic Porfirian rule ossified the political system and excluded the majority of the population from political participation.',
          lang: 'en',
          cite: {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/mexican-revolution/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Madero soon realized that to the liberals, the Revolution meant political change, but to the revolutionary fighters it meant radical social and economic transformations that Madero would not be able to fulfill.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Madero\'s Government', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/27.htm' }
        },
        {
          id: 'q4',
          text: 'After a civil war, between March 1913 and July 1914, these so-called “constitutionalist” forces, together with Emiliano Zapata’s (1879-1919) army, removed Huerta from power.',
          lang: 'en',
          cite: {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Introduction', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/mexican-revolution/'
          }
        },
        {
          id: 'q5',
          text: 'The country went through another period of civil war and anarchy in which four governments claimed to represent the will of the people: Carranza in Veracruz, Obregón in Mexico City (after Gutiérrez had left the city and established his headquarters in Nuevo León), Roque González Garza (supported by the Zapatistas), and Villa in Guanajuato.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Constitution of 1917', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/29.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The final version of the constitution of 1917, however, gave additional rights to the Mexican people. It was the fruit of the Revolution--an expression of popular will that guaranteed civil liberties, no presidential succession, and protection from foreign and domestic exploitation to all Mexicans (see Constitutional History, ch. 4).',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Constitution of 1917', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/29.htm' }
        },
        {
          id: 'q7',
          text: 'With the election of Obregón as the new president that same year, the era of the civil wars in Mexico came to an end.',
          lang: 'en',
          cite: {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: {
              section: 'Carranza’s Foreign Policy and German, British, and U.S. Policies towards Mexico (1917–1918)',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/mexican-revolution/'
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
            value: { d: '1910-10' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Revolution, 1910-20', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In October 1910, Madero drafted the Plan of San Luis Potosí, which called for the people to rise on November 20 to demand the restoration of the democratic principles of the constitution of 1857 and the replacement of Díaz with a provisional government.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Revolution, 1910-20', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/26.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1911-05-25' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Revolution, 1910-20', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On May 25, 1911, the eighty-year-old dictator submitted his resignation to congress and turned power over to a provisional government.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Revolution, 1910-20', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/26.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1911-11' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Madero\'s Government', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In November the Zapatista faction revolted under the principles of the Plan of Ayala, which asked for restoration of privately owned lands to rural villages.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Madero\'s Government', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1913-02-21' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Madero\'s Government', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'That same evening, Huerta was sworn in as president, and on February 21, Madero and Pino Suárez were assassinated while being transferred to the penitentiary in Mexico City.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Madero\'s Government', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/27.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1914-07-08' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Huerta Dictatorship', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In the face of growing disorder, Huerta resigned on July 8, 1914.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Huerta Dictatorship', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916-03-09' },
            cites: [
              {
                source: 'eo1418-scheuzger-mexican-revolution',
                loc: { section: 'Civil War (1914–1917)', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On 9 March 1916, Villa responded with an attack on the border village of Columbus, New Mexico, with 200 men intended to provoke a U.S. military intervention in Mexico.',
        lang: 'en',
        cite: {
          source: 'eo1418-scheuzger-mexican-revolution',
          loc: { section: 'Civil War (1914–1917)', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/mexican-revolution/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917-02' },
            cites: [
              {
                source: 'eo1418-scheuzger-mexican-revolution',
                loc: {
                  section: 'Carranza’s Foreign Policy and German, British, and U.S. Policies towards Mexico (1917–1918)',
                  para: '3'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In the same month, a new constitution was adopted and made the Mexican nation the owner not only of the whole land within the state’s boundaries, but also the natural resources beneath the surface of the territory.',
        lang: 'en',
        cite: {
          source: 'eo1418-scheuzger-mexican-revolution',
          loc: {
            section: 'Carranza’s Foreign Policy and German, British, and U.S. Policies towards Mexico (1917–1918)',
            para: '3'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/mexican-revolution/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Ni%C3%B1o_Soldado.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ni%C3%B1o_Soldado.jpg',
    credit: { institution: 'Archivo General de la Nación', creator: 'Agustín Víctor Casasola' },
    license: { id: 'public-domain' }
  }
})
