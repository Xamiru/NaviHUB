import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-revolution-of-1848',
  names: [
    { text: 'French Revolution of 1848', lang: 'en', role: 'primary' },
    {
      text: 'Februarrevolution',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '8' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1848-02-22' },
        cites: [
          { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '6' } },
          { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '5' } }
        ]
      }
    ]
  },
  regions: ['europe', 'latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '6' } }
      ]
    }
  ],
  partOf: [
    { ref: 'event:revolutions-of-1848' }
  ],
  polities: [
    { ref: 'polity:french-second-republic' }
  ],
  participants: [
    {
      name: 'Louis Philippe',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Revolutions of 1848', para: '1' }
        },
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '6' } }
      ]
    },
    {
      name: 'François Guizot',
      role: 'head-of-government',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '6' } }
      ]
    },
    {
      name: 'Louis Eugène Cavaignac',
      role: 'commander',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '69' } }
      ]
    },
    {
      name: 'Charles Louis Napoléon Bonaparte',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '131' } }
      ]
    },
    {
      name: 'Victor Schoelcher',
      role: 'participant',
      cites: [
        {
          source: 'ehne-marine-gougeon-racial-mixing-martinique',
          loc: {
            section: 'Racial Mixing and Racial Boundaries in 19th-Century Martinique',
            para: '9'
          }
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
          text: 'A popular uprising in Paris in February 1848 turned into a revolution, forcing the French king Louis Philippe to flee to Britain.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        },
        {
          id: 'q15',
          text: 'The industrial population of the faubourgs on its way towards the centre of the town was welcomed by the National Guard, among cries of “Vive la réforme.” Barricades were raised after the unfortunate incident of the firing on the crowd in the Boulevard des Capucines.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '492' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q3',
          text: 'A new liberal and bourgeois revolution broke out in France in February 1848, after riots the preceding month in Italy, and spread like wildfire across the continent.',
          lang: 'en',
          cite: {
            source: 'ehne-hauch-gender-and-revolution-in-europe',
            loc: { section: 'Gender and revolution in Europe, 19th-20th centuries', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/gender-and-europe/gender-and-revolution-in-europe-19th-20th-century/gender-and-revolution-in-europe-19th-20th-centuries'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q16',
          text: 'It was now the turn of the Republic, and it was proclaimed by Lamartine in the name of the provisional government elected by the Chamber under the pressure of the mob.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '492' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q5',
          text: 'The Second French Republic and universal suffrage for men meant that they could hold political office at both the national and municipal level.',
          lang: 'en',
          cite: {
            source: 'ehne-marine-gougeon-racial-mixing-martinique',
            loc: {
              section: 'Racial Mixing and Racial Boundaries in 19th-Century Martinique',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/empires-and-racial-thinking/racial-mixing-and-racial-boundaries-in-19th-century-martinique'
          }
        },
        {
          id: 'q6',
          text: 'The Saint-Simonian Jeanne Deroin (1805-1894), who founded the newspaper La politique des femmes, ran in the 1849 election to denounce “universal male suffrage.”',
          lang: 'en',
          cite: {
            source: 'ehne-hauch-gender-and-revolution-in-europe',
            loc: { section: 'Gender and revolution in Europe, 19th-20th centuries', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/gender-and-europe/gender-and-revolution-in-europe-19th-20th-century/gender-and-revolution-in-europe-19th-20th-centuries'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'In 1848, the abolition of slavery in France and its colonies made the discriminations against Free People, whether white or of color, obsolete.',
          lang: 'en',
          cite: {
            source: 'ehne-marine-gougeon-racial-mixing-martinique',
            loc: {
              section: 'Racial Mixing and Racial Boundaries in 19th-Century Martinique',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/empires-and-racial-thinking/racial-mixing-and-racial-boundaries-in-19th-century-martinique'
          }
        },
        {
          id: 'q8',
          text: 'The abolitionist Victor Schoelcher hoped that socio-racial distinctions would then begin to fade away.',
          lang: 'en',
          cite: {
            source: 'ehne-marine-gougeon-racial-mixing-martinique',
            loc: {
              section: 'Racial Mixing and Racial Boundaries in 19th-Century Martinique',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/empires-and-racial-thinking/racial-mixing-and-racial-boundaries-in-19th-century-martinique'
          }
        },
        {
          id: 'q9',
          text: 'In fact, the exact opposite occurred.',
          lang: 'en',
          cite: {
            source: 'ehne-marine-gougeon-racial-mixing-martinique',
            loc: {
              section: 'Racial Mixing and Racial Boundaries in 19th-Century Martinique',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/empires-and-racial-thinking/racial-mixing-and-racial-boundaries-in-19th-century-martinique'
          }
        },
        {
          id: 'q10',
          text: 'Franco-Persian relations were not a priority for the new Republican government and Sartiges’ position in Tehran became less secure.',
          lang: 'en',
          cite: {
            source: 'iranica-hellot-bellier-france-relations',
            loc: { section: 'FRANCE iii. RELATIONS WITH PERSIA 1789-1918', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/france-iii-relations-with-persia-1789-1918/'
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
            value: { d: '1848-02' },
            cites: [
              {
                source: 'loc-austria-country-study-1994',
                loc: { section: 'Revolutionary Rise and Fall', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          },
          {
            value: { d: '1848-05-04' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '50' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '49' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Deutsches Historisches Museum' }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In late February, the proclamation of the revolutionary Second Republic in France shook conservative Austria.',
        lang: 'en',
        cite: {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'Revolutionary Rise and Fall', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-06-23', notAfter: '1848-06-25' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '69' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '68' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'A furious insurrection at once broke out. Throughout the whole of the 24th, 25th and 26th of June, the eastern industrial quarter of Paris, led by Pujol, carried on a furious struggle against the western quarter, led by Cavaignac, who had been appointed dictator. Vanquished and decimated, first by fighting and afterwards by deportation, the socialist party was crushed.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-france-history',
          loc: { section: 'FRANCE: History', para: '496' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-11-04' },
            cites: [
              {
                source: 'britannica-1911-france-history',
                loc: { section: 'FRANCE: History', para: '498' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On the 4th of November 1848 was promulgated the new constitution, obviously the work of inexperienced hands, proclaiming a democratic republic, direct universal suffrage and the separation of powers;',
        lang: 'en',
        cite: {
          source: 'britannica-1911-france-history',
          loc: { section: 'FRANCE: History', para: '498' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-12-20' },
            cites: [
              {
                source: 'britannica-1911-napoleon-iii',
                loc: { section: 'NAPOLEON III.', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On the 20th of December he took the oath “to remain faithful to the democratic Republic . . . to regard as enemies of the nation all those who may attempt by illegal means to change the form of the established government.”',
        lang: 'en',
        cite: {
          source: 'britannica-1911-napoleon-iii',
          loc: { section: 'NAPOLEON III.', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Philippoteaux_-_Lamartine_in_front_of_the_Town_Hall_of_Paris_rejects_the_red_flag.jpg/1280px-Philippoteaux_-_Lamartine_in_front_of_the_Town_Hall_of_Paris_rejects_the_red_flag.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Philippoteaux_-_Lamartine_in_front_of_the_Town_Hall_of_Paris_rejects_the_red_flag.jpg',
    credit: { institution: 'Paris Musées', creator: 'Henri Félix Emmanuel Philippoteaux' },
    license: { id: 'cc0' }
  },
  furtherReading: [
    { source: 'agulhon-1973-1848-ou-lapprentissage-de-la-republique', perspective: 'european' }
  ]
})
