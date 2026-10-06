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
  researched: '2026-10-06',
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
          id: 'q2',
          text: 'In Paris demonstrieren Arbeiter, Studenten und Nationalgardisten gegen die Regierung von François Guizot (1787-1874).',
          lang: 'de',
          cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
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
          id: 'q4',
          text: 'In Frankreich wird die Zweite Republik ausgerufen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '50' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
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
        id: 'q12',
        text: 'Der französische Kriegsminister Louis Eugène Cavaignac (1802-1857) lässt in Paris einen Arbeiteraufstand blutig niederschlagen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '69' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-11-04' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '105' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '104' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In Frankreich verabschiedet die französische Nationalversammlung die Verfassung der zweiten Republik.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '105' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-12-20' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '131' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '130' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Charles Louis Napoléon Bonaparte (1808-), ein Neffe von Napoleon I., wird Präsident der zweiten französischen Republik.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '131' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Philippoteaux_-_Lamartine_in_front_of_the_Town_Hall_of_Paris_rejects_the_red_flag.jpg/1280px-Philippoteaux_-_Lamartine_in_front_of_the_Town_Hall_of_Paris_rejects_the_red_flag.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Philippoteaux_-_Lamartine_in_front_of_the_Town_Hall_of_Paris_rejects_the_red_flag.jpg',
    credit: { institution: 'Paris Musées', creator: 'Henri Félix Emmanuel Philippoteaux' },
    license: { id: 'cc0' }
  }
})
